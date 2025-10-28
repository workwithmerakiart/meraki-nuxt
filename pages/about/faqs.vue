<template>
  <section
    class="bg-white text-neutral-900 font-sans antialiased overflow-x-hidden"
    style="--meraki-primary:#DD4912; --meraki-secondary:#447C9D; --meraki-cream:#F9F3EB"
  >
    <!-- Hero (inspired by franchise.vue PartnerHero) -->
    <PartnerHero
      heading="FAQS"
      subheading="Got a question? We've got answers. Explore the most common things our guests ask. Still need help? Feel free to contact us."
      image="/images/story/story_hero.webp"
      alt="Meraki FAQ Hero"
    />

    <!-- Anchor quick-nav + search -->
    <div class="mx-auto max-w-7xl px-6 sm:px-8 py-6 sm:py-8 lg:py-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <nav class="flex flex-wrap gap-2">
          <a href="#workshops" class="chip">Workshops & Activities</a>
          <a href="#events" class="chip">Events & Parties</a>
          <a href="#kids" class="chip">Kids Programs</a>
          <a href="#policies" class="chip">Booking & Policies</a>
        </nav>
        <div class="relative w-full sm:w-80">
          <input
            v-model.trim="query"
            type="text"
            placeholder="Search FAQs..."
            class="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--meraki-secondary)]"
          />
          <svg class="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-3.2-3.2"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- FAQ Sections -->
    <div class="mx-auto max-w-7xl px-6 sm:px-8 pb-12 sm:pb-16 lg:pb-20 space-y-14">
      <!-- Block 2: Workshops & Activities -->
      <section id="workshops" class="section">
        <header class="section-header">
          <h2 class="section-title">Workshops & Activities</h2>
          <p class="section-sub">All skill levels welcome. Materials are included unless noted.</p>
        </header>
        <div class="faq-card faq-list">
          <details v-for="(item, i) in filtered.workshops" :key="'w'+i" class="faq-row">
            <summary class="faq-q">{{ item.question }}</summary>
            <div class="faq-a">
              <p>{{ item.answer }}</p>
            </div>
          </details>
          <EmptyState v-if="!filtered.workshops.length && query" label="No matches in Workshops & Activities" />
        </div>
      </section>

      <!-- Block 3: Events & Parties -->
      <section id="events" class="section">
        <header class="section-header">
          <h2 class="section-title">Events & Parties</h2>
          <p class="section-sub">From intimate birthdays to brand activations—Meraki travels too.</p>
        </header>
        <div class="faq-card faq-list">
          <details v-for="(item, i) in filtered.events" :key="'e'+i" class="faq-row">
            <summary class="faq-q">{{ item.question }}</summary>
            <div class="faq-a">
              <p>{{ item.answer }}</p>
            </div>
          </details>
          <EmptyState v-if="!filtered.events.length && query" label="No matches in Events & Parties" />
        </div>
      </section>

      <!-- Block 4: Kids Programs -->
      <section id="kids" class="section">
        <header class="section-header">
          <h2 class="section-title">Kids Programs</h2>
          <p class="section-sub">Structured learning with playful, age-appropriate projects.</p>
        </header>
        <div class="faq-card faq-list">
          <details v-for="(item, i) in filtered.kids" :key="'k'+i" class="faq-row">
            <summary class="faq-q">{{ item.question }}</summary>
            <div class="faq-a">
              <p>{{ item.answer }}</p>
            </div>
          </details>
          <EmptyState v-if="!filtered.kids.length && query" label="No matches in Kids Programs" />
        </div>
      </section>

      <!-- Block 5: Booking & Policies -->
      <section id="policies" class="section">
        <header class="section-header">
          <h2 class="section-title">Booking & Policies</h2>
          <p class="section-sub">Easy bookings, clear policies—so you can focus on creating.</p>
        </header>
        <div class="faq-card faq-list">
          <details v-for="(item, i) in filtered.policies" :key="'p'+i" class="faq-row">
            <summary class="faq-q">{{ item.question }}</summary>
            <div class="faq-a">
              <p>{{ item.answer }}</p>
            </div>
          </details>
          <EmptyState v-if="!filtered.policies.length && query" label="No matches in Booking & Policies" />
        </div>
      </section>

      <!-- Block 6: CTA -->
      <section class="rounded-2xl border border-neutral-200 bg-[var(--meraki-cream)] p-6 sm:p-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 class="text-2xl sm:text-3xl font-semibold tracking-tight">Have a question? Hit us up!</h3>
            <p class="mt-2 text-neutral-700">We’re happy to help you choose the right activity or plan your event.</p>
          </div>
          <div class="grid gap-2 text-sm">
            <a href="tel:+971508523600" class="contact-pill">📞 +971 50 852 3600</a>
            <a href="mailto:hello@merakiartstudio.ae" class="contact-pill">✉️ hello@merakiartstudio.ae</a>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import PartnerHero from '@/components/partners/PartnerHero.vue'

