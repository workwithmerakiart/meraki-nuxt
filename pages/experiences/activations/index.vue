<template>
  <section ref="pageRef" class="bg-[#f9f3eb] text-black activations-page overflow-x-clip">
    <!-- Hero -->
    <ExperiencesBlockOne v-bind="blockOneData" />

    <!-- Masthead -->
    <div class="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 pt-14 md:pt-20">
      <span data-anim="line" class="ray-line block h-px bg-black/15" style="--ray: #DD4912"></span>
      <dl data-anim="stagger" class="grid grid-cols-3 gap-4 py-6 md:py-9">
        <div v-for="s in masthead" :key="s.label">
          <dt class="text-[10px] font-medium uppercase tracking-[0.22em] text-[#A89B8F]">{{ s.label }}</dt>
          <dd class="mt-1.5 text-[2.1rem] md:text-[3.4rem] font-extralight tracking-[-0.04em] leading-none tabular-nums">
            {{ s.value }}
          </dd>
        </div>
      </dl>
      <span class="block h-px bg-black/15"></span>
    </div>

    <!-- Sticky category jump bar -->
    <div class="sticky top-0 z-30 bg-[#f9f3eb]/85 backdrop-blur-md border-b border-black/8 relative">
      <div class="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14">
        <nav class="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar py-3.5">
          <a
            v-for="(g, gi) in activationGroups"
            :key="g.id"
            :href="`#${g.id}`"
            class="group/j shrink-0 flex items-baseline gap-2 text-[13.5px] md:text-[14.5px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-300"
            :style="{ color: activeSection === g.id ? g.accent : null }"
            :class="activeSection === g.id ? '' : 'text-[#6B5D52] hover:text-black'"
          >
            <span class="text-[10px] tabular-nums tracking-[0.16em] opacity-60">{{ pad(gi + 1) }}</span>
            {{ g.label }}
          </a>
        </nav>
      </div>
      <!-- reading progress along the bar's edge -->
      <span
        class="absolute left-0 bottom-0 h-px bg-[var(--prog-accent)] transition-[width] duration-150 ease-linear"
        :style="{ width: `${scrollPct}%`, '--prog-accent': currentAccent }"
        aria-hidden="true"
      ></span>
    </div>

    <!-- Categories -->
    <div
      v-for="(group, gi) in activationGroups"
      :id="group.id"
      :key="group.id"
      class="category max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 pt-16 md:pt-28 pb-6 md:pb-14 scroll-mt-16"
      :style="{ '--accent': group.accent }"
    >
      <!-- category masthead -->
      <header class="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-10 gap-y-5 items-end pb-9 md:pb-14">
        <div class="flex items-start gap-5">
          <span
            data-anim="left"
            class="text-[11px] tabular-nums tracking-[0.2em] pt-3 md:pt-5"
            :style="{ color: group.accent }"
          >
            {{ pad(gi + 1) }}
          </span>
          <SplitText
            tag="h2"
            mode="words"
            data-anim="rise"
            :text="group.label"
            class="text-[2.5rem] md:text-[4rem] lg:text-[4.9rem] font-light tracking-[-0.045em] leading-[0.96] max-w-[15ch]"
            :style="{ color: group.accent }"
          />
        </div>

        <div class="lg:text-right lg:pb-3">
          <p data-anim="bottom" data-delay="0.15" class="text-[14px] md:text-[15px] text-[#7A6A5E] leading-relaxed max-w-[46ch] lg:ml-auto">
            {{ group.intro }}
          </p>
          <p class="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] tabular-nums" :style="{ color: group.accent }">
            {{ pad(group.activations.length) }} {{ group.activations.length === 1 ? 'Activation' : 'Activations' }}
          </p>
        </div>
      </header>

      <!-- gallery grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-20">
        <NuxtLink
          v-for="(a, ai) in group.activations"
          :key="a.id"
          :to="`/experiences/activations/${a.id}`"
          class="tile group/t block"
          :class="tileClass(ai)"
          :style="{ '--accent': group.accent }"
        >
          <div
            :data-anim="enterFrom(ai)"
            :data-delay="(ai % 3) * 0.08"
            class="relative w-full overflow-hidden bg-black/5"
            :class="tileAspect(ai)"
          >
            <img
              v-if="coverOf(a)"
              :src="coverOf(a)"
              :alt="a.title"
              :style="a.imageFocus ? { objectPosition: a.imageFocus } : null"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 w-full h-full object-cover will-change-transform transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover/t:scale-[1.06]"
            />
            <span
              v-else
              class="absolute inset-0 grid place-items-center text-[5rem] font-extralight opacity-15"
              :style="{ color: group.accent }"
              aria-hidden="true"
            >{{ pad(ai + 1) }}</span>

            <!-- hover veil -->
            <span class="tile__veil" aria-hidden="true"></span>
          </div>

          <div class="mt-4 flex items-start gap-4">
            <span class="text-[10px] tabular-nums tracking-[0.18em] text-[#C4B8AC] pt-1.5">{{ pad(ai + 1) }}</span>
            <div class="min-w-0 flex-1">
              <h3 class="text-[1.3rem] md:text-[1.65rem] font-normal text-[#2A231E] tracking-[-0.025em] leading-snug transition-colors duration-500 group-hover/t:text-[var(--accent)]">
                {{ a.title }}
              </h3>
              <p class="mt-1.5 text-[11px] uppercase tracking-[0.16em]" :style="{ color: group.accent }">
                {{ a.projects.length ? 'View past projects' : 'View activation' }}
              </p>
            </div>
            <span
              class="shrink-0 pt-1 opacity-0 -translate-x-1 transition-all duration-500 group-hover/t:opacity-100 group-hover/t:translate-x-0"
              :style="{ color: group.accent }"
              aria-hidden="true"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0-6-6m6 6-6 6" />
              </svg>
            </span>
          </div>
        </NuxtLink>
      </div>

      <a
        v-if="group.catalogue"
        :href="group.catalogue"
        target="_blank"
        rel="noopener"
        class="mt-14 inline-flex items-center gap-2.5 text-[13px] text-[#5E5048] underline underline-offset-4 decoration-[#C4B8AC] hover:text-black transition-colors"
      >
        Download {{ group.label }} catalogue
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" />
        </svg>
      </a>

      <span v-if="gi < activationGroups.length - 1" class="mt-16 md:mt-24 block h-px bg-black/12"></span>
    </div>

    <!-- Clients -->
    <div v-if="clientMarks.length" class="max-w-[1480px] mx-auto px-5 md:px-10 lg:px-14 pt-10 pb-16 md:pb-20">
      <span class="block h-px bg-black/15"></span>
      <p class="pt-6 text-[10px] font-medium uppercase tracking-[0.22em] text-[#A89B8F]">Selected clients</p>
      <div data-anim="stagger" class="mt-6 flex flex-wrap items-center gap-x-10 gap-y-7">
        <img
          v-for="c in clientMarks"
          :key="c.logo"
          :src="c.logo"
          :alt="c.client"
          loading="lazy"
          decoding="async"
          class="h-6 md:h-7 w-auto max-w-[110px] object-contain opacity-35 grayscale transition-all duration-500 hover:opacity-80 hover:grayscale-0"
        />
      </div>
    </div>

    <!-- CTA -->
    <div class="max-w-3xl mx-auto px-5 md:px-6 pb-24 md:pb-32 text-center">
      <SplitText
        tag="h2"
        mode="words"
        data-anim="rise"
        text="Planning an event?"
        class="text-2xl md:text-[2.4rem] font-extralight tracking-[-0.035em]"
      />
      <p data-anim="bottom" data-delay="0.2" class="mt-4 text-[15px] text-[#7A6A5E] leading-relaxed">
        From brand launches and corporate events to weddings and private celebrations, we’ll tailor the right mix of
        activations to your occasion. Tell us about your brand, guest count and venue, and we’ll take care of the setup
        and guest experience, with custom branding and packaging options available.
      </p>
      <div data-anim="bottom" data-delay="0.35">
        <a
          :href="whatsappLink('Hi Meraki, I’d like to enquire about activations for an event.')"
          target="_blank"
          rel="noopener"
          class="mt-8 inline-flex items-center gap-3 border border-black px-8 py-3 text-[15px] tracking-tight hover:bg-black hover:text-white transition-colors duration-500"
        >
          <WhatsAppIcon class="w-[18px] h-[18px]" />
          Text us on WhatsApp
        </a>
      </div>
    </div>

    <!-- vertical category marker that follows you down the page (desktop) -->
    <Transition name="marker">
      <aside
        v-show="markerVisible"
        class="marker hidden xl:flex fixed left-5 top-1/2 -translate-y-1/2 z-20 items-center gap-3 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span class="text-[10px] tabular-nums tracking-[0.2em]" :style="{ color: currentAccent }">
          {{ pad(currentIndex + 1) }}
        </span>
        <span class="h-10 w-px" :style="{ backgroundColor: currentAccent }"></span>
        <Transition name="marker-text" mode="out-in">
          <span
            :key="activeSection"
            class="marker__text text-[11px] uppercase tracking-[0.24em] text-[#8A7B6E] whitespace-nowrap"
          >
            {{ currentLabel }}
          </span>
        </Transition>
      </aside>
    </Transition>

    <CursorTrail />

    <ScrollToTop :accent="currentAccent" />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { activationGroups } from '~/data/activations'
