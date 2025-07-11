<template>
  <div class="experiences--courses">
    <ExperiencesBlockOne v-bind="blockOneData" />
    <ExperiencesBlockTwo v-bind="blockTwoData" />
    <div class="pt-5 pb-8">
      <ImageTilesBlock
        v-for="(courseSection, index) in coursesData"
        :key="index"
        :title="courseSection.title"
        :tiles="courseSection.sections"
      />
    </div>
    <div class="pt-5 pb-8">
      <ImageTilesBlock
        v-for="(workshopsSection, index) in workshopsData"
        :key="index"
        :title="workshopsSection.title"
        :tiles="workshopsSection.sections"
      />
    </div>
    <ImageStackBlock :image-stack-data="imageStackData" />
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
  title: "Courses",
  description:
    "Our curated art courses are immersive journeys designed to help you grow your skills with intention and style. From mastering resin techniques to exploring the foundations of fine art, every course offers hands-on learning, premium materials, and personal guidance in our Dubai studio.",
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
