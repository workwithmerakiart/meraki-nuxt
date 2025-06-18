<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  nextTick,
} from "vue";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

const isOpen = ref(false);
const isScrolled = ref(false);
const hoveredIndex = ref(-1);

// Animation related refs and data
const svgPaths = ref([]);
const menuContainer = ref(null); // Ref for the overall menu content container
const navigationHeadings = ref([]); // Ref for the main navigation headings
const submenuChildren = ref([]); // Ref for the submenu items

const pathsClosed = [
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
  "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
];
const pathsOpened = [
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
  "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
];

const gradientIds = [
  "url(#grad1)",
  "url(#grad2)",
  "url(#grad3)",
  "url(#grad4)",
  "url(#grad5)",
];

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

watch(
  () => isOpen.value,
  async (open) => {
    await nextTick();
    svgPaths.value = [...document.querySelectorAll(".shape-overlays__path")];
    // Get the current references to the elements for animation
    navigationHeadings.value = [
      ...document.querySelectorAll(".navigation-heading"),
    ];
    submenuChildren.value = [...document.querySelectorAll(".sublink")];

    if (open) {
      const tl = gsap.timeline();
      tl.to(svgPaths.value, {
        duration: 1,
        ease: "power4.out",
        morphSVG: (i) => pathsOpened[i],
        fill: (i) => gradientIds[i],
        stagger: 0.12,
      });
      // Animate the main menu container after SVG
      tl.fromTo(
        menuContainer.value,
        { autoAlpha: 0, y: 40, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        "-=0.6"
      );
      // Animate each navigation heading
      tl.from(
        navigationHeadings.value,
        {
          y: 50,
          opacity: 0,
          ease: "power3.out",
          duration: 0.7,
          stagger: 0.08, // Stagger effect
        },
        "-=0.4" // Start this animation slightly before the previous one ends
      );
      // Animate each submenu child
      tl.from(
        submenuChildren.value,
        {
          x: 30, // Animate from left
          opacity: 0,
          ease: "power2.out",
          duration: 0.5,
          stagger: 0.05, // Stagger effect for children
        },
        "-=0.3" // Start after headings
      );
    } else {
      const tl = gsap.timeline();
      // Animate out submenu children
      tl.to(
        submenuChildren.value,
        {
          x: 30, // Animate out to the right
          opacity: 0,
          ease: "power2.in",
          duration: 0.3,
          stagger: {
            each: 0.03,
            from: "end", // Animate out from bottom to top
          },
        },
        "<0.1"
      ); // Start slightly after logo
      // Animate out navigation headings
      tl.to(
        navigationHeadings.value,
        {
          y: 50,
          opacity: 0,
          ease: "power3.in",
          duration: 0.4,
          stagger: {
            each: 0.05,
            from: "end", // Animate out from bottom to top
          },
        },
        "<0.1"
      ); // Start slightly after children
      // Animate out main menu container
      tl.to(
        menuContainer.value,
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.9,
          duration: 0.4,
          ease: "power3.in",
        },
        "<0.1"
      ); // Start slightly after headings
      // Animate SVG last
      tl.to(
        svgPaths.value,
        {
          duration: 1,
          ease: "power4.inOut",
          morphSVG: (i) => pathsClosed[i],
          fill: "#f7f7f7",
          stagger: {
            each: 0.1,
            from: "end", // Close SVG paths from right to left
          },
        },
        "-=0.6"
      );
      hoveredIndex.value = -1;
    }
  }
);
</script>

