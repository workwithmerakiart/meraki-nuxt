<template>
  <div class="relative overflow-hidden bg-[#f96c6c] py-16 px-6 sm:px-14 font-sans">
    <!-- Splash SVG Top Right -->
    <img src="/images/splash.svg" alt="Splash" class="absolute top-0 right-0 w-28 sm:w-40 z-0 animate-paint-blob" />

    <!-- Splash SVG Bottom Right -->
    <img src="/images/splash.svg" alt="Splash" class="absolute bottom-0 right-0 w-40 sm:w-60 z-0 animate-paint-blob" />

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
      <!-- Left Text Content -->
      <div class="order-2 md:order-1 text-black text-left">
        <h1 class="text-4xl md:text-5xl font-extrabold text-[#2D2A45] leading-tight mb-4 tracking-tight">
          {{ title }}
        </h1>

        <!-- Date pill -->
        <div class="bg-white inline-flex items-center gap-2 px-4 py-2 rounded-xl shadow mb-6">
          <span class="text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          <span class="text-sm font-semibold">On: {{ dateShort }}</span>
        </div>

        <h2 class="text-lg font-bold mb-1 text-black">{{ subtitle }}</h2>
        <p class="text-sm"><span class="font-bold">Date:</span> {{ date }}</p>
        <p class="text-sm"><span class="font-bold">From:</span> {{ time }}</p>

        <p class="mt-4 text-base text-[#2e2e2e] leading-relaxed">
          {{ description }}
        </p>
      </div>

      <!-- Right Image -->
      <div class="order-1 md:order-2">
        <img :src="imageUrl" alt="Soulfusion Yoga" class="rounded-[2rem] shadow-xl w-full md:w-3/4 mx-auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  dateShort: String,
  subtitle: String,
  date: String,
  time: String,
  description: String,
  imageUrl: String,
});
</script>

<style scoped>
@keyframes paintBlob {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.05) rotate(3deg); }
}
.animate-paint-blob {
  animation: paintBlob 8s ease-in-out infinite;
  opacity: 0.9;
}
div * {
    font-family: "Inter", sans-serif;
}
</style>
