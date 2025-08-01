<!-- File: pages/experiences/activities/availability.vue -->
<template>
    <section class="min-h-screen bg-[#F9F3EB] py-12 px-6">
        <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h1 class="text-3xl font-extrabold text-[#447C9D] mb-4">Check Slot Availability</h1>

            <!-- Selected Activity Info -->
            <div class="border border-gray-200 rounded p-4 mb-6">
                <h2 class="text-xl font-bold text-black">{{ selectedSubtype.title }}</h2>
                <p class="text-gray-700 text-sm mb-1">{{ selectedSubtype.description }}</p>
                <p class="text-sm">
                    <strong>Price:</strong> {{ selectedSubtype.price }}
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

// Map route.query directly to a reactive computed object
const selectedSubtype = computed(() => ({
    title: route.query.title || '',
    description: route.query.description || '',
    price: route.query.price || '',
    duration: route.query.duration || '',
    minTickets: route.query.minTickets || '',
    image: route.query.image || '',
    variant: route.query.variant || '',
    vatIncluded: route.query.vatIncluded === 'true'
}))

// Calendar logic
const currentWeekOffset = ref(0)
const slots = ref({})
const days = ref([])

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

const fetchSlots = () => {
    days.value = getWeekDays(currentWeekOffset.value)
    // Dummy data — integrate with Google Calendar API here
    slots.value = {
        [days.value[3].date]: ['19:00', '19:30', '20:00'],
        [days.value[5].date]: ['19:00', '19:30', '20:00']
    }
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
