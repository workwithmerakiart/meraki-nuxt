<template>
  <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white w-full max-w-2xl rounded-lg p-6 relative shadow-lg overflow-y-auto max-h-[90vh]">
      <!-- Close Button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-black text-2xl font-bold"
        aria-label="Close"
      >
        &times;
      </button>

      <h2 class="text-2xl font-bold text-[#447C9D] mb-4 text-center">Book Your Creative Session</h2>

      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- 👤 Your Details -->
        <div>
          <label class="block font-medium text-sm mb-1">Full Name*</label>
          <input
            type="text"
            v-model="form.name"
            @blur="touched.name = true"
            required
            class="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Your full name"
          />
          <p v-if="touched.name && !nameValid" class="mt-1 text-xs text-red-600">
            Enter your full name (letters, spaces, ' and - only).
          </p>
        </div>

        <div>
          <label class="block font-medium text-sm mb-1">Email Address*</label>
          <input
            type="email"
            v-model="form.email"
            @blur="touched.email = true"
            required
            class="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="you@example.com"
          />
          <p v-if="touched.email && !emailValid" class="mt-1 text-xs text-red-600">
            Enter a valid email address.
          </p>
        </div>

        <!-- 📞 Phone (country picker + national digits) -->
        <div>
          <label class="block font-medium text-sm mb-1">Phone Number*</label>
          <div class="flex w-full gap-3">
            <!-- Country picker (flag + dial code only) -->
            <div class="w-40 md:w-44 flex-shrink-0">
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
                @blur="touched.phone = true"
                @country-changed="onCountryChanged"
              />
            </div>

            <!-- National digits -->
            <div class="flex-1">
              <input
                v-model="phoneNational"
                @blur="touched.phone = true"
                type="tel"
                inputmode="numeric"
                autocomplete="tel-national"
                class="w-full border border-gray-300 rounded px-3 py-2"
                :placeholder="phonePlaceholder"
              />
            </div>
          </div>

          <p v-if="touched.phone && !phoneValid" class="mt-1 text-xs text-red-600">
            Enter a valid phone number ({{ minDigits }}–{{ maxDigits }} digits).
          </p>
        </div>

        <!-- 🛍️ Product Selection -->
        <div>
          <label class="block font-medium text-sm mb-1">Choose Your Option*</label>
          <select
            v-model="form.product"
            @blur="touched.product = true"
            required
            class="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option disabled value="">Select an option</option>
            <option v-for="option in products" :key="option">{{ option }}</option>
          </select>
          <p v-if="touched.product && !productValid" class="mt-1 text-xs text-red-600">
            Please choose an option.
          </p>
        </div>

        <!-- 🗓️ Date & Time -->
        <div>
          <label class="block font-medium text-sm mb-1">Preferred Date & Time*</label>
          <input
            type="datetime-local"
            v-model="form.dateTime"
            @blur="touched.dateTime = true"
            required
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p v-if="touched.dateTime && !dateTimeValid" class="mt-1 text-xs text-red-600">
            Please select a preferred date & time.
          </p>
        </div>

        <div>
          <label class="block font-medium text-sm mb-1">Number of Participants*</label>
          <input
            type="number"
            min="1"
            v-model.number="form.participants"
            @blur="touched.participants = true"
            required
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p v-if="touched.participants && !participantsValid" class="mt-1 text-xs text-red-600">
            Participants must be at least 1.
          </p>
        </div>

        <!-- 📝 Notes -->
        <div>
          <label class="block font-medium text-sm mb-1">Additional Notes</label>
          <textarea
            v-model="form.notes"
            rows="3"
            class="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Anything we should know?"
          />
        </div>

        <!-- CTA -->
        <button
          type="submit"
          :disabled="submitting || !allValid"
          class="w-full bg-[#447C9D] text-white px-4 py-2 rounded font-semibold hover:bg-[#376a86] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ submitting ? 'Submitting…' : 'Book Now' }}
        </button>

        <p v-if="toastMsg" class="mt-3 text-center text-sm" :class="toastOk ? 'text-green-700' : 'text-red-700'">
          {{ toastMsg }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRuntimeConfig } from '#imports'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
})

const form = reactive({
  name: '',
  email: '',
  product: '',
  dateTime: '',
  participants: 1,
  notes: '',
})

const touched = reactive({
  name: false,
  email: false,
  phone: false,
  product: false,
  dateTime: false,
  participants: false,
})

// Phone: use vue-tel-input ONLY for country picker (flag + dial code)
const countryModel = ref('')
const selectedCountryIso2 = ref('AE') // ✅ default UAE

