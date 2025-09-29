<template>
  <section class="bg-[#f9f3eb] text-black font-sans">
    <!-- Block 1: Hero -->
    <ExperiencesBlockOne v-bind="blockOneData" />

    <!-- Block 2: Intro -->
    <div class="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold">Why Choose Art-Filled Events?</h2>
          <p class="mt-4 text-gray-700">
            Art brings people together—and at Meraki, every event becomes a memorable experience.
            From birthdays to corporate activations, we offer curated, creative celebrations filled with
            color, connection, and joy—right here in Dubai.
          </p>
        </div>
        <div class="overflow-hidden rounded-xl shadow">
          <img src="/images/events/events_block2.webp" alt="Why Choose Art-Filled Events"
            class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Blocks 3–7: Event Types -->
    <div class="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-16">
      <div v-for="(ev, index) in events" :key="ev.id"
        class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
        :class="index % 2 === 1 ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''">
        <!-- Text rail -->
        <div>
          <h3 class="text-2xl md:text-3xl font-bold leading-tight">{{ ev.heading }}</h3>
          <p v-if="ev.body" class="mt-3 text-gray-700">{{ ev.body }}</p>

          <!-- Section bullets -->
          <div v-for="(sec, si) in ev.sections" :key="si" class="mt-6">
            <p class="font-semibold">{{ sec.title }}</p>
            <ul class="mt-2 list-disc pl-5 text-gray-700 space-y-1">
              <li v-for="(li, lii) in sec.items" :key="lii">{{ li }}</li>
            </ul>
          </div>

          <p v-if="ev.foot" class="mt-4 text-gray-700">{{ ev.foot }}</p>

          <!-- CTA link -->
          <div v-if="ev.cta" class="mt-6">
            <a :href="ev.cta.href" target="_blank" rel="noopener"
              class="inline-flex items-center gap-2 text-[#dd4912] font-medium hover:underline">
              {{ ev.cta.label }}
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-4 h-4">
                <path fill-rule="evenodd"
                  d="M13.72 3.72a.75.75 0 011.06 0l6.5 6.5a.75.75 0 010 1.06l-6.5 6.5a.75.75 0 11-1.06-1.06L18.94 12l-5.22-5.22a.75.75 0 010-1.06z"
                  clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M3 12a.75.75 0 01.75-.75h16.69a.75.75 0 010 1.5H3.75A.75.75 0 013 12z"
                  clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Image rail -->
        <div class="overflow-hidden rounded-xl shadow">
          <img :src="ev.image" :alt="ev.heading" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
    <!-- Block 8: CTA -->
    <div class="max-w-3xl mx-auto px-4 md:px-6 py-14 text-center">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold">
        Ready to Create an Unforgettable Event?
      </h2>
      <p class="mt-3 text-gray-700">
        Let’s bring your vision to life with elegance and artistry.<br class="hidden sm:block">
        Share a few details with us, and our dedicated events team will design an extraordinary celebration tailored to
        you.
      </p>
      <button @click="openModal"
        class="mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 border border-black text-black hover:bg-[#447c9d] hover:text-white transition">
        👉 Enquire Now
      </button>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        @keydown.esc="closeModal">
        <div class="bg-white w-full max-w-2xl rounded-xl shadow-xl overflow-hidden" role="dialog" aria-modal="true"
          aria-labelledby="events-form-title">
          <!-- Header -->
          <div class="flex items-start justify-between px-6 py-4 border-b">
            <div>
              <h3 id="events-form-title" class="text-xl md:text-2xl font-bold">
                Events Inquiry Form
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                Let’s create an unforgettable experience together. Share a few details and our team will get in touch.
              </p>
            </div>
            <button class="ml-4 text-gray-500 hover:text-black" @click="closeModal" aria-label="Close">
              ✕
            </button>
          </div>

          <!-- Body -->
          <form class="px-6 py-5 space-y-4" @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Name <span class="text-red-600">*</span></label>
                <input v-model.trim="form.name" type="text" class="w-full border rounded px-3 py-2"
                  :class="invalid.name && 'border-red-500'" required />
                <p v-if="invalid.name" class="text-xs text-red-600 mt-1">Please enter your name.</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Email <span class="text-red-600">*</span></label>
                <input v-model.trim="form.email" type="email" class="w-full border rounded px-3 py-2"
                  :class="invalid.email && 'border-red-500'" required />
                <p v-if="invalid.email" class="text-xs text-red-600 mt-1">Enter a valid email.</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Phone <span class="text-red-600">*</span></label>
                <input v-model.trim="form.phone" type="tel" class="w-full border rounded px-3 py-2"
                  :class="invalid.phone && 'border-red-500'" required />
                <p v-if="invalid.phone" class="text-xs text-red-600 mt-1">Please add a phone number.</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Type of Event <span class="text-red-600">*</span></label>
                <select v-model="form.type" class="w-full border rounded px-3 py-2"
                  :class="invalid.type && 'border-red-500'" required>
                  <option disabled value="">Select an event type</option>
                  <option>Birthday</option>
                  <option>Corporate Gathering</option>
                  <option>School Field Trip</option>
                  <option>Baby Shower / Bridal Shower</option>
                  <option>Other</option>
                </select>
                <p v-if="invalid.type" class="text-xs text-red-600 mt-1">Please choose an event type.</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Preferred Date (optional)</label>
                <input v-model="form.date" type="date" class="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Number of Guests (Approx.)</label>
                <input v-model.trim="form.guests" type="number" min="1" class="w-full border rounded px-3 py-2" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1">Location Preference</label>
                <select v-model="form.location" class="w-full border rounded px-3 py-2">
                  <option disabled value="">Select a location preference</option>
                  <option>At Meraki Studio</option>
                  <option>At My Venue</option>
                  <option>Undecided</option>
                </select>
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium mb-1">Additional Notes or Requests</label>
                <textarea v-model.trim="form.notes" rows="3" class="w-full border rounded px-3 py-2"></textarea>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-end gap-3 pt-2 border-t mt-4">
              <button type="button" class="px-4 py-2 rounded border" @click="closeModal">Cancel</button>
              <button type="submit"
                class="px-5 py-2.5 rounded bg-[#447c9d] text-white hover:bg-[#365f7e] disabled:opacity-60"
                :disabled="submitting">
                {{ submitting ? 'Sending…' : 'Submit Inquiry' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>

const blockOneData = {
  image: "/images/events/events_hero.webp",
  title: "Events",
  description:
    "At Meraki, every event is thoughtfully curated to feel personal, joyful, and beautifully designed for the crème de la crème of Dubai.",
}

const events = [
  {
    id: 3,
    heading: "Bespoke Birthday Parties",
    body:
      "At Meraki, birthdays become immersive art adventures, designed with intention and flair. From neon slime to fluid art and resin pouring, every experience is customized to reflect your child’s unique personality and creative spirit.",
    sections: [
      {
        title: "What’s Included:",
        items: [
          "Curated art activity with premium materials",
          "Private studio setup with guided session",
          "Dedicated party host and event manager",
          "Personalized decor and welcome signage",
        ],
      },
      {
        title: "Optional Add-Ons:",
        items: [
          "Gourmet catering or live food stations",
          "Themed designer cakes & desserts",
          "Entertainers, interactive games & activities",
          "Professional photography services",
          "Custom return gifts & luxe party favors",
        ],
      },
    ],
    foot: "Perfect for ages 5+, teens, and even adults.",
    cta: { label: "Download Birthday Brochure", href: "/brochures/meraki-birthday.pdf" },
    image: "/images/events/birthdays.webp",
  },
  {
    id: 4,
    heading: "Signature Corporate Events",
    body:
      "Meraki specializes in designing premium, brand-aligned creative events. From intimate team workshops to large-scale brand launches, we’ve partnered with brands like Dior, Loewe, Bvlgari, Rolex, P&G, Medtronic & more to deliver artful experiences that engage, inspire, and elevate your corporate storytelling.",
    sections: [
      {
        title: "What We Offer:",
        items: [
          "In-studio or on-site activations",
          "Fully customizable art sessions",
          "Bespoke team-building experiences",
          "Personalized corporate gifting solutions",
          "Branded decor, signage & event styling",
          "Gourmet catering & curated beverage options",
          "Professional photography & videography",
        ],
      },
    ],
    image: "/images/events/corporate.webp",
  },
  {
    id: 5,
    heading: "School Field Trips",
    body:
      "Our field trips offer a seamless blend of fun and foundational art learning. With expertly guided sessions in neon slime, resin art, and fluid painting, students of all ages experience hands-on, engaging, and meaningful artistic exploration.",
    sections: [
      {
        title: "What’s Included:",
        items: [
          "Age-appropriate, curated art activities",
          "Structured, expertly guided sessions",
          "Safe, inspiring studio environment",
          "Smooth group coordination for classes",
          "Optional gourmet snack/lunch add-ons",
        ],
      },
    ],
    image: "/images/events/school.webp",
  },
  {
    id: 6,
    heading: "Private Celebrations",
    body:
      "Baby showers to bridal brunches, anniversaries to intimate soirées, Meraki crafts refined, personalized art experiences tailored to your vision. Host in our sophisticated Dubai studio or let us bring the Meraki experience to your chosen venue.",
    sections: [
      {
        title: "We Offer:",
        items: [
          "Bespoke art themes (resin, neon, painting, and more)",
          "Custom setups and elegant decor (in-studio or at your venue)",
          "Premium catering & dessert options",
          "Experienced hosts, entertainers & creative add-ons",
          "Take-home art pieces & luxurious party favors",
        ],
      },
    ],
    image: "/images/events/private.webp",
  },
  {
    id: 7,
    heading: "Rent a space with us",
    body:
      "An intimate workshop, a pop-up exhibition, or a community gathering — Meraki’s curated studio spaces offer rental options designed for creators, educators, and hosts. All rentals include access to essential amenities and a team ready to support your setup.",
    sections: [],
    cta: { label: "Download Rental Brochure", href: "/brochures/meraki-rental.pdf" },
    image: "/images/events/rental.webp",
  },
]

import { ref, reactive } from 'vue'

const showModal = ref(false)
const submitting = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  type: '',
  date: '',
  guests: '',
  location: '',
  notes: ''
})

