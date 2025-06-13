<template>
  <header
    class="header fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{ 'bg-black/30': isScrolled && !isOpen, 'fixed inset-0 bg-[#2c2c2c] flex flex-col': isOpen }"
  >
    <div class="flex items-center justify-between px-6 h-16">
      <NuxtLink to="/" class="text-white font-bold text-xl flex items-center h-full">
        <img
          class="h-6 sm:h-8"
          :src="'https://merakiui.com/images/full-logo.svg'"
          alt="Logo"
        />
      </NuxtLink>
      <a
        v-if="!isOpen"
        href="javascript:void(0)"
        @click="toggleMenu"
        class="hamburger z-50"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </a>
      <button
        v-if="isOpen"
        @click="toggleMenu"
        class="text-5xl font-black text-white z-50 transition-transform duration-300 hover:rotate-90"
      >
        &times;
      </button>
    </div>

    <transition name="slide-fade">
      <div v-if="isOpen" class="flex flex-1 overflow-y-auto px-8 py-8 lg:px-16 lg:py-12">
        <div class="flex flex-1">
          <div class="w-1/2 space-y-4 md:space-y-6">
            <div
              v-for="(item, index) in navigation"
              :key="index"
              @mouseenter="hoveredIndex = index"
              class="group text-4xl md:text-5xl font-semibold tracking-tight cursor-pointer"
            >
              <NuxtLink
                :to="item.to"
                class="outline-text block transition-all duration-300"
                :class="
                  hoveredIndex === index
                    ? 'text-white'
                    : 'text-gray-500'
                "
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="w-1/2 pl-8 md:pl-16 space-y-4 pt-6">
            <div
              v-if="navigationStyle.hoveredItem && navigationStyle.hoveredItem.children"
              v-for="(child, cIndex) in navigationStyle.hoveredItem.children"
              :key="cIndex"
              class="sublink text-xl md:text-2xl text-gray-100 hover:text-white transition-colors duration-200"
            >
              <NuxtLink :to="child.to">{{ child.label }}</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const isOpen = ref(false);
const isScrolled = ref(false);
const hoveredIndex = ref(-1); // Initialize to -1 so no submenu is active by default

const navigation = [
  {
    label: "Home",
    to: "/",
  },
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
  if (!isOpen.value) { // Only reset hovered index when closing the drawer
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

<style scoped>
/* Slide-fade animation for drawer */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

/* Hamburger menu styling */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute lines vertically */
  align-items: flex-end;
  cursor: pointer;
  height: 30px; /* Increased height */
  width: 38px; /* Increased width */
  margin-left: 30px;
}

.hamburger-line {
  height: 4px; /* Increased thickness */
  background: #fff;
  transition: all 0.3s ease;
  display: block;
}

.hamburger-line:first-child {
  width: 20px; /* Adjusted width */
}
.hamburger-line:nth-child(2) {
  width: 44px; /* Adjusted width */
}
.hamburger-line:last-child {
  width: 32px; /* Adjusted width */
}

.hamburger:hover .hamburger-line {
  background-color: #f97316;
}

.hamburger:hover .hamburger-line:first-child {
  width: 15px;
}
.hamburger:hover .hamburger-line:nth-child(2) {
  width: 35px;
  transition-delay: 0.1s;
}
.hamburger:hover .hamburger-line:last-child {
  width: 25px;
  transition-delay: 0.2s;
}

/* Outline text styling for main menu items */
.outline-text {
  color: transparent;
  -webkit-text-stroke: 1.5px #888; /* Slightly thicker outline */
  transition: color 0.3s ease, -webkit-text-stroke-color 0.3s ease;
}

.outline-text:hover {
  color: white;
  -webkit-text-stroke-color: white;
}

.outline-text.text-white {
  color: white;
  -webkit-text-stroke-color: white;
}

/* Sublink styling */
.sublink {
  position: relative;
  padding-left: 25px; /* Increased to make room for bullet */
  border-left: 3px solid transparent; /* Thicker border */
  transition: all 0.3s ease; /* Smooth transition for all properties */
  line-height: 1.5; /* Add some line height for better spacing */
}

.sublink::before {
  content: "•"; /* Bullet point */
  position: absolute;
  left: 5px; /* Position the bullet */
  top: 50%;
  transform: translateY(-50%);
  color: #f97316; /* Accent color for bullet */
  font-size: 0.8em; /* Smaller bullet relative to text */
  opacity: 0.7; /* Slightly faded */
  transition: all 0.3s ease;
}

.sublink:hover {
  border-left-color: #f97316;
  padding-left: 30px; /* Moves further on hover */
}

.sublink:hover::before {
  color: white; /* Bullet color changes on hover */
  opacity: 1;
  transform: translateY(-50%) translateX(5px); /* Bullet moves right */
}
</style>