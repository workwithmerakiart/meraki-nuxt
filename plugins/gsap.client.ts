import { defineNuxtPlugin } from '#app'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

// Safe to call multiple times; GSAP ignores duplicate registrations
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('gsap', gsap)
    nuxtApp.provide('ScrollTrigger', ScrollTrigger)
})
