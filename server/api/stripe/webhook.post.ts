import Stripe from 'stripe'
import { google } from 'googleapis'
import { getHeader, readRawBody, setResponseStatus } from 'h3'
import { sendOrderConfirmationEmail } from '~/server/utils/email'

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()

  if (!cfg.stripeSecretKey || !cfg.stripeWebhookSecret) {
    setResponseStatus(event, 503)
    return { error: 'Webhook not configured' }
  }

  const stripe = new Stripe(cfg.stripeSecretKey, { apiVersion: '2024-06-20' })

  // --- Upstash (temporary order store)
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

  async function getOrder(orderRef: string) {
    const key = `order:${orderRef}`
    const res = await upstash(['GET', key])
    const raw = res?.result
    return raw ? JSON.parse(raw) : null
  }

  async function saveOrder(orderRef: string, data: any) {
    const key = `order:${orderRef}`
    await upstash(['SET', key, JSON.stringify(data), 'EX', ORDER_TTL])
  }

  // --- Google Calendar (block slots after payment success)
  const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID
  const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_EMAIL
  const PRIVATE_KEY_RAW = process.env.GOOGLE_PRIVATE_KEY
  const PRIVATE_KEY = PRIVATE_KEY_RAW ? PRIVATE_KEY_RAW.replace(/\\n/g, '\n') : ''

  const canWriteCalendar = Boolean(CALENDAR_ID && CLIENT_EMAIL && PRIVATE_KEY)
  const gAuth = canWriteCalendar
    ? new google.auth.JWT({
      email: CLIENT_EMAIL,
      key: PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })
    : null

  const gcal = canWriteCalendar ? google.calendar({ version: 'v3', auth: gAuth as any }) : null

  async function blockCalendarSlot(args: { title: string; startISO: string; endISO: string; orderRef: string; sku?: string; qty?: number }) {
    if (!gcal || !CALENDAR_ID) return ''
    const inserted = await gcal.events.insert({
      calendarId: CALENDAR_ID,
      requestBody: {
        summary: `Meraki Booking — ${args.title}`,
        description: `orderRef=${args.orderRef} sku=${args.sku || ''} qty=${args.qty || 1}`,
        start: { dateTime: args.startISO, timeZone: 'Asia/Dubai' },
        end: { dateTime: args.endISO, timeZone: 'Asia/Dubai' },
      },
    })
    return inserted?.data?.id || ''
  }

  // Stripe signature verification
  const sig = getHeader(event, 'stripe-signature') || ''
  const raw = await readRawBody(event)
  const bodyBuffer = Buffer.isBuffer(raw) ? raw : Buffer.from(typeof raw === 'string' ? raw : '')

  if (!sig || bodyBuffer.length === 0) {
    setResponseStatus(event, 400)
    return { error: 'Missing Stripe signature/body' }
  }

  let evt: Stripe.Event
  try {
    evt = stripe.webhooks.constructEvent(bodyBuffer, sig, cfg.stripeWebhookSecret)
  } catch (err: any) {
    setResponseStatus(event, 400)
    return { error: `Webhook Error: ${err.message}` }
  }

  // ENTRY LOG — webhook received and verified
  console.log(
    JSON.stringify({
      level: 'info',
      stage: 'webhook-entry',
      event_type: evt.type,
      event_id: evt.id,
      created: evt.created,
      livemode: evt.livemode,
    })
  )

  function log(obj: any) {
    try {
      console.log(JSON.stringify(obj))
    } catch {
      console.log(obj)
    }
  }

  // Best-effort storage for session-status (not durable on serverless)
  const storage = useStorage('data')
  async function persistSession(sessionId: string, patch: any) {
    if (!sessionId) return
    const key = `stripe:session:${sessionId}`
    try {
      const prev = (await storage.getItem<any>(key)) || {}
      await storage.setItem(key, {
        ...prev,
        ...patch,
        session_id: sessionId,
        updatedAt: Date.now(),
      })
    } catch (err) {
      console.warn('persistSession skipped (storage unavailable)', err)
    }
  }

  try {
    switch (evt.type) {
      case 'checkout.session.completed':
      case 'checkout.session.async_payment_succeeded': {
        console.log(
          JSON.stringify({
            level: 'info',
            stage: 'checkout-session-success-entry',
            event_type: evt.type,
            session_id: (evt.data.object as any)?.id,
            payment_status: (evt.data.object as any)?.payment_status,
            livemode: evt.livemode,
            created: evt.created,
          })
        )

        const session = evt.data.object as Stripe.Checkout.Session

        const orderRef = (session.client_reference_id as string) || session.metadata?.orderRef
        console.log(
          JSON.stringify({
            level: 'info',
            stage: 'orderref-resolved',
            event_type: evt.type,
            session_id: session.id,
            orderRef,
          })
        )

        if (orderRef) {
          try {
            console.log(JSON.stringify({ level: 'info', stage: 'upstash-get-start', orderRef }))
            const order = await getOrder(orderRef)
            console.log(
              JSON.stringify({
                level: 'info',
                stage: 'upstash-get-done',
                orderRef,
                found: !!order,
                linesCount: Array.isArray(order?.lines) ? order.lines.length : 0,
              })
            )

            if (!order) {
              log({ level: 'warn', msg: 'Order not found in Upstash', orderRef, session_id: session.id })
            } else {
              // 1) Mark paid first
              order.status = 'paid'
              order.paidAt = Date.now()
              order.stripeSessionId = session.id
              order.payment_status = session.payment_status

              if (!Array.isArray(order.calendarEvents)) order.calendarEvents = []

              try {
                await saveOrder(orderRef, order)
                log({ level: 'info', msg: 'Order marked paid in Upstash', orderRef, session_id: session.id })
              } catch (e) {
                console.error('Upstash saveOrder (paid) failed', e)
              }

              // 2) Calendar inserts (idempotent)
              let changed = false
              if (Array.isArray(order.lines)) {
                for (const l of order.lines) {
                  if (String(l.type || '') !== 'activity') continue

                  const startISO =
                    l?.meta?.slotStartISO ||
                    l?.slotStartISO ||
                    l?.meta?.slot?.startISO ||
                    l?.meta?.selectedSlotISO ||
                    l?.selectedSlotISO ||
                    ''

                  const endISO =
                    l?.meta?.slotEndISO ||
                    l?.slotEndISO ||
                    l?.meta?.slot?.endISO ||
                    l?.meta?.selectedSlotEndISO ||
                    l?.selectedSlotEndISO ||
                    ''

                  if (!startISO || !endISO) {
                    log({ level: 'warn', msg: 'Activity line missing slot ISO', orderRef, sku: l?.sku, title: l?.title })
                    continue
                  }

                  const fingerprint = `${String(l.sku || l.title || '')}|${startISO}|${endISO}`
                  const already = order.calendarEvents.some((x: any) => x?.fingerprint === fingerprint)
                  if (already) {
                    log({ level: 'info', msg: 'Calendar event already created (skip)', orderRef, fingerprint })
                    continue
                  }

                  try {
                    log({ level: 'info', msg: 'Calendar insert attempt', orderRef, title: l?.title, startISO, endISO })
                    const eventId = await blockCalendarSlot({
                      title: String(l.title || 'Activity'),
                      startISO: String(startISO),
                      endISO: String(endISO),
                      orderRef,
                      sku: String(l.sku || ''),
                      qty: Number(l.qty || 1),
                    })

                    if (eventId) {
                      order.calendarEvents.push({ fingerprint, eventId, createdAt: Date.now() })
                      changed = true
                      log({ level: 'info', msg: 'Calendar insert OK', orderRef, eventId, fingerprint })
                    } else {
                      log({ level: 'warn', msg: 'Calendar insert returned empty eventId', orderRef, fingerprint })
                    }
                  } catch (e) {
                    console.error('Calendar insert FAILED', e)
                  }
                }
              }

              if (changed) {
                try {
                  await saveOrder(orderRef, order)
                } catch (e) {
                  console.error('Upstash saveOrder (calendarEvents) failed', e)
                }
              }
              // 3) Send order confirmation email (idempotent)
              // Do not block webhook success if email fails.
              if (!order.customerEmailSentAt) {
                try {
                  const result = await sendOrderConfirmationEmail(order)
                  console.log('[WEBHOOK] Resend response', { orderRef, result })

                  // Only mark sent if we got an id back
                  const messageId = (result as any)?.id || (result as any)?.messageId || null
                  if (messageId) {
                    order.customerEmailSentAt = Date.now()
                    order.customerEmailMessageId = messageId
                    try {
                      await saveOrder(orderRef, order)
                    } catch (e) {
                      console.error('Upstash saveOrder (emailSentAt) failed', e)
                    }
                    log({ level: 'info', msg: 'Order confirmation email sent', orderRef, messageId })
                  } else {
                    log({ level: 'warn', msg: 'Order email NOT sent (no message id returned)', orderRef })
                  }
                } catch (e) {
                  console.error('[WEBHOOK] Order confirmation email failed', e)
                  // IMPORTANT: do NOT set customerEmailSentAt on failure
                }
              } else {
                log({ level: 'info', msg: 'Order email already sent (skip)', orderRef })
              }
            }
          } catch (e) {
            console.error('Upstash/Calendar post-pay flow failed', e)
          }
        } else {
          log({ level: 'warn', msg: 'Missing orderRef on Stripe session', session_id: session.id })
        }

        await persistSession(session.id, {
          status: 'paid',
          type: evt.type,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email,
          customer_phone: session.customer_details?.phone,
          orderRef: orderRef || null,
        })
        break
      }

      case 'checkout.session.expired': {
        const session = evt.data.object as Stripe.Checkout.Session
        await persistSession(session.id, {
          status: 'expired',
          type: evt.type,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email,
        })
        break
      }

      case 'checkout.session.async_payment_failed': {
        const session = evt.data.object as Stripe.Checkout.Session
        await persistSession(session.id, {
          status: 'failed',
          type: evt.type,
          payment_status: session.payment_status,
          amount_total: session.amount_total,
          currency: session.currency,
          customer_email: session.customer_details?.email,
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = evt.data.object as Stripe.PaymentIntent
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
        log({ level: 'debug', type: evt.type })
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
  }

  return { received: true }
})