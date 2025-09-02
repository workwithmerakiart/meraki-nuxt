<script setup>
import { computed } from 'vue'

const props = defineProps({
    // [{ src: '/images/lookbook/1.jpg', alt: '…' }, ...]
    images: { type: Array, default: () => [] },
    // number of columns per breakpoint
    cols: {
        type: Object,
        default: () => ({ base: 1, sm: 2, lg: 3, xl: 4 }), // tweak if you like
    },
    rounded: { type: String, default: 'rounded-xl' },
})

// cycle through heights to create a varied collage
const heightCycle = ['h-56', 'h-72', 'h-64', 'h-80', 'h-48', 'h-96']

const items = computed(() =>
    props.images.map((img, i) => ({
        ...img,
        hClass: heightCycle[i % heightCycle.length],
    }))
)
</script>

<template>
    <section class="bg-white">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
            <!-- CSS columns masonry -->
            <div class="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4" :class="{
                'columns-1': cols.base === 1,
                'sm:columns-2': cols.sm === 2,
                'lg:columns-3': cols.lg === 3,
                'xl:columns-4': cols.xl === 4,
            }">
                <figure v-for="(img, i) in items" :key="i"
                    class="mb-4 break-inside-avoid overflow-hidden shadow-sm ring-1 ring-black/5" :class="[rounded]">
                    <div class="relative w-full" :class="img.hClass">
                        <img :src="img.src" :alt="img.alt || ''" class="absolute inset-0 h-full w-full object-cover"
                            loading="lazy" decoding="async" />
                    </div>
                    <figcaption v-if="img.caption" class="px-3 py-2 text-xs text-neutral-600">
                        {{ img.caption }}
                    </figcaption>
                </figure>
            </div>
        </div>
    </section>
</template>
