<template>
  <div>
    <!-- TOP SECTION with gray background -->
    <div class="bg-[#f6f6f6] px-4 md:px-10 py-12">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- LEFT COLUMN -->
        <div>
          <p class="uppercase text-sm tracking-widest text-gray-600 mb-2">Workshops</p>
          <h1 class="text-3xl md:text-4xl font-bold mb-2 text-black">{{ title }}</h1>
          <!-- price under title -->
          <div v-if="price" class="mb-6 flex items-center gap-2 text-[16px] font-semibold text-black">
            <span>{{ typeof price === 'number' ? `AED ${price}` : price }}</span>
            <span v-if="vat" class="text-sm text-gray-600">+ VAT</span>
          </div>

          <!-- Meta -->
          <div class="space-y-4 mb-6 text-[16px]">
            <div class="flex items-start">
              <component :is="calendarIcon" class="h-5 w-5 text-black mr-3 mt-1" />
              <span>{{ dates }}</span>
            </div>
            <div class="flex items-start">
              <component :is="clockIcon" class="h-5 w-5 text-black mr-3 mt-1" />
              <span>{{ time }}</span>
            </div>
            <div class="flex items-start">
              <component :is="locationIcon" class="h-5 w-5 text-black mr-3 mt-1" />
              <a href="#" class="underline hover:text-black">{{ location }}</a>
            </div>
          </div>

          <!-- Button -->
          <button
            class="bg-black text-white text-[13px] font-semibold uppercase px-4 py-2 tracking-wide hover:bg-[#333]">
            {{ registerText }}
          </button>
        </div>

        <!-- RIGHT IMAGE -->
        <div>
          <img :src="imageSrc" alt="Workshop" class="w-full h-auto object-cover mb-2 rounded-sm" />
          <p class="text-sm text-gray-600">{{ imageCaption }}</p>
        </div>
      </div>
    </div>

    <!-- BOTTOM WHITE SECTION for description -->
    <div class="bg-white px-4 md:px-6 py-12">
      <div class="max-w-3xl mx-auto prose prose-sm text-[15px] text-[#1a1a1a]">
        <div v-html="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/vue/24/outline';

defineProps({
  title: String,
  dates: String,
  time: String,
  location: String,
  price: [String, Number],
  vat: { type: Boolean, default: false },
  vatValue: { type: [Number, String], default: 0 },
  registerText: {
    type: String,
    default: 'Register',
  },
  imageSrc: String,
  imageCaption: String,
  content: String,
});

const calendarIcon = CalendarIcon;
const clockIcon = ClockIcon;
const locationIcon = MapPinIcon;
</script>

<style scoped>
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin: 0 0 1rem;
}

div * {
  font-family: "Inter", sans-serif;
}
</style>
