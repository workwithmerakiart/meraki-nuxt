<script setup>
import { ref, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

const props = defineProps({
    show: Boolean,
    navigation: Array,
})
const emit = defineEmits(['close'])

const svgPaths = ref([])
const menuContainer = ref(null)
const hoveredIndex = ref(null) // track hovered heading

const pathsClosed = [
    "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
    "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
    "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
    "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
    "M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0",
]
const pathsOpened = [
    "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
    "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
    "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
    "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
    "M 0 0 V 100 C 50 100 50 100 100 100 V 0 H 0",
]

const gradientIds = [
    'url(#grad1)',
    'url(#grad2)',
    'url(#grad3)',
    'url(#grad4)',
    'url(#grad5)',
]

watch(
    () => props.show,
    async (open) => {
        await nextTick()
        svgPaths.value = [...document.querySelectorAll('.shape-overlays__path')]

        if (open) {
            if (svgPaths.value.length === 0) return

            const tl = gsap.timeline()
            tl.to(svgPaths.value, {
                duration: 1,
                ease: 'power4.out',
                morphSVG: (i) => pathsOpened[i],
                fill: (i) => gradientIds[i],
                stagger: 0.12,
            })
            tl.fromTo(
                menuContainer.value,
                { autoAlpha: 0, y: 40, scale: 0.9 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
                '-=0.6'
            )
        } else {
            if (svgPaths.value.length === 0) return

            const tl = gsap.timeline()
            tl.to(menuContainer.value, {
                autoAlpha: 0,
                y: 40,
                scale: 0.9,
                duration: 0.4,
                ease: 'power3.in',
            })
            tl.to(
                svgPaths.value,
                {
                    duration: 1,
                    ease: 'power4.inOut',
                    morphSVG: (i) => pathsClosed[i],
                    fill: '#f7f7f7',
                    stagger: 0.1,
                },
                '-=0.6'
            )
            hoveredIndex.value = null
        }
    }
)
</script>

<template>
    <transition name="fade">
        <div v-if="show" class="fixed inset-0 bg-black z-50 overflow-auto text-white" role="dialog" aria-modal="true"
            aria-label="Mobile navigation menu">
            <!-- Cancel X button -->
            <button @click="$emit('close')"
                class="absolute top-6 right-6 text-white hover:text-orange-400 focus:outline-none text-4xl font-light"
                aria-label="Close menu">
                &times;
            </button>

            <!-- Animated SVG background -->
            <svg class="shape-overlays fixed inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100"
                preserveAspectRatio="none">
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
                <path class="shape-overlays__path drop-shadow-lg" d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
                    fill="#f7f7f7" />
                <path class="shape-overlays__path drop-shadow-lg" d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
                    fill="#f7f7f7" />
                <path class="shape-overlays__path drop-shadow-lg" d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
                    fill="#f7f7f7" />
                <path class="shape-overlays__path drop-shadow-lg" d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
                    fill="#f7f7f7" />
                <path class="shape-overlays__path drop-shadow-lg" d="M 0 0 V 0 C 50 0 50 0 100 0 V 0 H 0"
                    fill="#f7f7f7" />
            </svg>

            <div ref="menuContainer" class="container relative z-10 max-w-6xl mx-auto px-8 py-16 flex space-x-12">
                <!-- Left side: Headings -->
                <nav class="w-1/4">
                    <ul class="space-y-8 uppercase font-bold text-3xl">
                        <li v-for="(item, index) in navigation" :key="item.label" @mouseenter="hoveredIndex = index"
                            @mouseleave="hoveredIndex = null" class="cursor-pointer hover:text-orange-400 transition">
                            {{ item.label }}
                            <span v-if="hoveredIndex === index"
                                class="inline-block ml-2 text-orange-400 font-bold">&#8250;</span>
                        </li>
                    </ul>
                </nav>

                <!-- Right side: Children submenu -->
                <div class="w-3/4">
                    <ul v-if="hoveredIndex !== null" class="space-y-4 text-xl">
                        <li v-for="child in navigation[hoveredIndex].children" :key="child.label"
                            class="hover:text-yellow-400 cursor-pointer transition">
                            <NuxtLink :to="child.to" @click="$emit('close')">
                                {{ child.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </transition>
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
</style>