import SplitText from '~/components/motion/SplitText.vue'
import WhatsAppIcon from '~/components/activations/WhatsAppIcon.vue'
import { whatsappLink } from '~/composables/useWhatsApp'
import ScrollToTop from '~/components/activations/ScrollToTop.vue'
import CursorTrail from '~/components/activations/CursorTrail.vue'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { usePageSeo } from '~/composables/usePageSeo'

const pageRef = ref(null)
useScrollReveal(pageRef)

usePageSeo({
  title: "Activations: Corporate & Brand Events | Meraki Art Studio",
  description:
    "Live personalisation, fragrance, jewellery, beauty and art stations for brand launches, corporate events and celebrations in Dubai, fully managed by us.",
  image: "/images/activations/images/AGMC%E2%80%94%20Arabic%20Calligraphy%20on%20A%20car.webp",
})

const blockOneData = {
  image: '/images/activations/images/AGMC%E2%80%94%20Arabic%20Calligraphy%20on%20A%20car.webp',
  title: 'Activations',
  tagline: 'Hands-on experiences for brands, corporate events and private celebrations.',
  description:
    'From live personalisation to creative stations, every activation is tailored to your event and fully managed by our team, at your venue or ours.',
}

const pad = (n) => String(n).padStart(2, '0')

const masthead = computed(() => [
  { label: 'Categories', value: activationGroups.length },
  { label: 'Activations', value: activationGroups.reduce((n, g) => n + g.activations.length, 0) },
  {
    label: 'Past projects',
    value: activationGroups.reduce((n, g) => n + g.activations.reduce((m, a) => m + a.projects.length, 0), 0),
  },
])

