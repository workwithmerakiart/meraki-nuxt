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
    <ActivityModal :activity="selectedActivity" @close="selectedActivity = null" />

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

const activities = [
  {
    id: 1,
    name: "Neon Art Zone",
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
    shortDescription: "Glow, splash, pour — all things neon.",
    modal: true,
    subtypes: [
      {
        id: "1.1",
        title: "Neon Art Attack",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Glow-in-the-dark gooey fun for all ages.",
        price: "AED 85",
        vatIncluded: false,
        duration: "30 mins",
        bottomNote: "Get messy in the most vibrant way with our signature neon paint experience!"
      },
      {
        id: "1.3",
        title: "Neon Bear Pouring",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
    shortDescription: "Pour your creativity into glossy, high-end pieces.",
    modal: true,
    subtypes: [
      {
        id: "2.1",
        title: "MDF Coasters (Set of 2)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Perfect for beginners — create two glossy MDF coasters.",
        price: "AED 175",
        vatIncluded: true,
        bottomNote: "Get started with resin on a small canvas. Easy, fun, and stylish!"
      },
      {
        id: "2.2",
        title: "MDF Coasters (Set of 4)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "A set of four handmade resin coasters on MDF base.",
        price: "AED 250",
        vatIncluded: true,
        bottomNote: "Add more flair with this extended coaster-making session."
      },
      {
        id: "2.3",
        title: "Agate Coasters (Set of 2)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Elegant, crystal-like agate coasters made with resin.",
        price: "AED 300",
        vatIncluded: true,
        bottomNote: "Craft beautiful faux-agate pieces perfect for gifting."
      },
      {
        id: "2.4",
        title: "Acrylic Tray (13x26 cm)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Customize a sleek rectangular acrylic tray with resin art.",
        price: "AED 200",
        vatIncluded: true,
        bottomNote: "Functional and fabulous — your art becomes a lifestyle piece!"
      },
      {
        id: "2.5",
        title: "Acrylic Tray (20x20 cm)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Square-shaped tray ideal for modern resin designs.",
        price: "AED 275",
        vatIncluded: true,
        bottomNote: "Perfect for gifting or keeping your trinkets stylishly sorted."
      },
      {
        id: "2.6",
        title: "Acrylic Tray (20x30 cm)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Larger tray option for elaborate resin effects.",
        price: "AED 350",
        vatIncluded: true,
        bottomNote: "Unleash more creativity with a larger working surface."
      },
      {
        id: "2.7",
        title: "Clock (30 cm dia)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Create a round resin wall clock — artistic and functional.",
        price: "AED 275",
        vatIncluded: true,
        bottomNote: "Design a piece of time you’ll love watching!"
      },
      {
        id: "2.8",
        title: "Clock with Rings (40 cm dia)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Stylish wall clock with intricate resin ring detailing.",
        price: "AED 500",
        vatIncluded: true,
        bottomNote: "Go big and bold with layered resin textures."
      },
      {
        id: "2.9",
        title: "Cheeseboard",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Decorate a wood and resin cheeseboard for serving in style.",
        price: "AED 350",
        vatIncluded: true,
        bottomNote: "Serve up style with your own handmade resin cheeseboard."
      },
      {
        id: "2.10",
        title: "Beach Painting",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Create dreamy ocean waves using beach-inspired resin art.",
        price: "AED 425",
        vatIncluded: true,
        bottomNote: "Bring the calm of the coast to your canvas."
      },
      {
        id: "2.11",
        title: "Book Cover",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Customize a hardback book cover with resin textures.",
        price: "AED 200",
        vatIncluded: true,
        bottomNote: "Turn reading into a resin masterpiece."
      },
      {
        id: "2.12",
        title: "Bookmark",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Make a glossy, colorful bookmark to mark your reads.",
        price: "AED 25",
        vatIncluded: true,
        bottomNote: "Short, sweet, and stunning — a quick win for all ages."
      },
      {
        id: "2.13",
        title: "Keychains",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
    shortDescription: "Where minimalist style meets bold texture.",
    modal: true,
    subtypes: [
      {
        id: "3.1",
        title: "Tray",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Craft your own minimalistic tray with unique textures.",
        price: "AED 150",
        vatIncluded: true,
        bottomNote: "Perfect for keys, candles, or just aesthetic organization."
      },
      {
        id: "3.2",
        title: "Coasters (Set of 2)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Pour and pigment your own pair of stylish coasters.",
        price: "AED 125",
        vatIncluded: true,
        bottomNote: "A simple yet impactful addition to any space."
      },
      {
        id: "3.3",
        title: "Pot",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Make your own chic jesmonite pot for plants or storage.",
        price: "AED 150",
        vatIncluded: true,
        bottomNote: "Smooth finish, modern shape, and 100% handmade by you."
      },
      {
        id: "3.4",
        title: "Tray + Coasters Set",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Create a matching set — ideal for home styling.",
        price: "AED 250",
        vatIncluded: true,
        bottomNote: "Looks even better when you say you made it yourself."
      },
      {
        id: "3.5",
        title: "Moroccan Tray",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
    shortDescription: "Kawaii overload! Customize accessories with whipped clay and cute charms.",
    modal: true,
    subtypes: [
      {
        id: "4.1",
        title: "Phone Case",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Design your dream kawaii phone case.",
        price: "AED 85",
        vatIncluded: true,
        bottomNote: "Turn your phone into a cute masterpiece!"
      },
      {
        id: "4.2",
        title: "Mirror",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Decorate your mirror with charms and whipped clay.",
        price: "AED 150",
        vatIncluded: true,
        bottomNote: "Every glance will sparkle with your custom flair!"
      },
      {
        id: "4.3",
        title: "Hand Mirror",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Add a pop of kawaii to your hand mirror.",
        price: "AED 85",
        vatIncluded: true,
        bottomNote: "Perfect for glam on the go."
      },
      {
        id: "4.4",
        title: "Mini Hair Brush",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Small but packed with personality!",
        price: "AED 35",
        vatIncluded: true,
        bottomNote: "Let your style shine through even in the tiniest details."
      },
      {
        id: "4.5",
        title: "Hair Brush",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Make every stroke magical.",
        price: "AED 65",
        vatIncluded: true,
        bottomNote: "Style meets cuteness overload!"
      },
      {
        id: "4.6",
        title: "Jewelry Box",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
    shortDescription: "Make it cute. Make it scented. Make it you!",
    modal: true,
    subtypes: [
      {
        id: "5.1",
        title: "Candle Making",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Craft your own aromatic candle.",
        price: "AED 250",
        vatIncluded: true,
        bottomNote: "From wick to wax — pour your personality into a candle!"
      },
      {
        id: "5.2",
        title: "Soap Making",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Customize and create beautiful handmade soaps.",
        price: "AED 175",
        vatIncluded: true,
        bottomNote: "Clean, fun, and totally custom — your soap, your vibe!"
      },
      {
        id: "5.3",
        title: "Bath Bomb",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
    shortDescription: "Eclectic DIY fun – pour, paint, sculpt and stuff!",
    modal: true,
    subtypes: [
      {
        id: "6.1",
        title: "Bear Pouring (Classic)",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Classic slime-making fun with unlimited squish!",
        price: "AED 65",
        duration: "30 mins",
        vatIncluded: true,
        bottomNote: "Stretch, swirl, and squish your own perfect slime mix."
      },
      {
        id: "6.5",
        title: "Bear Stuffing",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Stuff your very own plushie bear.",
        price: "AED 160",
        duration: "30 mins",
        vatIncluded: true,
        bottomNote: "Create a furry friend that’s uniquely yours!"
      },
      {
        id: "6.6",
        title: "Russian Floral Sculpture",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Sculpt stunningly realistic florals from clay.",
        price: "AED 600",
        duration: "3 hours",
        vatIncluded: true,
        bottomNote: "Master intricate flower-making techniques in this elegant session."
      },
      {
        id: "6.7",
        title: "Texture Painting",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Add dimension and style to your art using texture mediums.",
        price: "AED 275",
        duration: "2 hours",
        vatIncluded: true,
        bottomNote: "Bold strokes and textured depth — a feast for your walls."
      },
      {
        id: "6.8",
        title: "3D Texture Painting",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Sculpt and paint elevated textures for a 3D effect.",
        price: "AED 325",
        duration: "2 hours",
        vatIncluded: true,
        bottomNote: "Sculptural artistry that truly pops!"
      },
      {
        id: "6.9",
        title: "Tote Bag Painting",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Design your own custom canvas tote bag.",
        price: "AED 175",
        duration: "1.5 hours",
        vatIncluded: true,
        bottomNote: "Wear your art wherever you go."
      },
      {
        id: "6.10",
        title: "Pot Painting",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
        description: "Paint cute and quirky patterns on your very own pot.",
        price: "AED 125",
        duration: "1.5 hours",
        vatIncluded: true,
        bottomNote: "The perfect addition to your window sill or balcony garden."
      },
      {
        id: "6.11",
        title: "Fabric Painting",
        image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop",
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
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Activities",
  tagline: "Spontaneous creativity. Guided experiences. Always inspiring.",
  description:
    "Whether you’re booking ahead or walking in, Meraki offers a vibrant mix of hands-on art activities designed for every age and mood.",
};

const blockBetweenOneAndTwoData = {
  title: "Unwind",
  description:
    "Get messy, feel free, and make something uniquely yours — every activity is a chance to express, connect, and create joy.",
  image: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", // replace with your visual if needed
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
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "",
  description:
    "At Meraki, courses are artfully designed experiences that combine expert instruction, quality materials, and a welcoming space. Each multi-day course is tailored for artists and enthusiasts ready to deepen their craft, with private sessions that ensure personal attention and flexibility. Complete your journey with beautiful take-home pieces and a Certificate of Completion to celebrate your achievement.",
};

const coursesData = [
  {
    title: "Resin Mastery Series",
    sections: [
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Resin Basics Course",
      },
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Resin Advanced Course",
      },
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Resin River Table Course",
      },
    ],
  },
  {
    title: "Sculpture Special",
    sections: [
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Russian Floral Sculpture Course",
      },
    ],
  },
  {
    title: "Fine Art Foundations",
    sections: [
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Basics of Drawing",
      },
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Acrylic Painting",
      },
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Watercolor Painting",
      },
      {
        badge: "Courses",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Oil Painting",
      },
    ],
  },
];

const workshopsData = [
  {
    title: "Workshop Section One",
    sections: [
      {
        badge: "WORKSHOPS",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Family Workshops",
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sat 10 May – Sun 26 October 2025",
          },
          {
            icon: ClockIcon,
            text: "11.15 am – 12.45 pm",
          },
          {
            icon: MapPinIcon,
            text: "Menorca",
          },
        ],
        modal: true,
        modalContent: {
          title: "Family Workshops",
          dates: "Sat 10 May - Sun 26 October 2025",
          time: "11:15 am - 12:45 pm",
          location: "Menorca",
          registerText: "Register",
          imageSrc:
            "https://media.hauserwirth.com/asset/e2f6292e-a9d2-4e10-ab07-b8231c6447d5/web-hires-jpg-72dpi/24-07-13_H-W-4.jpg",
          imageCaption:
            "Family Workshops at Hauser & Wirth Menorca. Photo: Mateu Carles",
          content:
            "<p>A range of workshops to engage the whole family, with activities relating to Mika Rottenberg’s exhibition 'Vibrant Matter'. Lasting a maximum of an hour and a half, families will discover the art on Illa del Rei.</p><p>All children should be accompanied by an adult. Ages 5 and up.</p><p><strong>10 May - 19 June</strong><br>Saturdays at 11:15 am</p><p><strong>23 June - 6 September</strong><br>Fridays and Saturdays at 11:15 am</p><p><strong>7 September - 26 October</strong><br>Saturdays at 11:15 am</p><p>We suggest booking in advance here.</p>",
        },
      },
      {
        badge: "TOURS",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Exhibition Guided Tour",
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sat 10 May – Sun 26 October 2025",
          },
          {
            icon: ClockIcon,
            text: "12.15 – 1.15 pm",
          },
          {
            icon: MapPinIcon,
            text: "Menorca",
          },
        ],
        modal: true,
        modalContent: {
          title: "Family Workshops",
          dates: "Sat 10 May - Sun 26 October 2025",
          time: "11:15 am - 12:45 pm",
          location: "Menorca",
          registerText: "Register",
          imageSrc:
            "https://media.hauserwirth.com/asset/e2f6292e-a9d2-4e10-ab07-b8231c6447d5/web-hires-jpg-72dpi/24-07-13_H-W-4.jpg",
          imageCaption:
            "Family Workshops at Hauser & Wirth Menorca. Photo: Mateu Carles",
          content:
            "<p>A range of workshops to engage the whole family, with activities relating to Mika Rottenberg’s exhibition 'Vibrant Matter'. Lasting a maximum of an hour and a half, families will discover the art on Illa del Rei.</p><p>All children should be accompanied by an adult. Ages 5 and up.</p><p><strong>10 May - 19 June</strong><br>Saturdays at 11:15 am</p><p><strong>23 June - 6 September</strong><br>Fridays and Saturdays at 11:15 am</p><p><strong>7 September - 26 October</strong><br>Saturdays at 11:15 am</p><p>We suggest booking in advance here.</p>",
        },
      },
      {
        badge: "MUSIC",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Sunday Concerts",
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sun 18 May – Sun 26 October 2025",
          },
          {
            icon: ClockIcon,
            text: "12.30 – 1.30 pm",
          },
          {
            icon: MapPinIcon,
            text: "Menorca",
          },
        ],
        modal: true,
        modalContent: {
          title: "Family Workshops",
          dates: "Sat 10 May - Sun 26 October 2025",
          time: "11:15 am - 12:45 pm",
          location: "Menorca",
          registerText: "Register",
          imageSrc:
            "https://media.hauserwirth.com/asset/e2f6292e-a9d2-4e10-ab07-b8231c6447d5/web-hires-jpg-72dpi/24-07-13_H-W-4.jpg",
          imageCaption:
            "Family Workshops at Hauser & Wirth Menorca. Photo: Mateu Carles",
          content:
            "<p>A range of workshops to engage the whole family, with activities relating to Mika Rottenberg’s exhibition 'Vibrant Matter'. Lasting a maximum of an hour and a half, families will discover the art on Illa del Rei.</p><p>All children should be accompanied by an adult. Ages 5 and up.</p><p><strong>10 May - 19 June</strong><br>Saturdays at 11:15 am</p><p><strong>23 June - 6 September</strong><br>Fridays and Saturdays at 11:15 am</p><p><strong>7 September - 26 October</strong><br>Saturdays at 11:15 am</p><p>We suggest booking in advance here.</p>",
        },
      },
    ],
  },
  {
    title: "Workshop Section Two",
    sections: [
      {
        badge: "WORKSHOPS",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Family Workshops",
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sat 10 May – Sun 26 October 2025",
          },
          {
            icon: ClockIcon,
            text: "11.15 am – 12.45 pm",
          },
          {
            icon: MapPinIcon,
            text: "Menorca",
          },
        ],
      },
      {
        badge: "TOURS",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Exhibition Guided Tour",
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sat 10 May – Sun 26 October 2025",
          },
          {
            icon: ClockIcon,
            text: "12.15 – 1.15 pm",
          },
          {
            icon: MapPinIcon,
            text: "Menorca",
          },
        ],
      },
      {
        badge: "MUSIC",
        image:
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: "Sunday Concerts",
        sections: [
          {
            icon: CalendarDaysIcon,
            text: "Sun 18 May – Sun 26 October 2025",
          },
          {
            icon: ClockIcon,
            text: "12.30 – 1.30 pm",
          },
          {
            icon: MapPinIcon,
            text: "Menorca",
          },
        ],
      },
    ],
  },
];

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
