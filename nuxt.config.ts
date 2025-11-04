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
