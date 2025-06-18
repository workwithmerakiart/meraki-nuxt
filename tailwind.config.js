/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            background: '#F9F3EB',
            cta: '#C1694F',
            'cta-hover': '#A8553F',
          },
          secondary: {
            DEFAULT: '#BAC4A9',
          },
          text: {
            DEFAULT: '#000000',
          },
          highlight: {
            DEFAULT: '#D4A017',
          },
        },
      },
    },
  },
  plugins: [],
};