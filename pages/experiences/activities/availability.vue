<!-- File: pages/experiences/activities/availability.vue -->
<template>
    <ExperiencesBlockHalf v-bind="blockOneData">
        <template #content>
            <NuxtLink
                href="https://www.google.com/maps/search/?api=1&query=Meraki+Art+%26+Design+Studio,+Al+Quoz+-+Al+Quoz+Industrial+Area+3+-+Dubai"
                target="_blank"
                class="inline-block bg-transparent border border-white border-opacity-70 text-white text-opacity-70 px-10 py-2 rounded-full text-md uppercase tracking-wide font-bold shadow-xl transition-all duration-300 hover:bg-[#DD4912] hover:text-white hover:text-opacity-100 hover:scale-105 hero-slider-subheadings animate-slideup animation-delay-1000 animation-backwards">
                Show on map
            </NuxtLink>
        </template>
    </ExperiencesBlockHalf>
    <section class="min-h-screen bg-[#F9F3EB] py-12 px-6">
        <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-3xl font-extrabold text-[#447C9D] mb-4">Check Slot Availability</h1>

            <!-- Selected Activity Info -->
            <div class="border border-gray-200 rounded p-4 mb-6">
                <div class="flex flex-col md:flex-row gap-4 items-start">
                    <div class="flex-1">
                        <h2 class="text-xl font-bold text-black">{{ selectedSubtype.title }}</h2>
                        <p class="text-gray-700 text-sm mb-1">{{ selectedSubtype.description }}</p>

                        <p class="text-sm">
                            <strong>Unit Price:</strong> {{ selectedSubtype.price }}
                            <span v-if="!selectedSubtype.vatIncluded">+ VAT</span>
                        </p>

                        <p v-if="selectedSubtype.duration" class="text-sm">
                            <strong>Duration:</strong> {{ selectedSubtype.duration }}
                        </p>
                        <p v-if="selectedSubtype.minTickets" class="text-sm">
                            <strong>Min Tickets:</strong> {{ selectedSubtype.minTickets }}
                        </p>
                        <p v-if="selectedSubtype.variant" class="text-sm italic text-gray-500">
                            Selected Variant: {{ selectedSubtype.variant }}
                        </p>

                        <!-- NEW: qty + total -->
                        <div class="mt-2 text-sm">
                            <strong>Quantity:</strong> {{ selectedSubtype.quantity }}
                            <span v-if="selectedSubtype.totalPrice" class="ml-3">
                                <strong>Total:</strong> {{ selectedSubtype.totalPrice }}
                                <span v-if="!selectedSubtype.vatIncluded"> + VAT</span>
                            </span>
                        </div>

                    </div>

                    <!-- NEW: image preview -->
                    <div v-if="selectedSubtype.image" class="w-full md:w-56">
                        <img :src="selectedSubtype.image" :alt="selectedSubtype.title"
                            class="w-full h-40 object-cover rounded-md" />
                    </div>
                </div>
            </div>

            <!-- Calendar Navigation -->
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
                <div class="flex items-center justify-between mb-4">
                    <button @click="prevWeek" class="text-[#447C9D] font-medium hover:underline">&larr; Prev
                        Week</button>
                    <div class="font-semibold text-gray-700">{{ currentWeekRange }}</div>
                    <button @click="nextWeek" class="text-[#447C9D] font-medium hover:underline">Next Week
                        &rarr;</button>
                </div>

                <!-- NEW: small status row -->
                <div class="mb-2 flex items-center gap-3 text-xs">
                    <span v-if="isLoading" class="text-gray-500">Loading availability…</span> <!-- NEW -->
                    <span v-if="error" class="text-red-600">{{ error }}</span> <!-- NEW -->
                </div>

                <!-- Week View -->
                <div class="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 font-semibold mb-2">
                    <div v-for="day in days" :key="day.date" class="py-2">
                        {{ day.label }}<br />{{ day.date }}
                    </div>
                </div>
                <div class="grid grid-cols-7 gap-2">
                    <div v-for="day in days" :key="day.date" class="text-center space-y-2">
                        <div v-if="slots[day.date]?.length">
                            <button v-for="time in slots[day.date]" :key="time"
                                class="bg-purple-100 text-[#447C9D] font-medium px-2 py-1 rounded hover:bg-purple-200 text-xs w-full">
                                {{ time }}
                            </button>
                        </div>
                        <p v-else class="text-xs text-gray-400 italic">–</p>
                    </div>
                </div>
            </div>

            <!-- Back CTA -->
            <div class="text-right mt-6">
                <NuxtLink to="/experiences/activities" class="text-sm text-[#447C9D] hover:underline font-medium">&larr;
                    Back to Activities</NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup>
console.log('✅ availability.vue loaded', useRoute().query)
import { useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'

const route = useRoute()

const blockOneData = {
    image:
        "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Meraki Art Studio",
    tagline: "",
    description: "",
    contentPlacement: "center",
    height: "h-[200px] md:h-[400px]",
};

// Map route.query directly to a reactive computed object
const selectedSubtype = computed(() => ({
    title: route.query.title || '',
    description: route.query.description || '',
    price: route.query.price || '',
    duration: route.query.duration || '',
    minTickets: route.query.minTickets || '',
    image: route.query.image || '',               // already there
    variant: route.query.variant || '',
    vatIncluded: route.query.vatIncluded === 'true',
    // NEW
    quantity: Number(route.query.quantity || 1),
    totalPrice: route.query.totalPrice || ''
}))

// Calendar logic
const currentWeekOffset = ref(0)
const slots = ref({})
const days = ref([])

// NEW: loading + error state
const isLoading = ref(false)   // NEW
const error = ref('')          // NEW

const getWeekDays = (offset = 0) => {
    const today = new Date()
    today.setDate(today.getDate() + offset * 7)
    const monday = new Date(today.setDate(today.getDate() - today.getDay() + 1))
    const week = []

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        week.push({
            label: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.toISOString().split('T')[0]
        })
    }
    return week
}

const currentWeekRange = computed(() => {
    if (days.value.length === 0) return ''
    return `${days.value[0].date} — ${days.value[6].date}`
})

// NEW: replace dummy data with real FreeBusy fetch
const fetchSlots = async () => {                // NEW (made async)
    days.value = getWeekDays(currentWeekOffset.value)
    isLoading.value = true                      // NEW
    error.value = ''                            // NEW
    try {
        // NEW: compute ISO range for the visible week
        const startISO = new Date(`${days.value[0].date}T00:00:00.000Z`).toISOString()  // NEW
        const endISO = new Date(`${days.value[6].date}T23:59:59.999Z`).toISOString()  // NEW

        // NEW: call Nuxt server route that wraps Google FreeBusy and returns open 30-min slots
        const { data } = await $fetch(`/api/calendar`, { params: { start: startISO, end: endISO } }) // NEW
        slots.value = (data && data.slots) ? data.slots : {}   // NEW
    } catch (e) {
        console.error(e)
        error.value = 'Could not load availability. Please try again.'  // NEW
        slots.value = {}                                                // NEW
    } finally {
        isLoading.value = false                                         // NEW
    }

    // (Old dummy data removed; now using live data)                // NEW
}

const nextWeek = () => {
    currentWeekOffset.value++
    fetchSlots()
}
const prevWeek = () => {
    currentWeekOffset.value--
    fetchSlots()
}

// On mount
onMounted(() => {
    fetchSlots()
})
</script>

<style scoped>
* {
    font-family: 'Inter', sans-serif;
}
</style>
