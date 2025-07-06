<template>
  <div class="bg-[#cce6ff] min-h-screen pt-8 pb-18 lg:pt-15 lg:pb-18 px-6 md:px-12 px-4 overflow-hidden">
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16"
    >
      <!-- LEFT TEXT -->
      <div>
        <h1
          class="text-3xl sm:text-5xl font-bold text-blue-800 leading-tight mb-6 dm-serif-font"
        >
          {{ imageStackData.title }}
        </h1>
        <p v-for="(description, index) in imageStackData.description" :key="index" class="text-blue-800 text-base sm:text-lg mb-4">
          {{ description }}
        </p>
        <button
          class="flex items-center gap-2 text-blue-800 border-2 border-blue-800 rounded-full px-6 py-1 text-base sm:text-xl font-semibold hover:bg-blue-800 hover:text-white transition cursor-pointer"
        >
          {{ imageStackData.button }}
          <span class="text-xl">👉🏻</span>
        </button>
      </div>

      <!-- RIGHT IMAGE STACK -->
      <div
        class="relative mx-auto w-[90vw] max-w-[340px] h-[400px] sm:h-[460px] md:h-[480px]"
      >
        <div
          v-for="(item, index) in stackedImages"
          :key="`${item.name}-${index}`"
          class="absolute w-full h-full rounded-[24px] overflow-hidden border-2 border-blue-300 shadow-lg transition-all duration-500 ease-in-out"
          :style="{
            transform: `rotate(${item.rotation}deg) scale(${item.scale})`,
            top: `${item.yOffset}px`,
            right: `${item.xOffset}px`,
            zIndex: item.zIndex,
            opacity: item.opacity,
            transformOrigin: 'center',
          }"
        >
          <img
            :src="item.image"
            :alt="item.name"
            class="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <!-- Current/Main Image -->
        <div
          class="relative w-full h-full rounded-[24px] overflow-hidden border-2 border-blue-700 shadow-xl z-20 transition-all duration-500 ease-in-out rotate-2"
        >
          <img
            :src="imageStackData.imageStack[currentSlide].image"
            alt="stack-image"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-300 text-blue-900 px-4 py-2 sm:px-6 sm:py-2 rounded-full font-bold text-xs sm:text-sm border border-blue-700 text-center"
          >
            <div
              v-for="(badge, index) in imageStackData.imageStack[currentSlide].badge"
              :key="index"
            >
              {{ badge }}
            </div>
          </div>
        </div>

        <!-- Arrows -->
        <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-6">
          <button
            @click="prevSlide"
            class="hover:scale-110 transition cursor-pointer"
          >
            <ArrowLongLeftIcon class="w-10 h-10 text-blue-800 font-bold" />
          </button>
          <button
            @click="nextSlide"
            class="hover:scale-110 transition cursor-pointer"
          >
            <ArrowLongRightIcon class="w-10 h-10 text-blue-800 font-bold" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  imageStackData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const currentSlide = ref(0);

const stackMetadata = ref([]);

onMounted(() => {
  const meta = props.imageStackData.imageStack.map(() => ({
    rotation: Math.floor(Math.random() * 20 - 10),
    xOffset: Math.floor(Math.random() * 40 - 20),
    yOffset: Math.floor(Math.random() * 40 - 20),
    scale: 0.9 + Math.random() * 0.1,
    opacity: 0.4 + Math.random() * 0.4,
    zIndex: Math.floor(Math.random() * 10),
  }));
  stackMetadata.value = meta;
});

const stackedImages = computed(() =>
  props.imageStackData.imageStack
    .map((r, i) => ({ ...r, ...stackMetadata.value[i] }))
    .filter((_, i) => i !== currentSlide.value)
);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.imageStackData.imageStack.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + props.imageStackData.imageStack.length) %
    props.imageStackData.imageStack.length;
};
</script>

<style scoped>
div * {
  font-family: "Inter", sans-serif;
}

.dm-serif-font {
  font-family: "DM Serif Display", serif;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
