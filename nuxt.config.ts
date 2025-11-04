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
