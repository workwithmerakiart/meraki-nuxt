<template>
  <div class="page-container">
    <header class="header-section">
      <div class="header-content">
        <h2 class="header-title">
          Our passionate commitment to Learning is shared with a range of global
          partners...
        </h2>
        <p class="header-author">
          DEBBIE HILLYERO<br />SENIOR DIRECTOR OF LEARNING
        </p>
      </div>
    </header>

    <section class="blocks-grid">
      <BlockCard
        v-for="(block, index) in blocksData"
        :key="block.id"
        :block="block"
        :style="{ transitionDelay: `${index * 0.1}s` }"
        :class="{ animate: isAnimated }"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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
  // Add more content here to test dynamic growth
  {
    id: 5,
    type: "NEWS",
    imageUrl: "https://media.hauserwirth.com/m/137cf02e8165a378/original/DE-SAINT-PHALLE-NIKI-TINGUELY-JEAN_website-crop.jpg", // Placeholder
    title: "New Exhibition Announced: The Art of Light",
    link: "/news/art-of-light",
  },
  {
    id: 6,
    type: "EVENTS",
    imageUrl: "https://media.hauserwirth.com/transform/591da8e0-ff2c-4652-8125-2b8ad8cfdade/IMG_0266", // Placeholder
    title: "Workshop: Mastering Digital Painting",
    link: "/events/digital-painting",
    location: "Online",
  },
  {
    id: 7,
    type: "RESIDENCIES",
    imageUrl: "https://media.hauserwirth.com/asset/11b7799e-e54c-4d5f-a8ec-c8b60d0f01a8/web-hires-jpg-72dpi/OD1A8713.jpg", // Placeholder
    title: "Artist Spotlight: Maria Gonzalez",
    link: "/residencies/maria-gonzalez",
  },
  {
    id: 8,
    type: "RESOURCES",
    imageUrl: "https://d3cy9zhslanhfa.cloudfront.net/media/7F8951FF-19D4-45D4-B982D6125B7E7BD3/2FDFF006-1A9B-475E-935F34F2DBF2B919/web%20hires%20jpg%2072dpi-Still_107.jpg", // Placeholder
    title: "Guide to Art Investment 2024",
    link: "/resources/art-investment",
  },
];

const isAnimated = ref(false);

onMounted(() => {
  // Trigger animation after component mounts
  setTimeout(() => {
    isAnimated.value = true;
  }, 100); // Small delay to ensure CSS is applied before animation starts
});
</script>

<style>
/* Global or app.vue styles for body/html */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f0f2f5;
  overflow-x: hidden; /* Prevent horizontal scroll from initial off-screen cards */
}
</style>

<style scoped>
.page-container {
  display: grid;
  grid-template-columns: 1fr; /* Default to single column */
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto; /* Center the layout */
  box-sizing: border-box; /* Include padding in element's total width and height */

  /* Define areas for responsiveness */
  grid-template-areas:
    "header"
    "grid-blocks";
}

@media (min-width: 768px) {
  .page-container {
    grid-template-columns: 1fr 2fr; /* Two columns for tablet/desktop */
    grid-template-areas: "header grid-blocks"; /* Header on left, grid on right */
  }
}

@media (min-width: 1024px) {
  .page-container {
    grid-template-columns: 1fr 3fr; /* Wider grid for larger screens */
  }
}

.header-section {
  grid-area: header;
  padding-right: 20px; /* Space between header and grid */
  align-self: start; /* Align to the top of its grid area */
  position: sticky; /* Make header sticky */
  top: 20px; /* Stick to 20px from the top */
  height: fit-content; /* Only take up content height */
}

.header-content {
  /* Add styles for your header content */
  max-width: 350px; /* Adjust as needed */
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
  grid-template-columns: repeat(
    auto-fill,
    minmax(250px, 1fr)
  ); /* Responsive columns */
  grid-auto-rows: minmax(200px, auto); /* Flexible row height */
  align-items: start; /* Align items to the start of their grid cell */
  grid-auto-flow: dense; /* Fill in gaps */
}

/* Specific styling for uneven alignment (Masonry-like) */
/* You might need to manually assign grid-row-end or use a library for perfect masonry */
.blocks-grid > .block-card:nth-child(1) {
  /* First block from the image is taller */
  grid-row: span 2;
  /* Adjust as needed based on content height and desired look */
}

.blocks-grid > .block-card:nth-child(2) {
  /* Second block */
  /* default size */
}

.blocks-grid > .block-card:nth-child(3) {
  /* Third block */
  grid-row: span 2;
}

/* Add more specific rules for other blocks if you want a fixed layout like the image */
/* For a dynamic masonry, you'd typically use a JS library or more advanced CSS grid techniques */
</style>
