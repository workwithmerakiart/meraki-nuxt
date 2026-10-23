// Per-page SEO: title, meta description and social-share (Open Graph / Twitter) tags.
// The canonical URL and og:url are set once, globally, in app.vue.
//
// Usage in a page:
//   usePageSeo({
//     title: 'Activities: Hands-On Art in Dubai | Meraki Art Studio',
//     description: 'About 150 characters describing this page.',
//     image: '/images/block3_activities.webp',   // optional share image
//   })
//
// Any value may be a function or computed, for pages whose content depends on the route.
// Pass `noindex: true` for pages that should never appear in Google (cart, checkout…).

import { unref } from 'vue'

// The site redirects www -> this bare domain, so this is the one true address.
export const SITE_URL = 'https://merakiartstudio.ae'
export const SITE_NAME = 'Meraki Art Studio'
export const DEFAULT_SHARE_IMAGE = '/images/hero_activities.webp'

export const absoluteUrl = (path) => (!path ? '' : /^https?:\/\//.test(path) ? path : SITE_URL + path)

const read = (v) => (typeof v === 'function' ? v() : unref(v))

export function usePageSeo(opts = {}) {
  const title = () => read(opts.title)
  const description = () => read(opts.description)
  const image = () => absoluteUrl(read(opts.image) || DEFAULT_SHARE_IMAGE)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    ...(opts.noindex ? { robots: 'noindex, nofollow' } : {}),
  })
}
