<template>
  <section class="relative bg-purple-800 text-white py-16 px-6 md:px-12 overflow-hidden">
    <!-- Paint splash image div -->
    <div
      class="absolute top-0 left-0 w-full h-40 md:h-56 bg-no-repeat bg-center bg-contain -mt-24 md:-mt-36 pointer-events-none z-0"
      style="background-image: url('/images/paint-splash-top.svg')"
      aria-hidden="true"
    ></div>

    <div class="max-w-7xl mx-auto text-center mb-12 relative z-10">
      <h2 class="text-4xl font-extrabold tracking-wide mb-4 text-white">OUR EXPERIENCES</h2>
      <p class="text-gray-300 max-w-3xl mx-auto">
        Wild Paint House Dubai offers 6 unique art jamming painting experiences. Let your creative juices flow!
      </p>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto relative z-10"
    >
      <div
        v-for="(item, index) in experiences"
        :key="index"
        :class="[
          'rounded-xl shadow-lg p-6 flex flex-col items-center text-center cursor-pointer transition-colors duration-300 transform transition-transform',
          hoverIndex === index ? 'scale-105 bg-' + item.colorClass + ' text-white' : 'bg-white text-gray-900',
        ]"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <div
          :class="[
            'w-28 h-28 rounded-md mb-5 transition-colors duration-300',
            hoverIndex === index ? 'bg-white' : item.bgColor,
          ]"
        ></div>
        <h3
          :class="[
            'text-lg font-semibold mb-3',
            hoverIndex === index ? 'text-white' : 'text-gray-900',
          ]"
        >
          {{ item.title }}
        </h3>
        <p
          :class="[
            'text-sm leading-relaxed',
            hoverIndex === index ? 'text-white/90' : 'text-gray-600',
          ]"
        >
          {{ item.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const hoverIndex = ref(null)

const experiences = [
  {
    title: 'Events',
    description: 'Join exciting and creative events that bring artists and enthusiasts together.',
    bgColor: 'bg-purple-500',
    colorClass: 'purple-500',
  },
  {
    title: 'Workshops',
    description: 'Hands-on workshops designed for all skill levels to unleash your creativity.',
    bgColor: 'bg-pink-500',
    colorClass: 'pink-500',
  },
  {
    title: 'Courses',
    description: 'Enroll in courses that explore various painting techniques and art styles.',
    bgColor: 'bg-teal-500',
    colorClass: 'teal-500',
  },
  {
    title: 'Activities',
    description: 'Fun and engaging painting activities for kids and adults alike.',
    bgColor: 'bg-indigo-500',
    colorClass: 'indigo-500',
  },
]
</script>

<style scoped>
section {
  padding-top: 6rem;
}

@media (min-width: 768px) {
  section {
    padding-top: 9rem;
  }
}
</style>
