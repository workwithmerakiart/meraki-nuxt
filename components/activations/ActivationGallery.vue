<template>
  <div class="activation-gallery h-full">
    <AutoCarousel :items="projects">
      <template #default="{ item: project, index: i }">
        <figure>
          <button
            type="button"
            data-anim="flip"
            :data-delay="i * 0.15"
            :data-fill="accent"
            class="group relative block w-full aspect-[3/2] overflow-hidden bg-black/5 cursor-zoom-in"
            :aria-label="`View photos from ${project.client}`"
            @click="openLightbox(project)"
          >
            <!-- Hover zoom lives on the wrapper so it doesn't fight the scroll animation on the img -->
            <span class="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
              <img
                :src="project.images[0]"
                :alt="`${project.client} – ${project.caption}`"
                loading="lazy"
                decoding="async"
                class="absolute inset-0 w-full h-full object-cover"
              />
            </span>
            <span
              v-if="project.images.length > 1"
              class="absolute top-4 right-4 bg-[#f9f3eb] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em]"
            >
              {{ project.images.length }} photos
            </span>
          </button>

          <figcaption class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
            <div>
              <p class="text-xl md:text-[1.4rem] font-medium tracking-tight leading-tight" :style="{ color: accent }">{{ project.client }}</p>
              <p v-if="project.location" class="mt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#A89B8F]">
                {{ project.location }}<template v-if="project.date"> · {{ project.date }}</template>
              </p>
            </div>
            <p class="text-[15px] text-[#7A6A5E] leading-relaxed">{{ project.caption }}</p>
          </figcaption>
        </figure>
      </template>
      <template #footer><slot /></template>
    </AutoCarousel>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="active"
          class="activation-gallery fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          :aria-label="active.client"
          @click.self="closeLightbox"
        >
          <button
            type="button"
            class="absolute top-4 right-5 text-white/80 hover:text-white text-3xl leading-none"
            aria-label="Close"
            @click="closeLightbox"
          >
            ✕
          </button>

          <img
            :src="active.images[photoIndex]"
            :alt="`${active.client} – ${active.caption}`"
            class="max-h-[78vh] max-w-full object-contain"
          />

          <div class="mt-5 text-center text-white max-w-2xl">
            <p class="text-2xl font-semibold">{{ active.client }}</p>
            <p class="mt-1 text-white/80">{{ active.caption }}</p>
            <p v-if="active.location" class="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
              {{ active.location }}
            </p>
          </div>

          <div v-if="active.images.length > 1" class="mt-4 flex gap-2">
            <button
              v-for="(src, p) in active.images"
              :key="src"
              type="button"
              class="w-2.5 h-2.5 rounded-full transition"
              :class="p === photoIndex ? 'bg-white' : 'bg-white/35 hover:bg-white/60'"
              :aria-label="`Photo ${p + 1}`"
              @click="photoIndex = p"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import AutoCarousel from '~/components/activations/AutoCarousel.vue'

defineProps({
  projects: { type: Array, required: true },
  accent: { type: String, default: '#dd4912' },
})

// Lightbox
const active = ref(null)
const photoIndex = ref(0)

function openLightbox(project) {
  active.value = project
  photoIndex.value = 0
}

function closeLightbox() {
  active.value = null
}

function onKey(e) {
  if (!active.value) return
  const total = active.value.images.length
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowRight') photoIndex.value = (photoIndex.value + 1) % total
  if (e.key === 'ArrowLeft') photoIndex.value = (photoIndex.value - 1 + total) % total
}

watch(active, (val) => {
  if (typeof window === 'undefined') return
  if (val) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.activation-gallery {
  font-family: "Inter", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
