<script setup>
import PageNotFound from '~/components/PageNotFound.vue'

// Optional: set correct HTTP status
definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Page Not Found | Meraki Art Studio'
})
</script>

<template>
  <PageNotFound />
</template>