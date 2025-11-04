<template>
  <div class="min-h-screen bg-white">
    <div class="max-w-6xl mx-auto px-4 pt-10 md:pt-14 pb-10">

      <h1 class="text-3xl font-semibold mb-8">Checkout</h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left: form -->
        <div class="lg:col-span-2 order-2 lg:order-1">
          <section class="space-y-6">
            <div>
              <h2 class="text-xl font-medium mb-2">Confirm Details</h2>
              <p class="text-sm text-gray-600">Enter your details and review your order before payment.</p>
            </div>

            <div v-if="notice" class="text-sm text-gray-700 bg-gray-50 border rounded p-4">
              {{ notice }}
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm mb-1">Name *</label>
                <input v-model="form.name" @blur="touched.name = true" type="text" class="w-full border rounded px-3 py-2" />
                <p v-if="touched.name && !nameValid" class="mt-1 text-xs text-red-600">Enter your full name (letters, spaces, ' and - only).</p>
              </div>
              <div>
                <label class="block text-sm mb-1">Email *</label>
                <input v-model="form.email" @blur="touched.email = true" type="email" class="w-full border rounded px-3 py-2" />
                <p v-if="touched.email && !emailValid" class="mt-1 text-xs text-red-600">Enter a valid email address.</p>
              </div>
            </div>

            <div>
              <label class="block text-sm mb-1">Phone Number *</label>
              <input v-model="form.phone" @blur="touched.phone = true" type="tel" class="w-full border rounded px-3 py-2" />
              <p v-if="touched.phone && !phoneValid" class="mt-1 text-xs text-red-600">Enter a valid phone number (7+ digits).</p>
            </div>

            <div class="mt-2 flex items-center gap-3">
              <button
                type="button"
                @click="continueToStripe"
                :disabled="submitting || !allValid"
                :class="['px-6 py-3 rounded font-medium transition-colors', (submitting || !allValid) ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-white hover:text-black border border-black']"
              >
                {{ submitting ? 'Processing…' : 'Continue' }}
              </button>
              <button
                type="button"
                @click="goBack"
                class="px-6 py-3 rounded font-medium transition-colors border border-black bg-white text-black hover:bg-black hover:text-white"
              >
                Back
              </button>
            </div>
            <p v-if="errorText" class="mt-2 text-sm text-red-600">{{ errorText }}</p>
          </section>
        </div>

        <!-- Right: summary -->
        <aside class="lg:col-span-1 order-1 lg:order-2">
          <div class="border rounded p-5 space-y-6">
            <div>
              <h3 class="text-lg font-semibold">Order Details</h3>
              <ul class="mt-3 space-y-3">
                <li v-for="(l, idx) in lines" :key="idx" class="flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-14 h-14 bg-gray-100 flex-shrink-0 overflow-hidden rounded">
                      <img v-if="l.image" :src="l.image" :alt="l.title" class="w-full h-full object-cover" />
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium truncate">{{ l.title }}</p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-800 whitespace-nowrap">Qty {{ l.qty }} • {{ money(l.priceMajor) }}</div>
                </li>
              </ul>
              <p v-if="promoCode" class="mt-2 text-xs text-green-700">Promo applied: <span class="font-medium">{{ promoCode }}</span></p>
            </div>

            <div class="pt-1 border-t"></div>

            <div>
              <h4 class="text-sm font-semibold mb-2">Payment Summary</h4>
              <div class="flex justify-between text-sm py-1">
                <span>Subtotal</span>
                <span>{{ money(subtotalExVat) }}</span>
              </div>
              <div v-if="discountExVat > 0" class="flex justify-between text-sm py-1">
                <span>Discount<span v-if="promoCode"> ({{ promoCode }})</span></span>
                <span>-{{ money(discountExVat) }}</span>
              </div>
              <div class="flex justify-between text-sm py-1">
                <span>VAT</span>
                <span>{{ money(vatTotal) }}</span>
              </div>
              <div class="flex justify-between text-base font-semibold py-2 border-t mt-2">
                <span>Total</span>
                <span>{{ money(totalGross) }}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
function goBack() {
  try {
    if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
      router.back()
    } else {
      router.push('/cart')
    }
  } catch {
    router.push('/cart')
  }
}

// TODO(lead-capture): flip to true when your Sheets endpoint is ready
const BEACON_ENABLED = false
const BEACON_URL = '/api/forms/checkout' // server endpoint that will forward to Google Sheets

// --- Parse payload from cart
const raw = route.query.payload ? decodeURIComponent(String(route.query.payload)) : '{}'
let parsed
try { parsed = JSON.parse(raw) } catch { parsed = {} }

const currencyCode = parsed.currency || 'AED'
const promoCode = parsed.promoCode || null
const lines = Array.isArray(parsed.lines) ? parsed.lines : []

// Fallbacks if totals from cart were not provided
function round2(n) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100 }

