<!-- pages/matter-by-meraki/index.vue -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Carousel from '@/components/Carousel.vue'

let io // single IntersectionObserver instance

onMounted(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'))

    io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed')
                io.unobserve(entry.target)
            }
        })
    }, { threshold: 0.12 })

    els.forEach((el) => {
        const kind = el.getAttribute('data-reveal') || 'up'
        const delay = Number(el.getAttribute('data-delay') || 0)
        el.style.transition = `transform .8s cubic-bezier(.2,.7,.2,1), opacity .8s ease ${delay}ms`
        el.classList.add(`reveal-${kind}`)
        io.observe(el)
    })
})

onBeforeUnmount(() => { if (io) io.disconnect() })

// Subtle parallax for hero ornaments (JS only)
const hero = ref(null)

// Images for Matter DXB carousel
const matterdxbImages = [
    '/images/matterdxb/2.webp',
    '/images/matterdxb/4.webp',
    '/images/matterdxb/4f.webp',
    '/images/matterdxb/11.webp',
    '/images/matterdxb/11f.webp',
    '/images/matterdxb/15f.webp',
    '/images/matterdxb/DC4.webp',
    '/images/matterdxb/DC6.webp',
    '/images/matterdxb/DC7.webp',
    '/images/matterdxb/DH1.webp',
    '/images/matterdxb/DH2.webp',
    '/images/matterdxb/DH3.webp',
    '/images/matterdxb/DH10.webp',
    '/images/matterdxb/ET3.webp',
    '/images/matterdxb/ET7.webp',
    '/images/matterdxb/ET19.webp',
    '/images/matterdxb/ET24.webp',
    '/images/matterdxb/EX3.webp',
    '/images/matterdxb/EX4.webp',
    '/images/matterdxb/EX9.webp',
    '/images/matterdxb/VL4.webp',
    '/images/matterdxb/VL5.webp',
    '/images/matterdxb/VL8.webp',
    '/images/matterdxb/WH221.webp',
    '/images/matterdxb/WI4.webp',
    '/images/matterdxb/WI10.webp'
]
</script>


