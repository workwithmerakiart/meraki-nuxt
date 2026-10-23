<template>
  <div class="home">
    <h1 class="sr-only">Meraki Art Studio: Hands-On Art Workshops, Activities and Events in Dubai</h1>
    <HomeHeroSection />
    <HomeBlockTwo />
    <HomeBlockThree />
    <HomeBlockFour />
    <HomeBlockFive />
    <HomeFeaturedIn />
    <HomeBlockSeven />
  </div>
</template>

<script setup>
import { usePageSeo, SITE_URL, DEFAULT_SHARE_IMAGE } from '~/composables/usePageSeo'

usePageSeo({
  title: 'Meraki Art Studio | Art Workshops & Activities in Dubai',
  description:
    'Hands-on art studio in Al Quoz, Dubai. Book art activities, workshops, resin courses, kids’ camps, parties and brand activations at Meraki Art Studio.',
})

// Structured data: tells Google the site's name and the business behind it
// (name, address, contact, Instagram). Details match the site footer.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: 'Meraki Art Studio',
            publisher: { '@id': `${SITE_URL}/#business` },
          },
          {
            '@type': 'LocalBusiness',
            '@id': `${SITE_URL}/#business`,
            name: 'Meraki Art Studio',
            url: `${SITE_URL}/`,
            logo: `${SITE_URL}/images/meraki-logo-black.png`,
            image: `${SITE_URL}${DEFAULT_SHARE_IMAGE}`,
            description:
              'Hands-on art studio in Dubai offering art activities, workshops, courses, kids’ camps and classes, events and brand activations.',
            telephone: '+971508523600',
            email: 'hello@merakiartstudio.ae',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '40, Goshi Warehouse Village, Al Quoz 3',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
            areaServed: 'Dubai',
            sameAs: ['https://www.instagram.com/merakistudio_dubai/'],
          },
        ],
      }),
    },
  ],
})
</script>
