<template>
  <section class="success-page relative min-h-[100svh] bg-white">
    <!-- Background image + overlay -->
    <div class="absolute inset-0">
      <img
        src="/images/shop/shopnew.webp"
        alt="Meraki Art Studio"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-white/70"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
      <!-- Give space so it doesn't clash with header strap -->
      <div class="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div class="mx-auto max-w-xl text-center">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-full border border-black bg-white">
            <span v-if="uiState === 'paid'" class="text-2xl" aria-hidden="true">✓</span>
            <span v-else-if="uiState === 'failed' || uiState === 'expired'" class="text-2xl" aria-hidden="true">!</span>
            <span v-else class="text-2xl" aria-hidden="true">…</span>
          </div>

          <h1 class="mt-5 text-2xl sm:text-3xl font-semibold text-black">{{ titleText }}</h1>
          <p class="mt-2 text-sm sm:text-base text-black/70">{{ subtitleText }}</p>

          <div class="mt-8 rounded-xl border border-black bg-white/90 backdrop-blur p-5 sm:p-6 text-left">
            <div class="flex items-start justify-between gap-4">
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
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const copied = ref(false)

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