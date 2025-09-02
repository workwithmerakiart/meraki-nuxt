<script setup>
const props = defineProps({
    heading: { type: String, required: true },
    subheading: { type: String, default: '' },
    media: { type: String, required: true },
    mediaAlt: { type: String, default: '' },
    align: {
        type: String,
        default: 'left',
        validator: v => ['left', 'center', 'right'].includes(v),
    },
    overlay: {
        type: String,
        default: 'dark',
        validator: v => ['none', 'dark', 'gradient'].includes(v),
    },
    height: {
        type: String,
        default: 'xl',
        validator: v => ['screen', 'xl', 'lg', 'md'].includes(v),
    },
    maxWidthClass: { type: String, default: 'md:max-w-2xl' },
})

const alignClasses = {
    left: 'items-end md:items-center justify-start text-left',
    center: 'items-end md:items-center justify-center text-center',
    right: 'items-end md:items-center justify-end text-right',
}
const heightClasses = {
    screen: 'min-h-screen',
    xl: 'min-h-[72vh]',
    lg: 'min-h-[60vh]',
    md: 'min-h-[50vh]',
}
</script>

<template>
    <section class="relative isolate overflow-hidden">
        <!-- Background -->
        <img :src="media" :alt="mediaAlt" class="absolute inset-0 h-full w-full object-cover" fetchpriority="high"
            decoding="async" />

        <!-- Overlay -->
        <div v-if="overlay !== 'none'" class="absolute inset-0" :class="{
            'bg-black/45': overlay === 'dark',
            'bg-gradient-to-t from-black/60 via-black/20 to-transparent': overlay === 'gradient'
        }" aria-hidden="true" />

        <div class="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8" :class="heightClasses[height]">
            <div class="grid h-full" :class="alignClasses[align]">
                <div :class="['text-white', maxWidthClass]">
                    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                        {{ heading }}
                    </h1>
                    <p v-if="subheading" class="mt-4 text-base sm:text-lg lg:text-xl/7 opacity-95">
                        {{ subheading }}
                    </p>
                    <slot />
                </div>
            </div>
        </div>
    </section>
</template>
