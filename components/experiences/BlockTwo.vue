<template>
  <div
    class="bg-[#F9F3EB] flex flex-col lg:flex-row items-center lg:h-[32rem] px-8 md:px-12 lg:px-6 py-8 lg:py-16 mx-auto max-w-screen-xl"
  >
    <div class="w-full lg:w-1/2 lg:px-12">
      <div class="text-black text-left animate-fade-in-up">
        <div v-if="title" class="text-3xl md:text-4xl font-bold mb-4">
          {{ title }}
        </div>
        <p class="text-lg md:text-xl leading-relaxed">
          {{ description }}
        </p>
      </div>
    </div>
    <div class="w-full lg:w-1/2 lg:px-12 mt-8 lg:mt-0">
      <img
        :src="image"
        :alt="title || 'Experience Image'"
        class="object-cover w-full h-full shadow-md"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  title: String,
  description: String,
});
</script>

<style scoped>
div * {
  font-family: "Inter", sans-serif;
}
</style>
