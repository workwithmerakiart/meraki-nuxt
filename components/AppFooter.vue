<template>
    <footer class="bg-[#FC8EAC] text-black font-light">
        <!-- Main Grid -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-12 md:grid-cols-4">

            <!-- Brand / Address Column -->
            <div class="space-y-4">
                <NuxtLink to="/" class="inline-block max-w-[180px]">
                    <img src="/images/meraki-logo-black.png" alt="Meraki Logo" class="h-12 w-auto" />
                </NuxtLink>
                <p class="text-sm text-black leading-relaxed app-footer-subheading max-w-xs">
                    40, Meraki Art Studio, Goshi Warehouse Village, Al Quoz 3, Dubai
                </p>
                <a href="https://www.google.com/maps/search/?api=1&query=Meraki+Art+%26+Design+Studio,+Al+Quoz+-+Al+Quoz+Industrial+Area+3+-+Dubai"
                    target="_blank" rel="noopener noreferrer"
                    class="text-black-500 font-semibold inline-flex items-center gap-1 text-sm app-footer-subheading">
                    <i class="fa-solid fa-location-arrow"></i> Get Directions
                </a>
                <div class="space-y-2 text-sm app-footer-subheading">
                    <a href="tel:+971508523600" class="flex items-center gap-2 hover:text-black-500">
                        <i class="fa-brands fa-whatsapp"></i> +971 50 852 3600
                    </a>
                    <a href="mailto:hello@merakiartstudio.ae" class="flex items-center gap-2 hover:text-black-500">
                        <i class="fa-solid fa-envelope"></i> hello@merakiartstudio.ae
                    </a>
                </div>
            </div>

            <!-- Sitemap Section -->
            <div class="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div v-for="section in sitemap" :key="section.title">
                    <div class="text-lg uppercase mb-3 app-footer-heading">
                        {{ section.title }}
                    </div>
                    <ul class="text-sm space-y-1 text-black app-footer-subheading">
                        <li v-for="link in section.links" :key="link.label">
                            <NuxtLink :to="link.to" class="hover:text-black-500">{{ link.label }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Newsletter Column -->
            <div class="space-y-4 w-full max-w-sm md:max-w-md">
                <div class="text-lg uppercase app-footer-heading">
                    Stay Updated
                </div>
                <p class="text-sm text-black app-footer-subheading">
                    Join our newsletter and be the first to know about our latest news and promotions.
                </p>
                <form @submit.prevent="onNewsletterSubmit" class="flex flex-col sm:flex-row border border-black rounded overflow-hidden w-full">
                    <input
                        v-model="newsletterEmail"
                        type="email"
                        required
                        placeholder="Enter Your Email"
                        class="flex-1 min-w-0 px-3 py-2 bg-transparent text-black placeholder-black-400 focus:outline-none app-footer-subheading"
                    />
                    <button
                        type="submit"
                        :disabled="newsletterSubmitting || !newsletterEmail"
                        class="shrink-0 bg-black text-white px-4 py-2 uppercase text-sm font-semibold transition hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {{ newsletterSubmitting ? 'Sending…' : 'Submit' }}
                    </button>
                </form>
                <p v-if="newsletterMsg" class="text-xs mt-2 app-footer-subheading" :class="newsletterOk ? 'text-green-700' : 'text-red-700'">
                  {{ newsletterMsg }}
                </p>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="mt-10 pt-6 pb-8 text-center text-xs text-black space-y-2 app-footer-subheading">
            <div class="flex flex-wrap justify-center gap-4">
                <NuxtLink to="/privacy-policy" class="hover:text-black-500">Privacy Policy</NuxtLink>
                <span>|</span>
                <NuxtLink to="/cookie-policy" class="hover:text-black-500">Cookie Policy</NuxtLink>
                <span>|</span>
                <NuxtLink to="/terms-of-use" class="hover:text-black-500">Terms of Use</NuxtLink>
            </div>
            <div>© {{ currentYear }} Meraki Art Studio. All rights reserved.</div>
            <div class="max-w-3xl mx-auto px-4 text-black">
                Site Crafted and Managed by
                <a
                  href="https://www.boldsubtle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-black-500 font-medium"
                >
                  BoldSubtle
                </a><br>
                For support or inquiries, contact us at
                <a href="mailto:hello@boldsubtle.com"
                    class="underline hover:text-black-500">hello@boldsubtle.com</a>
                |
                <a href="tel:+917303262306" class="hover:text-black-500">+44 (0)75 5471 9985, +91 (0)7303 2623 06</a>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const newsletterEmail = ref('')
const newsletterSubmitting = ref(false)
const newsletterMsg = ref('')
const newsletterOk = ref(false)

async function onNewsletterSubmit() {
  newsletterMsg.value = ''
  newsletterOk.value = false

  const email = String(newsletterEmail.value || '').trim()
  if (!email) return

  newsletterSubmitting.value = true
  try {
    await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: {
        email,
        source: 'footer-newsletter',
      },
    })
    newsletterOk.value = true
    newsletterMsg.value = 'Thanks - you’re on the list.'
    newsletterEmail.value = ''
  } catch (e) {
    const err = e
    console.warn('[newsletter] subscribe failed', err)

    // Nuxt $fetch often returns structured errors under err.data
    const apiMsg = String(err?.data?.error || err?.data?.message || err?.message || '').trim()

    newsletterOk.value = false
    newsletterMsg.value = apiMsg ? apiMsg : 'Could not subscribe right now. Please try again.'
  } finally {
    newsletterSubmitting.value = false
  }
}

const currentYear = new Date().getFullYear()

const sitemap = [
    {
        title: 'Experiences',
        links: [
            { label: 'Events', to: '/experiences/events' },
            { label: 'Workshops', to: '/experiences/workshops' },
            { label: 'Courses', to: '/experiences/courses' },
            { label: 'Activities', to: '/experiences/activities' },
            { label: 'Afterschool Classes', to: '/experiences/afterschool' },
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
            { label: 'Franchise', to: '/studio/franchise' },
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
    color: #FFFFFF;
    /* Tailwind black-500 hex */
}

.app-footer-heading {
    font-family: 'DM Serif Display', serif;
}

.app-footer-subheading {
    font-family: 'Inter', sans-serif;
}
</style>
