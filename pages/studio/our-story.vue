<template>
  <section class="bg-[#f9f3eb] text-black font-sans">

    <!-- Hero Block -->
    <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/products/meraki-hero.avif" alt="Our Story Hero" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 class="text-3xl md:text-5xl font-bold uppercase">Our Story</h1>
        <p class="max-w-2xl mt-4 text-base md:text-lg">
          We believe every creation tells a story—crafted with intention, color, and heart at Meraki Art Studio.
        </p>
      </div>
    </div>

    <!-- Block Two: Intro -->
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 py-12 px-4">
      <div class="md:w-1/2 text-center md:text-left">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-[#dd4912]">Meraki is an Art Studio</h2>
        <p class="text-gray-700 leading-relaxed">
          Founded to celebrate creativity in all forms, Meraki Art Studio specializes in crafting custom art
          experiences.
          Our approach goes beyond aesthetics—we believe in meaningful collaborations that transform ideas into tangible
          art.
        </p>
      </div>
      <div class="md:w-1/2">
        <img src="/images/hero-courses.jpg" alt="Meraki Studio" class="w-full rounded-lg shadow" />
      </div>
    </div>

    <!-- Block Three: Mission -->
    <div class="bg-white py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-[#dd4912]">Our Mission</h2>
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto">
          At Meraki, our mission is to co-create art that resonates on a personal level. We are dedicated to sustainable
          practices,
          collaborative design, and delivering meaningful work that enriches lives and spaces. Every project, big or
          small,
          is an opportunity to make the world more beautiful and personal.
        </p>
      </div>
    </div>

    <!-- Block Four: Our Team -->
    <div class="max-w-6xl mx-auto py-12 px-4">
      <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#dd4912]">The Source of Our Strength is Our People</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <div v-for="member in team" :key="member.id"
          class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
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
    <div class="bg-white py-12 px-4">
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
    <div class="bg-white py-12 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 text-[#dd4912]">Our Commitment</h2>
        <p class="text-gray-700 leading-relaxed max-w-3xl mx-auto">
          We strive to make art accessible, personal, and sustainable. Our studio values collaboration,
          quality, and storytelling in every piece we create. Join us in making art that speaks from the heart.
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
  { id: 1, name: 'Kajol Vaswani', role: 'Creative Director & Co-Founder', description: 'Blends modern and traditional techniques for signature pieces.', image: '/images/team/Kajol.png' },
  { id: 2, name: 'Pooja Vaswani', role: 'Co-Founder', description: 'Ensures smooth operations and a welcoming space for artists.', image: '/images/team/Pooja.jpg' },
  { id: 3, name: 'Neetu', role: 'Managing Director', description: 'Expert in preserving delicate elements in timeless resin art.', image: '/images/team/meera.jpg' },
  { id: 4, name: 'Kenneth', role: 'Front Desk Coordinator', description: 'Creates bespoke large-scale paintings for interiors.', image: '/images/team/arjun.jpg' },
  { id: 5, name: 'Kalyani', role: 'Artist', description: 'Drives vision and quality of all Meraki custom projects.', image: '/images/team/Kalyani.jpg' },
  { id: 6, name: 'Patrica', role: 'Party Host & Social Media Specialist', description: 'Helps businesses create memorable custom gift solutions.', image: '/images/team/Patrica.jpg' },
  { id: 7, name: 'Nono', role: 'Neon Master', description: 'Designs impactful murals and 3D installations.', image: '/images/team/Nono.jpg' },
  { id: 8, name: 'Ali', role: 'Barista', description: 'Coordinates material sourcing and quality assurance.', image: '/images/team/vikas.jpg' },
  { id: 9, name: 'Shiv', role: 'Cleaning Operator', description: 'Ensures every order is customized and delivered seamlessly.', image: '/images/team/anika.jpg' }
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
