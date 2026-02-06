<template>
    <section class="bg-[#F9F3EB] py-16 text-center relative">
        <div class="max-w-3xl mx-auto px-6">
            <h2 class="text-3xl md:text-4xl font-bold text-black mb-4">
                Reserve Your Art Experience
            </h2>
            <p class="text-gray-700 text-lg mb-8">
                Let us design a personalized, inspiring workshop just for you. Enjoy creative luxury in our Dubai
                studio,
                tailored to your style, vision, and occasion.
            </p>
            <button @click="openForm"
                class="bg-[#DD4912] text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-[#c44110] transition-all">
                👉 Enquire Now
            </button>
        </div>

        <!-- Popup Modal -->
        <Transition name="fade">
            <div v-if="showForm" class="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
                @click.self="closeForm">
                <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fadeIn" role="dialog"
                    aria-modal="true" aria-label="Workshop enquiry form">
                    <!-- Close Button -->
                    <button @click="closeForm" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                        aria-label="Close dialog">
                        ✕
                    </button>

                    <!-- Form Heading -->
                    <h3 class="text-2xl font-bold mb-6 text-center">
                        Sounds exciting, right? Enquire to learn more about our workshops.
                    </h3>

                    <!-- Form -->
                    <form @submit.prevent="handleSubmit" class="space-y-5">
                        <div>
                            <label class="block text-left text-sm font-medium text-gray-700 mb-1">
                                Full Name*
                            </label>
                            <input v-model.trim="form.name" type="text" required
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DD4912]" />
                            <p v-if="errors.name" class="mt-1 text-xs text-red-600">{{ errors.name }}</p>
                        </div>

                        <div>
                            <label class="block text-left text-sm font-medium text-gray-700 mb-1">
                                Email Address*
                            </label>
                            <input v-model.trim="form.email" type="email" required
                                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DD4912]" />
                            <p v-if="errors.email" class="mt-1 text-xs text-red-600">{{ errors.email }}</p>
                        </div>

                        <div>
                            <label class="block text-left text-sm font-medium text-gray-700 mb-1">
                                Phone Number*
                            </label>

                            <div class="flex w-full gap-3">
                                <!-- Country picker (flag + dial code only) -->
                                <div class="w-44 md:w-52 flex-shrink-0">
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
                                <div class="flex-1">
                                    <input
                                      v-model.trim="phoneNational"
                                      type="tel"
                                      inputmode="numeric"
                                      autocomplete="tel-national"
                                      required
                                      class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DD4912]"
                                      :placeholder="phonePlaceholder"
                                    />
                                </div>
                            </div>

                            <p v-if="errors.phone" class="mt-1 text-xs text-red-600">{{ errors.phone }}</p>
                        </div>

                        <button type="submit" :disabled="loading"
                            class="w-full bg-[#DD4912] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-md hover:bg-[#c44110] transition-all">
                            <span v-if="!loading">Submit</span>
                            <span v-else>Submitting…</span>
                        </button>
                    </form>
                </div>
            </div>
        </Transition>

        <!-- Floating toast (success or error) -->
        <Transition name="toast">
            <div
              v-if="toast.visible"
              :class="['fixed left-1/2 -translate-x-1/2 bottom-6 z-50 px-5 py-3 rounded-full shadow-lg text-sm md:text-base',
                       toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white']"
              role="status"
              aria-live="polite"
            >
              <span v-if="toast.type === 'success'">✅ Form submitted successfully! We will reach out to you soon.</span>
              <span v-else>⚠️ {{ toast.msg || 'Something went wrong. Please try again later.' }}</span>
            </div>
        </Transition>
    </section>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { useRuntimeConfig } from '#imports'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const cfg = useRuntimeConfig()

// Resolve URL at call-time (prevents stale/empty value during hydration)
const getBeaconUrl = () => String(cfg.public?.workshopsBeaconUrl || '').trim()

const showForm = ref(false)
const loading = ref(false)

// Toast state: { visible: boolean, type: 'success' | 'error', msg?: string }
const toast = ref({ visible: false, type: 'success', msg: '' })

// Field-level validation errors
const errors = ref({ name: '', email: '', phone: '' })

const form = ref({
  name: '',
  email: '',
})