const phoneNational = ref('') // digits only
const phoneParts = reactive({
  iso2: 'AE',
  countryCode: '+971',
  phone: '',
  phoneFull: '',
})

// Per-country digit rules (extend later if you want)
const minDigitsByIso2 = { AE: 9 }
const maxDigitsByIso2 = { AE: 9 }

const minDigits = computed(() => minDigitsByIso2[selectedCountryIso2.value] ?? 6)
const maxDigits = computed(() => maxDigitsByIso2[selectedCountryIso2.value] ?? 15)

const phonePlaceholder = computed(() => (selectedCountryIso2.value === 'AE' ? 'e.g. 55 507 1234' : 'Phone number'))

function syncPhoneParts() {
  const dialDigits = String(phoneParts.countryCode || '').replace(/\D/g, '')
  const nationalDigits = String(phoneNational.value || '').replace(/\D/g, '')
  phoneParts.phone = nationalDigits
  phoneParts.phoneFull = dialDigits && nationalDigits ? `+${dialDigits}${nationalDigits}` : ''
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

// Validations
const nameRe = /^[A-Za-z\u00C0-\u024F' -]{2,}$/
const emailRe = /.+@.+\..+/

const nameValid = computed(() => nameRe.test(String(form.name || '').trim()))
const emailValid = computed(() => emailRe.test(String(form.email || '').trim()))
const phoneValid = computed(() => {
  const digits = String(phoneNational.value || '').replace(/\D/g, '')
  if (!digits) return false
  return digits.length >= minDigits.value && digits.length <= maxDigits.value
})
const productValid = computed(() => Boolean(String(form.product || '').trim()))
const dateTimeValid = computed(() => Boolean(String(form.dateTime || '').trim()))
const participantsValid = computed(() => Number(form.participants || 0) >= 1)

const allValid = computed(() => nameValid.value && emailValid.value && phoneValid.value && productValid.value && dateTimeValid.value && participantsValid.value)

const submitting = ref(false)
const toastMsg = ref('')
const toastOk = ref(false)

const getBeaconUrl = () => String(useRuntimeConfig().public?.activitiesBeaconUrl || '').trim()

async function submitForm() {
  toastMsg.value = ''
  toastOk.value = false

  // mark all touched so errors show
  touched.name = true
  touched.email = true
  touched.phone = true
  touched.product = true
  touched.dateTime = true
  touched.participants = true

  if (!allValid.value) {
    toastMsg.value = 'Please check the highlighted fields and try again.'
    toastOk.value = false
    return
  }

  const url = getBeaconUrl()
  if (!url) {
    toastMsg.value = 'Activities form is not configured yet.'
    toastOk.value = false
    return
  }

  submitting.value = true
  try {
    const payload = {
      name: String(form.name || '').trim(),
      email: String(form.email || '').trim(),
      countryCode: phoneParts.countryCode || '', // ✅ includes +
      phone: String(phoneParts.phone || ''),
      activityType: String(form.product || '').trim(),
      dateTime: String(form.dateTime || ''),
      participants: Number(form.participants || 1),
      notes: String(form.notes || ''),
      source: 'activities-form',
      ts: Date.now(),
    }

    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      // send as text/plain to avoid CORS/preflight issues
      const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' })
      navigator.sendBeacon(url, blob)
    } else {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        keepalive: true,
      })
    }

    toastOk.value = true
    toastMsg.value = 'We have reserved your spot and would be waiting for your welcome at the studio.'

    // Let the success toast be visible before the parent closes the modal
    setTimeout(() => {
      emitSubmitted()
    }, 3000)

    // Reset after a brief delay (so the toast remains visible)
    setTimeout(() => {
      // reset inputs (keep country selection)
      form.name = ''
      form.email = ''
      form.product = ''
      form.dateTime = ''
      form.participants = 1
      form.notes = ''
      phoneNational.value = ''
      syncPhoneParts()
    }, 3000)

  } catch (e) {
    console.warn('activities beacon failed', e)
    toastOk.value = false
    toastMsg.value = 'Could not submit right now. Please try again.'
  } finally {
    submitting.value = false
  }
}

// Small helper so we can emit without adding boilerplate everywhere
const emit = defineEmits(['close', 'submitted'])
function emitSubmitted() {
  emit('submitted')
}

onMounted(() => {
  syncPhoneParts()
})
</script>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
}

/* Make vue-tel-input match existing inputs */
:deep(.vue-tel-input) {
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 0.375rem;
  background: #fff;
  padding: 0;
  min-height: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
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
</style>
