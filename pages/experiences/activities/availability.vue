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
            <div class="border border-gray-200 rounded p-4 mb-8">
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

                        <div class="mt-2 text-sm">
                            <strong>Quantity:</strong> {{ selectedSubtype.quantity }}
                            <span v-if="selectedSubtype.totalPrice" class="ml-3">
                                <strong>Total:</strong> {{ selectedSubtype.totalPrice }}
                                <span v-if="!selectedSubtype.vatIncluded"> + VAT</span>
                            </span>
                        </div>
                    </div>

                    <div v-if="selectedSubtype.image" class="w-full md:w-56">
                        <img :src="selectedSubtype.image" :alt="selectedSubtype.title"
                            class="w-full h-40 object-cover rounded-md" />
                    </div>
                </div>
            </div>

            <!-- Calendly-style month view + slots (like schedule.vue) -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Left: Month calendar -->
                <div class="lg:col-span-2">
                    <div class="border rounded p-5 bg-gray-50">
                        <h2 class="text-lg font-medium mb-4">Select a Date</h2>

                        <div class="flex items-center justify-between mb-4">
                            <div class="text-sm text-gray-600">Time zone: Gulf Standard Time (GMT+4)</div>
                            <div class="flex items-center gap-2">
                                <button type="button" @click="prevMonth"
                                    class="px-2 py-1 text-gray-700 hover:underline">‹</button>
                                <div class="font-medium">{{ monthLabel }}</div>
                                <button type="button" @click="nextMonth"
                                    class="px-2 py-1 text-gray-700 hover:underline">›</button>
                            </div>
                        </div>

                        <!-- Weekday labels -->
                        <div class="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
                            <div v-for="d in weekDays" :key="d">{{ d }}</div>
                        </div>

                        <!-- Calendar grid -->
                        <div class="grid grid-cols-7 gap-1">
                            <button v-for="(day, idx) in daysInGrid" :key="idx" type="button"
                                class="h-10 rounded border text-sm relative" :class="[
                                    day.inMonth ? 'bg-white' : 'bg-gray-50',
                                    isToday(day.date) ? 'border-[#447C9D]' : 'border-gray-200',
                                    isSelectedDay(day.date) ? 'ring-2 ring-[#447C9D]' : '',
                                    isDisabled(day.date) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
                                ]" :disabled="isDisabled(day.date)" @click="selectDate(day.date)">
                                <div class="leading-10">{{ day.date.getDate() }}</div>
                                <div v-if="hasSlots(day.date)"
                                    class="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#447C9D]">
                                </div>
                            </button>
                        </div>

                        <div class="mt-4 flex items-center gap-3 text-xs">
                            <span v-if="isLoading" class="text-gray-500">Loading availability…</span>
                            <span v-if="error" class="text-red-600">{{ error }}</span>
                        </div>
                    </div>
                </div>

                <!-- Right: Slots + CTA -->
                <aside class="lg:col-span-1">
                    <div class="border rounded p-5 bg-white space-y-5">
                        <div>
                            <h3 class="text-lg font-semibold">Available Slots</h3>
                            <p class="mt-1 text-sm text-gray-600">{{ longDate(selectedDate) }}</p>
                            <div class="mt-2 flex items-center gap-2 text-xs text-gray-600">
                                <input id="tzToggle" type="checkbox" v-model="showInLocalTz" class="accent-[#447C9D]" />
                                <label for="tzToggle" class="select-none">Show in my time zone</label>
                            </div>
                        </div>

                        <div v-if="isLoading" class="text-sm text-gray-500">Loading availability…</div>
                        <div v-else>
                          <!-- Always show the grid for open days; grey out unavailable slots -->
                          <div v-if="slotsForSelected.length" class="grid grid-cols-2 gap-3">
                            <button
                              v-for="t in slotsForSelected"
                              :key="t.value"
                              type="button"
                              :disabled="!t.available"
                              @click="chooseSlot(t)"
                              class="border rounded px-3 py-2 text-sm text-center transition"
                              :class="[
                                t.value === selectedTime && t.available
                                  ? 'bg-[#447C9D] text-white border-[#447C9D]'
                                  : t.available
                                    ? 'bg-white border-gray-200 hover:border-gray-400'
                                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                              ]"
                            >
                              {{ t.label }}
                            </button>
                          </div>
                          <div v-else class="text-sm text-gray-500">Closed for the day.</div>

                          <!-- If the studio is open but all slots are unavailable, show a message under the grid -->
                          <p v-if="slotsForSelected.length && !slotsForSelected.some(s => s.available)" class="mt-3 text-sm text-gray-500">
                            No slots available for this day.
                          </p>
                        </div>

                        <div class="pt-4 border-t">
                            <button type="button" :disabled="!selectedSlotISO || adding" :class="[
                                'w-full px-5 py-2 rounded border border-black text-sm transition-colors',
                                (!selectedSlotISO || adding)
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-white hover:text-black'
                            ]" @click="addActivityToCart">
                                {{ adding ? 'Adding…' : 'Add to cart' }}
                            </button>
                            <p v-if="addError" class="mt-2 text-xs text-red-600">{{ addError }}</p>
                        </div>
                    </div>
                </aside>
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
import { useRoute } from 'vue-router'
import { computed, ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const blockOneData = {
    image: '/images/shop/shop_hero.webp',
    title: 'Meraki Art Studio',
    tagline: '',
    description: '',
    contentPlacement: 'center',
    height: 'h-[200px] md:h-[400px]',
}

const selectedSubtype = computed(() => ({
    title: route.query.title || '',
    description: route.query.description || '',
    price: route.query.price || '',
    duration: route.query.duration || '',
    minTickets: route.query.minTickets || '',
    image: route.query.image || '',
    variant: route.query.variant || '',
    vatIncluded: route.query.vatIncluded === 'true',
    quantity: Number(route.query.quantity || 1),
    totalPrice: route.query.totalPrice || '',
}))

// --- Month calendar state (from AvailabilityPicker) ---
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
// Live clock tick so past-time disabling updates without refresh
const nowTick = ref(Date.now())
let nowTimer

// Helper: is a Dubai-time slot in the future?
function isFutureDubaiSlot(dateKey, hhmm) {
    const slotMs = new Date(`${dateKey}T${hhmm}:00+04:00`).getTime()
    return slotMs > nowTick.value
}
const currentMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDate = ref(today)

const monthLabel = computed(() =>
    currentMonth.value.toLocaleString('en-US', { month: 'long', year: 'numeric' })
)

function prevMonth() {
    const d = new Date(currentMonth.value)
    d.setMonth(d.getMonth() - 1)
    currentMonth.value = d
}
function nextMonth() {
    const d = new Date(currentMonth.value)
    d.setMonth(d.getMonth() + 1)
    currentMonth.value = d
}

const isToday = (d) => d.toDateString() === today.toDateString()
const isSelectedDay = (d) => d.toDateString() === selectedDate.value.toDateString()
const isDisabled = (d) => d < today

const daysInGrid = computed(() => {
    const first = new Date(currentMonth.value)
    const firstWeekday = first.getDay()
    const start = new Date(first)
    start.setDate(1 - firstWeekday)
    const cells = []
    for (let i = 0; i < 42; i++) {
        const date = new Date(start)
        date.setDate(start.getDate() + i)
        cells.push({ date, inMonth: date.getMonth() === currentMonth.value.getMonth() })
    }
    return cells
})

function selectDate(d) {
    selectedDate.value = new Date(d)
}

// Force Dubai (Asia/Dubai) calendar day key (YYYY-MM-DD), independent of viewer locale
function ymdDubai(d) {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Dubai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(d)
    const y = parts.find(p => p.type === 'year')?.value
    const m = parts.find(p => p.type === 'month')?.value
    const da = parts.find(p => p.type === 'day')?.value
    return `${y}-${m}-${da}`
}

// availability state
const isLoading = ref(false)
const error = ref('')
const slotsMap = ref({}) // { 'YYYY-MM-DD': ['10:00','10:30', ...] }
const selectedTime = ref('')
// Studio hours (Dubai) — must match server calendar.get.ts
// Mon closed; Tue 12–19; Wed–Sun 10–19
const STUDIO_HOURS = {
    1: null, // Mon closed
    2: { open: '12:00', close: '18:30' }, // Tue
    3: { open: '10:00', close: '18:30' }, // Wed
    4: { open: '10:00', close: '18:30' }, // Thu
    5: { open: '10:00', close: '18:30' }, // Fri
    6: { open: '10:00', close: '18:30' }, // Sat
    0: { open: '10:00', close: '18:30' }, // Sun
}
const SLOT_STEP_MIN = 30

function hhmmToMinutes(hhmm) {
    const [h, m] = String(hhmm).split(':').map(Number)
    return (h || 0) * 60 + (m || 0)
}
function minutesToHHMM(min) {
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const studioWindowForSelected = computed(() => {
    const key = ymdDubai(selectedDate.value)
    const wd = new Date(`${key}T00:00:00+04:00`).getDay()
    return STUDIO_HOURS[wd] || null
})

const dayGridHHMM = computed(() => {
    const win = studioWindowForSelected.value
    if (!win) return []
    const start = hhmmToMinutes(win.open)
    const end = hhmmToMinutes(win.close)
    const out = []
    for (let t = start; t < end; t += SLOT_STEP_MIN) out.push(minutesToHHMM(t))
    return out
})
// Display toggle: Dubai time by default; optional local timezone view
const showInLocalTz = ref(false)
const displayTimeZone = computed(() => (showInLocalTz.value ? undefined : 'Asia/Dubai'))

const hasSlots = (d) => {
    const key = ymdDubai(d)
    const raw = Array.isArray(slotsMap.value[key]) ? slotsMap.value[key] : []
    // Only show dot if there is at least one FUTURE slot for that Dubai day
    return raw.some(v => {
        const hhmm = normalizeToHHMM(v)
        return hhmm ? isFutureDubaiSlot(key, hhmm) : false
    })
}

function longDate(d) {
    return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Dubai',
    })
}

