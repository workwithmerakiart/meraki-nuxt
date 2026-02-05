<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue'
import { useRuntimeConfig } from '#imports'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const props = defineProps({
  // Optional: you can still pass a URL from the page.
  // If not provided, we'll use NUXT_PUBLIC_FRANCHISE_BEACON_URL via runtimeConfig.
  endpoint: { type: String, required: false, default: '' },
})

const cfg = useRuntimeConfig()
const getBeaconUrl = () => String(props.endpoint || cfg.public?.franchiseBeaconUrl || '').trim()

const form = ref({
  name: '',
  email: '',
  desired_market: '',
  referral: '',
  source: 'franchise-form', // optional meta
})

// --- Phone: vue-tel-input for country (flag + dial code), and separate national digits input
const countryModel = ref('')
const selectedCountryIso2 = ref('AE') // default UAE
const phoneNational = ref('')

const phoneParts = reactive({
  iso2: 'AE',
  countryCode: '+971',
  phone: '',
})

// Per-country digit rules (extend as needed)
const minDigitsByIso2 = { AE: 9 }
const maxDigitsByIso2 = { AE: 9 }

const minDigits = computed(() => minDigitsByIso2[selectedCountryIso2.value] ?? 6)
const maxDigits = computed(() => maxDigitsByIso2[selectedCountryIso2.value] ?? 15)

const phonePlaceholder = computed(() =>
  selectedCountryIso2.value === 'AE' ? 'e.g. 55 507 1234' : 'Phone number'
)

function syncPhoneParts() {
  const dialDigits = String(phoneParts.countryCode || '').replace(/\D/g, '')
  const nationalDigits = String(phoneNational.value || '').replace(/\D/g, '')
  phoneParts.phone = nationalDigits
  // keep countryCode as +<dial>
  phoneParts.countryCode = dialDigits ? `+${dialDigits}` : ''
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

onMounted(() => {
  syncPhoneParts()
})

const sending = ref(false)
const sent = ref(false)
const error = ref('')

watch(
  () => ({ ...form.value }),
  () => {
    if (sent.value) sent.value = false
    if (error.value) error.value = ''
  },
  { deep: true }
)

async function submit() {
  error.value = ''
  sent.value = false

  const name = String(form.value.name || '').trim()
  const email = String(form.value.email || '').trim()

  if (!name || !email) {
    error.value = 'Please fill the required fields.'
    return
  }

  // Validate phone digits against country rules
  const digits = String(phoneNational.value || '').replace(/[^0-9]/g, '')
  if (!digits || digits.length < minDigits.value || digits.length > maxDigits.value) {
    error.value = `Please enter a valid phone number (${minDigits.value}–${maxDigits.value} digits).`
    return
  }

  // Ensure phoneParts synced
  syncPhoneParts()
  const countryCode = String(phoneParts.countryCode || '').trim()
  const phone = String(phoneParts.phone || '').trim()
  if (!countryCode || !phone) {
    error.value = 'Please enter a valid phone number.'
    return
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    error.value = 'Enter a valid email address.'
    return
  }

  const url = getBeaconUrl()
  if (!url) {
    error.value = 'Franchise form is not configured yet.'
    return
  }

  sending.value = true
  try {
    const payload = {
      kind: 'franchise',
      source: 'franchise-form',
      name,
      email,
      countryCode, // e.g. +971
      phone,       // digits only
      desiredMarket: String(form.value.desired_market || '').trim(),
      referral: String(form.value.referral || '').trim(),
      ts: Date.now(),
    }

    // Prefer sendBeacon for reliability and to avoid CORS/preflight issues
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' })
      const ok = navigator.sendBeacon(url, blob)
      if (!ok) throw new Error('sendBeacon failed')
    } else {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        keepalive: true,
      })
    }

    sent.value = true
    // Do not clear inputs immediately; keep values visible for UX.
    // If you later want to clear after a delay, we can add it.
  } catch (e) {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    sending.value = false
  }
}
</script>

<template>
    <form @submit.prevent="submit" class="mt-10 max-w-3xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Name -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-neutral-700">Name<span
                        class="text-red-500">*</span></label>
                <input v-model="form.name" required autocomplete="name" placeholder="Your full name" class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                      focus:border-[var(--meraki-primary)] focus:ring-0" />
            </div>

            <!-- Mobile -->
            <div>
                <label class="block text-sm font-medium text-neutral-700">Mobile<span class="text-red-500">*</span></label>

                <div class="mt-2 flex w-full gap-3">
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
                          @country-changed="onCountryChanged"
                        />
                    </div>

                    <!-- National digits -->
                    <div class="flex-1">
                        <input
                          v-model.trim="phoneNational"
                          required
                          type="tel"
                          inputmode="numeric"
                          autocomplete="tel-national"
                          :placeholder="phonePlaceholder"
                          class="block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                            focus:border-[var(--meraki-primary)] focus:ring-0" />
                    </div>
                </div>
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-medium text-neutral-700">Email<span
                        class="text-red-500">*</span></label>
                <input v-model="form.email" required type="email" autocomplete="email" placeholder="you@company.com"
                    class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                      focus:border-[var(--meraki-primary)] focus:ring-0" />
            </div>

            <!-- Desired Market -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-neutral-700">Desired Market</label>
                <input v-model="form.desired_market" placeholder="City / Country" class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                      focus:border-[var(--meraki-primary)] focus:ring-0" />
            </div>

            <!-- Referral -->
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-neutral-700">How did you hear about us?</label>
                <textarea v-model="form.referral" rows="3" placeholder="Instagram, referral, press, event…" class="mt-2 block w-full border-0 border-b border-neutral-300 bg-transparent px-0 py-3
                         focus:border-[var(--meraki-primary)] focus:ring-0 resize-y"></textarea>
            </div>
        </div>

        <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
        <p v-if="sent" class="mt-4 text-sm text-emerald-700">Thanks! We’ve received your inquiry.</p>

        <div class="mt-8">
            <button type="submit" :disabled="sending" class="w-full md:w-auto inline-flex justify-center rounded-2xl px-6 py-3 font-medium
                     bg-[var(--meraki-primary)] text-white disabled:opacity-60 disabled:cursor-not-allowed
                     hover:bg-[color-mix(in_oklab,var(--meraki-primary),#000_10%)]">
                {{ sending ? 'Submitting…' : 'Apply for Franchise' }}
            </button>
        </div>
    </form>
</template>

<style scoped>
/* Make vue-tel-input match existing inputs */
:deep(.vue-tel-input) {
  border: 0;
  border-bottom: 1px solid #d4d4d4; /* neutral-300 */
  border-radius: 0;
  background: transparent;
  padding: 0;
  min-height: 3rem;
  height: 3rem;
  display: flex;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;
}

:deep(.vue-tel-input .vti__dropdown) {
  border-right: 1px solid rgba(0,0,0,0.06);
  padding: 0 0.75rem;
  height: 100%;
  display: flex;
  align-items: center;
}

:deep(.vue-tel-input input) {
  display: none !important; /* country-only mode hides internal input */
}

:deep(.vti__dropdown-list) {
  z-index: 9999 !important;
}
</style>
