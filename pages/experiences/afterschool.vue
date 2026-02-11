<template>
    <!-- ⭐ removed inline paddingTop/marginTop so hero can merge with transparent header -->
    <!-- ⭐ added top padding directly in hero height for spacing -->
    <div class="bg-[#F9F3EB] text-gray-900 experiences--afterschool">
        <!-- HERO (ExperiencesBlockOne like courses.vue) -->
        <ExperiencesBlockOne v-bind="blockOneData" />

        <!-- SECTION: Art Classes -->
        <section id="classes" class="px-6 md:px-10 lg:px-16 py-16">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-stretch">
                <!-- Graphic tile grid -->
                <div ref="gfxClasses" class="order-2 lg:order-1 h-full">
                    <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm h-full flex">
                        <div class="grid grid-cols-6 gap-2 flex-1 content-start">
                            <div
                                v-for="(tile, idx) in classesTiles"
                                :key="`classes-${idx}`"
                                class="aspect-square rounded-xl relative overflow-hidden"
                                :class="[tile.bg, tile.hasLetter ? 'tile--has-letter' : '']"
                            >
                                <span
                                    v-if="tile.char"
                                    class="tile-letter"
                                    :style="{ animationDelay: tile.delay + 'ms' }"
                                    :class="{ 'tile-letter--run': runClassesTileReveal }"
                                >
                                    {{ tile.char }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-1 lg:order-2">
                    <h2 ref="classesTitle" class="text-3xl md:text-4xl font-bold tracking-tight mb-2">🖌️ Art Classes at
                        Meraki</h2>
                    <p ref="classesSub" class="text-lg text-gray-700 mb-5">Build Real Art Skills Through Fun &amp;
                        Exploration</p>
                    <p ref="classesIntro" class="text-gray-600 mb-6">
                        Our structured art classes focus on teaching the Principles of Art through interactive drawing
                        and painting
                        projects. Children explore foundational concepts such as:
                    </p>

                    <!-- principles -->
                    <div ref="principlesWrap" class="grid sm:grid-cols-2 gap-3 mb-6">
                        <div v-for="item in classes.principles" :key="item.text"
                            class="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                            <span class="text-xl">{{ item.icon }}</span>
                            <span class="text-gray-800">{{ item.text }}</span>
                        </div>
                    </div>

                    <!-- benefits card -->
                    <div ref="classesCard" class="rounded-3xl border border-gray-200 bg-white p-6 mb-7 shadow-sm">
                        <ul class="space-y-2 text-gray-700">
                            <li v-for="b in classes.benefits" :key="b">• {{ b }}</li>
                        </ul>
                    </div>

                    <button ref="classesCta" type="button"
                        class="relative overflow-hidden inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold border border-black bg-white text-black transition group"
                        @click="openForm('Art Classes at Meraki')">
                        <span
                            class="absolute inset-0 bg-black transition-transform duration-[700ms] ease-out -translate-x-full group-hover:translate-x-0"
                            aria-hidden="true"></span>
                        <span
                            class="relative z-10 inline-flex items-center gap-2 transition-colors group-hover:text-white">
                            Enroll Now
                            <span aria-hidden="true">→</span>
                        </span>
                    </button>
                </div>
            </div>
        </section>

        <!-- SECTION: Holiday Camps -->
        <section id="camps" class="px-6 md:px-10 lg:px-16 py-16 bg-[#F9F3EB] border-t border-black/5">
            <div class="max-w-7xl mx-auto space-y-8">
                <div class="grid lg:grid-cols-2 gap-10 items-stretch">
                    <!-- Left: all descriptive copy -->
                    <div class="flex flex-col h-full">
                        <h2 ref="campsTitle" class="text-3xl md:text-4xl font-bold tracking-tight mb-2">🌟 Holiday Art
                            Camps</h2>
                        <p ref="campsSub" class="text-lg text-gray-900 mb-5">When School’s Out, Art Comes Alive</p>
                        <p ref="campsBody" class="text-gray-600 mb-6">
                            Our Holiday Camps offer a colorful escape where kids can explore, imagine, and create
                            freely.
                            From
                            paint-splashed canvases to sculpted crafts and group masterpieces, each day is an adventure
                            through
                            artistic expression.
                        </p>

                        <!-- Swipeable: show ONE section at a time (Details / Themes / Prices) -->
                        <div ref="campsList" class="text-gray-700 mb-6 flex flex-col flex-1">
                          <!-- Top controls: title + arrows -->
                          <div class="flex items-center justify-between mb-3">
                            <div class="text-xs font-semibold tracking-widest text-gray-800 uppercase">
                              {{ campSlides[activeCampSlide]?.title }}
                            </div>

                            <div class="flex items-center gap-2">
                              <button
                                type="button"
                                class="hc-nav-btn"
                                aria-label="Previous section"
                                @click="goToCampSlide(activeCampSlide - 1)"
                              >
                                ←
                              </button>
                              <button
                                type="button"
                                class="hc-nav-btn"
                                aria-label="Next section"
                                @click="goToCampSlide(activeCampSlide + 1)"
                              >
                                →
                              </button>
                            </div>
                          </div>

                          <!-- Track (native scroll-snap = performance safe) -->
                          <div ref="campSlidesTrack" class="hc-track flex-1"
                            @scroll.passive="onCampTrackScroll"
                            role="region"
                            aria-label="Holiday camp information"
                          >
                            <!-- Slide: Camp details -->
                            <section class="hc-slide" aria-label="Camp details">
                              <div class="hc-card">
                                <ul class="space-y-2">
                                  <li
                                    v-for="d in camps.details"
                                    :key="`detail-${d.key}`"
                                    class="flex items-start justify-between gap-4"
                                  >
                                    <span class="flex-1 min-w-0 text-gray-800">
                                      <span class="mr-2">•</span>
                                      <span class="break-words">{{ d.label }}</span>
                                    </span>
                                    <span
                                      v-if="d.value"
                                      class="shrink-0 text-gray-900 tabular-nums whitespace-nowrap"
                                    >
                                      {{ d.value }}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </section>

                            <!-- Slide: Themes -->
                            <section class="hc-slide" aria-label="Themes">
                              <div class="hc-card">
                                <ul class="space-y-2">
                                  <li
                                    v-for="t in camps.themes"
                                    :key="`theme-${t.key}`"
                                    class="flex items-start justify-between gap-4"
                                  >
                                    <span class="flex-1 min-w-0 text-gray-800">
                                      <span class="mr-2">•</span>
                                      <span class="break-words">{{ t.label }}</span>
                                    </span>
                                    <span
                                      v-if="t.value"
                                      class="shrink-0 text-gray-900 tabular-nums whitespace-nowrap"
                                    >
                                      {{ t.value }}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </section>

                            <!-- Slide: Prices -->
                            <section class="hc-slide" aria-label="Prices">
                              <div class="hc-card">
                                <ul class="space-y-2">
                                  <li
                                    v-for="p in camps.prices"
                                    :key="`price-${p.key}`"
                                    class="flex items-start justify-between gap-4"
                                  >
                                    <span class="flex-1 min-w-0 text-gray-800">
                                      <span class="mr-2">•</span>
                                      <span class="break-words">{{ p.label }}</span>
                                    </span>
                                    <span class="shrink-0 text-gray-900 tabular-nums whitespace-nowrap">
                                      {{ p.price }}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </section>
                          </div>

                          <!-- Dots -->
                          <div class="mt-3 flex items-center justify-center gap-2" aria-label="Carousel pagination">
                            <button
                              v-for="(s, i) in campSlides"
                              :key="`camp-dot-${s.key}`"
                              type="button"
                              class="hc-dot"
                              :class="activeCampSlide === i ? 'hc-dot--active' : ''"
                              :aria-label="`Go to ${s.title}`"
                              @click="goToCampSlide(i)"
                            />
                          </div>

                          <!-- Mobile hint (subtle) -->
                          <p class="hc-hint">Swipe to view more</p>
                        </div>

                        <div
                          ref="campsNote"
                          class="mt-auto rounded-2xl border border-dashed border-gray-300 bg-white/60 p-5 text-sm text-gray-700"
                        >
                          🎉 Spaces are limited—secure your child's spot for a joyful, creative holiday break.
                        </div>
                    </div>

                    <!-- Right: static Holiday Art Camps cover image -->
                    <div class="order-2 rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm h-full">
                        <div class="relative h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[520px] overflow-hidden">
                            <img src="/images/afterschool/camps/holiday-art-camps.jpg"
                                alt="Holiday Art Camps at Meraki Art Studio" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <div class="mt-6">
                    <button ref="campsCta" type="button"
                        class="relative overflow-hidden inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold border border-black bg-white text-black transition group"
                        @click="openForm('Holiday Art Camps')">
                        <span
                            class="absolute inset-0 bg-black transition-transform duration-[700ms] ease-out -translate-x-full group-hover:translate-x-0"
                            aria-hidden="true"></span>
                        <span
                            class="relative z-10 inline-flex items-center gap-2 transition-colors group-hover:text-white">
                            View Camp Schedule &amp; Register
                            <span aria-hidden="true">→</span>
                        </span>
                    </button>
                </div>
            </div>
        </section>

        <!-- REGISTRATION MODAL -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="formOpen"
                    class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-8 overflow-y-auto"
                    role="dialog" aria-modal="true">
                    <div
                        class="w-full max-w-2xl md:max-w-[700px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 flex flex-col max-h-[85vh]">
                        <div class="flex items-center justify-between px-6 py-4 border-b">
                            <div>
                                <h3 class="text-xl font-bold">📝 Registration Form</h3>
                                <p class="text-sm text-gray-600">Enroll Your Child in a Meraki Art Experience</p>
                            </div>
                            <button class="text-2xl leading-none px-2 hover:opacity-70"
                                @click="formOpen = false">&times;</button>
                        </div>

                        <form class="p-5 md:p-6 space-y-6 overflow-y-auto" @submit.prevent="submit">
                            <input type="hidden" v-model="form.program" />

                            <!-- Package selector (Holiday Camps + Art Classes) -->
                            <div v-if="requiresPackage" class="border-b border-gray-200 pb-6">
                                <h4 class="text-lg font-semibold mb-3">{{ packageTitle }}</h4>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Select Package <span class="text-red-600">*</span>
                                </label>
                                <select v-model="form.packageKey" required
                                    class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60">
                                    <option disabled value="">Select a package</option>
                                    <option v-for="pkg in activePackages" :key="pkg.key" :value="pkg.key">
                                        {{ pkg.label }}
                                    </option>
                                </select>
                                <p v-if="packageError" class="mt-2 text-sm text-red-600">{{ packageError }}</p>
                            </div>

                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Full Name <span
                                            class="text-red-600">*</span></label>
                                    <input v-model="form.childName" required type="text"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Age <span
                                            class="text-red-600">*</span></label>
                                    <input v-model="form.childAge" required type="number" min="1"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name
                                        <span class="text-red-600">*</span></label>
                                    <input v-model="form.parentName" required type="text"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Parent Email <span
                                            class="text-red-600">*</span></label>
                                    <input v-model="form.parentEmail" required type="email"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number <span
                                            class="text-red-600">*</span></label>

                                    <div class="flex w-full gap-3">
                                        <!-- Country picker (flag + dial code only) -->
                                        <div class="w-40 md:w-44 flex-shrink-0">
                                            <VueTelInput v-model="countryModel" :defaultCountry="selectedCountryIso2"
                                                :autoDefaultCountry="true" :validCharactersOnly="true"
                                                :autoFormat="false" :mode="'international'"
                                                :dropdownOptions="{ showFlags: true, showDialCodeInSelection: true, showSearchBox: true }"
                                                :inputOptions="{ placeholder: '', autocomplete: 'off', readonly: true }"
                                                class="w-full country-only" @country-changed="onCountryChanged" />
                                        </div>

                                        <!-- National digits (wider input) -->
                                        <div class="flex-1">
                                            <input v-model="phoneNational" required type="tel" inputmode="numeric"
                                                autocomplete="tel-national" :placeholder="phonePlaceholder"
                                                class="w-full h-11 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                        </div>
                                    </div>
                                    <p v-if="phoneError" class="mt-2 text-sm text-red-600">{{ phoneError }}</p>
                                </div>
                            </div>

                            <!-- Health & Safety -->
                            <div class="border-t border-gray-200 pt-6">
                                <h4 class="text-lg font-semibold mb-3">📍 Health & Safety</h4>
                                <div class="flex items-center gap-6 mb-3">
                                    <label class="flex items-center gap-2">
                                        <input type="radio" value="no" v-model="form.hasConditions" />
                                        <span>No allergies/conditions</span>
                                    </label>
                                    <label class="flex items-center gap-2">
                                        <input type="radio" value="yes" v-model="form.hasConditions" />
                                        <span>Yes, there are notes</span>
                                    </label>
                                </div>
                                <textarea v-model="form.conditionNotes" :disabled="form.hasConditions !== 'yes'"
                                    placeholder="If yes, please provide details…"
                                    class="w-full min-h-[90px] rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                            </div>

                            <!-- Additional Notes -->
                            <div class="border-t border-gray-200 pt-6">
                                <h4 class="text-lg font-semibold mb-3">✏️ Additional Notes</h4>
                                <textarea v-model="form.notes" placeholder="Anything else you'd like us to know?"
                                    class="w-full min-h-[90px] rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                            </div>

                            <div class="flex items-center justify-between gap-4">
                                <span></span>
                                <button type="submit" :disabled="isAdding" :class="[
                                    'relative overflow-hidden inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm md:text-base font-semibold border border-black disabled:opacity-60 disabled:cursor-not-allowed',
                                    addedToCart ? 'bg-black text-white' : 'bg-white text-black'
                                ]">
                                    <!-- fill layer -->
                                    <span
                                        class="absolute inset-0 bg-black transition-transform duration-[2000ms] ease-linear"
                                        :style="{ transform: isAdding ? 'translateX(0%)' : 'translateX(-100%)' }"
                                        aria-hidden="true"></span>

                                    <!-- label -->
                                    <span class="relative z-10"
                                        :class="(addedToCart || isAdding) ? 'text-white' : 'text-black'">
                                        {{ addedToCart ? 'Checkout' : (isAdding ? 'Adding…' : 'Add to Cart') }}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, computed, watch } from 'vue'
