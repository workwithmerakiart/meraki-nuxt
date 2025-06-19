<template>
  <NuxtLink :to="block.link" class="block-card">
    <div class="block-card-inner">
      <img :src="block.imageUrl" :alt="block.title" class="block-card-image" />
      <div class="block-card-overlay">
        <h3 class="block-card-title inter-font">{{ block.title }}</h3>
        <p v-if="block.location" class="block-card-location">{{ block.location }}</p>
      </div>
      <div v-if="block.type" class="block-card-badge">{{ block.type }}</div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'id' in value && 'imageUrl' in value && 'title' in value && 'link' in value;
    },
  },
});
</script>

<style scoped>
.block-card {
  display: block;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  will-change: transform, opacity; /* For animation performance */

  /* Initial state for animation */
  transform: translateY(50px);
  opacity: 0;
}

.block-card.animate {
  transform: translateY(0);
  opacity: 1;
}

.block-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.block-card-inner {
  position: relative;
  width: 100%;
  height: 100%; /* Important for image sizing */
  display: flex;
  flex-direction: column;
}

.block-card-image {
  width: 100%;
  height: 100%; /* Make image fill the container */
  object-fit: cover; /* Cover the area, cropping if necessary */
  display: block; /* Remove extra space below image */
}

.block-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  color: white;
  padding: 15px;
  box-sizing: border-box;
}

.block-card-title {
  margin: 0;
  font-size: 1.2em;
  font-weight: bold;
}

.block-card-location {
  margin-top: 5px;
  font-size: 0.9em;
  opacity: 0.8;
}

.block-card-badge {
  position: absolute;
  background-color: #474747;
  color: white;
  padding: 5px 10px;
  font-size: 0.75em;
  text-transform: uppercase;
}

.dm-serif-font {
  font-family: 'DM Serif Display', serif;
}

.inter-font {
  font-family: 'Inter', sans-serif;
}
</style>