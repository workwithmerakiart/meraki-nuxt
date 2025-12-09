<template>
    <!-- ⭐ removed inline paddingTop/marginTop so hero can merge with transparent header -->
    <!-- ⭐ added top padding directly in hero height for spacing -->
    <div class="bg-[#F9F3EB]">
        <!-- HERO -->
        <!-- HERO (shared PartnerHero like franchise.vue) -->
        <PartnerHero heading="Kids Art Programs"
            subheading="From guided term classes to immersive holiday camps, Meraki Art Studio offers enriching, hands-on art programs that inspire young minds to explore, express, and evolve through creativity."
            image="/images/afterschool/afterschool_hero.webp" alt="Kids Art Programs at Meraki Art Studio" />

        <!-- SECTION: Art Classes -->
        <section id="classes" class="px-6 md:px-10 lg:px-16 py-16">
            <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
                <!-- Graphic tile grid -->
                <div ref="gfxClasses" class="order-2 lg:order-1">
                    <div class="rounded-3xl border border-gray-200 bg-white p-5">
                        <div class="grid grid-cols-6 gap-2">
                            <div v-for="i in 24" :key="`classes-${i}`" class="aspect-square rounded-xl"
                                :class="i % 6 === 0 ? 'bg-yellow-100' : i % 5 === 0 ? 'bg-pink-100' : 'bg-sky-100'" />
                        </div>
                    </div>
                </div>

                <div class="order-1 lg:order-2">
                    <h2 ref="classesTitle" class="text-3xl md:text-4xl font-bold mb-3">🖌️ Art Classes at Meraki</h2>
                    <p ref="classesSub" class="text-lg text-gray-700 mb-4">Build Real Art Skills Through Fun &
                        Exploration</p>
                    <p ref="classesIntro" class="text-gray-600 mb-6">
                        Our structured art classes focus on teaching the Principles of Art through interactive drawing
                        and painting
                        projects. Children explore foundational concepts such as:
                    </p>

                    <!-- principles -->
                    <div ref="principlesWrap" class="grid sm:grid-cols-2 gap-3 mb-6">
                        <div v-for="item in classes.principles" :key="item.text" class="flex items-center gap-3">
                            <span class="text-xl">{{ item.icon }}</span>
                            <span class="text-gray-800">{{ item.text }}</span>
                        </div>
                    </div>

                    <!-- benefits card -->
                    <div ref="classesCard" class="rounded-2xl border border-gray-200 bg-white p-6 mb-6">
                        <ul class="space-y-2 text-gray-700">
                            <li v-for="b in classes.benefits" :key="b">• {{ b }}</li>
                        </ul>
                    </div>

                    <button ref="classesCta" type="button"
                        class="inline-flex items-center rounded-2xl px-5 py-3 text-base font-semibold bg-black text-white hover:opacity-90 transition"
                        @click="openForm('Art Classes at Meraki')">
                        Enroll Now
                    </button>
                </div>
            </div>
        </section>

        <!-- SECTION: Holiday Camps -->
        <section id="camps" class="px-6 md:px-10 lg:px-16 py-16 bg-[#F9F3EB]">
            <div class="max-w-7xl mx-auto space-y-8">
                <div class="grid lg:grid-cols-2 gap-10 items-start">
                    <!-- Left: all descriptive copy -->
                    <div>
                        <h2 ref="campsTitle" class="text-3xl md:text-4xl font-bold mb-3">🌟 Holiday Art Camps</h2>
                        <p ref="campsSub" class="text-lg text-gray-700 mb-4">When School’s Out, Art Comes Alive</p>
                        <p ref="campsBody" class="text-gray-600 mb-6">
                            Our Holiday Camps offer a colorful escape where kids can explore, imagine, and create
                            freely.
                            From
                            paint-splashed canvases to sculpted crafts and group masterpieces, each day is an adventure
                            through
                            artistic expression.
                        </p>

                        <div ref="campsList" class="space-y-4 text-gray-700 mb-6">
                            <div>
                                <h3 class="text-sm font-semibold tracking-wide text-gray-500 mb-1 uppercase">
                                    Camp details
                                </h3>
                                <ul class="space-y-1">
                                    <li v-for="item in camps.details" :key="`detail-${item}`">• {{ item }}</li>
                                </ul>
                            </div>

                            <div>
                                <h3 class="text-sm font-semibold tracking-wide text-gray-500 mb-1 uppercase">
                                    Themes
                                </h3>
                                <ul class="space-y-1">
                                    <li v-for="item in camps.themes" :key="`theme-${item}`">• {{ item }}</li>
                                </ul>
                            </div>

                            <div>
                                <h3 class="text-sm font-semibold tracking-wide text-gray-500 mb-1 uppercase">
                                    Prices
                                </h3>
                                <ul class="space-y-1">
                                    <li v-for="item in camps.prices" :key="`price-${item}`">• {{ item }}</li>
                                </ul>
                            </div>
                        </div>

                        <div ref="campsNote"
                            class="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600 mb-6">
                            🎉 Spaces are limited—secure your child's spot for a joyful, creative holiday break.
                        </div>
                    </div>

                    <!-- Right: static Holiday Art Camps cover image -->
                    <div class="order-2 rounded-3xl border border-gray-200 bg-white overflow-hidden">
                        <div class="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[520px] overflow-hidden">
                            <img src="/images/afterschool/camps/holiday-art-camps.jpeg"
                                alt="Holiday Art Camps at Meraki Art Studio" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
                <!-- Full-width slider: camp themes + rotating images -->
                <div ref="gfxCamps" class="rounded-3xl border border-gray-200 bg-white overflow-hidden">
                    <div class="grid md:grid-cols-2 h-full">
                        <!-- Left: taller image block -->
                        <div class="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[520px] overflow-hidden">
                            <transition name="fade" mode="out-in">
                                <img :key="activeCampIndex" :src="campsGallery[activeCampIndex].img"
                                    :alt="campsGallery[activeCampIndex].title" class="w-full h-full object-cover" />
                            </transition>

                            <div
                                class="absolute inset-x-4 bottom-4 rounded-xl bg-black/60 px-4 py-2 backdrop-blur-[2px]">
                                <p class="text-base sm:text-lg font-semibold text-white">
                                    {{ campsGallery[activeCampIndex].title }}
                                </p>
                            </div>
                        </div>

                        <!-- Right: camp themes list, synced with image -->
                        <div class="bg-[#F7F0E6] px-6 sm:px-8 py-6 sm:py-8 flex flex-col justify-center">
                            <p class="text-xs font-semibold tracking-wide text-gray-500 mb-3 uppercase">
                                Camp themes
                            </p>
                            <p class="text-sm text-gray-600 mb-4">
                                Each week has its own story. Hover or tap to explore the themes.
                            </p>

                            <div class="space-y-2">
                                <button v-for="(item, idx) in campsGallery" :key="item.key" type="button"
                                    class="w-full text-left rounded-xl border px-3 py-2 text-sm sm:text-base transition"
                                    :class="idx === activeCampIndex
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-gray-800 border-gray-300 hover:border-black/70'
                                        " @mouseenter="setActiveCamp(idx)" @focus="setActiveCamp(idx)"
                                    @click="setActiveCamp(idx)">
                                    {{ item.title }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-6">
                    <button ref="campsCta" type="button"
                        class="inline-flex items-center rounded-2xl px-5 py-3 text-base font-semibold border border-black text-black hover:bg-black hover:text-white transition"
                        @click="openForm('Holiday Art Camps')">
                        View Camp Schedule & Register
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

                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Full Name
                                        *</label>
                                    <input v-model="form.childName" required type="text"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Age *</label>
                                    <input v-model="form.childAge" required type="number" min="1"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name
                                        *</label>
                                    <input v-model="form.parentName" required type="text"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Parent Email *</label>
                                    <input v-model="form.parentEmail" required type="email"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input v-model="form.phone" required type="tel"
                                        class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60" />
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
                                <p class="text-sm text-gray-500">🎨 Thank you! We’ll be in touch to confirm your child’s
                                    spot.</p>
                                <button type="submit"
                                    class="inline-flex items-center rounded-2xl px-5 py-2.5 text-sm md:text-base font-semibold bg-black text-white hover:opacity-90 transition">
                                    Submit Registration
                                </button>
                            </div>

                            <transition name="fade">
                                <div v-if="submitted"
                                    class="mt-4 rounded-xl bg-green-50 border border-green-200 p-4 text-green-800">
                                    Thanks! Your registration has been received. We’ll contact you shortly.
                                </div>
                            </transition>
                        </form>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import PartnerHero from '@/components/partners/PartnerHero.vue'

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
        'Monday to Friday',
        '10:30 AM to 2:00 PM',
        'Ages 5–10 years',
        'Includes all art materials, snacks, and a certificate',
        'Choose daily, weekly, or all 3 weeks',
    ],
    themes: [
        'Week 1 (Dec 8–12): Dream, Design & Discover',
        'Week 2 (Dec 15–19): Holidays Around the World',
        'Week 3 (Dec 22–26): Creative Countdown to 2026',
    ],
    prices: [
        '1 Day – AED 295 + VAT',
        '1 Week – AED 1,350 + VAT',
        '2 Weeks – AED 2,600 + VAT',
        '3 Weeks – AED 3,800 + VAT',
    ],
}