// --- Phone: use vue-tel-input ONLY for country picker (flag + dial code)
const countryModel = ref('')
const selectedCountryIso2 = ref('AE')
const phoneNational = ref('')

const phoneParts = reactive({
  iso2: 'AE',
  countryCode: '+971',
  phone: '',
  phoneFull: '',
})

// Per-country digit rules (extend as needed)
const minDigitsByIso2 = { AE: 9 }
const maxDigitsByIso2 = { AE: 9 }

const minDigits = computed(() => minDigitsByIso2[selectedCountryIso2.value] ?? 7)
const maxDigits = computed(() => maxDigitsByIso2[selectedCountryIso2.value] ?? 15)

const phonePlaceholder = computed(() =>
  selectedCountryIso2.value === 'AE' ? 'e.g. 55 507 1234' : 'Phone number'
)

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

const openForm = () => {
  showForm.value = true
  errors.value = { name: '', email: '', phone: '' }
}

const closeForm = () => {
  showForm.value = false
}

const validate = () => {
  errors.value = { name: '', email: '', phone: '' }
  let ok = true

  // Name: required, at least 2 chars
  if (!form.value.name || form.value.name.trim().length < 2) {
    errors.value.name = 'Please enter your full name.'
    ok = false
  }

  // Email: basic pattern
  const email = form.value.email?.trim() || ''
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    errors.value.email = 'Please enter a valid email address.'
    ok = false
  }

  // Phone: min digits (country dependent)
  const digits = String(phoneNational.value || '').replace(/[^0-9]/g, '')
  if (digits.length < minDigits.value || digits.length > maxDigits.value) {
    errors.value.phone = `Please enter a valid phone number (${minDigits.value}–${maxDigits.value} digits).`
    ok = false
  }

  return ok
}

function showToast(type, msg = '') {
  toast.value = { visible: true, type, msg }
  setTimeout(() => {
    toast.value.visible = false
  }, 5000)
}

async function handleSubmit() {
  if (!validate()) return

  const url = getBeaconUrl()
  if (!url) {
    showToast('error', 'Workshops is not configured yet.')
    return
  }

  try {
    loading.value = true

    // Ensure phone parts are in sync
    syncPhoneParts()

    const payload = {
      name: String(form.value.name || '').trim(),
      email: String(form.value.email || '').trim(),

      // Sheet expects this column as "Currency Code" (we store dial code like +971)
      // Prefix with apostrophe so Google Sheets keeps the leading '+'
      currencyCode: phoneParts.countryCode || '',


      // Keep these for potential future use / debugging
      countryCode: phoneParts.countryCode || '',
      phone: phoneParts.phone || '',
      phoneFull: phoneParts.phoneFull || '',

      ts: Date.now(),
      source: 'workshops-cta',
    }

    // Prefer sendBeacon for reliability
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' })
      navigator.sendBeacon(url, blob)
    } else {
      // Avoid CORS preflight (Apps Script often doesn't handle OPTIONS)
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        keepalive: true,
      })
    }

    showForm.value = false
    showToast('success')

    // Reset
    form.value = { name: '', email: '' }
    phoneNational.value = ''
    errors.value = { name: '', email: '', phone: '' }
  } catch (e) {
    console.warn('workshops beacon failed', e)
    showToast('error', 'Could not submit right now. Please try again.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  syncPhoneParts()
})
</script>

<style scoped>
/* Modal fade */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0
}

/* Toast slide-up */
.toast-enter-active,
.toast-leave-active {
    transition: transform .35s ease, opacity .35s ease
}

.toast-enter-from {
    transform: translate(-50%, 20px);
    opacity: 0
}

.toast-leave-to {
    transform: translate(-50%, 20px);
    opacity: 0
}

.animate-fadeIn {
    animation: fadeIn .28s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(.97)
    }

    to {
        opacity: 1;
        transform: scale(1)
    }
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

:deep(.vue-tel-input:focus-within) {
  outline: 2px solid rgba(221, 73, 18, 0.25);
  outline-offset: 0px;
}

/* Left dropdown (flag + dial code) */
:deep(.vue-tel-input .vti__dropdown) {
  border-right: 1px solid #00000022;
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
</style>