import { useRuntimeConfig, useHead } from '#imports'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'

import { gsap } from 'gsap'

// -------------------------
// Animated letter tile grid (visual only, performance-safe)
// -------------------------
const GRID_COLS = 6
const GRID_ROWS = 6
const GRID_COUNT = GRID_COLS * GRID_ROWS

// Start the animation on mount
const runClassesTileReveal = ref(false)

// 6x6 grid rules:
// - Main (yellow) diagonal is EMPTY
// - Diagonal above spells ART
// - Diagonal below spells CLASSES (compressed to fit 5 tiles: CL / A / S / S / ES)
function buildClassesTiles() {
  const idxOf = (r, c) => r * GRID_COLS + c
  const isMainDiag = (r, c) => r === c

  // Diagonal above main: (0,1) (1,2) (2,3)
  const artDiag = [
    { r: 0, c: 1, t: 'A' },
    { r: 1, c: 2, t: 'R' },
    { r: 2, c: 3, t: 'T' },
  ]

  // Diagonal below main: (1,0) (2,1) (3,2) (4,3) (5,4)
  // CLASSES compressed into 5 tiles: CL / A / S / S / ES
  const classesDiag = [
    { r: 1, c: 0, t: 'C' },
    { r: 2, c: 1, t: 'L' },
    { r: 3, c: 2, t: 'A' },
    { r: 4, c: 3, t: 'S' },
    { r: 5, c: 4, t: 'S' },
  ]

  const textMap = new Map()
  ;[...artDiag, ...classesDiag].forEach(({ r, c, t }) => {
    textMap.set(idxOf(r, c), t)
  })

  return Array.from({ length: GRID_COUNT }, (_, i) => {
    const r = Math.floor(i / GRID_COLS)
    const c = i % GRID_COLS

    // Pastel palette:
    // - main diagonal is yellow
    // - right-most column pink accent
    // - occasional yellow sprinkle
    let bg = 'bg-sky-100'
    if (isMainDiag(r, c)) bg = 'bg-yellow-100'
    else if (c === GRID_COLS - 1) bg = 'bg-pink-100'
    else if ((r + c) % 6 === 0) bg = 'bg-yellow-100'

    // Enforce: yellow diagonal = empty
    const char = isMainDiag(r, c) ? '' : (textMap.get(i) || '')

    // Reveal timing
    const delay = i * 55

    return { bg, char, delay, hasLetter: Boolean(char) }
  })
}

