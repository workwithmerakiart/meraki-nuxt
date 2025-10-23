<template>
    <div class="w-full">
        <div class="flex items-center justify-between mb-4">
            <div class="text-sm text-gray-600">Time zone: {{ tzLabel }}</div>
            <div class="flex items-center gap-2">
                <button @click="prevMonth" class="px-2 py-1 text-gray-700 hover:underline">‹</button>
                <div class="font-medium">{{ monthLabel }}</div>
                <button @click="nextMonth" class="px-2 py-1 text-gray-700 hover:underline">›</button>
            </div>
        </div>

        <!-- Calendar grid -->
        <div class="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
            <div v-for="d in weekDays" :key="d">{{ d }}</div>
        </div>
        <div class="grid grid-cols-7 gap-1 mb-6">
            <button v-for="(day, idx) in daysInGrid" :key="idx" class="h-10 rounded border text-sm" :class="[
                day.inMonth ? 'bg-white' : 'bg-gray-50',
                isToday(day.date) ? 'border-blue-500' : 'border-gray-200',
                isSelected(day.date) ? 'ring-2 ring-blue-600' : '',
                isDisabled(day.date) ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-100'
            ]" :disabled="isDisabled(day.date)" @click="selectDate(day.date)">
                <div class="leading-10">{{ day.date.getDate() }}</div>
                <div v-if="hasSlots(day.date)" class="mx-auto w-1.5 h-1.5 rounded-full bg-blue-600 -mt-2"></div>
            </button>
        </div>

        <!-- Slots for selected date -->
        <div>
            <h3 class="text-sm font-medium mb-3">Availability for {{ longDate(selectedDate) }}</h3>
            <div v-if="isLoading" class="text-sm text-gray-500">Loading availability…</div>
            <div v-else>
                <div v-if="slotsForSelected.length" class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button v-for="t in slotsForSelected" :key="t.value" @click="choose(t)"
                        class="border rounded px-3 py-2 text-sm text-center" :class="t.value === selectedSlot?.value
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white border-gray-200 hover:border-gray-400'">
                        {{ t.label }}
                    </button>
                </div>
                <div v-else class="text-sm text-gray-500">No slots available for this day.</div>
            </div>

            <div class="mt-4">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
    durationMin: { type: Number, default: 30 },     // slot length
    timezone: { type: String, default: 'Asia/Dubai' }, // label only
    minAheadMinutes: { type: Number, default: 0 },     // filter slots that start sooner than this from "now"
})
const emit = defineEmits(['selected'])

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
const currentMonth = ref(new Date(today.getFullYear(), today.getMonth(), 1))
const selectedDate = ref(today)

const monthLabel = computed(() =>
    currentMonth.value.toLocaleString('en-US', { month: 'long', year: 'numeric' }))
const tzLabel = computed(() => 'Gulf Standard Time (GMT+4)')

const isToday = (d) => d.toDateString() === today.toDateString()
const isSelected = (d) => d.toDateString() === selectedDate.value.toDateString()
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

function prevMonth() { const d = new Date(currentMonth.value); d.setMonth(d.getMonth() - 1); currentMonth.value = d }
function nextMonth() { const d = new Date(currentMonth.value); d.setMonth(d.getMonth() + 1); currentMonth.value = d }
function selectDate(d) { selectedDate.value = new Date(d) }
function longDate(d) { return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) }

// availability state
const isLoading = ref(false)
const slotsMap = ref({}) // { 'YYYY-MM-DD': ['10:00','10:30', ...] }
const selectedSlot = ref(null)

const ymd = (d) => d.toISOString().split('T')[0]
const hasSlots = (d) => (slotsMap.value[ymd(d)] || []).length > 0

const slotsForSelected = computed(() => makeSlotsForDate(selectedDate.value))
function rawTimesForDate(date) {
  return Array.isArray(slotsMap.value[ymd(date)]) ? slotsMap.value[ymd(date)] : []
}

function isInFuture(date, hhmm) {
  const [h, m] = String(hhmm).split(':').map(Number)
  const start = new Date(date)
  start.setHours(h || 0, m || 0, 0, 0)
  const nowLocal = new Date()
  // apply minAheadMinutes buffer
  nowLocal.setMinutes(nowLocal.getMinutes() + (props.minAheadMinutes || 0))
  return start.getTime() > nowLocal.getTime()
}

function makeSlotsForDate(date) {
  // normalize to array of {label, value}
  const raw = rawTimesForDate(date)
  const times = raw
    .map(v => {
      if (typeof v === 'string') return v
      if (v && typeof v === 'object') {
        // support APIs that return objects like { time: '10:00' } or { start: '10:00' }
        return v.time || v.start || v.value || ''
      }
      return ''
    })
    .filter(Boolean)
    // prune past times only for the selected date's calendar day
    .filter(hhmm => {
      const sameDay = ymd(date) === ymd(new Date())
      return sameDay ? isInFuture(date, hhmm) : true
    })
    .sort((a, b) => a.localeCompare(b))

  return times.map(hhmm => ({ label: toDisplayLabel(date, hhmm), value: hhmm }))
}

function toDisplayLabel(date, hhmm) {
    const [h, m] = hhmm.split(':').map(Number)
    const d = new Date(date)
    d.setHours(h, m, 0, 0)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

async function fetchDay(date) {
  isLoading.value = true
  // Fetch a full week (Sun–Sat) around the selected date for better batching
  const base = new Date(date)
  const weekStart = new Date(base)
  weekStart.setDate(base.getDate() - base.getDay())
  weekStart.setHours(0, 0, 0, 0)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)
  try {
    const startISO = new Date(weekStart.toISOString()).toISOString()
    const endISO = new Date(weekEnd.toISOString()).toISOString()
    const res = await $fetch('/api/calendar', { params: { start: startISO, end: endISO } })
    const got = res?.slots ?? res?.data?.slots ?? {}
    if (got && typeof got === 'object') {
      // merge into our local map, tolerant of partial weeks
      slotsMap.value = { ...slotsMap.value, ...got }
    }
  } catch (e) {
    console.error('availability error', e)
  } finally {
    isLoading.value = false
    // Auto-pick the first available slot for this day to enable the Next button
    const options = makeSlotsForDate(selectedDate.value)
    if (options.length) {
      // programmatic choose (also emits to parent)
      choose(options[0])
    } else {
      selectedSlot.value = null
    }
  }
}

watch(selectedDate, (d) => { selectedSlot.value = null; fetchDay(d) }, { immediate: true })

function choose(t) {
    selectedSlot.value = t
    const [h, m] = t.value.split(':').map(Number)
    const start = new Date(selectedDate.value); start.setHours(h, m, 0, 0)
    const end = new Date(start); end.setMinutes(end.getMinutes() + props.durationMin)
    emit('selected', {
        date: ymd(selectedDate.value),
        startISO: start.toISOString(),
        endISO: end.toISOString(),
        labelDate: longDate(selectedDate.value),
        labelTime: t.label,
    })
}
</script>