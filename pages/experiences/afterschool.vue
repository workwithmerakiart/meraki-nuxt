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
                            <div v-for="(tile, idx) in classesTiles" :key="`classes-${idx}`"
                                class="aspect-square rounded-xl relative overflow-hidden"
                                :class="[tile.bg, tile.hasLetter ? 'tile--has-letter' : '']">
                                <span v-if="tile.char" class="tile-letter"
                                    :style="{ animationDelay: tile.delay + 'ms' }"
                                    :class="{ 'tile-letter--run': runClassesTileReveal }">
                                    {{ tile.char }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-1 lg:order-2">
                    <h2 ref="classesTitle" class="block-two-headings text-3xl md:text-4xl font-bold tracking-tight mb-2 text-[#447C9D]">🖌️ Art Classes at
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
            <div class="max-w-7xl mx-auto">
                <!-- Header -->
                <div ref="campsHead" class="text-center max-w-3xl mx-auto mb-10">
                    <h2 class="block-two-headings text-3xl md:text-4xl font-bold tracking-tight mb-2 text-[#447C9D]">
                        🌟 Holiday Art Camps</h2>
                    <p class="text-lg text-gray-900 mb-3">When School’s Out, Art Comes Alive</p>
                    <p class="text-gray-600">
                        Five themed weeks of hands-on creativity. Book a full week, or pick just the days that excite
                        your child — each day a brand new adventure.
                    </p>
                </div>

                <!-- Camp pill selector -->
                <div ref="campsPills" class="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
                    <button v-for="(camp, i) in holidayCamps" :key="camp.key" type="button"
                        @click="setActiveCamp(i)" :class="[
                            'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm md:text-base font-semibold transition',
                            activeCampIndex === i
                                ? 'border-[#447C9D] bg-[#447C9D] text-white shadow-sm'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-[#447C9D] hover:text-[#447C9D]'
                        ]">
                        <span class="text-lg">{{ camp.emoji }}</span>
                        <span>{{ camp.shortName }}</span>
                    </button>
                </div>

                <!-- Active camp panel (fluid swap) -->
                <transition name="camp-swap" mode="out-in">
                    <div :key="activeCamp.key" class="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
                        <!-- Left: cover + info + pricing + CTA -->
                        <div class="order-2 lg:order-1 flex flex-col">
                            <div class="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                                <div class="relative min-h-[220px] sm:min-h-[300px] lg:min-h-[360px]">
                                    <img :src="activeCamp.image" :alt="activeCamp.name"
                                        class="absolute inset-0 w-full h-full object-cover" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent">
                                    </div>
                                    <div class="absolute bottom-0 left-0 right-0 p-5 text-white">
                                        <div class="text-2xl md:text-3xl font-bold flex items-center gap-2">
                                            <span>{{ activeCamp.emoji }}</span>
                                            <span>{{ activeCamp.name }}</span>
                                        </div>
                                        <div class="text-sm md:text-base opacity-90">{{ activeCamp.dateLabel }}</div>
                                    </div>
                                </div>
                            </div>

                            <p class="text-gray-600 mt-5 mb-5">{{ activeCamp.blurb }}</p>

                            <!-- info chips -->
                            <div class="grid sm:grid-cols-2 gap-3 mb-5">
                                <div
                                    class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800">
                                    <span>🎂</span> Ages {{ activeCamp.ages }}
                                </div>
                                <div
                                    class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800">
                                    <span>⏰</span> {{ activeCamp.time }}
                                </div>
                                <div
                                    class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800">
                                    <span>🍱</span> Lunch &amp; snacks included
                                </div>
                                <div
                                    class="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800">
                                    <span>🎨</span> All materials provided
                                </div>
                            </div>

                            <!-- pricing -->
                            <div class="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm mb-5">
                                <div class="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <div class="text-sm text-gray-500">Day Pass</div>
                                        <div class="text-lg font-bold text-gray-900">
                                            AED {{ activeCamp.dayPrice.toLocaleString() }}
                                            <span class="text-sm font-normal text-gray-500">+ VAT / day</span>
                                        </div>
                                    </div>
                                    <div class="h-9 w-px bg-gray-200 hidden sm:block"></div>
                                    <div>
                                        <div class="text-sm text-gray-500">Full Week</div>
                                        <div class="text-lg font-bold text-gray-900">
                                            AED {{ activeCamp.weekPrice.toLocaleString() }}
                                            <span class="text-sm font-normal text-gray-500">+ VAT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="button"
                                class="relative overflow-hidden inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-semibold border border-black bg-white text-black transition group mt-auto self-start"
                                @click="openForm('Holiday Art Camps', activeCamp.key)">
                                <span
                                    class="absolute inset-0 bg-black transition-transform duration-[700ms] ease-out -translate-x-full group-hover:translate-x-0"
                                    aria-hidden="true"></span>
                                <span
                                    class="relative z-10 inline-flex items-center gap-2 transition-colors group-hover:text-white">
                                    Register for {{ activeCamp.shortName }}
                                    <span aria-hidden="true">→</span>
                                </span>
                            </button>
                        </div>

                        <!-- Right: day-by-day timeline -->
                        <div class="order-1 lg:order-2">
                            <div class="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm h-full">
                                <div class="text-lg md:text-xl font-semibold tracking-wide text-[#447C9D] mb-5">
                                    ⏳ Camp Timeline</div>
                                <ol class="relative border-l border-gray-200 ml-3 space-y-6">
                                    <li v-for="day in activeCamp.days" :key="day.key" class="relative pl-6">
                                        <span
                                            class="absolute -left-[0.95rem] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#F9F3EB] border border-gray-200 text-sm">
                                            {{ day.emoji }}
                                        </span>
                                        <div class="font-semibold text-gray-900">Day {{ day.n }} – {{ day.theme }}</div>
                                        <ul class="mt-1 space-y-1 text-sm text-gray-600">
                                            <li v-for="p in day.projects" :key="p">• {{ p }}</li>
                                        </ul>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </transition>

                <div
                    class="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white/60 p-5 text-sm text-gray-700 text-center">
                    🎉 Spaces are limited—secure your child's spot for a joyful, creative holiday break.
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

                            <!-- Holiday Camps: camp + pass type + day picker -->
                            <div v-if="isHolidayCampProgram" class="border-b border-gray-200 pb-6 space-y-5">
                                <h4 class="text-lg font-semibold">🏕️ Holiday Camp</h4>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Select Camp <span class="text-red-600">*</span>
                                    </label>
                                    <select v-model="form.campKey" required
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60">
                                        <option disabled value="">Select a camp</option>
                                        <option v-for="c in holidayCamps" :key="c.key" :value="c.key">
                                            {{ c.emoji }} {{ c.name }} · {{ c.dateLabel }}
                                        </option>
                                    </select>
                                </div>

                                <div v-if="selectedCamp">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Pass Type <span class="text-red-600">*</span>
                                    </label>
                                    <div class="grid sm:grid-cols-2 gap-3">
                                        <label :class="[
                                            'flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition',
                                            form.passType === 'week' ? 'border-[#447C9D] ring-1 ring-[#447C9D] bg-[#447C9D]/5' : 'border-gray-300 hover:border-[#447C9D]'
                                        ]">
                                            <input type="radio" value="week" v-model="form.passType"
                                                class="accent-[#447C9D]" />
                                            <span class="text-sm">
                                                <span class="font-semibold block">Full Week</span>
                                                <span class="text-gray-500">AED
                                                    {{ selectedCamp.weekPrice.toLocaleString() }} + VAT</span>
                                            </span>
                                        </label>
                                        <label :class="[
                                            'flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition',
                                            form.passType === 'day' ? 'border-[#447C9D] ring-1 ring-[#447C9D] bg-[#447C9D]/5' : 'border-gray-300 hover:border-[#447C9D]'
                                        ]">
                                            <input type="radio" value="day" v-model="form.passType"
                                                class="accent-[#447C9D]" />
                                            <span class="text-sm">
                                                <span class="font-semibold block">Day Pass</span>
                                                <span class="text-gray-500">AED
                                                    {{ selectedCamp.dayPrice.toLocaleString() }} + VAT / day</span>
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div v-if="selectedCamp && form.passType === 'day'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        Select Day(s) <span class="text-red-600">*</span>
                                    </label>
                                    <div class="space-y-2">
                                        <label v-for="day in selectedCamp.days" :key="day.key" :class="[
                                            'flex items-center gap-3 rounded-xl border px-4 py-2.5 cursor-pointer transition',
                                            form.selectedDays.includes(day.key) ? 'border-[#447C9D] bg-[#447C9D]/5' : 'border-gray-300 hover:border-[#447C9D]'
                                        ]">
                                            <input type="checkbox" :value="day.key" v-model="form.selectedDays"
                                                class="accent-[#447C9D]" />
                                            <span class="text-sm text-gray-800">
                                                <span class="mr-1">{{ day.emoji }}</span>Day {{ day.n }} – {{ day.theme }}
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div v-if="campPriceMajor > 0"
                                    class="flex items-center justify-between rounded-xl bg-[#F9F3EB] border border-gray-200 px-4 py-3">
                                    <span class="text-sm text-gray-600">{{ campSummaryLabel }}</span>
                                    <span class="font-bold text-gray-900">
                                        AED {{ campPriceMajor.toLocaleString() }}
                                        <span class="text-sm font-normal text-gray-500">+ VAT</span>
                                    </span>
                                </div>

                                <p v-if="packageError" class="text-sm text-red-600">{{ packageError }}</p>
                            </div>

                            <!-- Art Classes: package dropdown -->
                            <div v-else-if="isArtClassesProgram" class="border-b border-gray-200 pb-6">
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

