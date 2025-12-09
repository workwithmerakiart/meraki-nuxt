<template>
  <div class="min-h-screen flex flex-col">
    <!-- Page Loader overlays while loading -->
    <PageLoader />
    <!-- Page Header -->
    <AppHeader />
    <!-- Main content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <!-- Page Footer -->
    <AppFooter />
    <WhatsappWidget />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "#app"; // <-- change here
import { usePageLoader } from "~/composables/usePageLoader";

useHead({
  script: [
    {
      src: "https://elfsightcdn.com/platform.js",
      async: true,
    },
  ],
});

const { startLoading, finishLoading } = usePageLoader();
const router = useRouter();

router.beforeEach((to, from, next) => {
  startLoading();
  next();
});

router.afterEach(() => {
  setTimeout(() => finishLoading(), 300);
});

onMounted(() => {
  finishLoading();
});
</script>
