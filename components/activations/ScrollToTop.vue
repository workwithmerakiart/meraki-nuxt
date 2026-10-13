<template>
  <Transition name="stt">
    <button
      v-show="visible"
      type="button"
      class="stt group"
      :style="{ '--accent': accent }"
      aria-label="Back to top"
      @click="toTop"
    >
      <!-- progress ring -->
      <svg class="stt__ring" viewBox="0 0 44 44" aria-hidden="true">
        <circle class="stt__track" cx="22" cy="22" :r="R" fill="none" stroke-width="1" />
        <circle
          class="stt__bar"
          cx="22"
          cy="22"
          :r="R"
          fill="none"
          stroke-width="1.25"
          stroke-linecap="round"
          :stroke-dasharray="C"
          :stroke-dashoffset="C - C * progress"
        />
      </svg>

      <svg class="stt__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />
      </svg>

      <span class="stt__label">Top</span>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  accent: { type: String, default: '#DD4912' },
})

const R = 20
const C = 2 * Math.PI * R

const visible = ref(false)
const progress = ref(0)
let ticking = false

function read() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  const y = window.scrollY || doc.scrollTop || 0
  progress.value = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
  // appear once the hero is behind you
  visible.value = y > window.innerHeight * 0.8
  ticking = false
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(read)
}

function toTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  if (!process.client) return
  read()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<style scoped>
/* bottom-LEFT so it never collides with the WhatsApp widget (bottom-right) */
.stt {
  position: fixed;
  left: 16px;
  bottom: 40px;
  z-index: 999;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  background: rgba(249, 243, 235, 0.82);
  backdrop-filter: blur(8px);
  color: #3f362f;
  transition: color 0.4s ease, background-color 0.4s ease, width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}
.stt:hover {
  color: var(--accent);
  background: rgba(249, 243, 235, 0.96);
}

.stt__ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}
.stt__track {
  stroke: rgba(0, 0, 0, 0.13);
}
.stt__bar {
  stroke: var(--accent);
  transition: stroke-dashoffset 0.15s linear;
}

.stt__arrow {
  position: relative;
  width: 16px;
  height: 16px;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.stt:hover .stt__arrow {
  transform: translateY(-2px);
}

/* label stays out of the way; revealed on wider screens via width growth */
.stt__label {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.stt-enter-active,
.stt-leave-active {
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
}
.stt-enter-from,
.stt-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .stt,
  .stt__arrow,
  .stt__bar,
  .stt-enter-active,
  .stt-leave-active {
    transition: none;
  }
}
</style>
