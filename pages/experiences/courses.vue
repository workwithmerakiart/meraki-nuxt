<template>
  <div class="experiences--courses">
    <ExperiencesBlockOne
      image="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      title="Interiors"
      description="We believe that every space has a story to tell. Our interior design approach is inspired by context and enchanted with fine craftsmanship. The beauty of tones and textures meets the magic of tales to craft tactile spaces that offer a sensory experience."
    />
    <ExperiencesBlockTwo
      image="https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      title=""
      description="We believe that every space has a story to tell. Our interior design approach is inspired by context and enchanted with fine craftsmanship. The beauty of tones and textures meets the magic of tales to craft tactile spaces that offer a sensory experience."
    />
    <EventTilesBlock
      v-for="(event, index) in eventsData"
      :key="index"
      :title="event.title"
      :events="event.sections"
    />
  </div>
</template>

<script setup>
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
import EventTilesBlock from "~/components/EventTilesBlock.vue";

const eventsData = [
  {
    title: "🟣 Resin Mastery Series",
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
    title: "🌸 Sculpture Special",
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
    title: "🎨 Fine Art Foundations",
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
];
</script>
