<template>
  <div class="experiences--activities">
    <!-- Page intro block with animation -->
    <motion tag="div" :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.7, delay: 0.1 }">
      <ExperiencesBlockOne v-bind="blockOneData" />
    </motion>

    <motion tag="div" :initial="{ opacity: 0, y: 70 }" :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.7, delay: 0.4 }">
      <ExperiencesBlockBetweenOneAndTwo v-bind="blockBetweenOneAndTwoData" />
    </motion>

    <motion tag="div" :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.7, delay: 0.7 }">
      <ExperiencesBlockTwo v-bind="blockTwoData" />
    </motion>

    <!-- NEW ACTIVITY GRID + MODAL -->
    <ActivityGrid :activities="activities" @open-modal="selectedActivity = $event" />
    <ActivityModal :activity="selectedActivity" @close="handleModalClose" />

    <NuxtPage />

    <BookActivities v-bind="bookActivitiesContent" />

  </div>
</template>

<script setup>
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
import ActivityGrid from "~/components/experiences/activities/ActivityGrid.vue";
import ActivityModal from "~/components/experiences/activities/ActivityModal.vue";
import BookActivities from "~/components/experiences/activities/BookActivities.vue";

const selectedActivity = ref(null);

const handleModalClose = () => {
  // Delay unmounting to allow navigation to complete
  setTimeout(() => {
    selectedActivity.value = null
  }, 300)
}


