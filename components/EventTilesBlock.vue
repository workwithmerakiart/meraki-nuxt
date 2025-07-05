<template>
  <div class="w-full max-w-7xl mx-auto px-4 md:px-10 py-8">
    <h1 
      v-if="title" 
      class="text-black text-5xl font-bold tracking-wide text-center mb-10 uppercase"
    >
      {{ title }}
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventTile 
        v-for="(event, index) in events" 
        :key="index" 
        :event="event"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  events: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>