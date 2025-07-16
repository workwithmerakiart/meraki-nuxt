<template>
    <section class="bg-[#F9F3EB] py-8 px-4 sm:px-8 md:px-12 lg:px-24">
        <h2 class="text-3xl md:text-4xl font-semibold text-center mb-8 header-font text-[#dd4912]">
            Let the magic slide into the DMs.
        </h2>

        <InstagramFeed class="mt-10" />

        <div class="mt-10 text-center">
            <button @click="navigateToInstagram"
                class="border border-black px-6 py-3 text-sm uppercase tracking-widest font-semibold text-black rounded-full hover:bg-[#DD4912] hover:text-white transform hover:scale-105 transition-all duration-300">
                Follow us on Instagram
            </button>
        </div>


    </section>
</template>

<script setup>
import InstagramFeed from '@/components/InstagramFeed.vue'

const navigateToInstagram = () => {
    window.open('https://www.instagram.com/merakistudio_dubai', '_blank')
}
</script>

<style scoped>
.header-font {
    font-family: 'DM Serif Display', serif;
}
</style>
