<script setup>
import { computed } from 'vue'

const props = defineProps({
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, default: '' },
    heading: { type: String, default: '' },
    body: { type: String, default: '' },
    leftWidthPct: { type: Number, default: 30 }, // 30/70 split on md+
})

const cols = computed(() => `${props.leftWidthPct}% ${100 - props.leftWidthPct}%`)
</script>

<template>
    <section class="py-12 sm:py-16 lg:py-20">
        <div class="mx-auto max-w-7xl px-6 sm:px-8">
            <!-- Stacks on mobile; exact % split on md+ -->
            <div class="grid grid-cols-1 gap-8 md:grid-cols-[var(--cols)] md:items-center" :style="{ '--cols': cols }">
                <!-- Image (left) -->
                <div>
                    <div class="relative h-64 sm:h-80 md:h-[26rem] overflow-hidden rounded-2xl">
                        <img :src="imageSrc" :alt="imageAlt" class="absolute inset-0 h-full w-full object-cover"
                            loading="lazy" decoding="async" />
                    </div>
                </div>

                <!-- Text (right) -->
                <div class="md:pl-10 lg:pl-14">
                    <h3 v-if="heading" class="text-2xl sm:text-3xl font-semibold">
                        {{ heading }}
                    </h3>
                    <p v-if="body" class="mt-4 text-base/7 sm:text-lg/8 text-gray-600">
                        {{ body }}
                    </p>
                    <slot />
                </div>
            </div>
        </div>
    </section>
</template>
