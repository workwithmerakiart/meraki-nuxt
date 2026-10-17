// ~/data/activations.js
//
// Content for /experiences/activations. The page renders entirely from this file.
//
// Structure: groups → activations → projects
//
// Group
//   id        unique slug (used for #anchor links)
//   label     e.g. 'Live Personalisation'
//   accent    the group's colour: titles, labels, rules and hover states
//   intro     one-liner shown under the group heading
//   catalogue optional PDF link; shows a 'Download Catalogue' button
//
// Activation
//   id          unique slug
//   title       e.g. 'Live Debossing'
//   description what the station is and what guests can make (shown in full on its page)
//   image       cover photo; if empty, the first project photo is used
//   imageFocus  optional CSS object-position for the cover, e.g. '50% 36%' to keep
//               the subject in frame when the photo is cropped
//   projects    past work, newest first
//
// Project
//   client   brand / event name, e.g. 'NORQAIN'
//   subject  what was made, e.g. 'Valet Trays'
//   caption  what was done
//   stat     optional headline number, e.g. '35 personalised pieces'
//   location optional, e.g. 'Kuwait · Dubai · Abu Dhabi · Qatar'
//   logo     optional brand mark shown beside the client name
//   images   1 photo (first is shown)
//   focus    optional CSS object-position for the photo, e.g. '50% 62%'

const LOGO = {
  bvlgari: '/images/Bulgari-Logo.wine.png',
  dior: '/images/Dior_Logo.svg.png',
  harveyNichols: '/images/Harvey_Nichols-Logo.wine.png',
  lancome: '/images/Lancome-logo.png',
  rolex: '/images/Logo_da_Rolex.png',
  marli: '/images/MARLI-LOGO-BLACK-1.webp',
  museumOfTheFuture: '/images/Museum_of_the_Future_logo.svg.png',
  audi: '/images/audi-14-logo-svg-vector.svg',
  bmw: '/images/bmw-logo.svg',
  seddiqi: '/images/png-clipart-the-dubai-mall-ahmed-seddiqi-sons-retail-watch-shopping-watch-text-retail.png',
}

