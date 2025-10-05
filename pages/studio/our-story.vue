<template>
  <section class="bg-[#f9f3eb] text-black font-sans">

    <!-- Hero Block -->
    <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/story/story_hero.webp" alt="Our Story Hero" class="w-full h-full object-cover" />

      <!-- changed line ↓ -->
      <div class="absolute inset-0 bg-black/40 flex flex-col items-center text-center text-white px-4
           justify-end md:justify-center
           pb-6 sm:pb-10
           pt-[calc(env(safe-area-inset-top)+64px)] md:pt-0">
        <h1 class="text-3xl md:text-5xl font-bold uppercase">Our Story</h1>
        <p class="max-w-2xl mt-4 text-base md:text-lg">
          Welcome to Meraki Art Studio—where creativity meets joy, and every experience is a masterpiece. We believe
          every creation tells a story—crafted with intention, color, and heart at Meraki Art Studio.
        </p>
      </div>
    </div>


    <!-- Block Two: Intro -->
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 py-12 px-4">
      <div class="md:w-1/2 text-center md:text-left">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-[#dd4912]">Meet the founders – Kay & Pooh</h2>
        <p class="text-gray-700 leading-relaxed">
          In 2018, two passionate souls—Kay and Pooh—turned their love for art into a dream called Meraki Art Studio.
          What started as a small, heartfelt project has blossomed into one of Dubai’s most vibrant art destinations.
          Fueled by creativity, courage, and a deep belief in the healing power of self-expression, Kay and Pooh built
          more than a studio—they built a community. Today, Meraki Art Studio welcomes people from all walks of life to
          discover joy, connection, and a touch of magic through art.
          Their journey is proof that when you create with love, the world shows up to join you.

        </p>
      </div>
      <div class="md:w-1/2">
        <img src="/images/story/story_block2.webp" alt="Meraki Studio" class="w-full rounded-lg shadow" />
      </div>
    </div>

    <!-- Block Three: Mission -->
    <div class="bg-[f9f3eb] py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-[#dd4912]">What we offer</h2>
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto">
        <ul class="text-gray-700 leading-relaxed max-w-3xl mx-auto text-left list-disc list-inside space-y-2">
          <li>Neon Slime & Bear Creations – Unforgettable fun for all ages</li>
          <li>Resin, Jesmonite & Fluid Art – Explore luxury materials in guided workshops</li>
          <li>Corporate Team Building – Bond over creativity in inspiring settings</li>
          <li>Birthday Parties & Events – Make milestones memorable with art</li>
        </ul>

        </p>
      </div>
    </div>

    <!-- New Block: Why choose Meraki -->
    <div class="bg-[#f9f3eb] py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-[#dd4912] text-center">Why choose Meraki</h2>
        <ul class="text-gray-700 leading-relaxed max-w-3xl mx-auto list-disc list-inside space-y-2 text-left">
          <li>Art experiences tailored to every age & skill level</li>
          <li>A safe, vibrant, and therapeutic space for expression</li>
          <li>Hosted by passionate creatives who guide with care</li>
          <li>Located in the heart of Dubai’s cultural scene</li>
        </ul>
      </div>
    </div>

    <!-- Block Four: Our Team -->
    <div class="max-w-6xl mx-auto py-12 px-4">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#dd4912]">The source of our strength is our
        people - Meet the Meraki Family</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div v-for="member in team" :key="member.id"
          class="bg-[f9f3eb] rounded-lg overflow-hidden shadow hover:shadow-lg transition">
          <div class="overflow-hidden">
            <img :src="member.image" :alt="member.name"
              class="w-full h-48 object-cover transform hover:scale-105 transition duration-300" />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold">{{ member.name }}</h3>
            <p class="text-sm font-medium text-gray-600">{{ member.role }}</p>
            <p class="text-sm text-gray-700 mt-2">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Block Five: Image Carousel -->
    <div class="bg-[f9f3eb] py-12 px-4">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#dd4912]">Our Work in Focus</h2>
      <Carousel />
    </div>

    <!-- Block Six: Testimonials -->
    <div class="bg-[#f9f3eb] py-12">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#dd4912]">What Our Clients Say</h2>
      <div class="max-w-7xl mx-auto px-4">
        <Testimonials />
      </div>
    </div>


    <!-- Block Seven: Mission Repeat -->
    <div class="bg-[f9f3eb] py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-[#dd4912]">Art with purpose</h2>
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
          <strong>At Meraki Art Studio, we believe in the healing power of creativity.</strong>
        </p>
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
          As part of our commitment to community well-being, we host regular art therapy sessions that support mental health, emotional expression, and personal growth.
        </p>
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
          We partner with schools, wellness centers, and local organizations to bring the benefits of art to those who need it most—especially children, caregivers, and individuals facing emotional challenges.
        </p>
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
          Through guided, mindful art experiences, we create safe, uplifting spaces that nurture self-expression and self-care.
        </p>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import Carousel from '~/components/Carousel.vue'
import Testimonials from '~/components/Testimonials.vue'

const team = ref([
  { id: 1, name: 'Kajol', role: 'Creative Director & Co-Founder', description: 'The soul behind every creative detail—Kajol infuses the studio with imagination and purpose.', image: '/images/story/story_kajol.webp' },
  { id: 2, name: 'Pooja', role: 'Co-Founder', description: 'Visionary at heart, she’s one half of the duo that dreamed this studio into existence.', image: '/images/story/story_pooja.webp' },
  { id: 3, name: 'Neetu', role: 'Managing Director', description: 'The calm in the creative storm. Neetu ensures everything runs smoother than a resin pour.', image: '/images/story/story_neetu.webp' },
  { id: 4, name: 'Kenneth', role: 'Front Desk Coordinator', description: 'Your warmest welcome starts here. Kenneth is the friendly face behind the front desk.', image: '/images/story/story_kenneth.webp' },
  { id: 5, name: 'Kalyani', role: 'Artist', description: 'From canvas to neon, Kalyani helps guests turn artistic jitters into pure confidence.', image: '/images/story/story_kalyani.webp' },
  { id: 6, name: 'Maria', role: 'Party Host & Social Media Specialist', description: 'The life of the party and the feed—Maria makes every event sparkle online and off.', image: '/images/activities/maria.jpeg' },
  { id: 7, name: 'Nono', role: 'Neon Master', description: 'If it glows, Nono’s involved. She brings bright energy (literally).', image: '/images/story/story_nono.webp' },
  { id: 8, name: 'Ali', role: 'Barista', description: 'Fueling creativity one cup at a time—art always tastes better with great coffee.', image: '/images/story/story_ali.webp' },
  { id: 9, name: 'Shiv', role: 'Cleaning Operator', description: 'The unsung hero of the studio, keeping our space fresh, clean, and chaos-free.', image: '/images/story/story_shiv.webp' }
])
</script>

<style scoped>
/* Optional Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
