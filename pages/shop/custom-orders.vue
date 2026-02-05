<template>
  <section class="bg-[#f9f3eb] text-black font-sans">
    <!-- Hero Image -->
    <div class="w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/custom/custom_hero.webp" alt="Custom Orders Hero" class="w-full h-full object-cover" />
    </div>

    <!-- Page Intro -->
    <div class="max-w-4xl mx-auto px-4 py-10 text-center">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
        Custom Orders at Meraki
      </h2>
      <p class="mt-4 text-base sm:text-lg text-gray-700">
        From one-of-a-kind keepsakes to large-scale art installations, we specialize in bringing your ideas to life. Every custom order is a creative collaboration between your vision and our craft.
      </p>
    </div>

    <!-- What we customize (refined, blended layout) -->
    <div class="max-w-6xl mx-auto px-4 pt-2 pb-10">
      <div class="rounded-2xl bg-white/60 backdrop-blur border border-black/5 shadow-sm p-6 md:p-10">
        <div class="text-center mb-6 md:mb-8">
          <h3 class="text-2xl md:text-3xl font-bold text-black">What we customize</h3>
        </div>

        <!-- Feature grid -->
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          <li class="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-white/70 border border-black/5">
            <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#447c9d]/10 text-[#447c9d]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M9 12.75 11.25 15 15 9.75"/><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clip-rule="evenodd"/></svg>
            </span>
            <span class="text-[#1a1a1a] text-base md:text-lg font-medium">Floral Resin Sculptures</span>
          </li>

          <li class="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-white/70 border border-black/5">
            <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#447c9d]/10 text-[#447c9d]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M9 12.75 11.25 15 15 9.75"/><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clip-rule="evenodd"/></svg>
            </span>
            <span class="text-[#1a1a1a] text-base md:text-lg font-medium">Large-Scale Canvas Art</span>
          </li>

          <li class="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-white/70 border border-black/5">
            <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#447c9d]/10 text-[#447c9d]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M9 12.75 11.25 15 15 9.75"/><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clip-rule="evenodd"/></svg>
            </span>
            <span class="text-[#1a1a1a] text-base md:text-lg font-medium">Corporate & Event Gifting</span>
          </li>

          <li class="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-white/70 border border-black/5">
            <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#447c9d]/10 text-[#447c9d]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M9 12.75 11.25 15 15 9.75"/><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clip-rule="evenodd"/></svg>
            </span>
            <span class="text-[#1a1a1a] text-base md:text-lg font-medium">Resin Décor Sets</span>
          </li>

          <li class="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-white/70 border border-black/5 sm:col-span-2 lg:col-span-1">
            <span class="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#447c9d]/10 text-[#447c9d]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path d="M9 12.75 11.25 15 15 9.75"/><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clip-rule="evenodd"/></svg>
            </span>
            <span class="text-[#1a1a1a] text-base md:text-lg font-medium">Installations & Murals</span>
          </li>
        </ul>

        <p class="mt-6 md:mt-8 text-center text-gray-700 text-sm md:text-base">
          Every order is thoughtfully designed, color-coordinated, and beautifully finished.
        </p>
      </div>
    </div>

    <!-- Alternating Product Blocks -->
    <div class="max-w-6xl mx-auto px-4 py-8 pb-12 space-y-16">
      <div v-for="(item, index) in customOrders" :key="item.id" class="flex flex-col md:flex-row items-center gap-8"
        :class="{ 'md:flex-row-reverse': index % 2 === 1 }">
        <!-- Image -->
        <div class="md:w-1/2 w-full overflow-hidden rounded-lg shadow">
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
        </div>

        <!-- Text -->
        <div class="md:w-1/2 w-full">
          <h3 class="text-xl sm:text-2xl font-bold mb-2">{{ item.title }}</h3>
          <p class="text-gray-700 mb-4">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Block Five: Image Carousel -->
    <div class="bg-[#f9f3eb] py-12 px-4">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#dd4912]">Your Stories, Our Craft</h2>
      <Carousel :images="pastProjects" />
    </div>

    <!-- CTA Section -->
    <div class="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
      <h3 class="text-2xl sm:text-3xl font-bold">💌 Ready to Create Something Special?</h3>
      <p class="text-base sm:text-lg text-gray-700">
        We’d love to bring your custom idea to life.
      </p>
      <button @click="openModal"
        class="inline-block border border-black text-black px-4 py-2 rounded hover:bg-[#447c9d] hover:text-white transition">
        Submit a Custom Order Inquiry
      </button>
    </div>

    <!-- Modal Overlay -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh]">
          <button @click="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black">
            ✕
          </button>
          <h3 class="text-2xl font-bold mb-2 text-center">📝 Request a Custom Quote</h3>
          <p class="text-center text-gray-700 mb-4">
            Let’s turn your vision into a beautiful reality. Fill out the form below and our team will get back to you
            with a tailored quote within 24–48 hours.
          </p>
          <form class="space-y-4" @submit.prevent="submitCustomOrder">
            <div>
              <label class="block text-sm font-medium mb-1">Name:</label>
              <input
                v-model.trim="form.name"
                @blur="touched.name = true"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="Your full name"
                required
              />
              <p v-if="touched.name && !nameValid" class="mt-1 text-xs text-red-600">
                Enter your full name (letters, spaces, ' and - only).
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Email Address:</label>
              <input
                v-model.trim="form.email"
                @blur="touched.email = true"
                type="email"
                class="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="you@example.com"
                required
              />
              <p v-if="touched.email && !emailValid" class="mt-1 text-xs text-red-600">
                Enter a valid email address.
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Phone Number (optional):</label>

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
                    @blur="touched.phone = true"
                    @country-changed="onCountryChanged"
                  />
                </div>

                <!-- National digits -->
                <div class="flex-1">
                  <input
                    v-model.trim="phoneNational"
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
                Enter a valid phone number ({{ minDigits }}–{{ maxDigits }} digits), or leave it blank.
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Type of Custom Order:</label>
              <select v-model="form.customOrderType" class="w-full border border-gray-300 rounded px-3 py-2">
                <option>Floral Resin Preservation</option>
                <option>Large Canvas Artwork</option>
                <option>Resin Gifting (Bulk Orders)</option>
                <option>Wall Murals / Installations</option>
                <option>Tray & Coaster Sets</option>
                <option>Other (please describe)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Preferred Quantity (if applicable):</label>
              <input v-model.trim="form.quantity" type="text" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Deadline (if any):</label>
              <input v-model="form.date" type="date" class="w-full border border-gray-300 rounded px-3 py-2" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Upload Reference Images (optional):</label>
              <input type="file" multiple class="w-full border border-gray-300 rounded px-3 py-2" />
              <p class="text-xs text-gray-500 mt-1">Max 3 files.</p>
              <p class="text-xs text-gray-500 mt-1">Note: uploads are not submitted via this form yet — we’ll request them on WhatsApp/email if needed.</p>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Additional Notes or Specific Requests:</label>
              <textarea v-model.trim="form.notes" rows="4" class="w-full border border-gray-300 rounded px-3 py-2"></textarea>
            </div>

            <button
              type="submit"
              :disabled="submitting || !allValid"
              class="w-full bg-[#447c9d] text-white rounded py-2 font-medium hover:bg-[#365f7e] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Submitting…' : 'Submit Request' }}
            </button>

            <p v-if="toastMsg" class="text-center text-sm mt-2" :class="toastOk ? 'text-green-700' : 'text-red-700'">
              {{ toastMsg }}
            </p>

            <p class="text-xs text-gray-500 text-center">
              💌 We’ll be in touch soon to bring your idea to life.
            </p>
          </form>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { useRuntimeConfig } from '#imports'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const showModal = ref(false)

function resetFormState() {
  // reset validation/toast state
  touched.name = false
  touched.email = false
  touched.phone = false
  toastMsg.value = ''
  toastOk.value = false
  submitting.value = false

  // reset fields (keep default order type)
  form.name = ''
  form.email = ''
  form.customOrderType = 'Floral Resin Preservation'
  form.quantity = ''
  form.date = ''
  form.notes = ''

  // reset phone (keep default country)
  phoneNational.value = ''
  selectedCountryIso2.value = 'AE'
  phoneParts.iso2 = 'AE'
  phoneParts.countryCode = '+971'
  phoneParts.phone = ''
  countryModel.value = ''
  syncPhoneParts()
}

function openModal() {
  resetFormState()
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  // ensure that if the modal is reopened it doesn't show old validation/toast
  // and doesn't keep previous values
  resetFormState()
}

const cfg = useRuntimeConfig()
const getBeaconUrl = () => String(cfg.public?.customOrdersBeaconUrl || '').trim()

const submitting = ref(false)
const toastMsg = ref('')
const toastOk = ref(false)

const form = reactive({
  name: '',
  email: '',
  customOrderType: 'Floral Resin Preservation',
  quantity: '',
  date: '',
  notes: '',
})

const touched = reactive({
  name: false,
  email: false,
  phone: false,
})

// Phone: vue-tel-input used ONLY for country picker (all nations), default UAE
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
  const dialDigits = String(phoneParts.countryCode || '').replace(/\D/g, '')
  const nationalDigits = String(phoneNational.value || '').replace(/\D/g, '')
  phoneParts.phone = nationalDigits
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

// Validations
const nameRe = /^[A-Za-z\u00C0-\u024F' -]{2,}$/
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const nameValid = computed(() => nameRe.test(String(form.name || '').trim()))
const emailValid = computed(() => emailRe.test(String(form.email || '').trim()))

// Phone is optional. If present, must be within digit bounds.
const phoneValid = computed(() => {
  const digits = String(phoneNational.value || '').replace(/\D/g, '')
  if (!digits) return true
  return digits.length >= minDigits.value && digits.length <= maxDigits.value
})

const allValid = computed(() => nameValid.value && emailValid.value && phoneValid.value)

async function submitCustomOrder() {
  toastMsg.value = ''
  toastOk.value = false

  if (submitting.value) return

  touched.name = true
  touched.email = true
  touched.phone = true

  if (!allValid.value) {
    toastMsg.value = 'Please check the highlighted fields and try again.'
    toastOk.value = false
    return
  }

  const url = getBeaconUrl()
  if (!url) {
    toastMsg.value = 'Custom orders form is not configured yet.'
    toastOk.value = false
    return
  }

  submitting.value = true
  try {
    syncPhoneParts()

    const payload = {
      name: String(form.name || '').trim(),
      email: String(form.email || '').trim(),

      // Send clean +971 (NO apostrophe here). Apps Script will force text formatting.
      countryCode: String(phoneParts.countryCode || '').trim(),
      phone: String(phoneParts.phone || '').trim(),

      customOrderType: String(form.customOrderType || '').trim(),
      quantity: String(form.quantity || '').trim(),
      date: String(form.date || '').trim(),
      notes: String(form.notes || '').trim(),

      source: 'custom-orders',
      ts: Date.now(),
    }

    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
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
    toastMsg.value = 'Request submitted. We’ll get back to you within 24–48 hours.'

    // close modal after a short delay so user can see confirmation
    setTimeout(() => {
      closeModal()
    }, 2000)
  } catch (e) {
    console.warn('custom-orders beacon failed', e)
    toastOk.value = false
    toastMsg.value = 'Could not submit right now. Please try again.'
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  syncPhoneParts()
  selectedCountryIso2.value = 'AE'
})

const customOrders = ref([
  {
    id: 1,
    title: 'Floral Resin Sculptures',
    description: 'Preserve special moments (like bridal bouquets) in elegant resin art.',
    image: '/images/custom/custom_flora.webp'
  },
  {
    id: 2,
    title: 'Large-Scale Canvas Art',
    description: 'Made-to-measure paintings for homes, offices, and interiors.',
    image: '/images/custom/custom_large_scale.webp'
  },
  {
    id: 3,
    title: 'Corporate & Event Gifting',
    description: 'Bulk orders of resin coasters, trays, and keepsakes for 50–500+ pieces.',
    image: '/images/activities/corporate.webp'
  },
  {
    id: 4,
    title: 'Resin Décor Sets',
    description: 'Personalized trays, coasters, clocks, and wall art collections.',
    image: '/images/activities/resin-decor.avif'
  },
  {
    id: 5,
    title: 'Installations & Murals',
    description: 'Custom-designed for showrooms, cafés, salons, and creative spaces.',
    image: '/images/activities/murals.webp'
  }
])

const pastProjects = [
  '/images/custom/custom_large_scale.webp',
  '/images/custom/custom_flora.webp',
  '/images/custom/1.jpeg',
  '/images/custom/2.jpeg',
  '/images/custom/3.jpeg',
  '/images/custom/4.jpeg',
  '/images/custom/5.jpeg',
  '/images/custom/6.jpeg',
  '/images/custom/7.jpeg',
  '/images/custom/8.jpeg',
  '/images/custom/9.jpeg',
  '/images/custom/10.jpeg',
  '/images/custom/11.jpeg'
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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

/* Ensure dropdown list appears above modal */
:deep(.vti__dropdown-list) {
  z-index: 9999 !important;
}
</style>
