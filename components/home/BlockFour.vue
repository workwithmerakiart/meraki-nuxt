<template>
  <div class="page-container xl:px-12">
    <masonry-wall
      :items="blocksData"
      :columns="3"
      :gap="20"
      :column-width="300"
      :responsive="false"
    >
      <template #default="{ item }">
        <BlockCard
          :key="item.id"
          :block="item"
          :style="{ transitionDelay: `${index * 0.1}s` }"
          :class="{ animate: isAnimated }"
        />
      </template>
    </masonry-wall>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const blocksData = ref([
  {
    id: 1,
    type: "NEWS",
    imageUrl:
      "https://d2csxpduxe849s.cloudfront.net/media/7F8951FF-19D4-45D4-B982D6125B7E7BD3/D6FB31BD-01BC-4FF5-B75A197184B6BEF1/web%20hires%20jpg%2072dpi-SHERMA%20CS_013_REPRO.jpg",
    title: "Cindy Sherman Legacy Project Launches",
    link: "/news/cindy-sherman",
  },
  {
    id: 2,
    type: "EVENTS",
    imageUrl:
      "https://media.hauserwirth.com/asset/998db537-29a9-4b85-8389-8d61724ebfb8/web-hires-jpg-72dpi/YEARW138878_website_crop.jpg",
    title: "Who Am I? Drop-in Event inspired by Michaela Yearwood-Dan",
    link: "/events/who-am-i",
    location: "London",
  },
  {
    id: 3,
    type: "RESIDENCIES",
    imageUrl:
      "https://d2csxpduxe849s.cloudfront.net/media/7F8951FF-19D4-45D4-B982D6125B7E7BD3/2A0E6FCE-B8EC-4E82-8131D2461DE50FC0/web%20hires%20jpg%2072dpi-Uman%20Studio%20Portrait-%202023.%20Photo%20Luigi%20Cazzaniga.jpg",
    title: "In Residence: Uman",
    link: "/residencies/uman",
    location: "Somerset",
  },
  {
    id: 4,
    type: "RESOURCES",
    imageUrl:
      "https://media.hauserwirth.com/m/5fc0259297bd2cd1/original/Foto_deneb_bn.jpg",
    title: "Hospital Rooms: Digital Art School",
    link: "/resources/hospital-rooms",
    location: "HRH.com",
  },
  {
    id: 5,
    type: "NEWS",
    imageUrl:
      "https://media.hauserwirth.com/m/137cf02e8165a378/original/DE-SAINT-PHALLE-NIKI-TINGUELY-JEAN_website-crop.jpg",
    title: "New Exhibition Announced: The Art of Light",
    link: "/news/art-of-light",
  },
  {
    id: 6,
    type: "EVENTS",
    imageUrl:
      "https://media.hauserwirth.com/transform/591da8e0-ff2c-4652-8125-2b8ad8cfdade/IMG_0266",
    title: "Workshop: Mastering Digital Painting",
    link: "/events/digital-painting",
    location: "Online",
  },
  {
    id: 7,
    type: "RESIDENCIES",
    imageUrl:
      "https://media.hauserwirth.com/asset/11b7799e-e54c-4d5f-a8ec-c8b60d0f01a8/web-hires-jpg-72dpi/OD1A8713.jpg",
    title: "Artist Spotlight: Maria Gonzalez",
    link: "/residencies/maria-gonzalez",
  },
  {
    id: 8,
    type: "RESOURCES",
    imageUrl:
      "https://d3cy9zhslanhfa.cloudfront.net/media/7F8951FF-19D4-45D4-B982D6125B7E7BD3/2FDFF006-1A9B-475E-935F34F2DBF2B919/web%20hires%20jpg%2072dpi-Still_107.jpg",
    title: "Guide to Art Investment 2024",
    link: "/resources/art-investment",
  },
]);

const isAnimated = ref(false);

onMounted(() => {
  setTimeout(() => {
    isAnimated.value = true;
  }, 100);
});
</script>

<style>
</style>
