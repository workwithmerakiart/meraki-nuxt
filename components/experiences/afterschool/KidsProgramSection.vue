<template>
    <section :id="id" :class="wrapperClass">
        <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            <!-- Left / Right swap with layout prop -->
            <div :class="leftColClass" ref="gfxRef">
                <!-- playful grid cards -->
                <div class="rounded-3xl border border-gray-200 bg-white p-5">
                    <div class="grid grid-cols-6 gap-2">
                        <div v-for="i in 24" :key="i" class="aspect-square rounded-xl"
                            :class="i % 6 === 0 ? 'bg-yellow-100' : i % 5 === 0 ? 'bg-pink-100' : 'bg-blue-50'" />
                    </div>
                </div>
                <p v-if="note" class="mt-4 text-sm text-gray-500">{{ note }}</p>
            </div>

            <div :class="rightColClass">
                <h2 ref="titleRef" class="text-3xl md:text-4xl font-bold mb-3">{{ title }}</h2>
                <p ref="subRef" class="text-lg text-gray-700 mb-4">{{ subtitle }}</p>
                <p ref="introRef" class="text-gray-600 mb-6">{{ intro }}</p>

                <ul v-if="bullets?.length" ref="bulletsRef" class="space-y-2 text-gray-700 mb-6">
                    <li v-for="(b, i) in bullets" :key="i" class="flex items-start gap-3">
                        <span class="text-xl leading-none">{{ b.icon || '•' }}</span>
                        <span>{{ b.text || b }}</span>
                    </li>
                </ul>

                <ul v-if="features?.length" class="space-y-2 text-gray-700 mb-6" ref="featuresRef">
                    <li v-for="(f, i) in features" :key="i">• {{ f }}</li>
                </ul>

                <button type="button"
                    class="inline-flex items-center rounded-2xl px-5 py-3 text-base font-semibold transition"
                    :class="ctaButtonClass" @click="$emit('cta')" ref="ctaRef">
                    {{ ctaLabel }}
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
    id: { type: String, default: '' },
    title: String,
    subtitle: String,
    intro: String,
    bullets: Array,
    features: Array,
    note: String,
    ctaLabel: { type: String, default: 'Learn more' },
    layout: { type: String, default: 'left' }, // 'left' image-left, 'right' image-right
})

defineEmits(['cta'])

const titleRef = ref(null)
const subRef = ref(null)
const introRef = ref(null)
const bulletsRef = ref(null)
const featuresRef = ref(null)
const ctaRef = ref(null)
const gfxRef = ref(null)

const wrapperClass = computed(() => props.class || '')
const leftColClass = computed(() => props.layout === 'right' ? 'order-2 lg:order-1' : '')
const rightColClass = computed(() => props.layout === 'right' ? 'order-1 lg:order-2' : '')

const ctaButtonClass = computed(() =>
    props.layout === 'right'
        ? 'border border-black text-black hover:bg-black hover:text-white'
        : 'bg-black text-white hover:opacity-90'
)

onMounted(() => {
    if (!process.client) return
    const fadeUp = (el, d = 0) => gsap.fromTo(el, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: 'power3.out', delay: d })
    fadeUp(titleRef.value, .05)
    fadeUp(subRef.value, .12)
    fadeUp(introRef.value, .18)
    if (bulletsRef.value) gsap.fromTo(bulletsRef.value.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .06, ease: 'power3.out', delay: .22 })
    if (featuresRef.value) gsap.fromTo(featuresRef.value.children, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .6, stagger: .06, ease: 'power3.out', delay: .28 })
    fadeUp(ctaRef.value, .3)
    gsap.fromTo(gfxRef.value, { scale: .96, opacity: 0 }, { scale: 1, opacity: 1, duration: .7, ease: 'power2.out', delay: .18 })
})
</script>
