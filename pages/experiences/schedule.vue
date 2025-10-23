<template>
    <div class="min-h-screen bg-white">
        <div class="max-w-6xl mx-auto px-4 py-6">
            <div class="mb-4">
                <button @click="goBack" class="text-sm text-gray-600 hover:underline flex items-center gap-2">←
                    Back</button>
            </div>

            <h1 class="text-3xl font-semibold mb-2">Schedule your service</h1>
            <p class="text-sm text-gray-600 mb-8">Check out our availability and book the date and time that works for
                you</p>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div class="lg:col-span-2">
                    <div class="border rounded p-5">
                        <h2 class="text-lg font-medium mb-4">Select a Date and Time</h2>
                        <AvailabilityPicker :durationMin="Number(durationMin) || 30" @selected="onSelected" />
                    </div>
                </div>

                <aside class="lg:col-span-1">
                    <div class="border rounded p-5 space-y-6">
                        <div>
                            <h3 class="text-lg font-semibold">Service Details</h3>
                            <p class="mt-2 text-sm text-gray-700">
                                <span class="block font-medium">{{ productTitle }}</span>
                                <span v-if="variantLabel" class="block text-gray-600">{{ variantLabel }}</span>
                                <span v-if="displayPrice" class="block text-gray-700 mt-1">
                                    {{ displayPrice }}<span v-if="!payload.vatIncluded && payload.vatRate"> + VAT</span>
                                </span>
                            </p>
                            <div v-if="imageSrc" class="mt-3">
                                <img :src="imageSrc" alt="Selected course" class="w-full rounded" />
                            </div>
                        </div>
                        <div>
                            <button :disabled="!slot" @click="goCheckout"
                                class="w-full bg-blue-700 text-white py-3 rounded disabled:opacity-50">
                                Next
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AvailabilityPicker from '~/components/AvailabilityPicker.vue'

const route = useRoute()
const router = useRouter()

const raw = route.query.payload ? decodeURIComponent(String(route.query.payload)) : '{}'
let parsed; try { parsed = JSON.parse(raw) } catch { parsed = {} }

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
    durationMin: Number(parsed.durationMin || parsed.sessionDurationsMin?.[0] || 30),
}

const productTitle = computed(() => payload.title)
const variantLabel = computed(() => {
    const v = (payload.variants || []).find(x => x.key === payload.variantKey)
    return v ? v.label : ''
})

const durationMin = computed(() => payload.durationMin)
const slot = ref(null)

const imageSrc = computed(() => parsed.imageSrc || '')
const displayPrice = computed(() =>
    parsed.displayPrice || (typeof payload.unitAmount === 'number' ? `${payload.currency} ${payload.unitAmount}` : '')
)

const onSelected = (s) => { slot.value = s }
const goBack = () => {
  try {
    if (typeof window !== 'undefined' && window.history && window.history.length > 1) {
      router.back()
    } else {
      const fallback = (route.query && route.query.from) ? String(route.query.from) : '/experiences/courses'
      router.push(fallback)
    }
  } catch (e) {
    router.push('/experiences/courses')
  }
}

const goCheckout = () => {
    const q = {
        payload: encodeURIComponent(JSON.stringify({
            ...payload,
            slotStart: slot.value.startISO,
            slotEnd: slot.value.endISO,
            slotDateLabel: slot.value.labelDate,
            slotTimeLabel: slot.value.labelTime,
        }))
    }
    router.push({ path: '/checkout', query: q })
}
</script>