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
import { usePageSeo } from '~/composables/usePageSeo'

usePageSeo({
  title: "Workshops: Art Workshops in Dubai | Meraki Art Studio",
  description:
    "Guided, hands-on art workshops in Dubai with premium materials and expert mentors. One-time sessions for friends, families and visitors. See dates and book.",
  image: "/images/block3_workshops.webp",
})

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
        badge: "THE TEXTILE EDIT",
        image: "/images/workshops/oct/kinusaiga-art.jpeg",
        title: "Kinusaiga Art",
        price: "175 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-10-10T00:00:00Z'),
        sessions: [
          { startISO: "2026-10-10T10:30:00+04:00", endISO: "2026-10-10T12:30:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Saturday, 10 October 2026",
          },
          {
            icon: ClockIcon,
            text: "10:30 AM – 12:30 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Kinusaiga Art",
          dates: "Saturday, 10 October 2026",
          time: "10:30 AM – 12:30 PM",
          location: "Meraki Art Studio",
          price: "175 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/oct/kinusaiga-art.jpeg",
          imageCaption: "Kinusaiga Art at Meraki Art Studio",
          content: "<p>Discover the Japanese art of Kinusaiga and create a beautiful no-sew fabric artwork using layered textiles, patterns and colour.</p>",
        },
      },
      {
        badge: "THE BOTANICAL EDIT",
        image: "/images/workshops/oct/3d-botanical-canvas.jpeg",
        title: "3D Botanical Canvas",
        price: "150 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-10-18T00:00:00Z'),
        sessions: [
          { startISO: "2026-10-18T15:00:00+04:00", endISO: "2026-10-18T17:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sunday, 18 October 2026",
          },
          {
            icon: ClockIcon,
            text: "3:00 PM – 5:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "3D Botanical Canvas",
          dates: "Sunday, 18 October 2026",
          time: "3:00 PM – 5:00 PM",
          location: "Meraki Art Studio",
          price: "150 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/oct/3d-botanical-canvas.jpeg",
          imageCaption: "3D Botanical Canvas at Meraki Art Studio",
          content: "<p>Paint and sculpt a striking 3D botanical canvas, bringing fruit, leaves and branches to life with raised texture and bold colour.</p>",
        },
      },
      {
        badge: "THE MAHJONG EDIT",
        image: "/images/workshops/oct/mahjong.jpeg",
        title: "Weekday Mahjong Course",
        price: "475 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-10-20T00:00:00Z'),
        sessions: [
          { startISO: "2026-10-20T11:00:00+04:00", endISO: "2026-10-20T13:00:00+04:00" },
          { startISO: "2026-10-21T11:00:00+04:00", endISO: "2026-10-21T13:00:00+04:00" },
          { startISO: "2026-10-22T11:00:00+04:00", endISO: "2026-10-22T13:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Tuesday – Thursday, 20–22 October 2026",
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
          title: "Weekday Mahjong Course",
          dates: "Tuesday – Thursday, 20–22 October 2026",
          time: "11:00 AM – 1:00 PM",
          location: "Meraki Art Studio",
          price: "475 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/oct/mahjong.jpeg",
          imageCaption: "Weekday Mahjong Course at Meraki Art Studio",
          content: "<p>A multi-session Mahjong course designed to build confidence, strategy and game flow through guided learning and gameplay.</p>",
        },
      },
      {
        badge: "THE SCENT EDIT",
        image: "/images/workshops/oct/perfume-making.jpeg",
        title: "Perfume Making",
        price: "160 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-10-24T00:00:00Z'),
        sessions: [
          { startISO: "2026-10-24T16:00:00+04:00", endISO: "2026-10-24T18:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Saturday, 24 October 2026",
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
          title: "Perfume Making",
          dates: "Saturday, 24 October 2026",
          time: "4:00 PM – 6:00 PM",
          location: "Meraki Art Studio",
          price: "160 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/oct/perfume-making.jpeg",
          imageCaption: "Perfume Making at Meraki Art Studio",
          content: "<p>Explore top, heart and base notes and blend your own signature perfume to take home in a beautiful bottle.</p>",
        },
      },
      {
        badge: "THE DIWALI EDIT",
        image: "/images/workshops/oct/diwali-lotus-candles.jpeg",
        title: "Diwali Lotus Candles",
        price: "195 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-10-25T00:00:00Z'),
        sessions: [
          { startISO: "2026-10-25T11:00:00+04:00", endISO: "2026-10-25T13:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sunday, 25 October 2026",
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
          title: "Diwali Lotus Candles",
          dates: "Sunday, 25 October 2026",
          time: "11:00 AM – 1:00 PM",
          location: "Meraki Art Studio",
          price: "195 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/oct/diwali-lotus-candles.jpeg",
          imageCaption: "Diwali Lotus Candles at Meraki Art Studio",
          content: "<p>Celebrate the festival of lights by creating your own decorative lotus candles, finished with floral details, colour and shimmer.</p>",
        },
      },
      {
        badge: "THE HALLOWEEN EDIT",
        image: "/images/workshops/oct/halloween-art.jpeg",
        title: "Halloween Stained Glass Art (Kids)",
        price: "125 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-10-31T00:00:00Z'),
        sessions: [
          { startISO: "2026-10-31T14:00:00+04:00", endISO: "2026-10-31T16:00:00+04:00" },
        ],
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Saturday, 31 October 2026",
          },
          {
            icon: ClockIcon,
            text: "2:00 PM – 4:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Halloween Stained Glass Art (Kids)",
          dates: "Saturday, 31 October 2026",
          time: "2:00 PM – 4:00 PM",
          location: "Meraki Art Studio",
          price: "125 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/oct/halloween-art.jpeg",
          imageCaption: "Halloween Stained Glass Art (Kids) at Meraki Art Studio",
          content: "<p>A spooky-fun session for kids to create a colourful Halloween stained glass artwork using bold outlines and vibrant glass paints.</p>",
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
