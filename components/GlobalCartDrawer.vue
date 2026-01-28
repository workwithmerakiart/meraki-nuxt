<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
const router = useRouter()

const isOpen = ref(false)
const lines = computed(() => cart.linesDetailed)
const currency = computed(() => cart.currency)
const subtotalExVat = computed(() => cart.subtotalExVat)
const vatTotal = computed(() => cart.vatTotal)
const total = computed(() => cart.total)

function money(n: unknown) {
  const val = (n as any)?.value !== undefined ? (n as any).value : n
  const v = Number(val)
  if (!Number.isFinite(v)) return `${currency.value} 0.00`
  return `${currency.value} ${v.toFixed(2)}`
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

function buildCheckoutPayload() {
  const anyCart = cart as any

  const linePayload = (anyCart.linesDetailed || []).map((l: any) => ({
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
    // ✅ preserve meta (activity slotStartISO/slotEndISO live here)
    meta: l.meta || {},
  }))

  const subtotalExVatVal = Number(anyCart.subtotalExVat || 0)
  const discountExVatVal = Number(anyCart.discountExVat || 0)
  const vatVal = Number(anyCart.vatTotalAfterDiscount ?? anyCart.vatTotal ?? 0)
  const totalVal = Number(anyCart.totalAfterDiscount ?? anyCart.total ?? 0)

  return {
    currency: anyCart.currency || 'AED',
    lines: linePayload,
    promoCode: String(anyCart.promoCode || '').trim().toUpperCase() || null,
    note: anyCart.note ?? '',
    totals: {
      subtotalExVat: subtotalExVatVal,
      discountExVat: discountExVatVal,
      vat: vatVal,
      total: totalVal,
    },
    ts: Date.now(),
  }
}

const checkoutTo = computed(() => {
  const payload = buildCheckoutPayload()
  const q = encodeURIComponent(JSON.stringify(payload))
  return { path: '/checkout', query: { payload: q } }
})

function open() { isOpen.value = true }
function close() { isOpen.value = false }
function inc(key: string) { cart.increment(key) }
function dec(key: string) { cart.decrement(key) }
function removeItem(key: string) { cart.remove(key) }

onMounted(() => {
  if (process.client) {
    // Any part of the app can open the drawer via:
    // window.dispatchEvent(new CustomEvent('open-cart'))
    window.addEventListener('open-cart', open)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('open-cart', open)
  }
})
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[10000]">
      <div class="absolute inset-0 bg-black/50" @click="close" aria-hidden="true"></div>
      <aside class="absolute right-0 top-0 h-full w-[92vw] max-w-md bg-white border-l border-black shadow-xl flex flex-col">
        <header class="p-4 border-b border-black flex items-center justify-between">
          <h3 class="text-lg font-semibold text-black">Your Cart</h3>
          <button @click="close" aria-label="Close" class="hover:opacity-70">✕</button>
        </header>

        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-if="lines.length === 0" class="text-sm text-black/70">Your cart is empty.</div>

          <div v-for="line in lines" :key="line.key" class="flex gap-3 border border-black rounded p-3">
            <div class="w-20 h-20 flex-shrink-0 bg-gray-100 overflow-hidden">
              <img v-if="line.image" :src="line.image" :alt="line.title" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-black truncate">{{ line.title }}</h4>
              <p class="text-xs text-black/70 mt-0.5">{{ money(line.priceMajor) }}</p>
              <p
                v-if="line.type === 'activity' && line.meta && (line.meta.slotStartISO || line.meta.selectedSlotISO)"
                class="text-xs text-black/70 mt-1"
              >
                {{ formatDubaiSlot(line.meta) }}
              </p>
              <div class="mt-2 flex items-center gap-2">
                <button class="px-2 border border-black" @click="dec(line.key)" aria-label="Decrease">–</button>
                <span class="text-sm w-6 text-center" aria-live="polite">{{ line.qty }}</span>
                <button class="px-2 border border-black" @click="inc(line.key)" aria-label="Increase">+</button>
                <button class="ml-auto text-xs underline" @click="removeItem(line.key)">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <footer class="p-4 border-t border-black space-y-2">
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="text-black">Subtotal</span>
              <span class="text-black">{{ money(subtotalExVat) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-black">VAT</span>
              <span class="text-black">{{ money(vatTotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm font-medium border-t border-black pt-2">
              <span class="text-black">Total</span>
              <span class="text-black">{{ money(total) }}</span>
            </div>
          </div>

          <p class="text-[11px] text-black/60">Taxes shown above. Shipping (if any) is calculated at checkout.</p>

          <div class="flex gap-2 pt-2">
            <NuxtLink
              to="/cart"
              @click="close"
              class="flex-1 text-center border border-black text-black rounded py-2 text-sm hover:bg-black hover:text-white"
            >
              View Cart
            </NuxtLink>
            <NuxtLink
              :to="checkoutTo"
              @click="close"
              class="flex-1 text-center border border-black bg-black text-white rounded py-2 text-sm"
            >
              Checkout
            </NuxtLink>
          </div>
        </footer>
      </aside>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>