// cover falls back to the newest project photo
const coverOf = (a) => a.image || a.projects?.[0]?.images?.[0] || ''

/* ---- gallery rhythm: varied spans + aspects so the grid reads as a gallery ---- */
const SPANS = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6']
const ASPECTS = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-[1/1]', 'aspect-[16/10]', 'aspect-[5/4]', 'aspect-[4/5]']
const OFFSETS = ['', 'lg:mt-16', '', 'lg:mt-10', '', 'lg:mt-20']

const tileClass = (i) => `${SPANS[i % SPANS.length]} ${OFFSETS[i % OFFSETS.length]}`
const tileAspect = (i) => ASPECTS[i % ASPECTS.length]
// images arrive from alternating sides
const enterFrom = (i) => ['left', 'bottom', 'right', 'bottom', 'right', 'left'][i % 6]

const clientMarks = computed(() => {
  const seen = new Map()
  for (const g of activationGroups)
    for (const a of g.activations)
      for (const p of a.projects || []) if (p.logo && !seen.has(p.logo)) seen.set(p.logo, { client: p.client, logo: p.logo })
  return [...seen.values()]
})

/* ---- highlight the category currently in view ---- */
const activeSection = ref(activationGroups[0].id)
const currentIndex = computed(() => Math.max(0, activationGroups.findIndex((g) => g.id === activeSection.value)))
const currentAccent = computed(() => activationGroups[currentIndex.value]?.accent || activationGroups[0].accent)
const currentLabel = computed(() => activationGroups[currentIndex.value]?.label || '')
const markerVisible = ref(false)

/* ---- reading progress for the sticky bar ---- */
const scrollPct = ref(0)
let rafPending = false
function readProgress() {
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  scrollPct.value = max > 0 ? Math.min(100, Math.max(0, ((window.scrollY || 0) / max) * 100)) : 0
  // show the marker once the hero is behind you, hide it near the footer
  const y = window.scrollY || 0
  markerVisible.value = y > window.innerHeight * 0.9 && scrollPct.value < 92
  rafPending = false
}
function onScrollProgress() {
  if (rafPending) return
  rafPending = true
  requestAnimationFrame(readProgress)
}
let observer = null
onMounted(() => {
  if (!process.client || !('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) activeSection.value = e.target.id
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
  )
  document.querySelectorAll('.category').forEach((el) => observer.observe(el))

  readProgress()
  window.addEventListener('scroll', onScrollProgress, { passive: true })
  window.addEventListener('resize', onScrollProgress, { passive: true })
})
onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScrollProgress)
  window.removeEventListener('resize', onScrollProgress)
})
</script>

<style scoped>
/* vertical category marker */
.marker__text {
  writing-mode: vertical-rl;
}
.marker-enter-active,
.marker-leave-active {
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.marker-enter-from,
.marker-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(-10px);
}
.marker-text-enter-active,
.marker-text-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.marker-text-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.marker-text-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* accent veil that wipes up off the image on hover */
.tile__veil {
  position: absolute;
  inset: 0;
  background: var(--accent);
  opacity: 0.16;
  transform: translateY(0);
  transition: opacity 0.7s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.tile:hover .tile__veil {
  opacity: 0;
  transform: translateY(-100%);
}

@media (prefers-reduced-motion: reduce) {
  .tile__veil,
  .tile img {
    transition: none !important;
  }
}
</style>
