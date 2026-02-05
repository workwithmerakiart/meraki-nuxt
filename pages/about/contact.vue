<template>
  <section class="bg-[#f9f3eb]">
    <!-- Hero Image -->
    <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/story/story_hero.webp" alt="Contact Us Hero" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 class="text-3xl md:text-5xl font-bold uppercase">Contact Us</h1>
        <p class="max-w-2xl mt-4 text-base md:text-lg">
          Have a question, need help with a booking, or want to visit the studio? We’d love to hear from you.
        </p>
      </div>
    </div>

    <!-- Contact Form + Address -->
    <div class="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
      <!-- Form -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-[#447c9d] mb-2">Let’s connect & create together</h2>
        <p class="text-gray-700 mb-6">Have a question, need help with a booking, or want to visit the studio? We’d love to hear from you.</p>
        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name<span
                  class="text-red-500">*</span></label>
              <input v-model="firstName" required
                class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name<span
                  class="text-red-500">*</span></label>
              <input v-model="lastName" required
                class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email<span
                  class="text-red-500">*</span></label>
              <input type="email" v-model="email" required
                class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone<span
                  class="text-red-500">*</span></label>

              <div class="flex w-full gap-2 overflow-hidden items-end">
                <!-- Country picker (flag + dial code only) -->
                <div class="w-20 md:w-24 flex-shrink-0">
                  <VueTelInput
                    v-model="countryModel"
                    :defaultCountry="selectedCountryIso2"
                    :autoDefaultCountry="true"
                    :validCharactersOnly="true"
                    :autoFormat="false"
                    :mode="'international'"
                    :dropdownOptions="{ showFlags: true, showDialCodeInSelection: true, showSearchBox: true }"
                    :inputOptions="{ placeholder: '', autocomplete: 'off', readonly: true }"
                    class="w-full country-only"
                    @country-changed="onCountryChanged"
                  />
                </div>

                <!-- National digits -->
                <div class="flex-1 min-w-0">
                  <input
                    v-model="phoneNational"
                    required
                    type="tel"
                    inputmode="numeric"
                    autocomplete="tel-national"
                    :placeholder="phonePlaceholder"
                    class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent"
                  />
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input v-model="company"
                class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input v-model="designation"
                class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent" />
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Message<span
                class="text-red-500">*</span></label>
            <textarea v-model="message" required rows="3"
              class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent"></textarea>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Purpose<span
                class="text-red-500">*</span></label>
            <select v-model="purpose" required
              class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent">
              <option disabled value="">Select</option>
              <option>Business</option>
              <option>Media</option>
            </select>
          </div>

          <!-- Spacing wrapper so the gap above buttons is consistent (with or without toast) -->
          <div class="mt-6">
            <!-- Inline toast (shows just above the buttons) -->
            <transition name="fade">
              <p
                v-if="toastMessage"
                :class="[
                  'mb-3 text-sm font-medium',
                  toastType === 'success' ? 'text-green-700' : 'text-red-600'
                ]"
              >
                {{ toastMessage }}
              </p>
            </transition>

            <div class="flex gap-4">
              <button
                type="submit"
                class="bg-[#447c9d] text-white px-4 py-2 rounded hover:bg-black transition"
              >
                Submit
              </button>
              <button
                type="button"
                @click="reset"
                class="border border-[#447c9d] text-[#447c9d] px-4 py-2 rounded hover:bg-[#447c9d] hover:text-white transition"
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Address -->
      <div class="bg-[#FC8EAC] text-white shadow rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-bold mb-4">Address</h2>
          <p class="mb-2">Meraki Art Studio</p>
          <p>40, Goshi Warehouse Village, St 22</p>
          <p>Al Quoz 3, Dubai</p>
          <p class="mb-6">United Arab Emirates</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Meraki+Art+%26+Design+Studio,+Al+Quoz+-+Al+Quoz+Industrial+Area+3+-+Dubai"
            target="_blank" rel="noopener noreferrer"
            class="inline-block mt-2 text-[#000000] underline hover:text-white transition">
            Get Directions
          </a>

          <!-- Opening Hours -->
          <div class="mt-4 text-sm space-y-1">
            <div class="font-semibold mb-1">Studio Hours:</div>
            <div class="grid grid-cols-2 gap-x-6">
              <div v-for="(time, day) in timings" :key="day" class="contents">
                <span class="font-medium  ">{{ day }}</span>
                <span class="text-left">{{ time }}</span>
              </div>
            </div>
          </div>



          <div class="border-t border-gray-500 my-4"></div>
          <div class="mb-4">
            <p class="mb-1 font-semibold">Get in touch</p>
            <p class="mb-1 font-semibold">Phone:</p>
            <p>
              <a href="tel:+971508523600" class="underline hover:text-[#447c9d]">
                +971 50 852 3600
              </a>
            </p>
          </div>
          <div>
            <p class="mb-1 font-semibold">Email:</p>
            <p>
              <a href="mailto:hello@merakiartstudio.ae" class="underline hover:text-[#447c9d]">
                hello@merakiartstudio.ae
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Google Maps with Place Card -->
    <div class="max-w-6xl mx-auto px-4 pb-12">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14448.766523515538!2d55.2151588226713!3d25.129211372409916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6b7fac7bb6d5%3A0x37de9035cd83788a!2sMeraki%20Art%20%26%20Design%20Studio!5e0!3m2!1sen!2sin!4v1752199599527!5m2!1sen!2sin"
        width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade" class="rounded-lg shadow"></iframe>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRuntimeConfig } from '#imports'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const company = ref('')
