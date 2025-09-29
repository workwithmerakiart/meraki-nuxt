<template>
    <section class="bg-[#f9f3eb] text-black font-sans">
        <!-- Half-screen Hero -->
        <div class="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
            <img :src="blog.heroImage" :alt="blog.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40"></div>

            <div class="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                <div>
                    <h1 class="text-3xl md:text-5xl font-bold">{{ blog.title }}</h1>
                    <p class="mt-3 text-sm md:text-base opacity-90">{{ blog.metaDescription }}</p>
                </div>
            </div>
        </div>

        <!-- Article -->
        <article class="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-14 prose prose-neutral
         prose-a:text-[#dd4912] prose-a:no-underline hover:prose-a:underline" @click="handleInternalLinks">
            <p class="uppercase tracking-wide text-xs text-gray-500 mb-6">
                {{ formattedDate }}
            </p>

            <template v-for="(block, i) in blog.blocks" :key="i">
                <!-- Headings (explicit size + excluded from prose) -->
                <component v-if="block.type === 'heading'" :is="headingTag(block.level)"
                    :class="['not-prose', headingClass(block.level)]">
                    {{ block.text }}
                </component>

                <!-- Paragraph -->
                <p v-else-if="block.type === 'paragraph' && !block.html" class="mb-6">
                    {{ block.text }}
                </p>
                <p v-else-if="block.type === 'paragraph' && block.html" class="mb-6" v-html="block.text"></p>

                <!-- Image with caption -->
                <figure v-else-if="block.type === 'image'" class="my-8">
                    <img :src="block.src" :alt="block.alt" class="w-full h-auto rounded-lg shadow-sm" />
                    <figcaption v-if="block.caption" class="text-xs text-gray-600 mt-3 text-center">
                        {{ block.caption }}
                    </figcaption>
                </figure>

                <!-- Lists -->
                <ol v-else-if="block.type === 'list' && block.ordered" class="list-decimal pl-6 mb-6 space-y-1">
                    <li v-for="(li, j) in block.items" :key="j">{{ li }}</li>
                </ol>
                <ul v-else-if="block.type === 'list' && !block.ordered" class="list-disc pl-6 mb-6 space-y-1">
                    <li v-for="(li, j) in block.items" :key="j">{{ li }}</li>
                </ul>

                <!-- Spacer -->
                <div v-else-if="block.type === 'spacer'" :class="spacerClass(block.size)"></div>
            </template>

            <div class="mt-12 pt-8 border-t border-black/10">
                <NuxtLink to="/community/blogs" class="text-[#dd4912] font-medium hover:underline">
                    ← Back to Blogs
                </NuxtLink>
            </div>
        </article>
    </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { getBlogBySlug } from '~/data/blogs.js'

const router = useRouter()

function handleInternalLinks(evt) {
    const anchor = evt.target.closest('a')
    if (!anchor) return
    const href = anchor.getAttribute('href')
    // Only hijack site-internal links (start with '/')
    if (href && href.startsWith('/')) {
        evt.preventDefault()
        router.push(href)
    }
}

const route = useRoute()
const blog = getBlogBySlug(String(route.params.slug))
if (!blog) throw createError({ statusCode: 404, statusMessage: 'Blog not found' })

useHead({
    title: blog.title + ' | Meraki',
    meta: [
        { name: 'description', content: blog.metaDescription },
        { property: 'og:title', content: blog.title },
        { property: 'og:description', content: blog.metaDescription },
        { property: 'og:image', content: blog.heroImage }
    ]
})

const formattedDate = computed(() => {
    const d = new Date(blog.date)
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: '2-digit' })
})

function headingTag(level) {
    if (level === 4) return 'h4'
    if (level === 3) return 'h3'
    return 'h2'
}

// explicit sizes so headings never look like body text
function headingClass(level) {
    if (level === 4) return 'mt-8 mb-3 text-lg md:text-xl font-semibold text-black'
    if (level === 3) return 'mt-10 mb-4 text-xl md:text-2xl font-semibold text-black'
    // h2 default
    return 'mt-12 mb-5 text-2xl md:text-3xl font-bold text-black'
}

function spacerClass(size) {
    if (size === 'lg') return 'h-16'
    if (size === 'md') return 'h-10'
    return 'h-6'
}
</script>

<style scoped>
/* keep images tidy even with prose */
.prose :where(img):not(:where(.not-prose *)) {
    margin: 0;
}
</style>