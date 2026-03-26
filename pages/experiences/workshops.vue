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
    sections: [
      {
        badge: "WORKSHOPS",
        image: "/images/workshops/2.webp",
        title: "Moon Texture Art",
        price: "250 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-04-04T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Saturday, 4 April 2026",
          },
          {
            icon: ClockIcon,
            text: "3:00 PM \u2013 5:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Moon Texture Art",
          dates: "Saturday, 4 April 2026",
          time: "3:00 PM \u2013 5:00 PM",
          location: "Meraki Art Studio",
          price: "250 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/2.webp",
          imageCaption: "Moon Texture Art at Meraki Art Studio",
          content: "<p>Create your own textured moon-inspired artwork in a calming and hands-on guided session.</p>",
        },
      },
      {
        badge: "WORKSHOPS",
        image: "/images/workshops/3.webp",
        title: "Guided Painting",
        price: "95 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2026-04-05T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sunday, 5 April 2026",
          },
          {
            icon: ClockIcon,
            text: "11:00 AM \u2013 1:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Guided Painting",
          dates: "Sunday, 5 April 2026",
          time: "11:00 AM \u2013 1:00 PM",
          location: "Meraki Art Studio",
          price: "95 AED",
          vat: true,
          vatValue: 5,
          registerText: "Book Now",
          imageSrc: "/images/workshops/3.webp",
          imageCaption: "Guided Painting at Meraki Art Studio",
          content: "<p>A relaxing step-by-step painting experience designed for all skill levels. (25x30cm)</p>",
        },
      },
    ],
  },
];

const sortedWorkshopTiles = computed(() => {
  const tiles = workshopsData.flatMap(section => section.sections || [])
  // Sort latest first; missing dates go last
  return tiles.slice().sort((a, b) => (Number(b.dateTs || 0) - Number(a.dateTs || 0)))
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
