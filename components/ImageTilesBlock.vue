<template>
  <div class="w-full max-w-7xl mx-auto px-4 md:px-10">
    <div 
      v-if="title" 
      class="text-black text-4xl md:text-6xl font-bold tracking-wide text-center uppercase py-5 bg-[#F9F9F9]"
    >
      {{ title }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      <ImageTile 
        v-for="(tile, index) in tiles" 
        :key="index" 
        :tile="tile"
        @click="openModal(tile)"
      />
    </div>

    <TileModal :show="isModalOpen" @close="closeModal" :title="selectedTile?.title || selectedTile?.description">
      <div v-if="selectedTile">
        <img :src="selectedTile.image" :alt="selectedTile.title || selectedTile.description" class="w-full h-64 object-cover mb-4 rounded-lg">
        <h2 class="text-2xl font-bold mb-2">{{ selectedTile.title || selectedTile.description }}</h2>
        
        <div v-if="selectedTile.sections" class="mt-4 space-y-3">
          <div
            v-for="(section, index) in selectedTile.sections"
            :key="index"
            class="flex items-center space-x-3"
          >
            <component
              :is="section.icon"
              v-if="section.icon"
              class="w-5 h-5 text-gray-700 font-medium flex-shrink-0"
            />
            <span class="text-gray-800 text-base">{{ section.text }}</span>
          </div>
        </div>
      </div>
    </TileModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    default: ''
  },
  tiles: {
    type: Array,
    required: true,
    default: () => []
  }
});

const isModalOpen = ref(false);
const selectedTile = ref(null);

const openModal = (tile) => {
  selectedTile.value = tile;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTile.value = null;
};
</script>