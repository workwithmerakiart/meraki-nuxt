<template>
    <section class="failed-page relative min-h-[100svh] bg-white">
        <!-- Background image + overlay -->
        <div class="absolute inset-0">
            <img src="/images/shop/shopnew.webp" alt="Meraki Art Studio" class="h-full w-full object-cover" />
            <div class="absolute inset-0 bg-white/75"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
            <div class="pt-24 sm:pt-28 pb-16 sm:pb-20">
                <div class="mx-auto max-w-xl text-center">
                    <div
                        class="inline-flex items-center justify-center w-14 h-14 rounded-full border border-black bg-white">
                        <span v-if="uiState === 'paid'" class="text-2xl" aria-hidden="true">✓</span>
                        <span v-else-if="uiState === 'expired' || uiState === 'failed'" class="text-2xl"
                            aria-hidden="true">!</span>
                        <span v-else class="text-2xl" aria-hidden="true">…</span>
                    </div>

                    <h1 class="mt-5 text-2xl sm:text-3xl font-semibold text-black">
                        {{ titleText }}
                    </h1>
                    <p class="mt-2 text-sm sm:text-base text-black/70">
                        {{ subtitleText }}
                    </p>

                    <div class="mt-8 rounded-xl border border-black bg-white/90 backdrop-blur p-5 sm:p-6 text-left">
                        <div class="flex items-start justify-between gap-4">
                            <div class="min-w-0">
                                <p class="text-xs uppercase tracking-wider text-black/60">Reference</p>
                                <p class="mt-1 font-mono text-xs sm:text-sm text-black break-all">
                                    {{ sessionId || '—' }}
                                </p>
                                <p v-if="amountText" class="mt-2 text-xs text-black/70">
                                    Total (from session): <span class="font-medium text-black">{{ amountText }}</span>
                                </p>
                            </div>

                            <button v-if="sessionId" type="button" class="text-xs underline text-black hover:opacity-70"
                                @click="copyRef">
                                {{ copied ? 'Copied' : 'Copy' }}
                            </button>
                        </div>

                        <div class="mt-5 flex flex-col sm:flex-row gap-3">
                            <!-- Primary CTA -->
                            <NuxtLink
                              :to="sessionId ? `/checkout?session_id=${encodeURIComponent(sessionId)}` : '/cart'"
                              class="inline-flex justify-center items-center border border-black bg-black text-white rounded px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors"
                            >
                              Continue payment
                            </NuxtLink>

                            <!-- Secondary CTA -->
                            <NuxtLink
                              to="/cart"
                              class="inline-flex justify-center items-center border border-black bg-white text-black rounded px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
                            >
                              Back to cart
                            </NuxtLink>

                            <!-- If we’re still waiting for webhook storage -->
                            <button v-if="uiState === 'pending' || uiState === 'verifying'" type="button"
                                class="inline-flex justify-center items-center border border-black bg-white text-black rounded px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors"
                                @click="manualRefresh">
                                Refresh status
                            </button>

                            <!-- If payment actually succeeded -->
                            <NuxtLink v-if="uiState === 'paid' && sessionId"
                                :to="`/order/success?session_id=${encodeURIComponent(sessionId)}`"
                                class="inline-flex justify-center items-center border border-black bg-white text-black rounded px-4 py-2 text-sm hover:bg-black hover:text-white transition-colors">
                                View confirmation
                            </NuxtLink>
                        </div>

                        <p class="mt-4 text-xs text-black/60">
                            Need help? Email
                            <a class="underline" href="mailto:hello@merakiartstudio.ae">hello@merakiartstudio.ae</a>
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

useHead({
    bodyAttrs: {
        class: 'page-failed',
    },
})

type UiState = 'missing' | 'verifying' | 'paid' | 'failed' | 'expired' | 'pending' | 'cancelled'
const uiState = ref<UiState>('verifying')
const meta = ref<{ amount_total?: number | null; currency?: string | null; payment_status?: string | null } | null>(null)

