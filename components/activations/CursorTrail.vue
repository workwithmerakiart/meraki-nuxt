<template>
  <div v-if="enabled" ref="wrap" class="trail" aria-hidden="true">
    <span
      v-for="(d, i) in dots"
      :key="i"
      ref="dotEls"
      class="trail__dot"
      :style="{
        background: d.color,
        width: `${d.size}px`,
        height: `${d.size}px`,
        opacity: d.opacity,
      }"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  // gradient stops, head → tail
  colors: {
    type: Array,
    default: () => ['#DD4912', '#C2577A', '#8C6A9D', '#447C9D', '#5E8C61', '#B8860B'],
  },
  count: { type: Number, default: 30 },
  // how tightly each dot chases the one ahead of it (head value; eases off down the tail)
  ease: { type: Number, default: 0.3 },
})

const enabled = ref(false)
const wrap = ref(null)
const dotEls = ref([])

/* ---- interpolate the palette across `count` dots ---- */
function hexToRgb(h) {
  const s = h.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(s.slice(i, i + 2), 16))
}
function mix(a, b, t) {
  const [r1, g1, b1] = hexToRgb(a)
  const [r2, g2, b2] = hexToRgb(b)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const bl = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r},${g},${bl})`
}

const dots = computed(() =>
  Array.from({ length: props.count }, (_, i) => {
    const t = i / (props.count - 1) // 0 = head, 1 = tail
    const seg = t * (props.colors.length - 1)
    const idx = Math.min(props.colors.length - 2, Math.floor(seg))
    return {
      color: mix(props.colors[idx], props.colors[idx + 1], seg - idx),
      size: 15 - 11 * t, // tapers 15px → 4px
      opacity: 1 - 0.6 * t,
    }
  }),
)

/* ---- animation ---- */
let pts = []
let raf = null
let visible = false
const mouse = { x: 0, y: 0 }

function onMove(e) {
  mouse.x = e.clientX
  mouse.y = e.clientY
  if (!visible) {
    visible = true
    // drop the whole chain at the pointer so it doesn't streak in from 0,0
    pts = pts.map(() => ({ x: mouse.x, y: mouse.y }))
    last = 0
    if (wrap.value) wrap.value.style.opacity = '1'
  }
}
function onLeave() {
  visible = false
  if (wrap.value) wrap.value.style.opacity = '0'
}

let last = 0

function frame(now) {
  // Frame-rate independent easing. Without this the trail moves at a different
  // speed on 120Hz displays and stutters when frames are dropped.
  const dt = last ? Math.min(64, now - last) : 16.67
  last = now
  const step = dt / 16.67

  let px = mouse.x
  let py = mouse.y
  const n = pts.length

  for (let i = 0; i < n; i++) {
    const p = pts[i]
    const t = i / (n - 1)
    // head tracks tightly, tail trails more softly -> smoother taper than a uniform ease
    const e = props.ease * (1 - 0.45 * t)
    const k = 1 - Math.pow(1 - e, step)

    p.x += (px - p.x) * k
    p.y += (py - p.y) * k

    const el = dotEls.value[i]
    if (el) {
      const half = (15 - 11 * t) / 2
      el.style.transform = `translate3d(${p.x - half}px, ${p.y - half}px, 0)`
    }
    px = p.x
    py = p.y
  }
  raf = requestAnimationFrame(frame)
}

onMounted(() => {
  if (!process.client) return
  // pointer-driven only: skip touch devices and reduced-motion users
  const fine = window.matchMedia?.('(pointer: fine)').matches
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduce) return

  enabled.value = true
  pts = Array.from({ length: props.count }, () => ({ x: 0, y: 0 }))

  requestAnimationFrame(() => {
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(frame)
  })
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseleave', onLeave)
})
</script>

<style scoped>
.trail {
  position: fixed;
  inset: 0;
  z-index: 9990;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.trail__dot {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 9999px;
  will-change: transform;
  mix-blend-mode: multiply;
}
</style>