// Precompute once (no reactive recomputation)
const classesTiles = ref(buildClassesTiles())

const blockOneData = {
    image: '/images/afterschool/afterschool_hero.webp',
    title: 'Kids Art Programs',
    description:
        'From guided term classes to immersive holiday camps, Meraki Art Studio offers enriching, hands-on art programs that inspire young minds to explore, express, and evolve through creativity.',
}
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const router = useRouter()
const cart = useCartStore()

// Page-level body class so we can style AppHeader (which lives outside the page DOM)
useHead({
    bodyAttrs: {
        class: 'page-afterschool',
    },
})

const runtimeConfig = useRuntimeConfig()
const getAfterSchoolBeaconUrl = () =>
    String(process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || runtimeConfig.public?.afterSchoolBeaconUrl || '').trim()

function fireAfterSchoolBeacon(payload) {
    const url = getAfterSchoolBeaconUrl()
    if (!url) return

    try {
        if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
            const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' })
            navigator.sendBeacon(url, blob)
        } else {
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(payload),
                keepalive: true,
            }).catch(() => { })
        }
    } catch (_) {
        // swallow errors (non-blocking)
    }
}

function persistCheckoutPrefill(prefill) {
    if (!process.client) return
    try {
        localStorage.setItem('meraki_checkout_prefill', JSON.stringify(prefill || {}))
        window.dispatchEvent(new CustomEvent('meraki:checkout:prefill', { detail: prefill || {} }))
    } catch (_) {
        // ignore
    }

    // If your Pinia cart store supports prefill, use it (non-breaking)
    try {
        const maybeFns = [cart?.setCheckoutPrefill, cart?.setPrefill, cart?.setCustomerPrefill].filter((fn) => typeof fn === 'function')
        if (maybeFns.length) maybeFns[0](prefill || {})
    } catch (_) {
        // ignore
    }
}

