// ~/data/blogs.js

// Block types (for reference)
// - heading: { type: 'heading', level?: 2|3|4, text }
// - paragraph: { type: 'paragraph', text, html?: true }
// - image: { type: 'image', src, alt, caption? }
// - list: { type: 'list', ordered?: true, items: [] }
// - spacer: { type: 'spacer', size?: 'sm'|'md'|'lg' }

export const blogs = [
    {
        slug: 'how-art-helps-kids-grow-beyond-the-canvas',
        title: 'How Art Helps Kids Grow Beyond the Canvas',
        date: '2025-09-03',
        metaDescription:
            'Art activities help children build emotional strength, motor skills, confidence, and communication through hands-on creative learning.',
        heroImage: '/images/blogs/blog1/01.webp',
        // card data
        excerpt:
            'From motor skills to social confidence—here’s how creative play and art workshops nurture growth well beyond the canvas.',
        coverThumb: '/images/blogs/blog1/01.webp',
        tags: ['Kids', 'Workshops', 'Learning'],

        // page blocks
        blocks: [
            {
                type: 'paragraph',
                html: true,
                text:
                    'Art offers more than creative output. Participating in <a href="/experiences/workshops">art workshops</a> can shape the young mind, enhance thinking, and give them a medium to express themselves. Indulging in art supports both emotional development and essential life skills.'
            },

            { type: 'heading', level: 2, text: 'Strengthening cognitive and physical growth' },
            {
                type: 'paragraph',
                text:
                    'Art encourages cognitive development in children such as improving fine motor control and hand eye coordination. Activities such as painting, moulding clay, resin art or collaging build precision in them and prepare them for simple daily tasks such as handwriting, tying shoelaces, and using tools. Art requires them to choose colours, decide shapes, and plan compositions which engage cognitive functions that support memory development, spatial reason, and ability to be creative and optimistic a problem solver.'
            },
            {
                type: 'image',
                src: '/images/blogs/blog1/01.webp',
                alt: 'Child painting with both hands',
                caption:
                    'A child explores paint with both hands, building motor skills and early cognitive connections through sensory play | Picture Courtesy — Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: 'Supporting emotional development and expression' },
            {
                type: 'image',
                src: '/images/blogs/blog1/02.webp',
                alt: 'Glow art session',
                caption:
                    'Children use bold colours to express feelings through painting, gaining emotional clarity and learning to communicate experiences nonverbally | Picture Courtesy- Meraki Art Studio'
            },
            {
                type: 'paragraph',
                text:
                    'Children often do not comprehend complex emotions or how to communicate them. Art becomes a nonverbal medium. Drawing a stormy sky or a joyful face allows children to externalise experiences, which helps them process them more calmly. Art helps young minds with social anxiety. Tactile experiences such as motion of a brush or assembling a pattern gives children moments of emotional regulation. In doing so, they gain tools for managing tension and understanding emotional responses.'
            },

            { type: 'heading', level: 2, text: 'Encouraging communication and social confidence' },
            {
                type: 'image',
                src: '/images/blogs/blog1/03.webp',
                alt: 'Kids showing artwork',
                caption:
                    'Children interact while painting together, building language skills and learning to collaborate through shared creative experiences | Picture Courtesy- Meraki Art Studio'
            },
            {
                type: 'paragraph',
                text:
                    'Motivating children to attend art workshops introduces them to group settings, thus building communication. Such settings actively induce a sense of community by sharing supplies, talking about their art, or learning a new method from a peer. Collaborating over artwork fosters descriptive narrative and communication skills. Explaining ideas and their artwork, both help develop clarity in speaking and ability to interpret others’ perspectives. '
            },

            { type: 'heading', level: 2, text: 'Top five benefits of art for children' },
            {
                type: 'paragraph',
                text:
                    'Engrossing in art brings broad developmental advantages. Here are five ways art impacts a young growing mind-'
            },
            {
                type: 'list',
                ordered: true,
                items: [
                    'Strengthens hand control and visual tracking further improving writing and drawing.',
                    'Supports emotional regulation and stress relief through structured creativity.',
                    'Collaboration and conversations develop social skills, vocabulary, and storytelling.',
                    'Creates the ability to interact and perform in a social environment with confidence.',
                    'Increases resilience by allowing mistakes and experimenting without judgement.'
                ]
            },

            { type: 'heading', level: 2, text: 'Encouraging creative growth in daily life' },
            {
                type: 'image',
                src: '/images/blogs/blog1/04.webp',
                alt: 'Child at Meraki workshop',
                caption:
                    'A child engages with colour freely, building confidence and imagination through everyday creative exploration encouraged in early art education | Picture Courtesy- Meraki Art Studio'
            },
            {
                type: 'paragraph',
                html: true,
                text:
                    'Accepting art does not require expensive stationery or technical skills. Children benefit from simple experiences like drawing with chalk, folding paper, or shaping clay. What matters is the freedom to create without pressure. At Meraki Art Studio in Dubai, we offer a safe space to make, display, and discuss art. We encourage an environment which prioritises efforts rather than focusing on outcome. This helps children remain curious and open to try new things. Meraki’s workshops in Dubai are designed for inclusive artistic exploration. Through workshops such as resin, fluid painting, and other guided activities, we encourage young minds to engage their senses and grow with confidence. If you want to explore our range of workshops for your children, get in touch with us or visit our website for activity options.'
            },

            {
                type: 'paragraph',
                text:
                    'Art is not just an activity. It is a gentle partner in growth, nurturing confidence, communication, coordination, and emotional awareness. With regular exposure, children gain skills that support them across all areas of learning.'
            },
            { type: 'spacer', size: 'lg' }
        ]
    },
    {
        slug: 'inside-the-resin-room-tips-from-our-artists',
        title: 'Inside the resin room: Tips from our artists',
        date: '2025-09-01',
        metaDescription:
            'Practical guidance on resin art with tips from artists in Dubai, covering tools, safety, and classes for beginners and experienced creators.',
        heroImage: '/images/blogs/blog2/01.webp',
        // card data
        excerpt:
            'Practical guidance on resin art with tips from artists in Dubai, covering tools, safety, and classes for beginners and experienced creators.',
        coverThumb: '/images/blogs/blog2/01.webp',
        tags: ['Kids', 'Workshops', 'Learning'],

        // page blocks
        blocks: [
            {
                type: 'paragraph',
                html: true,
                text:
                    'Resin art is the new trend in art with artists using epoxy with charms, colours, and even sparkles for a glossy art piece. At Meraki Art Studio, we see resin as an exquisite medium to the process of discovering colours, textures, and free form in art. Our art workshops in Dubai have grown popular with our newer approaches in the resin art sessions. Let us take a look at how to get started with resin art.'
            },

            { type: 'heading', level: 2, text: 'Getting started with resin' },
            {
                type: 'paragraph',
                text:
                    'If you’re wondering how to make resin art, the process begins with two materials, Epoxy resin and hardener. It is crucial to understand the material before you start. Epoxy resin is a complicated compound and must be handled with caution for safety and efficiency during art. It requires precision in proportions of mixture. Resin offers you a flexibility to choose pigments, tools, and surfaces to explore the canvas and let your imagination flow.'
            },
            {
                type: 'image',
                src: '/images/blogs/blog2/01.webp',
                alt: 'Resin offers not fluidity',
                caption:
                    'Resin offers not fluidity but flexibility to your creativity | Picture courtesy- Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: 'Here are a few safety tips before getting started with the resin' },
            {
                type: 'image',
                src: '/images/blogs/blog2/02.webp',
                alt: 'Here are a few safety tips',
                caption:
                    'Gloves, plastic sheet and other safety tips to begin working with epoxy | Picture courtesy- Seed & Spark'
            },
            {
                type: 'list',
                ordered: true,
                items: [
                    'It is pivotal to work in a space with ample airflow.',
                    'Keep a silicone or plastic sheet over the surface.',
                    'It is recommended to wear gloves.',
                    'If you’re planning for a longer indoor session, we advise you to throw on a mask.'
                ]
            },
            {
                type: 'paragraph',
                text:
                    'These simple safety steps allow you to focus on creativity without concern.'
            },

            { type: 'heading', level: 2, text: 'Art tips and tricks' },
            {
                type: 'paragraph',
                text:
                    'In Meraki’s workshops for resin classes in Dubai, we have designed a few tips to help learners avoid common beginner mistakes.'
            },
            { type: 'heading', level: 2, text: 'Mix slowly and completely' },
            {
                type: 'image',
                src: '/images/blogs/blog2/03.webp',
                alt: 'Kids showing artwork',
                caption:
                    'Mixing the Epoxy resin with hardener in accurate proportions | Picture courtesy- Meraki Art Studio'
            },
            {
                type: 'paragraph',
                text:
                    'Stirring rapidly may generate bubbles in the final fix. Blend the resin and hardener using a silicone spatula steadily for a smooth finish. Scrape the side of your cup to avoid sticky patches later.'
            },
            { type: 'heading', level: 2, text: 'Warm the resin if required' },
            {
                type: 'image',
                src: '/images/blogs/blog2/04.webp',
                alt: 'Warm the resin',
                caption:
                    'Warm the resin for desired consistency using warm water | Picture courtesy- Art Resin'
            },
            {
                type: 'paragraph',
                text:
                    'If your resin has turned very thick during the procedure, do not worry! Gently place the sealed resin bottle in warm water for a few minutes and it will be the perfect consistency in no time. This process also helps reduce air bubbles.'
            },
            { type: 'heading', level: 2, text: 'Work in layers' },
            {
                type: 'image',
                src: '/images/blogs/blog2/05.webp',
                alt: 'Pouring resin in layers',
                caption:
                    'Pouring resin in layers rather than all together | Picture courtesy- Meraki Art Studio'
            },
            {
                type: 'paragraph',
                text:
                    'You might have often seen a depth in the resin artwork. This can be achieved by pouring the resin in layers, little by little. Adding the next layer after the previous has cured. This will keep your process in control and design subtle.'
            },
            { type: 'heading', level: 2, text: 'Use basic, reusable tools' },
            {
                type: 'image',
                src: '/images/blogs/blog2/06.webp',
                alt: 'Basic reusable tools for resin art',
                caption:
                    'Basic reusable tools for resin art | Picture courtesy- Art resin'
            },
            {
                type: 'paragraph',
                text:
                    'The most commonly recommended tools in art studio resin classes are silicone stirrers, measuring cups, and small spatulas. They are easy to clean and perfect for reusing in creative resin projects.'
            },
            { type: 'heading', level: 2, text: 'Clear air bubble with care' },
            {
                type: 'image',
                src: '/images/blogs/blog2/07.webp',
                alt: 'Removing bubbles in resin using a heat gun',
                caption:
                    'Removing bubbles in resin using a heat gun | Picture courtesy- Art resin'
            },
            {
                type: 'paragraph',
                text:
                    'For all kids exploring resin art, approach this step is only under parental guidance. A heat gun or small torch can be used across the surface to release all the bubbles trapped in the resin. But be mindful not to hold it steady in one spot for long.'
            },

            { type: 'heading', level: 2, text: 'Learning through practice' },
            {
                type: 'paragraph',
                text:
                    'Learners of epoxy art in Dubai have often shared that each session brings a new discovery to them. Each pigment flows differently, layers set at their own pace, and every outcome is a surprise. This is the beauty of resin art. For beginners, a strong start often comes from attending resin classes in Dubai, where support and feedback shape a creative learning process. Workshops are designed not to yield perfection but to introduce the skills without a newbie fear and build confidence, one pour at a time. At Meraki art studio, we carefully outline our workshops to bring you a creative outlet that guides you in the process. We ensure that with time, each pour becomes more intentional, more balanced, and more enjoyable for you. To explore our resin art workshops, visit our website www.merakiartstudio.ae.'
            }
        ]
    },
    {
        slug: 'throwing-a-creative-birthday-party-heres-what-you-need-to-know',
        title: 'Throwing a Creative Birthday Party? Here’s What You Need to Know',
        date: '2025-08-28',
        metaDescription:
            'Plan a kids art birthday party in Dubai with hands-on activities, fun workshops, and a checklist to make creative celebrations easy to organise.',
        heroImage: '/images/blogs/blog3/01.webp',
        // card data
        excerpt:
            'Plan a kids art birthday party in Dubai with hands-on activities, fun workshops, and a checklist to make creative celebrations easy to organise.',
        coverThumb: '/images/blogs/blog3/01.webp',
        tags: ['Kids', 'Workshops', 'Learning'],

        // page blocks
        blocks: [
            {
                type: 'paragraph',
                html: true,
                text:
                    'Birthday can be a core memory for your little one with creativity at the core of the theme for the party! Many peers are opting for an art themed birthday party over the cliche sugar overdose and decor options. These themes are inclusive and enjoyable to all the young guests who enjoy painting, clay, or mixed media. Meraki art studio at Dubai provides meaningful options that explore beyond the conventional party entertainment.'
            },
            {
                type: 'image',
                src: '/images/blogs/blog3/01.webp',
                alt: 'A paint therapy for art expression at birthday party',
                caption:
                    'A paint therapy for art expression at birthday party | Picture courtesy- Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: 'Creative birthday party ideas in Dubai' },
            {
                type: 'image',
                src: '/images/blogs/blog3/02.webp',
                alt: 'Kids enjoying canvas painting in a birthday party',
                caption:
                    'Kids enjoying canvas painting in a birthday party | Picture courtesy- Tickikids'
            },
            {
                type: 'paragraph',
                text:
                    'Meraki offers a dedicated environment where children can engage with colour, texture, and materials through guided art sessions. They indulge the young minds in a playful setting with a group of instructors dedicated to conduct these art sessions for varying age groups. At Meraki creative birthday parties in Dubai, kids create something of their own and also take it home. In this article, we’ve put forth a checklist to help you plan an engaging and stress free birthday celebration for your kid.'
            },
            { type: 'heading', level: 2, text: 'A complete birthday party checklist for Dubai' },
            {
                type: 'image',
                src: '/images/blogs/blog3/03.webp',
                alt: 'Integrating kid’s beloved themes in the art theme of the party at Meraki',
                caption:
                    'Integrating kid’s beloved themes in the art theme of the party at Meraki | Picture courtesy- Meraki Art Studio'
            },
            { type: 'heading', level: 2, text: '1. Select the right venue' },
            {
                type: 'paragraph',
                text:
                    'Arrange for a space which reduces hurdles to a free movement of kids. Studios at Meraki are designed for birthday sessions and customised to conduct painting, clay, and craft activities.'
            },
            { type: 'heading', level: 2, text: '2. Finalise the activity' },
            {
                type: 'paragraph',
                text:
                    'Choosing the activities prehand helps schedule the day. Art parties can have activities from canvas painting, fluid art, to neon and ceramic colouring. It is also crucial to choose activities that match the interests and age group of participants.'
            },
            { type: 'heading', level: 2, text: '3. Send invitations early' },
            {
                type: 'paragraph',
                text:
                    'It is beneficial to inform parents about the art activities involved in the party so there are no surprises. This will also help them dress their children appropriately.'
            },
            { type: 'heading', level: 2, text: '4. Provide personalised aprons or shirts' },
            {
                type: 'paragraph',
                text:
                    'This is a simple yet meaningful gesture to protect the clothing as well as a party souvenir.'
            },
            { type: 'heading', level: 2, text: '5. Confirm all materials in advance' },
            {
                type: 'paragraph',
                text:
                    'Ensure your venue is ready with supplies for all planned activities. Meraki birthday packages include all supplies and decor for your kid’s dream art birthday party.'
            },
            { type: 'heading', level: 2, text: '6. Arrange simple refreshments' },
            {
                type: 'paragraph',
                text:
                    'Planning the menu is crucial for an art themed party. Food needs to be easy to handle for kids and safe around paints. Finger foods and packaged drinks are the best options in these settings.'
            },
            { type: 'heading', level: 2, text: '7. Include entertainment alongside art activities' },
            {
                type: 'paragraph',
                text:
                    'Even with art as the focus, a short music game or storytelling session can help keep children engaged during breaks or while eating.'
            },
            { type: 'heading', level: 2, text: '8. Plan time for the artwork to dry before collection' },
            {
                type: 'paragraph',
                text:
                    'It takes time for paint or glue to set before they can be carried home with children. This buffer time can be used for cake, group pictures, or some other interactive games.'
            },
            { type: 'heading', level: 2, text: '9. Add DIY birthday party ideas with takeaway kits' },
            {
                type: 'paragraph',
                text:
                    'DIY birthday party ideas work best with a small kit of art supplies to go with the kids. It extends the experience beyond the studio.'
            },
            { type: 'heading', level: 2, text: '10. Start you Dubai birthday party planning early' },
            {
                type: 'paragraph',
                text:
                    'Birthday party planning at Dubai should begin early, especially if your birthdays are around the holidays to avoid venue clashes and lesser RSVPs.'
            },
            {
                type: 'image',
                src: '/images/blogs/blog3/04.webp',
                alt: 'Elevated moods of kids while indulged in art',
                caption:
                    'Elevated moods of kids while indulged in art | Picture courtesy- Meraki Studio'
            },
            {
                type: 'paragraph',
                text:
                    'If you are seeking kid’s birthday party ideas in Dubai, Meraki has to offer creative prepositions beyond bounce houses and entertainers. At Meraki art studio, each party is a balance of celebration and creativity, making it one of the most trusted choices for parents in Dubai. If you’re curious to know more about the art themed kid’s birthday parties, contact us at www.merakiartstudio.ae/about/contact. '
            }
        ]
    },
    {
        slug: 'top-5-diy-projects-you-can-try-this-weekend',
        title: 'Top 5 DIY Art Projects You Can Try This Weekend',
        date: '2025-08-21',
        metaDescription:
            'Turn weekends into mini art festivals with 5 DIY projects using Dubai art supplies. Create useful crafts with a splash of colour and a dose of imagination.',
        heroImage: '/images/blogs/blog4/01.webp',
        // card data
        excerpt:
            'Turn weekends into mini art festivals with 5 DIY projects using Dubai art supplies. Create useful crafts with a splash of colour and a dose of imagination.',
        coverThumb: '/images/blogs/blog4/01.webp',
        tags: ['Kids', 'Workshops', 'Learning'],

        // page blocks
        blocks: [
            {
                type: 'paragraph',
                html: true,
                text:
                    'DIY crafts is an exquisite approach to slow down, connect with yourself, and create simple moments of joy. The psychological effect of activities such as creating art is profound and serene. DIY crafts can be anything from using an old light bulb for painting to origami. While crafts are often classified as hobbies, they have a deep and immediate impact on your mood and mind. They build confidence, strengthen skills in everyday life, and provide practical introduction to artistic expression. At Meraki art studio in Dubai, the weekend sessions are carefully designed for an experience with simple materials and myriad inspirational moments for you. Whether you have a spare hour or an entire afternoon, these top five ideas with minimal setup are great for a fulfilling me time at home.'
            },
            {
                type: 'image',
                src: '/images/blogs/blog4/01.webp',
                alt: 'DIY Craft at Meraki Art Studio',
                caption:
                    'DIY Craft at Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: '1. Jar lanterns outshining the pickles' },
            {
                type: 'image',
                src: '/images/blogs/blog4/02.webp',
                alt: 'Fairytale theme painted empty jar bottles to make lanterns',
                caption:
                    'Fairytale theme painted empty jar bottles to make lanterns | Picture Courtesy- Adventure in a box'
            },
            {
                type: 'paragraph',
                text:
                    'Before you toss those empty jam jars into the bin, take a look at this glow-up. Grab some acrylic paints, a handful of sequins and charms, and a brush and begin the transformation. If you’re unsure about the charms, shop your art kit and tools at Meraki. You can add a tea light or fairy lights inside the jar for a shimmery lantern on your side table.'
            },
            { type: 'heading', level: 2, text: '2. Desk organiser you never knew you needed' },
            {
                type: 'image',
                src: '/images/blogs/blog4/03.webp',
                alt: 'Cardboard boxes wrapped in paper for DIY organiser',
                caption:
                    'Cardboard boxes wrapped in paper for DIY organiser | Picture Courtesy- Paperit'
            },
            {
                type: 'paragraph',
                text:
                    'Use your empty cereal cartons to create these DIY organisers for your drawers and cupboards. Grab your paints, brushes, and some washi tape. Layer the boxes with colour, hand-drawn doodles, or geometric shapes and glue the cut out boxes together. Decorate with pull tabs, labels and decorate your wardrobe, jewellery drawer, or your workspace with your own handmade organiser.'
            },
            { type: 'heading', level: 2, text: '3. Coasters that deserve compliments' },
            {
                type: 'image',
                src: '/images/blogs/blog4/04.webp',
                alt: 'DIY coasters from cardboard and fabric | Picture Courtesy- DIY joy',
                caption:
                    'DIY coasters from cardboard and fabric | Picture Courtesy- DIY joy'
            },
            {
                type: 'paragraph',
                text:
                    'We all have a collection of small rags, useless lids, or other small things we save for later. Time to dig into that stash. Cut out small cardboard in your desired shapes and make your own DIY coasters. Use a coat of craft or fabric glue to stick the fabric on the surface and leave it to dry under a heavy textbook to bring the design together.'
            },
            { type: 'heading', level: 2, text: '4. The noticeboard that gets noticed' },
            {
                type: 'image',
                src: '/images/blogs/blog4/05.webp',
                alt: 'Old canvas or cardboard customised for a noticeboard | Picture Courtesy- Craft-o-maniac',
                caption:
                    'Old canvas or cardboard customised for a noticeboard | Picture Courtesy- Craft-o-maniac'
            },
            {
                type: 'paragraph',
                text:
                    'If you’re flooding your refrigerator with sticky notes and ending up ignoring the reminders on there, this is for you. Use an old canvas or cardboard and wrap around a paper of your choice. You can explore with coloured or patterned chartpaper. Add some ribbons or draw a few doodles to personalise it. And voila! You have a dedicated space for all your to-do lists, coupons, and drawings. Put it on the counter top or hang it on the wall to feel mildly organised every morning.'
            },
            { type: 'heading', level: 2, text: '5. Tote bag that speaks for you' },
            {
                type: 'image',
                src: '/images/blogs/blog4/06.webp',
                alt: 'Paint a tote for customised tote bags',
                caption:
                    'Paint a tote for customised tote bags | Picture Courtesy- Contemporary arts center'
            },
            {
                type: 'paragraph',
                text:
                    'Start with a plain canvas tote and a little creative nerve. Get your hands on some fabric paint, sponges, your fingers, or cups and dishes to make patterns and prints. Go for some abstract and edgy composition to show off or paint a background to add some text. Everytime you leave the door with your DIY tote bag and someone asks where did you get that? Enjoy the ‘I made it!’ DIY projects make room for your creativity and leave something lasting and useful. At Meraki art studio, DIY projects are often shaped into weekend workshops welcoming all age groups in the world of art where art is not just made but lived with and used everyday. To explore more about such art workshops visit our website http://www.merakiartstudio.ae.'
            }
        ]
    },
    {
        slug: 'artist-spotlight-the-story-behind-the-dubai-art-studio',
        title: 'Artist Spotlight: The Story Behind the Dubai Art Studio',
        date: '2025-09-29',
        metaDescription:
            'Meet the artists behind our Dubai art studio. Discover their story, creative journey, and the vision that shapes our workshops and experiences.',
        heroImage: '/images/blogs/blog5/01.webp',
        // card data
        excerpt:
            'Meet the artists behind our Dubai art studio. Discover their story, creative journey, and the vision that shapes our workshops and experiences.',
        coverThumb: '/images/blogs/blog5/01.webp',
        tags: ['Kids', 'Workshops', 'Learning'],

        // page blocks
        blocks: [
            {
                type: 'paragraph',
                html: true,
                text:
                    'Built on the values of self-expression through art, the Meraki is a Dubai art studio, not limited to trained artists. Open to anyone curious enough to pick a brush, pour resin, or find joy in slime. Every session is about connection and every creation begins with exploring the creativity within.'
            },
            {
                type: 'image',
                src: '/images/blogs/blog5/01.webp',
                alt: 'Meraki Art Studio, Dubai',
                caption:
                    'Meraki Art Studio, Dubai'
            },

            { type: 'heading', level: 2, text: 'Meet Our Dubai Art Studio Team' },
            {
                type: 'image',
                src: '/images/blogs/blog5/02.webp',
                alt: 'Inside the studio, a Meraki instructor engages participants in a hands-on session',
                caption:
                    'Inside the studio, a Meraki instructor engages participants in a hands-on session, encouraging ideas to take shape through conversation and creative focus.'
            },
            {
                type: 'paragraph',
                text:
                    'At Meraki, we’re not a team but a family. The people at Meraki play a central role in shaping the experience. From the moment you walk in, you are welcomed not just into a studio but into a creative family. Kenneth greets with a cheerful hello at the front desk while Kalyani, one of the artists, helps ease creative hesitation and encourages confidence in new learners. The party host and hands behind our social media, Patrica brings a sense of celebration with her. Nono brings the glow to the studio, both metaphorically and literally, with her work with neon. Our managing director, Neetu ensures the smooth working of every workshop and the unsung hero, Shiv keeps the space spotless so everyone else can focus on the art. Together, they represent the spirit of this art community in Dubai and bring the space to life every single day.'
            },
            { type: 'heading', level: 2, text: 'Talk about founders, mission, values' },
            {
                type: 'image',
                src: '/images/blogs/blog4/03.webp',
                alt: 'Founders Kajol and Pooja, alias Kay and Pooh',
                caption:
                    'Founders Kajol and Pooja, alias Kay and Pooh'
            },
            {
                type: 'paragraph',
                text:
                    'Founded in 2018, Meraki, a creative studio in Dubai, is a shared dream between Kajol and Pooja, alias Kay and Pooh, who believed that creativity could bring people together. Over time, this small idea grew into one of the most inviting studios in Dubai. Their goal was never just to teach art, but to make art accessible, meaningful, and healing. This art studio story in Dubai reflects a commitment to creativity as a personal and collective experience. Meraki welcomes people of all ages to slow down, express themselves, and connect through colour and sparkle. At its heart, the studio values joy, presence, and community over perfection.'
            },
            { type: 'heading', level: 2, text: 'Benefits of Art for Kids' },
            {
                type: 'image',
                src: '/images/blogs/blog5/04.webp',
                alt: 'Every brushstroke becomes a way for children to understand themselves better and share what words often cannot express',
                caption:
                    'Every brushstroke becomes a way for children to understand themselves better and share what words often cannot express'
            },
            {
                type: 'paragraph',
                text:
                    'In a fast paced world, creative play gives children a space to slow down and explore who they are. Meraki’s art workshops in Dubai are designed with this in mind. The sessions help young artists feel seen, heard, and celebrated. Whether through vibrant bear-making or fluid art, children learn to follow their curiosity, solve problems visually, and express emotions in non-verbal ways.'
            },
            { type: 'heading', level: 2, text: 'How to Choose the Right Workshop' },
            {
                type: 'paragraph',
                text:
                    'The best way to choose is to begin with curiosity. Resin workshops are social and high energy fun while formats inspired by art therapy offer deeper personal reflection and rejuvenation. Whether you’re joining as a family, solo, or a group, Meraki’s team has something to offer for every experience. It is this openness that has made the studio a favourite for those looking for behind the scenes art studio experiences or even an informal artist interview in Dubai. If you’re ready to explore art in a way that feels personal and fulfilling, you can browse our workshops or learn about our story on www.merakiartstudio.ae'
            }
        ]
    }

    // Add your other 4 blogs here with the same shape
];

export function getAllBlogs() {
    return blogs;
}
export function getBlogBySlug(slug) {
    return blogs.find((b) => b.slug === slug);
}