// File: server/api/calendar.get.ts
import { google } from 'googleapis'
import { getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => { // NEW
  const query = getQuery(event) as { start?: string; end?: string; sku?: string; subtypeId?: string; capacity?: string } // NEW
  if (!query.start || !query.end) { // NEW
    throw createError({ statusCode: 400, statusMessage: 'Missing start/end' }) // NEW
  } // NEW

  const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID // NEW
  const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_EMAIL // NEW
  const PRIVATE_KEY_RAW = process.env.GOOGLE_PRIVATE_KEY // NEW

  if (!CALENDAR_ID || !CLIENT_EMAIL || !PRIVATE_KEY_RAW) { // NEW
    throw createError({ statusCode: 500, statusMessage: 'Missing Google Calendar env vars' }) // NEW
  } // NEW

  const PRIVATE_KEY = PRIVATE_KEY_RAW.replace(/\\n/g, '\n') // NEW

  const auth = new google.auth.JWT({ // NEW
    email: CLIENT_EMAIL, // NEW
    key: PRIVATE_KEY, // NEW
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'], // NEW
  }) // NEW

  const calendar = google.calendar({ version: 'v3', auth }) // NEW

  // FreeBusy to get busy blocks for the week                   // NEW
  const fb = await calendar.freebusy.query({
    requestBody: {
      timeMin: new Date(query.start).toISOString(),
      timeMax: new Date(query.end).toISOString(),
      timeZone: 'Asia/Dubai',
      items: [{ id: CALENDAR_ID }],
    },
  })

  const busy = (fb.data.calendars?.[CALENDAR_ID]?.busy || []) as { start: string; end: string }[] // NEW

  // --- Exclusive activity logic for Neon Art Attack (subtypeId === '1.1')
  // Robust detection: sometimes subtypeId is not present in query; fall back to sku/title.
  const qSubtypeId = String(query.subtypeId || '').trim()
  const qSku = String(query.sku || '').trim().toLowerCase()
  const isExclusive = qSubtypeId === '1.1' || qSku === 'neon art attack'
  let anyEventsBusy: { start: string; end: string }[] = []
  if (isExclusive) {
    // Fetch all events (including transparent) in the range
    const eventsRes = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date(query.start).toISOString(),
      timeMax: new Date(query.end).toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      showDeleted: false,
      // Include transparent events by default since we do not filter by transparency here
    })
    const events = eventsRes.data.items || []
    anyEventsBusy = events.map(e => {
      // Normalize start/end from dateTime or date
      const start = e.start?.dateTime || e.start?.date
      const end = e.end?.dateTime || e.end?.date
      return { start, end }
    }).filter(e => e.start && e.end) as { start: string; end: string }[]
  }

  // --- Upstash counters for capacity-based booking (optional)
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

  const STEP = Number(process.env.SLOT_INTERVAL || 30)

// Studio hours (Dubai)
// Mon closed; Tue 12–19; Wed–Sun 10–19
const STUDIO_HOURS: Record<number, { open?: string; close?: string }> = {
  1: {}, // Mon closed
  2: { open: '12:00', close: '18:30' }, // Tue
  3: { open: '10:00', close: '18:30' }, // Wed
  4: { open: '10:00', close: '18:30' }, // Thu
  5: { open: '10:00', close: '18:30' }, // Fri
  6: { open: '10:00', close: '18:30' }, // Sat
  0: { open: '10:00', close: '18:30' }, // Sun
}

// Capacity rules (per slot)
const sku = String(query.sku || '').trim() || 'activity'
const subtypeId = String(query.subtypeId || '').trim()

// Neon Art Attack (subtype 1.1) is exclusive and should be treated as capacity 1.
// Other activities default to configured capacity.
const DEFAULT_ACTIVITY_CAPACITY = Number(process.env.DEFAULT_ACTIVITY_CAPACITY || 12)
const capacityFromQuery = Number(query.capacity || 0)
const capacity = subtypeId === '1.1'
  ? 1
  : (Number.isFinite(capacityFromQuery) && capacityFromQuery > 0 ? capacityFromQuery : DEFAULT_ACTIVITY_CAPACITY)

function slotKey(startISO: string, endISO: string) {
  return `cap:${sku}:${startISO}:${endISO}`
}

  const byDate: Record<string, string[]> = {}
  const start = new Date(query.start)
  const end = new Date(query.end)
  // Normalize to UTC midnight for safe day iteration
  const startDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()))
  const endDay = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()))

  const toMinutes = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m } // NEW
  const toTime = (mins: number) => { const h = String(Math.floor(mins/60)).padStart(2,'0'); const m = String(mins%60).padStart(2,'0'); return `${h}:${m}` } // NEW

  for (let d = new Date(startDay); d <= endDay; d.setUTCDate(d.getUTCDate() + 1)) {
    // Use Dubai date key to match frontend ymdDubai()
const parts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Dubai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).formatToParts(d)
const y = parts.find(p => p.type === 'year')?.value
const mo = parts.find(p => p.type === 'month')?.value
const da = parts.find(p => p.type === 'day')?.value
const dateStr = `${y}-${mo}-${da}`

// Determine weekday in Dubai
const weekday = new Date(`${dateStr}T00:00:00+04:00`).getDay()
const hours = STUDIO_HOURS[weekday] || {}
const daySlots: string[] = []
const daySlotWindows: Array<{ hhmm: string; startISO: string; endISO: string }> = []

// Closed day
if (!hours.open || !hours.close) {
  byDate[dateStr] = []
  continue
}

const dayStart = toMinutes(hours.open)
const dayEnd = toMinutes(hours.close)
    for (let m = dayStart; m < dayEnd; m += STEP) {
      const slotStart = new Date(`${dateStr}T${toTime(m)}:00+04:00`).getTime()
      const slotEnd = slotStart + STEP * 60 * 1000
      const overlapsFreeBusy = busy.some(b => {
        const bs = new Date(b.start).getTime()
        const be = new Date(b.end).getTime()
        return slotStart < be && slotEnd > bs
      })
      const overlapsAnyEvent = isExclusive && anyEventsBusy.some(b => {
        const bs = new Date(b.start).getTime()
        const be = new Date(b.end).getTime()
        return slotStart < be && slotEnd > bs
      })
      const overlaps = overlapsFreeBusy || overlapsAnyEvent
      if (!overlaps) {
        const hhmm = toTime(m)
        const startISO = new Date(`${dateStr}T${hhmm}:00+04:00`).toISOString()
        const endISO = new Date(new Date(`${dateStr}T${hhmm}:00+04:00`).getTime() + STEP * 60 * 1000).toISOString()
        daySlots.push(hhmm)
        daySlotWindows.push({ hhmm, startISO, endISO })
      }
    }
    // Capacity filtering (only if Upstash is configured and we have a sku)
    try {
      if (UPSTASH_URL && UPSTASH_TOKEN && capacity > 0 && daySlotWindows.length) {
        const keys = daySlotWindows.map(w => slotKey(w.startISO, w.endISO))
        const mget = await upstash(['MGET', ...keys])
        const vals: any[] = Array.isArray(mget?.result) ? mget.result : []

        const allowed = daySlotWindows.filter((w, idx) => {
          const booked = Number(vals[idx] || 0)
          return booked < capacity
        }).map(w => w.hhmm)

        byDate[dateStr] = allowed
      } else {
        byDate[dateStr] = daySlots
      }
    } catch {
      // If counter lookup fails, fall back to FreeBusy-only availability
      byDate[dateStr] = daySlots
    }
  }

  return { slots: byDate }
}) // NEW
