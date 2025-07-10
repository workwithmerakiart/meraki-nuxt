<template>
  <div class="bg-[#F9F3EB] min-h-screen py-16 relative overflow-hidden">
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-purple-700 opacity-30 rounded-full mix-blend-multiply transform translate-x-1/2 -translate-y-1/2 animate-blob"
    ></div>
    <div
      class="absolute top-0 right-0 w-48 h-48 bg-orange-500 opacity-30 rounded-full mix-blend-multiply transform translate-x-1/3 -translate-y-1/3 animate-blob animation-delay-2000"
    ></div>

    <div class="container mx-auto px-4">
      <h1
        class="text-6xl block-five-headings font-extrabold text-black text-center mb-4 relative z-10 animate-fade-in-down"
      >
        <span class="text-[#dd4912] block-five-headings">Experience</span> <span class="text-[#1A1A1A] block-five-headings">The Vibe</span>
      </h1>
      <p class="text-black text-center block-five-subheadings mb-12 animate-fade-in font-light">
        Colorful, uninhibited fun for all ages - here's a sneak peak of our unique space:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(image, index) in images"
          :key="image.alt"
          class="group relative overflow-hidden rounded-lg shadow-lg animate-fade-in zoom-in"
          :style="{ 'animation-delay': (index * 0.1) + 's' }"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300"
          >
            <p class="text-white text-lg font-bold">{{ image.hoverText }}</p>
          </div>
        </div>
      </div>
    </div>

    <button
      class="fixed right-0 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white font-bold py-3 px-4 rounded-l-lg shadow-lg z-20 animate-slide-in-right hover:bg-orange-600 transition-colors duration-300"
      style="writing-mode: vertical-lr; text-orientation: mixed;"
    >
      Book now
    </button>

    <button
      class="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg z-20 animate-bounce-fade-in hover:bg-green-600 transition-colors duration-300"
    >
      <svg
        class="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.04 2c-5.45 0-9.91 4.46-9.91 9.91 0 1.75.52 3.48 1.48 4.98L2 22l5.25-1.45c1.47.81 3.16 1.24 4.79 1.24 5.45 0 9.91-4.46 9.91-9.91S17.49 2 12.04 2zm3.39 14.48c-.14.25-.43.3-.67.21-.69-.25-2.07-.84-2.4-.95-.34-.1-.58-.15-.82.11-.25.27-.96.95-1.17 1.14-.2.19-.4.21-.77.1-.38-.1-.99-.37-1.89-1.16-.69-.6-1.15-1.35-1.28-1.58-.13-.23-.01-.35.09-.46.09-.1.21-.25.3-.38.09-.13.12-.22.18-.36.06-.14.03-.26-.02-.37-.06-.1-.38-.9-.52-1.21-.13-.3-.26-.26-.37-.26h-.2c-.11 0-.29.04-.44.18-.15.15-.57.56-.57 1.37s.58 1.59.66 1.7c.07.11 1.1 1.77 2.68 2.45 1.58.68 1.58.45 1.87.42.29-.02.9-.38 1.05-.47.14-.08.25-.13.34-.23.09-.1.18-.21.27-.36.09-.15.15-.26.2-.35.06-.1.12-.21.17-.26.05-.05.12-.08.17-.08h.02z"
        />
      </svg>
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
          src: "https://wildpainthouse.com/public/assets/images/pendulumart.jpg",
          alt: "Abstract art",
          hoverText: "Explore",
        },
        {
          src: "https://wildpainthouse.com/public/assets/images/splat_1.jpg",
          alt: "People enjoying the vibe",
          hoverText: "Immerse",
        },
        {
          src: "https://wildpainthouse.com/public/assets/images/graffiti_outdoor_freestyle.jpg",
          alt: "Person painting",
          hoverText: "Create",
        },
        {
          src: "https://wildpainthouse.com/public/uploads/gallery/home_img5_croped_1676013347.jpg",
          alt: "Outdoor art space",
          hoverText: "Discover",
        },
        {
          src: "https://wildpainthouse.com/public/uploads/gallery/home_img5_croped_1676013347.jpg",
          alt: "Circular paint splatter art",
          hoverText: "Design",
        },
        {
          src: "https://wildpainthouse.com/public/uploads/gallery/home_img5_croped_1676013347.jpg",
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
  0%, 20%, 50%, 80%, 100% {
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
.animation-delay-2000 { animation-delay: 2s; } /* For blob */

.block-five-headings {
  font-family: 'DM Serif Display', serif;
}

.block-five-subheadings {
  font-family: 'Inter', sans-serif;
}
</style>