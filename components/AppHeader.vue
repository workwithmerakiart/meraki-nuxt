<template>
  <nav class="app-header bg-white shadow dark:bg-gray-800 relative z-50 font-light">
    <div class="container mx-auto px-6 py-0 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/">
        <img
          class="h-6 sm:h-8"
          src="https://merakiui.com/images/full-logo.svg"
          alt="Logo"
        />
      </NuxtLink>

      <!-- Menu -->
      <ul class="flex space-x-10 items-center text-sm relative">
        <li
          v-for="item in navigation"
          :key="item.label"
          class="relative group mr-0"
        >
          <!-- Parent Menu -->
          <div
            class="px-5 py-4 cursor-pointer w-40 text-gray-800 dark:text-white group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-gray-700 transition"
          >
            <NuxtLink
              :to="item.to"
              class="block w-full h-full"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <!-- Dropdown -->
          <ul
            v-if="item.children"
            class="absolute left-0 w-40 bg-zinc-900 text-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transform scale-y-0 group-hover:scale-y-100 origin-top transition duration-300 ease-out z-50"
            :style="{ top: '100%' }"
          >
            <li
              v-for="child in item.children"
              :key="child.label"
              class="last:border-none"
            >
              <NuxtLink
                :to="child.to"
                class="block px-5 py-3 hover:bg-gray-800 transition-colors"
              >
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
const navigation = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Experiences",
    to: "/experiences",
    children: [
      { label: "Workshops", to: "/experiences/workshops" },
      { label: "Events", to: "/experiences/events" },
      { label: "Activities", to: "/experiences/activities" },
    ],
  },
  {
    label: "Studio",
    to: "/studio",
    children: [
      { label: "Our Story", to: "/studio/our-story" },
      { label: "Meet the Team", to: "/studio/meet-the-team" },
      { label: "Partner Studio Program", to: "/studio/partner-program" },
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
    label: "Community",
    to: "/community",
    children: [
      { label: "Blog", to: "/community/blog" },
      { label: "Testimonials", to: "/community/testimonials" },
    ],
  },
  {
    label: "Support",
    to: "/support",
    children: [
      { label: "Contact Us", to: "/support/contact" },
      { label: "FAQs", to: "/support/faqs" },
    ],
  },
];
</script>

<style scoped>
.app-header * {
  font-family: "Fraunces", serif;
}
</style>