<template>
    <div class="matterdxb font-sans text-neutral-900"
        style="--matter-accent:#f2b501; --matter-dark:#101113; --matter-ink:#0f0f10">

        <!-- HERO -->
        <section ref="hero" class="relative h-[68vh] md:h-[86vh] overflow-hidden bg-[var(--matter-dark)] text-white">
            <img src="/images/story/story_hero.webp" alt="Matter DXB Hero"
                class="absolute inset-0 w-full h-full object-cover opacity-60" />

            <!-- gradient veil -->
            <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent"></div>

            <!-- full-overlay: bottom on mobile, centered on md+ -->
            <div class="absolute inset-0 z-10
         flex flex-col items-center justify-end md:justify-center
         text-center text-white
         px-4 md:px-8
         pb-8 sm:pb-12
         pt-[calc(env(safe-area-inset-top)+72px)] md:pt-0">
                <div class="w-full max-w-3xl mx-auto" data-reveal="up">

                    <p class="uppercase tracking-[0.35em] text-sm md:text-base opacity-80">Interior Architecture &
                        Design</p>
                    <h1 class="mt-3 text-4xl md:text-6xl font-semibold leading-[1.1]">
                        Matter DXB
                    </h1>
                    <p class="mt-4 max-w-2xl text-base md:text-lg text-white/85">
                        Artistically led by chief interior architect <span class="font-medium">Ms. Kajol Vaswani</span>,
                        crafting
                        visually spectacular interiors for corporate and commercial clients across Dubai.
                    </p>
                    <NuxtLink to="https://www.matterdxb.com/" class="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full border border-white/30 hover:border-white
                   hover:bg-white hover:text-[var(--matter-ink)] transition" data-reveal="up" data-delay="150">
                        Explore our approach
                        <span aria-hidden>→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- ABOUT + IMAGE -->
        <section class="bg-[#f9f3eb]">
            <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
                <div class="relative" data-reveal="left">
                    <!-- layered frame look -->
                    <div class="absolute -top-6 -left-6 w-24 h-24 bg-[var(--matter-accent)] rounded-md"></div>
                    <div class="absolute -bottom-6 -right-6 w-16 h-28 bg-[var(--matter-accent)] rounded-md"></div>
                    <img src="/images/story/story_hero.webp" alt="About Matter DXB"
                        class="relative z-[1] w-full rounded-lg shadow-2xl object-cover" />
                </div>

                <div class="md:pl-6" data-reveal="right" data-delay="60">
                    <h2 class="text-3xl md:text-4xl font-semibold text-[var(--matter-ink)]">About Us</h2>
                    <p class="mt-5 leading-relaxed text-neutral-700">
                        We are an artistically inspired team led by chief interior architect
                        <span class="font-medium">Ms. Kajol Vaswani</span> who bask in the glory of designing visually
                        spectacular
                        interiors for our corporate and commercial customers in Dubai.
                    </p>
                    <p class="mt-4 leading-relaxed text-neutral-700">
                        Our humble journey originated from the idea:
                    </p>
                    <blockquote class="mt-4 italic text-[var(--matter-ink)]/90">
                        “Our interiors are an insight into our brains. It is a collaboration of design, art, humor,
                        irony,
                        functionality, and the street.”
                        <span class="not-italic font-medium"> — Amanda Talbot, <span class="italic">Rethink: The Way You
                                Live</span></span>
                    </blockquote>
                </div>
            </div>
        </section>

        <!-- WE ARE: CREATIVE • DRIVEN • COMMITTED -->
        <section class="bg-[var(--matter-ink)] text-white">
            <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                <div class="text-center mb-12" data-reveal="up">
                    <h3 class="tracking-[0.3em] text-sm opacity-80">WE ARE</h3>
                    <div class="mt-3 w-24 h-1 bg-[var(--matter-accent)] mx-auto rounded-full"></div>
                </div>

                <div class="grid md:grid-cols-3 gap-8">
                    <div class="group relative aspect-square rounded-full overflow-hidden" data-reveal="up">
                        <img src="/images/story/story_hero.webp"
                            class="w-full h-full object-cover brightness-[.85] group-hover:brightness-100 transition" />
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition"></div>
                        <span class="absolute inset-0 m-auto h-min text-center tracking-[0.3em] text-xl">CREATIVE</span>
                    </div>

                    <div class="group relative aspect-square rounded-full overflow-hidden" data-reveal="up"
                        data-delay="120">
                        <img src="/images/story/story_hero.webp"
                            class="w-full h-full object-cover brightness-[.85] group-hover:brightness-100 transition" />
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition"></div>
                        <span class="absolute inset-0 m-auto h-min text-center tracking-[0.3em] text-xl">DRIVEN</span>
                    </div>

                    <div class="group relative aspect-square rounded-full overflow-hidden" data-reveal="up"
                        data-delay="240">
                        <img src="/images/story/story_hero.webp"
                            class="w-full h-full object-cover brightness-[.85] group-hover:brightness-100 transition" />
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition"></div>
                        <span
                            class="absolute inset-0 m-auto h-min text-center tracking-[0.3em] text-xl">COMMITTED</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- MISSION • VISION • VALUES -->
        <section class="bg-[var(--matter-dark)] text-white">
            <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                <h3 class="text-center text-3xl md:text-4xl font-semibold" data-reveal="up">
                    Our Mission, Vision & Values
                </h3>

                <div class="mt-12 grid md:grid-cols-3 gap-10">
                    <div class="space-y-3" data-reveal="up">
                        <div
                            class="w-10 h-10 rounded-full bg-[var(--matter-accent)]/90 flex items-center justify-center">
                            <!-- atom icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9Zm0 0c-2.5 0-5.5 4.03-5.5 9s3 9 5.5 9m0-18c2.5 0 5.5 4.03 5.5 9s-3 9-5.5 9"
                                    stroke="currentColor" />
                            </svg>
                        </div>
                        <h4 class="text-xl font-semibold">Core Values</h4>
                        <p class="text-white/80 leading-relaxed">
                            Originality, resourcefulness, persistence, and perfection drive our craft. We follow
                            ethical, best-practice
                            design to create mesmerising spaces for our clients and their guests.
                        </p>
                    </div>

                    <div class="space-y-3" data-reveal="up" data-delay="120">
                        <div
                            class="w-10 h-10 rounded-full bg-[var(--matter-accent)]/90 flex items-center justify-center">
                            <!-- target icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="8" stroke="currentColor" />
                                <circle cx="12" cy="12" r="4" stroke="currentColor" />
                            </svg>
                        </div>
                        <h4 class="text-xl font-semibold">Mission</h4>
                        <p class="text-white/80 leading-relaxed">
                            Build spaces that are warm, convivial and luxurious—balancing beauty with energy efficiency
                            and pragmatic execution.
                        </p>
                    </div>

                    <div class="space-y-3" data-reveal="up" data-delay="240">
                        <div
                            class="w-10 h-10 rounded-full bg-[var(--matter-accent)]/90 flex items-center justify-center">
                            <!-- trophy icon -->
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M6 4h12v2a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V4Z" stroke="currentColor" />
                                <path d="M9 20h6M12 14v6" stroke="currentColor" />
                            </svg>
                        </div>
                        <h4 class="text-xl font-semibold">Vision</h4>
                        <p class="text-white/80 leading-relaxed">
                            Uncompromising craft and creative freedom—delivering interiors that make spaces come alive.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- HOW IT WORKS / PROCESS -->
        <section class="relative bg-[url('/images/story/story_hero.webp')] bg-cover bg-center">
            <div class="absolute inset-0 bg-black/55"></div>
            <div class="relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 text-white">
                <h3 class="text-center text-3xl md:text-4xl font-semibold" data-reveal="up">How It Works</h3>

                <div class="mt-12 grid md:grid-cols-4 gap-6">
                    <div class="relative aspect-square rounded-full bg-[var(--matter-accent)]/85 text-[var(--matter-ink)]
         flex items-center justify-center text-center px-5 font-semibold tracking-wide" data-reveal="scale">
                        <span>Preparing Blueprints</span>
                    </div>

                    <div class="relative aspect-square rounded-full bg-[var(--matter-accent)]/85 text-[var(--matter-ink)]
         flex items-center justify-center text-center px-5 font-semibold tracking-wide" data-reveal="scale"
                        data-delay="120">
                        <span>Plan Sanction</span>
                    </div>

                    <div class="relative aspect-square rounded-full bg-[var(--matter-accent)]/85 text-[var(--matter-ink)]
         flex items-center justify-center text-center px-5 font-semibold tracking-wide" data-reveal="scale"
                        data-delay="240">
                        <span>Execution</span>
                    </div>

                    <div class="relative aspect-square rounded-full bg-[var(--matter-accent)]/85 text-[var(--matter-ink)]
         flex items-center justify-center text-center px-5 font-semibold tracking-wide" data-reveal="scale"
                        data-delay="360">
                        <span>Bingo!</span>
                    </div>

                </div>

                <p class="mt-10 text-center text-white/85 max-w-3xl mx-auto" data-reveal="up" data-delay="120">
                    A seasoned team of architects, interior designers, artisans and project managers works with you to
                    develop a
                    clear concept, 3-D visualisation and on-site execution—end-to-end.
                </p>
            </div>
        </section>

        <!-- NARRATIVE BLOCK (from your copy) -->
        <section class="bg-[var(--matter-ink)] text-white">
            <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
                <div data-reveal="left">
                    <p class="leading-relaxed text-white/85">
                        Our global expeditions introduced us to marvellous architecture that inspires us to create
                        luxurious,
                        innovative and valuable design solutions for commercial and residential spaces.
                    </p>
                    <p class="mt-4 leading-relaxed text-white/85">
                        We delight customers by shaping spaces that resonate with their unique personality—anchored in
                        customer-centricity, immersive experience and superior quality at competitive pricing.
                    </p>
                    <NuxtLink to="https://www.matterdxb.com/" class="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 hover:border-white
                   hover:bg-white hover:text-[var(--matter-ink)] transition" data-reveal="up" data-delay="120">
                        Start a project
                        <span aria-hidden>→</span>
                    </NuxtLink>
                </div>
                <div class="relative" data-reveal="right" data-delay="60">
                    <img src="/images/story/story_hero.webp" alt="Project"
                        class="w-full rounded-xl shadow-2xl object-cover" />
                </div>
            </div>
        </section>

        <!-- OPTIONAL: Portfolio carousel (kept from your file, shows if component exists) -->
        <section class="bg-[#f9f3eb]">
            <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
                <h3 class="text-2xl md:text-3xl font-semibold text-center mb-8 text-[var(--matter-ink)]"
                    data-reveal="up">
                    Our Work in Focus
                </h3>
                <div data-reveal="up" data-delay="120">
                    <Carousel :images="matterdxbImages" :delay="3000" :pauseOnHover="true" />
                </div>
            </div>
        </section>

        <!-- FINAL CTA -->
        <section class="bg-[var(--matter-accent)] text-[var(--matter-ink)]">
            <div class="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center">
                <p class="text-xl md:text-2xl font-medium" data-reveal="up">
                    Need a refreshing start for your office or commercial space?
                </p>
                <NuxtLink to="https://www.matterdxb.com/" class="inline-block mt-6 px-8 py-3 rounded-full border border-[var(--matter-ink)]/40 hover:border-[var(--matter-ink)]
                 hover:bg-[var(--matter-ink)] hover:text-white transition" data-reveal="up" data-delay="120">
                    Visit MatterDXB
                </NuxtLink>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* reveal presets */
.reveal-up {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
}

.reveal-left {
    opacity: 0;
    transform: translate3d(-28px, 0, 0);
}

.reveal-right {
    opacity: 0;
    transform: translate3d(28px, 0, 0);
}

.reveal-scale {
    opacity: 0;
    transform: scale(.9);
}

.reveal-fade {
    opacity: 0;
}

.revealed {
    opacity: 1 !important;
    transform: none !important;
}
</style>
