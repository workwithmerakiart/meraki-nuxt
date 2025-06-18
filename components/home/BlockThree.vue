<template>
  <section class="relative bg-white py-16 px-6 md:px-12 overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-2 bg-blue-500" aria-hidden="true"></div>

    <div class="max-w-7xl mx-auto text-center mb-12 relative z-10">
      <h2
        class="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-[#3366ff] font-['var(--font-display)']"
      >
        Discover New Brands
      </h2>
      <p class="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl">
        There's a heck of a lot of stuff out there. We've sorted through it and
        rounded up the most exciting new items from independents.
      </p>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto relative z-10"
    >
      <div
        v-for="(item, index) in products"
        :key="index"
        :class="[
          'relative rounded-xl shadow-lg p-6 flex flex-col items-center justify-between cursor-pointer transition-transform duration-300 transform', /* Increased p-4 to p-6 for more padding */
          item.bgColor, // Base background color
          hoverIndex === index ? 'scale-[1.02]' : '', // Subtle scale on hover
        ]"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <div class="w-full h-72 sm:h-80 mb-4 flex items-center justify-center">
          <img
            :src="item.image"
            :alt="item.title"
            class="max-h-full max-w-full object-contain"
          />
        </div>

        <div
          v-if="item.tag"
          :class="[
            'absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold uppercase',
            item.tagColor, // Tag background color
            item.tagTextColor, // Tag text color
            'transition-opacity duration-300',
            hoverIndex === index ? 'opacity-100' : 'opacity-90', // Slightly more opaque on hover
          ]"
        >
          {{ item.tag }}
        </div>
      </div>
    </div>

    <div class="text-center mt-12 relative z-10">
      <button
        class="inline-flex items-center px-8 py-3 rounded-full text-lg font-semibold border-2 border-gray-400 text-gray-700 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:border-blue-500 hover:text-blue-500"
      >
        Browse the directory
        <span class="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const hoverIndex = ref(null)

const products = [
  {
    image: 'https://via.placeholder.com/150/f0e68c?text=Pistachio+Spread',
    title: 'Pistachio Spread',
    tag: 'Gift Guide',
    bgColor: 'bg-[#f0e68c]',
    tagColor: 'bg-emerald-500',
    tagTextColor: 'text-white',
  },
  {
    image: 'https://via.placeholder.com/150/d2b48c?text=Drumroll+Protein',
    title: 'Drumroll Protein',
    tag: 'Protein',
    bgColor: 'bg-[#d2b48c]',
    tagColor: 'bg-blue-500',
    tagTextColor: 'text-white',
  },
  {
    image: 'https://via.placeholder.com/150/90ee90?text=Monte\'s+Sauce',
    title: "Monte's Sauce",
    tag: 'Pantry Staples',
    bgColor: 'bg-[#90ee90]',
    tagColor: 'bg-indigo-600',
    tagTextColor: 'text-white',
  },
  {
    image: 'https://via.placeholder.com/150/ffb6c1?text=Founder+Picks',
    title: 'Founder Picks',
    tag: 'Founder Picks',
    bgColor: 'bg-[#ffb6c1]',
    tagColor: 'bg-blue-600',
    tagTextColor: 'text-white',
  },
]
</script>

<style scoped>
/* Custom font for the heading, replace with your actual font if needed */
:root {
  --font-display: 'Georgia', serif; /* Example: use a serif font. You'd typically link a Google Font here */
}

/* Ensure images within cards are centered and scale correctly */
.product-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Take full height of its parent */
  width: 100%; /* Take full width of its parent */
}

.product-image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Ensures the whole image is visible within the container */
}

/* Specific styling for tags, if needed beyond Tailwind */
.tag-style {
  letter-spacing: 0.05em; /* Slightly increased letter spacing for tags */
}
</style>