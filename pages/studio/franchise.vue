<script setup>
import PartnerHero from '@/components/partners/PartnerHero.vue'

// Reuse the rail blocks we already built:
import TextLeftImageRight from '@/components/blocks/TextLeftImageRight.vue'
import ImageLeftTextRight from '@/components/blocks/ImageLeftTextRight.vue'

// Form component that POSTs to your Google Apps Script endpoint
import FranchiseInquiryForm from '@/components/forms/FranchiseInquiryForm.vue'
</script>

<template>
  <section class="bg-white text-neutral-900 font-sans antialiased overflow-x-hidden"
    style="--meraki-primary:#DD4912; --meraki-secondary:#447C9D; --meraki-cream:#F9F3EB">
    <!-- Block 1: Hero (exact OurStory style) -->
    <PartnerHero heading="Franchise with Meraki"
      subheading="Meraki Art Studio isn’t just a place—it’s a creative movement. With our growing popularity and trusted brand, we’re now opening opportunities for passionate individuals to launch their own Meraki Studio and join our vibrant community."
      image="/images/story/story_hero.webp" alt="Meraki Partner Hero" />

    <!-- Blocks 2–4: alternating rails -->
    <div class="mx-auto max-w-7xl px-3 sm:px-5 py-6 sm:py-8 lg:py-10 space-y-0">

      <!-- Block 2: text left / image right -->
      <TextLeftImageRight class="rail-tight rail-gap" eyebrow="Franchise Advantage" heading="Why franchise with us?"
        :image-src="'/images/story/story_pooja.webp'" :image-alt="'Why franchise with us image'">
        <div class="mt-2 text-base/7 sm:text-lg/7 text-neutral-700">
          <ul class="space-y-1.5 pl-4">
            <li>
              <span class="font-medium text-neutral-900">Proven Business Model</span>
              <span class="block">Refined through years of experience in Dubai</span>
            </li>
            <li>
              <span class="font-medium text-neutral-900">Brand Power</span>
              <span class="block">Trusted by global names like Dior, Rolex, Bvlgari &amp; more</span>
            </li>
            <li>
              <span class="font-medium text-neutral-900">Creative Freedom</span>
              <span class="block">We provide the framework, you bring the energy</span>
            </li>
            <li>
              <span class="font-medium text-neutral-900">Training &amp; Support</span>
              <span class="block">From staff onboarding to setup and operations</span>
            </li>
            <li>
              <span class="font-medium text-neutral-900">Marketing Guidance</span>
              <span class="block">Design kits, launch campaigns, and PR assets provided</span>
            </li>
            <li>
              <span class="font-medium text-neutral-900">Meraki Signature Systems</span>
              <span class="block">Activities, workshops, products, and shop models ready to roll out</span>
            </li>
          </ul>
        </div>
      </TextLeftImageRight>

      <!-- Block 3: image left / text right -->
      <ImageLeftTextRight class="rail-tight mt-6 sm:mt-8 mb-4" heading="Ideal franchise partners" :image-src="'/images/shop/shop_color_kit.webp'"
        :image-alt="'Ideal partners image'" :left-width-pct="44">
        <div class="mt-2 text-base/6 sm:text-lg/6 text-neutral-700">
          <p class="mb-3">We’re looking for individuals who are:</p>
          <ul class="list-disc pl-4 space-y-1">
            <li>Passionate about creativity and education</li>
            <li>Driven to run a customer-focused, community-oriented business</li>
            <li>Interested in owning a high-potential business with purpose</li>
          </ul>
        </div>
      </ImageLeftTextRight>

      <!-- Block 4: text left / image right -->
      <TextLeftImageRight class="rail-tight rail-gap" heading="What you get" :image-src="'/images/courses/courses_block2.webp'"
        :image-alt="'What you get image'">
        <div class="mt-2 text-base/6 sm:text-lg/6 text-neutral-700">
          <ul class="list-disc pl-4 space-y-1">
            <li>Licensing &amp; rights to the Meraki brand in your region</li>
            <li>Launch &amp; training support (on-site or virtual)</li>
            <li>Operational playbook + booking systems</li>
            <li>Vendor &amp; product sourcing contacts</li>
            <li>Exclusive access to our workshop and retail model</li>
          </ul>
        </div>
      </TextLeftImageRight>
    </div>

    <!-- Block 5: Franchise form -->
    <section class="bg-[var(--meraki-cream)]">
      <div class="mx-auto max-w-7xl px-3 sm:px-5 py-6 sm:py-8">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-xl sm:text-2xl font-semibold tracking-tight">Let’s start the conversation</h3>
          <p class="mt-1.5 text-neutral-700">
            Mail us at
            <a href="mailto:franchise@merakiartstudio.ae"
              class="underline decoration-[var(--meraki-primary)] hover:text-[var(--meraki-primary)]">
              franchise@merakiartstudio.ae
            </a>
              or Use the form below to tell us a few things about yourself.
          </p>
        </div>

        <!-- Replace the endpoint with your Apps Script Web App URL -->
        <FranchiseInquiryForm endpoint="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec" />
      </div>
    </section>
  </section>
</template>


<style scoped>
.body-text {
  font-family: 'Inter', sans-serif;
}

/* Collapse vertical whitespace on rail blocks */
.rail-tight {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  border: 0 !important;
}

/* Optional gap below selected rails */
.rail-gap {
  margin-bottom: 1rem !important;
}

@media (min-width: 640px) {
  .rail-gap {
    margin-bottom: 1.5rem !important;
  }
}

/* Prevent TextLeftImageRight images from touching the right edge on this page */
:deep(.rail-tight img) {
  margin-right: 0.75rem;
}

@media (min-width: 1024px) {
  :deep(.rail-tight img) {
    margin-right: 1.5rem;
  }
}
</style>
