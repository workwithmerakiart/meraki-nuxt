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
import { onMounted, computed } from "vue";
import { useRouter } from "#app"; // <-- change here
import { usePageLoader } from "~/composables/usePageLoader";
import { SITE_URL, SITE_NAME, DEFAULT_SHARE_IMAGE } from "~/composables/usePageSeo";

// --- SEO defaults for every page (pages override title/description/image via usePageSeo)
// The canonical URL tells Google which address is the real one: always the bare domain,
// without www, trailing slashes or query strings.
const route = useRoute();
const canonicalUrl = computed(() =>
  SITE_URL + (route.path === "/" ? "/" : route.path.replace(/\/+$/, ""))
);

useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "canonical", href: canonicalUrl }],
});

useSeoMeta({
  ogUrl: canonicalUrl,
  ogSiteName: SITE_NAME,
  ogType: "website",
  ogLocale: "en_AE",
  ogImage: SITE_URL + DEFAULT_SHARE_IMAGE,
  twitterCard: "summary_large_image",
});

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
