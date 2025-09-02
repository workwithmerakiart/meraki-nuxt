<!-- LookbookHeader.vue -->
<script setup>
defineProps({
    title: { type: String, default: 'Lookbook' },
    blurb: {
        type: String,
        default:
            'Check out our gallery of events… Yours could be spotlighted next!',
    },
    image: { type: String, default: '/images/story/story_hero.webp' },
    alt: { type: String, default: 'Lookbook Hero' },
})
</script>

<template>
    <div class="relative w-full h-[320px] md:h-[500px] overflow-hidden">
        <img :src="image" :alt="alt" class="absolute inset-0 w-full h-full object-cover" />

        <!-- Overlay + content -->
        <div class="absolute inset-0 bg-black/40 flex flex-col items-center text-center text-white px-4
                   justify-end md:justify-center
                   pb-6 sm:pb-10
                   pt-[calc(env(safe-area-inset-top)+56px)] md:pt-0">
            <h1 class="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight uppercase">
                {{ title }}
            </h1>
            <p class="max-w-2xl mt-3 text-sm sm:text-base md:text-lg">
                {{ blurb }}
            </p>
        </div>
    </div>
</template>
