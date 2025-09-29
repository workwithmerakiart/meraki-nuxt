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

    <div class="max-w-7xl mx-auto py-16 px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in posts" :key="post.slug"
          class="group rounded-2xl overflow-hidden bg-white shadow-lg transition-transform duration-300 flex flex-col min-h-[520px]">

          <!-- Image with 3:2 aspect ratio -->
          <div class="relative aspect-[3/2] overflow-hidden">
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
              <NuxtLink :to="`/community/blogs/${post.slug}`"
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
    slug: 'how-art-helps-kids-grow-beyond-the-canvas',
    title: 'How Art Helps Kids Grow Beyond the Canvas',
    excerpt: 'Art activities help children build emotional strength, motor skills, confidence, and communication through hands-on creative learning.',
    image: '/images/blogs/blog1/01.webp',
    date: '2025-09-03'
  },
  {
    slug: 'inside-the-resin-room-tips-from-our-artists',
    title: 'Inside the resin room: Tips from our artists',
    excerpt: 'Practical guidance on resin art with tips from artists in Dubai, covering tools, safety, and classes for beginners and experienced creators.',
    image: '/images/blogs/blog2/01.webp',
    date: '2025-09-01'
  },
  {
    slug: 'throwing-a-creative-birthday-party-heres-what-you-need-to-know',
    title: 'Throwing a Creative Birthday Party? Here’s What You Need to Know',
    excerpt: 'Plan a kids art birthday party in Dubai with hands-on activities, fun workshops, and a checklist to make creative celebrations easy to organise.',
    image: '/images/blogs/blog3/01.webp',
    date: '2025-08-28'
  },
  {
    slug: 'top-5-diy-projects-you-can-try-this-weekend',
    title: 'Top 5 DIY Art Projects You Can Try This Weekend',
    excerpt: 'Turn weekends into mini art festivals with 5 DIY projects using Dubai art supplies. Create useful crafts with a splash of colour and a dose of imagination.',
    image: '/images/blogs/blog4/01.webp',
    date: '2025-08-21'
  },
  {
    slug: 'artist-spotlight-the-story-behind-the-dubai-art-studio',
    title: 'Artist Spotlight: The Story Behind the Dubai Art Studio',
    excerpt: 'Meet the artists behind our Dubai art studio. Discover their story, creative journey, and the vision that shapes our workshops and experiences.',
    image: '/images/blogs/blog5/01.webp',
    date: '2025-09-29'
  }
])

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