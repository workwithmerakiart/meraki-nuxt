<template>
  <div class="experiences--courses">
    <ExperiencesBlockOne v-bind="blockOneData" />
    <ExperiencesBlockTwo v-bind="blockTwoData" />
    <div class="pt-5 pb-8">
      <ImageTilesBlock v-for="(courseSection, index) in coursesData" :key="index" :title="courseSection.title"
        :tiles="courseSection.sections" categoryLabel="COURSES" @add-to-cart="addCourseToCart" />
    </div>
  </div>
</template>

<script setup>
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
import { useCartStore } from '~/stores/cart'

const blockOneData = {
  image:
    "/images/courses/courses_hero.webp",
  title: "Courses",
  description:
    "Our curated art courses are immersive journeys designed to help you grow your skills with intention and style. From mastering resin techniques to exploring the foundations of fine art, every course offers hands-on learning, premium materials, and personal guidance in our Dubai studio.",
};

const blockTwoData = {
  image:
    "/images/courses/courses_block2.webp",
  title: "",
  description:
    "At Meraki, courses are artfully designed experiences that combine expert instruction, quality materials, and a welcoming space. Each multi-day course is tailored for artists and enthusiasts ready to deepen their craft, with private sessions that ensure personal attention and flexibility. Complete your journey with beautiful take-home pieces and a Certificate of Completion to celebrate your achievement.",
};

