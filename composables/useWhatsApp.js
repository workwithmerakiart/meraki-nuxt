// Single source for the studio's WhatsApp number and link format.
// Used by the floating widget and by page-level "Text us on WhatsApp" CTAs.
export const WHATSAPP_NUMBER = '+971508523600'

// wa.me expects digits only (no "+", spaces or dashes)
export function whatsappLink(message = '') {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, '')
  return message ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}` : `https://wa.me/${digits}`
}
