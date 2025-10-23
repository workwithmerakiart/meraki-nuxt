<template>
  <div class="w-full max-w-7xl mx-auto px-4 md:px-10">
    <div v-if="title" class="text-[#DD4912] text-4xl md:text-6xl font-bold tracking-wide text-center uppercase py-5">
      {{ title }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
      <div v-for="(tile, index) in tiles" :key="index" @click.stop.prevent="openModal(tile)" class="cursor-pointer">
        <ImageTile :tile="tile" />
      </div>
    </div>

    <TileModal v-if="isModalOpen" :show="isModalOpen" @close="closeModal"
      :title="(selectedTile && (selectedTile.title || selectedTile.description)) || ''">
      <TileModalContent
        v-bind="modalProps"
        :categoryLabel="categoryLabel || (selectedTile && selectedTile.badge) || 'WORKSHOPS'"
        @enroll="handleEnroll"
      />
    </TileModal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from 'vue-router'

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
  categoryLabel: {
    type: String,
    default: 'WORKSHOPS',
  },
});

const isModalOpen = ref(false);
const selectedTile = ref(null);
const modalProps = computed(() => (selectedTile.value && selectedTile.value.modalContent) ? selectedTile.value.modalContent : {});

const openModal = (tile) => {
  if (tile && tile.modal && tile.modalContent) {
    selectedTile.value = tile;
    isModalOpen.value = true;
  }
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTile.value = null;
};

const router = useRouter()

const handleEnroll = (payload) => {
  try {
    // Determine slot duration for scheduling: explicit on tile → first session duration → default 30
    const durationMin =
      (selectedTile.value && selectedTile.value.durationMin) ||
      (payload && payload.sessionDurationsMin && payload.sessionDurationsMin[0]) ||
      30

    const q = { payload: encodeURIComponent(JSON.stringify({ ...payload, durationMin })) }
    isModalOpen.value = false
    selectedTile.value = null
    router.push({ path: '/experiences/schedule', query: q })
  } catch (e) {
    console.error('Failed to proceed to schedule', e)
  }
}
</script>
