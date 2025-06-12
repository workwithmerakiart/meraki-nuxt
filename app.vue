<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <!-- Main content grows to push footer down -->
    <div class="flex-1">
      <HeroSection />
      <NuxtPage />
    </div>

    <AppFooter />
  </div>
</template>