// Actual copy
const workshops = [
  {
    question: 'Do I need any prior art experience to join a workshop?',
    answer: 'Not at all! Our sessions are designed for all levels, and our team is there to guide you step-by-step.'
  },
  {
    question: 'Can I walk in for an activity or should I book in advance?',
    answer: 'Walk-ins are welcome based on availability, but we recommend booking in advance to secure your spot and materials.'
  },
  {
    question: 'Are all materials included?',
    answer: 'Yes, all tools and materials are provided, including safety gear where required.'
  },
  {
    question: 'Can I take my artwork home right away?',
    answer: 'Some artworks (like resin or fluid art) may take up to 24 hours to dry. You’ll need to return to collect your piece. Kindly pick it up within 1 month, as we cannot guarantee storage beyond that.'
  }
]

const events = [
  {
    question: 'What is the minimum age for birthday parties?',
    answer: 'We host parties for children aged 3 and up, with activities tailored to age and group size.'
  },
  {
    question: 'Can we bring our own food and cake?',
    answer: 'Absolutely! You may bring your own food or cake, or choose from our catering and live station options.'
  },
  {
    question: 'Do you offer themed decor and entertainment?',
    answer: 'Yes! We can provide full decor, entertainers, photographers, cakes, and even party favors.'
  },
  {
    question: 'Can you host events outside the studio?',
    answer: 'Yes—we offer mobile setups and can bring Meraki to your location.'
  }
]

const kids = [
  {
    question: 'What age group is your afterschool program for?',
    answer: 'Our art classes are perfect for children aged 5 to 14 and are grouped by age and skill level.'
  },
  {
    question: 'Do kids receive a certificate?',
    answer: 'Yes! All term students receive a certificate of completion at the end of the course.'
  }
]

const policies = [
  {
    question: 'How do I book an activity or event?',
    answer: 'Use our online calendar, booking forms, or contact us directly via WhatsApp or phone to reserve your spot.'
  },
  {
    question: 'What’s your refund or cancellation policy?',
    answer: 'We do not offer refunds once a booking is confirmed. Reschedules may be considered with advance notice, subject to availability.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept card payments, bank transfers, and secure payment links.'
  }
]

const query = ref('')
const norm = (s) => s.toLowerCase()

const filterList = (list) => {
  if (!query.value) return list
  const q = norm(query.value)
  return list.filter((x) => norm(x.question).includes(q) || norm(x.answer).includes(q))
}

const filtered = computed(() => ({
  workshops: filterList(workshops),
  events: filterList(events),
  kids: filterList(kids),
  policies: filterList(policies)
}))
</script>

<!-- lightweight presentational helpers -->
<script>
export default {
  components: {
    // Tiny inline component for empty-search states
    EmptyState: {
      props: { label: String },
      template: `
        <div class='py-8 text-center text-sm text-neutral-500'>
          <span>{{ label }}</span>
        </div>
      `
    }
  }
}
</script>

<style scoped>
.section { scroll-margin-top: 96px; }
.section-header { margin-bottom: 1rem; }
.section-title { font-size: clamp(1.5rem, 2vw + 1rem, 2rem); font-weight: 700; letter-spacing: -0.01em; }
.section-sub { color: rgb(82 82 82); }

/* FAQ layout inspired by the reference screenshots */
.faq-card { background: transparent; border: 0; }
.faq-list { counter-reset: faq; }

.faq-row { border-bottom: 1px solid rgb(229 229 229); border-top: 0; margin: 0; border-radius: 14px; overflow: hidden; }
.faq-row:first-child { border-top: 0; }

/* Question row with right aligned + icon */
.faq-q { list-style: none; cursor: pointer; padding: 1.25rem 1.5rem; display: flex; align-items: center; justify-content: space-between; font-weight: 600; }
.faq-q::-webkit-details-marker { display: none; }
.faq-row > .faq-q::before { counter-increment: faq; content: counter(faq) ". "; color: #111827; font-weight: 700; margin-right: .25rem; }
.faq-row > .faq-q::after { content: '+'; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: 1px solid rgb(212 212 212); border-radius: 9999px; background: #fff; color: #404040; font-size: 22px; line-height: 1; margin-left: 1rem; flex-shrink: 0; transition: background .2s ease, color .2s ease, border-color .2s ease; }
.faq-row:hover > .faq-q::after { border-color: var(--meraki-primary); color: var(--meraki-primary); }

/* Open state creates a card with elevation and switches to minus */
.faq-row[open] { background: #fff; border: 1px solid rgb(234 234 234); box-shadow: 0 10px 30px rgba(17,17,17,.08); margin: 0.75rem 0; }
.faq-row[open] > .faq-q { padding-bottom: .75rem; }
.faq-row[open] > .faq-q::after { content: '–'; background: var(--meraki-secondary); color: #fff; border-color: var(--meraki-secondary); }

/* Answer block */
.faq-a { padding: 0 1.5rem 1.25rem; color: #444; }
.faq-a p { margin: 0; line-height: 1.7; }

/* Chips */
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgb(212 212 212);
  border-radius: 9999px;
  background: white;
  font-size: 0.875rem;
  transition: color .15s ease, border-color .15s ease;
}
.chip:hover { color: var(--meraki-primary); border-color: var(--meraki-primary); }

/* Contact pills */
.contact-pill {
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid rgb(212 212 212);
  background: white; border-radius: 9999px; padding: .5rem .75rem;
}
</style>
