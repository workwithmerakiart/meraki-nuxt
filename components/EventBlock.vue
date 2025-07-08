<template>
  <div class="relative overflow-hidden bg-[#f96c6c] py-16 px-6 sm:px-14 rounded-[2rem] font-sans">
    <!-- SVG Paint Splash Top Right -->
    <svg class="absolute top-0 right-0 w-28 sm:w-40 z-0 animate-paint-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#FFB72B" d="M49.2,-60.1C63.3,-49.5,74.2,-32.6,73.9,-16.7C73.5,-0.7,61.8,14.2,52.7,30.4C43.6,46.5,37.1,63.8,24.6,70.5C12.1,77.3,-6.4,73.5,-24.6,67.2C-42.8,60.8,-60.8,51.8,-66.4,38.2C-72.1,24.6,-65.3,6.5,-57.5,-8.7C-49.8,-23.8,-41.1,-36,-30.3,-46.8C-19.4,-57.5,-6.4,-66.8,9.2,-71.5C24.8,-76.1,49.6,-76.2,49.2,-60.1Z" transform="translate(100 100)" />
    </svg>

    <!-- SVG Paint Splash Bottom Right -->
    <svg class="absolute bottom-0 right-0 w-40 sm:w-60 z-0 animate-paint-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="#C729B4" d="M41.6,-49.3C54.5,-40.6,65.3,-27.2,67.4,-13.2C69.5,0.7,62.9,15.3,53.4,26.5C43.9,37.8,31.4,45.8,17.7,53.5C4,61.1,-11,68.4,-23.7,64.2C-36.4,60,-46.8,44.2,-56.8,28.1C-66.8,11.9,-76.3,-4.7,-70.7,-17.8C-65.1,-30.9,-44.4,-40.4,-27.4,-47.5C-10.4,-54.6,3,-59.4,17.2,-58.5C31.4,-57.6,46.3,-51.5,41.6,-49.3Z" transform="translate(100 100)" />
    </svg>

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
        <img :src="imageUrl" alt="Soulfusion Yoga" class="rounded-[2rem] shadow-xl w-full" />
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
