import { EventTile } from '../.nuxt/components';
<template>
  <div class="bg-white overflow-hidden hover:shadow-md event-tile">
    <div class="relative">
      <img
        :src="event.image"
        :alt="event.title || event.description"
        class="w-full h-64 object-cover"
      />
      <div
        v-if="event.badge"
        class="absolute top-0 left-0 bg-gray-700 text-white px-3 py-1 text-xs font-medium uppercase tracking-wide"
      >
        {{ event.badge }}
      </div>
    </div>

    <div class="bg-gray-100 p-4 h-full">
      <div v-if="event.description && !event.title" class="space-y-1">
        <div class="text-gray-800 text-md font-semibold">
          {{ event.description }}
        </div>
      </div>
      <div v-else-if="event.title">
        <div class="text-gray-800 text-lg font-bold mb-4">
          {{ event.title }}
        </div>
        <div class="space-y-3">
          <div
            v-for="(section, index) in event.sections"
            :key="index"
            class="flex items-center space-x-3"
          >
            <div class="flex-shrink-0">
              <component
                :is="section.icon"
                v-if="section.icon"
                class="w-4 h-4 text-gray-700 font-medium"
              />
              <div v-else class="w-4 h-4 bg-gray-400"></div>
            </div>
            <span class="text-gray-700 text-sm font-medium">{{
              section.text
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>

<style scoped>
div * {
  font-family: "Inter", sans-serif;
}

.event-tile {
  cursor: pointer;
  position: relative;
  top: 0;
  transition: top ease-in-out 0.2s;
}

.event-tile:hover {
  top: -2px;
}
</style>
