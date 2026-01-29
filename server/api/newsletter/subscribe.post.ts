import { readBody, setResponseStatus } from 'h3'

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()
  const url = String(cfg.public?.newsletterBeaconUrl || '').trim()

  if (!url) {
    setResponseStatus(event, 503)
    return { ok: false, error: 'Newsletter is not configured' }
  }

  const body = await readBody(event)
  const email = String(body?.email || '').trim()
  const source = String(body?.source || 'footer-newsletter')

  if (!email) {
    setResponseStatus(event, 400)
    return { ok: false, error: 'Missing email' }
  }

  // Server -> Apps Script (no CORS)
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify({ email, source, ts: Date.now() }),
  })

  // Apps Script should respond JSON { ok: true/false }
  const text = await res.text()
  let parsed: any = null
  try { parsed = JSON.parse(text) } catch { parsed = null }

  if (!res.ok || !parsed?.ok) {
    setResponseStatus(event, 502)
    return { ok: false, error: parsed?.error || text || 'Apps Script failed' }
  }

  return { ok: true }
})