function normalizeToHHMM(v) {
    if (!v) return ''
    if (typeof v === 'string') {
        const s = v.trim()
        // Already hh:mm
        const m2 = s.match(/^(\d{1,2}):(\d{2})$/)
        if (m2) {
            const hh = String(Number(m2[1])).padStart(2, '0')
            const mm = String(Number(m2[2])).padStart(2, '0')
            return `${hh}:${mm}`
        }
        // Convert "10:30 AM" -> hh:mm
        const m = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)
        if (m) {
            let hh = Number(m[1])
            const mm = Number(m[2] || '0')
            const ap = String(m[3]).toUpperCase()
            if (ap === 'PM' && hh < 12) hh += 12
            if (ap === 'AM' && hh === 12) hh = 0
            return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
        }
    }
    if (v && typeof v === 'object') {
        return v.time || v.start || v.value || ''
    }
    return ''
}

function toDisplayLabel(date, hhmm) {
    // Interpret hh:mm as Dubai local time, then format either Dubai time (default) or viewer local time
    const dateStr = ymdDubai(date)
    const dt = new Date(`${dateStr}T${hhmm}:00+04:00`)
    return dt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: displayTimeZone.value,
    })
}

const slotsForSelected = computed(() => {
    const key = ymdDubai(selectedDate.value)
    const raw = Array.isArray(slotsMap.value[key]) ? slotsMap.value[key] : []

    const availableSet = new Set(raw.map(v => normalizeToHHMM(v)).filter(Boolean))

    return dayGridHHMM.value.map((hhmm) => {
        const inFuture = isFutureDubaiSlot(key, hhmm)
        const available = availableSet.has(hhmm) && inFuture

        return {
            label: toDisplayLabel(selectedDate.value, hhmm),
            value: hhmm,
            available,
        }
    })
})

