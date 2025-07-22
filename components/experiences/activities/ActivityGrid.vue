<template>
    <motion tag="div" :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.5, delay: index * 0.1 }" :whileHover="{ scale: 1.06, rotateZ: 2 }"
        class="activity-card transition-transform">
        <section class="py-12 px-6 md:px-16 lg:px-32">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                <div v-for="activity in activities" :key="activity.id"
                    class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition hover:shadow-xl"
                    @click="$emit('open-modal', activity)">
                    <img :src="activity.image" :alt="activity.name" class="w-full h-52 object-cover" />
                    <div class="p-4">
                        <h3 class="text-xl font-semibold text-[#447C9D]">{{ activity.name }}</h3>
                        <p class="text-sm text-gray-500 mt-2">{{ activity.shortDescription }}</p>
                        <button class="mt-4 text-sm font-semibold text-[#447C9D] hover:underline">Explore</button>
                    </div>
                </div>
            </div>
        </section>
    </motion>
</template>

<script setup>
defineProps({
    activities: Array
});
</script>

<style scoped>
div * {
    font-family: "Inter", sans-serif;
}
</style>