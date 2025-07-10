<template>
  <section class="relative bg-[#F9F3EB] py-16 px-6 md:px-12 overflow-hidden">
    <!-- Section Heading -->
    <div class="max-w-screen-2xl 2xl:max-w-[2560px] mx-auto text-center mb-12">
      <h2 class="text-4xl md:text-5xl font-extrabold text-[#dd4912] mb-4 hero-slider-headings">
        Meraki Art Studio: What's Brewing Now
      </h2>
      <p class="text-black max-w-3xl mx-auto text-lg md:text-xl hero-slider-subheadings font-light">
        There's a heck of a lot of stuff out there. We've sorted through it and
        rounded up the most exciting new items from independents.
      </p>
    </div>

    <!-- Carousel Container with Arrows Only -->
    <div class="relative w-full max-w-screen-2xl 2xl:max-w-[2560px] mx-auto">
      <!-- Left Arrow -->
      <button @click="scrollLeft"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
        <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <!-- Scrollable Cards -->
      <div ref="carouselRef"
        class="flex space-x-8 overflow-x-auto px-0 scrollbar-hide snap-x snap-mandatory scroll-smooth w-full"
        @mouseenter="pauseAutoscroll" @mouseleave="startAutoscroll" @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd">
        <template v-for="n in 2">
          <NuxtLink v-for="(item, index) in products" :key="`${n}-${index}`" :to="item.link"
            class="min-w-[420px] sm:min-w-[480px] md:min-w-[520px] 2xl:min-w-[600px] h-[320px] 2xl:h-[400px] flex-shrink-0 relative rounded-xl shadow-lg bg-white cursor-pointer snap-start overflow-hidden">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300" />
            <div v-if="item.tag"
              :class="['absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold uppercase', item.tagColor, 'text-white transition-opacity duration-300']">
              {{ item.tag }}
            </div>
            <div
              class="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center text-sm font-semibold py-2 hero-slider-subheadings">
              {{ item.title }}
            </div>
          </NuxtLink>
        </template>
      </div>

      <!-- Right Arrow -->
      <button @click="scrollRight"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
        <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useResizeObserver } from '@vueuse/core'

const carouselRef = ref(null)
const scrollAmount = 320
let autoScrollInterval = null
const scrollWidth = ref(0)

useResizeObserver(carouselRef, (entries) => {
  if (entries.length) {
    scrollWidth.value = entries[0].target.scrollWidth
  }
})

const scrollLeft = () => {
  carouselRef.value?.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
}

const scrollRight = () => {
  carouselRef.value?.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

const startAutoscroll = () => {
  stopAutoscroll()
  autoScrollInterval = setInterval(() => {
    const container = carouselRef.value
    if (!container) return
    const currentScroll = container.scrollLeft
    const resetPoint = scrollWidth.value / 2
    if (currentScroll >= resetPoint) {
      container.scrollTo({ left: 0, behavior: 'auto' })
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }, 3000)
}

const pauseAutoscroll = () => stopAutoscroll()
const stopAutoscroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

const handleTouchStart = () => pauseAutoscroll()
const handleTouchEnd = () => startAutoscroll()

onMounted(() => {
  startAutoscroll()
})
onBeforeUnmount(() => {
  stopAutoscroll()
})

const products = [
  {
    image: 'https://images.unsplash.com/photo-1496092607007-ca127e0b6a10?q=80&w=2410&auto=format&fit=crop',
    title: 'Events',
    tag: 'Upcoming',
    tagColor: 'bg-gray-900',
    link: '/events'
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2340&auto=format&fit=crop',
    title: 'Workshops',
    tag: 'Upcoming',
    tagColor: 'bg-gray-900',
    link: '/workshops'
  },
  {
    image: 'https://images.unsplash.com/photo-1496092607007-ca127e0b6a10?q=80&w=2410&auto=format&fit=crop',
    title: "Activities",
    tag: 'Recommended',
    tagColor: 'bg-gray-900',
    link: '/activities'
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2340&auto=format&fit=crop',
    title: 'Courses',
    tag: 'Must Buy',
    tagColor: 'bg-gray-900',
    link: '/courses'
  },
  {
    image: 'https://images.unsplash.com/photo-1496092607007-ca127e0b6a10?q=80&w=2410&auto=format&fit=crop',
    title: 'Shop',
    tag: 'Offer Expiring Soon',
    tagColor: 'bg-gray-900',
    link: '/shop'
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2340&auto=format&fit=crop',
    title: 'Blogs',
    tag: 'Trending',
    tagColor: 'bg-gray-900',
    link: '/blogs'
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter&display=swap');
@import url('https://fonts.cdnfonts.com/css/sell-your-soul');

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hero-slider-headings {
  font-family: 'DM Serif Display', serif;
}

.hero-slider-subheadings {
  font-family: 'Inter', sans-serif;
}

.block-three-subheadings {
    font-family: "Caveat Brush", serif;
}
</style>
