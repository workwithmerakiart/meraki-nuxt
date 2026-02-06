<script setup>
import Lookbook from '@/components/lookbook/Lookbook.vue'

const images = [
  { src: '/images/hero_workshops.webp', alt: 'Event 1' },
  { src: '/images/hero_activities.webp', alt: 'Event 2' },
  { src: '/images/custom/custom_hero.webp', alt: 'Event 3' },
  { src: '/images/lookbook/4.webp', alt: 'Event 4' },
  { src: '/images/lookbook/5.webp', alt: 'Event 5' },
  { src: '/images/lookbook/6.webp', alt: 'Event 6' },
  { src: '/images/lookbook/7.webp', alt: 'Event 7' },
  { src: '/images/lookbook/9.webp', alt: 'Event 9' },
  { src: '/images/afterschool/afterschool_hero.webp', alt: 'Event 11' },
  { src: '/images/block3_activities.webp', alt: 'Event 12' },
  { src: '/images/activities/activities_hero.webp', alt: 'Event 13' },
  { src: '/images/lookbook/11.webp', alt: 'Event 14' },
  { src: '/images/lookbook/12.webp', alt: 'Event 15' },
  { src: '/images/lookbook/13.webp', alt: 'Event 16' },
  { src: '/images/lookbook/14.webp', alt: 'Event 17' },
  { src: '/images/lookbook/15.webp', alt: 'Event 18' },
  { src: '/images/lookbook/16.webp', alt: 'Event 19' },
  { src: '/images/lookbook/17.webp', alt: 'Event 20' },
  { src: '/images/afterschool/afterschool_holiday.webp', alt: 'Event 21' },
  { src: '/images/activities/resin/activities_resin_beach_painting.webp', alt: 'Event 22' },
  { src: '/images/shop/shop_hero.webp', alt: 'Event 23' },
  { src: '/images/lookbook/18.webp', alt: 'Event 24' },
  { src: '/images/lookbook/19.webp', alt: 'Event 25' },
  { src: '/images/lookbook/20.webp', alt: 'Event 26' },
  { src: '/images/lookbook/21.webp', alt: 'Event 27' },
  { src: '/images/lookbook/22.webp', alt: 'Event 28' },
  { src: '/images/lookbook/23.webp', alt: 'Event 29' },
  { src: '/images/lookbook/24.webp', alt: 'Event 30' },
  { src: '/images/block3_workshops.webp', alt: 'Event 31' },
  { src: '/images/activities/activities_block3.webp', alt: 'Event 32' },
  { src: '/images/activities/other/activities_other_diy.webp', alt: 'Event 33' },
  { src: '/images/lookbook/25.webp', alt: 'Event 34' },
  { src: '/images/lookbook/26.webp', alt: 'Event 35' },
  { src: '/images/lookbook/27.webp', alt: 'Event 36' },
  { src: '/images/lookbook/28.webp', alt: 'Event 38' },
  { src: '/images/events/events_hero.webp', alt: 'Event 40' }
]
1,2,3,11,12,13,21,22,23,31,32,33


</script>

<template>
  <Lookbook :images="images" />
</template>
