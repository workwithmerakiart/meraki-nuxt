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
                            <img src="/images/afterschool/camps/holiday-art-camps.png"
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

                            <!-- Holiday Camp Package (only for Holiday Art Camps) -->
                            <div v-if="form.program === 'Holiday Art Camps'" class="border-b border-gray-200 pb-6">
                                <h4 class="text-lg font-semibold mb-3">🏕️ Holiday Camp Package</h4>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Select Package <span
                                        class="text-red-600">*</span></label>
                                <select v-model="form.campPackageKey" required
                                    class="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/60 focus:border-black/60">
                                    <option disabled value="">Select a package</option>
                                    <option v-for="pkg in holidayCampPackages" :key="pkg.key" :value="pkg.key">
                                        {{ pkg.label }}
                                    </option>
                                </select>
                                <p v-if="campPackageError" class="mt-2 text-sm text-red-600">{{ campPackageError }}</p>
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
                                      aria-hidden="true"
                                    ></span>

                                    <!-- label -->
                                    <span
                                      class="relative z-10"
                                      :class="(addedToCart || isAdding) ? 'text-white' : 'text-black'"
                                    >
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
import { useRuntimeConfig } from '#imports'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { gsap } from 'gsap'
import PartnerHero from '@/components/partners/PartnerHero.vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const router = useRouter()
const cart = useCartStore()

const runtimeConfig = useRuntimeConfig()
const getAfterSchoolBeaconUrl = () =>
    String(process.env.NUXT_PUBLIC_AFTER_SCHOOL_BEACON_URL || runtimeConfig.public?.afterSchoolBeaconUrl || '').trim()

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
        img: '/images/afterschool/camps/holiday-art-camps.png', // update to your actual file name
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
// Holiday camp packages (scalable: edit here whenever camps/prices change)
const holidayCampPackages = [
    {
        title: '1 Day Art Camp',
        key: '1-day',
        duration: '1 Day',
        price: 295,
        currency: 'AED',
        vatIncluded: false,
    },
    {
        title: '1 Week Art Camp',
        key: '1-week',
        duration: '1 Week',
        price: 1350,
        currency: 'AED',
        vatIncluded: false,
    },
    {
        title: '2 Weeks Art Camp',
        key: '2-weeks',
        duration: '2 Weeks',
        price: 2600,
        currency: 'AED',
        vatIncluded: false,
    },
    {
        title: '3 Weeks Art Camp',
        key: '3-weeks',
        duration: '3 Weeks',
        price: 3800,
        currency: 'AED',
        vatIncluded: false,
    },
].map((p) => ({
    ...p,
    label: `${p.duration} – ${p.currency} ${p.price.toLocaleString()} + VAT`,
}))

const form = ref({
    program: '',
    campPackageKey: '',
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
const campPackageError = ref('')
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
    campPackageError.value = ''
    phoneError.value = ''

    form.value.program = program
    form.value.campPackageKey = ''

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

    campPackageError.value = ''
    phoneError.value = ''

    // If this is Holiday Art Camps, package selection is required
    if (form.value.program === 'Holiday Art Camps' && !form.value.campPackageKey) {
        campPackageError.value = 'Please select a holiday camp package.'
        return
    }

    const isHolidayCamp = form.value.program === 'Holiday Art Camps'
    const pkg = isHolidayCamp
        ? holidayCampPackages.find(p => p.key === form.value.campPackageKey)
        : null

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
    const packageLabel = (isHolidayCamp && pkg) ? String(pkg.label || '').trim() : String(form.value.program || '').trim()

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
        campPackageKey: form.value.campPackageKey || '',
        packageLabel: (isHolidayCamp && pkg) ? pkg.label : '',
    })

    // Use package title as the purchasable line title (so it survives everywhere like price)
    const lineTitle = isHolidayCamp && pkg
        ? `${form.value.program} • ${pkg.title}`
        : form.value.program

    const lineItem = {
        // Try to match your existing cart schema as closely as possible
        type: 'kids-program',
        sku: isHolidayCamp && pkg ? `kids-holiday-camp-${pkg.key}` : `kids-program-${String(form.value.program || '').toLowerCase().replace(/\s+/g, '-')}`,
        title: lineTitle,
        image: '/images/afterschool/afterschool_hero.webp',
        qty: 1,

        // Price only makes sense for Holiday Camps (these are paid packages)
        priceMajor: isHolidayCamp && pkg ? Number(pkg.price || 0) : 0,
        currency: isHolidayCamp && pkg ? pkg.currency : 'AED',

        // UAE VAT (if your store uses these fields)
        vatEnabled: isHolidayCamp,
        vatIncluded: isHolidayCamp && pkg ? Boolean(pkg.vatIncluded) : false,
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
        campPackageError.value = 'Could not add to cart. Please try again.'
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
</style>
