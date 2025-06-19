<template>
    <footer class="bg-black text-white py-10 px-6 font-light">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

            <!-- Brand/Logo Column -->
            <div>
                <NuxtLink to="/" class="block mb-4 max-w-[180px]">
                    <img class="h-10 sm:h-12 md:h-16 w-auto" src="/images/meraki-logo-white.png" alt="Meraki Logo" />
                </NuxtLink>
                <p class="text-sm text-gray-300 leading-relaxed app-footer-subheading">
                    40, Meraki Art Studio, Goshi Warehouse Village, Al Quoz 3, Dubai
                </p>
                <a href="#"
                    class="text-orange-400 font-semibold flex items-center gap-1 mt-2 text-sm app-footer-subheading">
                    <i class="fa-solid fa-location-arrow"></i> Get Direction
                </a>

                <div class="mt-4 text-sm font-mono space-y-1 app-footer-subheading">
                    <div v-for="(time, day) in timings" :key="day" class="flex gap-2">
                        <span class="w-10">{{ day }}</span><span class="w-1">:</span><span>{{ time }}</span>
                    </div>
                </div>

                <div class="mt-4 space-y-1 text-sm app-footer-subheading">
                    <p class="flex items-center gap-2">
                        <i class="fa-brands fa-whatsapp"></i> +971 50 852 3600
                    </p>
                    <p class="flex items-center gap-2">
                        <i class="fa-solid fa-envelope"></i> hello@merakiartstudio.ae
                    </p>
                </div>
            </div>

            <!-- Sitemap Section -->
            <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 pl-4 md:pl-12">
                <div v-for="section in sitemap" :key="section.title">
                    <div class="font-normal text-lg tracking-normal uppercase mb-4 app-footer-heading">
                        {{ section.title }}
                    </div>
                    <ul class="text-sm space-y-1 text-gray-300 app-footer-subheading">
                        <li v-for="link in section.links" :key="link.label">
                            <NuxtLink :to="link.to">{{ link.label }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Newsletter Column -->
            <div>
                <div class="font-normal text-lg uppercase mb-4 app-footer-heading">
                    Stay Updated
                </div>
                <p class="text-sm text-gray-300 mb-3 app-footer-subheading">
                    Join our newsletter and be the first to be notified of our latest news and promotions.
                </p>
                <form class="flex border border-orange-400 w-full max-w-xs">
                    <input type="email" placeholder="Enter Your Email"
                        class="flex-1 px-3 py-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none app-footer-subheading" />
                    <button type="submit" class="bg-orange-400 px-3">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i>
                    </button>
                </form>
            </div>

        </div>
    </footer>
</template>

<script setup>
const timings = {
    MON: '14:00-22:00',
    TUE: '14:00-22:00',
    WED: '14:00-22:00',
    THU: '14:00-22:00',
    FRI: '14:00-22:00',
    SAT: '10:00-22:00',
    SUN: '10:00-22:00'
}

const sitemap = [
    {
        title: 'Experiences',
        links: [
            { label: 'Events', to: '/experiences/events' },
            { label: 'Workshops', to: '/experiences/workshops' },
            { label: 'Courses', to: '/experiences/courses' },
            { label: 'Activities', to: '/experiences/activities' },
        ]
    },
    {
        title: 'Shop',
        links: [
            { label: 'Products', to: '/shop/products' },
            { label: 'Custom Orders', to: '/shop/custom-orders' },
        ]
    },
    {
        title: 'Studio',
        links: [
            { label: 'Our Story', to: '/studio/our-story' },
            { label: 'Partner with us', to: '/studio/partner-with-us' },
        ]
    },
    {
        title: 'Community',
        links: [
            { label: 'Blogs', to: '/community/blogs' },
            { label: 'Meraki’s Lookbook', to: '/community/lookbook' },
        ]
    },
    {
        title: 'About',
        links: [
            { label: 'Contact us', to: '/about/contact' },
            { label: 'FAQs', to: '/about/faqs' },
        ]
    }
]
</script>

<style scoped>
footer a {
    transition: color 0.3s ease;
}

footer a:hover {
    color: #faae3c;
}

.app-footer-heading {
    font-family: 'DM Serif Display', serif;
}

.app-footer-subheading {
    font-family: 'Inter', sans-serif;
}
</style>
