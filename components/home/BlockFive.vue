<template>
  <div class="bg-[#F9F3EB] py-16">
    <div class="container mx-auto px-4">
      <h1
        class="text-6xl block-five-headings font-extrabold text-black text-center mb-4">
        <span class="text-[#dd4912] block-five-headings">Experience</span>
        <span class="text-[#1A1A1A] block-five-headings"> The Vibe</span>
      </h1>
      <p class="text-black text-center block-five-subheadings mb-12 font-light">
        Colorful, uninhibited fun for all ages - here's a sneak peak of our unique space:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(image, index) in images"
          :key="image.alt"
          class="group relative overflow-hidden rounded-lg shadow-lg"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300"
          >
            <p class="text-white text-lg font-bold">{{ image.hoverText }}</p>
          </div>
        </div>
      </div>
    </div>

    <button
      class="fixed right-0 top-1/2 -translate-y-1/2 bg-[#447C9D] text-white font-bold py-3 px-4 rounded-l-lg shadow-lg z-20 hover:bg-[#376A86] transition-colors duration-300"
      style="writing-mode: vertical-lr; text-orientation: mixed;"
    >
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
/* Fonts only — all animations and blob styles removed */
.block-five-headings {
  font-family: 'DM Serif Display', serif;
}

.block-five-subheadings {
  font-family: 'Inter', sans-serif;
}
</style>