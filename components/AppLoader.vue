<template>
  <div
    class="fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 opacity-100 pointer-events-auto">
    <img class="h-16 w-auto animate-scale-pulse" src="/images/meraki-logo-black.png" alt="Logo" />
  </div>
</template>

<style scoped>
@keyframes scale-pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

.animate-scale-pulse {
  animation: scale-pulse 1.2s ease-in-out infinite;
}
</style>
