<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
  >
    <!-- SVG overlay for curtain animation -->
    <svg
      ref="overlaySVG"
      class="fixed inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF6B6B" />
          <stop offset="100%" stop-color="#FFD93D" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#6BCB77" />
          <stop offset="100%" stop-color="#4D96FF" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF9F1C" />
          <stop offset="100%" stop-color="#E71D36" />
        </linearGradient>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#8338EC" />
          <stop offset="100%" stop-color="#3A86FF" />
        </linearGradient>
        <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF477E" />
          <stop offset="100%" stop-color="#FF85A1" />
        </linearGradient>
      </defs>
      <path
        v-for="(d, i) in pathsClosed"
        :key="i"
        class="shape-overlays__path"
        :fill="`url(#grad${i + 1})`"
        :d="d"
      />
    </svg>

    <!-- Heartbeat Logo -->
    <img
      src="https://merakiui.com/images/full-logo.svg"
      alt="Logo"
      class="w-40 h-auto animate-heartbeat"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const visible = ref(true)
const overlaySVG = ref(null)

const pathsClosed = [
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
]

const pathsOpened = [
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
]

onMounted(() => {
  // 1. Heartbeat logo animation duration ~3 seconds (done via CSS)
  // 2. Then run reverse curtain drop animation morphing paths from opened -> closed
  // 3. Then hide loader

  const paths = [...overlaySVG.value.querySelectorAll('.shape-overlays__path')]

  // Start with opened paths (curtain dropped)
  paths.forEach((path, i) => {
    path.setAttribute('d', pathsOpened[i])
  })

  setTimeout(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        visible.value = false
      },
    })

    // Morph paths back to closed (curtain folds up)
    tl.to(paths, {
      duration: 1,
      ease: 'power4.inOut',
      morphSVG: (i) => pathsClosed[i],
      stagger: 0.12,
    })
  }, 3000) // 3 seconds heartbeat logo duration
})
</script>

<style scoped>
/* Heartbeat animation */
@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.15);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.15);
  }
}

.animate-heartbeat {
  animation: heartbeat 3s ease-in-out forwards;
}

/* Overlay paths styling */
.shape-overlays__path {
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.15));
  transition: fill 0.8s ease;
  will-change: transform, fill, d;
  vector-effect: non-scaling-stroke;
}
</style>
