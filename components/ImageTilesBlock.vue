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
        @enroll="handleAddToCart"
      />
    </TileModal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(['add-to-cart'])

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

function emitAddToCart(payload) {
  try {
    const tile = selectedTile.value || {}
    const mc = tile.modalContent || {}
    const cp = mc.checkoutPayload || {}

    // Merge in the right priority order:
    // tile -> modalContent -> payload(from modal) -> checkoutPayload overrides
    const out = {
      ...tile,
      ...mc,
      ...(payload || {}),
      ...cp,

      // Identity
      id: cp.id ?? tile.id ?? (payload && payload.id),
      sku: cp.sku ?? (payload && payload.sku) ?? tile.id ?? tile.title,

      // Display
      title: cp.title ?? (payload && payload.title) ?? mc.title ?? tile.title,
      image: cp.image ?? (payload && payload.image) ?? tile.image,
      imageSrc: cp.imageSrc ?? (payload && payload.imageSrc) ?? mc.imageSrc,

      // Pricing
      price: cp.price ?? (payload && payload.price) ?? mc.price ?? tile.price,
      unitAmount: cp.unitAmount ?? (payload && payload.unitAmount) ?? undefined,
      priceMajor: cp.priceMajor ?? (payload && payload.priceMajor) ?? undefined,
      currency: cp.currency ?? (payload && payload.currency) ?? 'AED',

      // VAT
      vat: cp.vat ?? (payload && payload.vat) ?? mc.vat ?? tile.vat,
      vatValue: cp.vatValue ?? (payload && payload.vatValue) ?? mc.vatValue ?? tile.vatValue,
      vatIncluded: cp.vatIncluded ?? (payload && payload.vatIncluded) ?? mc.vatIncluded ?? tile.vatIncluded,

      // Workshop meta
      dates: cp.dates ?? (payload && payload.dates) ?? mc.dates,
      time: cp.time ?? (payload && payload.time) ?? mc.time,
      location: cp.location ?? (payload && payload.location) ?? mc.location,
      variantKey: cp.variantKey ?? (payload && payload.variantKey) ?? tile.variantKey,
    }

    emit('add-to-cart', out)
  } catch (e) {
    console.error('emit add-to-cart failed', e)
  }
}

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

const handleAddToCart = (payload) => {
  try {
    // 1) Add to cart via parent
    emitAddToCart(payload)

    // 2) Close modal
    isModalOpen.value = false
    selectedTile.value = null

    // 3) Open global cart drawer immediately
    if (process.client) {
      window.dispatchEvent(new CustomEvent('open-cart'))
    }
  } catch (e) {
    console.error('Failed to add to cart', e)
  }
}
</script>
