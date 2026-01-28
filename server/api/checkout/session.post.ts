import Stripe from 'stripe'
import { getRequestURL } from 'h3'

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()

  if (!cfg.stripeSecretKey) {
    setResponseStatus(event, 503)
    return { error: 'Payments not configured' }
  }

  const stripe = new Stripe(cfg.stripeSecretKey, { apiVersion: '2024-11-20.acacia' })

  const body = await readBody(event)

  // --- Upstash (temporary order store; used by webhook to reconstruct bookings)
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
  const ORDER_TTL = Number(process.env.ORDER_TTL_SECONDS || 86400)

  async function upstash(cmd: any[]) {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) throw new Error('Upstash not configured')
    const r = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cmd),
    })
    const j = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(`Upstash error ${r.status}`)
    return j
  }

  function makeOrderRef() {
    return `ord_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`
  }
  const rawLines = Array.isArray(body?.lines) ? body.lines : []

  // Normalize lines so we never lose slot metadata for activity bookings.
  // Some clients may send slot fields at top-level; we consolidate into `meta`.
  const lines = rawLines.map((l: any) => {
    const meta = (l && typeof l === 'object' ? (l.meta || {}) : {})
    const slotStartISO = meta.slotStartISO || l.slotStartISO || l.selectedSlotISO || l.slotStart || null
    const slotEndISO = meta.slotEndISO || l.slotEndISO || l.selectedSlotEndISO || l.slotEnd || null

    const outMeta = {
      ...meta,
      ...(slotStartISO ? { slotStartISO } : {}),
      ...(slotEndISO ? { slotEndISO } : {}),
    }

    return {
      ...l,
      meta: outMeta,
    }
  })
  const promoCode = String(body?.promoCode || '').trim().toUpperCase()
  const rawNote = typeof body?.note === 'string' ? body.note : ''
  const note = rawNote.length > 500 ? rawNote.slice(0, 500) : rawNote // Stripe metadata value limit safety

  const currency = 'AED'

  function round2(n: number) {
    return Math.round((Number(n) + Number.EPSILON) * 100) / 100
  }

  // Promo DB (keep in sync with stores/cart.ts)
  const PROMO_DB: Array<{ code: string; type: 'percent' | 'amount'; value: number; active: boolean }> = [
    { code: 'SAVE10', type: 'percent', value: 10, active: true },
    { code: 'WELCOME25', type: 'amount', value: 25, active: true },
  ]

  function findPromo(code?: string) {
    const c = String(code || '').trim().toUpperCase()
    if (!c) return null
    return PROMO_DB.find(p => p.active && p.code.toUpperCase() === c) || null
  }

  // Compute line net/vat/gross in major units
  function computeLineTotals(l: any) {
    const qty = Math.max(1, Number(l.qty) || 1)
    const unit = Number(l.priceMajor) || 0

    // Gift cards/non-taxable lines
    const vatEnabled = l.vatEnabled !== false
    const vatRate = Number(l.vatRate ?? l.vatValue ?? 5)
    const vatIncluded = Boolean(l.vatIncluded)

    let unitNet = unit
    let unitVat = 0

    if (vatEnabled && vatRate > 0) {
      if (vatIncluded) {
        unitNet = unit / (1 + vatRate / 100)
        unitVat = unit - unitNet
      } else {
        unitNet = unit
        unitVat = unit * (vatRate / 100)
      }
    }

    const lineNet = unitNet * qty
    const lineVat = unitVat * qty
    const lineGross = vatIncluded ? unit * qty : (unitNet + unitVat) * qty

    return { qty, unit, unitNet, unitVat, lineNet, lineVat, lineGross }
  }

  function computeTotals(lines: any[], promoCode: string) {
    const nets = lines.map(computeLineTotals)
    const subtotalExVat = round2(nets.reduce((s, x) => s + x.lineNet, 0))
    const vatTotal = round2(nets.reduce((s, x) => s + x.lineVat, 0))

    // Discount is applied on ex-VAT subtotal
    const promo = findPromo(promoCode)
    let discountExVat = 0
    if (promo && subtotalExVat > 0) {
      discountExVat = promo.type === 'percent' ? subtotalExVat * (promo.value / 100) : promo.value
      discountExVat = round2(Math.min(discountExVat, subtotalExVat))
    }

    // VAT after discount allocated proportionally across taxable base
    let vatAfterDiscount = 0
    if (subtotalExVat > 0 && vatTotal > 0) {
      const ratio = Math.max(0, (subtotalExVat - discountExVat) / subtotalExVat)
      vatAfterDiscount = round2(vatTotal * ratio)
    }

    const total = round2(Math.max(0, subtotalExVat - discountExVat) + vatAfterDiscount)

    return { subtotalExVat, discountExVat, vat: vatAfterDiscount, total }
  }

  // Create orderRef and persist full order in Upstash BEFORE creating Stripe session
  const orderRef = makeOrderRef()
  const orderKey = `order:${orderRef}`

  const orderRecord = {
    orderRef,
    createdAt: Date.now(),
    status: 'pending',
    currency: body?.currency || currency,
    promoCode: promoCode || null,
    totals: computeTotals(lines, promoCode),
    lines,
    note: rawNote || '',
  }

  try {
    await upstash(['SET', orderKey, JSON.stringify(orderRecord), 'EX', ORDER_TTL])
  } catch (e) {
    console.error('Upstash SET failed', e)
    setResponseStatus(event, 503)
    return { error: 'Unable to start payment right now. Please try again in a moment.' }
  }

  if (!lines.length) {
    setResponseStatus(event, 400)
    return { error: 'No line items' }
  }

  // Fallback base URL from request (useful in dev if cfg.appBaseUrl is not set)
  const reqUrl = getRequestURL(event)
  const appBaseUrl = cfg.appBaseUrl || `${reqUrl.protocol}//${reqUrl.host}`

  // Stripe requires absolute URLs for redirect URLs and product images.
  function toAbsoluteUrl(input: any): string | null {
    const s = String(input || '').trim()
    if (!s) return null

    // Reject data/blob URLs (Stripe expects fetchable public URLs)
    if (s.startsWith('data:') || s.startsWith('blob:')) return null

    let u: URL

    // If already absolute, parse it
    try {
      u = new URL(s)
    } catch {
      // Otherwise treat as path relative to appBaseUrl
      try {
        const path = s.startsWith('/') ? s : `/${s}`
        u = new URL(path, appBaseUrl)
      } catch {
        return null
      }
    }

    // Only allow http/https
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null

    // Stripe product images should be publicly reachable. In dev you'll often have localhost paths,
    // which will fail or be blocked—omit them.
    const host = (u.hostname || '').toLowerCase()
    if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) return null

    return u.toString()
  }
  const taxRateId = cfg.stripeTaxRateId || cfg.stripeTaxRateAe5Excl || ''

  // Identify gift card lines and force them to be non-taxable regardless of client flags
  function isGiftLine(l: any) {
    const t = String(l.type || '').toLowerCase()
    const sku = String(l.sku || '').toUpperCase()
    const title = String(l.title || '').toLowerCase()
    return t.includes('gift') || sku.startsWith('GIFT') || /gift\s*card/.test(title)
  }

  const anyTaxable = lines.some((l: any) => {
    if (isGiftLine(l)) return false
    if (l.vatEnabled === false) return false
    const rate = Number(l.vatRate ?? l.vatValue ?? 5)
    return Number.isFinite(rate) && rate > 0
  })
  if (anyTaxable && !taxRateId) {
    setResponseStatus(event, 503)
    return { error: 'VAT tax rate not configured' }
  }

  // Recompute unit NET from flags; always send EXCLUSIVE to Stripe and attach tax rate when taxable
  function toLineItem(l: any) {
    const qty = Math.max(1, Number(l.qty) || 1)
    const gift = isGiftLine(l)

    const inputRate = Number(l.vatRate ?? l.vatValue ?? 5)
    const effectiveRate = gift ? 0 : (l.vatEnabled === false ? 0 : (Number.isFinite(inputRate) ? inputRate : 5))

    const unit = Number(l.priceMajor) || 0
    const vatIncluded = !!l.vatIncluded
    const unitNet = effectiveRate > 0 && vatIncluded ? unit / (1 + effectiveRate / 100) : unit
    const unit_amount = Math.max(0, Math.round(unitNet * 100)) // minor units

    return {
      price_data: {
        currency,
        unit_amount,
        // Required when using `automatic_tax: { enabled: true }` with `price_data`
        tax_behavior: 'exclusive',
        product_data: {
          name: String(l.title || l.sku || 'Item'),
          images: (() => {
            const img = toAbsoluteUrl(l.image)
            return img ? [img] : undefined
          })(),
          metadata: {
            sku: String(l.sku ?? l.id ?? ''),
            type: String(l.type ?? ''),
            variantKey: String(l.variantKey ?? ''),
          },
        },
      },
      quantity: qty,
      tax_rates: effectiveRate > 0 ? [taxRateId] : [],
    }
  }

  const line_items = lines.map(toLineItem)

  // Optional: map your promo codes to Stripe coupon IDs (must exist in Stripe Dashboard)
  // If these IDs don't exist, Stripe will throw "No such coupon".
  const COUPON_MAP: Record<string, string> = {
    // Example:
    // SAVE10: 'SAVE10',
    // WELCOME25: 'WELCOME25',
  }
  const couponId = promoCode && COUPON_MAP[promoCode]
  const discounts = couponId ? [{ coupon: couponId }] : undefined

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      discounts,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      phone_number_collection: { enabled: true },
      customer_creation: 'if_required',
      success_url: new URL(`/order/success?session_id={CHECKOUT_SESSION_ID}`, appBaseUrl).toString(),
      cancel_url: new URL(`/order/failed?session_id={CHECKOUT_SESSION_ID}`, appBaseUrl).toString(),
      client_reference_id: orderRef,
      metadata: { orderRef },
    })

    return { url: session.url, orderRef }
  } catch (err: any) {
    const msg = err?.message || String(err)
    // Log full error for server console
    console.error('Stripe session error:', msg, err)
    setResponseStatus(event, 500)

    // Never leak internal error details to the client
    return { error: 'Unable to start payment right now. Please try again in a moment.' }
  }
})