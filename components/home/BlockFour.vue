<template>
  <div class="page-container-wrapper">
    <!-- Section Heading -->
    <div class="w-full bg-white py-10 px-4 sm:px-8 md:px-12">
      <h2 class="text-4xl md:text-5xl font-extrabold text-center text-black mb-4 block-four-headings text-xl">
        Join Our Upcoming Events
      </h2>
    </div>

    <!-- Main Grid Layout -->
    <div class="page-container">
      <!-- Sticky Sidebar Header -->
      <header class="header-section">
        <div class="header-content">
          <h2 class="header-title block-four-headings">
            Our passionate commitment to Learning is shared with a range of global
            partners...
          </h2>
          <p class="header-author block-four-subheadings">
            DEBBIE HILLYERO<br />SENIOR DIRECTOR OF LEARNING
          </p>
        </div>
      </header>

      <!-- Cards Grid -->
      <section class="blocks-grid">
        <BlockCard v-for="(block, index) in blocksData" :key="block.id" :block="block"
          :style="{ transitionDelay: `${index * 0.1}s` }" :class="{ animate: isAnimated }" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BlockCard from "@/components/BlockCard.vue";

const blocksData = [
  {
    id: 1,
    type: "NEWS",
    imageUrl: "https://d2csxpduxe849s.cloudfront.net/media/7F8951FF-19D4-45D4-B982D6125B7E7BD3/D6FB31BD-01BC-4FF5-B75A197184B6BEF1/web%20hires%20jpg%2072dpi-SHERMA%20CS_013_REPRO.jpg",
    title: "Cindy Sherman Legacy Project Launches",
    link: "/news/cindy-sherman",
  },
  {
    id: 2,
    type: "EVENTS",
    imageUrl: "https://media.hauserwirth.com/asset/998db537-29a9-4b85-8389-8d61724ebfb8/web-hires-jpg-72dpi/YEARW138878_website_crop.jpg",
    title: "Who Am I? Drop-in Event inspired by Michaela Yearwood-Dan",
    link: "/events/who-am-i",
    location: "London",
  },
  {
    id: 3,
    type: "RESIDENCIES",
    imageUrl: "https://d2csxpduxe849s.cloudfront.net/media/7F8951FF-19D4-45D4-B982D6125B7E7BD3/2A0E6FCE-B8EC-4E82-8131D2461DE50FC0/web%20hires%20jpg%2072dpi-Uman%20Studio%20Portrait-%202023.%20Photo%20Luigi%20Cazzaniga.jpg",
    title: "In Residence: Uman",
    link: "/residencies/uman",
    location: "Somerset",
  },
  {
    id: 4,
    type: "RESOURCES",
    imageUrl: "https://media.hauserwirth.com/m/5fc0259297bd2cd1/original/Foto_deneb_bn.jpg",
    title: "Hospital Rooms: Digital Art School",
    link: "/resources/hospital-rooms",
    location: "HRH.com",
  },
  {
    id: 5,
    type: "NEWS",
    imageUrl: "https://media.hauserwirth.com/m/137cf02e8165a378/original/DE-SAINT-PHALLE-NIKI-TINGUELY-JEAN_website-crop.jpg",
    title: "New Exhibition Announced: The Art of Light",
    link: "/news/art-of-light",
  },
  {
    id: 6,
    type: "EVENTS",
    imageUrl: "https://media.hauserwirth.com/transform/591da8e0-ff2c-4652-8125-2b8ad8cfdade/IMG_0266",
    title: "Workshop: Mastering Digital Painting",
    link: "/events/digital-painting",
    location: "Online",
  },
  {
    id: 7,
    type: "RESIDENCIES",
    imageUrl: "https://media.hauserwirth.com/asset/11b7799e-e54c-4d5f-a8ec-c8b60d0f01a8/web-hires-jpg-72dpi/OD1A8713.jpg",
    title: "Artist Spotlight: Maria Gonzalez",
    link: "/residencies/maria-gonzalez",
  },
  {
    id: 8,
    type: "RESOURCES",
    imageUrl: "https://d3cy9zhslanhfa.cloudfront.net/media/7F8951FF-19D4-45D4-B982D6125B7E7BD3/2FDFF006-1A9B-475E-935F34F2DBF2B919/web%20hires%20jpg%2072dpi-Still_107.jpg",
    title: "Guide to Art Investment 2024",
    link: "/resources/art-investment",
  },
];

const isAnimated = ref(false);

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true;
  }, 100);
});
</script>

<style scoped>
.page-container-wrapper {
  background-color: #ffffff;
}

.page-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-areas:
    "header"
    "grid-blocks";
}

@media (min-width: 768px) {
  .page-container {
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "header grid-blocks";
  }
}

@media (min-width: 1024px) {
  .page-container {
    grid-template-columns: 1fr 3fr;
  }
}

.header-section {
  grid-area: header;
  padding-right: 20px;
  align-self: start;
  position: sticky;
  top: 20px;
  height: fit-content;
}

.header-content {
  max-width: 350px;
}

.header-title {
  font-size: 1.8em;
  line-height: 1.4;
  color: #333;
  margin-bottom: 20px;
}

.header-author {
  font-size: 0.9em;
  color: #666;
  line-height: 1.5;
}

.blocks-grid {
  grid-area: grid-blocks;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: minmax(200px, auto);
  align-items: start;
  grid-auto-flow: dense;
}

.blocks-grid>.block-card:nth-child(1),
.blocks-grid>.block-card:nth-child(3) {
  grid-row: span 2;
}

/* Custom Font Styles */
.block-four-headings {
  font-family: 'DM Serif Display', serif;
}

.block-four-subheadings {
  font-family: 'Inter', sans-serif;
}
</style>