const activities = [
  {
    id: 1,
    name: "Neon Art Zone",
    image: "/images/activities/activities_neon_art_zone.webp",
    shortDescription: "Glow, splash, pour — all things neon.",
    modal: true,
    subtypes: [
      {
        id: "1.1",
        title: "Neon Art Attack",
        image: "/images/activities/neon-art-attack.webp",
        description: "Splash, flick & throw neon paint in full-body suits.",
        price: "AED 155",
        vatIncluded: false,
        duration: "~45 mins",
        minTickets: 3,
        bottomNote: "Get messy in the most vibrant way with our signature neon paint experience!"
      },
      {
        id: "1.2",
        title: "Neon Slime",
        image: "/images/activities/activities_neon_slime.webp",
        description: "Glow-in-the-dark gooey fun for all ages.",
        price: "AED 85",
        vatIncluded: false,
        duration: "30 mins",
        bottomNote: "Get messy in the most vibrant way with our signature neon paint experience!"
      },
      {
        id: "1.3",
        title: "Neon Bear Pouring",
        image: "/images/activities/activities_neon_bear.webp",
        description: "Create your own neon resin bear.",
        duration: "30 mins",
        bottomNote: "Get messy in the most vibrant way with our signature neon paint experience!",
        variants: [
          { name: "Keychain", price: "AED 40", vatIncluded: true },
          { name: "Small", price: "AED 140", vatIncluded: true },
          { name: "Medium", price: "AED 195", vatIncluded: true },
          { name: "Large", price: "AED 275", vatIncluded: true }
        ]
      },
      {
        id: "1.4",
        title: "Neon Fluid Art",
        image: "/images/activities/neon-fluid-art.jpg",
        description: "Pour and swirl your own neon canvas masterpiece.",
        duration: "~45–60 mins",
        bottomNote: "Get messy in the most vibrant way with our signature neon paint experience!",
        variants: [
          { name: "30x25 cm", price: "AED 140", vatIncluded: true },
          { name: "40x50 cm", price: "AED 185", vatIncluded: true },
          { name: "60x60 cm", price: "AED 310", vatIncluded: true },
          { name: "60x90 cm", price: "AED 375", vatIncluded: true },
          { name: "75x100 cm", price: "AED 525", vatIncluded: true }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Resin Art",
    image: "/images/activities/resin/activities_resin_art.webp",
    shortDescription: "Pour your creativity into glossy, high-end pieces.",
    modal: true,
    subtypes: [
      {
        id: "2.1",
        title: "MDF Coasters (Set of 2)",
        image: "/images/activities/resin/activities_resin_art_coasters2.webp",
        description: "Perfect for beginners — create two glossy MDF coasters.",
        price: "AED 175",
        vatIncluded: true,
        bottomNote: "Get started with resin on a small canvas. Easy, fun, and stylish!"
      },
      {
        id: "2.2",
        title: "MDF Coasters (Set of 4)",
        image: "/images/activities/resin/activities_resin_art_coasters4.webp",
        description: "A set of four handmade resin coasters on MDF base.",
        price: "AED 250",
        vatIncluded: true,
        bottomNote: "Add more flair with this extended coaster-making session."
      },
      {
        id: "2.3",
        title: "Agate Coasters (Set of 2)",
        image: "/images/activities/resin/activities_resin_agate_coasters.webp",
        description: "Elegant, crystal-like agate coasters made with resin.",
        price: "AED 300",
        vatIncluded: true,
        bottomNote: "Craft beautiful faux-agate pieces perfect for gifting."
      },
      {
        id: "2.4",
        title: "Acrylic Tray (13x26 cm)",
        image: "/images/activities/resin/activities_resin_acrylic_tray_1326.webp",
        description: "Customize a sleek rectangular acrylic tray with resin art.",
        price: "AED 200",
        vatIncluded: true,
        bottomNote: "Functional and fabulous — your art becomes a lifestyle piece!"
      },
      {
        id: "2.5",
        title: "Acrylic Tray (20x20 cm)",
        image: "/images/activities/resin/activities_resin_acrylic_tray_2020.webp",
        description: "Square-shaped tray ideal for modern resin designs.",
        price: "AED 275",
        vatIncluded: true,
        bottomNote: "Perfect for gifting or keeping your trinkets stylishly sorted."
      },
      {
        id: "2.6",
        title: "Acrylic Tray (20x30 cm)",
        image: "/images/activities/resin/activities_resin_acrylic_tray_2030.webp",
        description: "Larger tray option for elaborate resin effects.",
        price: "AED 350",
        vatIncluded: true,
        bottomNote: "Unleash more creativity with a larger working surface."
      },
      {
        id: "2.7",
        title: "Clock (30 cm dia)",
        image: "/images/activities/resin/activities_resin_clock.webp",
        description: "Create a round resin wall clock — artistic and functional.",
        price: "AED 275",
        vatIncluded: true,
        bottomNote: "Design a piece of time you’ll love watching!"
      },
      {
        id: "2.8",
        title: "Clock with Rings (40 cm dia)",
        image: "/images/activities/resin/activities_resin_clock_with_rings.webp",
        description: "Stylish wall clock with intricate resin ring detailing.",
        price: "AED 500",
        vatIncluded: true,
        bottomNote: "Go big and bold with layered resin textures."
      },
      {
        id: "2.9",
        title: "Cheeseboard",
        image: "/images/activities/resin/activities_resin_cheeseboard.webp",
        description: "Decorate a wood and resin cheeseboard for serving in style.",
        price: "AED 350",
        vatIncluded: true,
        bottomNote: "Serve up style with your own handmade resin cheeseboard."
      },
      {
        id: "2.10",
        title: "Beach Painting",
        image: "/images/activities/resin/activities_resin_beach_painting.webp",
        description: "Create dreamy ocean waves using beach-inspired resin art.",
        price: "AED 425",
        vatIncluded: true,
        bottomNote: "Bring the calm of the coast to your canvas."
      },
      {
        id: "2.11",
        title: "Book Cover",
        image: "/images/activities/resin/activities_resin_book_cover.webp",
        description: "Customize a hardback book cover with resin textures.",
        price: "AED 200",
        vatIncluded: true,
        bottomNote: "Turn reading into a resin masterpiece."
      },
      {
        id: "2.12",
        title: "Bookmark",
        image: "/images/activities/resin/activities_resin_bookmark.webp",
        description: "Make a glossy, colorful bookmark to mark your reads.",
        price: "AED 25",
        vatIncluded: true,
        bottomNote: "Short, sweet, and stunning — a quick win for all ages."
      },
      {
        id: "2.13",
        title: "Keychains",
        image: "/images/activities/resin/activities_resin_keychains.webp",
        description: "Craft your own mini resin keychains with initials or glitter.",
        price: "AED 35",
        vatIncluded: true,
        bottomNote: "Small but stylish. Great for gifts or personal flair."
      }
    ]
  },
  {
    id: 3,
    name: "Jesmonite Creations",
    image: "/images/activities/jesmonite/activities_jesmonite.webp",
    shortDescription: "Where minimalist style meets bold texture.",
    modal: true,
    subtypes: [
      {
        id: "3.1",
        title: "Tray",
        image: "/images/activities/jesmonite/activities_jesmonite_tray.webp",
        description: "Craft your own minimalistic tray with unique textures.",
        price: "AED 150",
        vatIncluded: true,
        bottomNote: "Perfect for keys, candles, or just aesthetic organization."
      },
      {
        id: "3.2",
        title: "Coasters (Set of 2)",
        image: "/images/activities/jesmonite/activities_jesmonite_coasters.webp",
        description: "Pour and pigment your own pair of stylish coasters.",
        price: "AED 125",
        vatIncluded: true,
        bottomNote: "A simple yet impactful addition to any space."
      },
      {
        id: "3.3",
        title: "Pot",
        image: "/images/activities/jesmonite/activities_jesmonite_pot.webp",
        description: "Make your own chic jesmonite pot for plants or storage.",
        price: "AED 150",
        vatIncluded: true,
        bottomNote: "Smooth finish, modern shape, and 100% handmade by you."
      },
      {
        id: "3.4",
        title: "Tray + Coasters Set",
        image: "/images/activities/jesmonite/activities_jesmonite_tray+coasters.webp",
        description: "Create a matching set — ideal for home styling.",
        price: "AED 250",
        vatIncluded: true,
        bottomNote: "Looks even better when you say you made it yourself."
      },
      {
        id: "3.5",
        title: "Moroccan Tray",
        image: "/images/activities/jesmonite/activities_jesmonite_moroccan_tray.webp",
        description: "Design a textured statement tray with Moroccan inspiration.",
        price: "AED 450",
        vatIncluded: true,
        bottomNote: "A bold centrepiece handcrafted in your unique colour palette."
      }
    ]
  },
  {
    id: 4,
    name: "Decoden Delights",
    image: "/images/activities/decoden/activities_decoden.webp",
    shortDescription: "Kawaii overload! Customize accessories with whipped clay and cute charms.",
    modal: true,
    subtypes: [
      {
        id: "4.1",
        title: "Phone Case",
        image: "/images/activities/decoden/activities_decoden_phonecase.webp",
        description: "Design your dream kawaii phone case.",
        price: "AED 85",
        vatIncluded: true,
        bottomNote: "Turn your phone into a cute masterpiece!"
      },
      {
        id: "4.2",
        title: "Mirror",
        image: "/images/activities/decoden/activities_decoden_mirror.webp",
        description: "Decorate your mirror with charms and whipped clay.",
        price: "AED 150",
        vatIncluded: true,
        bottomNote: "Every glance will sparkle with your custom flair!"
      },
      {
        id: "4.3",
        title: "Hand Mirror",
        image: "/images/activities/decoden/activities_decoden_hand_mirror.webp",
        description: "Add a pop of kawaii to your hand mirror.",
        price: "AED 85",
        vatIncluded: true,
        bottomNote: "Perfect for glam on the go."
      },
      {
        id: "4.4",
        title: "Mini Hair Brush",
        image: "/images/activities/decoden/activities_decoden_mini_hair_brush.webp",
        description: "Small but packed with personality!",
        price: "AED 35",
        vatIncluded: true,
        bottomNote: "Let your style shine through even in the tiniest details."
      },
      {
        id: "4.5",
        title: "Hair Brush",
        image: "/images/activities/decoden/activities_decoden_hair_brush.webp",
        description: "Make every stroke magical.",
        price: "AED 65",
        vatIncluded: true,
        bottomNote: "Style meets cuteness overload!"
      },
      {
        id: "4.6",
        title: "Jewelry Box",
        image: "/images/activities/decoden/activities_decoden_jewellery_box.webp",
        description: "Store your treasures in a box full of charm.",
        price: "AED 185",
        vatIncluded: true,
        bottomNote: "Cute on the outside, precious on the inside."
      }
    ]
  },
  {
    id: 5,
    name: "Beauty Blend",
    image: "/images/activities/beauty-blend.webp",
    shortDescription: "Make it cute. Make it scented. Make it you!",
    modal: true,
    subtypes: [
      {
        id: "5.1",
        title: "Candle Making",
        image: "/images/activities/beauty-blend.webp",
        description: "Craft your own aromatic candle.",
        price: "AED 250",
        vatIncluded: true,
        bottomNote: "From wick to wax — pour your personality into a candle!"
      },
      {
        id: "5.2",
        title: "Soap Making",
        image: "/images/activities/soap-making.webp",
        description: "Customize and create beautiful handmade soaps.",
        price: "AED 175",
        vatIncluded: true,
        bottomNote: "Clean, fun, and totally custom — your soap, your vibe!"
      },
      {
        id: "5.3",
        title: "Bath Bomb",
        image: "/images/activities/bath-bomb.jpeg",
        description: "Fizz up your bath time with personalized bombs.",
        price: "AED 125",
        vatIncluded: true,
        bottomNote: "Scented fizzies made by you — soak, relax, repeat."
      }
    ]
  },
  {
    id: 6,
    name: "Other Creative Experiences",
    image: "/images/activities/other/activities_other.webp",
    shortDescription: "Eclectic DIY fun – pour, paint, sculpt and stuff!",
    modal: true,
    subtypes: [
      {
        id: "6.1",
        title: "Bear Pouring (Classic)",
        image: "/images/activities/other/activities_other_bear.webp",
        description: "Pour and customize your own adorable resin bear.",
        duration: "30 mins",
        bottomNote: "Craft a timeless keepsake with your personal touch.",
        variants: [
          { name: "Keychain", price: "AED 35", vatIncluded: true },
          { name: "Small", price: "AED 125", vatIncluded: true },
          { name: "Medium", price: "AED 160", vatIncluded: true },
          { name: "Large", price: "AED 270", vatIncluded: true }
        ]
      },
      {
        id: "6.2",
        title: "Fluid Art (Non-Neon)",
        image: "/images/activities/other/activities_other_fluid_art.webp",
        description: "Pour and swirl high-gloss abstract art in your favorite colors.",
        duration: "~45 mins",
        bottomNote: "Create soothing, flowy masterpieces without the neon splash.",
        variants: [
          { name: "30x25 cm", price: "AED 125", vatIncluded: true },
          { name: "40x50 cm", price: "AED 160", vatIncluded: true },
          { name: "60x60 cm", price: "AED 270", vatIncluded: true },
          { name: "60x90 cm", price: "AED 325", vatIncluded: true },
          { name: "75x100 cm", price: "AED 450", vatIncluded: true }
        ]
      },
      {
        id: "6.3",
        title: "DIY Painting Session",
        image: "/images/activities/other/activities_other_diy.webp",
        description: "Rent a canvas, brushes, and unlimited paints at our open bar.",
        duration: "All day access",
        bottomNote: "A freestyle painting space to bring your imagination to life.",
        variants: [
          { name: "30x25 cm", price: "AED 85", vatIncluded: true },
          { name: "40x50 cm", price: "AED 155", vatIncluded: true },
          { name: "60x60 cm", price: "AED 200", vatIncluded: true },
          { name: "60x90 cm", price: "AED 325", vatIncluded: true },
          { name: "75x100 cm", price: "AED 460", vatIncluded: true }
        ]
      },
      {
        id: "6.4",
        title: "Regular Slime",
        image: "/images/activities/regular-slime.jpg",
        description: "Classic slime-making fun with unlimited squish!",
        price: "AED 65",
        duration: "30 mins",
        vatIncluded: true,
        bottomNote: "Stretch, swirl, and squish your own perfect slime mix."
      },
      {
        id: "6.5",
        title: "Bear Stuffing",
        image: "/images/activities/bear-stuffing.jpg",
        description: "Stuff your very own plushie bear.",
        price: "AED 160",
        duration: "30 mins",
        vatIncluded: true,
        bottomNote: "Create a furry friend that’s uniquely yours!"
      },
      {
        id: "6.6",
        title: "Russian Floral Sculpture",
        image: "/images/activities/other/activities_other_russian.webp",
        description: "Sculpt stunningly realistic florals from clay.",
        price: "AED 600",
        duration: "3 hours",
        vatIncluded: true,
        bottomNote: "Master intricate flower-making techniques in this elegant session."
      },
      {
        id: "6.7",
        title: "Texture Painting",
        image: "/images/activities/other/activities_other_texture.webp",
        description: "Add dimension and style to your art using texture mediums.",
        price: "AED 275",
        duration: "2 hours",
        vatIncluded: true,
        bottomNote: "Bold strokes and textured depth — a feast for your walls."
      },
      {
        id: "6.8",
        title: "3D Texture Painting",
        image: "/images/activities/other/activities_other_3D.webp",
        description: "Sculpt and paint elevated textures for a 3D effect.",
        price: "AED 325",
        duration: "2 hours",
        vatIncluded: true,
        bottomNote: "Sculptural artistry that truly pops!"
      },
      {
        id: "6.9",
        title: "Tote Bag Painting",
        image: "/images/activities/tote-bag.jpg",
        description: "Design your own custom canvas tote bag.",
        price: "AED 175",
        duration: "1.5 hours",
        vatIncluded: true,
        bottomNote: "Wear your art wherever you go."
      },
      {
        id: "6.10",
        title: "Pot Painting",
        image: "/images/activities/pot-painting.webp",
        description: "Paint cute and quirky patterns on your very own pot.",
        price: "AED 125",
        duration: "1.5 hours",
        vatIncluded: true,
        bottomNote: "The perfect addition to your window sill or balcony garden."
      },
      {
        id: "6.11",
        title: "Fabric Painting",
        image: "/images/activities/other/activities_other_fabric.webp",
        description: "Unleash your creativity on fabric with vibrant colors.",
        price: "AED 200",
        duration: "2 hours",
        vatIncluded: true,
        bottomNote: "Perfect for statement pieces or handmade gifts."
      }
    ]
  }


];

const allProductOptions = activities.flatMap(activity =>
  activity.subtypes.flatMap(sub =>
    sub.variants
      ? sub.variants.map(variant => `${sub.title} – ${variant.name}`)
      : [`${sub.title}`]
  )
);


const blockOneData = {
  image:
    "/images/activities/activities_hero.webp",
  title: "Activities",
  tagline: "Spontaneous creativity. Guided experiences. Always inspiring.",
  description:
    "Whether you’re booking ahead or walking in, Meraki offers a vibrant mix of hands-on art activities designed for every age and mood.",
};

const blockBetweenOneAndTwoData = {
  title: "Unwind",
  description:
    "Get messy, feel free, and make something uniquely yours — every activity is a chance to express, connect, and create joy.",
  image: "/images/activities/activities_block2.webp", // replace with your visual if needed
};

const bookActivitiesContent = {
  heading: "Ready for happy-time?",
  body: "Swipe through a mix of our favorite activities. Book your session or walk in — we’ll have your station ready.",
  highlights: ["All materials included", "Guided sessions", "Suitable for all ages"],
  ctaText: "Book Your Session Now",

  // NEWLY ADDED
  productOptions: activities.flatMap(activity =>
    activity.subtypes.flatMap(sub =>
      sub.variants
        ? sub.variants.map(variant => `${sub.title} – ${variant.name}`)
        : [`${sub.title}`]
    )
  ),

  // Visual styles
  backgroundColor: "bg-[#F9F3EB]",
  textColor: "text-[#447C9D]",
  highlightBgColor: "bg-white",
  highlightTextColor: "text-[#1A1A1A]",
  highlightBorderColor: "border border-[#1A1A1A]"
};








const blockTwoData = {
  image:
    "/images/activities/activities_block3.webp",
  title: "",
  description:
    "At Meraki, courses are artfully designed experiences that combine expert instruction, quality materials, and a welcoming space. Each multi-day course is tailored for artists and enthusiasts ready to deepen their craft, with private sessions that ensure personal attention and flexibility. Complete your journey with beautiful take-home pieces and a Certificate of Completion to celebrate your achievement.",
};
</script>