const designation = ref('')
const message = ref('')
const purpose = ref('')

// Phone: country picker + national digits
const countryModel = ref('')
const selectedCountryIso2 = ref('AE') // default UAE
const phoneNational = ref('')

const phoneParts = ref({
  iso2: 'AE',
  countryCode: '+971',
  phone: ''
})

const minDigitsByIso2 = { AE: 9 }
const maxDigitsByIso2 = { AE: 9 }

const minDigits = computed(() => minDigitsByIso2[selectedCountryIso2.value] ?? 7)
const maxDigits = computed(() => maxDigitsByIso2[selectedCountryIso2.value] ?? 15)

const phonePlaceholder = computed(() =>
  selectedCountryIso2.value === 'AE' ? 'e.g. 55 507 1234' : 'Phone number'
)

function syncPhoneParts() {
  const nationalDigits = String(phoneNational.value || '').replace(/\D/g, '')
  phoneParts.value = {
    ...phoneParts.value,
    phone: nationalDigits
  }
}

function onCountryChanged(country) {
  if (!country) return
  const iso2 = String(country?.iso2 || 'AE').toUpperCase()
  const dial = String(country?.dialCode || '971').replace(/\D/g, '')

  selectedCountryIso2.value = iso2
  phoneParts.value = {
    ...phoneParts.value,
    iso2,
    countryCode: dial ? `+${dial}` : ''
  }

  syncPhoneParts()
}

watch(phoneNational, () => syncPhoneParts())

const toastMessage = ref('')
const toastType = ref('')

const timings = {
  MON: 'Closed',
  TUE: '12:00-19:00',
  WED: '10:00-19:00',
  THU: '10:00-19:00',
  FRI: '10:00-19:00',
  SAT: '10:00-19:00',
  SUN: '10:00-19:00'
}

const reset = () => {
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  phoneNational.value = ''
  company.value = ''
  designation.value = ''
  message.value = ''
  purpose.value = ''
  syncPhoneParts()
}

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 6000)
}

function getBeaconUrl() {
  // Prefer runtimeConfig, but allow env var fallback
  const cfg = useRuntimeConfig()
  return String(cfg.public?.contactBeaconUrl || process.env.NUXT_PUBLIC_CONTACT_BEACON_URL || '').trim()
}

const submit = async () => {
  // Basic validation for required fields
  if (
    !firstName.value.trim() ||
    !lastName.value.trim() ||
    !email.value.trim() ||
    !phoneNational.value.trim() ||
    !message.value.trim() ||
    !purpose.value.trim()
  ) {
    showToast('Please fill out all required fields.', 'error')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    showToast('Please enter a valid email address.', 'error')
    return
  }

  // phone: digits-only length check (country aware)
  const digits = String(phoneNational.value || '').replace(/\D/g, '')
  if (digits.length < minDigits.value || digits.length > maxDigits.value) {
    showToast(`Please enter a valid phone number (${minDigits.value}–${maxDigits.value} digits).`, 'error')
    return
  }

  const url = getBeaconUrl()
  if (!url) {
    showToast('Contact form is not configured yet.', 'error')
    return
  }

  // make sure phoneParts is up to date
  syncPhoneParts()

  const payload = {
    kind: 'contact',
    source: 'contact-us',
    ts: Date.now(),

    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),

    countryCode: String(phoneParts.value.countryCode || '').trim(), // e.g. +971
    phone: String(phoneParts.value.phone || '').trim(), // digits only

    companyName: company.value.trim(),
    designation: designation.value.trim(),
    message: message.value.trim(),
    purpose: purpose.value.trim()
  }

  try {
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' })
      navigator.sendBeacon(url, blob)
    } else {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        keepalive: true
      })
    }

    showToast('Thanks! We would reach out to you soon.', 'success')
    // Keep the values visible after submit; user can hit Clear if they want.
  } catch (e) {
    console.warn('contact beacon failed', e)
    showToast('Could not submit right now. Please try again.', 'error')
  }
}

onMounted(() => {
  syncPhoneParts()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Make vue-tel-input match existing inputs */
:deep(.vue-tel-input) {
  border: 0;
  border-bottom: 1px solid #447c9d;
  border-radius: 0;
  background: transparent;
  min-height: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: stretch;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

:deep(.vue-tel-input .vti__dropdown) {
  max-width: 100%;
  width: 100%;
  padding: 0 0.25rem 0 0;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Slightly tighten the dial-code text so it fits inside the smaller picker */
:deep(.vue-tel-input .vti__selection) {
  font-size: 0.85rem;
}

:deep(.vue-tel-input .vti__flag) {
  margin-right: 0.25rem;
}

:deep(.vue-tel-input input) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  width: 100%;
  padding: 0;
  height: 100%;
  line-height: 1.5rem;
  background: transparent;
  box-sizing: border-box;
}

:deep(.vue-tel-input .vti__input) {
  height: 100%;
  display: flex;
  align-items: center;
}

/* Country-only mode: hide the internal input (we use our own phone input) */
:deep(.country-only.vue-tel-input .vti__input) {
  display: none !important;
}

/* Ensure dropdown renders above page */
:deep(.vti__dropdown-list) {
  z-index: 9999 !important;
}
</style>
