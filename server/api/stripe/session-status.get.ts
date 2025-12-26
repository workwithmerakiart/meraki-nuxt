import Stripe from 'stripe'
import { defineEventHandler, getQuery, setResponseStatus } from 'h3'

type SessionStatus = 'paid' | 'failed' | 'expired' | 'pending' | 'missing'

function normalizeStatus(input: any): SessionStatus {
  const raw = String(input || 'pending')
  const allowed = new Set<SessionStatus>(['paid', 'failed', 'expired', 'pending', 'missing'])
  return (allowed.has(raw as SessionStatus) ? raw : 'pending') as SessionStatus
}

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const sessionId = String(q.session_id || '').trim()

  if (!sessionId) {
    setResponseStatus(event, 400)
    return { ok: false, status: 'missing' as const, message: 'session_id is required' }
  }

  // 1) Best-effort: read what the webhook may have persisted.
  // IMPORTANT: On Netlify/serverless this storage is not durable, so treat as cache only.
  const storage = useStorage('data')
  const cached = await storage.getItem<any>(`stripe:session:${sessionId}`)
  if (cached?.status) {
    const status = normalizeStatus(cached.status)
    return {
      ok: true,
      status,
      session_id: cached.session_id || sessionId,
      updatedAt: cached.updatedAt || null,
      source: 'webhook-cache',
      meta: {
        payment_status: cached.payment_status || null,
        amount_total: cached.amount_total ?? null,
        currency: cached.currency || null,
        customer_email: cached.customer_email || null,
      },
    }
  }

  // 2) Authoritative: ask Stripe directly.
  const cfg = useRuntimeConfig()
  const secretKey = (cfg as any).stripeSecretKey || (cfg as any).STRIPE_SECRET_KEY || ''

  if (!secretKey) {
    setResponseStatus(event, 503)
    return {
      ok: false,
      status: 'pending' as const,
      message:
        'Stripe secret key is missing in runtime config. Ensure STRIPE_SECRET_KEY is set for Netlify *Functions/Runtime* scopes (not only Build).',
    }
  }

  try {
    const stripe = new Stripe(String(secretKey), { apiVersion: '2024-06-20' })
    const s = await stripe.checkout.sessions.retrieve(sessionId)

    // Stripe session fields:
    // - status: 'open' | 'complete' | 'expired'
    // - payment_status: 'paid' | 'unpaid' | 'no_payment_required'
    let status: SessionStatus = 'pending'

    if (s.status === 'expired') status = 'expired'
    else if (s.payment_status === 'paid') status = 'paid'
    else if (s.status === 'complete' && s.payment_status !== 'paid') status = 'failed'

    // Best-effort cache (may not persist on serverless)
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
      source: 'stripe-api',
      meta: {
        payment_status: s.payment_status || null,
        amount_total: s.amount_total ?? null,
        currency: s.currency || null,
        customer_email: s.customer_details?.email || null,
      },
    }
  } catch (err: any) {
    // Do NOT silently return pending — surface why Stripe lookup failed.
    const msg = String(err?.message || err)
    setResponseStatus(event, 502)
    return {
      ok: false,
      status: 'pending' as const,
      session_id: sessionId,
      message: `Stripe session lookup failed: ${msg}`,
      hint:
        'If this works locally but not on Netlify, you are almost certainly using the wrong key (live vs test) or the secret key is not available to Functions. Make sure the Test secret is set on Netlify Deploy Preview/Branch contexts, and Live secret is set on Production context.',
    }
  }
})