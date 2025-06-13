<template>
  <nav :class="[
    'app-header fixed top-0 left-0 w-full z-50 transition-all duration-300 font-light',
    isScrolled ? 'bg-white shadow text-black' : 'bg-transparent text-white'
  ]">
    <div class="container mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/">
        <img class="h-6 sm:h-8"
          :src="isScrolled ? 'https://merakiui.com/images/full-logo.svg' : 'https://merakiui.com/images/full-logo.svg'"
          alt="Logo" />
      </NuxtLink>

      <!-- Menu -->
      <ul class="flex space-x-10 items-center text-sm relative">
        <li v-for="item in navigation" :key="item.label" class="relative group mr-0">
          <!-- Parent Menu -->
          <div
            class="font-bold px-5 py-2 cursor-pointer w-40 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-gray-700 transition">
            <NuxtLink :to="item.to" class="block w-full h-full">
              {{ item.label }}
            </NuxtLink>
          </div>

          <!-- Dropdown -->
          <ul v-if="item.children"
            class="absolute left-0 w-40 bg-zinc-900 text-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-y-0 group-hover:scale-y-100 origin-top transition duration-300 ease-out z-50"
            :style="{ top: '100%' }">
            <li v-for="child in item.children" :key="child.label" class="last:border-none">
              <NuxtLink :to="child.to" class="block px-5 py-3 hover:bg-gray-800 transition-colors">
                {{ child.label }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > window.innerHeight / 2
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navigation = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Experiences',
    to: '/experiences',
    children: [
      { label: 'Events', to: '/experiences/events' },
      { label: 'Workshops', to: '/experiences/workshops' },
      { label: 'Courses', to: '/experiences/courses' },
      { label: 'Activities', to: '/experiences/activities' },
    ],
  },
  {
    label: 'Shop',
    to: '/shop',
    children: [
      { label: 'Products', to: '/shop/products' },
      { label: 'Custom Orders', to: '/shop/custom-orders' },
    ],
  },
  {
    label: 'Studio',
    to: '/studio',
    children: [
      { label: 'Our Story', to: '/studio/our-story' },
      { label: 'Partner with us', to: '/studio/partner-with-us' },
    ],
  },
  {
    label: 'Community',
    to: '/community',
    children: [
      { label: 'Blogs', to: '/community/blogs' },
      { label: 'Lookbook', to: '/community/lookbook' },
    ],
  },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Contact us', to: '/about/contact' },
      { label: 'FAQs', to: '/about/faqs' },
    ],
  },
]
</script>

<style scoped>
.app-header * {
  font-family: "Inter", sans-serif;
  transition: color 0.3s ease, background-color 0.3s ease;
}
</style>
