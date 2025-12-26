import { defineEventHandler, getQuery, setResponseStatus } from 'h3'

type SessionStatus = 'paid' | 'failed' | 'expired' | 'pending' | 'missing'

export default defineEventHandler(async (event) => {
  const q = getQuery(event)
  const sessionId = String(q.session_id || '').trim()

  if (!sessionId) {
    setResponseStatus(event, 400)
    return { ok: false, status: 'missing' as const, message: 'session_id is required' }
  }

  // Reads what your webhook persisted:
  // key: `stripe:session:<session_id>`
  const storage = useStorage('data')
  const rec = await storage.getItem<any>(`stripe:session:${sessionId}`)

  if (!rec) {
    // Webhook not received yet OR not forwarded in local dev
    return { ok: true, status: 'pending' as const, session_id: sessionId }
  }

  const rawStatus = String(rec.status || 'pending')
  const allowed = new Set<SessionStatus>(['paid', 'failed', 'expired', 'pending', 'missing'])
  const status = (allowed.has(rawStatus as SessionStatus) ? rawStatus : 'pending') as SessionStatus

  return {
    ok: true,
    status, // 'paid' | 'failed' | 'expired' | 'pending'
    session_id: rec.session_id || sessionId,
    updatedAt: rec.updatedAt || null,
    meta: {
      payment_status: rec.payment_status || null,
      amount_total: rec.amount_total ?? null,
      currency: rec.currency || null,
      customer_email: rec.customer_email || null,
    },
  }
})