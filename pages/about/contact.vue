<template>
  <section class="bg-[#f9f3eb]">
    <!-- Hero Image -->
    <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/products/meraki-hero.avif" alt="Contact Us Hero" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 class="text-3xl md:text-5xl font-bold uppercase">Contact Us</h1>
        <p class="max-w-2xl mt-4 text-base md:text-lg">
          Let’s bring your story to life. Reach out for custom art or collaboration.
        </p>
      </div>
    </div>

    <!-- Contact Form + Address -->
    <div class="max-w-6xl mx-auto py-12 px-4 grid md:grid-cols-2 gap-8">
      <!-- Form -->
      <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-2xl font-bold text-[#447c9d] mb-2">Get in Touch</h2>
        <p class="text-gray-700 mb-6">We’d love to hear about your project idea or question.</p>
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
              <input v-model="phone" required
                class="w-full border-b border-[#447c9d] focus:outline-none focus:border-black py-1 bg-transparent" />
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

          <div class="mt-6 flex gap-4">
            <button type="submit"
              class="bg-[#447c9d] text-white px-4 py-2 rounded hover:bg-black transition">Submit</button>
            <button type="button" @click="reset"
              class="border border-[#447c9d] text-[#447c9d] px-4 py-2 rounded hover:bg-[#447c9d] hover:text-white transition">Clear</button>
          </div>
        </form>
      </div>

      <!-- Address -->
      <div class="bg-[#1d1d1d] text-white shadow rounded-lg p-6 flex flex-col justify-between">
        <div>
          <h2 class="text-2xl font-bold mb-4">Address</h2>
          <p class="mb-2">Meraki Art Studio</p>
          <p>40, Goshi Warehouse Village</p>
          <p>Al Quoz 3, Dubai</p>
          <p class="mb-6">United Arab Emirates</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Meraki+Art+%26+Design+Studio,+Al+Quoz+-+Al+Quoz+Industrial+Area+3+-+Dubai"
            target="_blank" rel="noopener noreferrer"
            class="inline-block mt-2 text-[#447c9d] underline hover:text-white transition">
            Get Directions
          </a>

          <!-- Opening Hours -->
          <div class="mt-4 text-sm space-y-1">
            <div class="font-semibold mb-1">Opening Hours:</div>
            <div class="grid grid-cols-2 gap-x-6">
              <div v-for="(time, day) in timings" :key="day" class="contents">
                <span class="font-medium  ">{{ day }}</span>
                <span class="text-left">{{ time }}</span>
              </div>
            </div>
          </div>



          <div class="border-t border-gray-500 my-4"></div>
          <div class="mb-4">
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
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const company = ref('')
const designation = ref('')
const message = ref('')
const purpose = ref('')

const timings = {
  MON: '14:00-22:00',
  TUE: '14:00-22:00',
  WED: '14:00-22:00',
  THU: '14:00-22:00',
  FRI: '14:00-22:00',
  SAT: '10:00-22:00',
  SUN: '10:00-22:00'
}

const reset = () => {
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  phone.value = ''
  company.value = ''
  designation.value = ''
  message.value = ''
  purpose.value = ''
}

const submit = () => {
  alert('Form submitted! Thank you.')
  reset()
}
</script>
