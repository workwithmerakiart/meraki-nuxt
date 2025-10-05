<template>
    <section class="w-full bg-[#F9F3EB] py-20 px-6 md:px-16 lg:px-32">
        <div
            class="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start space-y-12 md:space-y-0 md:space-x-20">
            <!-- Left Column: Heading + Illustration -->
            <div
                class="w-full md:w-1/2 flex flex-col items-center md:items-start justify-center gap-6 fraunces-font text-center md:text-left">
                <!-- Artistic Splash Colors GIF from Giphy -->
                <video src="/videos/meraki-intro.mp4" autoplay loop muted playsinline class="w-72 sm:w-80 md:w-[420px] lg:w-[480px] rounded-lg shadow-lg transition-all duration-300 max-w-full h-auto">
                    Your browser does not support the video tag.
                </video>

                <h2
                    class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold block-two-headings leading-snug text-[#447C9D] max-w-md text-center">
                    <span class="inline-block">You're in the</span><br />
                    <span class="inline-block w-full text-center">right place...</span>
                </h2>


            </div>

            <!-- Right Column: Text Content -->
            <div class="w-full md:w-1/2 max-w-2xl text-[#1A1A1A] text-lg space-y-6 fraunces-font font-normal text-justify">
                <p class="list-disc list-inside space-y-3 inter-font font-light">
                    Meraki is a Dubai-born creative studio where art, joy, and community come together in every experience. Founded in 2018 by Kay and Pooh, two passionate artists who turned a dream into one of Dubai’s most vibrant art destinations, Meraki was built on the belief that creativity heals, connects, and inspires. Our studio offers hands-on workshops, immersive courses, walk-in activities, and curated events—welcoming artists, hobbyists, families, art connoisseurs and corporate teams alike. We’re home to a curated shop of quality materials, custom orders, and local artistry, all designed to support your creative journey. We celebrate Dubai’s thriving art scene and share the stories that make our community unique. Meraki is a safe, joyful space for self-expression, connection, and personal growth.
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
// Static content only - no JS logic needed
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;700&family=Inter&display=swap');
@import url('https://fonts.cdnfonts.com/css/sell-your-soul');

.block-two-headings {
    font-family: "Caveat Brush", serif;
    /* font-family: 'Sell Your Soul', sans-serif; */
}

.fraunces-font {
    font-family: "DM Serif Display", serif;
}

.inter-font {
    font-family: 'Inter', sans-serif;
}
</style>
