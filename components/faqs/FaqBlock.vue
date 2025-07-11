<template>
  <div>
    <h2 class="text-3xl md:text-4xl font-extrabold text-[#0d2fff] mb-6">{{ title }}</h2>
    <div v-for="(faq, index) in localFaqs" :key="index" class="border-b border-[#0d2fff] py-4">
      <button
        @click="toggle(index)"
        class="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span class="text-[#0d2fff] text-base md:text-lg font-medium">{{ faq.question }}</span>
        <span class="text-[#0d2fff] text-2xl font-bold leading-none">+</span>
      </button>
      <div v-if="faq.open" class="mt-2 text-[#0d2fff] text-sm md:text-base">
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  title: String,
  faqs: Array
})

const localFaqs = ref([])

watch(
  () => props.faqs,
  (newFaqs) => {
    localFaqs.value = newFaqs.map((item) => ({ ...item, open: false }))
  },
  { immediate: true }
)

const toggle = (index) => {
  localFaqs.value[index].open = !localFaqs.value[index].open
}
</script>
