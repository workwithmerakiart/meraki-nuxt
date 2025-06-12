<template>
    <section class="relative w-full overflow-hidden">
        <div class="w-full h-[90vh]">
            <Swiper :modules="[Autoplay, Pagination, Navigation]" :loop="true"
                :autoplay="{ delay: 5000, disableOnInteraction: false }" :pagination="{ clickable: true }"
                class="h-full">
                <SwiperSlide v-for="(slide, index) in slides" :key="index">
                    <div class="relative w-full h-full bg-cover bg-center text-white flex items-center justify-center"
                        :style="{ backgroundImage: `url(${slide.image})` }">
                        <div class="text-center bg-black/50 p-6 rounded-md max-w-xl">
                            <h2 class="text-4xl font-serif tracking-wide mb-4 uppercase">{{ slide.title }}</h2>
                            <p class="text-sm text-gray-200 mb-6">{{ slide.description }}</p>
                            <NuxtLink :to="slide.link"
                                class="inline-block bg-[#C88039] hover:bg-[#a96c30] text-white px-6 py-3 text-sm tracking-wide uppercase rounded">
                                {{ slide.cta }}
                            </NuxtLink>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

const slides = [
    {
        title: 'Events',
        description: 'Explore unique experiences and upcoming events.',
        cta: 'Book Now',
        link: '/experiences/events',
        image: '/images/hero-events.jpg'
    },
    {
        title: 'Workshops',
        description: 'Participate in engaging hands-on workshops.',
        cta: 'Book Now',
        link: '/experiences/workshops',
        image: '/images/hero-workshops.jpg'
    },
    {
        title: 'Courses',
        description: 'Deepen your skills with structured courses.',
        cta: 'Buy Now',
        link: '/experiences/courses',
        image: '/images/hero-courses.jpg'
    },
    {
        title: 'Activities',
        description: 'Get involved in fun-filled and soulful activities.',
        cta: 'Book Now',
        link: '/experiences/activities',
        image: '/images/hero-activities.jpg'
    },
    {
        title: 'Shop',
        description: 'Discover curated items that match your vibe.',
        cta: 'Shop Now',
        link: '/shop',
        image: '/images/hero-shop.jpg'
    }
]
</script>

<style scoped>
.swiper-pagination-bullet {
    background: #fff !important;
    opacity: 0.6;
}

.swiper-pagination-bullet-active {
    background: #C88039 !important;
    opacity: 1;
}
</style>