async function fetchWeekFor(date) {
    isLoading.value = true
    error.value = ''

    const base = new Date(date)
    const weekStart = new Date(base)
    weekStart.setDate(base.getDate() - base.getDay())
    weekStart.setHours(0, 0, 0, 0)

    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    weekEnd.setHours(23, 59, 59, 999)

    try {
        const startISO = weekStart.toISOString()
        const endISO = weekEnd.toISOString()

        // Pass activity identity to the API so capacity counters are scoped per activity
        const sku = String(route.query.sku || route.query.id || route.query.title || 'activity')
        const subtypeId = String(route.query.subtypeId || route.query.subtype || '')

        const res = await $fetch('/api/calendar', {
          query: {
            start: startISO,
            end: endISO,
            sku,
            subtypeId,
          },
        })
        const got = res?.slots ?? {}
        if (got && typeof got === 'object') {
            slotsMap.value = { ...slotsMap.value, ...got }
        }
    } catch (e) {
        console.error('availability error', e)
        error.value = 'Could not load availability. Please try again.'
    } finally {
        isLoading.value = false
    }
}

function chooseSlot(t) {
    if (!t?.available) return
    selectedTime.value = t.value
    addError.value = ''
}

const selectedSlotISO = computed(() => {
    if (!selectedTime.value) return ''
    const dateStr = ymdDubai(selectedDate.value)
    // Treat selectedTime as Dubai time and convert to ISO (UTC) for storage
    const dt = new Date(`${dateStr}T${selectedTime.value}:00+04:00`)
    return dt.toISOString()
})

