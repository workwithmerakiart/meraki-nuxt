<template>
    <section class="w-full bg-[#f7f1e7] py-20 px-6 md:px-16 lg:px-32">
        <div
            class="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-12 md:space-y-0 md:space-x-20">

            <!-- Left Column: Heading + Illustration -->
            <div class="flex-1 flex flex-col justify-center items-start relative fraunces-font">
                <h2 class="text-3xl md:text-5xl font-extrabold leading-tight max-w-md text-gray-900">
                    You're in <br />
                    <span class="text-gray-900">the right place...</span>
                </h2>

                <!-- Artistic Splash Colors GIF from Giphy -->
                <img src="https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif"
                    alt="Splash Colors Artistic Animation" class="mt-8 max-w-[320px] w-full rounded-lg shadow-lg" />
            </div>

            <!-- Right Column: Text Content -->
            <div class="flex-1 max-w-lg text-gray-700 text-lg space-y-6 inter-font">
                <p>
                    <strong>Does this sound like you?</strong>
                </p>
                <ul class="list-disc list-inside space-y-3">
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
    font-family: 'Fraunces', serif;
}

.inter-font {
    font-family: 'Inter', sans-serif;
}
</style>
