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
        class="text-white font-bold text-xl flex items-center h-full"
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

    <transition name="slide-fade">
      <div
        v-if="isOpen"
        class="flex flex-1 overflow-y-auto px-8 py-8 lg:px-16 lg:py-12"
      >
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
                :class="hoveredIndex === index ? 'text-white' : 'text-gray-500'"
                @click="toggleMenu"
              >
                {{ item.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="w-1/2 pl-8 md:pl-16 space-y-4 pt-6">
            <div
              v-if="
                navigationStyle.hoveredItem &&
                navigationStyle.hoveredItem.children
              "
              v-for="(child, cIndex) in navigationStyle.hoveredItem.children"
              :key="cIndex"
              class="sublink text-xl md:text-2xl text-gray-100 hover:text-white transition-colors duration-200"
            >
              <NuxtLink :to="child.to" @click="toggleMenu">{{
                child.label
              }}</NuxtLink>
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
const hoveredIndex = ref(-1);

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
</script>

<style scoped>
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
  background: #f97316;
  transform: translate(-50%, -50%) rotate(45deg) scale(1.1);
  width: 30px;
}

.hamburger.is-open:hover .hamburger-line:last-child {
  transform: translate(-50%, -50%) rotate(-45deg) scale(1.1);
}

.outline-text {
  color: transparent;
  -webkit-text-stroke: 1px #ffffff75;
  transition: color 0.3s ease, -webkit-text-stroke-color 0.3s ease;
}

.outline-text:hover {
  color: white;
  -webkit-text-stroke-color: white;
}

.sublink {
  position: relative;
  padding-left: 25px;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
  line-height: 1.5;
}

.sublink::before {
  content: "•";
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #f97316;
  font-size: 0.8em;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.sublink:hover {
  border-left-color: #f97316;
  padding-left: 30px;
}

.sublink:hover::before {
  color: white;
  opacity: 1;
  transform: translateY(-50%) translateX(5px);
}
</style>
