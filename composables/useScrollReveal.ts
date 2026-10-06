import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Ref } from 'vue'
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Scroll-triggered animations driven by data attributes inside `root`.
//
//   data-anim="left|right|top|bottom"  slide + fade in from that side
//   data-anim="drop"      letters fall from the top    (use <SplitText mode="chars">)
//   data-anim="rise"      words rise from a mask       (use <SplitText mode="words">)
//   data-anim="line"      line draws across, then a light ray runs along it
//   data-anim="reveal"    a colour curtain lifts off the image, which settles, with parallax
//   data-anim="flip"      card spins in on its axis under a colour fill, then the fill drops to reveal the photo
//   data-fill="#hex"      curtain / fill colour for reveal and flip (default: brand orange)
//   data-anim="stagger"   children pop up one after another
//   data-anim="parallax"  drifts against the scroll (data-speed, default 20)
//   data-delay="0.2"      optional delay in seconds
//
// Everything is skipped when the visitor prefers reduced motion.
//
// Performance: only transform and opacity are animated (GPU-composited, no layout or repaint per frame),
// and the line rays only run while their line is on screen.

const OFFSETS: Record<string, gsap.TweenVars> = {
  left: { x: -90 },
  right: { x: 90 },
  top: { y: -70 },
  bottom: { y: 70 },
}

export const useScrollReveal = (root: Ref<HTMLElement | null>) => {
  let ctx: gsap.Context | null = null
  let mm: gsap.MatchMedia | null = null
  const fills: HTMLElement[] = []

  onMounted(async () => {
    await nextTick()
    if (!root.value) return
    gsap.registerPlugin(ScrollTrigger)

    mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ctx = gsap.context(() => {
        const all = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, root.value!)
        const delay = (el: HTMLElement) => Number(el.dataset.delay || 0)
        const trigger = (el: HTMLElement, start = 'top 88%') => ({ trigger: el, start, once: true })

        all('[data-anim="left"], [data-anim="right"], [data-anim="top"], [data-anim="bottom"]').forEach((el) => {
          gsap.from(el, {
            ...OFFSETS[el.dataset.anim!],
            autoAlpha: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: delay(el),
            scrollTrigger: trigger(el),
          })
        })

        all('[data-anim="drop"]').forEach((el) => {
          gsap.from(el.querySelectorAll('.split-unit'), {
            yPercent: -120,
            rotate: () => gsap.utils.random(-12, 12),
            autoAlpha: 0,
            duration: 0.9,
            ease: 'back.out(1.7)',
            stagger: 0.035,
            delay: delay(el),
            scrollTrigger: trigger(el),
          })
        })

        all('[data-anim="rise"]').forEach((el) => {
          gsap.from(el.querySelectorAll('.split-unit'), {
            yPercent: 110,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.08,
            delay: delay(el),
            scrollTrigger: trigger(el),
          })
        })

        all('[data-anim="line"]').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: el.dataset.origin || 'left center',
              duration: 1.4,
              ease: 'expo.inOut',
              delay: delay(el),
              scrollTrigger: trigger(el, 'top 92%'),
              // Ray runs only while the line is on screen
              onComplete: () => {
                ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', toggleClass: 'is-lit' })
              },
            },
          )
        })

        // Solid panel laid over a card while it animates in; removed once done
        const addFill = (el: HTMLElement) => {
          const fill = document.createElement('span')
          fill.setAttribute('aria-hidden', 'true')
          Object.assign(fill.style, {
            position: 'absolute',
            inset: '0',
            zIndex: '2',
            background: el.dataset.fill || '#dd4912',
            pointerEvents: 'none',
          })
          el.appendChild(fill)
          fills.push(fill)
          return fill
        }

        const parallax = (img: HTMLElement, trigger: HTMLElement) => {
          gsap.fromTo(
            img,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        }

        all('[data-anim="reveal"]').forEach((el) => {
          const img = el.querySelector('img')
          const fill = addFill(el)
          const tl = gsap.timeline({ delay: delay(el), scrollTrigger: trigger(el, 'top 85%') })
          tl.from(el, { y: 60, autoAlpha: 0, duration: 0.9, ease: 'power3.out' })
            .to(fill, { scaleY: 0, transformOrigin: 'top center', duration: 1.1, ease: 'expo.inOut' }, 0.35)
            .call(() => fill.remove())
          if (img) {
            tl.from(img, { scale: 1.15, duration: 1.8, ease: 'expo.out' }, 0.45)
            parallax(img, el)
          }
        })

        all('[data-anim="flip"]').forEach((el, i) => {
          const img = el.querySelector('img')
          const fill = addFill(el)
          const spin = i % 2 === 0 ? -1 : 1
          gsap.set(el.parentElement, { perspective: 1400 })
          const tl = gsap.timeline({ delay: delay(el), scrollTrigger: trigger(el, 'top 88%') })
          tl.from(el, {
            rotateY: 115 * spin,
            rotateZ: -5 * spin,
            scale: 0.75,
            autoAlpha: 0,
            duration: 1.5,
            ease: 'power3.out',
          })
            .to(fill, { scaleY: 0, transformOrigin: 'bottom center', duration: 0.8, ease: 'expo.inOut' }, 1.1)
            .call(() => fill.remove())
          if (img) {
            tl.from(img, { scale: 1.15, duration: 1.4, ease: 'expo.out' }, 1.15)
            parallax(img, el)
          }
        })

        all('[data-anim="stagger"]').forEach((el) => {
          gsap.from(el.children, {
            y: 30,
            scale: 0.9,
            autoAlpha: 0,
            duration: 0.7,
            ease: 'back.out(2)',
            stagger: 0.07,
            delay: delay(el),
            scrollTrigger: trigger(el),
          })
        })

        all('[data-anim="parallax"]').forEach((el) => {
          const speed = Number(el.dataset.speed || 20)
          gsap.fromTo(
            el,
            { yPercent: speed },
            {
              yPercent: -speed,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      }, root.value!)
    })

    // Layout can shift once fonts and images settle
    window.addEventListener('load', refresh)
    setTimeout(refresh, 1200)
  })

  const refresh = () => ScrollTrigger.refresh()

  onBeforeUnmount(() => {
    window.removeEventListener('load', refresh)
    ctx?.revert()
    mm?.revert()
    fills.forEach((f) => f.remove())
  })
}
