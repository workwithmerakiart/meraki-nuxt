<template>
    <section class="featured-in">
        <h2 class="heading">FEATURED IN</h2>
        <div class="marquee-wrapper">
            <div v-for="(row, index) in rows" :key="index" class="marquee-row" :class="{ reverse: index % 2 === 1 }">
                <div class="marquee-content">
                    <div class="logo" v-for="(logo, i) in row.duplicated" :key="i">
                        <img :src="logo" alt="Logo" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

/**
 * Replace these arrays with your actual logo paths.
 * You can use .png, .svg, .avif, .webp, .jpg — whatever.
 * Just put them in your /public/images or /assets and use the path.
 */
const row1 = [
    '/images/Al-Jalila-Fondation-20-1.png',
    '/images/audi-14-logo-svg-vector.svg',
    '/images/bmw-car-logo.png',
    '/images/Bulgari-Logo.wine.png',
    '/images/chalhoub-group-logo-vector.png',
    '/images/DAA_Dubai_American_Academy_GEMS svg.svg',
    '/images/dubai-health-authority.svg',
    '/images/ganache-logo-png_seeklogo-426725.png',
    '/images/Grant_Thornton_logo.png',
];

const row2 = [
    '/images/Harvey_Nichols-Logo.wine.png',
    '/images/Meta-Logo.png',
    '/images/Dior_Logo.svg.png',
    '/images/Lancome-logo.png',
    '/images/logo_black_1_1.png.avif',
    '/images/Logo_da_Rolex.png',
    '/images/Logo_of_the_Young_Presidents_Organization.png',
    '/images/MARLI-LOGO-BLACK-1.webp',
    '/images/Museum_of_the_Future_logo.svg.png',
];

const row3 = [
    '/images/Ora_Brand_Logo.png',
    '/images/png-clipart-loewe-logo-icons-logos-emojis-shop-logos-thumbnail.png',
    '/images/png-clipart-procter-gamble-company-nyse-pg-marketing-procter-gamble-logo-blue-text-2.png',
    '/images/png-clipart-the-dubai-mall-ahmed-seddiqi-sons-retail-watch-shopping-watch-text-retail.png',
    '/images/RIS-310.png',
    '/images/Screenshot-2023-07-27-at-11.35.05-AM-1.png',
    '/images/Snapchat-Logo.wine.svg',
    '/images/The-Executive-Council-of-Dubai@4x-thumb.png',
];

// Duplicate arrays for seamless infinite scrolling
const rows = computed(() => [
    { duplicated: [...row1, ...row1] },
    { duplicated: [...row2, ...row2] },
    { duplicated: [...row3, ...row3] },
]);
</script>

<!-- FeaturedIn.vue (only the <style> block changed) -->
<style scoped>
@import url('https://fonts.cdnfonts.com/css/sell-your-soul');

/* ---------- Sizing knobs (easy to tweak) ---------- */
.featured-in {
    --row-h: 120px;
    /* height of each row */
    --img-h: 90px;
    /* logo image height */
    --img-max-w: 240px;
    /* optional max width */
    --logo-gap: clamp(2rem, 5vw, 4rem);
    /* space between logos */
    text-align: center;
    padding: 3rem 1rem;
    background-color: #F9F3EB;
    overflow: hidden;
}

.heading {
    font-size: 2rem;
    font-weight: bold;
    color: #dd4912;
    font-family: 'DM Serif Display', serif;
    margin-bottom: 2rem;
    position: relative;
    display: inline-block;
}

/* MARQUEE WRAPPER */
.marquee-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    overflow: hidden;
}

/* INDIVIDUAL ROW STYLES */
.marquee-row {
    overflow: hidden;
    width: 100%;
    position: relative;
    height: var(--row-h);
}

/* ANIMATION CONTENT */
.marquee-content {
    display: flex;
    align-items: center;
    /* Use gap for even spacing between logos across all rows */
    gap: var(--logo-gap);
    animation: scroll-left 30s linear infinite;
}

.marquee-row.reverse .marquee-content {
    animation: scroll-right 30s linear infinite;
}

/* LOGO STYLING */
.logo {
    flex: 0 0 auto;
    /* remove per-item padding; spacing handled by flex gap */
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo img {
    height: var(--img-h);
    max-width: var(--img-max-w);
    width: auto;
    object-fit: contain;
    opacity: 0.85;
    transition: opacity 0.3s ease, filter 0.3s ease;
}

.logo img:hover {
    opacity: 1;
    filter: grayscale(0%);
}

/* KEYFRAMES */
@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

@keyframes scroll-right {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}

/* RESPONSIVE IMPROVEMENTS */
@media (max-width: 1024px) {
    .featured-in {
        --row-h: 100px;
        --img-h: 80px;
        --img-max-w: 210px;
    }
}

@media (max-width: 768px) {
    .featured-in {
        --row-h: 80px;
        --img-h: 60px;
        --img-max-w: 180px;
        --logo-gap: clamp(1rem, 4vw, 2rem);
    }
}
</style>
