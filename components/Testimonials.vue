<template>
  <section class="w-full bg-[#f9f3eb] py-12 testimonials-section">
    <div class="max-w-6xl mx-auto px-4">
      <Swiper
        :modules="[Pagination, Autoplay, EffectFade]"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        :loop="true"
        :speed="600"
        :effect="'fade'"
        :fade-effect="{ crossFade: true }"
        class="testimonial-swiper"
      >
        <SwiperSlide v-for="(t, index) in testimonials" :key="index">
          <article
            class="bg-white px-6 md:px-12 py-10 md:py-12 rounded-xl shadow-sm border border-black/10 min-h-[300px] md:min-h-[340px] grid place-items-center"
          >
            <div class="flex flex-col items-center text-center">
              <blockquote class="mt-6 max-w-3xl fancy-quote px-10 md:px-12">
                <p class="text-lg md:text-xl leading-relaxed text-gray-800">
                  {{ t.text }}
                </p>
              </blockquote>

              <footer class="mt-6">
                <h4 class="font-bold uppercase text-gray-900">{{ t.author }}</h4>
                <p v-if="t.role" class="text-sm text-gray-500">{{ t.role }}</p>
              </footer>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const testimonials = [
  {
    text:
      'Meraki Art Studio is an incredible studio space that accommodates small and large groups. We have used them for school groups for our Week Without Walls program. They customised for our needs and offered a diverse range of art workshops for our group. They always offer engaging and fun visual art lessons that the students love. Highly recommend.',
    author: 'Mel Evo',
    role: 'Dubai American Academy',
  },
  {
    text:
      'I highly recommend this place especially for a birthday! Invited around 40 kids and not 1 got bored! They did a fantastic job!',
    author: 'Shaden Abu Sharar',
    role: '',
  },
  {
    text:
      'The tastefully designed studio is home to a quaint cafe bar, where you can order your dose of caffeine for the session. Meraki Art Studio Dubai offers private and group workshops that cover a variety of art and wellness sessions. The best thing is, when you sign up for a class, you only have to bring yourself and a creative mood – everything else is provided by the studio.',
    author: 'Bayut Middle East',
    role: '',
  },
  {
    text:
      'It is on its way to make waves in the art community in the UAE — It is a community arts space that aims to engage audiences, promote local artists and support the development of the art scene through extensive art programmes, educational initiatives, and community projects.',
    author: 'Muhammad Yusuf',
    role: 'Features Writer',
  }
]
</script>

<style scoped>
.testimonial-swiper { width: 100%; }

/* Flamingo theme color available within this component */
.testimonials-section { --flamingo: #ff6b6b; }

/* Swiper bullets to flamingo; inactive = lower opacity */
:deep(.swiper-pagination-bullet) { background-color: var(--flamingo); opacity: 0.35; }
:deep(.swiper-pagination-bullet-active) { background-color: var(--flamingo); opacity: 1; }

/* Ensure slides themselves don’t carry unwanted background that flashes */
:deep(.swiper-slide) { background-color: transparent !important; }

/* Decorative quotes around the testimonial text */
.fancy-quote { position: relative; }
.fancy-quote::before {
  content: "\201C"; /* opening quote */
  position: absolute;
  left: 0.25rem;
  top: -0.5rem;
  font-size: 2rem;
  color: var(--flamingo);
  line-height: 1;
}
.fancy-quote::after {
  content: "\201D"; /* closing quote */
  position: absolute;
  right: 0.25rem;
  bottom: -0.5rem;
  font-size: 2rem;
  color: var(--flamingo);
  line-height: 1;
}
</style>
