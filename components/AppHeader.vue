<script setup>
import { ref } from 'vue'
import MobileMenuOverlay from '~/components/MobileMenuOverlay.vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const navigation = [
  { label: 'Home', to: '/' },
  {
    label: "Experiences",
    to: "/experiences",
    children: [
      { label: "Events", to: "/experiences/events" },
      { label: "Workshops", to: "/experiences/workshops" },
      { label: "Courses", to: "/experiences/courses" },
      { label: "Activities", to: "/experiences/activities" },
    ],
  },
  {
    label: "Shop",
    to: "/shop",
    children: [
      { label: "Products", to: "/shop/products" },
      { label: "Custom Orders", to: "/shop/custom-orders" },
    ],
  },
  {
    label: "Studio",
    to: "/studio",
    children: [
      { label: "Our Story", to: "/studio/our-story" },
      { label: "Partner with us", to: "/studio/partner-with-us" },
    ],
  },
  {
    label: "Community",
    to: "/community",
    children: [
      { label: "Blogs", to: "/community/blogs" },
      { label: "Lookbook", to: "/community/lookbook" },
    ],
  },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "Contact us", to: "/about/contact" },
      { label: "FAQs", to: "/about/faqs" },
    ],
  },
];

const navigationStyle = computed(() => ({
  hoveredItem: navigation.find((_, index) => index === hoveredIndex.value),
}));

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    hoveredIndex.value = -1;
  }
};

const onScroll = () => {
  if (process.client) {
    isScrolled.value = window.scrollY > 10;
  }
};

onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", onScroll);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("scroll", onScroll);
  }
});
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 font-light bg-transparent">
    <div class="flex items-center justify-between w-full px-4 sm:px-6 lg:px-8 py-4">
      <NuxtLink to="/" class="flex-shrink-0 pl-2 sm:pl-4">
        <img class="h-8 sm:h-10" src="https://merakiui.com/images/full-logo.svg" alt="Logo" />
      </NuxtLink>

      <button @click="toggleMenu" class="relative w-8 h-6 flex flex-col justify-between items-end pr-2 sm:pr-4 group"
        aria-label="Toggle menu" :aria-expanded="menuOpen">
        <span
          class="h-1 bg-white group-hover:bg-orange-500 transition-all duration-300 ease-in-out rounded-sm w-6 group-hover:w-4"></span>
        <span
          class="h-1 bg-white group-hover:bg-orange-500 transition-all duration-300 ease-in-out rounded-sm w-full group-hover:w-full"></span>
        <span
          class="h-1 bg-white group-hover:bg-orange-500 transition-all duration-300 ease-in-out rounded-sm w-4 group-hover:w-6"></span>
      </button>
    </div>

    <MobileMenuOverlay :show="menuOpen" :navigation="navigation" @close="menuOpen = false" />
  </nav>
</template>

<style scoped>
button:focus {
  outline: 2px solid #f97316;
  outline-offset: 2px;
}
</style>