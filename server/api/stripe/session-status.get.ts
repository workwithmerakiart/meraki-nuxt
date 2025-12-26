import Stripe from 'stripe'
import { defineEventHandler, getQuery, setResponseStatus } from 'h3'

type SessionStatus = 'paid' | 'failed' | 'expired' | 'pending' | 'missing'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const sessionId = String(q.session_id || '').trim()

  if (!sessionId) {
    setResponseStatus(event, 400)
    return { ok: false, status: 'missing' as const, message: 'session_id is required' }
  }

  // 1) First try whatever your webhook persisted (best-effort only in serverless)
  const storage = useStorage('data')
  const rec = await storage.getItem<any>(`stripe:session:${sessionId}`)

  if (rec) {
    const rawStatus = String(rec.status || 'pending')
    const allowed = new Set<SessionStatus>(['paid', 'failed', 'expired', 'pending', 'missing'])
    const status = (allowed.has(rawStatus as SessionStatus) ? rawStatus : 'pending') as SessionStatus

    return {
      ok: true,
      status,
      session_id: rec.session_id || sessionId,
      updatedAt: rec.updatedAt || null,
      meta: {
        payment_status: rec.payment_status || null,
        amount_total: rec.amount_total ?? null,
        currency: rec.currency || null,
        customer_email: rec.customer_email || null,
      },
    }
  }

  // 2) Netlify/serverless: local storage is not durable across invocations.
  // Fall back to Stripe API so the success page can resolve.
  const cfg = useRuntimeConfig()
  if (!cfg.stripeSecretKey) {
    setResponseStatus(event, 503)
    return { ok: false, status: 'pending' as const, message: 'Stripe not configured' }
  }

  try {
    const stripe = new Stripe(cfg.stripeSecretKey, { apiVersion: '2024-06-20' })
    const s = await stripe.checkout.sessions.retrieve(sessionId)

    // Stripe session fields we can rely on:
    // - payment_status: 'paid' | 'unpaid' | 'no_payment_required'
    // - status: 'open' | 'complete' | 'expired'
    let status: SessionStatus = 'pending'

    if (s.status === 'expired') status = 'expired'
    else if (s.payment_status === 'paid') status = 'paid'
    else if (s.status === 'complete' && s.payment_status !== 'paid') status = 'failed'

    // Best-effort cache (may or may not persist on serverless)
    await storage.setItem(`stripe:session:${sessionId}`, {
      status,
      session_id: sessionId,
      updatedAt: Date.now(),
      payment_status: s.payment_status || null,
      amount_total: s.amount_total ?? null,
      currency: s.currency || null,
      customer_email: s.customer_details?.email || null,
    })

    return {
      ok: true,
      status,
      session_id: sessionId,
      updatedAt: Date.now(),
      meta: {
        payment_status: s.payment_status || null,
        amount_total: s.amount_total ?? null,
        currency: s.currency || null,
        customer_email: s.customer_details?.email || null,
      },
    }
  } catch (err: any) {
    // If Stripe retrieval fails (bad key, wrong mode, etc.), keep UI in pending state.
    return { ok: true, status: 'pending' as const, session_id: sessionId }
  }
})