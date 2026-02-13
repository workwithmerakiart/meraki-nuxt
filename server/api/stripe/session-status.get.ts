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

  // --- Upstash (order store)
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

  async function upstash(cmd: any[]) {
    if (!UPSTASH_URL || !UPSTASH_TOKEN) return { result: null }
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

  async function getOrderFromUpstash(orderRef: string) {
    if (!orderRef) return null
    try {
      const key = `order:${orderRef}`
      const res = await upstash(['GET', key])
      const raw = res?.result
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }

  // 1) Best-effort: read what the webhook may have persisted.
  // IMPORTANT: On Netlify/serverless this storage is not durable, and may not even exist.
  const storage = useStorage('data')
  let cached: any = null
  try {
    cached = await storage.getItem<any>(`stripe:session:${sessionId}`)
  } catch {
    cached = null
  }

  if (cached?.status) {
    const status = normalizeStatus(cached.status)
    const orderRef = cached.orderRef || null
    const order = orderRef ? await getOrderFromUpstash(String(orderRef)) : null

    return {
      ok: true,
      status,
      session_id: cached.session_id || sessionId,
      orderRef,
      order,
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

  // On Netlify, server runtime env vars are available on process.env inside Functions.
  // runtimeConfig may or may not include them depending on your nuxt.config mapping.
  const secretKey =
    (cfg as any).stripeSecretKey ||
    (process.env.STRIPE_SECRET_KEY as string | undefined) ||
    (process.env.stripeSecretKey as string | undefined) ||
    ''

  if (!secretKey) {
    setResponseStatus(event, 503)
    return {
      ok: false,
      status: 'pending' as const,
      session_id: sessionId,
      message:
        'Stripe secret key is missing at runtime. On Netlify, set STRIPE_SECRET_KEY with Functions/Runtime scope for the active deploy context.',
    }
  }

  try {
    const stripe = new Stripe(String(secretKey), { apiVersion: '2024-06-20' })
    const s = await stripe.checkout.sessions.retrieve(sessionId)
    const orderRef = (s.client_reference_id as string) || (s.metadata as any)?.orderRef || null
    const order = orderRef ? await getOrderFromUpstash(String(orderRef)) : null

    // Stripe session fields:
    // - status: 'open' | 'complete' | 'expired'
    // - payment_status: 'paid' | 'unpaid' | 'no_payment_required'
    let status: SessionStatus = 'pending'

    if (s.status === 'expired') {
      status = 'expired'
    } else if (s.payment_status === 'paid' || s.payment_status === 'no_payment_required') {
      status = 'paid'
    } else if (s.status === 'complete') {
      // Completed session but not paid yet (e.g. async methods)
      status = 'pending'
    } else {
      status = 'pending'
    }

    // Best-effort cache (never break prod if this fails)
    try {
      await storage.setItem(`stripe:session:${sessionId}`, {
        status,
        session_id: sessionId,
        orderRef,
        updatedAt: Date.now(),
        payment_status: s.payment_status || null,
        amount_total: s.amount_total ?? null,
        currency: s.currency || null,
        customer_email: s.customer_details?.email || null,
      })
    } catch {
      // ignore cache errors on serverless
    }

    return {
      ok: true,
      status,
      session_id: sessionId,
      orderRef,
      order,
      updatedAt: Date.now(),
      source: 'stripe-api',
      meta: {
        stripe_status: (s as any).status || null,
        payment_status: s.payment_status || null,
        amount_total: s.amount_total ?? null,
        currency: s.currency || null,
        customer_email: s.customer_details?.email || null,
        livemode: (s as any).livemode ?? null,
      },
    }
  } catch (err: any) {
    // Don’t throw a hard error for the UI; return pending with a message.
    const msg = String(err?.message || err)
    setResponseStatus(event, 200)
    return {
      ok: false,
      status: 'pending' as const,
      session_id: sessionId,
      message: `Stripe session lookup failed: ${msg}`,
      hint:
        'If this works locally but not on Netlify, you may be using the wrong Stripe key (live vs test) or STRIPE_SECRET_KEY is not available to Functions for this deploy context.',
    }
  }
})