const classes = {
    principles: [
        { icon: '🎨', text: 'Color Wheel & Harmony' },
        { icon: '🌗', text: 'Light & Shadow' },
        { icon: '📐', text: 'Symmetry & Perspective' },
        { icon: '🧩', text: 'Spatial Awareness' },
        { icon: '📏', text: 'Relative Sizing' },
        { icon: '🖼️', text: 'Composition Techniques' },
    ],
    benefits: [
        'Classes held once a week',
        'Choose your preferred weekday slot',
        'Ideal for kids aged 5–14',
        'All materials included',
        'Certificate awarded at end of term',
    ],
}

const camps = {
    details: [
      { key: 'days', label: 'Monday to Friday', value: '' },
      { key: 'time', label: '10:30 AM to 1:30 PM', value: '' },
      { key: 'ages', label: 'Ages 5–10 years', value: '' },
      { key: 'materials', label: 'All art materials included', value: '' },
      { key: 'lunch', label: 'Optional add-on: Lunch', value: 'AED 150 per week' },
      { key: 'spots', label: 'Spots are limited', value: '' },
    ],
    themes: [
      { key: 'w1', label: 'Week 1 (Mar 16–20)', value: 'Artistic Garden' },
      { key: 'w2', label: 'Week 2 (Mar 23–27)', value: 'Fashion & DIY' },
    ],
    prices: [
        { key: '1w', label: '1 Week Camp', price: 'AED 1,150 + VAT' },
        { key: '1w-lunch', label: '1 Week Camp with Lunch', price: 'AED 1,300 + VAT' },
        { key: '2w', label: '2 Weeks Camp', price: 'AED 2,300 + VAT' },
        { key: '2w-lunch', label: '2 Weeks Camp with Lunch', price: 'AED 2,450 + VAT' },
        { key: 'day', label: 'Day Pass', price: 'AED 250 + VAT' },
    ],
}

const campsGallery = [
    {
        key: 'holiday-main',
        title: 'Holiday Art Camps',
        img: '/images/afterschool/camps/holiday-art-camps.jpg', // update to your actual file name
    },
]

const activeCampIndex = ref(0)
let campTimer = null

function setActiveCamp(i) {
    if (i < 0 || i >= campsGallery.length) return
    activeCampIndex.value = i
}

/* -------------------------
   Modal state
------------------------- */
const formOpen = ref(false)
// Holiday camp packages (scalable: edit here whenever camps/prices change)
// Holiday camp packages (activity/theme-first so we know what they booked)
// NOTE: Prices are kept the same as before; we now duplicate them per week/theme so bookings capture the activity name.
const holidayCampPackages = [
  // Day Pass (per week/theme)
  {
    title: 'Day Pass — Artistic Garden',
    key: 'day-pass-w1',
    duration: 'Day Pass',
    theme: 'Artistic Garden',
    weekLabel: 'Day Pass',
    price: 250,
    currency: 'AED',
    vatIncluded: false,
  },
  {
    title: 'Day Pass — Fashion & DIY',
    key: 'day-pass-w2',
    duration: 'Day Pass',
    theme: 'Fashion & DIY',
    weekLabel: 'Day Pass',
    price: 250,
    currency: 'AED',
    vatIncluded: false,
  },

  // 1 Week (per week/theme)
  {
    title: '1 Week Camp — Artistic Garden',
    key: '1-week-w1',
    duration: '1 Week Camp',
    theme: 'Artistic Garden',
    weekLabel: 'Week 1 (Mar 16–20)',
    price: 1150,
    currency: 'AED',
    vatIncluded: false,
  },
  {
    title: '1 Week Camp + Lunch — Artistic Garden',
    key: '1-week-lunch-w1',
    duration: '1 Week Camp + Lunch',
    theme: 'Artistic Garden',
    weekLabel: 'Week 1 (Mar 16–20) with Lunch',
    price: 1300,
    currency: 'AED',
    vatIncluded: false,
  },
  {
    title: '1 Week Camp — Fashion & DIY',
    key: '1-week-w2',
    duration: '1 Week Camp',
    theme: 'Fashion & DIY',
    weekLabel: 'Week 2 (Mar 23–27)',
    price: 1150,
    currency: 'AED',
    vatIncluded: false,
  },
  {
    title: '1 Week Camp + Lunch — Fashion & DIY',
    key: '1-week-lunch-w2',
    duration: '1 Week Camp + Lunch',
    theme: 'Fashion & DIY',
    weekLabel: 'Week 2 (Mar 23–27) with Lunch',
    price: 1300,
    currency: 'AED',
    vatIncluded: false,
  },

  // 2 Weeks (both themes)
  {
    title: '2 Weeks Camp — Artistic Garden + Fashion & DIY',
    key: '2-weeks-both',
    duration: '2 Weeks Camp',
    theme: 'Artistic Garden + Fashion & DIY',
    weekLabel: 'Week 1 (Mar 16–20) + Week 2 (Mar 23–27)',
    price: 2300,
    currency: 'AED',
    vatIncluded: false,
  },
  {
    title: '2 Weeks Camp + Lunch — Artistic Garden + Fashion & DIY',
    key: '2-weeks-lunch-both',
    duration: '2 Weeks Camp + Lunch',
    theme: 'Artistic Garden + Fashion & DIY',
    weekLabel: 'Week 1 (Mar 16–20) + Week 2 (Mar 23–27) with Lunch',
    price: 2450,
    currency: 'AED',
    vatIncluded: false,
  },
].map((p) => ({
  ...p,
  // Dropdown label includes the activity name + timeline, then price
  label: `${p.weekLabel}: ${p.theme} — ${p.currency} ${p.price.toLocaleString()} + VAT`,
}))

