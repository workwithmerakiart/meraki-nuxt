<script setup>
import Lookbook from '@/components/lookbook/Lookbook.vue'

const images = [
  { src: '/images/hero_workshops.webp', alt: 'Event 1' },
  { src: '/images/hero_activities.webp', alt: 'Event 2' },
  { src: '/images/custom/custom_hero.webp', alt: 'Event 3' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 4' },
  { src: '/images/events/events_hero.webp', alt: 'Event 5' },
  { src: '/images/hero_workshops.webp', alt: 'Event 6' },
  { src: '/images/activities/activities_block3.webp', alt: 'Event 7' },
  { src: '/images/shop/shop_hero.webp', alt: 'Event 8' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 9' },
  { src: '/images/events/events_hero.webp', alt: 'Event 10' },
  { src: '/images/afterschool/afterschool_hero.webp', alt: 'Event 11' },
  { src: '/images/block3_activities.webp', alt: 'Event 12' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 13' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 14' },
  { src: '/images/events/events_hero.webp', alt: 'Event 15' },
  { src: '/images/activities/activities_block2.webp', alt: 'Event 16' },
  { src: '/images/activities/activities_block3.webp', alt: 'Event 17' },
  { src: '/images/shop/shop_hero.webp', alt: 'Event 18' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 19' },
  { src: '/images/events/events_hero.webp', alt: 'Event 20' },
  { src: '/images/afterschool/afterschool_holiday.webp', alt: 'Event 21' },
  { src: '/images/activities/resin/activities_resin_beach_painting.webp', alt: 'Event 22' },
  { src: '/images/shop/shop_hero.webp', alt: 'Event 23' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 24' },
  { src: '/images/events/events_hero.webp', alt: 'Event 25' },
  { src: '/images/activities/activities_block2.webp', alt: 'Event 26' },
  { src: '/images/activities/activities_block3.webp', alt: 'Event 27' },
  { src: '/images/shop/shop_hero.webp', alt: 'Event 28' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 29' },
  { src: '/images/events/events_hero.webp', alt: 'Event 30' },
  { src: '/images/block3_workshops.webp', alt: 'Event 31' },
  { src: '/images/activities/activities_block3.webp', alt: 'Event 32' },
  { src: '/images/activities/other/activities_other_diy.webp', alt: 'Event 33' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 34' },
  { src: '/images/events/events_hero.webp', alt: 'Event 35' },
  { src: '/images/activities/activities_block2.webp', alt: 'Event 36' },
  { src: '/images/activities/activities_block3.webp', alt: 'Event 37' },
  { src: '/images/shop/shop_hero.webp', alt: 'Event 38' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 39' },
  { src: '/images/events/events_hero.webp', alt: 'Event 40' }
]


</script>

<template>
  <Lookbook :images="images" />
</template>
