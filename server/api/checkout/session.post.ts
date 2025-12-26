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
  const lines = Array.isArray(body?.lines) ? body.lines : []
  const promoCode = String(body?.promoCode || '').trim().toUpperCase()
  const rawNote = typeof body?.note === 'string' ? body.note : ''
  const note = rawNote.length > 500 ? rawNote.slice(0, 500) : rawNote // Stripe metadata value limit safety

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

  const currency = 'AED'
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
      metadata: { note },
    })

    return { url: session.url }
  } catch (err: any) {
    const msg = err?.message || String(err)
    // Log full error for server console
    console.error('Stripe session error:', msg, err)
    setResponseStatus(event, 500)

    // Never leak internal error details to the client
    return { error: 'Unable to start payment right now. Please try again in a moment.' }
  }
})