// Art Classes packages (scalable: edit here whenever pricing changes)
const artClassPackages = [
    {
        title: '1 Class Pack',
        key: '1-class',
        duration: '1 Class',
        price: 175,
        currency: 'AED',
        vatIncluded: true,
    },
    {
        title: '4 Classes Pack',
        key: '4-classes',
        duration: '4 Classes',
        price: 650,
        currency: 'AED',
        vatIncluded: true,
    },
    {
        title: '8 Classes Pack',
        key: '8-classes',
        duration: '8 Classes',
        price: 1250,
        currency: 'AED',
        vatIncluded: true,
    },
    {
        title: '12 Classes Pack',
        key: '12-classes',
        duration: '12 Classes',
        price: 1800,
        currency: 'AED',
        vatIncluded: true,
    },
].map((p) => ({
    ...p,
    label: `${p.duration}: ${p.currency} ${p.price.toLocaleString()}`,
}))

const isHolidayCampProgram = computed(() => String(form.value.program || '').trim() === 'Holiday Art Camps')
const isArtClassesProgram = computed(() => String(form.value.program || '').trim() === 'Art Classes at Meraki')

const requiresPackage = computed(() => isHolidayCampProgram.value || isArtClassesProgram.value)

const packageTitle = computed(() => {
    if (isHolidayCampProgram.value) return '🏕️ Holiday Camp Package'
    if (isArtClassesProgram.value) return '🏕️ 🖌️ Art Classes Package'
    return '🏕️ Package'
})

const activePackages = computed(() => {
    if (isHolidayCampProgram.value) return holidayCampPackages
    if (isArtClassesProgram.value) return artClassPackages
    return []
})

const form = ref({
    program: '',
    packageKey: '',
    childName: '',
    childAge: '',
    parentName: '',
    parentEmail: '',
    phone: '',
    hasConditions: 'no',
    conditionNotes: '',
    notes: ''
})
const submitted = ref(false) // kept for backward compatibility, but no longer used in UI
const addedToCart = ref(false)
const isAdding = ref(false)
const packageError = ref('')
const phoneError = ref('')

// Phone: vue-tel-input used ONLY for country picker (flag + dial code)
const countryModel = ref('')
const selectedCountryIso2 = ref('AE')
const phoneNational = ref('')

const phoneParts = reactive({
    iso2: 'AE',
    countryCode: '+971',
    phone: '',
})

const minDigitsByIso2 = { AE: 9 }
const maxDigitsByIso2 = { AE: 9 }

const minDigits = computed(() => minDigitsByIso2[selectedCountryIso2.value] ?? 6)
const maxDigits = computed(() => maxDigitsByIso2[selectedCountryIso2.value] ?? 15)

const phonePlaceholder = computed(() => (selectedCountryIso2.value === 'AE' ? 'e.g. 55 507 1234' : 'Phone number'))

function syncPhoneParts() {
    const nationalDigits = String(phoneNational.value || '').replace(/\D/g, '')
    phoneParts.phone = nationalDigits
}

function onCountryChanged(country) {
    if (!country) return
    const iso2 = String(country?.iso2 || 'AE').toUpperCase()
    const dial = String(country?.dialCode || '971').replace(/\D/g, '')

    selectedCountryIso2.value = iso2
    phoneParts.iso2 = iso2
    phoneParts.countryCode = dial ? `+${dial}` : ''
    syncPhoneParts()
}

watch(phoneNational, () => syncPhoneParts())

function openForm(program) {
    // reset state on open
    submitted.value = false
    addedToCart.value = false
    packageError.value = ''
    phoneError.value = ''

    form.value.program = program
    form.value.packageKey = ''

    // Reset phone inputs (but keep default country)
    phoneNational.value = ''
    syncPhoneParts()

    formOpen.value = true
}

