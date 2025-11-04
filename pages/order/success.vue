<template>
  <section class="max-w-xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-bold mb-2">Thank you! 🎉</h1>
    <p class="text-black/70">Your payment was successful.</p>
    <p class="text-sm text-black/60 mt-4">Ref: {{ sessionId }}</p>
    <NuxtLink to="/" class="inline-block mt-6 border border-black px-4 py-2 rounded hover:bg-black hover:text-white">
      Continue browsing
    </NuxtLink>
  </section>
</template>
<script setup>
const route = useRoute()
const sessionId = route.query.session_id || ''
</script>