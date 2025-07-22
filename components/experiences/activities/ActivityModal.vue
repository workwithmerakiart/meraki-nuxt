<!-- File: ActivityModal.vue -->
<template>
    <div v-if="activity" class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div class="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative shadow-lg">
            <!-- Close Button -->
            <button @click="$emit('close')"
                class="absolute top-4 right-4 text-black text-2xl font-bold">&times;</button>

            <!-- Header -->
            <div class="mb-6">
                <p class="uppercase text-sm tracking-widest text-gray-400">Activity</p>
                <h2 class="text-3xl font-extrabold text-[#447C9D]">{{ activity.name }}</h2>
            </div>

            <!-- Subtype Cards -->
            <div class="space-y-8">
                <div v-for="subtype in activity.subtypes" :key="subtype.id"
                    class="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <div class="flex flex-col lg:flex-row">
                        <!-- Left Column: Text -->
                        <div class="w-full lg:w-1/2 p-6 space-y-3">
                            <h3 class="text-xl font-semibold text-gray-900">{{ subtype.title }}</h3>
                            <p class="italic text-sm text-gray-600">{{ subtype.description }}</p>

                            <!-- Details -->
                            <div v-if="!subtype.variants" class="mt-3 space-y-1 text-sm">
                                <p><strong>Price:</strong> {{ subtype.price }} <span v-if="!subtype.vatIncluded">+
                                        VAT</span></p>
                                <p><strong>Duration:</strong> {{ subtype.duration }}</p>
                                <p v-if="subtype.minTickets"><strong>Minimum Tickets:</strong> {{ subtype.minTickets }}
                                </p>
                            </div>

                            <!-- Variants -->
                            <div v-else class="mt-3">
                                <label for="variant" class="block text-sm font-medium text-gray-700 mb-1">Select
                                    Option:</label>
                                <select id="variant" v-model="selectedVariants[subtype.id]"
                                    class="w-full border border-gray-300 rounded px-3 py-2">
                                    <option v-for="variant in subtype.variants" :key="variant.name"
                                        :value="variant.name">
                                        {{ variant.name }} — {{ variant.price }} <span v-if="!variant.vatIncluded">+
                                            VAT</span>
                                    </option>
                                </select>
                            </div>

                            <!-- CTA -->
                            <button
                                class="mt-4 px-4 py-2 bg-[#447C9D] text-white rounded hover:bg-[#376a86] text-sm font-medium">
                                Book Now
                            </button>
                        </div>

                        <!-- Right Column: Image -->
                        <div class="w-full lg:w-1/2">
                            <img :src="subtype.image || activity.image" :alt="subtype.title"
                                class="h-full w-full object-cover" />
                        </div>
                    </div>

                    <!-- Bottom Info Section -->
                    <div v-if="subtype.bottomNote"
                        class="px-9 py-6 border-t border-gray-200 text-sm text-gray-700 bg-white">
                        {{ subtype.bottomNote }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
    activity: Object
});

const selectedVariants = reactive({});

watch(
    () => props.activity,
    (newVal) => {
        if (newVal) {
            newVal.subtypes?.forEach((sub) => {
                if (sub.variants?.length) {
                    selectedVariants[sub.id] = sub.variants[0].name;
                }
            });
        }
    },
    { immediate: true }
);
</script>

<style scoped>
* {
    font-family: 'Inter', sans-serif;
}
</style>