async function submit() {
    // If already added, go straight to checkout
    if (addedToCart.value) {
        try {
            router.push('/checkout')
        } catch {
            if (process.client) window.location.href = '/checkout'
        }
        return
    }

    // Prevent rapid clicks while adding
    if (isAdding.value) return

    packageError.value = ''
    phoneError.value = ''

    // If this is a program that requires a package, selection is required
    if (requiresPackage.value && !form.value.packageKey) {
        packageError.value = 'Please select a package.'
        return
    }

    const isHolidayCamp = isHolidayCampProgram.value
    const isArtClasses = isArtClassesProgram.value

    const pkgList = isHolidayCamp ? holidayCampPackages : (isArtClasses ? artClassPackages : [])
    const pkg = (requiresPackage.value && form.value.packageKey)
        ? pkgList.find(p => p.key === form.value.packageKey)
        : null

    if (requiresPackage.value && !pkg) {
        packageError.value = 'Please select a valid package.'
        return
    }

    // Sync phone parts and validate phone digits
    syncPhoneParts()
    const phoneDigits = String(phoneParts.phone || '').replace(/\D/g, '')
    if (!phoneDigits || phoneDigits.length < minDigits.value || phoneDigits.length > maxDigits.value) {
        phoneError.value = `Please enter a valid phone number (${minDigits.value}–${maxDigits.value} digits).`
        return
    }

    // Start the 2s fill animation immediately for user feedback
    isAdding.value = true

    // ---- Fire beacon submission (Google Sheet)
    // Sheet columns:
    // Package | Child’s Full Name | Child’s Age | Parent/Guardian Name | Parent Email | Country Code | Phone | Health & Safety | Notes | Source | Timestamp
    const packageLabel = (pkg && pkg.label) ? String(pkg.label || '').trim() : String(form.value.program || '').trim()

    const healthSafety = (String(form.value.hasConditions || 'no') === 'yes')
        ? `Yes: ${String(form.value.conditionNotes || '').trim()}`
        : 'No allergies/conditions'

    const beaconPayload = {
        kind: 'afterschool',
        source: 'afterschool-registration',
        ts: Date.now(),

        // Mapped fields for the sheet
        package: packageLabel,
        childName: String(form.value.childName || '').trim(),
        childAge: String(form.value.childAge || '').trim(),
        parentName: String(form.value.parentName || '').trim(),
        parentEmail: String(form.value.parentEmail || '').trim(),
        countryCode: String(phoneParts.countryCode || '').trim(),
        phone: String(phoneParts.phone || '').trim(),
        healthSafety,
        notes: String(form.value.notes || '').trim(),
    }

    // Async submission: sendBeacon resolves immediately; fetch path is awaited.
    await (async () => {
        const url = getAfterSchoolBeaconUrl()
        if (!url) return

        try {
            if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
                const blob = new Blob([JSON.stringify(beaconPayload)], { type: 'text/plain;charset=UTF-8' })
                navigator.sendBeacon(url, blob)
                return
            }

            await fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(beaconPayload),
                keepalive: true,
            })
        } catch (_) {
            // non-blocking on purpose
        }
    })()

    // ---- Store checkout prefill so checkout.vue can auto-populate
    persistCheckoutPrefill({
        name: String(form.value.parentName || '').trim(),
        email: String(form.value.parentEmail || '').trim(),
        countryCode: phoneParts.countryCode,
        phone: phoneParts.phone,
        // optional extra context
        childName: form.value.childName,
        childAge: form.value.childAge,
        program: form.value.program,
        packageKey: form.value.packageKey || '',
        packageLabel: (pkg && pkg.label) ? pkg.label : '',
    })

    // Use package title as the purchasable line title (so it survives everywhere like price)
    const lineTitle = pkg
        ? `${form.value.program} • ${pkg.title}`
        : form.value.program

    const lineItem = {
        // Try to match your existing cart schema as closely as possible
        type: 'kids-program',
        sku: pkg
            ? `kids-${String(form.value.program || '').toLowerCase().replace(/\s+/g, '-')}-${pkg.key}`
            : `kids-program-${String(form.value.program || '').toLowerCase().replace(/\s+/g, '-')}`,
        title: lineTitle,
        image: '/images/afterschool/afterschool_hero.webp',
        qty: 1,

        // Price should come from pkg for both Holiday Camps and Art Classes
        priceMajor: pkg ? Number(pkg.price || 0) : 0,
        currency: pkg ? pkg.currency : 'AED',

        // VAT rules: holiday camps show +VAT in label; art classes do not
        vatEnabled: isHolidayCamp,
        vatIncluded: isHolidayCamp ? Boolean(pkg?.vatIncluded) : false,
        vatRate: isHolidayCamp ? 5 : 0,

        // Keep your structured package data (incl. title)
        meta: {
            program: form.value.program,
            package: pkg
                ? {
                    title: pkg.title,
                    key: pkg.key,
                    duration: pkg.duration,
                    price: pkg.price,
                    currency: pkg.currency,
                    vatIncluded: pkg.vatIncluded,
                    label: pkg.label,
                }
                : null,

            // Useful metadata for follow-up
            childName: form.value.childName,
            childAge: form.value.childAge,
            parentName: form.value.parentName,
            parentEmail: form.value.parentEmail,
            countryCode: phoneParts.countryCode,
            phone: phoneParts.phone,
            hasConditions: form.value.hasConditions,
            conditionNotes: form.value.conditionNotes,
            notes: form.value.notes,
            checkoutPrefill: {
                name: form.value.parentName,
                email: form.value.parentEmail,
                countryCode: phoneParts.countryCode,
                phone: phoneParts.phone,
                childName: form.value.childName,
                childAge: form.value.childAge,
            },
        },
        addedAt: Date.now(),
    }

    // ---- Add to cart (prefer Pinia store, fallback to localStorage)
    let added = false

    // Try common store method names without breaking if they don't exist
    try {
        const maybeAddFns = [
            cart?.addLine,
            cart?.add,
            cart?.addItem,
            cart?.addToCart,
            cart?.addProduct,
        ].filter((fn) => typeof fn === 'function')

        if (maybeAddFns.length) {
            // use the first available method
            maybeAddFns[0](lineItem)
            added = true
        }
    } catch (e) {
        console.warn('Pinia cart add failed, falling back to localStorage', e)
    }

    if (!added && process.client) {
        try {
            const key = 'meraki_cart'
            const existing = JSON.parse(localStorage.getItem(key) || '[]')
            const next = Array.isArray(existing) ? existing : []
            next.push(lineItem)
            localStorage.setItem(key, JSON.stringify(next))

            window.dispatchEvent(new CustomEvent('meraki:cart:add', { detail: lineItem }))
            added = true
        } catch (e) {
            console.warn('Could not persist cart item', e)
        }
    }

    if (!added) {
        // If nothing worked, stop animation and don't flip UI state
        isAdding.value = false
        packageError.value = 'Could not add to cart. Please try again.'
        return
    }

    // Finish the 2s fill animation, then switch to Checkout
    setTimeout(() => {
        addedToCart.value = true
        isAdding.value = false
    }, 2000)
}

