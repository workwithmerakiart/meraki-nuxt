<template>
  <div class="min-h-screen flex flex-col">
    <!-- Page Loader overlays while loading -->
    <PageLoader />

    <AppHeader />

    <!-- Main content grows to push footer down -->
    <div class="flex-1">
      <HeroSection />
      <BlockTwo />
      <BlockThree />
      <NuxtPage />
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from '#app'  // <-- change here
import { usePageLoader } from '~/composables/usePageLoader'
import PageLoader from '~/components/PageLoader.vue'

const { startLoading, finishLoading } = usePageLoader()
const router = useRouter()

router.beforeEach((to, from, next) => {
  startLoading()
  next()
})

router.afterEach(() => {
  setTimeout(() => finishLoading(), 300)
})

onMounted(() => {
  finishLoading()
})
</script>
