<template>
    <div
      class="relative overflow-hidden"
      @mouseenter="onPointerEnter"
      @mouseleave="onPointerLeave"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
        <div class="flex transition-transform duration-700"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="image in finalImages" :key="image" class="flex-none w-full sm:w-1/3 px-2">
                <img :src="image" class="rounded-lg shadow object-cover w-full h-64 sm:h-80" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

/**
 * Accept an optional `images` prop; if provided (and non-empty),
 * it overrides the component's internal defaultImages.
 */
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  /** Autoplay delay in ms (optional) */
  delay: {
    type: Number,
    default: 3000
  },
  /** Pause autoplay when hovered */
  pauseOnHover: {
    type: Boolean,
    default: true
  }
})

/** Default images used when no prop images are passed in */
const defaultImages = [
  '/images/custom/custom_large_scale.webp',
  '/images/hero_workshops.webp',
  '/images/activities/resin/activities_resin_beach_painting.webp',
  '/images/activities/resin/activities_resin_clock_with_rings.webp',
  '/images/activities/activities_block3.webp',
  '/images/shop/shop_hero.webp',
  '/images/hero_activities.webp',
  '/images/afterschool/afterschool_hero.webp',
  '/images/events/events_hero.webp',
  '/images/courses/courses_hero.webp',
  '/images/courses/courses_block2.webp',
  '/images/story/story_block2.webp'
]

/** Use prop images if provided, otherwise fallback to defaults */
const finalImages = computed(() => (props.images && props.images.length) ? props.images : defaultImages)

/** Determine items per view based on viewport (match Tailwind sm: breakpoint) */
const perView = ref(1)
const updatePerView = () => {
  perView.value = (typeof window !== 'undefined' && window.innerWidth >= 640) ? 3 : 1
}

const isPaused = ref(false)
const onPointerEnter = () => {
  if (!props.pauseOnHover) return
  isPaused.value = true
  stopAutoplay()
}
const onPointerLeave = () => {
  if (!props.pauseOnHover) return
  isPaused.value = false
  startAutoplay()
}

const currentSlide = ref(0)
const totalSlides = computed(() => Math.max(1, Math.ceil(finalImages.value.length / perView.value)))

let intervalId
const startAutoplay = () => {
  stopAutoplay()
  if (isPaused.value) return
  if (totalSlides.value <= 1) return
  intervalId = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides.value
  }, props.delay)
}
const stopAutoplay = () => { if (intervalId) { clearInterval(intervalId); intervalId = null } }

onMounted(() => {
  updatePerView()
  window.addEventListener('resize', updatePerView)
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updatePerView)
  }
})

// Restart autoplay when images set or perView changes
watch([finalImages, perView], () => {
  currentSlide.value = 0
  startAutoplay()
})
</script>