<template>
  <header
    class="header fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="{
      'bg-white': isScrolled && !isOpen,
      'fixed inset-0 bg-[#2c2c2c] flex flex-col': isOpen,
    }"
  >
    <div class="flex items-center justify-between px-6 h-16">
      <NuxtLink
        to="/"
        class="text-white font-bold text-xl flex items-center h-full z-50"
      >
        <img
          class="h-6 sm:h-8"
          :src="'https://merakiui.com/images/full-logo.svg'"
          alt="Logo"
        />
      </NuxtLink>
      <a
        href="javascript:void(0)"
        @click="toggleMenu"
        class="hamburger z-50"
        :class="{ 'is-scrolled': isScrolled && !isOpen, 'is-open': isOpen }"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </a>
    </div>

    <transition name="fade">
      <svg
        v-if="isOpen"
        class="shape-overlays fixed inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF6B6B" />
            <stop offset="100%" stop-color="#FFD93D" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#6BCB77" />
            <stop offset="100%" stop-color="#4D96FF" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF9F1C" />
            <stop offset="100%" stop-color="#E71D36" />
          </linearGradient>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8338EC" />
            <stop offset="100%" stop-color="#3A86FF" />
          </linearGradient>
          <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#FF477E" />
            <stop offset="100%" stop-color="#FF85A1" />
          </linearGradient>
        </defs>
        <path
          class="shape-overlays__path drop-shadow-lg"
          d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
          fill="#f7f7f7"
        />
        <path
          class="shape-overlays__path drop-shadow-lg"
          d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
          fill="#f7f7f7"
        />
        <path
          class="shape-overlays__path drop-shadow-lg"
          d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
          fill="#f7f7f7"
        />
        <path
          class="shape-overlays__path drop-shadow-lg"
          d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
          fill="#f7f7f7"
        />
        <path
          class="shape-overlays__path drop-shadow-lg"
          d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
          fill="#f7f7f7"
        />
      </svg>
    </transition>

    <transition name="slide-fade">
      <div
        v-if="isOpen"
        ref="menuContainer"
        class="flex flex-1 overflow-y-auto px-8 py-8 lg:px-16 lg:py-12 relative z-10"
      >
        <div class="flex flex-1">
          <div class="w-1/2 space-y-4 md:space-y-6">
            <div
              v-for="(item, index) in navigation"
              :key="index"
              @mouseenter="hoveredIndex = index"
              class="group text-4xl md:text-5xl font-semibold tracking-tight cursor-pointer navigation-heading"
            >
              <NuxtLink
                :to="item.to"
                class="outline-text block transition-all duration-300"
                :class="hoveredIndex === index ? 'text-white' : 'text-gray-500'"
                @click="toggleMenu"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="w-1/2 pl-8 md:pl-16 space-y-2 pt-6">
            <div
              v-if="
                navigationStyle.hoveredItem &&
                navigationStyle.hoveredItem.children
              "
              class="submenu-list"
            >
              <div
                v-for="(child, cIndex) in navigationStyle.hoveredItem.children"
                :key="cIndex"
                class="sublink group relative text-xl md:text-2xl text-gray-300 hover:text-white transition-all duration-300 ease-out py-2 cursor-pointer"
              >
                <NuxtLink :to="child.to" @click="toggleMenu" class="block">
                  {{ child.label }}
                  <span class="sublink-underline"></span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.shape-overlays__path {
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.15));
  transition: fill 0.8s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;
  height: 30px;
  width: 38px;
  margin-left: 30px;
  position: relative;
}

.hamburger-line {
  height: 6px;
  background: #fff;
  transition: all 0.3s ease;
  display: block;
  border-radius: 3px;
}

.hamburger-line:first-child {
  width: 20px;
}
.hamburger-line:nth-child(2) {
  width: 44px;
}
.hamburger-line:last-child {
  width: 32px;
}

.hamburger.is-scrolled .hamburger-line {
  background: #000000;
}

.hamburger:hover .hamburger-line:first-child {
  background-color: #ffd93d; /* Yellow */
  width: 15px;
}
.hamburger:hover .hamburger-line:nth-child(2) {
  background-color: #6bcb77; /* Green */
  width: 35px;
  transition-delay: 0.1s;
}
.hamburger:hover .hamburger-line:last-child {
  background-color: #4d96ff; /* Blue */
  width: 25px;
  transition-delay: 0.2s;
}

.hamburger.is-open .hamburger-line {
  background: #fff;
  position: absolute;
  width: 40px;
  left: 50%;
  top: 50%;
  transform-origin: center;
  transform: translate(-50%, -50%);
}

.hamburger.is-open .hamburger-line:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.hamburger.is-open .hamburger-line:nth-child(2) {
  opacity: 0;
  display: none;
}

.hamburger.is-open .hamburger-line:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.hamburger.is-open:hover .hamburger-line:first-child,
.hamburger.is-open:hover .hamburger-line:last-child {
  transform: translate(-50%, -50%) rotate(45deg) scale(1.1);
  width: 30px;
}

.hamburger.is-open:hover .hamburger-line:first-child {
  background-color: #6bcb77;
}

.hamburger.is-open:hover .hamburger-line:last-child {
  background-color: #4d96ff;
}

.hamburger.is-open:hover .hamburger-line:last-child {
  transform: translate(-50%, -50%) rotate(-45deg) scale(1.1);
}

.outline-text {
  color: transparent;
  -webkit-text-stroke: 1.5px #ffffff75;
  transition: color 0.3s ease, -webkit-text-stroke-color 0.3s ease;
}

.outline-text:hover {
  color: white;
  -webkit-text-stroke-color: white;
}

/* Submenu Styling */
.sublink {
  position: relative;
  padding-left: 0;
  border-left: none;
  overflow: hidden;
  font-size: 1.8rem; /* Increased font size */
  line-height: 1.4; /* Adjusted line height for better readability */
}

.sublink a {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 8px 0; /* Add vertical padding for better spacing */
  transition: padding-left 0.3s ease; /* Smooth transition for padding */
}

/* Underline effect */
.sublink-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px; /* Slightly thicker underline */
  background-color: #ffffff; /* A more vibrant light blue */
  transform: scaleX(0);
  transform-origin: bottom left;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.sublink:hover .sublink-underline {
  transform: scaleX(1);
}

.sublink:hover a {
  padding-left: 20px; /* Slight indent on hover */
  color: #ffffff; /* Change text color on hover to match underline */
}

.sublink:hover::before {
  left: 0;
  opacity: 1;
  transform: translateY(-50%) translateX(0); /* Slide in on hover */
}
</style>
