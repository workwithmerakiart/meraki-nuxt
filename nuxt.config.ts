// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  ssr: true,
  nitro: { preset: 'netlify' },
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ['@nuxtjs/google-fonts', '@oku-ui/motion/nuxt', '@pinia/nuxt', 'nuxt-simple-sitemap'],

  app: {
    head: {
      title: 'Meraki Art Studio | Creative Workshops & Experiences in Dubai',
      meta: [
        { name: 'description', content: 'Meraki Art Studio offers soulful art workshops, kids activities, creative camps and mindful experiences in Dubai.' },
        { name: 'robots', content: 'index,follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/meraki-logo-black.png' },
      ],
    },
  },

  // --- SEO: sitemap (submit /sitemap.xml to Google Search Console)
  site: {
    url: process.env.SITE_URL || 'https://www.merakiartstudio.ae',
  },

  sitemap: {
    // Keep this tight so Google only crawls important pages.
    // (Do NOT include cart/checkout/order success/failure, etc.)
    urls: [
      // Home
      { loc: '/', changefreq: 'weekly', priority: 1.0 },

      // About
      { loc: '/about/contact', changefreq: 'monthly', priority: 0.6 },
      { loc: '/about/faqs', changefreq: 'monthly', priority: 0.6 },

      // Experiences
      { loc: '/experiences/activities', changefreq: 'weekly', priority: 0.8 },
      { loc: '/experiences/workshops', changefreq: 'weekly', priority: 0.8 },
      { loc: '/experiences/courses', changefreq: 'weekly', priority: 0.7 },
      { loc: '/experiences/afterschool', changefreq: 'weekly', priority: 0.7 },
      { loc: '/experiences/events', changefreq: 'weekly', priority: 0.7 },
      { loc: '/experiences/schedule', changefreq: 'weekly', priority: 0.7 },

      // Community
      { loc: '/community/lookbook', changefreq: 'monthly', priority: 0.6 },
      { loc: '/community/blogs', changefreq: 'weekly', priority: 0.6 },

      // Shop
      { loc: '/shop/products', changefreq: 'weekly', priority: 0.7 },
      { loc: '/shop/custom-orders', changefreq: 'monthly', priority: 0.6 },

      // Studio
      { loc: '/studio/our-story', changefreq: 'monthly', priority: 0.6 },
      { loc: '/studio/franchise', changefreq: 'monthly', priority: 0.6 },

      // Misc
      { loc: '/matterdxb', changefreq: 'monthly', priority: 0.5 },
    ],

    // Explicitly exclude routes that should never be indexed.
    exclude: [
      '/about',
      '/community',
      '/experiences',
      '/shop',
      '/studio',
      '/cart',
      '/checkout',
      '/order/success',
      '/order/failed',
      '/experiences/activities/availability',
    ],
  },

  // Runtime configuration (server vs client)
  // - Server-only secrets live at top-level
  // - Client-exposed values live under `public`
  runtimeConfig: {
    // Payment mode switch (optional): 'stripe' | 'mock'
    paymentsMode: process.env.PAYMENTS_MODE || 'stripe',

    // Server-only (never exposed to client)
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    stripeTaxRateId: process.env.STRIPE_TAX_RATE_AE5_EXCL || '',
    appBaseUrl: process.env.APP_BASE_URL || process.env.URL || 'http://localhost:3000',

    // Public (safe for browser)
    public: {
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY || '',
      newsletterBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      eventsBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      workshopsBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      activitiesBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      customOrdersBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      franchiseBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      contactBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      afterSchoolBeaconUrl: process.env.NUXT_PUBLIC_NEWSLETTER_BEACON_URL || '',
      siteStage: process.env.NUXT_PUBLIC_SITE_STAGE || 'live',
    },
  },

  // Ensure Stripe receives raw request body for signature verification
  routeRules: {
    '/api/stripe/webhook': { bodyParser: false },

    // Force sitemap to return correct XML content-type (prevents GSC "Sitemap is HTML")
    '/sitemap.xml': {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    },
  },

  // @ts-expect-error: Google Fonts config not typed by default
  googleFonts: {
    families: {
      Manrope: [200, 300, 400, 500, 600, 700, 800],
      Fraunces: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'DM Serif Display': [400],
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      'Playfair Display': [400, 500, 600, 700, 800, 900],
      Forum: [400, 500, 600, 700, 800, 900],
      'Caveat Brush': [400]
    },
    display: 'swap',
    download: true, // optional: downloads fonts for offline use
    inject: true,
  },
})
