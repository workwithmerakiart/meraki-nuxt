// ~/data/activations.js
//
// Content for /experiences/activations. The page renders entirely from this file.
//
// Structure: groups → activations → projects
//
// Group
//   id        unique slug (used for #anchor links)
//   label     e.g. 'Personalise'
//   accent    the group's colour: titles, labels, buttons and photo reveal. Site palette to pick from:
//             '#DD4912' orange, '#447C9D' steel blue, '#C2577A' rose, '#5E8C61' sage, '#B8860B' ochre
//   intro     optional one-liner shown under the group heading
//   catalogue optional PDF link; shows a 'Download Catalogue' button at the end of the group
//
// Activation
//   id        unique slug (used for #anchor links)
//   title     e.g. 'Live Debossing'
//   description
//   includes  list of items offered at the station
//   image     cover photo for the slider card. If empty, the latest project photo is used,
//             and if there are no projects yet a styled number panel is shown.
//   projects  past work, newest first (any number — shown as a rolling slider)
//
// Project
//   client    brand / event name, e.g. 'Lincoln'
//   caption   what was done, e.g. '950 pcs live debossing on valet trays'
//   location  optional, e.g. 'Sheikh Zayed Road, Dubai'
//   date      optional, e.g. 'March 2026'
//   images    1–2 photos, e.g. ['/images/activations/live-debossing/lincoln-1.jpeg']
//
// Example project:
//   {
//     client: 'Lincoln',
//     caption: '950 pcs live debossing on valet trays',
//     location: 'Sheikh Zayed Road, Dubai',
//     images: ['/images/activations/live-debossing/lincoln-1.jpeg'],
//   },

export const activationGroups = [
  {
    id: 'personalise',
    label: 'Personalise',
    accent: '#DD4912',
    catalogue: '/brochures/station/corporate-activations.pdf',
    intro: 'Names, initials and messages added live, so every guest leaves with something made for them.',
    activations: [
      {
        id: 'live-debossing',
        title: 'Live Debossing',
        description:
          'Turn everyday leather goods into personalised keepsakes with a name, initials or signature pressed live in front of you.',
        includes: ['Key chains', 'Luggage tags', 'Card holders', 'Notebooks', 'Valet trays'],
        image: '',
        projects: [{ client: 'Lincoln', caption: '950 pcs live debossing on valet trays', location: 'Sheikh Zayed Road, Dubai', images: ['/images/events/corporate.webp','/images/activities/corporate.webp'] }],
      },
      {
        id: 'live-engraving',
        title: 'Live Engraving',
        description:
          'Make it truly yours with a custom name, message or design engraved live onto a selected keepsake.',
        includes: ['Metal', 'Acrylic glass', 'Bottles', 'Key chains', 'Keepsakes'],
        image: '',
        projects: [{ client: 'Sample Brand A', caption: '300 personalised bottles engraved live', location: 'DIFC, Dubai', images: ['/images/activities/bedazzle/bedazzle-tumbler.jpeg'] },{ client: 'Sample Brand B', caption: 'Acrylic keepsakes for 200 guests', location: 'Abu Dhabi', images: ['/images/activities/bedazzle/bedazzle-phone-case.jpeg'] }],
      },
      {
        id: 'live-calligraphy',
        title: 'Live Calligraphy',
        description:
          'Add an elegant, handcrafted touch with personalised Arabic or English calligraphy created live for each guest.',
        includes: ['Cards', 'Notebooks', 'Pouches', 'Gift boxes', 'Bottles', 'Tags'],
        image: '',
        projects: [],
      },
    ],
  },
  {
    id: 'create-and-wear',
    label: 'Create & Wear',
    accent: '#447C9D',
    catalogue: '/brochures/station/corporate-activations.pdf',
    intro: 'Hands-on stations where guests design and build an accessory to wear home.',
    activations: [
      {
        id: 'charm-bar',
        title: 'Charm Bar',
        description:
          'Mix, match and build your own accessory from a curated selection of playful charms, beads and details.',
        includes: ['Key chains', 'Necklaces', 'Bracelets', 'Phone charms', 'Bag charms'],
        image: '',
        projects: [],
      },
      {
        id: 'jewellery-station',
        title: 'Jewellery Station',
        description:
          'Design your own piece of jewellery from a curated selection of beads, charms and finishing details.',
        includes: ['Bracelets', 'Necklaces', 'Beaded jewellery', 'Charm jewellery', 'Personalised accessories'],
        image: '',
        projects: [],
      },
      {
        id: 'decoden-bar',
        title: 'Decoden Bar',
        description:
          'Go all-out with a playful world of charms, textures and embellishments to create a completely personalised accessory.',
        includes: ['Jewellery boxes', 'Mirrors', 'Phone cases', 'Hairbrushes', 'Accessories'],
        image: '/images/activities/decoden/activities_decoden.webp',
        projects: [{ client: 'Sample Brand 1', caption: 'Decoden mirrors and phone cases for 120 guests', location: 'Dubai Mall', images: ['/images/activities/decoden/activities_decoden_mirror.webp'] },{ client: 'Sample Brand 2', caption: 'Decoden mirrors and phone cases for 120 guests', location: 'Dubai Mall', images: ['/images/activities/decoden/activities_decoden_phonecase.webp'] },{ client: 'Sample Brand 3', caption: 'Decoden mirrors and phone cases for 120 guests', location: 'Dubai Mall', images: ['/images/activities/decoden/activities_decoden_hair_brush.webp'] },{ client: 'Sample Brand 4', caption: 'Decoden mirrors and phone cases for 120 guests', location: 'Dubai Mall', images: ['/images/activities/decoden/activities_decoden_jewellery_box.webp'] },{ client: 'Sample Brand 5', caption: 'Decoden mirrors and phone cases for 120 guests', location: 'Dubai Mall', images: ['/images/activities/decoden/activities_decoden_hand_mirror.webp'] }],
      },
    ],
  },
]