/* -------------------------
   Animations (client only)
------------------------- */
const classesTitle = ref(null)
const classesSub = ref(null)
const classesIntro = ref(null)
const principlesWrap = ref(null)
const classesCard = ref(null)
const classesCta = ref(null)
const gfxClasses = ref(null)

const campsTitle = ref(null)
const campsSub = ref(null)
const campsBody = ref(null)
const campsList = ref(null)
const campsNote = ref(null)
const campsCta = ref(null)
const gfxCamps = ref(null)

// -------------------------
// Holiday Camps carousel (Details / Themes / Prices) — native scroll-snap (performance safe)
// -------------------------
const campSlidesTrack = ref(null)
const activeCampSlide = ref(0)
// Auto-swipe (performance-safe). Runs only when user allows motion.
let __campAutoTimer = null
const __campAutoMs = 5200

function startCampAutoSwipe() {
  if (!process.client) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  stopCampAutoSwipe()
  __campAutoTimer = window.setInterval(() => {
    const next = (activeCampSlide.value + 1) % campSlides.length
    goToCampSlide(next)
  }, __campAutoMs)
}

function stopCampAutoSwipe() {
  if (!process.client) return
  if (__campAutoTimer) {
    window.clearInterval(__campAutoTimer)
    __campAutoTimer = null
  }
}

function bumpCampAutoSwipe() {
  // restart after user interaction so it doesn’t fight scrolling
  stopCampAutoSwipe()
  startCampAutoSwipe()
}

const campSlides = [
  { key: 'details', title: 'Camp details' },
  { key: 'themes', title: 'Themes' },
  { key: 'prices', title: 'Prices' },
]

function clampSlide(i) {
  const n = campSlides.length
  if (i < 0) return 0
  if (i > n - 1) return n - 1
  return i
}

function goToCampSlide(i) {
  const idx = clampSlide(i)
  activeCampSlide.value = idx
  if (!process.client) return
  const track = campSlidesTrack.value
  if (!track) return

  const slideW = track.clientWidth
  track.scrollTo({
    left: idx * slideW,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  })
  bumpCampAutoSwipe()
}

// Lightweight scroll handler (passive + rAF)
let __campScrollRaf = 0
function onCampTrackScroll() {
  if (!process.client) return
  if (__campScrollRaf) return
  __campScrollRaf = window.requestAnimationFrame(() => {
    __campScrollRaf = 0
    const track = campSlidesTrack.value
    if (!track) return
    const w = track.clientWidth || 1
    const idx = Math.round(track.scrollLeft / w)
    activeCampSlide.value = clampSlide(idx)
    bumpCampAutoSwipe()
  })
}

// Camps carousel: ensure we start snapped to the first slide, and keep it aligned on resize
function alignCampCarousel() {
  if (!process.client) return
  const track = campSlidesTrack.value
  if (!track) return
  const w = track.clientWidth
  track.scrollLeft = activeCampSlide.value * w
}

onMounted(() => {
    if (!process.client) return
    // kick off the tile letter reveal (purely visual)
    setTimeout(() => { runClassesTileReveal.value = true }, 150)
    const fadeUp = (el, d = 0) =>
        gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: d })

    // Classes
    fadeUp(classesTitle.value, .05)
    fadeUp(classesSub.value, .12)
    fadeUp(classesIntro.value, .18)
    if (principlesWrap.value) gsap.fromTo(principlesWrap.value.children, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: .05, duration: .6, ease: 'power3.out', delay: .22 })
    fadeUp(classesCard.value, .28)
    fadeUp(classesCta.value, .34)
    gsap.fromTo(gfxClasses.value, { scale: .96, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'power2.out', delay: .2 })

    // Camps
    fadeUp(campsTitle.value, .05)
    fadeUp(campsSub.value, .12)
    fadeUp(campsBody.value, .18)
    if (campsList.value) gsap.fromTo(campsList.value.children, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: .05, duration: .6, ease: 'power3.out', delay: .22 })
    fadeUp(campsNote.value, .28)
    fadeUp(campsCta.value, .34)
    gsap.fromTo(gfxCamps.value, { scale: .96, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'power2.out', delay: .2 })

    // Auto-rotate camp themes / images
    campTimer = setInterval(() => {
        activeCampIndex.value =
            (activeCampIndex.value + 1) % campsGallery.length
    }, 6000)

    // Camps carousel: ensure we start snapped to the first slide, and keep it aligned on resize
    // Initial align (next tick not required; layout is stable here)
    alignCampCarousel()
    startCampAutoSwipe()

    if (process.client) {
      window.addEventListener('resize', alignCampCarousel, { passive: true })
    }
})

