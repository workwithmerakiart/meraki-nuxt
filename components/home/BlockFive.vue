<template>
  <div class="bg-[#F9F3EB] py-16 relative overflow-hidden">
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-purple-700 opacity-30 rounded-full mix-blend-multiply transform translate-x-1/2 -translate-y-1/2 animate-blob">
    </div>
    <div
      class="absolute top-0 right-0 w-48 h-48 bg-orange-500 opacity-30 rounded-full mix-blend-multiply transform translate-x-1/3 -translate-y-1/3 animate-blob animation-delay-2000">
    </div>

    <div class="container mx-auto px-4">
      <h1
        class="text-6xl block-five-headings font-extrabold text-black text-center mb-4 relative z-10 animate-fade-in-down">
        <span class="text-[#dd4912] block-five-headings">Experience</span> <span
          class="text-[#1A1A1A] block-five-headings">The Vibe</span>
      </h1>
      <p class="text-black text-center block-five-subheadings mb-12 animate-fade-in font-light">
        Colorful, uninhibited fun for all ages - here's a sneak peak of our unique space:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(image, index) in images" :key="image.alt"
          class="group relative overflow-hidden rounded-lg shadow-lg animate-fade-in zoom-in"
          :style="{ 'animation-delay': (index * 0.1) + 's' }">
          <img :src="image.src" :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300">
            <p class="text-white text-lg font-bold">{{ image.hoverText }}</p>
          </div>
        </div>
      </div>
    </div>

    <button
      class="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#447C9D] text-white font-bold py-3 px-4 rounded-l-lg shadow-lg z-20 animate-slide-in-right hover:bg-[#376A86] transition-colors duration-300"
      style="writing-mode: vertical-lr; text-orientation: mixed;">
      Book now
    </button>

  </div>
</template>

<script>
export default {
  name: "VibeExperience",
  data() {
    return {
      images: [
        {
          src: "/images/block5/activities_neon_art_zone.webp",
          alt: "Abstract art",
          hoverText: "Explore",
        },
        {
          src: "/images/block5/activities_hero.webp",
          alt: "People enjoying the vibe",
          hoverText: "Immerse",
        },
        {
          src: "/images/block5/activities_decoden.webp",
          alt: "Person painting",
          hoverText: "Create",
        },
        {
          src: "/images/block5/activities_other_diy.webp",
          alt: "Outdoor art space",
          hoverText: "Discover",
        },
        {
          src: "/images/block5/activities_neon_slime.webp",
          alt: "Circular paint splatter art",
          hoverText: "Design",
        },
        {
          src: "/images/block5/afterschool_hero.webp",
          alt: "Colorful sculptures",
          hoverText: "Inspire",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Keyframe animations (unchanged from previous response) */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@keyframes bounceFadeIn {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-5px);
  }

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes blob {
  0% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0, 0) scale(1);
  }
}


/* Apply animations using Tailwind's `animate-` utility */
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-fade-in-down {
  animation: fadeInDown 1s ease-out forwards;
}

.animate-zoom-in {
  animation: zoomIn 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out forwards;
}

.animate-bounce-fade-in {
  animation: bounceFadeIn 1.5s ease-out forwards;
}

.animate-blob {
  animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

/* Delay for sequential animations - now generated dynamically */
.animation-delay-2000 {
  animation-delay: 2s;
}

/* For blob */

.block-five-headings {
  font-family: 'DM Serif Display', serif;
}

.block-five-subheadings {
  font-family: 'Inter', sans-serif;
}
</style>