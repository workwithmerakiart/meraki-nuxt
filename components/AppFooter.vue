<template>
    <footer class="app-footer bg-zinc-900 text-white py-10 px-6 font-light">
        <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand/Logo Column -->
            <div>
                <!-- Logo -->
                <NuxtLink to="/">
                    <img class="h-6 sm:h-8" src="https://merakiui.com/images/full-logo.svg" alt="Logo" />
                </NuxtLink>
                <p class="text-sm text-gray-300">Warehouse 1, Al Marabea’ Street, Al Quoz 1, Dubai</p>
                <a href="#" class="text-orange-400 font-semibold flex items-center gap-1 mt-2">
                    <i class="fa-solid fa-location-arrow"></i> Get Direction
                </a>
                <div class="mt-4 text-sm font-mono space-y-1">
                    <div v-for="(time, day) in timings" :key="day" class="flex gap-2">
                        <span class="w-10">{{ day }}</span>
                        <span class="w-1">:</span>
                        <span>{{ time }}</span>
                    </div>
                </div>

                <div class="mt-4">
                    <p class="flex items-center gap-2">
                        <i class="fa-brands fa-whatsapp"></i> +971 54 505 7944
                    </p>
                    <p class="flex items-center gap-2 mt-1">
                        <i class="fa-solid fa-envelope"></i> hello@wildpainthouse.com
                    </p>
                </div>
                <div class="flex gap-3 mt-4">
                    <img src="/icons/instagram.png" alt="Instagram" class="w-6 h-6" />
                    <img src="/icons/facebook.png" alt="Facebook" class="w-6 h-6" />
                    <img src="/icons/tiktok.png" alt="Tiktok" class="w-6 h-6" />
                </div>
            </div>

            <!-- Sitemap Column 1 -->
            <div>
                <h3 class="font-bold text-lg uppercase mb-4">Experiences</h3>
                <ul class="text-sm space-y-1">
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/experiences/events">Events</NuxtLink>
                    </li>
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/experiences/workshops">Workshops</NuxtLink>
                    </li>
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/experiences/courses">Courses</NuxtLink>
                    </li>
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/experiences/activities">Activities</NuxtLink>
                    </li>
                </ul>

                <h3 class="font-bold text-lg uppercase mt-6 mb-4">Shop</h3>
                <ul class="text-sm space-y-1">
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/shop/products">Products</NuxtLink>
                    </li>
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/shop/custom-orders">Custom Orders</NuxtLink>
                    </li>
                </ul>
            </div>

            <!-- Sitemap Column 2 -->
            <div>
                <h3 class="font-bold text-lg uppercase mb-4">Studio</h3>
                <ul class="text-sm space-y-1">
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/studio/our-story">Our Story</NuxtLink>
                    </li>
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/studio/partner-with-us">Partner with us</NuxtLink>
                    </li>
                </ul>

                <h3 class="font-bold text-lg uppercase mt-6 mb-4">Community</h3>
                <ul class="text-sm space-y-1">
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/community/blogs">Blogs</NuxtLink>
                    </li>
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/community/lookbook">Meraki’s Lookbook</NuxtLink>
                    </li>
                </ul>

                <h3 class="font-bold text-lg uppercase mt-6 mb-4">About</h3>
                <ul class="text-sm space-y-1">
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/about/contact">Contact us</NuxtLink>
                    </li>
                    <li class="ml-4 text-gray-300">
                        <NuxtLink to="/about/faqs">FAQs</NuxtLink>
                    </li>
                </ul>
            </div>

            <!-- Newsletter Column -->
            <div>
                <h3 class="font-bold text-lg uppercase mb-4">Stay Updated</h3>
                <p class="text-sm text-gray-300 mb-3">
                    Join our newsletter and be the first to be notified of our latest news and promotions.
                </p>
                <form class="flex border border-orange-400 w-full max-w-xs">
                    <input type="email" placeholder="Enter Your Email"
                        class="flex-1 px-3 py-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none" />
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
</script>

<style scoped>
footer a {
    transition: color 0.3s ease;
}

footer a:hover {
    color: #faae3c;
}

.app-footer * {
    font-family: "Fraunces", serif;
}
</style>
