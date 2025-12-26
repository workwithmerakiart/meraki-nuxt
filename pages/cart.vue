<template>
    <section class="bg-white min-h-screen">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="text-2xl md:text-3xl font-bold text-black mb-6">My Cart</h1>

            <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                <!-- Items -->
                <div class="space-y-4">
                    <template v-if="!items.length">
                        <div class="border border-black rounded p-8 text-center">
                            <p class="text-black mb-4">Your cart is empty.</p>
                            <NuxtLink to="/shop/products"
                                class="inline-block border border-black px-4 py-2 rounded hover:bg-black hover:text-white">
                                Browse Products
                            </NuxtLink>
                        </div>
                    </template>
                    <template v-else>
                        <div v-for="it in lines" :key="it.key" class="flex gap-4 border border-black rounded p-3">
                            <div class="w-24 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                                <img v-if="it.image" :src="it.image" :alt="it.title"
                                    class="w-full h-full object-cover" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-sm font-semibold text-black truncate">{{ it.title }}</h3>
                                <p class="text-xs text-black/70 mt-0.5">{{ money(it.priceMajor) }}</p>

                                <div class="mt-2 flex items-center gap-2">
                                    <button class="px-2 border border-black" @click="dec(it.key)"
                                        aria-label="Decrease">–</button>
                                    <span class="text-sm w-8 text-center" aria-live="polite">{{ it.qty }}</span>
                                    <button class="px-2 border border-black" @click="inc(it.key)"
                                        aria-label="Increase">+</button>
                                    <button class="ml-auto text-xs underline" @click="remove(it.key)">Remove</button>
                                </div>
                            </div>
                        </div>

                        <!-- Promo + Note actions -->
                        <div class="mt-2 space-y-3">
                            <div>
                                <button type="button" class="text-sm underline" @click="showPromo = !showPromo">Enter a
                                    promo code</button>
                                <div v-if="showPromo" class="mt-2 flex gap-2">
                                    <input v-model="promoInput" type="text" inputmode="text" placeholder="e.g., SAVE10"
                                        class="flex-1 border border-black rounded px-3 py-2 text-sm" @keyup.enter="onApplyPromo" />
                                    <button @click="onApplyPromo"
                                        class="px-4 py-2 text-sm border border-black bg-black text-white rounded">Apply</button>
                                    <button v-if="hasPromoApplied" @click="onClearPromo"
                                        class="px-3 py-2 text-sm border border-black rounded">Clear</button>
                                </div>
                                <p
                                  v-if="promoMessage"
                                  :class="[
                                    'text-xs mt-1',
                                    promoMessageType === 'success'
                                      ? 'text-green-600'
                                      : promoMessageType === 'error'
                                        ? 'text-red-600'
                                        : 'text-black/70'
                                  ]"
                                >
                                  {{ promoMessage }}
                                </p>
                            </div>

                            <div>
                                <button type="button" class="text-sm underline" @click="showNote = !showNote">Add a
                                    note</button>
                                <div v-if="showNote" class="mt-2">
                                    <textarea v-model="noteInput" rows="2"
                                        class="w-full border border-black rounded px-3 py-2 text-sm"
                                        placeholder="Any special instructions..."></textarea>
                                    <div class="mt-2">
                                        <button @click="onSaveNote"
                                            class="px-4 py-2 text-sm border border-black rounded hover:bg-black hover:text-white">Save
                                            note</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Summary -->
                <aside class="border border-black rounded p-4 space-y-2 h-fit">
                    <h2 class="text-lg font-semibold text-black mb-2">Order summary</h2>

                    <div class="flex justify-between text-sm">
                        <span>Subtotal</span><span>{{ money(subtotalExVat) }}</span>
                    </div>
                    <div v-if="discountExVatEff > 0" class="flex justify-between text-sm text-green-600">
                        <span>Discount ({{ promoCodeEff }})</span><span>-{{ money(discountExVatEff) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span>VAT</span><span>{{ money(vatEff) }}</span>
                    </div>
                    <div class="flex justify-between text-sm font-medium border-t border-black pt-2">
                        <span>Total</span><span>{{ money(totalEff) }}</span>
                    </div>

                    <button type="button" @click="checkoutNow" :disabled="lines.length === 0 || submitting"
                            :aria-busy="submitting ? 'true' : 'false'"
                            :class="[
                              'block w-full text-center mt-3 border border-black rounded py-2 text-sm transition-colors',
                              (lines.length === 0)
                                ? 'bg-black text-white opacity-50 cursor-not-allowed'
                                : (submitting
                                    ? 'bg-white text-black cursor-wait'
                                    : 'bg-black text-white hover:bg-white hover:text-black')
                            ]">
                      {{ submitting ? 'Processing…' : 'Checkout' }}
                    </button>
                    <p v-if="submitError" class="mt-2 text-xs text-red-600">{{ submitError }}</p>
                </aside>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
definePageMeta({ ssr: false })
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '#imports'

useHead({
  bodyAttrs: {
    class: 'page-cart',
  },
})

function round2(n: number) { return Math.round((Number(n) + Number.EPSILON) * 100) / 100 }

import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
const items = computed(() => cart.items)
const lines = computed(() => cart.linesDetailed)     // provides lineNet, lineVat, lineGross
const currency = computed(() => cart.currency)
const subtotalExVat = computed(() => cart.subtotalExVat)
const vatTotal = computed(() => cart.vatTotal)
const total = computed(() => cart.total)

const router = useRouter()

// Fallback-aware promo/totals (works even if store lacks promo getters)
const hasPromoGetters = computed(() =>
    'discountExVat' in cart && 'vatTotalAfterDiscount' in cart && 'totalAfterDiscount' in cart
)

// Local promo fallback (used only if store has no promo actions/getters)
const localPromo = ref<{ code: string; type: 'percent' | 'amount'; value: number } | null>(null)
const promoCatalog = [
    { code: 'SAVE10', type: 'percent' as const, value: 10 },
    { code: 'WELCOME25', type: 'amount' as const, value: 25 },
]

const promoCodeEff = computed(() => (cart as any).promoCode ?? localPromo.value?.code ?? '')

const discountExVatEff = computed<number>(() => {
    if (hasPromoGetters.value) return (cart as any).discountExVat as number
    const base = subtotalExVat.value || 0
    const p = localPromo.value
    if (!p || base <= 0) return 0
    const d = p.type === 'percent' ? base * (p.value / 100) : p.value
    return round2(Math.min(d, base))
})

// Prefer store VAT if present; otherwise default to 5% of subtotal
const vatBase = computed<number>(() => {
    const vt = Number(vatTotal.value)
    if (vt > 0) return vt
    return round2((subtotalExVat.value || 0) * 0.05)
})

const vatEff = computed<number>(() => {
    const base = subtotalExVat.value || 0
    if (base <= 0) return 0
    const d = discountExVatEff.value
    const ratio = Math.max(0, (base - d) / base)
    return round2(vatBase.value * ratio)
})

const totalEff = computed<number>(() => {
    const base = subtotalExVat.value || 0
    const d = discountExVatEff.value
    return round2(Math.max(0, base - d) + vatEff.value)
})

// Promo + Note UI state
const showPromo = ref(false)
const promoInput = ref('')
const promoMessage = ref('')
const promoMessageType = ref<'success' | 'error' | ''>('')
const hasPromoApplied = computed(() => !!((cart as any).promoCode || localPromo.value))
const showNote = ref(false)
const noteInput = ref(cart.note || '')

const PROMO_STORAGE_KEY = 'meraki_cart_promo'

function onApplyPromo() {
    const code = (promoInput.value || '').trim().toUpperCase()
    if (!code) {
        promoMessage.value = 'Enter a code'
        promoMessageType.value = 'error'
        return
    }

    const anyCart = cart as any
    if (typeof anyCart.applyPromo === 'function') {
        const res = anyCart.applyPromo(code)
        promoMessage.value = res.ok ? 'Promo applied' : (res.message || 'Invalid promo code')
        promoMessageType.value = res.ok ? 'success' : 'error'
        if (res.ok) localPromo.value = null
        if (res.ok) { try { localStorage.setItem(PROMO_STORAGE_KEY, code) } catch { /* noop */ } }
        return
    }
    const found = promoCatalog.find(p => p.code === code)
    if (found) {
        localPromo.value = found
        promoMessage.value = 'Promo applied'
        promoMessageType.value = 'success'
        try { localStorage.setItem(PROMO_STORAGE_KEY, code) } catch { /* noop */ }
    } else {
        promoMessage.value = 'Invalid promo code'
        promoMessageType.value = 'error'
    }
}

function onClearPromo() {
    const anyCart = cart as any
    if (typeof anyCart.clearPromo === 'function') anyCart.clearPromo()
    localPromo.value = null
    promoMessage.value = ''
    promoInput.value = ''
    promoMessageType.value = ''
    try { localStorage.removeItem(PROMO_STORAGE_KEY) } catch { /* noop */ }
}

function onSaveNote() {
    cart.setNote(noteInput.value)
}

function money(n: unknown) {
    const val = (n as any)?.value !== undefined ? (n as any).value : n
    const v = Number(val)
    if (!Number.isFinite(v)) return `${currency.value} 0.00`
    return `${currency.value} ${v.toFixed(2)}`
}

function inc(key: string) { cart.increment(key) }
function dec(key: string) { cart.decrement(key) }
function remove(key: string) { cart.remove(key) }

onMounted(() => {
    try {
        const saved = localStorage.getItem(PROMO_STORAGE_KEY)
        if (saved) {
            promoInput.value = saved
            onApplyPromo()
        }
    } catch { /* noop */ }
})

const submitting = ref(false)
const submitError = ref('')
const MIN_SPIN_MS = 800

function normalizePromoCode() {
  return (promoCodeEff.value || '').trim().toUpperCase() || null
}

function buildCheckoutPayload() {
  const linePayload = lines.value.map((l: any) => ({
    id: l.id,
    sku: l.sku,
    title: l.title,
    image: l.image,
    type: l.type,
    qty: l.qty,
    priceMajor: l.priceMajor,      // unit price in major units (AED)
    vatEnabled: l.vatEnabled,
    vatIncluded: l.vatIncluded,
    vatRate: l.vatRate,
    variantKey: l.variantKey,
  }))
  return {
    currency: currency.value || 'AED',
    lines: linePayload,
    promoCode: normalizePromoCode(),
    note: cart.note ?? '',
    totals: {
      subtotalExVat: subtotalExVat.value || 0,
      discountExVat: discountExVatEff.value || 0,
      vat: vatEff.value || 0,
      total: totalEff.value || 0,
    },
    // Timestamp for idempotency/debug
    ts: Date.now(),
  }
}

async function checkoutNow() {
  submitError.value = ''
  if (!lines.value.length || submitting.value) return
  submitting.value = true
  const started = Date.now()
  try {
    const payload = buildCheckoutPayload()
    const q = encodeURIComponent(JSON.stringify(payload))
    await router.push({ path: '/checkout', query: { payload: q } })
    return
  } catch (e: any) {
    console.error('checkoutNow route error', e)
    const msg = typeof e?.message === 'string' ? e.message : 'Could not open checkout. Please try again.'
    submitError.value = msg
  } finally {
    const elapsed = Date.now() - started
    const wait = Math.max(0, MIN_SPIN_MS - elapsed)
    if (wait) await new Promise(r => setTimeout(r, wait))
    submitting.value = false
  }
}
</script>
<style>
/* Page-specific header theme overrides (force black logo + hamburger) */
body.page-cart header,
body.page-cart header * {
  color: #000 !important;
}

/* SVG icons (hamburger as svg) */
body.page-cart header svg,
body.page-cart header svg * {
  fill: #000 !important;
  stroke: #000 !important;
}

/* Logo as an <img> (common for white PNG/SVG-in-img). Make it black */
body.page-cart header a[href="/"] img,
body.page-cart header a[href="/"] picture img,
body.page-cart header [class*="logo"] img,
body.page-cart header [id*="logo"] img {
  filter: brightness(0) !important;
}

/* Hamburger built from spans/divs */
body.page-cart header button span,
body.page-cart header button i,
body.page-cart header [class*="hamburger"] span,
body.page-cart header [class*="burger"] span,
body.page-cart header [class*="menu"] span {
  background-color: #000 !important;
  border-color: #000 !important;
}

/* Some hamburger implementations use pseudo elements */
body.page-cart header [class*="hamburger"]::before,
body.page-cart header [class*="hamburger"]::after,
body.page-cart header [class*="burger"]::before,
body.page-cart header [class*="burger"]::after {
  background-color: #000 !important;
  border-color: #000 !important;
}

/* If your header uses a transparent background, keep it readable on this page */
body.page-cart header {
  background: transparent !important;
}
</style>