<template>
  <div
    class="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
    style="background-image: url('https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
  >
    <div class="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-100">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Title & Description -->
        <div class="md:col-span-2">
          <h2 class="text-3xl font-extrabold text-gray-800 tracking-tight">
            Secure Your Spot in This Upcoming Workshop
          </h2>
          <p class="text-gray-600 mt-2 text-base leading-relaxed">
            Please complete the form below. We'll reserve your seat and follow up with confirmation and payment details.
          </p>
        </div>
        
        <!-- Full Name -->
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Full Name <span class="text-red-500">*</span></label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Your full name"
            class="w-full py-3.5 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white shadow-sm transition-all duration-200 focus:outline-none hover:shadow-md"
          />
          <p v-if="errors.name" class="text-red-500 text-xs mt-2">{{ errors.name }}</p>
        </div>
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email Address <span class="text-red-500">*</span></label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            class="w-full py-3.5 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white shadow-sm transition-all duration-200 focus:outline-none hover:shadow-md"
          />
          <p v-if="errors.email" class="text-red-500 text-xs mt-2">{{ errors.email }}</p>
        </div>
        
        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number <span class="text-red-500">*</span></label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+91 9876543210"
            class="w-full py-3.5 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white shadow-sm transition-all duration-200 focus:outline-none hover:shadow-md"
          />
          <p v-if="errors.phone" class="text-red-500 text-xs mt-2">{{ errors.phone }}</p>
        </div>
        
        <!-- Buttons -->
        <div class="md:col-span-2 flex gap-4 mt-6">
          <button
            type="button"
            @click="submitForm"
            class="px-7 py-3.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5"
          >
            SUBMIT
          </button>
          <button
            type="button"
            @click="clearForm"
            class="px-7 py-3.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg shadow-sm text-sm font-medium transition-all duration-200"
          >
            CLEAR
          </button>
        </div>
        
        <!-- Success Message -->
        <div class="md:col-span-2 text-center">
          <p v-if="submitted" class="text-green-600 font-medium mt-4 text-sm bg-green-50 py-2 px-4 rounded-lg inline-block">
            🎉 Form submitted successfully!
          </p>
        </div>
      </div>
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

<style scoped>
div * {
  font-family: 'Inter', sans-serif;
}
</style>