const campsGallery = [
    {
        key: 'holiday-main',
        title: 'Holiday Art Camps',
        img: '/images/afterschool/camps/holiday-art-camps.jpeg', // update to your actual file name
    },
    {
        key: 'week-1',
        title: 'Dream, Design & Discover',
        img: '/images/afterschool/camps/week1.png', // update to your actual file name
    },
    {
        key: 'week-2',
        title: 'Holidays Around the World',
        img: '/images/afterschool/camps/week2.png', // update to your actual file name
    },
    {
        key: 'week-3',
        title: 'Creative Countdown to 2026',
        img: '/images/afterschool/camps/week3.png', // update to your actual file name
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
const form = ref({
    program: '',
    childName: '',
    childAge: '',
    parentName: '',
    parentEmail: '',
    phone: '',
    hasConditions: 'no',
    conditionNotes: '',
    notes: ''
})
const submitted = ref(false)

function openForm(program) {
    form.value.program = program
    formOpen.value = true
}
function submit() {
    submitted.value = true
    setTimeout(() => {
        submitted.value = false
        formOpen.value = false
    }, 1200)
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

onMounted(() => {
    if (!process.client) return
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
})

onBeforeUnmount(() => {
    if (campTimer) clearInterval(campTimer)
})
</script>

<style scoped>
/* Make the main site header transparent on this page, so the hero image sits behind it.
   We target common header selectors and override both background and background-color. */
:deep(header),
:deep(#site-header),
:deep(.site-header) {
    background: transparent !important;
    background-color: transparent !important;
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
</style>
