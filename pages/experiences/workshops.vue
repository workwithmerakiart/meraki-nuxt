<template>
  <div class="experiences--workshops">
    <ExperiencesBlockOne v-bind="blockOneData" />
    <ExperiencesBlockTwo v-bind="blockTwoData" />
    <div class="pt-5 pb-8">
      <ImageTilesBlock
        :title="'Our Workshops'"
        :tiles="sortedWorkshopTiles"
        categoryLabel="WORKSHOPS"
        @add-to-cart="addWorkshopToCart"
      />
    </div>
    <WorkshopsCtaBlock :beacon-url="workshopsBeaconUrl" />
  </div>
</template>

<script setup>
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
import { useCartStore } from '~/stores/cart'
import { computed } from 'vue'
import { useRuntimeConfig } from '#imports'
import WorkshopsCtaBlock from '~/components/WorkshopsCtaBlock.vue'

const workshopsBeaconUrl = computed(() => {
  try {
    return String(useRuntimeConfig().public?.workshopsBeaconUrl || '').trim()
  } catch {
    return ''
  }
})

const blockOneData = {
  image:
    "/images/workshops/workshops_block2.webp",
  title: "Workshops",
  tagline: "Create, Explore, Evolve.",
  description:
    "Meraki Art Studio offers Dubai's most thoughtfully curated workshops and courses.",
};

const blockTwoData = {
  image:
    "/images/workshops/workshops_block2.webp",
  title: "",
  description:
    "Whether you're seeking a fun outing or building mastery, every experience is hands-on, inspiring, and curated to help you unlock your artistic potential. Choose from one-time sessions perfect for tourists, families, and friends looking for memorable fun, or embark on multi-day courses tailored for aspiring artists ready to deepen their skills. Every workshop is guided by passionate mentors, using premium materials.",
};

