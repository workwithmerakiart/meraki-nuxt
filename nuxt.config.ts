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
  modules: ['@nuxtjs/google-fonts', '@oku-ui/motion/nuxt', '@pinia/nuxt'],

  app: {
    head: {
      title: 'Meraki Art Studio | Creative Workshops & Experiences in Dubai',
      meta: [
        { name: 'description', content: 'Meraki Art Studio offers soulful art workshops, kids activities, creative camps and mindful experiences in Dubai.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/meraki-logo-black.png' },
      ],
    },
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
    },
  },

  // Ensure Stripe receives raw request body for signature verification
  routeRules: {
    '/api/stripe/webhook': { bodyParser: false },
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
