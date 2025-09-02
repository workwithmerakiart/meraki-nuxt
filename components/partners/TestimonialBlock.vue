<script setup>
defineProps({
  title: { type: String, default: 'What our partners say' },
  items: {
    type: Array,
    default: () => ([
      {
        quote:
          'Meraki’s playbooks and training made launch week seamless. We hit profitability faster than planned.',
        name: 'Aarav Shah',
        role: 'Franchise Partner – Pune',
        avatar: '/images/people/aarav.jpg',
      },
      {
        quote:
          'The brand equity, content engine, and ops support are unmatched. We felt guided at every step.',
        name: 'Mira Kapoor',
        role: 'Franchise Partner – Bengaluru',
        avatar: '/images/people/mira.jpg',
      },
      {
        quote:
          'Workshops sell out because the experience is dialed in. Systems + creativity = win.',
        name: 'Zainab Ali',
        role: 'Franchise Partner – Dubai',
        avatar: '/images/people/zainab.jpg',
      },
    ]),
  },
})
</script>

<template>
  <section
    class="py-16"
    style="--meraki-primary:#DD4912; --meraki-secondary:#447C9D; --meraki-cream:#F9F3EB"
  >
    <div class="mx-auto max-w-7xl px-6 sm:px-8">
      <div class="text-center">
        <h2 class="text-3xl sm:text-4xl font-semibold">
          {{ title }}
        </h2>
        <div class="mx-auto mt-4 h-1 w-20 rounded-full bg-[var(--meraki-primary)]"></div>
      </div>

      <!-- Responsive cards -->
      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(t, i) in items"
          :key="i"
          class="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 flex flex-col"
        >
          <p class="text-gray-800 text-base leading-7">
            “{{ t.quote }}”
          </p>

          <div class="mt-6 flex items-center gap-4">
            <img
              v-if="t.avatar"
              :src="t.avatar"
              alt=""
              class="h-12 w-12 rounded-full object-cover ring-2 ring-[var(--meraki-primary)]/20"
              loading="lazy"
              decoding="async"
            />
            <div>
              <div class="font-medium">{{ t.name }}</div>
              <div class="text-sm text-gray-500">{{ t.role }}</div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
