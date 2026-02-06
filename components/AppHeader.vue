<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch,
  nextTick,
} from "vue";
import { gsap } from "gsap"; // ✅ named import
import { useRouter, useRoute } from "vue-router"; // ⭐ ADDED
import { useCartStore } from '~/stores/cart'
import GlobalCartDrawer from '~/components/GlobalCartDrawer.vue'

const router = useRouter(); // ⭐ ADDED
const route = useRoute();

const cart = useCartStore();
const cartCount = computed(() => (cart?.count ?? 0));
const cartBtnRef = ref(null);
const isIconLight = computed(() => showLightHeader.value || !isScrolled.value);

const openCartFromHeader = () => { if (process.client) window.dispatchEvent(new CustomEvent('open-cart')); };

// Show cart icon only on specific sections (and their child routes)
const CART_ALLOWED_PREFIXES = [
  '/experiences/workshops',
  '/experiences/courses',
  '/experiences/activities',
  '/shop/products',
  '/experiences/afterschool',
];

const showCartIcon = computed(() => {
  // normalize by removing trailing slash (but keep root '/')
  let p = route.path;
  if (p.length > 1 && p.endsWith('/')) p = p.replace(/\/+$/, '');
  return CART_ALLOWED_PREFIXES.some(prefix => p === prefix || p.startsWith(prefix + '/'));
});

// NOTE: don't statically import MorphSVGPlugin on the server.
// We'll register it on the client after mount.

const isOpen = ref(false);
const isScrolled = ref(false);
const hoveredIndex = ref(-1);
const canvas = ref(null);

// Transparent header only on the Afterschool page when at top and menu is closed
const isAfterschool = computed(() =>
  route.path.includes("/experiences/afterschool")
); // ⭐ add
const showLightHeader = computed(
  () => isAfterschool.value && !isScrolled.value && !isOpen.value
); // ⭐ add

// Animation related refs
const menuContainer = ref(null);
const navigationHeadings = ref([]);
const submenuChildren = ref([]);
const logoRef = ref(null);
const hamburgerRef = ref(null);

// Desktop submenu lock to prevent accidental parent switches while cursor is over the right column
const submenuLocked = ref(false)
// Set hovered index only when not locked (keeps current parent active while traversing to submenu)
function setHovered(idx) {
  if (submenuLocked.value) return
  hoveredIndex.value = idx
}

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
      { label: "Afterschool Classes", to: "/experiences/afterschool" },
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
      { label: "Franchise", to: "/studio/franchise" },
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
    label: "Matter DXB",
    to: "/matterdxb",
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
    submenuLocked.value = false; // ensure lock is cleared when closing
  }
};

// ⭐ ADDED — navigate helper
const navigate = async (to) => {
  const current = router.currentRoute.value.fullPath;
  if (current === to) {
    isOpen.value = false;
    hoveredIndex.value = -1;
    return;
  }
  try {
    await router.push(to);
  } finally {
    isOpen.value = false;
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
    setHeaderHeightVar();
  }
};

