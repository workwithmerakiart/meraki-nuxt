<template>
  <div class="w-full max-w-7xl mx-auto px-4 md:px-10">
    <div
      v-if="title"
      class="text-[#DD4912] text-4xl md:text-6xl font-bold tracking-wide text-center uppercase py-5"
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

    <TileModal
      :show="isModalOpen"
      @close="closeModal"
      :title="selectedTile?.title || selectedTile?.description"
    >
      <TileModalContent v-bind="selectedTile?.modalContent" />
    </TileModal>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  tiles: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const isModalOpen = ref(false);
const selectedTile = ref(null);

const openModal = (tile) => {
  if (tile.modal) {
    selectedTile.value = tile;
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTile.value = null;
};
</script>
