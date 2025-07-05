<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Parallax Background -->
    <div
      ref="bg"
      class="absolute inset-0 bg-cover bg-center scale-110 will-change-transform"
      :style="{ backgroundImage: `url(${image})` }"
    ></div>

    <!-- Dark Overlay -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Bottom-Centered Content -->
    <div class="relative z-10 h-full flex items-end justify-center">
      <div class="text-white text-left max-w-4xl px-6 pb-12 md:pb-20 animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ title }}
        </h1>
        <p class="text-lg md:text-xl leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  image: String,
  title: String,
  description: String
})

const bg = ref(null)
let targetY = 0
let currentY = 0
let rafId = null

const update = () => {
  currentY += (targetY - currentY) * 0.1
  if (bg.value) {
    bg.value.style.transform = `translateY(${currentY}px)`
  }
  rafId = requestAnimationFrame(update)
}

const handleScroll = () => {
  targetY = window.scrollY * 0.25
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  rafId = requestAnimationFrame(update)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
div * {
  font-family: "Inter", sans-serif;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1.2s ease-out forwards;
}
</style>
