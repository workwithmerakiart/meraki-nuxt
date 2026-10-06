<template>
  <div
    ref="rootRef"
    class="flex flex-col h-full"
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="resume"
  >
    <!-- Cards -->
    <div
      ref="trackRef"
      class="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth w-full"
      @touchstart.passive="pause"
      @touchend.passive="resume"
    >
      <template v-for="copy in copies" :key="copy">
        <div
          v-for="(item, i) in items"
          :key="`${copy}-${i}`"
          class="shrink-0 snap-start"
          :class="items.length > 1 ? cardClass : 'w-full'"
          :aria-hidden="copy > 1 ? 'true' : undefined"
          :inert="copy > 1 ? '' : undefined"
        >
          <slot :item="item" :index="i" :copy="copy" />
        </div>
      </template>
    </div>

    <!-- Footer: optional content on the left, arrows on the right -->
    <div class="mt-auto pt-8 flex flex-wrap items-center justify-between gap-6">
      <div><slot name="footer" /></div>
      <div v-show="overflowing" class="flex gap-3 shrink-0">
        <button type="button" aria-label="Previous" class="carousel-arrow" @click="step(-1)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m0 0 6-6m-6 6 6 6" />
          </svg>
        </button>
        <button type="button" aria-label="Next" class="carousel-arrow" @click="step(1)">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useResizeObserver } from '@vueuse/core'

// Auto-rolling card slider (same behaviour as the home page "Curated Creative Experiences" block):
// rolls one card every few seconds, loops, pauses on hover / touch / focus, arrows to step manually.
const props = defineProps({
  items: { type: Array, required: true },
  // Card widths per breakpoint (Tailwind classes) — a little under 100% so the next card peeks in
  cardClass: { type: String, default: 'w-[86%] lg:w-[84%]' },
  interval: { type: Number, default: 3500 },
})

const rootRef = ref(null)
const trackRef = ref(null)
const overflowing = ref(false)

// A second copy of the cards lets the slider loop seamlessly
const copies = computed(() => (props.items.length >= 2 ? 2 : 1))

let timer = null
let paused = false
let visible = false
let observer = null

const cardStep = () => {
  const first = trackRef.value?.children[0]
  if (!first) return 0
  const gap = parseFloat(getComputedStyle(trackRef.value).columnGap) || 0
  return first.offsetWidth + gap
}

// Width of one full set of cards (where the duplicate copy starts)
const setWidth = () => cardStep() * props.items.length

function measure() {
  const track = trackRef.value
  if (!track) return
  const contentWidth = copies.value === 2 ? setWidth() : track.scrollWidth
  overflowing.value = contentWidth > track.clientWidth + 2
}

function step(dir) {
  const track = trackRef.value
  if (!track) return

  if (copies.value === 2) {
    // Jump invisibly between the two identical copies to keep looping
    if (dir > 0 && track.scrollLeft >= setWidth() - 2) {
      track.scrollTo({ left: track.scrollLeft - setWidth(), behavior: 'instant' })
    } else if (dir < 0 && track.scrollLeft <= 2) {
      track.scrollTo({ left: setWidth(), behavior: 'instant' })
    }
  } else if (dir > 0 && track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
    track.scrollTo({ left: 0, behavior: 'smooth' })
    return
  }

  track.scrollBy({ left: dir * cardStep(), behavior: 'smooth' })
}

function tick() {
  if (!paused && visible && overflowing.value) step(1)
}

function pause() {
  paused = true
}

function resume() {
  paused = false
}

useResizeObserver(trackRef, measure)

onMounted(() => {
  measure()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // Only roll while the slider is on screen
  observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.3 })
  observer.observe(rootRef.value)
  timer = setInterval(tick, props.interval)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  observer?.disconnect()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.carousel-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid rgb(0 0 0 / 0.25);
  color: #000;
  transition: background-color 0.25s, color 0.25s, border-color 0.25s;
}

.carousel-arrow:hover {
  background-color: #000;
  border-color: #000;
  color: #f9f3eb;
}
</style>
