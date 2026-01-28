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
    <WorkshopsCtaBlock />
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
import WorkshopsCtaBlock from '~/components/WorkshopsCtaBlock.vue'

const blockOneData = {
  image:
    "/images/workshops/workshops_block2.webp",
  title: "Workshops",
  tagline: "Create, Explore, Evolve.",
  description:
    "Meraki Art Studio offers Dubai’s most thoughtfully curated workshops and courses.",
};

const blockTwoData = {
  image:
    "/images/workshops/workshops_block2.webp",
  title: "",
  description:
    "Whether you’re seeking a fun outing or building mastery, every experience is hands-on, inspiring, and curated to help you unlock your artistic potential. Choose from one-time sessions perfect for tourists, families, and friends looking for memorable fun, or embark on multi-day courses tailored for aspiring artists ready to deepen their skills. Every workshop is guided by passionate mentors, using premium materials.",
};

const workshopsData = [
  {
    title: "Our Workshops",
    sections: [
      {
        badge: "WORKSHOPS",
        image: "/images/shop/oct2.jpeg",
        title: "Kids Halloween Workshop",
        price: "150 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2025-10-31T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Friday, 31 October 2025",
          },
          {
            icon: ClockIcon,
            text: "3:30 PM – 5:30 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Kids Halloween Workshop",
          dates: "Friday, 31 October 2025",
          time: "3:30 PM – 5:30 PM",
          location: "Meraki Art Studio",
          price: "150 AED",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/shop/oct2.jpeg",
          imageCaption: "Kids Halloween Workshop at Meraki Art Studio",
          content: `
            <p>A fun-filled Halloween afternoon featuring Glow Slime + Mini Pumpkin Painting.</p>
            <ul>
              <li>Guided slime making with glow effects</li>
              <li>Paint your own mini pumpkin</li>
              <li>Halloween special drink included</li>
            </ul>
          `,
        },
      },
      {
        badge: "WORKSHOPS",
        image:
          "/images/workshops/2.webp",
        title: "Moon Texture Art",
        price: "325 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2025-09-04T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "From 4 September 2025",
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
          title: "Moon Texture Art",
          dates: "From 4 September 2025",
          time: "10:30 AM – 12:30 PM",
          location: "Meraki Art Studio",
          price: "325 AED",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc:
            "/images/workshops/2.webp",
          imageCaption:
            "Moon Texture Art. Photo: Meraki Art Studio",
          content:
            "<p>Create your own moon-textured masterpiece.</p>",
        },
      },
      {
        badge: "WORKSHOPS",
        image:
          "/images/workshops/3.webp",
        title: "Paint & Sip",
        price: "150 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2025-09-04T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "From 4 September 2025",
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
          title: "Paint & Sip",
          dates: "From 4 September 2025",
          time: "10:30 AM – 12:30 PM",
          location: "Meraki Art Studio",
          price: "150 AED",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc:
            "/images/workshops/3.webp",
          imageCaption:
            "Paint & Sip. Photo: Meraki Art Studio",
          content:
            "<p>Relax with brushes, brews & colors.</p>",
        },
      },
    ],
  },
  {
    title: "",
    sections: [
      {
        badge: "WORKSHOPS",
        image:
          "/images/workshops/4.webp",
        title: "Perfume Making",
        price: "195 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2025-09-18T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "From 18 September 2025",
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
          title: "Perfume Making",
          dates: "From 18 September 2025",
          time: "10:30 AM – 12:30 PM",
          location: "Meraki Art Studio",
          price: "195 AED",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc:
            "/images/workshops/1.webp",
          imageCaption:
            "Perfume Making. Photo: Meraki Art Studio",
          content:
            "<p>Blend your own personalized fragrance.</p>",
        },
      },
      {
        badge: "WORKSHOPS",
        image:
          "/images/workshops/5.webp",
        title: "Cold Process Soap Making",
        price: "475 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2025-09-25T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "From 25 September 2025",
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
          title: "Cold Process Soap Making",
          dates: "From 25 September 2025",
          time: "10:30 AM – 12:30 PM",
          location: "Meraki Art Studio",
          price: "475 AED",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc:
            "/images/workshops/1.webp",
          imageCaption:
            "Creative Mornings @ Meraki. Photo: Meraki Art Studio",
          content:
            "<p>Handcraft natural soaps with soothing scents.</p>",
        },
      }
      , {
        badge: "WORKSHOPS",
        image: "/images/shop/oct1.jpeg",
        title: "Witch’s Brew Candle Workshop",
        price: "275 AED",
        vat: true,
        vatValue: 5,
        dateTs: Date.parse('2025-10-30T00:00:00Z'),
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Thursday, 30 October 2025",
          },
          {
            icon: ClockIcon,
            text: "10:30 AM – 12:00 PM",
          },
          {
            icon: MapPinIcon,
            text: "Meraki Art Studio",
          },
        ],
        modal: true,
        modalContent: {
          title: "Witch’s Brew Candle Workshop",
          dates: "Thursday, 30 October 2025",
          time: "10:30 AM – 12:00 PM",
          location: "Meraki Art Studio",
          price: "275 AED",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/shop/oct1.jpeg",
          imageCaption: "Witch’s Brew Candle Workshop at Meraki Art Studio",
          content: `
            <p>Make spooky-scented candles in mini cauldron jars with black wax, gold shimmer, and magical Halloween scents like Midnight Amber, Smoky Vanilla, and Pumpkin Spice.</p>
            <ul>
              <li>Add crystal toppings & glitter dust</li>
              <li>Label your potion “No. 9”</li>
              <li>Halloween special drink included</li>
            </ul>
          `,
        },
      }
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
    "Every store pays it forward. We contribute a portion of total product sales to our Fund, through which we further support founders—those that are under-resourced and underrepresented—and their creations, with a combination of cash and services.",
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
