<template>
    <section class="bg-white min-h-screen">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="text-2xl md:text-3xl font-bold text-black mb-6">My Cart</h1>

            <div v-if="!items.length" class="border border-black rounded p-8 text-center">
                <p class="text-black mb-4">Your cart is empty.</p>
                <NuxtLink to="/shop/products"
                    class="inline-block border border-black px-4 py-2 rounded hover:bg-black hover:text-white">
                    Browse Products
                </NuxtLink>
            </div>

            <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Items -->
                <div class="lg:col-span-2 space-y-4">
                    <div v-for="it in lines" :key="it.key" class="flex gap-4 border border-black rounded p-3">
                        <div class="w-24 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                            <img v-if="it.image" :src="it.image" :alt="it.title" class="w-full h-full object-cover" />
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
                        <button type="button" class="text-sm underline" @click="showPromo = !showPromo">Enter a promo code</button>
                        <div v-if="showPromo" class="mt-2 flex gap-2">
                          <input v-model="promoInput" type="text" inputmode="text" placeholder="e.g., SAVE10" class="flex-1 border border-black rounded px-3 py-2 text-sm" />
                          <button @click="onApplyPromo" class="px-4 py-2 text-sm border border-black bg-black text-white rounded">Apply</button>
                          <button v-if="cart.promoCode" @click="onClearPromo" class="px-3 py-2 text-sm border border-black rounded">Clear</button>
                        </div>
                        <p v-if="promoMessage" class="text-xs text-black/70 mt-1">{{ promoMessage }}</p>
                      </div>

                      <div>
                        <button type="button" class="text-sm underline" @click="showNote = !showNote">Add a note</button>
                        <div v-if="showNote" class="mt-2">
                          <textarea v-model="noteInput" rows="2" class="w-full border border-black rounded px-3 py-2 text-sm" placeholder="Any special instructions..."></textarea>
                          <div class="mt-2">
                            <button @click="onSaveNote" class="px-4 py-2 text-sm border border-black rounded hover:bg-black hover:text-white">Save note</button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                <!-- Summary -->
                <aside class="border border-black rounded p-4 space-y-2 h-fit">
                    <h2 class="text-lg font-semibold text-black mb-2">Order summary</h2>

                    <div class="flex justify-between text-sm">
                      <span>Subtotal</span><span>{{ money(subtotalExVat) }}</span>
                    </div>
                    <div v-if="discountExVat > 0" class="flex justify-between text-sm">
                      <span>Discount ({{ cart.promoCode }})</span><span>-{{ money(discountExVat) }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span>VAT</span><span>{{ money(vatAfter) }}</span>
                    </div>
                    <div class="flex justify-between text-sm font-medium border-t border-black pt-2">
                      <span>Total</span><span>{{ money(totalAfter) }}</span>
                    </div>

                    <NuxtLink to="/checkout"
                        class="block text-center mt-3 border border-black bg-black text-white rounded py-2 text-sm">
                        Checkout
                    </NuxtLink>
                </aside>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const cart = useCartStore()
const items = computed(() => cart.items)
const lines = computed(() => cart.linesDetailed)     // provides lineNet, lineVat, lineGross
const currency = computed(() => cart.currency)
const subtotalExVat = computed(() => cart.subtotalExVat)
const vatTotal = computed(() => cart.vatTotal)
const total = computed(() => cart.total)

const discountExVat = computed(() => cart.discountExVat)
const vatAfter = computed(() => cart.vatTotalAfterDiscount)
const totalAfter = computed(() => cart.totalAfterDiscount)

// Promo + Note UI state
const showPromo = ref(false)
const promoInput = ref('')
const promoMessage = ref('')
const showNote = ref(false)
const noteInput = ref(cart.note || '')

function onApplyPromo() {
  const res = cart.applyPromo(promoInput.value)
  promoMessage.value = res.ok ? 'Promo applied' : (res.message || 'Invalid promo code')
}
function onClearPromo() {
  cart.clearPromo()
  promoMessage.value = ''
  promoInput.value = ''
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
</script>