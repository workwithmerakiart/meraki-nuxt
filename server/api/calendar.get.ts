// File: server/api/calendar.get.ts  // NEW
import { google } from 'googleapis' // NEW

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
  const fb = await calendar.freebusy.query({                   // NEW
    requestBody: {
      timeMin: new Date(query.start).toISOString(),
      timeMax: new Date(query.end).toISOString(),
      timeZone: 'UTC',
      items: [{ id: CALENDAR_ID }],
    },
  }) // NEW

  const busy = (fb.data.calendars?.[CALENDAR_ID]?.busy || []) as { start: string; end: string }[] // NEW

  // Build 30-min availability by subtracting busy from daily window // NEW
  const SLOT_START = process.env.SLOT_START || '10:00' // NEW
  const SLOT_END = process.env.SLOT_END || '21:00'     // NEW
  const STEP = Number(process.env.SLOT_INTERVAL || 30) // NEW

  const byDate: Record<string, string[]> = {} // NEW
  const start = new Date(query.start) // NEW
  const end = new Date(query.end)     // NEW

  const toMinutes = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m } // NEW
  const toTime = (mins: number) => { const h = String(Math.floor(mins/60)).padStart(2,'0'); const m = String(mins%60).padStart(2,'0'); return `${h}:${m}` } // NEW

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) { // NEW
    const dateStr = d.toISOString().split('T')[0] // NEW
    const dayStart = toMinutes(SLOT_START) // NEW
    const dayEnd = toMinutes(SLOT_END)     // NEW

    const dayBusy = busy.filter(b => b.start.startsWith(dateStr) || b.end.startsWith(dateStr)) // NEW
    const daySlots: string[] = [] // NEW

    for (let m = dayStart; m < dayEnd; m += STEP) { // NEW
      const slotStart = new Date(`${dateStr}T${toTime(m)}:00Z`).getTime() // NEW
      const slotEnd = slotStart + STEP * 60 * 1000                         // NEW
      const overlaps = dayBusy.some(b => {                                 // NEW
        const bs = new Date(b.start).getTime()                             // NEW
        const be = new Date(b.end).getTime()                               // NEW
        return slotStart < be && slotEnd > bs                              // NEW
      })                                                                   // NEW
      if (!overlaps) daySlots.push(toTime(m))                              // NEW
    }                                                                       // NEW
    byDate[dateStr] = daySlots                                              // NEW
  }                                                                         // NEW

  return { data: { slots: byDate } } // NEW
}) // NEW