const titleText = computed(() => {
    if (uiState.value === 'failed') return "Your card said “not today”"
    if (uiState.value === 'expired') return "Time’s up — checkout expired"
    if (uiState.value === 'paid') return "Plot twist: it actually went through ✅"
    if (uiState.value === 'missing') return "We lost the checkout link"
    if (uiState.value === 'cancelled') return "Still deciding?"
    if (uiState.value === 'pending') return "Hold on — checking what happened"
    return "Hold on — checking what happened"
})

const subtitleText = computed(() => {
    if (uiState.value === 'failed')
        return "Your payment didn’t go through. Your cart is saved — you can try again in a moment from the cart."
    if (uiState.value === 'expired')
        return "This checkout session expired before payment completed. Head back to your cart and we’ll get you sorted in seconds."
    if (uiState.value === 'paid')
        return "Looks like the payment is confirmed. Head to the confirmation page so you don’t miss the details."
    if (uiState.value === 'missing')
        return "We couldn’t find a Stripe session reference in the URL. Go back to your cart to restart checkout."
    if (uiState.value === 'cancelled')
        return "Still deciding? You don’t need to overthink it — these are favourites of many for a reason. Your selections are safely held in your cart, and you’re exactly where you should be. Whenever you’re ready, continue right where you left off."
    return "Please wait a moment while we confirm your payment. This can take up to a minute — you can also tap “Refresh status”."
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

        if (status === 'paid') uiState.value = 'paid'
        else if (status === 'failed') uiState.value = 'failed'
        else if (status === 'expired') uiState.value = 'expired'
        else {
            // Most common for cancel_url: webhook may never mark it as failed/expired, so treat as cancelled UI-wise.
            uiState.value = 'cancelled'
        }
    } catch {
        uiState.value = 'pending'
    }
}

let pollTimer: ReturnType<typeof setInterval> | null = null
let pollStopTimer: ReturnType<typeof setTimeout> | null = null

function stopPolling() {
    if (pollTimer) clearInterval(pollTimer)
    if (pollStopTimer) clearTimeout(pollStopTimer)
    pollTimer = null
    pollStopTimer = null
}

async function verifyWithPolling() {
    stopPolling()

    uiState.value = sessionId.value ? 'verifying' : 'missing'
    if (!sessionId.value) return

    await fetchStatusOnce()
    if (uiState.value === 'paid' || uiState.value === 'failed' || uiState.value === 'expired') return

    pollTimer = setInterval(async () => {
        await fetchStatusOnce()
        // If it turns into paid/failed/expired, stop
        if (uiState.value === 'paid' || uiState.value === 'failed' || uiState.value === 'expired') {
            stopPolling()
        }
    }, 2000)

    pollStopTimer = setTimeout(() => {
        stopPolling()
        if (uiState.value !== 'paid' && uiState.value !== 'failed' && uiState.value !== 'expired') {
            uiState.value = 'cancelled'
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
body.page-failed header,
body.page-failed header * {
    color: #000 !important;
}

body.page-failed header svg,
body.page-failed header svg * {
    fill: #000 !important;
    stroke: #000 !important;
}

body.page-failed header a[href="/"] img,
body.page-failed header a[href="/"] picture img,
body.page-failed header [class*="logo"] img,
body.page-failed header [id*="logo"] img {
    filter: brightness(0) !important;
}

body.page-failed header button span,
body.page-failed header button i,
body.page-failed header [class*="hamburger"] span,
body.page-failed header [class*="burger"] span,
body.page-failed header [class*="menu"] span {
    background-color: #000 !important;
    border-color: #000 !important;
}

body.page-failed header [class*="hamburger"]::before,
body.page-failed header [class*="hamburger"]::after,
body.page-failed header [class*="burger"]::before,
body.page-failed header [class*="burger"]::after {
    background-color: #000 !important;
    border-color: #000 !important;
}

body.page-failed header {
    background: transparent !important;
}
</style>