const workshopsData = [
  {
    title: "Our Workshops",
    // NOTE: `sessions` carries machine-readable ISO times (Dubai, +04:00) used to
    // create Google Calendar events after payment. Multi-day courses list one
    // entry per session day. Keep these in sync with the displayed date/time above.
    sections: [
      {
        badge: "THE MAHJONG EDIT",
        image: "/images/workshops/weekend-mahjong.jpeg",
        title: "Weekend Mahjong Course",
        price: "475 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-09-12T00:00:00Z'),
        sessions: [
          { startISO: "2026-09-12T11:00:00+04:00", endISO: "2026-09-12T13:00:00+04:00" },
          { startISO: "2026-09-13T11:00:00+04:00", endISO: "2026-09-13T13:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Saturday & Sunday, 12–13 September 2026",
          },
          {
            icon: ClockIcon,
            text: "11:00 AM – 1:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Weekend Mahjong Course",
          dates: "Saturday & Sunday, 12–13 September 2026",
          time: "11:00 AM – 1:00 PM",
          location: "Meraki Art Studio",
          price: "475 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/weekend-mahjong.jpeg",
          imageCaption: "Weekend Mahjong Course at Meraki Art Studio",
          content: "<p>Learn the fundamentals of Mahjong, understand the tiles and game flow, build winning hands and play guided rounds in a fun, social setting.</p>",
        },
      },
      {
        badge: "THE LEMON EDIT",
        image: "/images/workshops/lemon-vase.jpeg",
        title: "Lemon Vase",
        price: "185 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-09-13T00:00:00Z'),
        sessions: [
          { startISO: "2026-09-13T16:00:00+04:00", endISO: "2026-09-13T18:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sunday, 13 September 2026",
          },
          {
            icon: ClockIcon,
            text: "4:00 PM – 6:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Lemon Vase",
          dates: "Sunday, 13 September 2026",
          time: "4:00 PM – 6:00 PM",
          location: "Meraki Art Studio",
          price: "185 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/lemon-vase.jpeg",
          imageCaption: "Lemon Vase at Meraki Art Studio",
          content: "<p>Create your own statement lemon vase — a fresh, playful piece designed to bring colour and charm to any space.</p>",
        },
      },
      {
        badge: "THE RESIN EDIT",
        image: "/images/workshops/resin-cheese-board.jpeg",
        title: "Resin Cheese Board",
        price: "275 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-09-17T00:00:00Z'),
        sessions: [
          { startISO: "2026-09-17T11:00:00+04:00", endISO: "2026-09-17T13:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Thursday, 17 September 2026",
          },
          {
            icon: ClockIcon,
            text: "11:00 AM – 1:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Resin Cheese Board",
          dates: "Thursday, 17 September 2026",
          time: "11:00 AM – 1:00 PM",
          location: "Meraki Art Studio",
          price: "275 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/resin-cheese-board.jpeg",
          imageCaption: "Resin Cheese Board at Meraki Art Studio",
          content: "<p>Design your own luxe resin cheese board using beautiful marbled effects and metallic accents.</p>",
        },
      },
      {
        badge: "THE TEXTILE EDIT",
        image: "/images/workshops/kinusaiga-art.jpeg",
        title: "Kinusaiga Art",
        price: "150 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-09-19T00:00:00Z'),
        sessions: [
          { startISO: "2026-09-19T11:00:00+04:00", endISO: "2026-09-19T13:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Saturday, 19 September 2026",
          },
          {
            icon: ClockIcon,
            text: "11:00 AM – 1:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Kinusaiga Art",
          dates: "Saturday, 19 September 2026",
          time: "11:00 AM – 1:00 PM",
          location: "Meraki Art Studio",
          price: "150 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/kinusaiga-art.jpeg",
          imageCaption: "Kinusaiga Art at Meraki Art Studio",
          content: "<p>Discover the Japanese art of Kinusaiga and create a beautiful no-sew fabric artwork using layered textiles, patterns and colour.</p>",
        },
      },
      {
        badge: "THE SPARKLE EDIT",
        image: "/images/workshops/bedazzle.jpeg",
        title: "Bedazzle Your Phone Case or Tumbler",
        price: "125 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-09-20T00:00:00Z'),
        sessions: [
          { startISO: "2026-09-20T16:00:00+04:00", endISO: "2026-09-20T18:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sunday, 20 September 2026",
          },
          {
            icon: ClockIcon,
            text: "4:00 PM – 6:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Bedazzle Your Phone Case or Tumbler",
          dates: "Sunday, 20 September 2026",
          time: "4:00 PM – 6:00 PM",
          location: "Meraki Art Studio",
          price: "125 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/bedazzle.jpeg",
          imageCaption: "Bedazzle Your Phone Case or Tumbler at Meraki Art Studio",
          content: "<p>Choose a phone case or tumbler and personalise it with rhinestones, charms and playful details.</p>",
        },
      },
      {
        badge: "THE MAHJONG EDIT",
        image: "/images/workshops/weekday-mahjong.jpeg",
        title: "Weekday Mahjong Course",
        price: "475 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-09-22T00:00:00Z'),
        sessions: [
          { startISO: "2026-09-22T16:00:00+04:00", endISO: "2026-09-22T18:00:00+04:00" },
          { startISO: "2026-09-23T16:00:00+04:00", endISO: "2026-09-23T18:00:00+04:00" },
          { startISO: "2026-09-24T16:00:00+04:00", endISO: "2026-09-24T18:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Tuesday – Thursday, 22–24 September 2026",
          },
          {
            icon: ClockIcon,
            text: "4:00 PM – 6:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Weekday Mahjong Course",
          dates: "Tuesday – Thursday, 22–24 September 2026",
          time: "4:00 PM – 6:00 PM",
          location: "Meraki Art Studio",
          price: "475 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/weekday-mahjong.jpeg",
          imageCaption: "Weekday Mahjong Course at Meraki Art Studio",
          content: "<p>A multi-session Mahjong course designed to build confidence, strategy and game flow through guided learning and gameplay.</p>",
        },
      },
      {
        badge: "THE FLORAL EDIT",
        image: "/images/workshops/floral-sculpture.jpeg",
        title: "Floral Sculpture Art",
        price: "275 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-09-26T00:00:00Z'),
        sessions: [
          { startISO: "2026-09-26T10:00:00+04:00", endISO: "2026-09-26T13:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Saturday, 26 September 2026",
          },
          {
            icon: ClockIcon,
            text: "10:00 AM – 1:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Floral Sculpture Art",
          dates: "Saturday, 26 September 2026",
          time: "10:00 AM – 1:00 PM",
          location: "Meraki Art Studio",
          price: "275 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/floral-sculpture.jpeg",
          imageCaption: "Floral Sculpture Art at Meraki Art Studio",
          content: "<p>Create a sculptural statement flower using air-dry clay, exploring colour, texture and form to make your own floral artwork.</p>",
        },
      },
    ],
  },
];

const sortedWorkshopTiles = computed(() => {
  const tiles = workshopsData.flatMap(section => section.sections || [])
  // Sort earliest first; missing dates go last
  return tiles.slice().sort((a, b) => {
    const ta = Number(a.dateTs || 0)
    const tb = Number(b.dateTs || 0)
    if (!ta) return 1
    if (!tb) return -1
    return ta - tb
  })
})

const cartStore = useCartStore()

function addWorkshopToCart(payload) {
  // payload comes from ImageTilesBlock emit. Prefer explicit checkoutPayload in modalContent.
  const sku = payload?.sku || payload?.checkoutPayload?.sku || payload?.id || payload?.title
  const title = payload?.title || payload?.checkoutPayload?.title || 'Workshop'
  const currency = payload?.currency || payload?.checkoutPayload?.currency || 'AED'

  // Price can be in multiple forms: unitAmount/priceMajor or string like "150 AED"
  const unitAmount =
    Number(payload?.unitAmount ?? payload?.priceMajor ?? payload?.checkoutPayload?.unitAmount ?? payload?.checkoutPayload?.priceMajor ?? 0) ||
    (typeof payload?.price === 'string' ? Number(String(payload.price).match(/([0-9]+(?:\.[0-9]+)?)/)?.[1] || 0) : 0) ||
    (typeof payload?.checkoutPayload?.price === 'string' ? Number(String(payload.checkoutPayload.price).match(/([0-9]+(?:\.[0-9]+)?)/)?.[1] || 0) : 0)

  const image = payload?.image || payload?.imageSrc || payload?.modalContent?.imageSrc || payload?.checkoutPayload?.image || payload?.modalContent?.image

  if (!sku || !unitAmount) return

  const vatEnabled = payload?.vat ?? payload?.checkoutPayload?.vat
  const vatValue = payload?.vatValue ?? payload?.checkoutPayload?.vatValue

  cartStore.add({
    type: 'workshop',
    id: sku,
    sku,
    title,
    image,
    priceMajor: unitAmount,
    currency,
    vat: vatEnabled !== undefined ? !!vatEnabled : true,
    vatValue: vatValue !== undefined ? Number(vatValue) : 5,
    vatIncluded: false,
    variantKey: payload?.variantKey || payload?.checkoutPayload?.variantKey || null,
    meta: {
      flowType: 'Workshops',
      kind: 'workshop',
      dates: payload?.dates || payload?.modalContent?.dates,
      time: payload?.time || payload?.modalContent?.time,
      location: payload?.location || payload?.modalContent?.location,
      // Machine-readable session times (Dubai) so the Stripe webhook can create
      // one Google Calendar event per session day after payment succeeds.
      sessions: Array.isArray(payload?.sessions) ? payload.sessions : [],
    },
  }, 1)

  if (process.client) {
    window.dispatchEvent(new CustomEvent('open-cart'))
  }
}

const eventBlockData = {
  title: "SOULFUSION PAINT YOGA",
  dateShort: "20 Sun, Nov 2022",
  subtitle: "The Art of SoulFusion Yoga.",
  date: "Sunday, 20 November 2022",
  time: "13:00-14:15",
  description:
    "Come flow with @soulfusionwithamira through a grounding sequence, brought alive by a soul-mending playlist... while painting your own chakra-centred canvas you can take home!",
  imageUrl:
    "https://wildpainthouse.com/public/uploads/events/Soulfusion%20Paint%20Yoga_1672311937.JPG",
};

const imageStackData = {
  title: "The Pop Up Grocer Fund",
  description: [
    "Every store pays it forward. We contribute a portion of total product sales to our Fund, through which we further support founders\u2014those that are under-resourced and underrepresented\u2014and their creations, with a combination of cash and services.",
    "Are you a founder that qualifies?",
  ],
  button: "Apply for The Fund",
  imageStack: [
    {
      badge: ["Leanne Viola", "Whims"],
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=500&fit=crop",
    },
    {
      badge: ["John Smith", "GreenTech"],
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    },
    {
      badge: ["Sarah Johnson", "EcoStart"],
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    },
    {
      badge: ["Carlos Diaz", "Urban Earth"],
      image:
        "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?w=400&h=500&fit=crop",
    },
    {
      badge: ["Mina Patel", "FreshRise"],
      image:
        "https://images.unsplash.com/photo-1635995554625-6c1deba1732e?w=400&h=500&fit=crop",
    },
    {
      badge: ["Olivia Brown", "Bright & Co"],
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    },
    {
      badge: ["Ravi Kumar", "SpiceBloom"],
      image:
        "https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?w=400&h=500&fit=crop",
    },
  ],
};
</script>
