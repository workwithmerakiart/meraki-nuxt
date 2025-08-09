<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from "vue";
import { gsap } from "gsap"; // ✅ named import

// NOTE: don't statically import MorphSVGPlugin on the server.
// We'll register it on the client after mount.

const isOpen = ref(false);
const isScrolled = ref(false);
const hoveredIndex = ref(-1);
const canvas = ref(null);

// Animation related refs
const menuContainer = ref(null);
const navigationHeadings = ref([]);
const submenuChildren = ref([]);
const logoRef = ref(null);
const hamburgerRef = ref(null);

const navigation = [
  { label: "Home", to: "/" },
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

const handleOutsideTouch = (event) => {
  if (menuContainer.value && !menuContainer.value.contains(event.target)) {
    hoveredIndex.value = -1;
  }
};

const onScroll = () => {
  if (process.client) {
    isScrolled.value = window.scrollY > 10;
    animateLogoAndHamburger();
  }
};

const animateLogoAndHamburger = () => {
  if (logoRef.value && hamburgerRef.value) {
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      gsap.to(logoRef.value, {
        height: isScrolled.value ? "2rem" : "3rem",
        marginLeft: isScrolled.value ? "0" : "0.5rem",
        marginTop: isScrolled.value ? "0" : "0.5rem",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburgerRef.value, {
        marginLeft: isScrolled.value ? "0" : "0.5rem",
        marginTop: isScrolled.value ? "0" : "0.5rem",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(logoRef.value, {
        height: isScrolled.value ? "2.5rem" : "4rem",
        marginLeft: isScrolled.value ? "0" : "4rem",
        marginTop: isScrolled.value ? "0" : "4rem",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburgerRef.value, {
        marginLeft: isScrolled.value ? "0" : "4rem",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }
};

let fluidInstance = null;

onMounted(async () => {
  if (process.client) {
    // ✅ register MorphSVGPlugin on client only
    try {
      const mod = await import("gsap/MorphSVGPlugin");
      const MorphSVGPlugin = mod.default || mod.MorphSVGPlugin;
      if (MorphSVGPlugin) gsap.registerPlugin(MorphSVGPlugin);
    } catch {
      // ignore if not available
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", animateLogoAndHamburger);
    document.addEventListener("touchstart", handleOutsideTouch);
    animateLogoAndHamburger();
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", animateLogoAndHamburger);
    document.removeEventListener("touchstart", handleOutsideTouch);
    if (fluidInstance && fluidInstance.destroy) {
      fluidInstance.destroy();
      fluidInstance = null;
    }
  }
});

watch(
  () => isOpen.value,
  async (open) => {
    await nextTick();
    navigationHeadings.value = [...document.querySelectorAll(".navigation-heading")];
    submenuChildren.value = [...document.querySelectorAll(".sublink")];

    if (open) {
      if (process.client && canvas.value) {
        import('https://cdn.jsdelivr.net/npm/webgl-fluid@0.3/dist/webgl-fluid.mjs').then(({ default: WebGLFluid }) => {
          fluidInstance = WebGLFluid(canvas.value, {
            TRIGGER: 'hover',
            IMMEDIATE: false,
            AUTO: false,
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            DENSITY_DISSIPATION: 1,
            VELOCITY_DISSIPATION: 0.3,
            PRESSURE: 0.8,
            PRESSURE_ITERATIONS: 20,
            CURL: 30,
            SPLAT_RADIUS: 0.35,
            SPLAT_FORCE: 6000,
            SHADING: true,
            COLORFUL: true,
            COLOR_UPDATE_SPEED: 10,
            BACK_COLOR: { r: 0, g: 0, b: 0 },
            TRANSPARENT: false,
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.8,
            BLOOM_THRESHOLD: 0.6,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: true,
            SUNRAYS_RESOLUTION: 196,
            SUNRAYS_WEIGHT: 1.0
          });
        });
      }

      const tl = gsap.timeline();
      tl.fromTo(
        menuContainer.value,
        { autoAlpha: 0, y: 40, scale: 0.9 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
      tl.from(
        navigationHeadings.value,
        {
          y: 50,
          opacity: 0,
          ease: "power3.out",
          duration: 0.7,
          stagger: 0.08,
        },
        "-=0.4"
      );
      tl.from(
        submenuChildren.value,
        {
          x: 30,
          opacity: 0,
          ease: "power2.out",
          duration: 0.5,
          stagger: 0.05,
        },
        "-=0.3"
      );
    } else {
      const tl = gsap.timeline();
      tl.to(
        submenuChildren.value,
        {
          x: 30,
          opacity: 0,
          ease: "power2.in",
          duration: 0.3,
          stagger: { each: 0.03, from: "end" },
        },
        "<0.1"
      );
      tl.to(
        navigationHeadings.value,
        {
          y: 50,
          opacity: 0,
          ease: "power3.in",
          duration: 0.4,
          stagger: { each: 0.05, from: "end" },
        },
        "<0.1"
      );
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
      );
      if (fluidInstance && fluidInstance.destroy) {
        fluidInstance.destroy();
        fluidInstance = null;
      }
      hoveredIndex.value = -1;
    }
  }
);
</script>


<template>
  <header class="header fixed top-0 left-0 w-full z-50 transition-all duration-300" :class="{
    'bg-white': isScrolled && !isOpen,
    'fixed inset-0 bg-black flex flex-col': isOpen,
  }">
    <div class="flex items-center justify-between px-6 h-20">
      <NuxtLink to="/" class="text-white font-bold text-xl flex items-center h-full z-50">
        <img ref="logoRef" class="h-12 sm:h-16 md:h-24" :src="'/images/meraki-logo-black.png'"
          :class="{ 'filter-white': !isScrolled, 'filter-black': isScrolled }" style="transition: filter 0.3s ease;"
          alt="Logo" />
      </NuxtLink>
      <a ref="hamburgerRef" href="javascript:void(0)" @click="toggleMenu" class="hamburger z-50"
        :class="{ 'is-scrolled': isScrolled && !isOpen, 'is-open': isOpen }">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </a>
    </div>

    <ClientOnly>
      <canvas v-if="isOpen" ref="canvas" class="fixed inset-0 w-full h-full pointer-events-auto z-0" />
    </ClientOnly>

    <transition name="slide-fade">
      <div v-if="isOpen"
        class="pointer-events-none flex flex-1 overflow-y-auto px-8 py-8 lg:px-16 lg:py-12 relative z-10">
        <div ref="menuContainer" class="pointer-events-auto flex flex-1">

          <div class="flex flex-1">
            <div class="w-1/2 space-y-4 md:space-y-6">
              <div v-for="(item, index) in navigation" :key="index" @mouseenter="hoveredIndex = index"
                @touchstart.prevent="hoveredIndex = index"
                class="group text-4xl md:text-5xl font-semibold tracking-tight cursor-pointer navigation-heading">

                <NuxtLink :to="item.to" class="outline-text block transition-all duration-300"
                  :class="hoveredIndex === index ? 'text-white' : 'text-gray-500'" @click="toggleMenu">
                  {{ item.label }}
                </NuxtLink>
              </div>
            </div>
            <div class="w-1/2 pl-8 md:pl-16 space-y-2 pt-6">
              <div v-if="navigationStyle.hoveredItem && navigationStyle.hoveredItem.children" class="submenu-list">
                <div v-for="(child, cIndex) in navigationStyle.hoveredItem.children" :key="cIndex"
                  class="sublink group relative text-xl md:text-2xl text-gray-300 hover:text-white transition-all duration-300 ease-out py-2 cursor-pointer">
                  <NuxtLink :to="child.to" @click="toggleMenu" class="block">
                    {{ child.label }}
                    <span class="sublink-underline"></span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;
  height: 30px;
  width: 38px;
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
  background-color: #ffd93d;
  width: 15px;
}

.hamburger:hover .hamburger-line:nth-child(2) {
  background-color: #6bcb77;
  width: 35px;
  transition-delay: 0.1s;
}

.hamburger:hover .hamburger-line:last-child {
  background-color: #4d96ff;
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

.sublink {
  position: relative;
  padding-left: 0;
  border-left: none;
  overflow: hidden;
  font-size: 1.8rem;
  line-height: 1.4;
}

.sublink a {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 12px 0;
  min-height: 44px;
  /* for touch targets */
  transition: padding-left 0.3s ease;
}


.sublink-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  transform: scaleX(0);
  transform-origin: bottom left;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.sublink:hover .sublink-underline {
  transform: scaleX(1);
}

.sublink:hover a {
  padding-left: 20px;
  color: #ffffff;
}

.filter-white {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}

.filter-black {
  filter: brightness(0);
  transition: filter 0.3s ease;
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
</style>