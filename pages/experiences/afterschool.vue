<template>
    <!-- ⭐ removed inline paddingTop/marginTop so hero can merge with transparent header -->
    <!-- ⭐ added top padding directly in hero height for spacing -->
    <div class="bg-white">
        <!-- HERO -->
        <section class="relative overflow-hidden">
            <div class="relative w-full h-[70svh] md:h-[76vh] lg:h-[72vh] pt-[calc(var(--header-h,6rem)+2rem)]"
                :style="heroBgStyle" ref="heroRef">
                <!-- overlay -->
                <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/35"></div>

                <!-- content -->
                <div class="absolute inset-0 flex items-end md:items-center">
                    <div class="px-6 md:px-10 lg:px-16 w-full">
                        <div class="max-w-5xl text-white">
                            <h1 ref="heroTitle" class="text-4xl md:text-6xl font-extrabold tracking-tight mb-5">
                                Kids Art Programs
                            </h1>

                            <div ref="badgeWrap" class="grid gap-3 max-w-4xl">
                                <div v-for="(line, i) in hero.badgeLines" :key="i"
                                    class="inline-flex items-center rounded-2xl bg-white/15 backdrop-blur px-4 py-2 text-sm md:text-base">
                                    <span class="mr-2">🎨</span>{{ line }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

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
        <section id="camps" class="px-6 md:px-10 lg:px-16 py-16 bg-gray-50">
            <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
                <div class="order-1 lg:order-2">
                    <h2 ref="campsTitle" class="text-3xl md:text-4xl font-bold mb-3">🌟 Holiday Art Camps</h2>
                    <p ref="campsSub" class="text-lg text-gray-700 mb-4">When School’s Out, Art Comes Alive</p>
                    <p ref="campsBody" class="text-gray-600 mb-6">
                        Our Holiday Camps offer a colorful escape where kids can explore, imagine, and create freely.
                        From
                        paint-splashed canvases to sculpted crafts and group masterpieces, each day is an adventure
                        through
                        artistic expression.
                    </p>

                    <ul ref="campsList" class="space-y-2 text-gray-700 mb-6">
                        <li v-for="b in camps.bullets" :key="b">• {{ b }}</li>
                    </ul>

                    <div ref="campsNote"
                        class="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600 mb-6">
                        🎉 Spaces are limited—secure your child's spot for a joyful, creative holiday break.
                    </div>

                    <button ref="campsCta" type="button"
                        class="inline-flex items-center rounded-2xl px-5 py-3 text-base font-semibold border border-black text-black hover:bg-black hover:text-white transition"
                        @click="openForm('Holiday Art Camps')">
                        View Camp Schedule & Register
                    </button>
                </div>

                <!-- Graphic tile grid -->
                <div ref="gfxCamps" class="order-2 lg:order-1">
                    <div class="rounded-3xl border border-gray-200 bg-white p-5">
                        <div class="grid grid-cols-6 gap-2">
                            <div v-for="i in 24" :key="`camps-${i}`" class="aspect-square rounded-xl"
                                :class="i % 4 === 0 ? 'bg-pink-100' : i % 3 === 0 ? 'bg-yellow-100' : 'bg-sky-100'" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- REGISTRATION MODAL -->
        <Teleport to="body">
            <transition name="fade">
                <div v-if="formOpen" class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4"
                    role="dialog" aria-modal="true">
                    <div class="w-full max-w-3xl rounded-2xl bg-white shadow-xl">
                        <div class="flex items-center justify-between px-6 py-4 border-b">
                            <div>
                                <h3 class="text-xl font-bold">📝 Registration Form</h3>
                                <p class="text-sm text-gray-600">Enroll Your Child in a Meraki Art Experience</p>
                            </div>
                            <button class="text-2xl leading-none px-2 hover:opacity-70"
                                @click="formOpen = false">&times;</button>
                        </div>

                        <form class="p-6 space-y-6" @submit.prevent="submit">
                            <input type="hidden" v-model="form.program" />

                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Full Name
                                        *</label>
                                    <input v-model="form.childName" required type="text"
                                        class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Child’s Age *</label>
                                    <input v-model="form.childAge" required type="number" min="1"
                                        class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Parent/Guardian Name
                                        *</label>
                                    <input v-model="form.parentName" required type="text"
                                        class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Parent Email *</label>
                                    <input v-model="form.parentEmail" required type="email"
                                        class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                                </div>

                                <div class="md:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input v-model="form.phone" required type="tel"
                                        class="w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
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
                                    class="w-full min-h-[90px] rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                            </div>

                            <!-- Additional Notes -->
                            <div class="border-t border-gray-200 pt-6">
                                <h4 class="text-lg font-semibold mb-3">✏️ Additional Notes</h4>
                                <textarea v-model="form.notes" placeholder="Anything else you'd like us to know?"
                                    class="w-full min-h-[90px] rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70" />
                            </div>

                            <div class="flex items-center justify-between gap-4">
                                <p class="text-sm text-gray-500">🎨 Thank you! We’ll be in touch to confirm your child’s
                                    spot.</p>
                                <button type="submit"
                                    class="inline-flex items-center rounded-2xl px-5 py-3 text-base font-semibold bg-black text-white hover:opacity-90 transition">
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
import { ref, computed, onMounted } from 'vue'
import { gsap } from 'gsap'

/* -------------------------
   Content (arrays)
------------------------- */
const hero = {
    imageUrl: 'https://images.unsplash.com/photo-1496092607007-ca127e0b6a10?q=80&w=2410&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB3eHFwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // put a real image here (public/)
    badgeLines: [
        'Creative Journeys for Young Artists—All Year Round',
        'From guided term classes to immersive holiday camps, Meraki Art Studio offers enriching, hands-on art programs that inspire young minds to explore, express, and evolve through creativity.'
    ]
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
    bullets: [
        'Designed for ages 5–11',
        'Half-day camp sessions',
        'Guided by professional artists',
        'Themed creative projects daily',
        'All materials and supplies included',
    ],
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
   Hero background (fallback)
------------------------- */
const heroBgStyle = computed(() => {
    const url = hero.imageUrl || ''
    if (!url) {
        // soft gradient fallback
        return { background: 'linear-gradient(135deg, #ffe08a 0%, #cde7ff 100%)' }
    }
    return {
        backgroundImage: `linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.25)), url('${url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
})

/* -------------------------
   Animations (client only)
------------------------- */
const heroRef = ref(null)
const heroTitle = ref(null)
const badgeWrap = ref(null)

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
    const fadeUp = (el, d = 0) => gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', delay: d })

    fadeUp(heroTitle.value, .05)
    if (badgeWrap.value) gsap.fromTo(badgeWrap.value.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: .08, duration: .7, ease: 'power3.out', delay: .15 })

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
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