const coursesData = [
  {
    title: "Resin Mastery Series",
    sections: [
      {
        // Display/meta
        badge: "Beginner",
        image: "/images/courses/courses_resin_basic.webp",
        title: "Resin Basics Course",
        description: "Resin Basics Course",
        skillLevel: "Beginner",

        // Commerce & tax (flows to checkout/payment)
        price: "AED 1500",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-RESIN-BASIC",
          name: "Resin Basics Course",
          currency: "AED",
          unitAmount: 1500,      // numeric amount in AED
          vatIncluded: false,    // VAT not included in unitAmount
          vatRate: 5,
        },

        // Booking semantics
        sessions: 2,                 // Day 1 + Day 2
        totalDurationMin: 360,       // 6 hours total
        durationMin: 240,            // default booking window (Day 1)
        sessionsMeta: [
          { day: 1, label: "Day 1", durationMin: 240 }, // 4 hrs
          { day: 2, label: "Day 2", durationMin: 120 }, // 2 hrs
        ],
        minTickets: 1,
        maxTickets: 10,
        location: "Meraki Art Studio",

        // Info chips under the card
        sections: [
          { icon: CalendarDaysIcon, text: "2 days (flexible scheduling)" },
          { icon: ClockIcon, text: "Total 6 hrs (Day 1: 4h | Day 2: 2h)" },
          { icon: MapPinIcon, text: "Meraki Art Studio" },
        ],

        // Structured content for detail views
        learningOutcomes: [
          "Resin basics, safety, and sourcing materials",
          "Mixing with pigments and techniques",
          "Pouring, sealing, and coating",
          "Curing and layover",
        ],
        takeHome: [
          "4 MDF Resin Coasters",
          "1 Large 3D Geode Painting",
          "1 Acrylic Tray",
        ],

        // Modal wiring (ImageTilesBlock opens modal when `modal: true`)
        modal: true,
        modalContent: {
          title: "Basic Resin Course – AED 1500",
          dates: "By appointment / Flexible",
          time: "2 Days (Day 1: 4 hrs | Day 2: 2 hrs)",
          location: "Meraki Art Studio",
          price: "AED 1500",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/courses/courses_resin_basic.webp",
          imageCaption: "Resin Basics Course at Meraki Art Studio",
          content: `
            <p><strong>Duration:</strong> 2 Days (Day 1: 4 hrs | Day 2: 2 hrs)<br/>
            <strong>Skill Level:</strong> Beginner</p>
            <p>Start your resin journey with the essentials — mixing, pouring, coloring, and finishing.</p>
            <p><strong>You’ll Learn:</strong></p>
            <ul>
              <li>Resin basics, safety, and sourcing materials</li>
              <li>Mixing with pigments and techniques</li>
              <li>Pouring, sealing, and coating</li>
              <li>Curing and layover</li>
            </ul>
            <p><strong>You’ll Take Home:</strong></p>
            <ul>
              <li>4 MDF Resin Coasters</li>
              <li>1 Large 3D Geode Painting</li>
              <li>1 Acrylic Tray</li>
            </ul>
          `,

          // Minimal payload you can pass to /checkout later
          checkoutPayload: {
            sku: "COURSE-RESIN-BASIC",
            title: "Resin Basics Course",
            currency: "AED",
            unitAmount: 1500,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            sessions: 2,
            totalDurationMin: 360,
            sessionDurationsMin: [240, 120],
            minTickets: 1,
            maxTickets: 10,
            takeHome: [
              "4 MDF Resin Coasters",
              "1 Large 3D Geode Painting",
              "1 Acrylic Tray",
            ],
          },
        },
      },
      {
        // Display/meta
        badge: "Intermediate",
        image: "/images/courses/courses_resin_advance.webp",
        title: "Advanced Resin Course",
        description: "Advanced Resin Course",
        skillLevel: "Intermediate",

        // Commerce & tax
        price: "AED 1800",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-RESIN-ADVANCED",
          name: "Advanced Resin Course",
          currency: "AED",
          unitAmount: 1800,
          vatIncluded: false,
          vatRate: 5,
        },

        // Booking semantics
        sessions: 2,
        totalDurationMin: 360,       // 6 hours total
        durationMin: 240,            // Day 1: 4h default
        sessionsMeta: [
          { day: 1, label: "Day 1", durationMin: 240 },
          { day: 2, label: "Day 2", durationMin: 120 },
        ],
        minTickets: 1,
        maxTickets: 10,
        location: "Meraki Art Studio",

        // Info chips
        sections: [
          { icon: CalendarDaysIcon, text: "2 days (flexible scheduling)" },
          { icon: ClockIcon, text: "Total 6 hrs (Day 1: 4h | Day 2: 2h)" },
          { icon: MapPinIcon, text: "Meraki Art Studio" },
        ],

        // Learning & deliverables
        learningOutcomes: [
          "Creating realistic beach waves",
          "Heat & hot air gun usage",
          "Working with advanced molds",
          "Sanding, trimming, and demolding",
        ],
        takeHome: [
          "1 Beach Resin Painting",
          "2 Agate Coasters",
          "2 Floral Coasters",
          "1 Dried Flower Tray",
        ],

        // Modal wiring
        modal: true,
        modalContent: {
          title: "Advanced Resin Course – AED 1800",
          dates: "By appointment / Flexible",
          time: "2 Days (Day 1: 4 hrs | Day 2: 2 hrs)",
          location: "Meraki Art Studio",
          price: "AED 1800",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/courses/courses_resin_advance.webp",
          imageCaption: "Advanced Resin Course at Meraki Art Studio",
          content: `
            <p><strong>Duration:</strong> 2 Days (Day 1: 4 hrs | Day 2: 2 hrs)<br/>
            <strong>Skill Level:</strong> Intermediate</p>
            <p>Take your resin art to the next level with beach waves, floral molds, and perfect finishing.</p>
            <p><strong>You’ll Learn:</strong></p>
            <ul>
              <li>Creating realistic beach waves</li>
              <li>Heat & hot air gun usage</li>
              <li>Working with advanced molds</li>
              <li>Sanding, trimming, and demolding</li>
            </ul>
            <p><strong>You’ll Take Home:</strong></p>
            <ul>
              <li>1 Beach Resin Painting</li>
              <li>2 Agate Coasters</li>
              <li>2 Floral Coasters</li>
              <li>1 Dried Flower Tray</li>
            </ul>
          `,
          checkoutPayload: {
            sku: "COURSE-RESIN-ADVANCED",
            title: "Advanced Resin Course",
            currency: "AED",
            unitAmount: 1800,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            sessions: 2,
            totalDurationMin: 360,
            sessionDurationsMin: [240, 120],
            minTickets: 1,
            maxTickets: 10,
            takeHome: [
              "1 Beach Resin Painting",
              "2 Agate Coasters",
              "2 Floral Coasters",
              "1 Dried Flower Tray",
            ],
          },
        },
      },
      {
        // Display/meta
        badge: "Beginner",
        image: "/images/courses/courses_resin_advance.webp",
        title: "Epoxy River Table Workshop",
        description: "Epoxy River Table Workshop",
        skillLevel: "Beginner",

        // Commerce & tax (with variants)
        price: "From AED 2400",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-RIVER-35x45", // default variant
          name: "Epoxy River Table Workshop (35 × 45 cm)",
          currency: "AED",
          unitAmount: 2400,
          vatIncluded: false,
          vatRate: 5,
        },
        variants: [
          { key: "35x45", label: "35 × 45 cm (legs included)", sku: "COURSE-RIVER-35x45", unitAmount: 2400 },
          { key: "45dia", label: "45 cm Diameter (legs included)", sku: "COURSE-RIVER-45D", unitAmount: 2600 },
          { key: "60x90", label: "60 × 90 cm (legs included)", sku: "COURSE-RIVER-60x90", unitAmount: 6500 },
        ],
        defaultVariantKey: "35x45",

        // Booking semantics
        sessions: 2,
        totalDurationMin: 360, // 3h + 3h
        durationMin: 180,
        sessionsMeta: [
          { day: 1, label: "Day 1", durationMin: 180 },
          { day: 2, label: "Day 2", durationMin: 180 },
        ],
        minTickets: 1,
        maxTickets: 6,
        location: "Meraki Art Studio",

        // Info chips
        sections: [
          { icon: CalendarDaysIcon, text: "2 days (3 hrs each)" },
          { icon: ClockIcon, text: "Total 6 hrs" },
          { icon: MapPinIcon, text: "Meraki Art Studio" },
        ],

        // Learning outcomes
        learningOutcomes: [
          "Mold creation, table layout, resin estimation",
          "Pouring, demolding, trimming, sanding, and polishing",
        ],

        // Modal wiring
        modal: true,
        modalContent: {
          title: "Epoxy River Table Workshop – from AED 2400",
          dates: "By appointment / Flexible",
          time: "2 Days (3 hrs each)",
          location: "Meraki Art Studio",
          price: "From AED 2400",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/courses/courses_resin_advance.webp",
          imageCaption: "Epoxy River Table Workshop at Meraki Art Studio",
          content: `
            <p><strong>Duration:</strong> 2 Days (3 hrs each)<br/>
            <strong>Skill Level:</strong> Beginner</p>
            <p>Design and build your own statement resin table — from mold to polish.</p>
            <p><strong>Size Options (legs included):</strong></p>
            <ul>
              <li>35 × 45 cm – AED 2400</li>
              <li>45 cm Diameter – AED 2600</li>
              <li>60 × 90 cm – AED 6500</li>
            </ul>
            <p>Custom sizes available on request.</p>
            <p><strong>You’ll Learn:</strong></p>
            <ul>
              <li>Mold creation, table layout, resin estimation</li>
              <li>Pouring, demolding, trimming, sanding, and polishing</li>
            </ul>
          `,
          checkoutPayload: {
            sku: "COURSE-RIVER-35x45",
            title: "Epoxy River Table Workshop (35 × 45 cm)",
            currency: "AED",
            unitAmount: 2400,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            variantKey: "35x45",
            variants: [
              { key: "35x45", label: "35 × 45 cm (legs included)", sku: "COURSE-RIVER-35x45", unitAmount: 2400 },
              { key: "45dia", label: "45 cm Diameter (legs included)", sku: "COURSE-RIVER-45D", unitAmount: 2600 },
              { key: "60x90", label: "60 × 90 cm (legs included)", sku: "COURSE-RIVER-60x90", unitAmount: 6500 },
            ],
            sessions: 2,
            totalDurationMin: 360,
            sessionDurationsMin: [180, 180],
            minTickets: 1,
            maxTickets: 6,
          },
        },
      },
    ],
  },
  {
    title: "Sculpture Special",
    sections: [
      {
        // Display/meta
        badge: "Courses",
        image: "/images/courses/courses_sculpture.webp",
        title: "Floral Sculpture Masterclass",
        description: "Floral Sculpture Masterclass",
        skillLevel: "All Levels",

        // Commerce & tax
        price: "AED 2250",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-SCULPTURE-FLORAL",
          name: "Floral Sculpture Masterclass (Full Course)",
          currency: "AED",
          unitAmount: 2250,
          vatIncluded: false,
          vatRate: 5,
        },

        // Booking semantics
        sessions: 1,
        totalDurationMin: 240, // 11 AM – 3 PM
        durationMin: 240,
        sessionsMeta: [{ day: 1, label: "Daily", durationMin: 240 }],
        minTickets: 1,
        maxTickets: 10,
        location: "Meraki Art Studio",

        // Info chips
        sections: [
          { icon: CalendarDaysIcon, text: "Daily | 11 AM – 3 PM" },
          { icon: ClockIcon, text: "All Levels" },
          { icon: MapPinIcon, text: "Meraki Art Studio" },
        ],

        // Learning & syllabus
        learningOutcomes: [
          "Sculpt realistic flowers, buds, and leaves",
          "Guidance from certified instructors (Evgenia Sculpture Painting School)",
        ],
        flowers: [
          "Poppy (Required before Rose)",
          "Iris (Required before Peony)",
          "Rose",
          "Peony",
        ],
        includes: [
          "All materials",
          "Step‑by‑step diagram notes",
          "Refreshments",
        ],

        // Modal wiring
        modal: true,
        modalContent: {
          title: "Floral Sculpture Masterclass – AED 2250",
          dates: "Daily | 11 AM – 3 PM",
          time: "Single day (4 hours)",
          location: "Meraki Art Studio",
          price: "AED 2250",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/courses/courses_sculpture.webp",
          imageCaption: "Floral Sculpture Masterclass at Meraki Art Studio",
          content: `
            <p><strong>Timing:</strong> Daily | 11 AM – 3 PM<br/>
            <strong>Skill Level:</strong> All Levels</p>
            <p>Taught by certified instructors from <em>Evgenia Sculpture Painting School</em>, this masterclass teaches you to sculpt realistic flowers, buds, and leaves.</p>
            <p><strong>Flowers You Can Learn:</strong></p>
            <ul>
              <li>Poppy (Required before Rose)</li>
              <li>Iris (Required before Peony)</li>
              <li>Rose</li>
              <li>Peony</li>
            </ul>
            <p><strong>Includes:</strong> All materials, step‑by‑step diagram notes, and refreshments.</p>
          `,
          checkoutPayload: {
            sku: "COURSE-SCULPTURE-FLORAL",
            title: "Floral Sculpture Masterclass (Full Course)",
            currency: "AED",
            unitAmount: 2250,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            sessions: 1,
            totalDurationMin: 240,
            sessionDurationsMin: [240],
            minTickets: 1,
            maxTickets: 10,
          },
        },
      },
    ],
  },
  {
    title: "Fine Art Foundations",
    sections: [
      // 1) Basics of Drawing
      {
        badge: "Courses",
        image: "/images/activities/fine-art.webp",
        title: "Basics of Drawing",
        description: "Basics of Drawing",
        skillLevel: "All Levels",
        price: "AED 1260 – 1825",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-FAF-DRAW-8",
          name: "Basics of Drawing (8 Sessions)",
          currency: "AED",
          unitAmount: 1260,
          vatIncluded: false,
          vatRate: 5,
        },
        variants: [
          { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-DRAW-8", unitAmount: 1260 },
          { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-DRAW-12", unitAmount: 1825 },
        ],
        defaultVariantKey: "8",
        sessionsRange: [8, 12],
        perSessionDurationMin: 120,
        minTickets: 1,
        maxTickets: 10,
        location: "Meraki Art Studio",
        sections: [
          { icon: CalendarDaysIcon, text: "8 or 12 sessions" },
          { icon: ClockIcon, text: "2 hours per session | All materials included" },
          { icon: MapPinIcon, text: "Flexible scheduling available" },
        ],
        overview: "Build a strong foundation with sketching, shading, perspective, and composition.",
        modal: true,
        modalContent: {
          title: "Basics of Drawing — AED 1260 – 1825",
          dates: "Flexible scheduling available",
          time: "2 Hours per session | All Materials Included",
          location: "Meraki Art Studio",
          price: "AED 1260 – 1825",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/activities/fine-art.webp",
          imageCaption: "Basics of Drawing at Meraki Art Studio",
          variants: [
            { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-DRAW-8", unitAmount: 1260 },
            { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-DRAW-12", unitAmount: 1825 },
          ],
          defaultVariantKey: "8",
          content: `
            <p>Build a strong foundation with sketching, shading, perspective, and composition.</p>
            <p><strong>Each Course Includes:</strong><br/>
            8 Sessions — AED 1260<br/>
            12 Sessions — AED 1825<br/>
            2 Hours per session | All Materials Included<br/>
            Flexible scheduling available</p>
          `,
          checkoutPayload: {
            sku: "COURSE-FAF-DRAW-8",
            title: "Basics of Drawing (8 Sessions)",
            currency: "AED",
            unitAmount: 1260,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            variantKey: "8",
            variants: [
              { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-DRAW-8", unitAmount: 1260 },
              { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-DRAW-12", unitAmount: 1825 },
            ],
            sessions: 8,
            perSessionDurationMin: 120,
            minTickets: 1,
            maxTickets: 10,
          },
        },
      },
      // 2) Acrylic Painting
      {
        badge: "Courses",
        image: "/images/activities/fine-art.webp",
        title: "Acrylic Painting",
        description: "Acrylic Painting",
        skillLevel: "All Levels",
        price: "AED 1260 – 1825",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-FAF-ACRYLIC-8",
          name: "Acrylic Painting (8 Sessions)",
          currency: "AED",
          unitAmount: 1260,
          vatIncluded: false,
          vatRate: 5,
        },
        variants: [
          { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-ACRYLIC-8", unitAmount: 1260 },
          { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-ACRYLIC-12", unitAmount: 1825 },
        ],
        defaultVariantKey: "8",
        sessionsRange: [8, 12],
        perSessionDurationMin: 120,
        minTickets: 1,
        maxTickets: 10,
        location: "Meraki Art Studio",
        sections: [
          { icon: CalendarDaysIcon, text: "8 or 12 sessions" },
          { icon: ClockIcon, text: "2 hours per session | All materials included" },
          { icon: MapPinIcon, text: "Flexible scheduling available" },
        ],
        overview: "Explore color theory, brush techniques, and canvas layering using bold, vibrant acrylics.",
        modal: true,
        modalContent: {
          title: "Acrylic Painting — AED 1260 – 1825",
          dates: "Flexible scheduling available",
          time: "2 Hours per session | All Materials Included",
          location: "Meraki Art Studio",
          price: "AED 1260 – 1825",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/activities/fine-art.webp",
          imageCaption: "Acrylic Painting at Meraki Art Studio",
          variants: [
            { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-ACRYLIC-8", unitAmount: 1260 },
            { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-ACRYLIC-12", unitAmount: 1825 },
          ],
          defaultVariantKey: "8",
          content: `
            <p>Explore color theory, brush techniques, and canvas layering using bold, vibrant acrylics.</p>
            <p><strong>Each Course Includes:</strong><br/>
            8 Sessions — AED 1260<br/>
            12 Sessions — AED 1825<br/>
            2 Hours per session | All Materials Included<br/>
            Flexible scheduling available</p>
          `,
          checkoutPayload: {
            sku: "COURSE-FAF-ACRYLIC-8",
            title: "Acrylic Painting (8 Sessions)",
            currency: "AED",
            unitAmount: 1260,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            variantKey: "8",
            variants: [
              { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-ACRYLIC-8", unitAmount: 1260 },
              { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-ACRYLIC-12", unitAmount: 1825 },
            ],
            sessions: 8,
            perSessionDurationMin: 120,
            minTickets: 1,
            maxTickets: 10,
          },
        },
      },
      // 3) Watercolor Painting
      {
        badge: "Courses",
        image: "/images/activities/fine-art.webp",
        title: "Watercolor Painting",
        description: "Watercolor Painting",
        skillLevel: "All Levels",
        price: "AED 1260 – 1825",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-FAF-WATERCOLOR-8",
          name: "Watercolor Painting (8 Sessions)",
          currency: "AED",
          unitAmount: 1260,
          vatIncluded: false,
          vatRate: 5,
        },
        variants: [
          { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-WATERCOLOR-8", unitAmount: 1260 },
          { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-WATERCOLOR-12", unitAmount: 1825 },
        ],
        defaultVariantKey: "8",
        sessionsRange: [8, 12],
        perSessionDurationMin: 120,
        minTickets: 1,
        maxTickets: 10,
        location: "Meraki Art Studio",
        sections: [
          { icon: CalendarDaysIcon, text: "8 or 12 sessions" },
          { icon: ClockIcon, text: "2 hours per session | All materials included" },
          { icon: MapPinIcon, text: "Flexible scheduling available" },
        ],
        overview: "Master dreamy washes, florals, and fluid landscapes — perfect for mindfulness through art.",
        modal: true,
        modalContent: {
          title: "Watercolor Painting — AED 1260 – 1825",
          dates: "Flexible scheduling available",
          time: "2 Hours per session | All Materials Included",
          location: "Meraki Art Studio",
          price: "AED 1260 – 1825",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/activities/fine-art.webp",
          imageCaption: "Watercolor Painting at Meraki Art Studio",
          variants: [
            { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-WATERCOLOR-8", unitAmount: 1260 },
            { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-WATERCOLOR-12", unitAmount: 1825 },
          ],
          defaultVariantKey: "8",
          content: `
            <p>Master dreamy washes, florals, and fluid landscapes — perfect for mindfulness through art.</p>
            <p><strong>Each Course Includes:</strong><br/>
            8 Sessions — AED 1260<br/>
            12 Sessions — AED 1825<br/>
            2 Hours per session | All Materials Included<br/>
            Flexible scheduling available</p>
          `,
          checkoutPayload: {
            sku: "COURSE-FAF-WATERCOLOR-8",
            title: "Watercolor Painting (8 Sessions)",
            currency: "AED",
            unitAmount: 1260,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            variantKey: "8",
            variants: [
              { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-WATERCOLOR-8", unitAmount: 1260 },
              { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-WATERCOLOR-12", unitAmount: 1825 },
            ],
            sessions: 8,
            perSessionDurationMin: 120,
            minTickets: 1,
            maxTickets: 10,
          },
        },
      },
      // 4) Oil Painting
      {
        badge: "Courses",
        image: "/images/activities/fine-art.webp",
        title: "Oil Painting",
        description: "Oil Painting",
        skillLevel: "All Levels",
        price: "AED 1260 – 1825",
        vat: true,
        vatValue: 5,
        product: {
          sku: "COURSE-FAF-OIL-8",
          name: "Oil Painting (8 Sessions)",
          currency: "AED",
          unitAmount: 1260,
          vatIncluded: false,
          vatRate: 5,
        },
        variants: [
          { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-OIL-8", unitAmount: 1260 },
          { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-OIL-12", unitAmount: 1825 },
        ],
        defaultVariantKey: "8",
        sessionsRange: [8, 12],
        perSessionDurationMin: 120,
        minTickets: 1,
        maxTickets: 10,
        location: "Meraki Art Studio",
        sections: [
          { icon: CalendarDaysIcon, text: "8 or 12 sessions" },
          { icon: ClockIcon, text: "2 hours per session | All materials included" },
          { icon: MapPinIcon, text: "Flexible scheduling available" },
        ],
        overview: "Create timeless, textured masterpieces with a deep dive into classical oil painting techniques.",
        modal: true,
        modalContent: {
          title: "Oil Painting — AED 1260 – 1825",
          dates: "Flexible scheduling available",
          time: "2 Hours per session | All Materials Included",
          location: "Meraki Art Studio",
          price: "AED 1260 – 1825",
          vat: true,
          vatValue: 5,
          registerText: "Add to Cart",
          imageSrc: "/images/activities/fine-art.webp",
          imageCaption: "Oil Painting at Meraki Art Studio",
          variants: [
            { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-OIL-8", unitAmount: 1260 },
            { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-OIL-12", unitAmount: 1825 },
          ],
          defaultVariantKey: "8",
          content: `
            <p>Create timeless, textured masterpieces with a deep dive into classical oil painting techniques.</p>
            <p><strong>Each Course Includes:</strong><br/>
            8 Sessions — AED 1260<br/>
            12 Sessions — AED 1825<br/>
            2 Hours per session | All Materials Included<br/>
            Flexible scheduling available</p>
          `,
          checkoutPayload: {
            sku: "COURSE-FAF-OIL-8",
            title: "Oil Painting (8 Sessions)",
            currency: "AED",
            unitAmount: 1260,
            vatRate: 5,
            vatIncluded: false,
            quantity: 1,
            variantKey: "8",
            variants: [
              { key: "8", label: "8 Sessions — AED 1260", sku: "COURSE-FAF-OIL-8", unitAmount: 1260 },
              { key: "12", label: "12 Sessions — AED 1825", sku: "COURSE-FAF-OIL-12", unitAmount: 1825 },
            ],
            sessions: 8,
            perSessionDurationMin: 120,
            minTickets: 1,
            maxTickets: 10,
          },
        },
      },
    ],
  },
]


const cartStore = useCartStore()

function addCourseToCart(payload) {
  // payload comes from ImageTilesBlock emit (see component patch). We support both tile + checkoutPayload shapes.
  const sku = payload?.sku || payload?.product?.sku || payload?.checkoutPayload?.sku
  const title = payload?.title || payload?.product?.name || payload?.checkoutPayload?.title || 'Course'
  const currency = payload?.currency || payload?.product?.currency || payload?.checkoutPayload?.currency || 'AED'
  const unitAmount = Number(payload?.unitAmount ?? payload?.product?.unitAmount ?? payload?.checkoutPayload?.unitAmount ?? payload?.priceMajor ?? 0)
  const image = payload?.image || payload?.imageSrc || payload?.modalContent?.imageSrc || payload?.checkoutPayload?.image || payload?.productImage

  if (!sku || !unitAmount) return

  cartStore.add({
    type: 'course',
    id: sku,
    sku,
    title,
    image,
    priceMajor: unitAmount,
    currency,
    vat: true,
    vatValue: 5,
    vatIncluded: false,
    variantKey: payload?.variantKey || payload?.defaultVariantKey || payload?.checkoutPayload?.variantKey || null,
    meta: {
      flowType: 'Courses',
      kind: 'course',
      sessions: payload?.sessions || payload?.checkoutPayload?.sessions,
      totalDurationMin: payload?.totalDurationMin || payload?.checkoutPayload?.totalDurationMin,
      sessionDurationsMin: payload?.sessionDurationsMin || payload?.checkoutPayload?.sessionDurationsMin,
      minTickets: payload?.minTickets || payload?.checkoutPayload?.minTickets,
      maxTickets: payload?.maxTickets || payload?.checkoutPayload?.maxTickets,
      takeHome: payload?.takeHome || payload?.checkoutPayload?.takeHome,
    },
  }, 1)

  if (process.client) {
    window.dispatchEvent(new CustomEvent('open-cart'))
  }
}
</script>