<script setup>
const props = defineProps({
    eyebrow: { type: String, default: '' },
    heading: { type: String, default: '' },
    body: { type: String, default: '' },
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, default: '' },
    ctaLabel: { type: String, default: '' },
    ctaHref: { type: String, default: '#' },
    bleedToRight: { type: Boolean, default: true }, // image flush with right viewport on md+
})
</script>

<template>
    <section class="py-12 sm:py-16 lg:py-20">
        <div class="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 sm:px-8 md:grid-cols-12 md:items-center">
            <!-- Text -->
            <div class="md:col-span-6">
                <p v-if="eyebrow" class="text-sm tracking-widest uppercase opacity-70">{{ eyebrow }}</p>
                <h2 v-if="heading" class="mt-2 text-3xl/tight sm:text-4xl font-semibold">
                    {{ heading }}
                </h2>
                <p v-if="body" class="mt-4 text-base/7 sm:text-lg/8 text-gray-600">
                    {{ body }}
                </p>
                <div v-if="$slots.default || ctaLabel" class="mt-6">
                    <slot>
                        <a v-if="ctaLabel" :href="ctaHref"
                            class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-gray-300 hover:bg-gray-50">
                            {{ ctaLabel }}
                        </a>
                    </slot>
                </div>
            </div>

            <!-- Image (bleeds to right on md+) -->
            <div class="md:col-span-6 md:pl-4">
                <div :class="[
                    'relative h-72 sm:h-96 md:h-[28rem] overflow-hidden rounded-2xl md:rounded-l-2xl md:rounded-r-none',
                    bleedToRight ? 'bleed-right md:rounded-r-none' : ''
                ]">
                    <img :src="imageSrc" :alt="imageAlt" class="absolute inset-0 h-full w-full object-cover"
                        loading="lazy" decoding="async" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Push the image wrapper to the viewport edge while the grid stays centered */
@media (min-width: 768px) {
    .bleed-right {
        margin-right: calc(50% - 50vw);
    }
}
</style>