/* -------------------------
   Holiday Camps data
   Edit here each season: dates, themes, projects, pricing, images.
   Drop cover images in /public/images/afterschool/camps/<key>.jpg
------------------------- */
const DAY_PRICE = 275
const WEEK_PRICE = 1250
const CAMP_AGES = '5–12 Years'
const CAMP_TIME = '10:30 AM – 12:30 PM'

const holidayCamps = [
    {
        key: 'treasure-island',
        shortName: 'Treasure Island',
        name: 'Treasure Island Camp',
        emoji: '🏴‍☠️',
        dateLabel: '6–10 July 2026',
        image: '/images/afterschool/camps/treasure-island.jpg',
        blurb:
            'Set sail on a week of pirate adventures, hidden treasures, island discoveries, and creative challenges. Campers complete exciting hands-on projects while solving clues and exploring the world of pirates and treasure hunters.',
        ages: CAMP_AGES,
        time: CAMP_TIME,
        dayPrice: DAY_PRICE,
        weekPrice: WEEK_PRICE,
        currency: 'AED',
        days: [
            { key: 'd1', n: 1, emoji: '🗺️', theme: 'The Lost Treasure Map', projects: ['Gel Candle Making', 'Ice Cream Stick Name Plate'] },
            { key: 'd2', n: 2, emoji: '🏝️', theme: "Pirate's Discovery", projects: ['Leather Adventure Journal', 'Painted Seashell Wind Chimes'] },
            { key: 'd3', n: 3, emoji: '💎', theme: 'Hidden Treasure Cove', projects: ['Crystal Geode Treasure Box', 'Island Terrarium'] },
            { key: 'd4', n: 4, emoji: '🧜‍♀️', theme: 'Mermaid Lagoon', projects: ['Foot Scrub Making', 'Glow-in-the-Dark Squishy'] },
            { key: 'd5', n: 5, emoji: '🦜', theme: "Captain's Challenge", projects: ['Pirate Parrot Sculpture', 'Massive Treasure Hunt'] },
        ],
    },
    {
        key: 'wonders',
        shortName: 'Wonders',
        name: 'Wonders of the World Camp',
        emoji: '🌍',
        dateLabel: '13–17 July 2026',
        image: '/images/afterschool/camps/wonders.jpg',
        blurb:
            'Travel across the globe through art and creativity. Each day explores a different country through culture-inspired projects, architecture, traditions, and artistic techniques.',
        ages: CAMP_AGES,
        time: CAMP_TIME,
        dayPrice: DAY_PRICE,
        weekPrice: WEEK_PRICE,
        currency: 'AED',
        days: [
            { key: 'd1', n: 1, emoji: '🍕', theme: 'Italy', projects: ['Mosaic Leaning Tower of Pisa Artwork', 'Roman Clay Vase Charms'] },
            { key: 'd2', n: 2, emoji: '👑', theme: 'England', projects: ['Royal Guard Card Figures', 'Mixed Media Resin Coasters'] },
            { key: 'd3', n: 3, emoji: '🏙️', theme: 'Dubai', projects: ['Perspective Architecture Painting', 'Upcycled Book Organizer'] },
            { key: 'd4', n: 4, emoji: '🕌', theme: 'Morocco', projects: ['Moroccan Lamp Shade Painting', 'Shrink Art Keychains'] },
            { key: 'd5', n: 5, emoji: '🗽', theme: 'USA', projects: ['NYC-Inspired Tissue Box Design', 'UP-Inspired Hot Air Balloon Canvas'] },
        ],
    },
    {
        key: 'grow-up',
        shortName: 'When I Grow Up',
        name: 'When I Grow Up Camp',
        emoji: '👩‍🚀',
        dateLabel: '27–31 July 2026',
        image: '/images/afterschool/camps/grow-up.jpg',
        blurb:
            'A week designed to inspire future dreamers. Children explore different careers through creative projects while discovering new skills, interests, and possibilities.',
        ages: CAMP_AGES,
        time: CAMP_TIME,
        dayPrice: DAY_PRICE,
        weekPrice: WEEK_PRICE,
        currency: 'AED',
        days: [
            { key: 'd1', n: 1, emoji: '🎨', theme: 'Artist', projects: ['Picasso Portraits', 'Foam Clay Mirror'] },
            { key: 'd2', n: 2, emoji: '🌸', theme: 'Florist', projects: ['Resin Floral Bookmark', 'Wire Flower Art'] },
            { key: 'd3', n: 3, emoji: '🧁', theme: 'Baker', projects: ['Cupcake Decorating', 'Decoden Mirror'] },
            { key: 'd4', n: 4, emoji: '⚓', theme: 'Sailor', projects: ['Jesmonite Beach Tray with Resin', 'Sunglasses Design Studio'] },
            { key: 'd5', n: 5, emoji: '💄', theme: 'Beauty Brand Owner', projects: ['Lip Gloss Making', 'Soap Making'] },
        ],
    },
    {
        key: 'candyland',
        shortName: 'Candyland',
        name: 'Candyland Camp',
        emoji: '🍭',
        dateLabel: '10–14 August 2026',
        image: '/images/afterschool/camps/candyland.jpg',
        blurb:
            'Step into a colourful world of sweets, treats, and imagination. This playful camp combines art, design, sensory activities, and creative making inspired by all things candy.',
        ages: CAMP_AGES,
        time: CAMP_TIME,
        dayPrice: DAY_PRICE,
        weekPrice: WEEK_PRICE,
        currency: 'AED',
        days: [
            { key: 'd1', n: 1, emoji: '🍬', theme: 'Sweet Treat Studio', projects: ['Soap Making Fun', 'Resin Confetti Trays'] },
            { key: 'd2', n: 2, emoji: '🍫', theme: 'Candy Factory Creations', projects: ['Candy Collage / Decoupage Art', 'Crazy Tumblers'] },
            { key: 'd3', n: 3, emoji: '💎', theme: 'Sugar Rush Day', projects: ['Candy Jewelry Making', 'Sweet Treat Jewelry Box'] },
            { key: 'd4', n: 4, emoji: '🍦', theme: 'Ice Cream Dreamland', projects: ['Summer Hat Customization', 'Puffy Paint Ice Cream Cone Art'] },
            { key: 'd5', n: 5, emoji: '🎡', theme: 'Candy Carnival', projects: ['Cake Stickle Decorating', 'Candy Slime Making'] },
        ],
    },
    {
        key: 'art-through-time',
        shortName: 'Art Through Time',
        name: 'Art Through Time Camp',
        emoji: '🎨',
        dateLabel: '17–21 August 2026',
        image: '/images/afterschool/camps/art-through-time.jpg',
        blurb:
            'A creative journey through history exploring how art has evolved across different eras, cultures, and artistic movements. From prehistoric cave paintings to futuristic design, campers experiment with a variety of techniques while discovering the story of art through hands-on projects.',
        ages: CAMP_AGES,
        time: CAMP_TIME,
        dayPrice: DAY_PRICE,
        weekPrice: WEEK_PRICE,
        currency: 'AED',
        days: [
            { key: 'd1', n: 1, emoji: '🦴', theme: 'The First Artists', projects: ['Cave Creation & Cave Painting', 'Fossil Impressions'] },
            { key: 'd2', n: 2, emoji: '🏺', theme: 'Ancient Civilizations', projects: ['Hieroglyphics Name Plaque', 'Block Printing'] },
            { key: 'd3', n: 3, emoji: '🎨', theme: 'Classical Art', projects: ['Artist-Inspired Painting', 'Texture & Gold Leaf Art'] },
            { key: 'd4', n: 4, emoji: '✨', theme: 'Modern Art', projects: ['Fluid Art', 'Jesmonite Mirror'] },
            { key: 'd5', n: 5, emoji: '🚀', theme: 'Future Art', projects: ['Resin Neon Squishy', 'Robot Design Challenge'] },
        ],
    },
]

