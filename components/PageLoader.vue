<template>
  <div v-if="visible" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">
    <!-- Heartbeat Logo -->
    <img ref="logoRef" src="/images/meraki-logo-black.png" alt="Logo"
      class="w-40 h-auto object-contain animate-heartbeat" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap' // ✅ named import

const visible = ref(true)
const logoRef = ref(null)

onMounted(() => {
  if (!process.client) return

  const img = logoRef.value
  if (!img) return

  const startAnimation = () => {
    gsap.to(img, {
      duration: 1,
      ease: 'power1.inOut',
      scale: 1.15,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        visible.value = false
      },
    })
  }

  if (!img.complete) {
    img.onload = startAnimation
  } else {
    startAnimation()
  }
})
</script>


<style scoped>
/* Heartbeat animation */
@keyframes heartbeat {

  0%,
  100% {
    transform: scale(1);
  }

  25%,
  75% {
    transform: scale(1.15);
  }

  50% {
    transform: scale(1);
  }
}

.animate-heartbeat {
  animation: heartbeat 3s ease-in-out forwards;
}

/* Logo styling */
img {
  max-height: 100vh;
  object-fit: contain;
}
</style>