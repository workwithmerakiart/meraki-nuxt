import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

declare module '#app' {
  interface NuxtApp {
    $gsap: typeof gsap
    $ScrollTrigger: typeof ScrollTrigger
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $gsap: typeof gsap
    $ScrollTrigger: typeof ScrollTrigger
  }
}
export {}
