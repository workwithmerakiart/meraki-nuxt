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
    '/images/aljalilaweb.png.avif',
    '/images/audi-14-logo-svg-vector.svg',
    '/images/bmw-car-logo-735811696610457s9siw7ivja.png',
    '/images/Bulgari-Logo.wine.png',
    '/images/chalhoub-group-logo-vector.png',
    '/images/DAA_Dubai_American_Academy_GEMS svg.svg',
    '/images/dubai-health-authority.svg',
    '/images/ganache-logo-png_seeklogo-426725.png',
    '/images/Grant_Thornton_logo.png',
];

const row2 = [
    '/images/Harvey_Nichols-Logo.wine.png',
    '/images/hd-facebook-meta-logo-png-701751694777707v6bil7t1yh.png',
    '/images/kisspng-logo-business-t-shirt-brand-5b3e0e1bc88971.2433951315307934998214.jpg',
    '/images/Lancome-logo.jpg',
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
    '/images/png-clipart-procter-gamble-company-nyse-pg-marketing-procter-gamble-logo-blue-text.png',
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

<style scoped>
@import url('https://fonts.cdnfonts.com/css/sell-your-soul');
/* SECTION BASE STYLES */
.featured-in {
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
    height: 80px;
}

/* ANIMATION CONTENT */
.marquee-content {
    display: flex;
    align-items: center;
    animation: scroll-left 30s linear infinite;
}

.marquee-row.reverse .marquee-content {
    animation: scroll-right 30s linear infinite;
}

/* LOGO STYLING */
.logo {
    flex: 0 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo img {
    height: 50px;
    max-width: 150px;
    width: auto;
    object-fit: contain;
    opacity: 0.8;
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
@media (max-width: 768px) {
    .logo img {
        height: 40px;
        max-width: 120px;
    }
}
</style>
