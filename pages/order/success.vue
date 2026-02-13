<template>
  <section class="success-page relative min-h-[100svh] bg-white w-full min-w-[100vw] overflow-x-hidden">
    <!-- Background image + overlay -->
    <div class="absolute inset-0 w-full">
      <img
        src="/images/shop/shopnew.webp"
        alt="Meraki Art Studio"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-white/70"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full">
      <div class="mx-auto max-w-3xl px-4 sm:px-6">
      <!-- Give space so it doesn't clash with header strap -->
      <div class="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div class="mx-auto w-full max-w-xl text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full border border-black bg-white">
            <span v-if="uiState === 'paid'" class="text-2xl" aria-hidden="true">✓</span>
            <span v-else-if="uiState === 'failed' || uiState === 'expired'" class="text-2xl" aria-hidden="true">!</span>
            <span v-else class="text-2xl" aria-hidden="true">…</span>
          </div>

          <h1 class="mt-5 text-2xl sm:text-3xl font-semibold text-black">{{ titleText }}</h1>
          <p class="mt-2 text-sm sm:text-base text-black/70">{{ subtitleText }}</p>

          <div class="mt-8 mx-auto w-full max-w-xl rounded-xl border border-black bg-white/90 backdrop-blur p-5 sm:p-6 text-left">
            <!-- Order details (preferred) -->
            <div v-if="order && uiState === 'paid'" class="space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div class="min-w-0">
                  <p class="text-xs uppercase tracking-wider text-black/60">Order confirmed</p>
                  <p class="mt-1 text-sm text-black/70">
                    Order ID:
                    <span class="font-mono text-black break-all">{{ orderRef || '—' }}</span>
                  </p>
                  <p class="mt-1 text-sm text-black/70" v-if="order?.createdAt">
                    Date:
                    <span class="text-black">{{ formatOrderDate(order.createdAt) }}</span>
                  </p>
                  <p class="mt-1 text-sm text-black/70" v-if="amountText">
                    Total paid:
                    <span class="font-medium text-black">{{ amountText }}</span>
                  </p>
                </div>

                <button
                  v-if="orderRef"
                  type="button"
                  class="text-xs underline text-black hover:opacity-70 self-start"
                  @click="copyOrderId"
                >
                  {{ copied ? 'Copied' : 'Copy order ID' }}
                </button>
              </div>

              <!-- Items -->
              <div class="border border-black/10 rounded-lg bg-white/70 overflow-hidden">
                <div class="px-4 py-3 border-b border-black/10">
                  <p class="text-xs uppercase tracking-wider text-black/60">Items</p>
                </div>
                <div class="divide-y divide-black/10">
                  <div
                    v-for="(line, idx) in orderLines"
                    :key="(line?.key || line?.sku || line?.id || idx)"
                    class="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div class="w-14 h-14 sm:w-14 sm:h-14 bg-gray-100 flex-shrink-0 overflow-hidden rounded">
                      <img
                        v-if="line?.image"
                        :src="line.image"
                        :alt="line?.title || 'Item'"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-semibold text-black truncate">{{ line?.title || 'Item' }}</p>
                      <p class="text-xs text-black/70 mt-0.5">
                        Qty: {{ line?.qty || 1 }}
                        <span v-if="line?.priceMajor != null"> • {{ moneyMajor(line.priceMajor) }} each</span>
                      </p>
                      <p
                        v-if="line?.type === 'activity' && line?.meta && (line.meta.slotStartISO || line.meta.selectedSlotISO)"
                        class="text-xs text-black/70 mt-1"
                      >
                        {{ formatDubaiSlot(line.meta) }}
                      </p>
                    </div>
                    <div class="text-sm text-black whitespace-nowrap sm:ml-auto">
                      {{ moneyMajor((Number(line?.priceMajor || 0) * Number(line?.qty || 1))) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Totals -->
              <div class="border border-black/10 rounded-lg bg-white/70 overflow-hidden">
                <div class="px-4 py-3 border-b border-black/10">
                  <p class="text-xs uppercase tracking-wider text-black/60">Summary</p>
                </div>
                <div class="px-4 py-3 space-y-2 text-sm">
                  <div class="flex items-center justify-between">
                    <span class="text-black/70">Subtotal</span>
                    <span class="text-black">{{ moneyMajor(orderTotals.subtotalExVat) }}</span>
                  </div>
                  <div v-if="orderTotals.discountExVat > 0" class="flex items-center justify-between">
                    <span class="text-black/70">Discount</span>
                    <span class="text-black">-{{ moneyMajor(orderTotals.discountExVat) }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-black/70">VAT</span>
                    <span class="text-black">{{ moneyMajor(orderTotals.vat) }}</span>
                  </div>
                  <div class="flex items-center justify-between pt-2 border-t border-black/10 font-medium">
                    <span class="text-black">Total</span>
                    <span class="text-black">{{ moneyMajor(orderTotals.total) }}</span>
                  </div>
                </div>
              </div>

              <!-- Small reference (optional) -->
              <p class="text-[11px] text-black/50 break-all">
                Payment reference: <span class="font-mono">{{ sessionId || '—' }}</span>
              </p>
            </div>

            <!-- Fallback (if order payload is not available yet) -->
            <div v-else class="flex items-start justify-between gap-4">
              <div class="min-w-0">
                <p class="text-xs uppercase tracking-wider text-black/60">Reference</p>
                <p class="mt-1 font-mono text-xs sm:text-sm text-black break-all">{{ sessionId || '—' }}</p>

                <p class="mt-3 text-xs uppercase tracking-wider text-black/60">Order ID</p>
                <p class="mt-1 font-mono text-xs sm:text-sm text-black break-all">{{ orderRef || '—' }}</p>

                <p v-if="amountText" class="mt-2 text-xs text-black/70">Total: <span class="font-medium text-black">{{ amountText }}</span></p>
              </div>
              <button
                v-if="sessionId"
                type="button"
                class="text-xs underline text-black hover:opacity-70"
                @click="copyRef"
              >
                {{ copied ? 'Copied' : 'Copy' }}
              </button>
            </div>

            <div class="mt-4 flex flex-col sm:flex-row gap-3">
              <NuxtLink
                v-if="uiState === 'paid'"
                to="/"
                class="inline-flex justify-center items-center border border-black bg-black text-white rounded px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
              >
                Continue browsing
              </NuxtLink>

              <NuxtLink
                v-if="uiState === 'paid'"
                to="/shop/products"
                class="inline-flex justify-center items-center border border-black bg-white text-black rounded px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
              >
                Shop more
              </NuxtLink>

              <NuxtLink
                v-if="uiState === 'failed' || uiState === 'expired'"
                to="/cart"
                class="inline-flex justify-center items-center border border-black bg-black text-white rounded px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
              >
                Return to cart
              </NuxtLink>

              <button
                v-if="uiState === 'verifying' || uiState === 'pending'"
                type="button"
                class="inline-flex justify-center items-center border border-black bg-black text-white rounded px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                @click="manualRefresh"
              >
                Refresh status
              </button>
            </div>

            <p class="mt-4 text-xs text-black/60">
              If you need help, contact <a class="underline" href="mailto:hello@merakiartstudio.ae">hello@merakiartstudio.ae</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cart = useCartStore()
const clearedCart = ref(false)
const copied = ref(false)

const order = ref<any>(null)

const orderLines = computed(() => {
  const lines = order.value?.lines
  return Array.isArray(lines) ? lines : []
})

const orderTotals = computed(() => {
  const t = order.value?.totals || {}
  return {
    subtotalExVat: Number(t.subtotalExVat || 0),
    discountExVat: Number(t.discountExVat || 0),
    vat: Number(t.vat || 0),
    total: Number(t.total || 0),
  }
})

const orderCurrency = computed(() => String(order.value?.currency || meta.value?.currency || 'AED').toUpperCase())

function moneyMajor(n: unknown) {
  const v = Number((n as any)?.value !== undefined ? (n as any).value : n)
  if (!Number.isFinite(v)) return `${orderCurrency.value} 0.00`
  return `${orderCurrency.value} ${v.toFixed(2)}`
}

function formatOrderDate(input: any) {
  try {
    const d = new Date(input)
    return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return ''
  }
}

function formatDubaiSlot(meta: any) {
  const startISO = meta?.slotStartISO || meta?.selectedSlotISO
  const endISO = meta?.slotEndISO || meta?.selectedSlotEndISO
  if (!startISO) return ''

  const s = new Date(startISO)
  const e = endISO ? new Date(endISO) : null

  const dateFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dubai',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
  const timeFmt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Dubai',
    hour: 'numeric',
    minute: '2-digit',
  })

  const dateLabel = dateFmt.format(s)
  const startLabel = timeFmt.format(s)
  const endLabel = e ? timeFmt.format(e) : ''

  return endLabel
    ? `${dateLabel} • ${startLabel} – ${endLabel} (Dubai)`
    : `${dateLabel} • ${startLabel} (Dubai)`
}

async function copyOrderId() {
  try {
    if (!orderRef.value) return
    await navigator.clipboard.writeText(orderRef.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {
    // ignore
  }
}

const sessionId = computed(() => String(route.query.session_id || '').trim())
const orderRef = ref('')

useHead({
  bodyAttrs: {
    class: 'page-success',
  },
})

// UI state comes from webhook-confirmed storage via /api/stripe/session-status
const uiState = ref<'missing' | 'verifying' | 'paid' | 'failed' | 'expired' | 'pending'>('verifying')
const meta = ref<{ amount_total?: number | null; currency?: string | null; payment_status?: string | null } | null>(null)

watch(uiState, (v) => {
  if (v === 'paid' && !clearedCart.value) {
    cart.clear()
    cart.clearPromo()
    cart.setNote('')
    clearedCart.value = true
  }
})

const titleText = computed(() => {
  if (uiState.value === 'paid') return 'Payment confirmed'
  if (uiState.value === 'failed') return 'Payment not completed'
  if (uiState.value === 'expired') return 'Checkout expired'
  if (uiState.value === 'missing') return 'Missing payment reference'
  if (uiState.value === 'pending') return 'Verifying your payment'
  return 'Verifying your payment'
})

const subtitleText = computed(() => {
  if (uiState.value === 'paid') return 'Thank you — your payment is confirmed.'
  if (uiState.value === 'failed') return 'Your payment did not go through. You can try again from your cart.'
  if (uiState.value === 'expired') return 'This checkout session expired. You can try again from your cart.'
  if (uiState.value === 'missing') return 'We could not find a Stripe session reference in the URL.'
  // pending/verifying
  return 'Please wait a moment while we confirm your payment. This can take up to a minute — you can also tap “Refresh status”.'
})

const amountText = computed(() => {
  const a = meta.value?.amount_total
  const c = meta.value?.currency
  if (a == null || !c) return ''
  return `${String(c).toUpperCase()} ${(Number(a) / 100).toFixed(2)}`
})

async function copyRef() {
  try {
    if (!sessionId.value) return
    await navigator.clipboard.writeText(sessionId.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  } catch {
    // ignore
  }
}

async function fetchStatusOnce() {
  if (!sessionId.value) {
    uiState.value = 'missing'
    return
  }

  try {
    const res: any = await $fetch('/api/stripe/session-status', {
      query: { session_id: sessionId.value },
    })

    const status = String(res?.status || 'pending')
    meta.value = res?.meta || null
    orderRef.value = String(res?.orderRef || res?.meta?.orderRef || '')

    // Prefer order payload if backend provides it (same shape as checkout payload)
    order.value = res?.order || res?.payload || res?.orderPayload || null

    if (status === 'paid') uiState.value = 'paid'
    else if (status === 'failed') uiState.value = 'failed'
    else if (status === 'expired') uiState.value = 'expired'
    else uiState.value = 'pending'
  } catch {
    // If endpoint not reachable, keep it pending
    uiState.value = 'pending'
  }
}

let pollTimer: ReturnType<typeof setInterval> | null = null
let pollStopTimer: ReturnType<typeof setTimeout> | null = null

function stopPolling() {
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
  if (pollStopTimer) {
    clearTimeout(pollStopTimer)
    pollStopTimer = null
  }
}

async function verifyWithPolling() {
  stopPolling()

  uiState.value = sessionId.value ? 'verifying' : 'missing'
  if (!sessionId.value) return

  // Kick off immediately
  await fetchStatusOnce()
  if (uiState.value === 'paid' || uiState.value === 'failed' || uiState.value === 'expired') return

  // Poll every 2s for up to 2 minutes
  pollTimer = setInterval(async () => {
    await fetchStatusOnce()
    if (uiState.value === 'paid' || uiState.value === 'failed' || uiState.value === 'expired') {
      stopPolling()
    } else {
      // Still not confirmed via webhook storage
      uiState.value = 'pending'
    }
  }, 2000)

  pollStopTimer = setTimeout(() => {
    // Give up auto polling after 2 minutes, keep it in pending with manual refresh
    stopPolling()
    if (uiState.value !== 'paid' && uiState.value !== 'failed' && uiState.value !== 'expired') {
      uiState.value = 'pending'
    }
  }, 2 * 60 * 1000)
}

function manualRefresh() {
  verifyWithPolling()
}

onMounted(() => {
  verifyWithPolling()
})

onUnmounted(() => {
  stopPolling()
})
</script>

<style>
/* Page-specific header theme overrides (force black logo + hamburger) */
body.page-success header,
body.page-success header * {
  color: #000 !important;
}

/* SVG icons (hamburger as svg) */
body.page-success header svg,
body.page-success header svg * {
  fill: #000 !important;
  stroke: #000 !important;
}

/* Logo as an <img> (common for white PNG/SVG-in-img). Make it black */
body.page-success header a[href="/"] img,
body.page-success header a[href="/"] picture img,
body.page-success header [class*="logo"] img,
body.page-success header [id*="logo"] img {
  filter: brightness(0) !important;
}

/* Hamburger built from spans/divs */
body.page-success header button span,
body.page-success header button i,
body.page-success header [class*="hamburger"] span,
body.page-success header [class*="burger"] span,
body.page-success header [class*="menu"] span {
  background-color: #000 !important;
  border-color: #000 !important;
}

/* Some hamburger implementations use pseudo elements */
body.page-success header [class*="hamburger"]::before,
body.page-success header [class*="hamburger"]::after,
body.page-success header [class*="burger"]::before,
body.page-success header [class*="burger"]::after {
  background-color: #000 !important;
  border-color: #000 !important;
}

/* If your header uses a transparent background, keep it readable on this page */
body.page-success header {
  background: transparent !important;
}
</style>