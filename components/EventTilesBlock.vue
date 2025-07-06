<template>
  <div class="w-full max-w-7xl mx-auto px-4 md:px-10">
    <div 
      v-if="title" 
      class="text-black text-4xl md:text-6xl font-bold tracking-wide text-center uppercase py-5 bg-[#F9F9F9]"
    >
      {{ title }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
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