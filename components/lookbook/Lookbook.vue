<script setup>
import LookbookHeader from '@/components/lookbook/LookbookHeader.vue'
import MasonryGallery from '@/components/lookbook/MasonryGallery.vue'

defineProps({
    images: { type: Array, default: () => [] },
    title: { type: String, default: 'Lookbook' },
    blurb: {
        type: String,
        default: 'Check out our gallery of events… Yours could be spotlighted next!',
    },
})
</script>

<template>
    <div class="font-sans text-neutral-900 bg-white">
        <!-- add bottom margin on the hero -->
        <LookbookHeader :title="title" :blurb="blurb" class="mb-6 sm:mb-8 md:mb-12" />

        <!-- add horizontal padding around the masonry wall -->
        <div class="px-4 sm:px-6 lg:px-8 bg-white">
            <MasonryGallery :images="images" />
        </div>
    </div>
</template>
