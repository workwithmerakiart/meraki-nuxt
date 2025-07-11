<template>
    <div class="w-full bg-[#f9f3eb] py-10">
        <div class="max-w-7xl mx-auto px-4">
            <Swiper :modules="[Pagination, Autoplay, EffectCreative]" :pagination="{ clickable: true }"
                :autoplay="{ delay: 5000 }" :effect="'creative'" :creative-effect="{
                    prev: { shadow: true, translate: ['-20%', 0, -1] },
                    next: { translate: ['100%', 0, 0] }
                }" class="mySwiper">
                <SwiperSlide v-for="(t, index) in testimonials" :key="index"
                    class="bg-white px-4 md:px-12 py-12 rounded-lg shadow-none relative overflow-hidden">
                    <!-- Decorative Top Line + Circle Image -->
                    <!-- Decorative Top Line + Larger Circle Image -->
                    <div class="relative flex justify-center items-center mb-8">
                        <div class="absolute inset-x-0 h-px top-1/2 z-0 bg-[#ff5757]"></div>
                        <img :src="t.image" alt="photo"
                            class="z-10 w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg bg-white transition-transform duration-300 hover:scale-105" />
                    </div>

                    <!-- Quote Row with Larger Text -->
                    <div
                        class="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-[#ff5757] text-5xl md:text-6xl mb-8">
                        <span class="leading-none">“</span>
                        <p
                            class="text-center text-xl md:text-2xl font-medium leading-relaxed text-gray-800 max-w-3xl mx-2">
                            {{ t.text }}
                        </p>
                        <span class="leading-none">”</span>
                    </div>


                    <!-- Author -->
                    <div class="text-center mt-4">
                        <h4 class="font-bold uppercase text-gray-900">{{ t.author }}</h4>
                        <p class="text-sm text-gray-500">{{ t.role }}</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, EffectCreative } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-creative'

const testimonials = [
    {
        text: 'Meraki transformed our idea into art we’ll cherish forever.',
        author: 'Aarav Gupta',
        role: 'Interior Designer',
        image: '/images/team/Kajol.png'
    },
    {
        text: 'Our corporate gifts were stunning, on-brand, and loved by all.',
        author: 'Nisha Kapoor',
        role: 'Marketing Head',
        image: '/images/team/Pooja.jpg'
    },
    {
        text: 'They captured our wedding flowers in resin so perfectly.',
        author: 'Rohit & Priya',
        role: 'Bride & Groom',
        image: '/images/team/Kalyani.jpg'
    },
    {
        text: 'Exceptional creativity and timely delivery every time.',
        author: 'Simran Mehta',
        role: 'Event Planner',
        image: '/images/team/Nono.jpg'
    }
]
</script>

<style scoped>
.mySwiper {
    width: 100%;
}

:deep(.swiper-pagination-bullet) {
    background-color: #d1d5db;
    opacity: 1;
}

:deep(.swiper-pagination-bullet-active) {
    background-color: #ff5757;
}

:deep(.swiper-slide) {
    background-color: #ffffff !important;
}
</style>