const animateLogoAndHamburger = () => {
  if (logoRef.value && hamburgerRef.value) {
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      gsap.to(logoRef.value, {
        height: isScrolled.value ? "2rem" : "3rem",
        marginLeft: "0rem",
        marginTop: isScrolled.value ? "0" : "0.5rem",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburgerRef.value, {
        marginLeft: "0rem",
        marginTop: isScrolled.value ? "0" : "0.5rem",
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(logoRef.value, {
        height: isScrolled.value ? "2.5rem" : "4rem",
        marginLeft: "0rem",
        marginTop: isScrolled.value ? "0" : "4rem",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(hamburgerRef.value, {
        marginLeft: "0rem",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }
};

const setHeaderHeightVar = () => {
  if (process.client) {
    const h = document.getElementById("site-header")?.offsetHeight || 0;
    document.documentElement.style.setProperty("--header-h", `${h}px`);
  }
};

let fluidInstance = null;

// Manage background scroll lock when menu is open
let __isScrollLocked = false;
let __scrollYBeforeLock = 0;

const lockBodyScroll = () => {
  if (!process.client || __isScrollLocked) return;
  __scrollYBeforeLock = window.scrollY || window.pageYOffset || 0;
  const body = document.body;
  body.style.position = "fixed";
  body.style.top = `-${__scrollYBeforeLock}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";
  __isScrollLocked = true;
};

const unlockBodyScroll = () => {
  if (!process.client || !__isScrollLocked) return;
  const body = document.body;
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.overflow = "";
  window.scrollTo(0, __scrollYBeforeLock || 0);
  __isScrollLocked = false;
};

onMounted(async () => {
  if (process.client) {
    try {
      const mod = await import("gsap/MorphSVGPlugin");
      const MorphSVGPlugin = mod.default || mod.MorphSVGPlugin;
      if (MorphSVGPlugin) gsap.registerPlugin(MorphSVGPlugin);
    } catch { }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", animateLogoAndHamburger);
    document.addEventListener("touchstart", handleOutsideTouch);
    animateLogoAndHamburger();
    setHeaderHeightVar();
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
    // Ensure scroll is restored if component unmounts while menu open
    unlockBodyScroll();
  }
});

watch(
  () => isOpen.value,
  async (open) => {
    submenuLocked.value = false; // reset lock every time drawer toggles
    await nextTick();
    navigationHeadings.value = [
      ...document.querySelectorAll(".navigation-heading"),
    ];
    submenuChildren.value = [...document.querySelectorAll(".sublink")];

    if (open) {
      lockBodyScroll();
      if (process.client && canvas.value) {
        import(
          "https://cdn.jsdelivr.net/npm/webgl-fluid@0.3/dist/webgl-fluid.mjs"
        ).then(({ default: WebGLFluid }) => {
          fluidInstance = WebGLFluid(canvas.value, {
            TRIGGER: "hover",
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
            SUNRAYS_WEIGHT: 1.0,
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
      unlockBodyScroll();
      submenuLocked.value = false;
      hoveredIndex.value = -1;
    }
  }
);
</script>

<template>
  <header id="site-header" class="header fixed top-0 left-0 w-full z-50 transition-all duration-300" :class="{
    'bg-white': (isScrolled || isOpen) && !showLightHeader,
    'bg-transparent': showLightHeader, // ⭐ add
  }">
    <div class="flex items-center justify-between px-8 lg:px-16 h-20">
      <NuxtLink to="/" class="text-white font-bold text-xl flex items-center h-full z-50">
        <img ref="logoRef" class="h-12 sm:h-16 md:h-24" :src="'/images/meraki-logo-black.png'" :class="{
          'filter-white': showLightHeader || !isScrolled, // ⭐ changed: prefer white when hero under header
          'filter-black': !showLightHeader && isScrolled,
        }" style="transition: filter 0.3s ease" alt="Logo" />
      </NuxtLink>
      <!-- Right controls: Cart + Hamburger grouped -->
      <div class="flex items-center z-50">
        <!-- Cart Button -->
        <button
          v-if="showCartIcon"
          ref="cartBtnRef"
          @click="openCartFromHeader"
          aria-label="Open cart"
          class="relative focus:outline-none cart-btn mr-3 sm:mr-4 md:mr-5 lg:mr-6"
        >
          <!-- Bag Icon -->
          <svg
            class="w-7 h-7 md:w-8 md:h-8"
            :class="isIconLight ? 'cart-icon--light' : 'cart-icon--dark'"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6 7V6a6 6 0 1 1 12 0v1h1.25c.41 0 .75.34.75.75V21a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7.75c0-.41.34-.75.75-.75H6zm2 0h8V6a4 4 0 1 0-8 0v1z"/>
          </svg>
          <!-- Count Badge (always visible, shows 0 by default) -->
          <span class="cart-badge">{{ cartCount }}</span>
        </button>

        <!-- Hamburger Button (unchanged ref and classes) -->
        <a ref="hamburgerRef" href="javascript:void(0)" @click="toggleMenu" class="hamburger"
           :class="{ 'is-scrolled': isScrolled && !isOpen, 'is-open': isOpen }">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </a>
      </div>
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
              <div
                v-for="(item, index) in navigation"
                :key="index"
                class="group text-2xl md:text-5xl font-semibold tracking-tight cursor-pointer navigation-heading"
              >
                <!-- Parent WITHOUT children: clickable link -->
                <NuxtLink
                  v-if="!item.children || !item.children.length"
                  :to="item.to"
                  class="outline-text inline-block px-2 py-1 transition-all duration-300"
                  :class="hoveredIndex === index ? 'text-white active' : 'text-gray-500'"
                  @mouseenter="setHovered(index)"
                  @focus="setHovered(index)"
                  @touchstart.stop.prevent="navigate(item.to)"
                  @click.prevent="navigate(item.to)"
                >
                  {{ item.label }}
                  <span
                    v-if="item.label === 'Matter DXB'"
                    class="ml-2 text-[10px] font-medium bg-[#DD4912] text-white px-2 py-[2px] rounded-full align-middle tracking-wide"
                  >
                    Interior
                  </span>
                </NuxtLink>

                <!-- Parent WITH children: non-clickable label (no navigation) -->
                <button
                  v-else
                  type="button"
                  class="outline-text inline-block px-2 py-1 transition-all duration-300 text-left"
                  :class="hoveredIndex === index ? 'text-white active' : 'text-gray-500'"
                  @mouseenter="setHovered(index)"
                  @focus="setHovered(index)"
                  @touchstart.prevent="setHovered(index)"
                  @click.prevent="setHovered(index)"
                >
                  {{ item.label }}
                </button>
              </div>
            </div>
            <div class="w-1/2 pl-8 md:pl-16 space-y-2" @mouseenter="submenuLocked = true" @mouseleave="submenuLocked = false">
              <div v-if="
                navigationStyle.hoveredItem &&
                navigationStyle.hoveredItem.children
              " class="submenu-list">
                <div v-for="(child, cIndex) in navigationStyle.hoveredItem
                  .children" :key="cIndex"
                  class="sublink group relative text-lg md:text-2xl text-gray-300 hover:text-white transition-all duration-300 ease-out mb-7 cursor-pointer">
                  <!-- ⭐ CHANGED -->
                  <NuxtLink :to="child.to" @click.prevent="navigate(child.to)" class="block">
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
</header>
    <GlobalCartDrawer />
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
  /* No fill initially */
  -webkit-text-stroke: 0.5px #ffffff75;
  /* Outline stays */
  background: linear-gradient(to right, white 0%, white 100%);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  /* Start with no fill horizontally */
  background-position: left;
  /* Fill will grow from left to right */
  -webkit-background-clip: text;
  background-clip: text;
  transition: background-size 0.7s ease-in-out;
  font-family: "Inter", sans-serif;
  font-weight: 700;
}

.outline-text.active {
  background-size: 100% 100%;
  /* Fill expands fully */
}

.sublink a {
  position: relative;
  padding-bottom: 4px;
}

.sublink a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0;
  height: 5px;
  background: linear-gradient(90deg, #ffffff, #ffffff, #ffffff);
  transition: width 0.4s ease;
}

.sublink:hover a::after {
  width: 100%;
}

.sublink:hover a {
  font-weight: 700;
}

.submenu-list {
  width: max-content;
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

/* When header is transparent, we want white hamburger lines by default */
:global(header.bg-transparent) .hamburger-line {
  background: #fff;
}

.cart-btn { position: relative; display: inline-flex; align-items: center; justify-content: center; }
.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9999px;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  font-weight: 700;
  background: #000;
  color: #fff;
  border: 1px solid #000;
}
.cart-icon--light { color: #fff; }
.cart-icon--dark { color: #000; }

/* When header is transparent, keep badge visible with white border */
:global(header.bg-transparent) .cart-badge { background: #000; color: #fff; border-color: #000; }

/* ⭐ add */
/* Existing styles below unchanged */
</style>