const activeCampIndex = ref(0)
const activeCamp = computed(() => holidayCamps[activeCampIndex.value] || holidayCamps[0])

function setActiveCamp(i) {
    if (i < 0 || i >= holidayCamps.length) return
    activeCampIndex.value = i
}

/* -------------------------
   Modal state
------------------------- */
const formOpen = ref(false)

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

const packageTitle = computed(() => '🖌️ Art Classes Package')

const activePackages = computed(() => {
    if (isArtClassesProgram.value) return artClassPackages
    return []
})

const form = ref({
    program: '',
    packageKey: '',
    // Holiday camp selection
    campKey: '',
    passType: '', // 'week' | 'day'
    selectedDays: [], // array of day keys, e.g. ['d1','d3']
    childName: '',
    childAge: '',
    parentName: '',
    parentEmail: '',
    phone: '',
    hasConditions: 'no',
    conditionNotes: '',
    notes: ''
})

// Currently selected camp object (in the modal)
const selectedCamp = computed(() => holidayCamps.find((c) => c.key === form.value.campKey) || null)

// Selected day objects, in camp order
const selectedDayObjs = computed(() => {
    const camp = selectedCamp.value
    if (!camp) return []
    return camp.days.filter((d) => form.value.selectedDays.includes(d.key))
})

