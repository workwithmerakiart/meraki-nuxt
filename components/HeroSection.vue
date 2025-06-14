<template>
    <section class="relative w-full h-screen overflow-hidden">
        <Swiper :modules="[Autoplay, Pagination, Navigation]" :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :loop="true" :pagination="{ clickable: true }" :navigation="true" class="w-full h-full">
            <SwiperSlide v-for="(slide, index) in slides" :key="index">
                <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <!-- Background media -->
                    <div class="absolute inset-0 w-full h-full">
                        <video v-if="slide.video" :src="slide.video" autoplay muted loop playsinline
                            class="w-full h-full object-cover"></video>
                        <div v-else class="w-full h-full bg-cover bg-center"
                            :style="{ backgroundImage: `url(${slide.image})` }"></div>
                        <!-- REMOVED BLACK GRADIENT OVERLAY -->
                    </div>

                    <!-- Content -->
                    <div class="relative z-10 text-center px-6 max-w-2xl animate-fadein-slow pt-24 md:pt-0">
                        <div v-if="slide.badge"
                            class="inline-block mb-2 px-3 py-1 text-xs font-semibold text-white bg-[#C88039] rounded-full uppercase tracking-wider animate-slideup">
                            {{ slide.badge }}
                        </div>

            <p
              v-if="slide.tagline"
              class="text-sm md:text-base text-orange-200 mb-2 animate-slidein"
            >
              {{ slide.tagline }}
            </p>

            <h1
              class="text-white text-3xl md:text-5xl font-serif uppercase mb-4"
            >
              {{ slide.title }}
            </h1>
            <p class="text-gray-200 text-sm md:text-base mb-6">
              {{ slide.description }}
            </p>

            <NuxtLink
              :to="slide.link"
              class="inline-block bg-[#C88039] hover:bg-[#a96c30] text-white px-6 py-3 rounded-md text-sm uppercase tracking-wide"
            >
              {{ slide.cta }}
            </NuxtLink>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
    {
        title: 'Events',
        tagline: 'Soulful Gatherings',
        badge: 'Limited Time',
        description: 'Explore soulful gatherings crafted to elevate your energy.',
        cta: 'Book Now',
        link: '/experiences/events',
        video:
            'https://stream.mux.com/SDte3KxHZW00kXTI2bjFQvamHDl00An1c1SMzEsGLOXZM/high.mp4',
    },
    {
        title: 'Workshops',
        tagline: 'Deep Dives',
        badge: 'Popular',
        description: 'Participate in transformative sessions designed for personal growth.',
        cta: 'Book Now',
        link: '/experiences/workshops',
        image: 'https://source.unsplash.com/1600x900/?workshop',
    },
    {
        title: 'Courses',
        description: 'Enroll in immersive courses designed to guide your journey.',
        cta: 'Buy Now',
        link: '/experiences/courses',
        video:
            'https://stream.mux.com/At01p00A01Zf6jXjio6HapAkDvnzExSpdGh3gkJ7C2OiPU/high.mp4',
    },
    {
        title: 'Activities',
        description: 'Join soulful activities tailored to ignite inner joy.',
        cta: 'Book Now',
        link: '/experiences/activities',
        image: 'https://source.unsplash.com/1600x900/?activities',
    },
    {
        title: 'Shop',
        badge: 'New Arrivals',
        description: 'Discover curated pieces that resonate with your spirit.',
        cta: 'Shop Now',
        link: '/shop',
        image: 'https://source.unsplash.com/1600x900/?interiors,shop',
    },
]
</script>

<style scoped>
.swiper,
.swiper-slide {
  height: 100%;
}

:deep(.swiper-pagination-bullet) {
  background-color: #ffffff;
  opacity: 0.2;
  bottom: 20px;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #ffffff;
  opacity: 1;
}

:deep(.swiper-pagination-bullets) {
  bottom: 20px;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff;
}

@media (max-width: 767px) {
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
}

@keyframes slidein {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideup {
  from {
    transform: translateY(10px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadein-slow {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-slidein {
  animation: slidein 0.8s ease-out forwards;
}

.animate-slideup {
  animation: slideup 0.6s ease-out forwards;
}

.animate-fadein-slow {
  animation: fadein-slow 1.2s ease-in-out forwards;
}
</style>
