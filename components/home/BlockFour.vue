<template>
  <div class="page-container xl:px-12">
    <!-- Added heading with more repetitions for seamless loop -->
    <div class="heading-bg p-2.5 mb-5">
      <h2 class="heading text-5xl font-bold text-[#447c9d] inter-font">
        JOIN OUR UPCOMING EVENTS
      </h2>
    </div>
    <masonry-wall :items="blocksData" :columns="3" :gap="20" :column-width="300" :responsive="false">
      <template #default="{ item }">
        <BlockCard :key="item.id" :block="item" :style="{ transitionDelay: `${index * 0.1}s` }"
          :class="{ animate: isAnimated }" />
      </template>
    </masonry-wall>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const blocksData = ref([
  {
    id: 1,
    type: "WORKSHOPS",
    imageUrl: "/images/workshops/1.webp",
    title: "Creative Mornings @ Meraki",
    link: "/experiences/workshops",
  },
  {
    id: 2,
    type: "WORKSHOPS",
    imageUrl: "/images/workshops/2.webp",
    title: "Moon Texture Art",
    link: "/experiences/workshops",
  },
  {
    id: 3,
    type: "WORKSHOPS",
    imageUrl: "/images/workshops/3.webp",
    title: "Paint & Sip",
    link: "/experiences/workshops",
  },
  {
    id: 4,
    type: "WORKSHOPS",
    imageUrl: "/images/workshops/4.webp",
    title: "Perfume Making",
    link: "/experiences/workshops",
  },
  {
    id: 5,
    type: "WORKSHOPS",
    imageUrl: "/images/workshops/5.webp",
    title: "Cold Process Soap Making",
    link: "/experiences/workshops",
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

.heading {
  font-size: 3rem;
  font-weight: bold;
  font-family: 'DM Serif Display', serif;
  color: #dd4912;
  text-align: center;
}

.heading-bg {
  font-family: 'DM Serif Display', serif;
  background: #f9f3eb;
  text-align: center;
}

.dm-serif-font {
  font-family: 'DM Serif Display', serif;
}

.inter-font {
  font-family: 'DM Serif Display', serif;
}
</style>