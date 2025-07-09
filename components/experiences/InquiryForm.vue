<template>
  <div
    class="min-h-screen bg-center bg-cover flex items-center justify-center px-4"
    style="background-image: url('https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
  >
    <div class="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-xl shadow-xl max-w-2xl w-full">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Title & Description -->
        <div class="md:col-span-2">
          <h2 class="text-3xl font-bold text-green-900">
            Secure Your Spot in This Upcoming Workshop
          </h2>
          <p class="text-gray-700 mt-1">
            Please complete the form below. We'll reserve your seat and follow up with confirmation and payment details.
          </p>
        </div>

        <!-- Full Name -->
        <div class="md:col-span-2">
          <label class="block text-sm text-gray-700 mb-1">👤 Full Name <span class="text-red-500">*</span></label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Your full name"
            class="w-full py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-green-800 text-sm bg-transparent"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm text-gray-700 mb-1">Email Address <span class="text-red-500">*</span></label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            class="w-full py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-green-800 text-sm bg-transparent"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm text-gray-700 mb-1">Phone Number <span class="text-red-500">*</span></label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+91 9876543210"
            class="w-full py-2 px-2 border-b border-gray-300 focus:outline-none focus:border-green-800 text-sm bg-transparent"
          />
          <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
        </div>

        <!-- Buttons -->
        <div class="md:col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            class="px-6 py-2 bg-green-800 hover:bg-green-900 text-white rounded shadow text-sm"
          >
            SUBMIT
          </button>
          <button
            type="button"
            @click="clearForm"
            class="px-6 py-2 border border-gray-300 text-gray-800 hover:bg-gray-100 rounded shadow text-sm"
          >
            CLEAR
          </button>
        </div>

        <!-- Success Message -->
        <div class="md:col-span-2 text-center">
          <p v-if="submitted" class="text-green-600 font-medium mt-4">
            🎉 Form submitted successfully!
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: ''
})

const submitted = ref(false)

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateForm() {
  errors.name = form.name ? '' : 'Full name is required.'
  errors.email = form.email
    ? validateEmail(form.email)
      ? ''
      : 'Enter a valid email.'
    : 'Email is required.'
  errors.phone = form.phone ? '' : 'Phone number is required.'
  return Object.values(errors).every(err => err === '')
}

function submitForm() {
  submitted.value = false
  if (validateForm()) {
    submitted.value = true
    clearForm()
  }
}

function clearForm() {
  form.name = ''
  form.email = ''
  form.phone = ''
  Object.keys(errors).forEach(key => (errors[key] = ''))
}
</script>
