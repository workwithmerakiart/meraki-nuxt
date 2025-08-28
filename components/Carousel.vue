<template>
    <div class="relative overflow-hidden">
        <div class="flex transition-transform duration-700"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="image in images" :key="image" class="flex-none w-full sm:w-1/3 px-2">
                <img :src="image" class="rounded-lg shadow object-cover w-full h-64 sm:h-80" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const images = [
    '/images/custom/custom_large_scale.webp', '/images/hero_workshops.webp', '/images/activities/resin/activities_resin_beach_painting.webp', '/images/activities/resin/activities_resin_clock_with_rings.webp', '/images/activities/activities_block3.webp', '/images/shop/shop_hero.webp', '/images/hero_activities.webp', '/images/afterschool/afterschool_hero.webp',
    '/images/events/events_hero.webp', '/images/courses/courses_hero.webp','/images/courses/courses_block2.webp','/images/story/story_block2.webp'
]
const currentSlide = ref(0)
let interval
onMounted(() => {
    interval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % Math.ceil(images.length / 3)
    }, 3000)
})
onUnmounted(() => clearInterval(interval))
</script>
