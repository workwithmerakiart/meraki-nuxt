import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
if (!process.env.RESEND_API_KEY) {
  console.warn('[EMAIL] RESEND_API_KEY is missing. Emails will fail until it is set.')
}

// Must be a direct, publicly accessible image URL (https). Example: https://yourdomain.com/logo.png
const EMAIL_LOGO_URL = process.env.EMAIL_LOGO_URL || ''
const EMAIL_FROM = process.env.EMAIL_FROM || 'bookingsatmeraki@gmail.com'

type OrderLine = {
  title: string
  qty: number
  type?: string
  priceMajor?: number
  vatEnabled?: boolean
  vatIncluded?: boolean
  vatRate?: number
  meta?: {
    slotStartISO?: string
    slotEndISO?: string
  }
}

type Order = {
  orderRef: string
  customer?: {
    name?: string
    email?: string
  }
  lines?: OrderLine[]
  note?: string
  currency?: string
  promoCode?: string | null
  totals?: {
    subtotalExVat?: number
    discountExVat?: number
    vat?: number
    total?: number
  }
}

const STUDIO_NAME = 'Meraki Art Studio'
const STUDIO_ADDRESS = '40, Meraki Art Studio, Goshi Warehouse Village, Al Quoz 3, Dubai'
const STUDIO_PHONE = '+971 50 852 3600'
const DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Meraki+Art+%26+Design+Studio,+Al+Quoz+-+Al+Quoz+Industrial+Area+3+-+Dubai'

function safeJsonParse(s?: string) {
  try {
    return s ? JSON.parse(s) : {}
  } catch {
    return {}
  }
}

function resolveCustomer(order: Order) {
  const fromCustomer = order.customer || {}
  const note = safeJsonParse(order.note)
  const name = String(fromCustomer.name || note?.name || 'Customer').trim()
  const email = String(fromCustomer.email || note?.email || '').trim()
  return { name, email }
}

function formatDubaiSlot(startISO?: string, endISO?: string) {
  if (!startISO || !endISO) return ''

  const optsDate: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Dubai',
  }

  const optsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Dubai',
  }

  const start = new Date(startISO)
  const end = new Date(endISO)

  return `${start.toLocaleDateString('en-US', optsDate)} • ${start.toLocaleTimeString(
    'en-US',
    optsTime
  )} – ${end.toLocaleTimeString('en-US', optsTime)} (Dubai)`
}

function round2(n: number) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100
}

function money(currency: string, amount: number) {
  return `${currency} ${Number(amount || 0).toFixed(2)}`
}

function computeTotals(order: Order) {
  const currency = String(order.currency || 'AED')

  // If totals are provided (future), prefer them.
  if (order.totals && typeof order.totals === 'object') {
    const subtotalExVat = Number(order.totals.subtotalExVat || 0)
    const discountExVat = Number(order.totals.discountExVat || 0)
    const vat = Number(order.totals.vat || 0)
    const total = Number(order.totals.total || 0)
    return {
      currency,
      subtotalExVat,
      discountExVat,
      vat,
      total,
    }
  }

  const lines = Array.isArray(order.lines) ? order.lines : []

  const subtotalExVat = round2(
    lines.reduce((sum, l) => {
      const qty = Math.max(1, Number(l.qty || 1))
      const unit = Number(l.priceMajor || 0)
      // assume priceMajor is ex-VAT (your current setup)
      return sum + unit * qty
    }, 0)
  )

  const vat = round2(
    lines.reduce((sum, l) => {
      const qty = Math.max(1, Number(l.qty || 1))
      const unit = Number(l.priceMajor || 0)
      const enabled = l.vatEnabled !== false
      const rate = Number(l.vatRate ?? 5)
      const included = Boolean(l.vatIncluded)
      if (!enabled || rate <= 0) return sum
      // If VAT included, VAT portion is unit - unit/(1+r)
      const unitVat = included ? (unit - unit / (1 + rate / 100)) : (unit * (rate / 100))
      return sum + unitVat * qty
    }, 0)
  )

  const discountExVat = 0
  const total = round2(subtotalExVat - discountExVat + vat)

  return { currency, subtotalExVat, discountExVat, vat, total }
}