export const activationGroups = [
  /* ------------------------------------------------------------------ 01 */
  {
    id: 'live-personalisation',
    label: 'Live Personalisation',
    accent: '#DD4912',
    catalogue: '/brochures/station/Meraki_Live_Personalisation.pdf',
    intro: 'Names, initials and messages added live, so every guest leaves with something made for them.',
    activations: [
      {
        id: 'live-debossing',
        title: 'Live Debossing',
        description:
          'A premium personalisation experience for leather goods, with names, initials or selected designs debossed live during the event. Suitable for pouches, luggage tags, keychains, card holders, notebooks, valet trays and other leather accessories.',
        image: '/images/activations/images/Live%20Debossing.webp',
        projects: [
          {
            client: 'NORQAIN',
            subject: 'Valet Trays',
            caption:
              'Personalised leather valet trays created for guests, with each piece individually finished with live debossing.',
            stat: '35 personalised pieces',
            images: ['/images/activations/images/NORQAIN%20Valet%20Trays.webp'],
          },
          {
            client: 'Lincoln',
            subject: 'Card Holders & Valet Trays',
            caption:
              'Customised leather card holders and valet trays presented in bespoke branded gift boxes, with live debossing for guests.',
            stat: '120 customised sets',
            images: ['/images/activations/images/Lincoln%20%E2%80%94%20Card%20Holders%20&%20Valet%20Trays.webp'],
          },
          {
            client: 'iCAUR',
            subject: 'Key Pouches',
            caption: 'Custom-made leather key pouches personalised with live debossing for guests.',
            stat: '40 customised pieces',
            images: ['/images/activations/images/iCAUR%20%E2%80%94%20Key%20Pouches.webp'],
          },
          {
            client: 'Ahmed Seddiqi & Sons',
            subject: 'Books',
            caption: 'Bespoke books personalised live for guests at the Novelties event.',
            stat: '100 personalised books',
            logo: LOGO.seddiqi,
            images: ['/images/activations/images/Ahmed%20Siddique%20&%20Sons%20%E2%80%94%20Books.webp'],
            focus: '40% 68%',
          },
        ],
      },
      {
        id: 'live-engraving',
        title: 'Live Engraving',
        description:
          'A refined live personalisation experience for selected metal, acrylic and glass products. Guests can personalise bottles, tags, keychains, keepsakes and other items with names, initials or short messages.',
        image: '/images/activations/images/Live%20Engraving.webp',
        projects: [
          {
            client: 'Harvey Nichols',
            subject: 'Christmas Baubles',
            caption:
              'Bespoke floral Christmas baubles personalised with live engraving for guests as part of a festive in-store activation.',
            logo: LOGO.harveyNichols,
            images: ['/images/activations/images/Harvey%20Nichols%20%E2%80%94%20Christmas%20Baubles.webp'],
            focus: '45% 62%',
          },
          {
            client: 'Dubai Watch Week',
            subject: 'Opening Gala',
            caption:
              'Bespoke gold pieces individually engraved and personalised for guests at the Dubai Watch Week Opening Gala.',
            stat: '300 personalised pieces',
            images: ['/images/activations/images/Dubai%20Watch%20Week%20%E2%80%94%20Opening%20Gala.webp'],
          },
          {
            client: 'Bvlgari',
            subject: 'GCC Activations',
            caption:
              'A multi-city gold engraving experience created for Bvlgari across the GCC, with each piece individually personalised for guests.',
            location: 'Kuwait · Dubai · Abu Dhabi · Qatar',
            logo: LOGO.bvlgari,
            images: ['/images/activations/images/Bvlgari%20%E2%80%94%20GCC%20Activations.webp'],
          },
          {
            client: 'Marli New York',
            subject: 'Gold Engraving',
            caption:
              'Custom gold keepsakes engraved live for guests, combining intricate detailing with personalised names and messages for an elevated gifting experience.',
            logo: LOGO.marli,
            images: ['/images/activations/images/Marli%20New%20York%20%E2%80%94%20Gold%20Engraving.webp'],
          },
        ],
      },
      {
        id: 'laser-engraving',
        title: 'Laser Engraving',
        description:
          'Precision laser personalisation for a clean and contemporary finish. Names, initials, logos, artwork or selected designs can be engraved onto suitable materials, including wood, acrylic, leather and metal. Ideal for branded gifting and high-volume event personalisation.',
        image: '/images/activations/images/laser%20engraving.webp',
        projects: [],
      },
      {
        id: 'live-calligraphy',
        title: 'Live Calligraphy',
        description:
          'Elegant Arabic or English calligraphy created live at the event. Personalisation can be added to cards, notebooks, pouches, bottles, gift boxes, tags and other selected products.',
        image: '/images/activations/images/Live%20Calligraphy.webp',
        projects: [
          {
            client: 'AGMC',
            subject: 'Arabic Calligraphy on a Car',
            caption:
              'Bespoke Arabic calligraphy hand-painted directly onto the vehicle, transforming it into a statement piece for the event.',
            images: ['/images/activations/images/AGMC%E2%80%94%20Arabic%20Calligraphy%20on%20A%20car.webp'],
          },
          {
            client: 'Marco Valente',
            subject: 'Personalised Hats',
            caption: 'Live calligraphy on hats, with each piece individually personalised with guests’ initials.',
            images: ['/images/activations/images/Marco%20Valente%20%E2%80%94%20Personalised%20Hats.webp'],
          },
        ],
      },
      {
        id: 'live-embroidery',
        title: 'Live Embroidery',
        description:
          'Personalised embroidery created live for guests, with names, initials, monograms or selected designs stitched onto fabric products. Suitable for caps, tote bags, pouches, clothing, scarves, aprons and other textile items.',
        image: '/images/activations/images/Live%20Embroidery.webp',
        projects: [],
      },
      {
        id: 'heat-press-personalisation',
        title: 'Heat Press Personalisation',
        description:
          'Names, initials, logos or custom designs applied using heat-press techniques. Suitable for T-shirts, caps, tote bags, pouches, aprons and other fabric items.',
        image: '/images/activations/images/Heat%20Press%20Personalisation.webp',
        projects: [
          {
            client: 'Drop District',
            subject: 'FIFA-Themed Personalisation',
            caption:
              'A football-inspired customisation station where guests selected from FIFA-themed graphics, country designs and playful football elements to personalise T-shirts, caps and drawstring bags.',
            images: ['/images/activations/images/Drop%20District%20%E2%80%94%20FIFA-Themed%20Personalisation.webp'],
          },
          {
            client: 'iCAUR',
            subject: 'Gaming-Themed T-Shirts',
            caption:
              'A fun, interactive T-shirt personalisation experience featuring colourful gaming-inspired graphics, icons and playful design elements.',
            images: ['/images/activations/images/iCAUR%20Sticker%20Customization%20Station.webp'],
          },
        ],
      },
      {
        id: 'live-caricature-illustration',
        title: 'Live Caricature & Illustration',
        description:
          'A personalised art experience where guests receive an illustration created especially for them. Options include fashion illustrations, hand-drawn portraits and digital caricatures.',
        image: '/images/activations/images/Live%20Caricature%20&%20Illustration.webp',
        projects: [],
      },
    ],
  },

  /* ------------------------------------------------------------------ 02 */
  {
    id: 'fragrance-scent',
    label: 'Fragrance & Scent Experiences',
    accent: '#B8860B',
    catalogue: '/brochures/station/Meraki_Fragrance_and_Scent_Experiences.pdf',
    intro: 'Scent built note by note, blended and bottled by the guest and carried home.',
    activations: [
      {
        id: 'perfume-fragrance-bar',
        title: 'Perfume & Fragrance Bar',
        description:
          'Guests explore a curated selection of fragrance notes and create a scent that is uniquely their own. The experience can be offered as personalised perfumes, reed diffusers, car diffusers, room fragrances and other scented products, with custom packaging and branding options available.',
        image: '/images/activations/images/Perfume%20&%20Fragrance%20Bar.webp',
        projects: [
          {
            client: 'Performansion',
            subject: 'Car Diffuser Bar',
            caption: 'Guests selected their preferred scent and created personalised car diffusers to take home.',
            images: ['/images/activations/images/Performansion%20%E2%80%94%20Car%20Diffuser%20Bar.webp'],
          },
          {
            client: 'FOPE',
            subject: 'Perfume Bar & Live Engraving',
            caption: 'A bespoke perfume experience with fragrance blending and live engraving for guests.',
            images: ['/images/activations/images/FOPE%20%E2%80%94%20Perfume%20Bar%20&%20Live%20Engraving.webp'],
          },
          {
            client: 'Ahmed Seddiqi',
            subject: 'Perfume Bar',
            caption: 'A large-scale perfume blending experience delivered across two days.',
            stat: '200 guests · 2 days',
            logo: LOGO.seddiqi,
            images: ['/images/activations/images/Ahmed%20Seddiqi%20%E2%80%94%20Perfume%20Bar.webp'],
          },
          {
            client: 'TDRA',
            subject: 'UAE National Day Perfume Bar',
            caption: 'A festive perfume-making experience for employees, created for UAE National Day.',
            images: ['/images/activations/images/TDRA%20%E2%80%94%20UAE%20National%20Day%20Perfume%20Bar.webp'],
          },
        ],
      },
      {
        id: 'bakhoor-bar',
        title: 'Bakhoor Bar',
        description:
          'A fragrance experience inspired by the traditions of the region. Guests can create or customise their own bakhoor blend by selecting scents and ingredients, followed by personalised packaging.',
        image: '/images/activations/images/Bakhoor%20Bar.webp',
        projects: [
          {
            client: 'Graff',
            subject: 'Bakhoor Bar',
            caption:
              'A bespoke bakhoor-making experience where guests selected and blended their preferred scents to create a personalised blend.',
            images: ['/images/activations/images/Graff%20%E2%80%94%20Bakhoor%20Bar.webp'],
          },
        ],
      },
      {
        id: 'candle-bar',
        title: 'Candle Bar',
        description:
          'Guests create their own scented candle by selecting their preferred fragrance and personalising the final piece. The experience can include candle pouring, fragrance blending and decorative finishing.',
        image: '/images/activations/images/Candle%20Bar.webp',
        projects: [
          {
            client: 'Kate Spade',
            subject: 'Diwali Candle Bar',
            caption:
              'A festive candle-making experience inspired by Diwali, with colourful decorative elements and personalised candles for guests.',
            images: ['/images/activations/images/Kate%20Spade%20%E2%80%94%20Diwali%20Candle%20Bar.webp'],
            focus: '50% 62%',
          },
          {
            client: 'Parker’s',
            subject: 'Breakfast Launch',
            caption: 'A bespoke candle design station created to celebrate the launch of Parker’s new breakfast menu.',
            images: ['/images/activations/images/Parker%E2%80%99s%20%E2%80%94%20Breakfast%20Launch.webp'],
          },
          {
            client: 'Somewhere',
            subject: 'Saudi National Day',
            caption:
              'A Saudi National Day-themed candle decoration experience featuring colours and elements inspired by the occasion.',
            images: ['/images/activations/images/Somewhere%20%E2%80%94%20Saudi%20National%20Day.webp'],
          },
          {
            client: 'Address Hotels',
            subject: 'Candle Bar',
            caption:
              'An interactive candle-making activation where guests created and decorated their own personalised candles.',
            images: ['/images/activations/images/Address%20Hotels%20%E2%80%94%20Candle%20Bar.webp'],
          },
          {
            client: 'Tash by T',
            subject: 'Influencer Event',
            caption:
              'A curated candle-making experience created for an intimate influencer event, with personalised decorative details for each guest.',
            images: ['/images/activations/images/Tash%20by%20T%20%E2%80%94%20Influencer%20Event.webp'],
          },
          {
            client: 'Anthropologie',
            subject: 'Fashion Show',
            caption:
              'A floral-inspired candle-making experience created for the fashion show, where guests personalised their candles with botanical and decorative elements.',
            images: ['/images/activations/images/Anthropologie%20%E2%80%94%20Fashion%20Show.webp'],
          },
          {
            client: 'Harvey Nichols',
            subject: 'Ramadan Candle Bar',
            caption:
              'A Ramadan-inspired candle experience where guests personalised candles with florals and decorative elements, creating a thoughtful festive keepsake.',
            logo: LOGO.harveyNichols,
            images: ['/images/activations/images/Harvey%20Nichols%20%E2%80%94%20Ramadan%20Candle%20Bar.webp'],
            focus: '50% 64%',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 03 */
  {
    id: 'fashion-charms-accessories',
    label: 'Fashion, Charms & Accessories',
    accent: '#C2577A',
    catalogue: '/brochures/station/Meraki_Fashion_Charms_and_Accessories.pdf',
    intro: 'Pieces guests design and wear out of the room, assembled charm by charm.',
    activations: [
      {
        id: 'charm-bar',
        title: 'Charm Bar',
        description:
          'Guests create their own personalised accessories from a curated selection of charms, beads and decorative elements. Options include bracelets, necklaces, phone charms, bag charms and keychains.',
        image: '/images/activations/images/Charm%20Bar.webp',
        projects: [
          {
            client: 'G-SHOCK',
            subject: 'Personalised Luggage Tag Charm Bar',
            caption:
              'An interactive charm bar where guests customised luggage tags with travel-inspired charms, creating unique accessories to take home.',
            images: ['/images/activations/images/G-SHOCK%20%E2%80%94%20Personalised%20Luggage%20Tag%20Charm%20Bar.webp'],
          },
        ],
      },
      {
        id: 'jewellery-making',
        title: 'Jewellery Making',
        description:
          'A hands-on jewellery experience where guests design their own pieces using beads, charms and decorative elements. Options can include bracelets, necklaces, keychains and other personalised accessories.',
        image: '/images/activations/images/Jewellery%20Making.webp',
        projects: [
          {
            client: 'Vintage Horology',
            subject: 'Tasbih-Making Experience',
            caption:
              'An exclusive Suhoor activation where guests created their own tasbih using a curated selection of beads, charms and finishing details.',
            images: ['/images/activations/images/Vintage%20Horology%20%E2%80%94%20Tasbih-Making%20Experience.webp'],
          },
        ],
      },
      {
        id: 'bedazzle-bar',
        title: 'Bedazzle Bar',
        description:
          'A high-impact customisation experience where guests personalise accessories and lifestyle items using rhinestones, crystals and decorative embellishments. Suitable for tumblers, pouches, bags, caps, phone cases, denim pieces, mirrors and other selected products.',
        image: '/images/activations/images/Bedazzle%20Bar.webp',
        projects: [
          {
            client: 'Kosas',
            subject: 'Bedazzle Bar',
            caption:
              'A beauty-focused bedazzling experience where guests customised Kosas products with rhinestones and crystal details.',
            images: ['/images/activations/images/Kosas%20%E2%80%94%20Bedazzle%20Bar.webp'],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 04 */
  {
    id: 'beauty-self-care',
    label: 'Beauty & Self-Care',
    accent: '#8C6A9D',
    catalogue: '/brochures/station/Meraki_Beauty_and_Self_Care.pdf',
    intro: 'Slow, sensory stations where guests mix and bottle something made for themselves.',
    activations: [
      {
        id: 'beauty-bar',
        title: 'Beauty Bar',
        description:
          'An interactive beauty and self-care experience where guests create and personalise their own products. Options can include lip gloss, body scrubs, hair mist, bath salts, body shimmer and other selected products.',
        image: '/images/activations/images/Beauty%20Bar.webp',
        projects: [
          {
            client: 'Teddy-Themed Baby Shower',
            subject: 'Bath Salt Bar',
            caption:
              'A personalised bath salt experience where guests selected their preferred fragrance and created their own blend using high-quality Epsom salts, presented as a thoughtful keepsake.',
            images: ['/images/activations/images/Teddy-Themed%20Baby%20Shower%20%E2%80%94%20Bath%20Salt%20Bar.webp'],
          },
        ],
      },
      {
        id: 'tea-blending-bar',
        title: 'Tea Blending Bar',
        description:
          'A sensory experience where guests create personalised tea blends using aromatic herbs, botanicals and floral ingredients.',
        image: '/images/activations/images/Tea%20Blending%20Bar.webp',
        projects: [
          {
            client: 'Aesop',
            subject: 'Fragrance-Inspired Tea Blending Bar',
            caption:
              'A bespoke tea blending experience where guests created personalised blends inspired by Aesop’s signature fragrances, translating aromatic notes into unique sensory creations.',
            images: ['/images/activations/images/Aesop%20%E2%80%94%20Fragrance-Inspired%20Tea%20Blending%20Bar.webp'],
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 05 */
  {
    id: 'art-creative',
    label: 'Art & Creative Experiences',
    accent: '#447C9D',
    catalogue: '/brochures/station/Meraki_Art_and_Creative_Experiences.pdf',
    intro: 'Our widest range — paint, resin, stone and botanicals, shaped to the brand in the room.',
    activations: [
      {
        id: 'painting',
        title: 'Painting',
        description:
          'A versatile creative experience tailored to the event, brand or campaign. Guests can paint and personalise their own pieces, or a professional artist can create bespoke artwork live. The experience can be adapted across canvases, ceramics, fashion pieces, bags, accessories, packaging and other selected surfaces.',
        image: '',
        projects: [
          {
            client: 'Bvlgari',
            subject: 'Hand-Painted Watch Cases',
            caption:
              'Bespoke watch cases individually hand-painted with intricate motifs, transforming each case into a distinctive, one-of-a-kind piece.',
            logo: LOGO.bvlgari,
            images: ['/images/activations/images/Bvlgari%20%E2%80%94%20Hand-Painted%20Watch%20Cases.webp'],
          },
          {
            client: 'THG Paris',
            subject: 'Sculptural Painting Workshop',
            caption:
              'An interactive painting experience where guests personalised sculptural candle holders with their own colours, patterns and artistic details.',
            images: ['/images/activations/images/THG%20Paris%20%E2%80%94%20Sculptural%20Painting%20Workshop.webp'],
          },
          {
            client: 'Department of Culture and Tourism',
            subject: 'Emirati Women’s Day Fabric Painting',
            caption:
              'A live painting experience celebrating Emirati Women’s Day, with guests creating delicate floral artwork directly onto fabric pieces.',
            images: ['/images/activations/images/Department%20of%20Culture%20and%20Tourism%20%E2%80%94%20Emirati%20Women%E2%80%99s%20Day%20Fabric%20Painting.webp'],
          },
          {
            client: 'Moser',
            subject: 'Tote Bag Screen Printing',
            caption:
              'A hands-on screen-printing activation where guests customised tote bags with specially designed graphics and motifs.',
            images: ['/images/activations/images/Moser%20%E2%80%94%20Tote%20Bag%20Screen%20Printing.webp'],
            focus: '50% 56%',
          },
          {
            client: 'Ethan Allen',
            subject: 'Canvas Painting Workshop',
            caption:
              'A thoughtfully curated painting experience where guests created their own canvas artworks inspired by selected floral references.',
            images: ['/images/activations/images/Ethan%20Allen%20%E2%80%94%20Canvas%20Painting%20Workshop.webp'],
          },
          {
            client: 'Boucheron',
            subject: 'Live Floral Painting',
            caption:
              'An artist-led customisation experience featuring delicate floral motifs hand-painted onto selected pieces, creating unique artwork for each guest.',
            images: ['/images/activations/images/Boucheron%20%E2%80%94%20Live%20Floral%20Painting.webp'],
          },
          {
            client: 'Government Regulatory Authority',
            subject: 'UAE National Day Bag Painting',
            caption:
              'A UAE National Day-inspired painting experience where guests personalised tote bags with Emirati-inspired illustrations, landmarks and heritage motifs.',
            images: ['/images/activations/images/Government%20Regulatory%20Authority%20%E2%80%94%20UAE%20National%20Day%20Bag%20Painting.webp'],
          },
          {
            client: 'Hublot',
            subject: 'Moon Texture Art',
            caption:
              'A celestial-inspired texture art experience where guests created dimensional moon artworks using layered media and sculptural techniques.',
            images: ['/images/activations/images/Hublot%20%E2%80%94%20Moon%20Texture%20Art.webp'],
          },
        ],
      },
      {
        id: 'uv-resin',
        title: 'UV Resin',
        description:
          'Guests create personalised resin pieces using colours, dried florals, glitter, charms and other decorative elements. Options include keychains, bookmarks, magnets, charms and small keepsakes.',
        image: '/images/activations/images/UV%20Resin.webp',
        projects: [
          {
            client: 'Graff',
            subject: 'In-Store Pressed Flower Resin Trays',
            caption:
              'A bespoke in-store resin experience for Graff’s clientele, where guests created elegant trays using real pressed flowers and delicate gold detailing.',
            images: ['/images/activations/images/Graff%20%E2%80%94%20In-Store%20Pressed%20Flower%20Resin%20Trays.webp'],
          },
          {
            client: 'Lancôme',
            subject: 'Resin Makeup Plates',
            caption:
              'A customised resin activation created for a foundation launch, where guests designed decorative makeup plates using curated colours and embellishments.',
            logo: LOGO.lancome,
            images: ['/images/activations/images/Lanc%C3%B4me%20%E2%80%94%20Resin%20Makeup%20Plates.webp'],
          },
          {
            client: 'Dior',
            subject: 'Pressed Flower Resin Art',
            caption:
              'A refined resin experience created for a perfume launch event, featuring real pressed botanicals and elegant floral compositions inspired by the fragrance.',
            logo: LOGO.dior,
            images: ['/images/activations/images/Dior%20%E2%80%94%20Pressed%20Flower%20Resin%20Art.webp'],
          },
          {
            client: 'Abu Dhabi Surf Competition 2026',
            subject: 'Custom Resin Keychains',
            caption:
              'A high-volume interactive activation where guests customised their own surfboard-shaped resin keychains in under 10 minutes.',
            stat: '1,000 keychains',
            images: ['/images/activations/images/Abu%20Dhabi%20Surf%20Competition%202026%20%E2%80%94%20Custom%20Resin%20Keychains.webp'],
          },
        ],
      },
      {
        id: 'mosaic',
        title: 'Mosaic',
        description:
          'Guests create their own mosaic designs using a curated selection of tiles, colours and patterns. Options include coasters, trays, mirrors, frames and larger decorative artworks.',
        image: '/images/activations/images/Mosaic.webp',
        projects: [
          {
            client: 'BMW',
            subject: 'Diwali In-Store Mosaic Art',
            caption:
              'An in-store Diwali activation where guests created their own mosaic pieces using festive colours and patterns, within the BMW showroom.',
            logo: LOGO.bmw,
            images: ['/images/activations/images/BMW%20%E2%80%94%20Diwali%20In-Store%20Mosaic%20Art.webp'],
          },
        ],
      },
      {
        id: 'jesmonite',
        title: 'Jesmonite',
        description:
          'A contemporary craft experience where guests create or decorate modern home accessories. Options can include trays, coasters, trinket dishes and other décor pieces.',
        image: '/images/activations/images/Jesmonite.webp',
        projects: [
          {
            client: 'Rolex',
            subject: 'Natural Stone Jesmonite Trays',
            caption:
              'An in-store client experience where guests created elegant Jesmonite trays finished with natural stones, resulting in refined, one-of-a-kind pieces.',
            logo: LOGO.rolex,
            images: ['/images/activations/images/Rolex%20%E2%80%94%20Natural%20Stone%20Jesmonite%20Trays.webp'],
          },
          {
            client: 'Bvlgari',
            subject: 'Octagonal Watch-Inspired Trays',
            caption:
              'A large-scale activation featuring bespoke octagon-shaped Jesmonite trays designed to complement Bvlgari’s watch aesthetic, with custom boxes.',
            stat: '~150 guests',
            logo: LOGO.bvlgari,
            images: ['/images/activations/images/Bvlgari%20%E2%80%94%20Octagonal%20Watch-Inspired%20Trays.webp'],
          },
          {
            client: 'Audi',
            subject: 'Branded Jesmonite Trays',
            caption:
              'A bespoke activation where guests created custom Jesmonite trays featuring Audi branding and a clean, contemporary finish.',
            location: 'Kuwait',
            logo: LOGO.audi,
            images: ['/images/activations/images/Audi%20%E2%80%94%20Branded%20Jesmonite%20Trays,%20Kuwait.webp'],
          },
          {
            client: 'Harvey Nichols',
            subject: 'Colourful Terrazzo Trays',
            caption:
              'A playful Jesmonite experience featuring vibrant pigments and terrazzo-style detailing, with guests creating colourful decorative trays.',
            logo: LOGO.harveyNichols,
            images: ['/images/activations/images/Harvey%20Nicoles%20%E2%80%94%20Colourful%20Terrazzo%20Trays.webp'],
            focus: '50% 72%',
          },
          {
            client: 'Bvlgari',
            subject: 'Serpenti-Inspired Jesmonite Trays',
            caption:
              'A bespoke series of Serpenti-inspired trays created for activations across the GCC, translating the iconic design language into sculptural Jesmonite pieces.',
            logo: LOGO.bvlgari,
            images: ['/images/activations/images/Bvlgari%20%E2%80%94%20Serpenti-Inspired%20Jesmonite%20Trays.webp'],
          },
          {
            client: 'GP',
            subject: 'Octagonal Watch Launch Trays',
            caption:
              'A high-volume live activation for a watch launch event, with octagon-shaped Jesmonite trays created on site.',
            stat: '100+ trays in 4 hours',
            images: ['/images/activations/images/GP%20%E2%80%94%20Octagonal%20Watch%20Launch%20Trays.webp'],
          },
          {
            client: 'Damas',
            subject: 'Jesmonite Ring Holders',
            caption:
              'A jewellery-focused Jesmonite experience featuring elegant ring holders designed as functional keepsakes for guests.',
            images: ['/images/activations/images/Damas%20%E2%80%94%20Jesmonite%20Ring%20Holder.webp'],
          },
          {
            client: 'Emirates Palace Wedding',
            subject: 'Mehendi Jesmonite Tray Making',
            caption:
              'A vibrant, hands-on mehendi activation where guests created personalised Jesmonite trays with colourful terrazzo patterns.',
            images: ['/images/activations/images/Emirates%20Palace%20Wedding%20Mehendi%20Event%20%E2%80%94%20Jesmonite%20Tray%20Making.webp'],
          },
        ],
      },
      {
        id: 'pressed-flowers',
        title: 'Pressed Flowers',
        description:
          'A delicate botanical customisation experience using real pressed flowers and natural elements to create elegant, personalised keepsakes. The concept can be adapted across frames, resin pieces, candles, trays, coasters and other decorative items, with florals and colours curated to suit the brand or event.',
        image: '/images/activations/images/Pressed%20Flowers.webp',
        projects: [
          {
            client: 'The White Company',
            subject: 'Pressed Flower Frames',
            caption:
              'A refined pressed flower frame activation created for influencers, featuring elegant botanical compositions designed to reflect the brand’s soft, minimal aesthetic.',
            images: ['/images/activations/images/The%20White%20Company%20%E2%80%94%20Pressed%20Flower%20Frames.webp'],
          },
          {
            client: 'Private Birthday',
            subject: 'Personalised Pressed Flower Frames',
            caption:
              'A bespoke birthday experience where guests created pressed flower frames personalised with their initials.',
            images: ['/images/activations/images/Private%20Birthday%20%E2%80%94%20Personalised%20Pressed%20Flower%20Frames.webp'],
          },
          {
            client: 'Dior',
            subject: 'Pressed Flower Resin Coasters',
            caption:
              'A floral resin activation featuring real pressed flowers set into elegant coasters, creating delicate keepsakes inspired by Dior’s botanical aesthetic.',
            logo: LOGO.dior,
            images: ['/images/activations/images/Dior%20%E2%80%94%20Pressed%20Flower%20Resin%20Coasters.webp'],
          },
          {
            client: 'Graff',
            subject: 'Pressed Flower Resin Trays',
            caption:
              'A luxury resin experience where guests created elegant trays using real pressed flowers and refined decorative detailing.',
            images: ['/images/activations/images/Graff%20%E2%80%94%20Pressed%20Flower%20Resin%20Trays.webp'],
          },
          {
            client: 'Anthropologie',
            subject: 'Pressed Flower Candle Décor',
            caption:
              'A botanical candle customisation experience featuring real pressed flowers arranged as decorative details.',
            images: ['/images/activations/images/Anthropologie%20%E2%80%94%20Pressed%20Flower%20Candle%20D%C3%A9cor.webp'],
          },
        ],
      },
      {
        id: 'terrarium-planting',
        title: 'Terrarium & Planting',
        description:
          'A calming, nature-inspired experience where guests create their own miniature terrariums using plants, moss, stones, soil and decorative elements. The activation can be tailored with different vessels, colour palettes and styling to suit the brand, venue or event theme.',
        image: '/images/activations/images/Terrarium%20&%20Planting.webp',
        projects: [
          {
            client: 'Edit',
            subject: 'In-Store Terrarium Workshop',
            caption:
              'An in-store creative experience at the mall where guests designed and assembled their own miniature terrariums using curated plants, stones and decorative elements.',
            images: ['/images/activations/images/Edit%20%E2%80%94%20In-Store%20Terrarium%20Workshop.webp'],
          },
          {
            client: 'Museum of the Future',
            subject: 'Terrarium Experience',
            caption:
              'A nature-led interactive workshop where guests created personalised terrariums, combining greenery, natural textures and decorative details.',
            logo: LOGO.museumOfTheFuture,
            images: ['/images/activations/images/Museum%20of%20the%20Future%20%E2%80%94%20Terrarium%20Experience.webp'],
          },
        ],
      },
      {
        id: 'live-origami-art',
        title: 'Live Origami Art',
        description:
          'An elegant live art activation where skilled origami artists transform paper into intricate flowers, sculptures and personalised keepsakes.',
        image: '/images/activations/images/Live%20Origami%20Art.webp',
        imageFocus: '50% 36%',
        projects: [
          {
            client: 'Marli New York',
            subject: 'Live Origami Flowers',
            caption:
              'A luxury in-store activation featuring handcrafted origami flowers, creating delicate, personalised keepsakes for guests.',
            logo: LOGO.marli,
            images: ['/images/activations/images/Marli%20New%20York%20%E2%80%94%20Live%20Origami%20Flowers.webp'],
            focus: '50% 62%',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ 06 */
  {
    id: 'kids-playful',
    label: 'Kids & Playful Experiences',
    accent: '#5E8C61',
    catalogue: '/brochures/station/Meraki_Kids_and_Playful_Experiences.pdf',
    intro: 'Loud, colourful and hands-on — built for family days and younger guests.',
    activations: [
      {
        id: 'slime-bar',
        title: 'Slime Bar',
        description:
          'A hands-on slime-making experience where guests create and customise their own slime. Colours, textures, scents, glitter, charms and other add-ons can be selected to make each creation unique.',
        image: '/images/activations/images/Slime%20Bar.webp',
        projects: [],
      },
      {
        id: 'squishy-bar',
        title: 'Squishy Bar',
        description:
          'A playful activity where guests decorate and personalise their own squishy toys using paints, colours and creative details. Ideal for children’s events, family days and youth-focused activations.',
        image: '/images/activations/images/Squishy%20Bar.webp',
        projects: [],
      },
      {
        id: 'decoden',
        title: 'Decoden',
        description:
          'A playful customisation experience where guests decorate accessories using decoden cream, charms and decorative pieces. Popular options include jewellery boxes, mirrors, phone cases, hairbrushes and other accessories.',
        image: '/images/activations/images/Decoden.webp',
        projects: [],
      },
      {
        id: 'fluid-art-bar',
        title: 'Fluid Art Bar',
        description:
          'A dynamic, hands-on art experience where guests create one-of-a-kind pieces using fluid pouring techniques and vibrant colour combinations. The activation can be adapted across sculptural bears, canvases, figurines and other selected surfaces, with colours and forms customised to suit the brand or event concept.',
        image: '/images/activations/images/Fluid%20Art%20Bar.webp',
        projects: [
          {
            client: 'Hive Board Game Café',
            subject: 'Monopoly-Inspired Fluid Art',
            caption:
              'A playful fluid art activation where guests customised dollar-sign sculptures using bold colour combinations and fluid pouring techniques.',
            images: ['/images/activations/images/Hive%20Board%20Game%20Caf%C3%A9%20%E2%80%94%20Monopoly-Inspired%20Fluid%20Art.webp'],
          },
        ],
      },
    ],
  },
]

export default activationGroups
