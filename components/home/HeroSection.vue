<template>
  <section class="relative w-full h-screen overflow-hidden">
    <Swiper :modules="[Autoplay, Pagination]" :autoplay="{ delay: 5000, disableOnInteraction: false }" :loop="true"
      :pagination="{ clickable: true }" :navigation="false" class="w-full h-full" @swiper="onSwiper"
      @autoplayTimeLeft="onAutoplayTimeLeft">
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 w-full h-full">
            <video v-if="slide.video" :src="slide.video" autoplay muted loop playsinline
              class="w-full h-full object-cover"></video>
            <template v-else>
              <!-- If slide requests rotation, render an <img> we can rotate -->
              <img v-if="slide.rotate90" :src="slide.image" alt="" class="rotated-90-cover" />
              <!-- Otherwise keep using a background div -->
              <div v-else class="w-full h-full bg-cover bg-center" :style="{ backgroundImage: `url(${slide.image})` }">
              </div>
            </template>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </div>

          <div
            class="relative z-10 text-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <div v-if="slide.badge"
              class="inline-block mb-4 px-5 py-2 text-xs font-bold text-white bg-[#C88039] rounded-full uppercase tracking-widest animate-slideup animation-delay-200 animation-backwards">
              {{ slide.badge }}
            </div>

            <p v-if="slide.tagline"
              class="text-base md:text-lg text-orange-200 mb-3 animate-slidein animation-delay-400 animation-backwards">
              {{ slide.tagline }}
            </p>

            <h1
              class="text-white text-4xl md:text-5xl lg:text-6xl font-serif uppercase mb-6 font-extrabold hero-slider-headings leading-tight drop-shadow-lg animate-fadein-quick animation-delay-600 animation-backwards">
              {{ slide.title }}
            </h1>
            <p
              class="text-gray-100 text-base md:text-lg mb-10 animate-fadein-quick animation-delay-800 animation-backwards hero-slider-subheadings">
              {{ slide.description }}
            </p>

            <!-- CTA only for slides except first -->
            <template v-if="index !== 0">
              <NuxtLink :to="slide.link"
                class="inline-block bg-transparent border border-white border-opacity-70 text-white text-opacity-70 px-10 py-4 rounded-full text-lg uppercase tracking-wide font-bold shadow-xl transition-all duration-300 hover:bg-[#DD4912] hover:text-white hover:text-opacity-100 hover:scale-105 hero-slider-subheadings animate-slideup animation-delay-1000 animation-backwards">
                {{ slide.cta }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ref } from "vue";

// Swiper instance
const swiperInstance = ref(null);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onAutoplayTimeLeft = (s, timeLeft, percentage) => {
  if (swiperInstance.value && swiperInstance.value.pagination.bullets) {
    const activeBullet = swiperInstance.value.pagination.bullets[s.activeIndex];
    if (activeBullet) {
      // Calculate progress from 0% to 100%
      const progressWidth = 100 - Math.round(percentage * 100);
      activeBullet.style.setProperty(
        "--swiper-pagination-progress",
        `${progressWidth}%`
      );
    }
  }
};

const slides = [
  {
    title: "",
    description: "",
    cta: "",
    link: "",
    video:
      "/videos/hero_main.mp4",
  },
  {
    title: "Events",
    tagline: "Soulful Gatherings",
    badge: "Limited Time",
    description: "Explore soulful gatherings crafted to elevate your energy",
    cta: "Book Now",
    link: "/experiences/events",
    video:
      "/videos/hero_events.mp4",
  },
  {
    title: "Workshops",
    tagline: "Deep Dives",
    badge: "Popular",
    description:
      "Participate in transformative sessions designed for personal growth",
    cta: "Book Now",
    link: "/experiences/workshops",
    image:
      "/images/hero_workshops.webp",
  },
  {
    title: "Courses",
    description: "Enroll in immersive courses designed to guide your journey",
    cta: "Buy Now",
    link: "/experiences/courses",
    video:
      "/videos/hero_courses.mp4",
  },
  {
    title: "Activities",
    description: "Join soulful activities tailored to ignite inner joy",
    cta: "Book Now",
    link: "/experiences/activities",
    image:
      "/images/hero_activities.webp",
  },
  {
    title: "Shop",
    badge: "New Arrivals",
    description: "Discover curated pieces that resonate with your spirit",
    cta: "Shop Now",
    link: "/shop",
    image:
      "/images/block3_shop.webp",
  },
];
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/sell-your-soul');

.swiper,
.swiper-slide {
  height: 100%;
}

/* Custom Pagination Lines */
:deep(.swiper-pagination-bullets) {
  bottom: 40px !important;
  /* Position from bottom */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  /* Space between lines */
  width: 100%;
  /* Ensure it spans the width for proper centering */
  z-index: 20;
  /* Ensure pagination is above other elements */
  pointer-events: auto;
  /* Ensure the container is clickable */
}

/* Base style for the clickable wrapper around each line */
:deep(.swiper-pagination-bullet) {
  position: relative;
  width: 50px;
  /* Increased clickable width for all lines */
  height: 15px;
  /* Increased clickable height */
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: transparent;
  /* Make the wrapper transparent */
  transition: transform 0.2s ease-in-out;
  /* For hover animation */
  pointer-events: auto;
  /* Ensure individual bullets are clickable */
}

/* Visual line within the clickable wrapper */
:deep(.swiper-pagination-bullet::before) {
  content: "";
  display: block;
  width: 50px;
  /* Visual width of all lines (increased) */
  height: 6px;
  /* Thickness of the line */
  border-radius: 1.5px;
  background-color: #ffffff;
  opacity: 0.4;
  /* Inactive line opacity */
  transition: all 0.3s ease-in-out;
  /* For active state transition */
}

/* Hover animation for the visual line */
:deep(.swiper-pagination-bullet:hover) {
  transform: translateY(-2px);
  /* Slight lift on hover */
}

:deep(.swiper-pagination-bullet:hover::before) {
  opacity: 0.7;
  /* Slightly brighter on hover */
}

/* Active state for the visual line (same width, but with progress fill) */
:deep(.swiper-pagination-bullet-active::before) {
  width: 50px;
  /* Same visual width as inactive */
  height: 6px;
  /* Slightly thicker for active */
  opacity: 1;
  /* Fully opaque for active */
  border-radius: 2px;
  /* Progress animation for the active line */
  background: linear-gradient(to right,
      #ffffff var(--swiper-pagination-progress, 0%),
      #ffffff40 var(--swiper-pagination-progress, 0%));
  transform-origin: left;
  /* Ensure progress fills from the left */
}

/* Animations */
@keyframes slidein {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideup {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadein-quick {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Animation Utility Classes */
.animate-slidein {
  animation: slidein 0.6s ease-out forwards;
}

.animate-slideup {
  animation: slideup 0.5s ease-out forwards;
}

.animate-fadein-quick {
  animation: fadein-quick 0.8s ease-in-out forwards;
}

/* For staggered animations: ensures initial state is hidden and maintains final state */
.animation-backwards {
  animation-fill-mode: backwards;
}

/* Animation Delay Utility Classes */
.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-1000 {
  animation-delay: 1.0s;
}

/* Custom font application */
.hero-slider-headings {
  font-family: 'Sell Your Soul', sans-serif;
}

.hero-slider-subheadings {
  font-family: "Inter", sans-serif;
}
</style>