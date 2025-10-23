<template>
  <div>
    <!-- TOP SECTION with gray background -->
    <div class="bg-[#f6f6f6] px-4 md:px-10 py-12">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- LEFT COLUMN -->
        <div>
          <p class="uppercase text-sm tracking-widest text-gray-600 mb-2">{{ categoryLabel }}</p>
          <h1 class="text-3xl md:text-4xl font-bold mb-2 text-black">{{ title }}</h1>
          <!-- price under title -->
          <div v-if="displayPrice" class="mb-6 flex items-center gap-2 text-[16px] font-semibold text-black">
            <span>{{ displayPrice }}</span>
            <span v-if="vat" class="text-sm text-gray-600">+ VAT</span>
          </div>

          <!-- Meta -->
          <div class="space-y-4 mb-6 text-[16px]">
            <div class="flex items-start">
              <component :is="calendarIcon" class="h-5 w-5 text-black mr-3 mt-1" />
              <span>{{ dates }}</span>
            </div>
            <div class="flex items-start">
              <component :is="clockIcon" class="h-5 w-5 text-black mr-3 mt-1" />
              <span>{{ time }}</span>
            </div>
            <div class="flex items-start">
              <component :is="locationIcon" class="h-5 w-5 text-black mr-3 mt-1" />
              <a href="#" class="underline hover:text-black">{{ location }}</a>
            </div>
          </div>

          <div v-if="hasVariants" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Choose sessions</label>
            <select v-model="selectedKey" class="w-full border rounded px-3 py-2 text-sm bg-white">
              <option v-for="v in variants" :key="v.key" :value="v.key">{{ v.label }}</option>
            </select>
          </div>

          <!-- Button -->
          <button
            @click="handleEnroll"
            class="bg-black text-white text-[13px] font-semibold uppercase px-4 py-2 tracking-wide hover:bg-[#333]">
            {{ registerText }}
          </button>
        </div>

        <!-- RIGHT IMAGE -->
        <div>
          <img :src="imageSrc" alt="Workshop" class="w-full h-auto object-cover mb-2 rounded-sm" />
          <p class="text-sm text-gray-600">{{ imageCaption }}</p>
        </div>
      </div>
    </div>

    <!-- BOTTOM WHITE SECTION for description -->
    <div class="bg-white px-4 md:px-6 py-12">
      <div class="max-w-3xl mx-auto prose prose-sm text-[15px] text-[#1a1a1a]">
        <div v-html="content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CalendarIcon, ClockIcon, MapPinIcon } from '@heroicons/vue/24/outline';

const {
  title,
  dates,
  time,
  location,
  price,
  vat,
  vatValue,
  registerText,
  imageSrc,
  imageCaption,
  content,
  categoryLabel,
  variants,
  defaultVariantKey,
  checkoutPayload,
} = defineProps({
  title: String,
  dates: String,
  time: String,
  location: String,
  price: [String, Number],
  vat: { type: Boolean, default: false },
  vatValue: { type: [Number, String], default: 0 },
  registerText: {
    type: String,
    default: 'Register',
  },
  imageSrc: String,
  imageCaption: String,
  content: String,
  categoryLabel: { type: String, default: 'Workshops' },
  variants: { type: Array, default: () => [] },
  defaultVariantKey: { type: String, default: '' },
  checkoutPayload: { type: Object, default: () => ({}) },
});

const calendarIcon = CalendarIcon;
const clockIcon = ClockIcon;
const locationIcon = MapPinIcon;

// Variants logic (backwards-compatible)
const hasVariants = computed(() => Array.isArray(variants) && variants.length > 0)
const selectedKey = ref(hasVariants.value ? (defaultVariantKey || (variants[0] && variants[0].key) || '') : '')
const selectedVariant = computed(() => {
  if (!hasVariants.value) return null
  return variants.find(v => v.key === selectedKey.value) || variants[0]
})

// Display price: prefer variant price if variants exist, else use provided price
const displayPrice = computed(() => {
  if (hasVariants.value && selectedVariant.value) {
    const p = selectedVariant.value.unitAmount
    return typeof p === 'number' ? `AED ${p}` : String(p || '')
  }
  if (typeof price === 'number') return `AED ${price}`
  return price || ''
})

// Compose payload for checkout (do not mutate incoming prop)
const payload = computed(() => {
  const base = checkoutPayload || {}
  // Always include variants, image, and a human-readable price for downstream pages
  const shared = {
    ...base,
    title: base.title || title,
    variants,
    imageSrc,
    displayPrice: displayPrice.value,
  }

  if (hasVariants.value && selectedVariant.value) {
    return {
      ...shared,
      variantKey: selectedVariant.value.key,
      sku: selectedVariant.value.sku || base.sku,
      unitAmount: selectedVariant.value.unitAmount,
    }
  }
  return shared
})

// Emit updated payload when user clicks Enroll
const emit = defineEmits(['enroll'])
const handleEnroll = () => {
  emit('enroll', payload.value)
}
</script>

<style scoped>
.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin: 0 0 1rem;
}

div * {
  font-family: "Inter", sans-serif;
}
</style>