onBeforeUnmount(() => {
    stopCampAutoSwipe()
    if (campTimer) clearInterval(campTimer)
    if (process.client) {
      // Remove camps carousel resize alignment handler if present
      try {
        window.removeEventListener('resize', alignCampCarousel)
      } catch {}
    }
})
</script>

<style scoped>
/* Make the header background transparent on this route ONLY when header is transparent */
:global(body.page-afterschool header.bg-transparent),
:global(body.page-afterschool #site-header.bg-transparent),
:global(body.page-afterschool .site-header.bg-transparent),
:global(body.page-afterschool .app-header.bg-transparent),
:global(body.page-afterschool .header-wrapper.bg-transparent),
:global(body.page-afterschool .navbar.bg-transparent) {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    backdrop-filter: none !important;
}

/* Clear common background pseudo layers used by sticky headers ONLY when header is transparent */
:global(body.page-afterschool header.bg-transparent::before),
:global(body.page-afterschool header.bg-transparent::after),
:global(body.page-afterschool .app-header.bg-transparent::before),
:global(body.page-afterschool .app-header.bg-transparent::after),
:global(body.page-afterschool .navbar.bg-transparent::before),
:global(body.page-afterschool .navbar.bg-transparent::after) {
    background: transparent !important;
    background-color: transparent !important;
}

/* Pull the hero up behind the header so no "strip" is visible, while keeping content readable.
   Adjust the 88px if your header height differs. */
.experiences--afterschool :deep(.experiences-block-one),
.experiences--afterschool :deep(.ExperiencesBlockOne) {
    margin-top: -88px;
    padding-top: 88px;
}

/* Existing fade transition for modal */
.fade-enter-active,
.fade-leave-active {
    transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Make vue-tel-input match existing inputs */
:deep(.vue-tel-input) {
    border: 1px solid #d1d5db;
    /* gray-300 */
    border-radius: 0.75rem;
    /* rounded-xl */
    background: #fff;
    padding: 0;
    min-height: 2.75rem;
    height: 2.75rem;
    display: flex;
    align-items: stretch;
    width: 100%;
    box-sizing: border-box;
}

:deep(.vue-tel-input:focus-within) {
    outline: 2px solid rgba(0, 0, 0, 0.18);
    outline-offset: 0px;
}

/* Left dropdown (flag + dial code) */
:deep(.vue-tel-input .vti__dropdown) {
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    padding: 0 0.75rem;
    height: 100%;
    display: flex;
    align-items: center;
}

/* Right input */
:deep(.vue-tel-input input) {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    width: 100%;
    padding: 0 0.75rem;
    height: 100%;
    line-height: 1.5rem;
    box-sizing: border-box;
}

:deep(.vue-tel-input .vti__input) {
    height: 100%;
    display: flex;
    align-items: center;
}

/* Country-only mode: hide the internal input */
:deep(.country-only.vue-tel-input .vti__input) {
    display: none !important;
}

/* Ensure dropdown list appears above modal */
:deep(.vti__dropdown-list) {
    z-index: 9999 !important;
}

/* Match the phone digits input height with the country picker */
input[autocomplete="tel-national"] {
    height: 2.75rem;
}
 
@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap');
/* Letter reveal inside the coloured tiles (visual only) */
.tile-letter {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Caveat Brush", "Inter", sans-serif;
  font-weight: 900;
  font-size: 1.75rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.98);
  opacity: 0;
  transform: translateY(8px) scale(0.98);
  user-select: none;

  /* readable on pastels */
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.22),
    0 1px 0 rgba(0, 0, 0, 0.18);
  z-index: 1;
}

.tile-letter--run {
  animation: tilePopIn 520ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
}

@keyframes tilePopIn {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .tile-letter {
    opacity: 1;
    transform: none;
  }
  .tile-letter--run {
    animation: none;
  }
}

/* Dark wash only when letter exists */
.tile--has-letter::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.16);
  pointer-events: none;
  z-index: 0;
}

@media (max-width: 640px) {
  .tile-letter {
    font-size: 1.4rem;
    letter-spacing: 0.01em;
  }
}
/* -------------------------
   Holiday Camps carousel (performance-safe scroll-snap)
------------------------- */
.hc-track {
  display: flex;
  gap: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  border-radius: 1.25rem;

  /* Fill available vertical space in left column */
  height: 100%;
  min-height: 220px;
}

/* Hide scrollbar (still scrollable) */
.hc-track::-webkit-scrollbar { display: none; }
.hc-track { scrollbar-width: none; }

.hc-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;

  /* Stretch + center content vertically */
  height: 100%;
  display: flex;
  align-items: center;
}

.hc-card {
  border: none;
  background: transparent;
  box-shadow: none;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;        /* vertical centering */
  justify-content: center;

  padding: 0;                 /* let text breathe naturally */
}

.hc-card ul {
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
}

/* Relaxed, readable slider typography */
.hc-card li {
  font-size: 1.05rem;
  line-height: 1.7;
}

@media (min-width: 768px) {
  .hc-card li {
    font-size: 1.15rem;
    line-height: 1.8;
  }
}

.hc-nav-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  border: 1px solid rgba(0,0,0,0.12);
  background: rgba(249, 243, 235, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  line-height: 1;
  transition: transform .15s ease, background .15s ease;
}

.hc-nav-btn:hover { transform: translateY(-1px); }

.hc-dot {
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  border: 1px solid rgba(0,0,0,0.25);
  background: rgba(0,0,0,0.08);
  transition: transform .15s ease, background .15s ease;
}

.hc-dot--active {
  background: rgba(0,0,0,0.8);
  border-color: rgba(0,0,0,0.8);
  transform: scale(1.1);
}

.hc-hint {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: rgba(0,0,0,0.55);
}

@media (prefers-reduced-motion: reduce) {
  .hc-nav-btn, .hc-dot { transition: none; }
}
</style>