export async function sendOrderConfirmationEmail(order: Order) {
  const { name: customerName, email: customerEmail } = resolveCustomer(order)
  if (!customerEmail) {
    console.warn('Email skipped: missing customer email (order.customer.email and order.note.email both empty)', { orderRef: order?.orderRef })
    return null
  }

  const itemsHtml = (order.lines || [])
    .map((l) => {
      const isActivity = l.type === 'activity'
      const slot = isActivity
        ? formatDubaiSlot(l.meta?.slotStartISO, l.meta?.slotEndISO)
        : ''

      return `
        <tr>
          <td style="padding:8px 0;">
            <strong>${l.title}</strong><br/>
            Qty: ${l.qty}
            ${slot ? `<br/><span style="color:#555">${slot}</span>` : ''}
          </td>
        </tr>
      `
    })
    .join('')

  const { currency, subtotalExVat, discountExVat, vat, total } = computeTotals(order)

  const logoHtml = EMAIL_LOGO_URL
    ? `
      <div style="text-align:center;margin:0 0 18px;">
        <img
          src="${EMAIL_LOGO_URL}"
          alt="${STUDIO_NAME}"
          style="display:inline-block;height:56px;max-width:240px;width:auto;object-fit:contain;"
        />
      </div>
    `
    : ''

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;padding:28px 24px 24px">
    ${logoHtml}

    <h2 style="margin:0 0 6px">Thank you for your order, ${customerName}!</h2>
    <p style="margin:0 0 16px;color:#444;">Your payment has been successfully received.</p>

    <div style="background:#fafafa;border:1px solid #eee;border-radius:12px;padding:12px 14px;margin-bottom:18px;">
      <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:.08em;">Order ID</div>
      <div style="margin-top:6px;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;font-size:13px;color:#111;word-break:break-all;">${order.orderRef}</div>
    </div>

    <h3 style="margin:0 0 10px">Order Details</h3>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <thead>
        <tr>
          <th align="left" style="padding:10px 0;border-bottom:2px solid #111;font-size:12px;color:#111;">Item</th>
          <th align="right" style="padding:10px 0;border-bottom:2px solid #111;font-size:12px;color:#111;white-space:nowrap;">Qty × Price</th>
          <th align="right" style="padding:10px 0;border-bottom:2px solid #111;font-size:12px;color:#111;white-space:nowrap;">Line total</th>
        </tr>
      </thead>
      <tbody>
        ${(() => {
          const rows = (order.lines || []).map((l) => {
            const isActivity = l.type === 'activity'
            const slot = isActivity ? formatDubaiSlot(l.meta?.slotStartISO, l.meta?.slotEndISO) : ''
            const qty = Math.max(1, Number(l.qty || 1))
            const unit = Number(l.priceMajor || 0)
            const lineTotal = unit * qty
            return `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #eee;">
                  <div style="font-weight:600;color:#111;">${l.title}</div>
                  ${slot ? `<div style="margin-top:4px;font-size:12px;color:#666;">${slot}</div>` : ''}
                </td>
                <td align="right" style="padding:12px 0;border-bottom:1px solid #eee;color:#111;white-space:nowrap;">${qty} × ${money(currency, unit)}</td>
                <td align="right" style="padding:12px 0;border-bottom:1px solid #eee;color:#111;white-space:nowrap;">${money(currency, lineTotal)}</td>
              </tr>
            `
          }).join('')
          return rows || `<tr><td colspan="3" style="padding:12px 0;color:#666;">(No items found)</td></tr>`
        })()}
      </tbody>
    </table>

    <div style="margin-top:16px;padding:14px;border:1px solid #eee;border-radius:12px;background:#fff;">
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#444;margin:6px 0;">
        <span>Subtotal</span>
        <span>&nbsp;${money(currency, subtotalExVat)}</span>
      </div>
      ${order.promoCode ? `<div style="display:flex;justify-content:space-between;font-size:13px;color:#2f7d32;margin:6px 0;">
        <span>Promo (${order.promoCode})</span>
        <span>&nbsp;${discountExVat > 0 ? `- ${money(currency, discountExVat)}` : 'Applied'}</span>
      </div>` : ''}
      <div style="display:flex;justify-content:space-between;font-size:13px;color:#444;margin:6px 0;">
        <span>VAT</span>
        <span>&nbsp;${money(currency, vat)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:14px;color:#111;font-weight:700;margin-top:10px;padding-top:10px;border-top:1px solid #eee;">
        <span>Total</span>
        <span>&nbsp;${money(currency, total)}</span>
      </div>
    </div>

    <hr style="margin:24px 0"/>

    <div style="margin-top:18px;padding-top:14px;border-top:1px solid #eee;color:#666;font-size:12px;line-height:1.6;">
      <strong style="color:#111">Need help?</strong><br/>
      Email us at <a href="mailto:${EMAIL_FROM}" style="color:#111;text-decoration:underline;">${EMAIL_FROM}</a><br/>
      Call us at <a href="tel:${STUDIO_PHONE.replace(/\s+/g,'')}" style="color:#111;text-decoration:underline;">${STUDIO_PHONE}</a><br/>
      <a href="${DIRECTIONS_URL}" target="_blank" rel="noopener" style="color:#111;text-decoration:underline;">Get Directions</a><br/>
      <span style="color:#777">${STUDIO_ADDRESS}</span>
    </div>

    <p style="margin-top:14px;font-size:12px;color:#777">
      ${STUDIO_NAME} • Dubai, UAE
    </p>
  </div>
  `

  const text = `
Thank you for your order, ${customerName}!

Order ID: ${order.orderRef}

Order Details:
${(order.lines || [])
  .map((l) => {
    const slot = l.type === 'activity' ? formatDubaiSlot(l.meta?.slotStartISO, l.meta?.slotEndISO) : ''
    const qty = Math.max(1, Number(l.qty || 1))
    const unit = Number(l.priceMajor || 0)
    const lineTotal = unit * qty
    return `- ${l.title} | Qty: ${qty} | Unit: ${money(currency, unit)} | Line: ${money(currency, lineTotal)}${slot ? ` | ${slot}` : ''}`
  })
  .join('\n')}

Subtotal: ${money(currency, subtotalExVat)}
${order.promoCode ? `Promo (${order.promoCode}): ${discountExVat > 0 ? `- ${money(currency, discountExVat)}` : 'Applied'}` : ''}
VAT: ${money(currency, vat)}
Total: ${money(currency, total)}

Need help?
Email: ${EMAIL_FROM}
Phone: ${STUDIO_PHONE}
Get Directions: ${DIRECTIONS_URL}
Address: ${STUDIO_ADDRESS}

— ${STUDIO_NAME}
`

  try {
    const result = await resend.emails.send({
      from: EMAIL_FROM,
      to: customerEmail,
      replyTo: EMAIL_FROM,
      subject: `Order Confirmed — Meraki Art Studio (Order #${order.orderRef})`,
      html,
      text,
    })

    console.log('[EMAIL] Resend send OK', {
      orderRef: order.orderRef,
      to: customerEmail,
      id: (result as any)?.id,
      result,
    })

    return result
  } catch (err: any) {
    // Resend SDK errors sometimes include statusCode/message.
    console.error('[EMAIL] Resend send FAILED', {
      orderRef: order?.orderRef,
      to: customerEmail,
      statusCode: err?.statusCode,
      message: err?.message,
      error: err,
    })
    throw err
  }
}