function unitNet(l) {
  const rate = Number(l?.vatRate ?? 0)
  const enabled = Boolean(l?.vatEnabled)
  const included = Boolean(l?.vatIncluded)
  const price = Number(l?.priceMajor || 0)
  if (enabled && included && rate > 0) return price / (1 + rate / 100)
  return price
}
function lineNet(l) { return round2(unitNet(l) * Number(l?.qty || 0)) }
function lineVat(l) {
  const rate = Number(l?.vatRate ?? 0)
  const enabled = Boolean(l?.vatEnabled)
  return enabled && rate > 0 ? round2(lineNet(l) * rate / 100) : 0
}
function lineGross(l) { return round2(lineNet(l) + lineVat(l)) }

const providedTotals = parsed.totals || null
const subtotalExVat = computed(() => providedTotals ? Number(providedTotals.subtotalExVat || 0) : round2(lines.reduce((s, l) => s + lineNet(l), 0)))
const discountExVat = computed(() => providedTotals ? Number(providedTotals.discountExVat || 0) : 0)

// If no provided VAT, compute proportionally on discounted base
const vatTotal = computed(() => {
  if (providedTotals) return Number(providedTotals.vat || 0)
  const sub = subtotalExVat.value
  if (sub <= 0) return 0
  const disc = discountExVat.value
  // allocate discount across lines proportionally
  let allocated = 0
  return round2(lines.reduce((sum, l, idx) => {
    const ln = lineNet(l)
    const share = idx === lines.length - 1 ? (disc - allocated) : round2((ln / sub) * disc)
    allocated = round2(allocated + share)
    const baseAfterDisc = Math.max(0, ln - share)
    const rate = Number(l?.vatRate ?? 0)
    const enabled = Boolean(l?.vatEnabled)
    const vat = enabled && rate > 0 ? round2(baseAfterDisc * rate / 100) : 0
    return sum + vat
  }, 0))
})

const totalGross = computed(() => round2(Math.max(0, subtotalExVat.value - discountExVat.value) + vatTotal.value))

function money(n) { return `${currencyCode} ${Number(n || 0).toFixed(2)}` }

// --- Form
const form = reactive({ name: '', email: '', phone: '' })
const touched = reactive({ name: false, email: false, phone: false })
const nameRe = /^[A-Za-z\u00C0-\u024F' -]{2,}$/
const emailRe = /.+@.+\..+/
const phoneRe = /^[0-9+()\-\s]{6,20}$/

const nameValid = computed(() => nameRe.test(String(form.name || '').trim()))
const emailValid = computed(() => emailRe.test(String(form.email || '').trim()))
const phoneValid = computed(() => {
  const raw = String(form.phone || '').trim()
  if (!phoneRe.test(raw)) return false
  const digits = raw.replace(/\D/g, '')
  return digits.length >= 7
})
const allValid = computed(() => nameValid.value && emailValid.value && phoneValid.value)

const notice = ''
const submitting = ref(false)
const errorMsg = ref(null)
const errorText = computed(() => (typeof errorMsg.value === 'string' ? errorMsg.value : ''))


function submitLeadFireAndForget() {
  if (!BEACON_ENABLED) return // TODO: enable when SHEET_WEBHOOK_URL is configured server-side
  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      promoCode: promoCode || '',
      currency: currencyCode,
      totals: {
        subtotalExVat: subtotalExVat.value,
        discountExVat: discountExVat.value,
        vat: vatTotal.value,
        total: totalGross.value,
      },
      lines,
      cartTs: parsed.ts || Date.now(),
      source: 'cart-checkout',
    }

    // Prefer sendBeacon so redirect to Stripe doesn't cancel this request
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon(BEACON_URL, blob)
    } else {
      // Fallback, non-blocking
      fetch(BEACON_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {})
    }
  } catch (e) {
    // Never block payment flow due to lead capture errors
    console.warn('lead capture (beacon) failed', e)
  }
}

async function continueToStripe() {
  errorMsg.value = null
  if (submitting.value) return
  touched.name = true; touched.email = true; touched.phone = true
  if (!allValid.value) {
    errorMsg.value = 'Please provide a valid name, email, and phone number.'
    return
  }

  submitting.value = true
  try {
    // Non-blocking lead capture (TODO: enable by setting BEACON_ENABLED=true and backend Sheets webhook)
    submitLeadFireAndForget()

    // Minimal metadata for aftercare / Google Sheet
    const meta = {
      source: 'cart-checkout',
      name: form.name,
      email: form.email,
      phone: form.phone,
      promoCode: promoCode || '',
      cartTs: parsed.ts || Date.now(),
    }

    const res = await $fetch('/api/checkout/session', {
      method: 'POST',
      body: {
        lines,
        promoCode: promoCode,
        note: JSON.stringify(meta),
      },
    })

    if (res && res.url) {
      window.location.href = res.url
    } else {
      errorMsg.value = 'Unable to start payment. Please try again.'
    }
  } catch (e) {
    console.error(e)
    const msg = e?.data?.error || e?.message || 'Something went wrong. Please try again.'
    errorMsg.value = String(msg)
  } finally {
    submitting.value = false
  }
}
</script>