<template>
  <div class="bg-white overflow-hidden hover:shadow-md image-tile" @click="handleClick">
    <div class="relative">
      <img
        :src="tile.image"
        :alt="tile.title || tile.description"
        class="w-full h-64 object-cover"
      />
      <div
        v-if="tile.badge"
        class="absolute top-0 left-0 bg-gray-700 text-white px-3 py-1 text-xs font-medium uppercase tracking-wide"
      >
        {{ tile.badge }}
      </div>
    </div>

    <div class="bg-gray-100 p-4 h-full">
      <div v-if="tile.description && !tile.title" class="space-y-1">
        <div class="text-gray-800 text-md font-semibold">
          {{ tile.description }}
        </div>
      </div>
      <div v-else-if="tile.title">
        <div class="text-gray-800 text-lg font-bold mb-4">
          {{ tile.title }}
        </div>
        <div class="space-y-3">
          <div
            v-for="(section, index) in tile.sections"
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
const props = defineProps({
  tile: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click', props.tile);
};
</script>

<style scoped>
div * {
  font-family: "Inter", sans-serif;
}

.image-tile {
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease-in-out;
}

.image-tile:hover {
  transform: scale(1.02);
}
</style>
