<template>
    <section class="w-full bg-[#F9F3EB] py-20 px-6 md:px-16 lg:px-32">
        <div
            class="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-12 md:space-y-0 md:space-x-20">
            <!-- Left Column: Heading + Illustration -->
            <div
                class="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-6 fraunces-font text-center md:text-left">
                <!-- Artistic Splash Colors GIF from Giphy -->
                <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
                    alt="Splash Colors Artistic Animation"
                    class="w-60 sm:w-72 md:w-80 lg:w-[320px] rounded-lg shadow-lg transition-all duration-300" />

                <h2
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug text-gray-900 max-w-md text-center">
                    <span class="inline-block">You're in the</span><br />
                    <span class="inline-block w-full text-center">right place...</span>
                </h2>


            </div>

            <!-- Right Column: Text Content -->
            <div class="w-full md:w-1/2 max-w-lg text-gray-800 text-lg space-y-6 fraunces-font font-normal">
                <p>
                    <strong>Does this sound like you?</strong>
                </p>
                <ul class="list-disc list-inside space-y-3 inter-font font-light">
                    <li>Mindful place cultivating spiritual and soulful experiences</li>
                    <li>Trauma-informed, heart-opening, grass-fed vibe</li>
                    <li>Passionate about sustainability and plant-based needs</li>
                    <li>Holistic, inclusive, accepting all identities</li>
                    <li>Healing through creative expression and connection</li>
                    <li>Seeking peaceful, meaningful community experiences</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<script setup>
// Static content only - no JS logic needed
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=Inter&display=swap');

.fraunces-font {
    font-family: "DM Serif Display", serif;
}

.inter-font {
    font-family: 'Inter', sans-serif;
}
</style>
