<template>
  <div class="experiences--events">
    <ExperiencesBlockOne v-bind="blockOneData" />
    <ExperiencesBlockTwo v-bind="blockTwoData" />
    <EventBlock
      v-for="(eventBlock, index) in eventBlockData"
      :key="index"
      v-bind="eventBlock"
    />
  </div>
</template>

<script setup>
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";

const blockOneData = {
  image:
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Events",
  description:
    "At Meraki, every event is thoughtfully curated to feel personal, joyful, and beautifully designed for the crème de la crème of Dubai.",
};

const blockTwoData = {
  image:
    "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title: "Why Choose Art-Filled Events?",
  description:
    "Art brings people together—and at Meraki, every event becomes a memorable experience. From birthdays to corporate activations, we offer curated, creative celebrations filled with color, connection, and joy right here in Dubai.",
};

const eventBlockData = [
  {
    title: "SOULFUSION PAINT YOGA 1",
    dateShort: "20 Sun, Nov 2022",
    subtitle: "The Art of SoulFusion Yoga.",
    date: "Sunday, 20 November 2022",
    time: "13:00-14:15",
    description:
      "Come flow with @soulfusionwithamira through a grounding sequence, brought alive by a soul-mending playlist... while painting your own chakra-centred canvas you can take home!",
    imageUrl:
      "https://wildpainthouse.com/public/uploads/events/Soulfusion%20Paint%20Yoga_1672311937.JPG",
    background: "#f96c6c",
  },
  {
    title: "SOULFUSION PAINT YOGA 2",
    dateShort: "20 Sun, Nov 2022",
    subtitle: "The Art of SoulFusion Yoga.",
    date: "Sunday, 20 November 2022",
    time: "13:00-14:15",
    description:
      "Come flow with @soulfusionwithamira through a grounding sequence, brought alive by a soul-mending playlist... while painting your own chakra-centred canvas you can take home!",
    imageUrl:
      "https://wildpainthouse.com/public/uploads/events/Soulfusion%20Paint%20Yoga_1672311937.JPG",
    background: "#b66cf9",
  },
  {
    title: "SOULFUSION PAINT YOGA 3",
    dateShort: "20 Sun, Nov 2022",
    subtitle: "The Art of SoulFusion Yoga.",
    date: "Sunday, 20 November 2022",
    time: "13:00-14:15",
    description:
      "Come flow with @soulfusionwithamira through a grounding sequence, brought alive by a soul-mending playlist... while painting your own chakra-centred canvas you can take home!",
    imageUrl:
      "https://wildpainthouse.com/public/uploads/events/Soulfusion%20Paint%20Yoga_1672311937.JPG",
  },
  {
    title: "SOULFUSION PAINT YOGA 4",
    dateShort: "20 Sun, Nov 2022",
    subtitle: "The Art of SoulFusion Yoga.",
    date: "Sunday, 20 November 2022",
    time: "13:00-14:15",
    description:
      "Come flow with @soulfusionwithamira through a grounding sequence, brought alive by a soul-mending playlist... while painting your own chakra-centred canvas you can take home!",
    imageUrl:
      "https://wildpainthouse.com/public/uploads/events/Soulfusion%20Paint%20Yoga_1672311937.JPG",
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
