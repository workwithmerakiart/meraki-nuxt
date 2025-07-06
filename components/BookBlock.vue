<template>
  <div class="bg-[#f87373] py-12 px-6 text-gray-800 relative overflow-hidden">
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
    >
      <!-- LEFT TEXT CONTENT -->
      <div class="space-y-6">
        <h1
          class="text-5xl sm:text-6xl font-extrabold text-[#3e3e62] leading-tight"
        >
          <span class="block">{{ title }}</span>
        </h1>

        <div
          class="flex items-center space-x-3 bg-white w-fit px-4 py-2 rounded-md shadow"
        >
          <CalendarIcon class="w-6 h-6 text-orange-500" />
          <span class="font-bold text-sm">On: {{ dateDisplay }}</span>
        </div>

        <div class="space-y-2">
          <div class="text-2xl font-bold text-[#1a1a1a]">
            {{ subtitle }}
          </div>
          <p><strong class="font-semibold">Date:</strong> {{ date }}</p>
          <p class="mt-3">
            <strong class="font-semibold">From:</strong> {{ time }}
          </p>
          <p class="mt-4">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- RIGHT IMAGE -->
      <div class="relative flex justify-center">
        <img
          :src="imageSrc"
          alt="SoulFusion Yoga"
          class="rounded-lg shadow-lg border border-gray-200 max-w-full"
        />

        <!-- BOOK NOW BUTTON -->
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-bottom-right"
        >
          <button
            class="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded-l-md shadow"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CalendarIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  title: String,
  subtitle: String,
  date: String,
  time: String,
  dateDisplay: String,
  description: String,
  imageSrc: String,
  buttonText: {
    type: String,
    default: "Book now",
  },
});
</script>

<style scoped>
div * {
  font-family: "Inter", sans-serif;
}
</style>
