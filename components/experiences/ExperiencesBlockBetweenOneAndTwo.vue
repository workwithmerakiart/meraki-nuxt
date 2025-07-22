<template>
    <section class="w-full bg-[#F9F3EB] py-20 px-6 md:px-16 lg:px-32">
        <div
            class="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-center space-y-12 md:space-y-0 md:space-x-20">
            <!-- Left Column: Only GIF -->
            <div class="w-full md:w-1/2 flex justify-center">
                <img :src="image" alt="Creative Animation"
                    class="w-60 sm:w-72 md:w-80 lg:w-[320px] rounded-lg shadow-lg transition-all duration-300" />
            </div>

            <!-- Right Column: Heading + Description -->
            <div class="w-full md:w-1/2 max-w-lg text-[#1A1A1A] fraunces-font text-left">
                <h2
                    class="text-3xl sm:text-4xl md:text-5xl font-extrabold block-between-heading leading-snug text-[#447C9D] mb-4">
                    {{ title }}
                </h2>
                <p class="text-lg md:text-xl inter-font font-light leading-relaxed">
                    {{ description }}
                </p>
            </div>
        </div>
    </section>
</template>


<script setup>
defineProps({
    title: String,
    description: String,
    image: String,
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=Inter&display=swap');

.block-between-heading {
    font-family: "Caveat Brush", serif;
}

.fraunces-font {
    font-family: "DM Serif Display", serif;
}

.inter-font {
    font-family: 'Inter', sans-serif;
}
</style>
