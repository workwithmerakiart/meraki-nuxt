<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed, onMounted, onBeforeUnmount } from 'vue'
import FreeGame from '~/components/FreeGame.vue'

const router = useRouter()
const route = useRoute()

const name = route.query?.name
const calledFrom = route.query?.calledFrom

const titleText = computed(() => {
  if (calledFrom === 'Homepage' && name) {
    return `Hello ${name}`
  }
  return 'Page not found'
})

const goWorkshops = () => router.push('/experiences/workshops')
const goHome = () => router.push('/')

onMounted(() => {
  document.body.classList.add('pnf-page')
})

onBeforeUnmount(() => {
  document.body.classList.remove('pnf-page')
})
</script>

<template>
    <section class="pnf">
        <!-- subtle illustration layer -->
        <div class="pnf__bg" aria-hidden="true">
            <span class="blob blob--a" />
            <span class="blob blob--b" />
            <span class="spark spark--1" />
            <span class="spark spark--2" />
            <span class="spark spark--3" />
        </div>

        <div class="pnf__wrap">
            <div class="pnf__card">
                <div class="pnf__top">
                    <div class="pnf__badge">404</div>
                    <h1 class="pnf__title">{{ titleText }}</h1>
                    <p class="pnf__sub">
                        This link doesn’t exist (or it moved). While you’re here, want a tiny challenge? 🙂
                    </p>
                </div>

                <div class="pnf__actions">
                    <button class="btn btn--primary" @click="goWorkshops">
                        Explore Workshops
                    </button>

                    <button class="btn btn--ghost" @click="goHome">
                        Back to Home
                    </button>
                </div>

                <!-- Free game (reusable) -->
                <div class="pnf__game">
                    <FreeGame />
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
/* Page shell */
.pnf {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: #faf6ef;
    padding: 28px 16px;
    position: relative;
    overflow: hidden;
}

.pnf__wrap {
    width: 100%;
    max-width: 880px;
    position: relative;
    z-index: 2;
}

.pnf__card {
    border-radius: 24px;
    padding: 22px;
}

.pnf__top {
    text-align: center;
    padding: 10px 8px 6px;
}

.pnf__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 62px;
    height: 36px;
    border-radius: 999px;
    background: #000;
    color: #fff;
    font-weight: 800;
    letter-spacing: 1px;
    margin-bottom: 10px;
    transform: translateY(0);
    animation: floaty 3.2s ease-in-out infinite;
}

.pnf__title {
    font-size: clamp(28px, 3.2vw, 44px);
    line-height: 1.1;
    font-weight: 900;
    margin: 0 0 8px;
    color: #111;
}

.pnf__sub {
    margin: 0 auto;
    max-width: 56ch;
    color: rgba(0, 0, 0, 0.6);
    font-size: 15px;
}

.pnf__actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 16px 0 18px;
}

/* Buttons */
.btn {
    border-radius: 999px;
    padding: 12px 18px;
    font-weight: 700;
    border: 1px solid rgba(0, 0, 0, 0.12);
    transition: transform 0.15s ease, background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
    cursor: pointer;
    user-select: none;
}

.btn:active {
    transform: scale(0.98);
}

.btn--primary {
    background: #000;
    color: #fff;
    border-color: #000;
}

.btn--primary:hover {
    opacity: 0.92;
}

.btn--ghost {
    background: transparent;
    color: #000;
}

.btn--ghost:hover {
    background: rgba(0, 0, 0, 0.06);
}

.btn--sm {
    padding: 8px 12px;
    font-size: 13px;
}

/* Subtle illustration background */
.pnf__bg {
    position: absolute;
    inset: -60px;
    z-index: 1;
    pointer-events: none;
}

.blob {
    position: absolute;
    width: 340px;
    height: 340px;
    border-radius: 999px;
    filter: blur(40px);
    opacity: 0.18;
    background: #000;
    animation: drift 8s ease-in-out infinite;
}

.blob--a {
    left: -120px;
    top: -80px;
    animation-delay: 0s;
}

.blob--b {
    right: -140px;
    bottom: -120px;
    animation-delay: 1.3s;
}

.spark {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.2);
    animation: twinkle 2.6s ease-in-out infinite;
}

.spark--1 {
    left: 16%;
    top: 18%;
    animation-delay: 0.2s;
}

.spark--2 {
    left: 78%;
    top: 26%;
    animation-delay: 0.8s;
}

.spark--3 {
    left: 62%;
    top: 74%;
    animation-delay: 1.4s;
}

/* Animations */
@keyframes drift {

    0%,
    100% {
        transform: translate(0, 0) scale(1);
    }

    50% {
        transform: translate(18px, -10px) scale(1.05);
    }
}

@keyframes twinkle {

    0%,
    100% {
        transform: scale(0.9);
        opacity: 0.15;
    }

    50% {
        transform: scale(1.25);
        opacity: 0.35;
    }
}

@keyframes floaty {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-6px);
    }
}

.pnf__game {
    padding-top: 16px;
    margin-top: 10px;
}

:global(body.pnf-page header),
:global(body.pnf-page .site-header) {
  background: transparent !important;
}

:global(body.pnf-page header img),
:global(body.pnf-page .site-header img),
:global(body.pnf-page .logo),
:global(body.pnf-page .logo img) {
  filter: none !important;
  opacity: 1 !important;
}

:global(body.pnf-page header svg),
:global(body.pnf-page .logo svg) {
  fill: #000 !important;
}
</style>