<template>
    <div class="min-h-screen bg-white">
        <div class="max-w-6xl mx-auto px-4 py-6">
            <div class="mb-4">
                <button @click="goBack" class="text-sm text-gray-600 hover:underline flex items-center gap-2">
                    <span>←</span> Back
                </button>
            </div>

            <h1 class="text-3xl font-semibold mb-8">Booking Form</h1>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left: form -->
                <div class="lg:col-span-2">
                    <section class="space-y-6">
                        <div>
                            <h2 class="text-xl font-medium mb-2">Client Details</h2>
                            <p class="text-sm text-gray-600">Fill in your details below to complete your booking.</p>
                        </div>

                        <div v-if="notice" class="text-sm text-gray-700 bg-gray-50 border rounded p-4">
                            {{ notice }}
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm mb-1">Name *</label>
                                <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" />
                            </div>
                            <div>
                                <label class="block text-sm mb-1">Email *</label>
                                <input v-model="form.email" type="email" class="w-full border rounded px-3 py-2" />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm mb-1">Phone Number *</label>
                            <input v-model="form.phone" type="tel" class="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <label class="block text-sm mb-1">Number of Participants *</label>
                            <input v-model.number="form.participants" type="number" min="1"
                                class="w-full border rounded px-3 py-2" />
                        </div>

                        <div>
                            <button @click="bookNow"
                                class="mt-4 bg-[#1E40AF] text-white px-6 py-3 rounded font-medium hover:opacity-90">
                                Book Now
                            </button>
                        </div>
                    </section>
                </div>

                <!-- Right: summary -->
                <aside class="lg:col-span-1">
                    <div class="border rounded p-5 space-y-6">
                        <div>
                            <h3 class="text-lg font-semibold">Booking Details</h3>
                            <p class="mt-2 text-sm text-gray-700">
                                <span class="block font-medium">{{ productTitle }}</span>
                                <span v-if="variantLabel" class="block text-gray-600">{{ variantLabel }}</span>
                                <span v-if="slotDate && slotTime" class="block text-gray-700 mt-1">{{ slotDate }} at {{
                                    slotTime }}</span>
                            </p>
                        </div>

                        <div class="pt-1 border-t"></div>

                        <div>
                            <h4 class="text-sm font-semibold mb-2">Payment Details</h4>
                            <div class="flex justify-between text-sm py-1">
                                <span>Subtotal</span>
                                <span>{{ currency(subtotal) }}</span>
                            </div>
                            <div class="flex justify-between text-sm py-1" v-if="tax > 0">
                                <span>Tax</span>
                                <span>{{ currency(tax) }}</span>
                            </div>
                            <div class="flex justify-between text-base font-semibold py-2 border-t mt-2">
                                <span>Total</span>
                                <span>{{ currency(total) }}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const raw = route.query.payload ? decodeURIComponent(String(route.query.payload)) : '{}'
let parsed; try { parsed = JSON.parse(raw) } catch { parsed = {} }

// Normalized payload (works for courses & workshops)
const payload = {
    sku: parsed.sku || '',
    title: parsed.title || 'Selected Experience',
    currency: parsed.currency || 'AED',
    unitAmount: Number(parsed.unitAmount || 0),
    vatRate: Number(parsed.vatRate ?? 5),
    vatIncluded: Boolean(parsed.vatIncluded),
    quantity: Number(parsed.quantity || 1),
    variantKey: parsed.variantKey || '',
    variants: parsed.variants || [],
}

const productTitle = computed(() => payload.title)
const variantLabel = computed(() => {
    const v = (payload.variants || []).find(x => x.key === payload.variantKey)
    return v ? v.label : ''
})
const slotDate = computed(() => parsed.slotDateLabel || '')
const slotTime = computed(() => parsed.slotTimeLabel || '')

const subtotal = computed(() => payload.unitAmount * payload.quantity)
const tax = computed(() => payload.vatIncluded ? 0 : (subtotal.value * (payload.vatRate / 100)))
const total = computed(() => subtotal.value + tax.value)
const currency = (n) => `${payload.currency} ${Number(n || 0).toFixed(2).replace(/\.00$/, '')}`

const form = reactive({ name: '', email: '', phone: '', participants: 1 })
const notice = '' // e.g., deposit notice if needed

const goBack = () => router.back()
const bookNow = () => {
    // Placeholder: integrate Stripe Checkout or your booking backend here
    console.log('Booking payload', { payload, form, amounts: { subtotal: subtotal.value, tax: tax.value, total: total.value } })
    alert('Booking submitted! (Hook up Stripe here)')
}
</script>