const invalid = reactive({
  name: false,
  email: false,
  phone: false,
  type: false
})

function resetValidation() {
  invalid.name = invalid.email = invalid.phone = invalid.type = false
}

function validate() {
  resetValidation()
  let ok = true
  if (!form.name) { invalid.name = true; ok = false }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { invalid.email = true; ok = false }
  if (!form.phone) { invalid.phone = true; ok = false }
  if (!form.type) { invalid.type = true; ok = false }
  return ok
}

function openModal() {
  showModal.value = true
  // optional: focus first input after modal open
  setTimeout(() => {
    const el = document.querySelector('#events-form-title')?.closest('[role="dialog"]')?.querySelector('input, select, textarea')
    el && el.focus?.()
  }, 50)
}

function closeModal() {
  showModal.value = false
}

async function submitForm() {
  if (!validate()) return
  submitting.value = true

  try {
    // TODO: replace with your real submission (API, email service, etc.)
    console.log('Events inquiry payload:', { ...form })

    // simple UX: close + toast/alert
    closeModal()
    alert('Thanks! Your events inquiry has been submitted. We’ll get back to you shortly.')
    // reset form (optional)
    Object.keys(form).forEach(k => (form[k] = ''))
  } catch (e) {
    alert('Sorry, something went wrong. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>