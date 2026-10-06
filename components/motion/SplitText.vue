<template>
  <component :is="tag" :aria-label="text">
    <span
      v-for="(word, wi) in words"
      :key="wi"
      class="inline-block whitespace-nowrap"
      :class="mode === 'words' ? 'overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]' : ''"
      aria-hidden="true"
    >
      <template v-if="mode === 'chars'">
        <span v-for="(char, ci) in word" :key="ci" class="split-unit inline-block">{{ char }}</span>
      </template>
      <span v-else class="split-unit inline-block">{{ word }}</span>
      <template v-if="wi < words.length - 1">&nbsp;</template>
    </span>
  </component>
</template>

<script setup>
import { computed } from 'vue'

// Renders text as animatable pieces for useScrollReveal ('drop' → chars, 'rise' → words)
const props = defineProps({
  text: { type: String, required: true },
  tag: { type: String, default: 'span' },
  mode: { type: String, default: 'words' }, // 'words' | 'chars'
})

const words = computed(() => props.text.split(/\s+/).filter(Boolean))
</script>
