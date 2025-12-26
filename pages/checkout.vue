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
                <input v-model="form.name" @blur="touched.name = true" type="text"
                  class="w-full border rounded px-3 py-2" />
                <p v-if="touched.name && !nameValid" class="mt-1 text-xs text-red-600">Enter your full name (letters,
                  spaces, ' and - only).</p>
              </div>
              <div>
                <label class="block text-sm mb-1">Email *</label>
                <input v-model="form.email" @blur="touched.email = true" type="email"
                  class="w-full border rounded px-3 py-2" />
                <p v-if="touched.email && !emailValid" class="mt-1 text-xs text-red-600">Enter a valid email address.
                </p>
              </div>
            </div>

            <div>
              <label class="block text-sm mb-1">Phone Number *</label>

              <div class="flex w-full gap-3">
                <!-- Country picker (flag + dial code only) -->
                <div class="w-40 md:w-44 flex-shrink-0">
                  <VueTelInput v-model="countryModel" :defaultCountry="selectedCountryIso2" :autoDefaultCountry="true"
                    :validCharactersOnly="true" :autoFormat="false" :mode="'international'"
                    :dropdownOptions="{ showFlags: true, showDialCodeInSelection: true, showSearchBox: true }"
                    :inputOptions="{ placeholder: '', autocomplete: 'off', readonly: true }" class="w-full country-only"
                    @blur="touched.phone = true" @country-changed="onCountryChanged" />
                </div>

                <!-- National digits (validated separately) -->
                <div class="flex-1">
                  <input v-model="phoneNational" @blur="touched.phone = true" type="tel" inputmode="numeric"
                    autocomplete="tel-national" class="w-full border rounded px-3 py-2"
                    :placeholder="phonePlaceholder" />
                </div>
              </div>

              <p v-if="touched.phone && !phoneValid" class="mt-1 text-xs text-red-600">
                Enter a valid phone number ({{ minDigits }}–{{ maxDigits }} digits).
              </p>
            </div>

            <div class="mt-2 flex items-center gap-3">
              <button type="button" @click="continueToStripe" :disabled="submitting || !allValid"
                :class="['px-6 py-3 rounded font-medium transition-colors', (submitting || !allValid) ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-white hover:text-black border border-black']">
                {{ submitting ? 'Processing…' : 'Continue' }}
              </button>
              <button type="button" @click="goBack"
                class="px-6 py-3 rounded font-medium transition-colors border border-black bg-white text-black hover:bg-black hover:text-white">
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
              <p v-if="promoCode" class="mt-2 text-xs text-green-600">Promo applied: <span class="font-medium">{{
                promoCode }}</span></p>
            </div>

            <div class="pt-1 border-t"></div>

            <div>
              <h4 class="text-sm font-semibold mb-2">Payment Summary</h4>
              <div class="flex justify-between text-sm py-1">
                <span>Subtotal</span>
                <span>{{ money(subtotalExVat) }}</span>
              </div>
              <div v-if="discountExVat > 0" class="flex justify-between text-sm py-1 text-green-600">
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
import { computed, reactive, ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const route = useRoute()

useHead({
  bodyAttrs: {
    class: 'page-checkout',
  },
})

const router = useRouter()
const cart = useCartStore()

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

// Google Sheets webhook configuration
const BEACON_ENABLED = true
const BEACON_URL = 'https://script.google.com/macros/s/AKfycbx9ofgbLM83CrMFaIkkY1VnkKnFpmibeBkn_cYyTN-Ug3gmOKRadhgJedWFlFDv3eAL/exec'

// --- Parse payload from cart (or fall back to Pinia store)
const raw = route.query.payload ? decodeURIComponent(String(route.query.payload)) : null
let parsed
try { parsed = raw ? JSON.parse(raw) : {} } catch { parsed = {} }

// If user lands on /checkout without payload, build from cart store
if (!Array.isArray(parsed?.lines) || parsed.lines.length === 0) {
  const anyCart = cart
  parsed = {
    currency: anyCart.currency || 'AED',
    promoCode: anyCart.promoCode || null,
    note: anyCart.note ?? '',
    lines: (anyCart.linesDetailed || []).map((l) => ({
      id: l.id,
      sku: l.sku,
      title: l.title,
      image: l.image,
      type: l.type,
      qty: l.qty,
      priceMajor: l.priceMajor,
      vatEnabled: l.vatEnabled,
      vatIncluded: l.vatIncluded,
      vatRate: l.vatRate,
      variantKey: l.variantKey,
    })),
    totals: {
      subtotalExVat: Number(anyCart.subtotalExVat || 0),
      discountExVat: Number(anyCart.discountExVat || 0),
      vat: Number(anyCart.vatTotalAfterDiscount ?? anyCart.vatTotal ?? 0),
      total: Number(anyCart.totalAfterDiscount ?? anyCart.total ?? 0),
    },
    ts: Date.now(),
  }
}

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

// Phone: use vue-tel-input ONLY for country picker (flag + dial code)
const countryModel = ref('')
const selectedCountryIso2 = ref('AE')

// User-entered national digits ONLY (no country code)
const phoneNational = ref('')

// Structured parts for Sheets + Stripe metadata
const phoneParts = reactive({
  iso2: 'AE',
  countryCode: '+971',
  phone: '',
  phoneFull: '',
})

// Per-country digit rules (extend as needed)
const minDigitsByIso2 = { AE: 9 }
const maxDigitsByIso2 = { AE: 9 }

const minDigits = computed(() => minDigitsByIso2[selectedCountryIso2.value] ?? 8)
const maxDigits = computed(() => maxDigitsByIso2[selectedCountryIso2.value] ?? 15)

const phonePlaceholder = computed(() =>
  selectedCountryIso2.value === 'AE' ? 'e.g. 55 507 1234' : 'Phone number'
)

function syncPhoneParts() {
  const dialDigits = String(phoneParts.countryCode || '').replace(/\D/g, '')
  const nationalDigits = String(phoneNational.value || '').replace(/\D/g, '')
  phoneParts.phone = nationalDigits
  phoneParts.phoneFull = dialDigits && nationalDigits ? `+${dialDigits}${nationalDigits}` : ''
}

function onCountryChanged(country) {
  if (!country) return

  const iso2 = String(country?.iso2 || 'AE').toUpperCase()
  const dial = String(country?.dialCode || '971').replace(/\D/g, '')

  selectedCountryIso2.value = iso2
  phoneParts.iso2 = iso2
  phoneParts.countryCode = dial ? `+${dial}` : ''

  syncPhoneParts()
}

// Watch phoneNational for changes and sync
watch(phoneNational, () => {
  syncPhoneParts()
})

const phoneValid = computed(() => {
  const digits = String(phoneNational.value || '').replace(/\D/g, '')
  if (!digits) return false
  return digits.length >= minDigits.value && digits.length <= maxDigits.value
})

const nameRe = /^[A-Za-z\u00C0-\u024F' -]{2,}$/
const emailRe = /.+@.+\..+/

const nameValid = computed(() => nameRe.test(String(form.name || '').trim()))
const emailValid = computed(() => emailRe.test(String(form.email || '').trim()))
const allValid = computed(() => nameValid.value && emailValid.value && phoneValid.value)

const touched = reactive({ name: false, email: false, phone: false })

const notice = ''
const submitting = ref(false)
const errorMsg = ref(null)
const errorText = computed(() => (typeof errorMsg.value === 'string' ? errorMsg.value : ''))

function submitLeadFireAndForget() {
  if (!BEACON_ENABLED) return

  try {
    const payload = {
      name: form.name,
      email: form.email,
      countryCode: phoneParts.countryCode || '',
      phone: phoneParts.phone || '',
      phoneFull: phoneParts.phoneFull || '',
      promoCode: promoCode || '',
      currency: currencyCode,

      // ✅ FIX: Send totals as an object (matching what the script expects)
      totals: {
        subtotalExVat: subtotalExVat.value,
        discountExVat: discountExVat.value,
        vat: vatTotal.value,
        total: totalGross.value,           // ← This is what the script reads
      },

      // ✅ FIX: Send lines array (matching what the script expects)
      lines: lines.map(l => ({
        title: l.title,
        qty: l.qty,
        priceMajor: l.priceMajor
      })),

      // ✅ FIX: Send cart timestamp
      cartTs: parsed.ts || Date.now(),
      ts: Date.now(),                      // ← Backup timestamp field

      source: 'cart-checkout',
    }

    // Use sendBeacon for reliability during page navigation
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' })
      navigator.sendBeacon(BEACON_URL, blob)
    } else {
      // Fallback for older browsers
      fetch(BEACON_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => { })
    }
  } catch (e) {
    console.warn('lead capture (beacon) failed', e)
  }
}


async function continueToStripe() {
  errorMsg.value = null
  if (submitting.value) return

  touched.name = true
  touched.email = true
  touched.phone = true

  if (!allValid.value) {
    errorMsg.value = 'Please provide a valid name, email, and phone number.'
    return
  }

  submitting.value = true

  try {
    // Keep legacy form.phone in sync
    form.phone = String(phoneParts.phoneFull || '')

    // Non-blocking lead capture BEFORE Stripe redirect
    submitLeadFireAndForget()

    // Small delay to ensure beacon is queued
    await new Promise(resolve => setTimeout(resolve, 100))

    // Minimal metadata for Stripe
    const meta = {
      source: 'cart-checkout',
      name: form.name,
      email: form.email,
      phone: String(phoneParts.phoneFull || ''),
      countryCode: phoneParts.countryCode || '',
      phoneNational: phoneParts.phone || '',
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

// Initialize phone parts on mount
onMounted(() => {
  syncPhoneParts()
})
</script>

<style>
/* Make vue-tel-input match existing inputs */
:deep(.vue-tel-input) {
  border: 1px solid #000;
  border-radius: 0.375rem;
  background: #fff;
  padding: 0;
  min-height: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
}

/* Left dropdown (flag + dial code) */
:deep(.vue-tel-input .vti__dropdown) {
  border-right: 1px solid #00000022;
  padding: 0 0.75rem;
  height: 100%;
  display: flex;
  align-items: center;
}

/* Right input */
:deep(.vue-tel-input input) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  width: 100%;
  padding: 0 0.75rem;
  height: 100%;
  line-height: 1.5rem;
  box-sizing: border-box;
}

:deep(.vue-tel-input .vti__input) {
  height: 100%;
  display: flex;
  align-items: center;
}

/* Country-only mode: hide the internal input */
:deep(.country-only.vue-tel-input .vti__input) {
  display: none !important;
}

:deep(.vue-tel-input:focus-within) {
  outline: 2px solid rgba(37, 99, 235, 0.25);
  outline-offset: 0px;
}

/* Page-specific header theme overrides */
body.page-checkout header,
body.page-checkout header * {
  color: #000 !important;
}

body.page-checkout header svg,
body.page-checkout header svg * {
  fill: #000 !important;
  stroke: #000 !important;
}

body.page-checkout header a[href="/"] img,
body.page-checkout header a[href="/"] picture img,
body.page-checkout header [class*="logo"] img,
body.page-checkout header [id*="logo"] img {
  filter: brightness(0) !important;
}

body.page-checkout header button span,
body.page-checkout header button i,
body.page-checkout header [class*="hamburger"] span,
body.page-checkout header [class*="burger"] span,
body.page-checkout header [class*="menu"] span {
  background-color: #000 !important;
  border-color: #000 !important;
}

body.page-checkout header [class*="hamburger"]::before,
body.page-checkout header [class*="hamburger"]::after,
body.page-checkout header [class*="burger"]::before,
body.page-checkout header [class*="burger"]::after {
  background-color: #000 !important;
  border-color: #000 !important;
}

body.page-checkout header {
  background: transparent !important;
}
</style>