// Live price for the modal summary
const campPriceMajor = computed(() => {
    const camp = selectedCamp.value
    if (!camp) return 0
    if (form.value.passType === 'week') return camp.weekPrice
    if (form.value.passType === 'day') return selectedDayObjs.value.length * camp.dayPrice
    return 0
})

const campSummaryLabel = computed(() => {
    const camp = selectedCamp.value
    if (!camp) return ''
    if (form.value.passType === 'week') return 'Full Week'
    const n = selectedDayObjs.value.length
    if (form.value.passType === 'day' && n) return `${n} day${n > 1 ? 's' : ''} × AED ${camp.dayPrice.toLocaleString()}`
    return ''
})

// Normalized "package" object for the cart / beacon (mirrors artClassPackages shape)
const campPurchase = computed(() => {
    const camp = selectedCamp.value
    if (!camp) return null

    if (form.value.passType === 'week') {
        return {
            key: `${camp.key}-week`,
            title: `${camp.name} — Full Week`,
            duration: 'Full Week',
            price: camp.weekPrice,
            currency: camp.currency,
            vatIncluded: false,
            campKey: camp.key,
            passType: 'week',
            dateLabel: camp.dateLabel,
            days: [],
            label: `${camp.name} (${camp.dateLabel}) — Full Week · ${camp.currency} ${camp.weekPrice.toLocaleString()} + VAT`,
        }
    }

    if (form.value.passType === 'day') {
        const days = selectedDayObjs.value
        if (!days.length) return null
        const price = days.length * camp.dayPrice
        const dayList = days.map((d) => `Day ${d.n} – ${d.theme}`).join(', ')
        return {
            key: `${camp.key}-day-${days.map((d) => d.key).join('+')}`,
            title: `${camp.name} — Day Pass: ${dayList}`,
            duration: `Day Pass (${days.length} day${days.length > 1 ? 's' : ''})`,
            price,
            currency: camp.currency,
            vatIncluded: false,
            campKey: camp.key,
            passType: 'day',
            dateLabel: camp.dateLabel,
            days: days.map((d) => ({ key: d.key, n: d.n, theme: d.theme, label: `Day ${d.n} – ${d.theme}` })),
            label: `${camp.name} (${camp.dateLabel}) — Day Pass: ${dayList} · ${camp.currency} ${price.toLocaleString()} + VAT`,
        }
    }

    return null
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

// Reset day selection when switching camp or pass type so stale days never carry over
watch(() => form.value.campKey, () => { form.value.selectedDays = [] })
watch(() => form.value.passType, (t) => { if (t !== 'day') form.value.selectedDays = [] })

function openForm(program, campKey = '') {
    // reset state on open
    submitted.value = false
    addedToCart.value = false
    packageError.value = ''
    phoneError.value = ''

    form.value.program = program
    form.value.packageKey = ''
    form.value.campKey = campKey || ''
    form.value.passType = ''
    form.value.selectedDays = []

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

    const isHolidayCamp = isHolidayCampProgram.value
    const isArtClasses = isArtClassesProgram.value

    // Resolve the purchasable "package" for this program
    let pkg = null
    if (isHolidayCamp) {
        if (!form.value.campKey) {
            packageError.value = 'Please select a camp.'
            return
        }
        if (!form.value.passType) {
            packageError.value = 'Please choose Full Week or Day Pass.'
            return
        }
        if (form.value.passType === 'day' && !form.value.selectedDays.length) {
            packageError.value = 'Please select at least one day.'
            return
        }
        pkg = campPurchase.value
        if (!pkg) {
            packageError.value = 'Please complete your camp selection.'
            return
        }
    } else if (isArtClasses) {
        if (!form.value.packageKey) {
            packageError.value = 'Please select a package.'
            return
        }
        pkg = artClassPackages.find((p) => p.key === form.value.packageKey) || null
        if (!pkg) {
            packageError.value = 'Please select a valid package.'
            return
        }
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
        packageKey: pkg?.key || form.value.packageKey || '',
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
        image: pkg?.campKey
            ? (selectedCamp.value?.image || '/images/afterschool/afterschool_hero.webp')
            : '/images/afterschool/afterschool_hero.webp',
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
                    // Holiday-camp specifics (carry camp + day names through to checkout)
                    ...(pkg.passType
                        ? { campKey: pkg.campKey, passType: pkg.passType, dateLabel: pkg.dateLabel, days: pkg.days }
                        : {}),
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

const campsHead = ref(null)
const campsPills = ref(null)

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
    if (campsHead.value) gsap.fromTo(campsHead.value.children, { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .7, ease: 'power3.out', delay: .05 })
    if (campsPills.value) gsap.fromTo(campsPills.value.children, { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: .04, duration: .5, ease: 'power3.out', delay: .2 })
})

onBeforeUnmount(() => {
    // nothing to clean up currently
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap');
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

/* Fluid camp panel swap */
.camp-swap-enter-active,
.camp-swap-leave-active {
    transition: opacity .35s ease, transform .35s ease;
}

.camp-swap-enter-from {
    opacity: 0;
    transform: translateY(12px);
}

.camp-swap-leave-to {
    opacity: 0;
    transform: translateY(-8px);
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

.block-two-headings {
    font-family: "Caveat Brush", serif;
}

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
</style>
