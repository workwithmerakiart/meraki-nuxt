<template>
  <div class="page-container xl:px-12">
    <!-- Heading -->
    <div class="heading-bg p-2.5 mb-5">
      <h2 class="heading text-5xl font-bold text-[#447c9d] inter-font">
        JOIN OUR UPCOMING EVENTS
      </h2>
    </div>

    <!-- Infinite Carousel (Swiper) -->
    <ClientOnly>
      <div class="relative">
        <Swiper
          :modules="swiperModules"
          :loop="true"
          :speed="600"
          :spaceBetween="16"
          :grabCursor="true"
          :centeredSlides="false"
          :slides-per-view="'auto'"
          :navigation="{ nextEl: '.events-next', prevEl: '.events-prev' }"
          :autoplay="{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }"
          :loopAdditionalSlides="6"
          class="pb-6"
        >
          <SwiperSlide v-for="(item, index) in blocksData" :key="item.id" class="!w-[260px] sm:!w-[300px] lg:!w-[320px]">
            <BlockCard :block="item" :style="{ transitionDelay: `${index * 0.1}s` }" :class="{ animate: isAnimated }" />
          </SwiperSlide>
        </Swiper>

        <!-- Navigation Buttons -->
        <button class="nav-btn events-prev" aria-label="Previous">
          ‹
        </button>
        <button class="nav-btn events-next" aria-label="Next">
          ›
        </button>
      </div>
      <template #fallback>
        <!-- Fallback grid if JS disabled -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <BlockCard v-for="(item, index) in blocksData" :key="item.id" :block="item"
            :style="{ transitionDelay: `${index * 0.1}s` }" :class="{ animate: isAnimated }" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const swiperModules = [Navigation, Autoplay, A11y]

const blocksData = ref([
  { id: 1, type: 'WORKSHOPS', imageUrl: '/images/workshops/1.webp', title: 'Creative Mornings @ Meraki', link: '/experiences/workshops' },
  { id: 2, type: 'WORKSHOPS', imageUrl: '/images/workshops/2.webp', title: 'Moon Texture Art', link: '/experiences/workshops' },
  { id: 3, type: 'WORKSHOPS', imageUrl: '/images/workshops/3.webp', title: 'Paint & Sip', link: '/experiences/workshops' },
  { id: 4, type: 'WORKSHOPS', imageUrl: '/images/workshops/4.webp', title: 'Perfume Making', link: '/experiences/workshops' },
  { id: 5, type: 'WORKSHOPS', imageUrl: '/images/workshops/5.webp', title: 'Cold Process Soap Making', link: '/experiences/workshops' },
])

const isAnimated = ref(false)

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true
  }, 100)
})
</script>

<style scoped>
.heading {
  font-size: 3rem;
  font-weight: bold;
  font-family: 'DM Serif Display', serif;
  color: #dd4912;
  text-align: center;
}

.heading-bg {
  font-family: 'DM Serif Display', serif;
  background: #f9f3eb;
  text-align: center;
}

.dm-serif-font {
  font-family: 'DM Serif Display', serif;
}

.inter-font {
  font-family: 'DM Serif Display', serif;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  height: 42px;
  width: 42px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  font-size: 28px;
  line-height: 1;
  color: #447c9d;
}

.events-prev {
  left: -6px;
}

.events-next {
  right: -6px;
}

@media (min-width: 1024px) {
  .events-prev {
    left: -18px;
  }

  .events-next {
    right: -18px;
  }
}
</style>