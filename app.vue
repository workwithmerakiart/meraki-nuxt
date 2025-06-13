<template>
  <div class="min-h-screen flex flex-col">
    <AppLoader v-if="isLoading" />
    <AppHeader />

    <!-- Main content grows to push footer down -->
    <div class="flex-1">
      <HeroSection />
      <NuxtPage />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoading = ref(true);

onMounted(() => {
  if (import.meta.client) {
    isLoading.value = false;
  }
});
</script>
