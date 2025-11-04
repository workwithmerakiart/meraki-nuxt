import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()

  if (!cfg.stripeSecretKey) {
    setResponseStatus(event, 503)
    return { error: 'Payments not configured' }
  }

  const stripe = new Stripe(cfg.stripeSecretKey, { apiVersion: '2024-06-20' })

  const body = await readBody(event)
  const lines = Array.isArray(body?.lines) ? body.lines : []
  const promoCode = String(body?.promoCode || '').trim().toUpperCase()
  const rawNote = typeof body?.note === 'string' ? body.note : ''
  const note = rawNote.length > 500 ? rawNote.slice(0, 500) : rawNote // Stripe metadata value limit safety

  if (!lines.length) {
    setResponseStatus(event, 400)
    return { error: 'No line items' }
  }

  const currency = 'AED'
  const taxRateId = cfg.stripeTaxRateId || ''

  // Identify gift card lines and force them to be non-taxable regardless of client flags
  function isGiftLine(l: any) {
    const t = String(l.type || '').toLowerCase()
    const sku = String(l.sku || '').toUpperCase()
    const title = String(l.title || '').toLowerCase()
    return t.includes('gift') || sku.startsWith('GIFT') || /gift\s*card/.test(title)
  }

  // Check if any line should be taxable; if yes but we lack a tax rate ID, abort to avoid mismatched totals
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
        tax_behavior: 'exclusive',
        product_data: {
          name: String(l.title || l.sku || 'Item'),
          images: l.image ? [String(l.image)] : undefined,
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

  // Map your promo codes to Stripe coupon IDs (create once per env in Dashboard)
  const COUPON_MAP: Record<string, string> = {
    SAVE10: 'coupon_SAVE10',
    WELCOME25: 'coupon_WELCOME25',
  }
  const discounts = promoCode && COUPON_MAP[promoCode] ? [{ coupon: COUPON_MAP[promoCode] }] : undefined

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      discounts,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: true },
      customer_creation: 'if_required',
      success_url: `${cfg.appBaseUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cfg.appBaseUrl}/cart`,
      metadata: { note },
    })

    return { url: session.url }
  } catch (err: any) {
    console.error('Stripe session error:', err?.message || err)
    setResponseStatus(event, 500)
    return { error: 'Unable to create checkout session' }
  }
})