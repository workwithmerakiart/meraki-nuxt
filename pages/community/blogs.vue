<template>
  <section class="bg-[#f9f3eb] text-black font-sans">
    <!-- Hero Block -->
    <div class="relative w-full h-[300px] md:h-[500px] overflow-hidden">
      <img src="/images/story/story_hero.webp" alt="Blogs Hero" class="w-full h-full object-cover" />
      <div
        class="absolute inset-0 bg-black/40 flex flex-col items-center text-center text-white px-4 justify-end md:justify-center pb-6 sm:pb-10 pt-[calc(env(safe-area-inset-top)+64px)] md:pt-0">
        <h1 class="text-3xl md:text-5xl font-bold uppercase">Blogs</h1>
        <p class="max-w-2xl mt-4 text-base md:text-lg">
          Stories from our studio — ideas, inspiration, and behind-the-scenes notes from Meraki.
        </p>
      </div>
    </div>

    <!-- Block Two: Latest Posts (first 4) -->
    <div class="max-w-7xl mx-auto py-16 px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <article v-for="post in firstFour" :key="post.slug"
          class="group rounded-2xl overflow-hidden bg-white shadow-lg transition-transform duration-300 flex flex-col min-h-[500px]">

          <!-- Image -->
          <div class="relative h-64 overflow-hidden">
            <img :src="post.image" :alt="post.title"
              class="w-full h-full object-cover transform transition duration-500 group-hover:scale-105 brightness-50 group-hover:brightness-100" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-90 group-hover:opacity-0 transition">
            </div>
          </div>

          <!-- Card Content -->
          <div class="flex flex-col flex-1 p-8 justify-between">
            <div>
              <p class="text-sm uppercase tracking-wide text-gray-500">{{ formatDate(post.date) }}</p>
              <h3 class="text-xl font-semibold leading-snug mt-3 line-clamp-2">{{ post.title }}</h3>
              <p class="text-base text-gray-700 mt-4 line-clamp-4">{{ post.excerpt }}</p>
            </div>
            <div class="mt-6">
              <NuxtLink :to="`/blogs/${post.slug}`"
                class="inline-flex items-center gap-2 text-[#dd4912] font-medium hover:underline">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                  class="w-5 h-5 transform transition group-hover:translate-x-1">
                  <path fill-rule="evenodd"
                    d="M13.72 3.72a.75.75 0 011.06 0l6.5 6.5a.75.75 0 010 1.06l-6.5 6.5a.75.75 0 11-1.06-1.06L18.94 12l-5.22-5.22a.75.75 0 010-1.06z"
                    clip-rule="evenodd" />
                  <path fill-rule="evenodd" d="M3 12a.75.75 0 01.75-.75h16.69a.75.75 0 010 1.5H3.75A.75.75 0 013 12z"
                    clip-rule="evenodd" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const posts = ref([
  {
    slug: 'luxury-interior-trends-2025',
    title: '7 Luxury Interior Design Trends that will be leading in 2025',
    excerpt: 'From warm timber palettes to soft curves and artisanal details—here are the top movements shaping luxury spaces this year.',
    image: '/images/story/story_hero.webp',
    date: '2025-09-03'
  },
  {
    slug: 'day-in-life-interior-designer',
    title: 'A Day in the Life of an Interior Designer',
    excerpt: 'Walk through briefs, moodboards, material libraries and site co-ordination—the creative routine behind the craft.',
    image: '/images/story/story_hero.webp',
    date: '2025-09-01'
  },
  {
    slug: 'top-5-signature-projects',
    title: 'Curating the Art of Space: Top 5 Signature Projects',
    excerpt: 'A closer look at five spaces that balance comfort, craft and quiet luxury through thoughtful detailing.',
    image: '/images/story/story_hero.webp',
    date: '2025-08-28'
  },
  {
    slug: 'designing-for-all-senses',
    title: 'Designing for All Senses',
    excerpt: 'How scent, sound, texture and light come together to create immersive environments you feel—not just see.',
    image: '/images/story/story_hero.webp',
    date: '2025-08-21'
  }
])

const firstFour = computed(() => posts.value.slice(0, 4))

function formatDate(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: '2-digit' })
  } catch (e) {
    return ''
  }
}
</script>

<style scoped>
article.group:hover {
  transform: translateY(-6px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>