function parseDurationMin(input) {
  // Accept formats like "45 mins", "60 min", "1 hr", "90"
  const s = String(input || '').toLowerCase()
  const n = Number((s.match(/(\d+)/) || [])[1] || 0)
  if (!n) return 30
  if (s.includes('hr')) return n * 60
  return n
}

const selectedSlotEndISO = computed(() => {
  if (!selectedSlotISO.value) return ''
  const durationMin = parseDurationMin(route.query.duration || selectedSubtype.value?.duration)
  const startMs = new Date(selectedSlotISO.value).getTime()
  return new Date(startMs + durationMin * 60 * 1000).toISOString()
})

function parsePriceLike(input) {
    if (input == null) return 0
    if (typeof input === 'number') return input
    const m = String(input).match(/([0-9]+(?:\.[0-9]+)?)/)
    return m ? Number(m[1]) : 0
}

// Add to cart
const adding = ref(false)
const addError = ref('')

async function addActivityToCart() {
    addError.value = ''
    if (!selectedSlotISO.value) return

    // Extra safety: prevent adding a slot that has already passed
    const startMs = new Date(selectedSlotISO.value).getTime()
    if (startMs <= Date.now()) {
        addError.value = 'This slot has already passed. Please choose another time.'
        return
    }

    adding.value = true
    try {
        const sku = String(route.query.sku || route.query.id || route.query.title || 'ACTIVITY')
        const title = String(route.query.title || 'Activity')
        const image = String(route.query.image || '')
        const currency = String(route.query.currency || 'AED')
        const priceMajor = parsePriceLike(route.query.price)
        const vatIncluded = route.query.vatIncluded === 'true'

        cartStore.add(
            {
                type: 'activity',
                id: sku,
                sku,
                title,
                image,
                priceMajor,
                currency,
                vat: true,
                vatValue: 5,
                vatIncluded,
                variantKey: route.query.variant || null,
                meta: {
                    kind: 'activity',
                    flowType: 'Activities',
                    slotStartISO: selectedSlotISO.value,
                    slotEndISO: selectedSlotEndISO.value,
                    selectedDate: ymdDubai(selectedDate.value),
                    selectedTime: selectedTime.value,
                    quantity: Number(route.query.quantity || 1),
                    parentId: route.query.parentId || route.query.parent || null,
                    subtypeId: route.query.subtypeId || route.query.subtype || null,
                },
            },
            Number(route.query.quantity || 1)
        )

        if (process.client) {
            window.dispatchEvent(new CustomEvent('open-cart'))
        }
    } catch (e) {
        console.error(e)
        addError.value = 'Could not add to cart. Please try again.'
    } finally {
        adding.value = false
    }
}

watch(selectedDate, (d) => {
    selectedTime.value = ''
    fetchWeekFor(d)
})

onMounted(() => {
    // Update every minute so slots automatically flip to grey as time passes
    nowTimer = setInterval(() => {
        nowTick.value = Date.now()
    }, 60_000)

    fetchWeekFor(selectedDate.value)
})

onBeforeUnmount(() => {
    if (nowTimer) clearInterval(nowTimer)
})
</script>

<style scoped>
* {
    font-family: 'Inter', sans-serif;
}
</style>
