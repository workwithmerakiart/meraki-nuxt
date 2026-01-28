// File: server/api/calendar.get.ts
import { google } from 'googleapis'
import { getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => { // NEW
  const query = getQuery(event) as { start?: string; end?: string } // NEW
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

  // Build 30-min availability by subtracting busy from daily window // NEW
  const STEP = Number(process.env.SLOT_INTERVAL || 30)

// Studio hours (Dubai)
// Mon closed; Tue 12–19; Wed–Sun 10–19
const STUDIO_HOURS: Record<number, { open?: string; close?: string }> = {
  1: {}, // Mon closed
  2: { open: '12:00', close: '19:00' }, // Tue
  3: { open: '10:00', close: '19:00' }, // Wed
  4: { open: '10:00', close: '19:00' }, // Thu
  5: { open: '10:00', close: '19:00' }, // Fri
  6: { open: '10:00', close: '19:00' }, // Sat
  0: { open: '10:00', close: '19:00' }, // Sun
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
      const overlaps = busy.some(b => {
        const bs = new Date(b.start).getTime()
        const be = new Date(b.end).getTime()
        return slotStart < be && slotEnd > bs
      })
      if (!overlaps) daySlots.push(toTime(m))
    }
    byDate[dateStr] = daySlots
  }

  return { slots: byDate }
}) // NEW
