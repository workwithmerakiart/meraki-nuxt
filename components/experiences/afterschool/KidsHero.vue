<template>
    <section class="relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]">
        <!-- Backdrop -->
        <div class="relative h-[56vh] md:h-[64vh] w-full" :style="{
            backgroundImage: `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.25)), url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }" ref="heroRef">
            <!-- Decorative confetti blobs -->
            <div
                class="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full blur-3xl opacity-50 bg-yellow-300">
            </div>
            <div
                class="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full blur-3xl opacity-40 bg-sky-300">
            </div>

            <!-- Content -->
            <div class="absolute inset-0 flex items-center">
                <div class="px-6 md:px-10 lg:px-16 w-full">
                    <div class="max-w-4xl text-white">
                        <h1 ref="titleRef" class="text-4xl md:text-6xl font-extrabold tracking-tight">
                            {{ title }}
                        </h1>
                        <div ref="badgeRef" class="mt-5 grid gap-2">
                            <div v-for="(line, i) in badgeLines" :key="i"
                                class="inline-flex items-center rounded-2xl bg-white/15 backdrop-blur px-4 py-2 text-sm md:text-base">
                                <span class="mr-2">🎨</span> {{ line }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom curve -->
            <svg class="absolute bottom-[-1px] left-0 w-full" height="40" viewBox="0 0 1440 40"
                preserveAspectRatio="none">
                <path d="M0,0 C240,40 1200,40 1440,0 L1440,40 L0,40 Z" fill="white" />
            </svg>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

defineProps({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    badgeLines: { type: Array, default: () => [] }
})

const titleRef = ref(null)
const badgeRef = ref(null)
const heroRef = ref(null)

onMounted(() => {
    if (!process.client) return
    gsap.fromTo(
        titleRef.value,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.05 }
    )
    gsap.fromTo(
        badgeRef.value?.children || [],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.15 }
    )
})
</script>
