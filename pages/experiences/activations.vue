<template>
  <section ref="pageRef" class="bg-[#f9f3eb] text-black activations-page overflow-x-clip">
    <!-- Block 1: Hero -->
    <ExperiencesBlockOne v-bind="blockOneData" />

    <!-- Block 2: Groups → activations -->
    <div id="activations" class="max-w-[1320px] mx-auto px-4 md:px-10 lg:px-12 py-16 md:py-20 scroll-mt-24">
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(240px,25%)_1fr] gap-12 lg:gap-0">
        <!-- Left rail -->
        <div class="lg:pr-10 lg:border-r border-black/15 flex flex-col">
          <SplitText
            tag="h2"
            mode="words"
            data-anim="rise"
            text="Our activations"
            class="text-4xl xl:text-[2.6rem] font-medium tracking-[-0.03em] leading-[1.05]"
          />

          <ul data-anim="stagger" data-delay="0.2" class="mt-8 space-y-3">
            <li v-for="group in activationGroups" :key="group.id">
              <button
                type="button"
                class="text-left text-lg font-medium tracking-tight transition-colors"
                :class="group.id === activeGroupId ? '' : 'text-[#A89B8F] hover:text-[#5E5048]'"
                :style="group.id === activeGroupId ? { color: group.accent } : null"
                :aria-pressed="group.id === activeGroupId"
                @click="activeGroupId = group.id"
              >
                {{ group.label }}
              </button>
              <Transition name="expand">
                <div v-if="group.id === activeGroupId" class="overflow-hidden">
                  <p v-if="group.intro" class="pt-2 text-[15px] text-[#7A6A5E] leading-relaxed">{{ group.intro }}</p>
                  <p class="pt-3 text-[11px] font-medium uppercase tracking-[0.2em]" :style="{ color: group.accent }">
                    {{ group.activations.length }} {{ group.activations.length === 1 ? 'station' : 'stations' }}
                  </p>
                </div>
              </Transition>
            </li>
          </ul>

        </div>

        <!-- Slider -->
        <div class="lg:pl-10 min-w-0">
          <Transition name="swap" mode="out-in">
            <AutoCarousel :key="activeGroup.id" :items="activeGroup.activations">
              <template #default="{ item: activation, index: ai }">
                <article>
                  <button
                    type="button"
                    data-anim="flip"
                    :data-delay="ai * 0.15"
                    :data-fill="activeGroup.accent"
                    class="group relative block w-full aspect-[3/2] overflow-hidden"
                    :style="{ backgroundColor: `${activeGroup.accent}14` }"
                    :aria-label="`View past work for ${activation.title}`"
                    @click="showDetails(activeGroup, activation)"
                  >
                    <span
                      v-if="coverOf(activation)"
                      class="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    >
                      <img
                        :src="coverOf(activation)"
                        :alt="activation.title"
                        loading="lazy"
                        decoding="async"
                        class="absolute inset-0 w-full h-full object-cover"
                      />
                    </span>
                    <span
                      v-else
                      class="absolute inset-0 flex items-end justify-end p-8 text-[7rem] md:text-[9rem] leading-none font-medium tracking-tighter opacity-20"
                      :style="{ color: activeGroup.accent }"
                      aria-hidden="true"
                    >
                      {{ pad(ai + 1) }}
                    </span>
                  </button>

                  <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
                    <div>
                      <p class="text-[11px] font-medium tracking-[0.2em] text-[#A89B8F]">
                        {{ pad(ai + 1) }}
                      </p>
                      <h3 class="mt-1 text-xl md:text-[1.4rem] font-medium tracking-tight leading-tight" :style="{ color: activeGroup.accent }">{{ activation.title }}</h3>
                      <button
                        type="button"
                        class="group/link mt-3 text-[#5E5048] hover:text-black inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em]"
                        @click="showDetails(activeGroup, activation)"
                      >
                        {{ activation.projects?.length ? 'View past work' : 'View details' }}
                        <span class="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                      </button>
                    </div>
                    <p class="text-[15px] text-[#7A6A5E] leading-relaxed">{{ activation.description }}</p>
                  </div>
                </article>
              </template>
              <template #footer>
                <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <a
                    v-if="activeGroup.catalogue"
                    :href="activeGroup.catalogue"
                    target="_blank"
                    rel="noopener"
                    download
                    class="inline-flex items-center gap-3 px-5 py-2.5 text-[15px] transition-[filter] hover:brightness-95"
                    :style="{ backgroundColor: `${activeGroup.accent}1F`, color: activeGroup.accent }"
                  >
                    Download catalogue
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0 5-5m-5 5-5-5M5 20h14" />
                    </svg>
                  </a>
                  <NuxtLink to="/about/contact" class="text-[15px] text-[#5E5048] underline underline-offset-4 decoration-[#A89B8F] hover:text-black transition-colors">
                    Enquire now
                  </NuxtLink>
                </div>
              </template>
            </AutoCarousel>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Block 3: Selected activation → past work -->
    <div class="max-w-[1320px] mx-auto px-4 md:px-10 lg:px-12">
      <span data-anim="line" class="ray-line block h-px bg-black/15" :style="{ '--ray': selectedGroup.accent }"></span>
    </div>

    <div id="activation-details" class="max-w-[1320px] mx-auto px-4 md:px-10 lg:px-12 py-16 md:py-20 scroll-mt-24">
      <Transition name="swap" mode="out-in">
        <div :key="selectedActivation.id" class="grid grid-cols-1 lg:grid-cols-[minmax(240px,25%)_1fr] gap-12 lg:gap-0">
          <!-- Left rail -->
          <div class="lg:pr-10 lg:border-r border-black/15 flex flex-col">
            <p data-anim="top" class="text-[11px] font-medium uppercase tracking-[0.2em]" :style="{ color: selectedGroup.accent }">
              {{ pad(selectedIndex + 1) }} · {{ selectedGroup.label }}
            </p>
            <SplitText
              tag="h2"
              mode="words"
              data-anim="rise"
              :text="selectedActivation.title"
              class="mt-4 text-4xl xl:text-[2.6rem] font-medium tracking-[-0.03em] leading-[1.05]"
            />
            <p data-anim="bottom" data-delay="0.2" class="mt-5 text-[15px] text-[#7A6A5E] leading-relaxed">
              {{ selectedActivation.description }}
            </p>

            <div v-if="selectedActivation.includes?.length" data-anim="bottom" data-delay="0.3" class="mt-8">
              <p class="text-[11px] font-medium uppercase tracking-[0.2em]" :style="{ color: selectedGroup.accent }">Includes</p>
              <ul class="mt-3 border-t border-black/15">
                <li
                  v-for="item in selectedActivation.includes"
                  :key="item"
                  class="py-2 border-b border-black/10 text-[15px] text-[#5E5048]"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

          </div>

          <!-- Past work -->
          <div class="lg:pl-10 min-w-0">
            <ActivationGallery
              v-if="selectedActivation.projects?.length"
              :projects="selectedActivation.projects"
              :accent="selectedGroup.accent"
            >
              <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
                <NuxtLink
                  to="/about/contact"
                  class="inline-flex items-center gap-3 px-5 py-2.5 text-[15px] transition-[filter] hover:brightness-95"
                  :style="{ backgroundColor: `${selectedGroup.accent}1F`, color: selectedGroup.accent }"
                >
                  Enquire now
                  <span aria-hidden="true">→</span>
                </NuxtLink>
                <a href="#activations" class="text-[15px] text-[#5E5048] underline underline-offset-4 decoration-[#A89B8F] hover:text-black transition-colors">
                  All activations
                </a>
              </div>
            </ActivationGallery>
            <div v-else class="h-full flex flex-col">
              <div
                data-anim="reveal"
                :data-fill="selectedGroup.accent"
                class="relative w-full aspect-[3/2] overflow-hidden"
                :style="{ backgroundColor: `${selectedGroup.accent}14` }"
              >
                <img
                  v-if="selectedActivation.image"
                  :src="selectedActivation.image"
                  :alt="selectedActivation.title"
                  loading="lazy"
                  decoding="async"
                  class="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <p class="mt-6 text-[15px] text-[#7A6A5E]">Past work for this station is coming soon.</p>
              <div class="mt-auto pt-10">
                <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
              <NuxtLink
                to="/about/contact"
                class="inline-flex items-center gap-3 px-5 py-2.5 text-[15px] transition-[filter] hover:brightness-95"
                :style="{ backgroundColor: `${selectedGroup.accent}1F`, color: selectedGroup.accent }"
              >
                Enquire now
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <a href="#activations" class="text-[15px] text-[#5E5048] underline underline-offset-4 decoration-[#A89B8F] hover:text-black transition-colors">
                All activations
              </a>
            </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- CTA -->
    <div class="max-w-3xl mx-auto px-4 md:px-6 pb-20 md:pb-28 text-center">
      <SplitText
        tag="h2"
        mode="words"
        data-anim="rise"
        text="Planning a corporate event?"
        class="text-2xl md:text-3xl font-medium tracking-tight"
      />
      <p data-anim="bottom" data-delay="0.2" class="mt-3 text-[15px] text-[#7A6A5E]">
        Tell us about your brand, guest count and venue, and we'll put together the right mix of stations for you.
      </p>
      <div data-anim="bottom" data-delay="0.35">
        <NuxtLink
          to="/about/contact"
          class="mt-8 inline-block bg-[#DD4912] text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-[#c44110] hover:scale-105 transition-all"
        >
          👉 Enquire Now
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { activationGroups } from '~/data/activations'
import AutoCarousel from '~/components/activations/AutoCarousel.vue'
import ActivationGallery from '~/components/activations/ActivationGallery.vue'
import SplitText from '~/components/motion/SplitText.vue'
import { useScrollReveal } from '~/composables/useScrollReveal'

const pageRef = ref(null)
useScrollReveal(pageRef)

useHead({
  title: 'Corporate Activations | Meraki Art Studio',
  meta: [
    {
      name: 'description',
      content:
        'Station-style corporate activations in Dubai by Meraki Art Studio: live debossing, engraving, calligraphy, charm bars and more, with examples from past brand events.',
    },
  ],
})

const blockOneData = {
  image: '/images/events/corporate.webp',
  title: 'Activations',
  tagline: 'Hands-on stations for brands and corporate events.',
  description:
    'Personalised, interactive and fully managed by our team, at your venue or ours.',
}

const pad = (n) => String(n).padStart(2, '0')

// Slider card image: the activation's cover, else its latest project photo
const coverOf = (activation) => activation.image || activation.projects?.[0]?.images?.[0] || ''

// Group shown in the top slider
const activeGroupId = ref(activationGroups[0].id)
const activeGroup = computed(() => activationGroups.find((g) => g.id === activeGroupId.value))

// Activation shown in the details panel
const selected = ref({ groupId: activationGroups[0].id, activationId: activationGroups[0].activations[0].id })
const selectedGroup = computed(() => activationGroups.find((g) => g.id === selected.value.groupId))
const selectedIndex = computed(() =>
  selectedGroup.value.activations.findIndex((a) => a.id === selected.value.activationId),
)
const selectedActivation = computed(() => selectedGroup.value.activations[selectedIndex.value])

function showDetails(group, activation, scroll = true) {
  selected.value = { groupId: group.id, activationId: activation.id }
  if (scroll) document.getElementById('activation-details')?.scrollIntoView({ behavior: 'smooth' })
}

// Deep links: /experiences/activations#live-debossing opens that activation
onMounted(() => {
  const id = window.location.hash.slice(1)
  if (!id) return
  for (const group of activationGroups) {
    const activation = group.activations.find((a) => a.id === id)
    if (activation) {
      activeGroupId.value = group.id
      showDetails(group, activation)
      return
    }
  }
})
</script>

<style scoped>
.activations-page {
  font-family: "Inter", sans-serif;
}

/* Slider / details swap when switching group or activation */
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.swap-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.swap-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}

/* Group description opening under the active group */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.4s ease, opacity 0.3s ease;
  max-height: 16rem;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
