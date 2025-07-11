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
    '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif', '/images/products/3be4b9_7eaf42e6ec794c1482e3bf408f682199~mv2.avif', '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif', '/images/products/3be4b9_7eaf42e6ec794c1482e3bf408f682199~mv2.avif', '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif', '/images/products/3be4b9_7eaf42e6ec794c1482e3bf408f682199~mv2.avif', '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif', '/images/products/3be4b9_7eaf42e6ec794c1482e3bf408f682199~mv2.avif',
    '/images/products/3be4b9_947e2eba7be54daa9e0ad8916dc17305~mv2.avif', '/images/products/3be4b9_7eaf42e6ec794c1482e3bf408f682199~mv2.avif'
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
