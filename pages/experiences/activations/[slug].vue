<template>
  <section
    v-if="activation"
    ref="pageRef"
    class="bg-[#f9f3eb] text-black activation-detail overflow-x-clip"
    :style="{ '--accent': group.accent }"
  >
    <!-- Full-bleed hero -->
    <header class="relative min-h-[72svh] md:min-h-[86svh] flex items-end overflow-hidden">
      <div v-if="cover" class="absolute inset-0">
        <img
          :src="cover"
          :alt="activation.title"
          class="hero-img absolute inset-0 w-full h-full object-cover"
          fetchpriority="high"
        />
        <span class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></span>
      </div>
      <div v-else class="absolute inset-0" :style="{ backgroundColor: `${group.accent}22` }"></div>

      <div class="relative w-full max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 pb-12 md:pb-16">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
          <NuxtLink
            to="/experiences/activations"
            class="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span> All activations
          </NuxtLink>
          <NuxtLink
            v-if="prevActivation"
            :to="`/experiences/activations/${prevActivation.id}`"
            class="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45 hover:text-white transition-colors"
          >
            <span aria-hidden="true">←</span> {{ prevActivation.title }}
          </NuxtLink>
        </div>

        <p class="mt-7 text-[10.5px] font-medium uppercase tracking-[0.24em]" :style="{ color: group.accent }">
          {{ pad(indexInGroup + 1) }} · {{ group.label }}
        </p>

        <SplitText
          tag="h1"
          mode="words"
          data-anim="rise"
          :text="activation.title"
          class="mt-3 text-[2.6rem] md:text-[5rem] lg:text-[6rem] font-extralight tracking-[-0.05em] leading-[0.94] text-white max-w-[15ch]"
        />
      </div>
    </header>

    <!-- Intro -->
    <div class="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 py-14 md:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_minmax(260px,340px)] gap-10 lg:gap-20">
        <p data-anim="bottom" class="text-[1.05rem] md:text-[1.45rem] font-light leading-[1.5] tracking-[-0.015em] text-[#3F362F] max-w-[52ch]">
          {{ activation.description }}
        </p>

        <div data-anim="bottom" data-delay="0.15">
          <div v-if="activation.includes?.length">
            <p class="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A89B8F]">Includes</p>
            <ul class="mt-4 border-t border-black/12">
              <li
                v-for="item in activation.includes"
                :key="item"
                class="py-2.5 border-b border-black/10 text-[14.5px] text-[#5E5048]"
              >
                {{ item }}
              </li>
            </ul>
          </div>

          <a
            v-if="group.catalogue"
            :href="group.catalogue"
            target="_blank"
            rel="noopener"
            class="mt-7 inline-flex items-center gap-2.5 text-[13px] text-[#5E5048] underline underline-offset-4 decoration-[#C4B8AC] hover:text-black transition-colors"
          >
            Download catalogue
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Past work -->
    <div v-if="projects.length" class="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14">
      <div class="flex items-end justify-between gap-6 border-t border-black/15 pt-6">
        <h2 class="text-[11px] font-medium uppercase tracking-[0.24em]" :style="{ color: group.accent }">Past Work</h2>
        <p class="text-[11px] tabular-nums tracking-[0.16em] text-[#A89B8F]">{{ pad(projects.length) }}</p>
      </div>

      <article
        v-for="(p, i) in projects"
        :key="`${p.client}-${i}`"
        class="project grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-14 md:py-24 border-b border-black/10"
      >
        <!-- image, alternating side -->
        <div
          class="lg:col-span-7"
          :class="i % 2 === 1 ? 'lg:order-2' : ''"
        >
          <div
            :data-anim="i % 2 === 1 ? 'right' : 'left'"
            class="group/p relative w-full overflow-hidden bg-black/5"
            :class="i % 3 === 1 ? 'aspect-[4/5] lg:aspect-[3/2]' : 'aspect-[4/3] lg:aspect-[16/10]'"
          >
            <img
              v-if="p.images?.length"
              :src="p.images[0]"
              :alt="`${p.client} — ${p.subject || activation.title}`"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover/p:scale-[1.05]"
            />
          </div>
        </div>

        <!-- copy -->
        <div class="lg:col-span-5" :class="i % 2 === 1 ? 'lg:order-1' : ''">
          <div :data-anim="i % 2 === 1 ? 'left' : 'right'" data-delay="0.1">
            <div class="flex items-center gap-4">
              <span class="text-[10px] tabular-nums tracking-[0.2em] text-[#C4B8AC]">{{ pad(i + 1) }}</span>
              <span class="h-px flex-1 bg-black/12"></span>
              <img
                v-if="p.logo"
                :src="p.logo"
                :alt="p.client"
                loading="lazy"
                class="h-5 w-auto max-w-[88px] object-contain opacity-40 grayscale"
              />
            </div>

            <h3 class="mt-5 text-[1.9rem] md:text-[2.6rem] font-extralight tracking-[-0.04em] leading-[1.02]">
              {{ p.client }}
            </h3>
            <p v-if="p.subject" class="mt-1.5 text-[14px] text-[#A89B8F]">{{ p.subject }}</p>

            <p class="mt-5 text-[14.5px] md:text-[15px] text-[#5E5048] leading-relaxed max-w-[46ch]">
              {{ p.caption }}
            </p>

            <div v-if="p.stat || p.location" class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span
                v-if="p.stat"
                class="text-[1.15rem] font-light tabular-nums tracking-tight"
                :style="{ color: group.accent }"
              >{{ p.stat }}</span>
              <span v-if="p.location" class="text-[11px] uppercase tracking-[0.18em] text-[#A89B8F]">
                {{ p.location }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- no past work yet -->
    <div v-else class="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14">
      <div class="border-t border-black/15 pt-10 pb-4">
        <p class="text-[15px] text-[#7A6A5E] max-w-[46ch]">
          This station is available to book for brand activations, corporate events and private celebrations.
        </p>
        <NuxtLink
          to="/about/contact"
          class="mt-5 inline-flex items-center gap-2.5 text-[14px] transition-colors"
          :style="{ color: group.accent }"
        >
          Talk to us about {{ activation.title }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>

    <!-- CTA + next -->
    <div class="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-end">
        <div>
          <SplitText
            tag="h2"
            mode="words"
            data-anim="rise"
            text="Bring this to your event"
            class="text-[1.9rem] md:text-[2.8rem] font-extralight tracking-[-0.04em] leading-[1.02] max-w-[14ch]"
          />
          <NuxtLink
            to="/about/contact"
            class="mt-7 inline-flex items-center gap-3 border border-black px-7 py-3 text-[14.5px] hover:bg-black hover:text-white transition-colors duration-500"
          >
            Enquire about {{ activation.title }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <NuxtLink
          v-if="nextActivation"
          :to="`/experiences/activations/${nextActivation.id}`"
          class="group/n md:text-right"
        >
          <p class="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A89B8F]">
            Next activation
            <span class="hidden md:inline ml-2 opacity-60">— or press →</span>
          </p>
          <p class="mt-3 text-[1.6rem] md:text-[2.2rem] font-extralight tracking-[-0.035em] leading-tight transition-colors duration-500 group-hover/n:text-[var(--accent)]">
            {{ nextActivation.title }}
            <span class="inline-block transition-transform duration-500 group-hover/n:translate-x-2">→</span>
          </p>
        </NuxtLink>
      </div>
    </div>

    <CursorTrail />

    <ScrollToTop :accent="group.accent" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter, createError } from '#imports'
import { activationGroups } from '~/data/activations'
import SplitText from '~/components/motion/SplitText.vue'
import ScrollToTop from '~/components/activations/ScrollToTop.vue'
import CursorTrail from '~/components/activations/CursorTrail.vue'
import { useScrollReveal } from '~/composables/useScrollReveal'

const route = useRoute()
const pageRef = ref(null)
useScrollReveal(pageRef)

const pad = (n) => String(n).padStart(2, '0')

// flatten once so we can resolve the slug and find the next item
const flat = activationGroups.flatMap((g) =>
  g.activations.map((a, i) => ({ group: g, activation: a, indexInGroup: i })),
)

const current = computed(() => flat.find((x) => x.activation.id === route.params.slug) || null)

if (!current.value) {
  throw createError({ statusCode: 404, statusMessage: 'Activation not found' })
}

const activation = computed(() => current.value?.activation)
const group = computed(() => current.value?.group)
const indexInGroup = computed(() => current.value?.indexInGroup ?? 0)
const projects = computed(() => activation.value?.projects || [])
const cover = computed(() => activation.value?.image || projects.value?.[0]?.images?.[0] || '')

const flatIndex = computed(() => flat.findIndex((x) => x.activation.id === route.params.slug))
const nextActivation = computed(() => {
  const i = flatIndex.value
  return i === -1 ? null : flat[(i + 1) % flat.length].activation
})
const prevActivation = computed(() => {
  const i = flatIndex.value
  return i === -1 ? null : flat[(i - 1 + flat.length) % flat.length].activation
})

/* ---- keyboard: left/right move between activations ---- */
const router = useRouter()
function onKey(e) {
  if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
  const el = document.activeElement
  if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return
  if (e.key === 'ArrowRight' && nextActivation.value) {
    router.push(`/experiences/activations/${nextActivation.value.id}`)
  } else if (e.key === 'ArrowLeft' && prevActivation.value) {
    router.push(`/experiences/activations/${prevActivation.value.id}`)
  }
}
onMounted(() => process.client && window.addEventListener('keydown', onKey))
onBeforeUnmount(() => process.client && window.removeEventListener('keydown', onKey))

useHead(() => ({
  title: `${activation.value?.title || 'Activation'} | Meraki Art Studio`,
  meta: [{ name: 'description', content: activation.value?.description || '' }],
}))
</script>

<style scoped>
/* slow drift on the hero image */
.hero-img {
  animation: heroDrift 18s ease-out forwards;
  transform-origin: center;
}
@keyframes heroDrift {
  from {
    transform: scale(1.12);
  }
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-img {
    animation: none;
  }
  .project img {
    transition: none !important;
  }
}
</style>
