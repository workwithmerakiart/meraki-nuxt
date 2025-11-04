import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()

  // Guard: ensure webhook + secret exist
  if (!cfg.stripeSecretKey || !cfg.stripeWebhookSecret) {
    setResponseStatus(event, 503)
    return { error: 'Webhook not configured' }
  }

  const stripe = new Stripe(cfg.stripeSecretKey, { apiVersion: '2024-06-20' })

  // Stripe requires the raw request body (unparsed)
  const sig = getHeader(event, 'stripe-signature') || ''
  const raw = await readRawBody(event)
  const bodyBuffer =
    typeof raw === 'string' ? Buffer.from(raw) : raw ? Buffer.from(raw as any) : Buffer.from('')

  let evt: Stripe.Event
  try {
    evt = stripe.webhooks.constructEvent(bodyBuffer, sig, cfg.stripeWebhookSecret)
  } catch (err: any) {
    setResponseStatus(event, 400)
    return { error: `Webhook Error: ${err.message}` }
  }

  // Utility: structure minimal order-ish log lines for Netlify logs (replace with real persistence)
  function log(obj: any) {
    try { console.log(JSON.stringify(obj)) } catch { console.log(obj) }
  }

  try {
    switch (evt.type) {
      // ---------------- SUCCESS PATHS ----------------
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        const session = evt.data.object as Stripe.Checkout.Session
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })

        // Optionally retrieve PaymentIntent for receipts / status
        let paymentIntentId: string | undefined
        if (typeof session.payment_intent === 'string') paymentIntentId = session.payment_intent
        else if ((session.payment_intent as any)?.id) paymentIntentId = (session.payment_intent as any).id

        let note: any = undefined
        try { note = session.metadata?.note ? JSON.parse(session.metadata.note) : undefined } catch { note = session.metadata?.note }

        log({
          level: 'info',
          status: 'paid',
          type: evt.type,
          session_id: session.id,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email,
          customer_phone: session.customer_details?.phone,
          payment_intent: paymentIntentId,
          lines: lineItems.data.map(li => ({
            description: li.description,
            qty: li.quantity,
            amount_total: li.amount_total,
            amount_subtotal: li.amount_subtotal,
            taxes: li.taxes,
          })),
          note,
        })
        break
      }

      // ---------------- FAILURE / ABANDONED PATHS ----------------
      case 'checkout.session.async_payment_failed': {
        const session = evt.data.object as Stripe.Checkout.Session

        // Try to enrich with PI last error
        let piError: any = undefined
        let paymentIntentId: string | undefined
        if (typeof session.payment_intent === 'string') paymentIntentId = session.payment_intent
        else if ((session.payment_intent as any)?.id) paymentIntentId = (session.payment_intent as any).id
        if (paymentIntentId) {
          try {
            const pi = await stripe.paymentIntents.retrieve(paymentIntentId)
            piError = {
              last_payment_error_code: pi.last_payment_error?.code,
              last_payment_error_message: pi.last_payment_error?.message,
            }
          } catch {}
        }

        log({
          level: 'warn',
          status: 'failed',
          type: evt.type,
          session_id: session.id,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email,
          customer_phone: session.customer_details?.phone,
          payment_intent: paymentIntentId,
          error: piError,
        })
        break
      }

      case 'checkout.session.expired': {
        const session = evt.data.object as Stripe.Checkout.Session
        log({
          level: 'info',
          status: 'expired',
          type: evt.type,
          session_id: session.id,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email,
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = evt.data.object as Stripe.PaymentIntent
        // Note: There may or may not be an associated Checkout Session for this event
        log({
          level: 'warn',
          status: 'failed',
          type: evt.type,
          payment_intent: pi.id,
          amount: pi.amount,
          currency: pi.currency,
          last_payment_error_code: pi.last_payment_error?.code,
          last_payment_error_message: pi.last_payment_error?.message,
        })
        break
      }

      default: {
        // For other events, acknowledge without extra work
        log({ level: 'debug', type: evt.type })
        break
      }
    }
  } catch (err) {
    // If your persistence fails, you may choose to return 500 to trigger a retry.
    // For now, log and still acknowledge to avoid duplicate orders.
    console.error('Webhook handler error:', err)
  }

  return { received: true }
})