<!-- File: BookActivities.vue -->
<template>
    <section :class="['w-full py-16 px-6 text-center', backgroundColor]">
        <div class="max-w-4xl mx-auto space-y-6">
            <!-- Heading -->
            <h2 :class="['text-3xl md:text-4xl font-extrabold', textColor]">{{ heading }}</h2>
            <p class="text-base md:text-lg text-gray-700">{{ body }}</p>

            <!-- Highlights -->
            <div class="flex flex-wrap justify-center gap-2 mt-4">
                <span v-for="(item, index) in highlights" :key="index"
                    :class="[highlightBgColor, highlightTextColor, highlightBorderColor, 'px-3 py-1 rounded-full text-sm font-medium']">
                    {{ item }}
                </span>
            </div>

            <!-- CTA Button -->
            <button @click="showModal = true"
                class="inline-block mt-6 bg-[#447C9D] text-white text-sm font-semibold px-5 py-3 rounded hover:bg-[#376a86] transition">
                {{ ctaText }}
            </button>
        </div>

        <!-- Booking Modal -->
        <ActivitiesForm v-if="showModal" :products="productOptions" @close="showModal = false"
            @submitted="showModal = false" />
    </section>
</template>

<script setup>
import { ref } from 'vue';
import ActivitiesForm from './ActivitiesForm.vue';

const props = defineProps({
    heading: String,
    body: String,
    highlights: Array,
    ctaText: String,
    productOptions: Array,

    backgroundColor: {
        type: String,
        default: 'bg-[#F9F3EB]'
    },
    textColor: {
        type: String,
        default: 'text-[#1A1A1A]'
    },
    highlightBgColor: {
        type: String,
        default: 'bg-white'
    },
    highlightTextColor: {
        type: String,
        default: 'text-[#1A1A1A]'
    },
    highlightBorderColor: {
        type: String,
        default: 'border border-[#1A1A1A]'
    }
});

const showModal = ref(false);
</script>

<style scoped>
* {
    font-family: 'Inter', sans-serif;
}
</style>
