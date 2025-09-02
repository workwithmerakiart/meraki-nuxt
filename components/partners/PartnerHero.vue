<script setup>
defineProps({
    heading: { type: String, default: 'Partner With Us' },
    subheading: {
        type: String,
        default:
            'Build a profitable, purpose-led creative franchise with Meraki — training, playbooks, and ongoing brand support included.',
    },
    image: { type: String, default: '/images/story/story_hero.webp' },
    alt: { type: String, default: 'Partner With Us Hero' },
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
            <!-- Smaller mobile type, sleek on desktop -->
            <h1 class="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight uppercase">
                {{ heading }}
            </h1>
            <p class="max-w-2xl mt-3 text-sm sm:text-base md:text-lg">
                {{ subheading }}
            </p>
        </div>
    </div>
</template>
