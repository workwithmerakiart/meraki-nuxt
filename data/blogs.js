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
    },
    {
        slug: 'custom-orders-by-meraki-art-studio',
        title: 'Custom Orders by Meraki Art Studio: Thoughtful, Creative & Made Just for You',
        date: '2026-03-26',
        metaDescription:
            'Discover custom orders at Meraki Art Studio Dubai. Personalized gifts, corporate gifting, wedding favors, branded keepsakes and handmade event pieces crafted with care.',
        heroImage: '/images/custom/custom_hero.webp',
        excerpt:
            'From personalized keepsakes to creative event favors, we create handcrafted pieces that feel special, thoughtful, and truly one of a kind.',
        coverThumb: '/images/custom/custom_hero.webp',
        tags: ['Custom Orders', 'Gifting', 'Events'],

        blocks: [
            {
                type: 'paragraph',
                html: true,
                text:
                    'At Meraki Art Studio, we believe the most meaningful pieces are the ones made with intention. Whether you\'re planning a corporate event, a brand activation, a wedding, a birthday, or simply looking for something unique to gift, our <a href="/shop/custom-orders">custom orders</a> are designed to bring your ideas to life in a beautiful and memorable way.'
            },
            {
                type: 'paragraph',
                text:
                    'From personalized keepsakes to creative event favors, we create handcrafted pieces that feel special, thoughtful, and truly one of a kind.'
            },
            {
                type: 'image',
                src: '/images/custom/custom_flora.webp',
                alt: 'Custom floral resin sculpture by Meraki Art Studio',
                caption: 'Custom floral resin preservation at Meraki Art Studio | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: 'What Are Custom Orders at Meraki?' },
            {
                type: 'paragraph',
                text:
                    'Our custom orders are specially curated pieces made for a wide range of occasions and purposes. Every order is tailored based on your theme, colors, branding, event type, quantity, and budget.'
            },
            {
                type: 'list',
                items: [
                    'Corporate gifting',
                    'Brand events & activations',
                    'Weddings & bridal events',
                    'Ramadan / Eid gifting',
                    'Birthday return favors',
                    'Baby showers & celebrations',
                    'Retail collaborations',
                    'Personalized gifts'
                ]
            },

            { type: 'heading', level: 2, text: 'What Can Be Customized?' },
            {
                type: 'paragraph',
                text:
                    'We offer a wide range of creative products and experiences that can be customized for your occasion. Some of our most loved custom orders include:'
            },
            {
                type: 'image',
                src: '/images/custom/custom_large_scale.webp',
                alt: 'Custom large-scale canvas art by Meraki',
                caption: 'Custom large-scale artwork crafted at Meraki Art Studio | Picture Courtesy \u2014 Meraki Art Studio'
            },
            {
                type: 'list',
                items: [
                    'Tasbih / prayer beads',
                    'Perfume bottles',
                    'Resin bookmarks',
                    'Keychains',
                    'Decoden mirrors & accessories',
                    'Jesmonite trays and coasters',
                    'Leather accessories',
                    'Paint-your-own kits',
                    'Creative gift boxes',
                    'Workshop take-home favors',
                    'Handmade keepsakes for events'
                ]
            },
            {
                type: 'paragraph',
                text:
                    'Depending on the project, we can also customize packaging, color palettes, branding and logo placement, tags and name cards, personalized names or initials, and theme-based details.'
            },

            { type: 'heading', level: 2, text: 'Perfect for Events, Brands & Special Occasions' },
            {
                type: 'paragraph',
                text:
                    'One of the reasons clients love custom orders is because they make events feel more personal and elevated.'
            },
            {
                type: 'image',
                src: '/images/custom/1.jpeg',
                alt: 'Custom corporate gifting by Meraki Art Studio',
                caption: 'Custom corporate gifting crafted for brand events | Picture Courtesy \u2014 Meraki Art Studio'
            },
            { type: 'heading', level: 3, text: 'For brands and corporate clients' },
            {
                type: 'paragraph',
                text:
                    'Custom pieces can be created for PR gifting, launch events, influencer boxes, mall activations, team building gifts, and client appreciation gifting.'
            },
            { type: 'heading', level: 3, text: 'For weddings and celebrations' },
            {
                type: 'paragraph',
                text:
                    'Custom favors add a beautiful, memorable touch to bridal showers, wedding welcome gifts, mehendi and haldi favors, baby showers, and birthday return gifts.'
            },
            {
                type: 'paragraph',
                text:
                    'Whether you need 10 pieces or a larger bulk order, we work closely with you to create something that feels aligned with your vision.'
            },

            { type: 'heading', level: 2, text: 'Why Clients Love Custom Orders' },
            {
                type: 'paragraph',
                text:
                    'Custom orders are not just about gifting \u2014 they create an experience. In a world full of generic gifting, custom-made pieces feel much more intentional and leave a lasting impression.'
            },
            {
                type: 'image',
                src: '/images/custom/2.jpeg',
                alt: 'Handcrafted custom pieces by Meraki',
                caption: 'Handcrafted pieces designed for memorable gifting | Picture Courtesy \u2014 Meraki Art Studio'
            },
            {
                type: 'list',
                items: [
                    'Personal',
                    'Creative',
                    'Thoughtful',
                    'Aesthetic',
                    'Memorable',
                    'Brandable'
                ]
            },

            { type: 'heading', level: 2, text: 'How the Process Works' },
            {
                type: 'paragraph',
                text:
                    'We keep the process simple and collaborative.'
            },
            {
                type: 'image',
                src: '/images/custom/3.jpeg',
                alt: 'Custom order process at Meraki Art Studio',
                caption: 'From concept to creation \u2014 our collaborative custom order process | Picture Courtesy \u2014 Meraki Art Studio'
            },
            {
                type: 'list',
                ordered: true,
                items: [
                    'Share your idea \u2014 Tell us what you\'re looking for: product, event, theme, quantity, colors, and timeline.',
                    'We curate options \u2014 Based on your brief, we suggest suitable ideas, finishes, and customizations.',
                    'Sampling / approval \u2014 For certain orders, we can share a sample or reference before final production.',
                    'Production \u2014 Once approved, we begin creating your order with care and attention to detail.',
                    'Delivery / event setup \u2014 Depending on the order, we can arrange pickup, delivery, or event activation support.'
                ]
            },

            { type: 'heading', level: 2, text: 'Can You Customize for My Brand or Event Theme?' },
            {
                type: 'paragraph',
                text:
                    'Absolutely. This is one of our favorite parts of what we do. Whether you want something minimal and elegant, playful and colorful, or luxury and elevated, we can create something that fits beautifully.'
            },
            {
                type: 'list',
                items: [
                    'Your brand colors',
                    'Your campaign concept',
                    'Your event aesthetic',
                    'Your logo / initials',
                    'Your packaging style',
                    'Your occasion'
                ]
            },

            { type: 'heading', level: 2, text: 'Why Choose Meraki for Custom Orders in Dubai?' },
            {
                type: 'paragraph',
                text:
                    'At Meraki, we don\'t believe in one-size-fits-all creativity. We work with both individual clients and brands, and we love transforming simple ideas into beautiful final pieces.'
            },
            {
                type: 'image',
                src: '/images/custom/4.jpeg',
                alt: 'Premium custom orders by Meraki Art Studio Dubai',
                caption: 'Premium handmade custom pieces by Meraki Art Studio | Picture Courtesy \u2014 Meraki Art Studio'
            },
            {
                type: 'list',
                items: [
                    'Attention to detail',
                    'Aesthetic presentation',
                    'Thoughtful finishing',
                    'Creative flexibility',
                    'A premium, handmade touch'
                ]
            },

            { type: 'heading', level: 2, text: 'Let\'s Create Something Meaningful' },
            {
                type: 'paragraph',
                html: true,
                text:
                    'If you\'re looking for custom gifts, personalized favors, branded keepsakes, or handmade event pieces in Dubai, we\'d love to create something with you. Whether it\'s for a special celebration, a brand experience, or a beautiful gift, we\'re here to help bring your idea to life.'
            },
            {
                type: 'paragraph',
                html: true,
                text:
                    'To place a custom order, get in touch with us via WhatsApp or Instagram and our team will guide you through the options. You can also <a href="/shop/custom-orders">submit a custom order inquiry</a> directly on our website.'
            },
            {
                type: 'list',
                items: [
                    'Meraki Art Studio, Dubai',
                    'WhatsApp: +971 50 852 3600',
                    'Instagram: @merakistudio_dubai',
                    'Website: www.merakiartstudio.ae'
                ]
            },
            { type: 'spacer', size: 'lg' }
        ]
    },
    {
        slug: 'corporate-team-building-activities-in-dubai-that-actually-work',
        title: 'Corporate Team Building Activities in Dubai That Actually Work',
        date: '2026-03-26',
        metaDescription:
            'Discover creative corporate team building activities in Dubai. From perfume making to resin art workshops, find team experiences that actually work at Meraki Art Studio.',
        heroImage: '/images/activities/corporate.webp',
        excerpt:
            'The most effective teams are built through shared experiences and creativity. Discover corporate team building activities in Dubai that actually work.',
        coverThumb: '/images/activities/corporate.webp',
        tags: ['Corporate', 'Team Building', 'Workshops'],

        blocks: [
            {
                type: 'paragraph',
                html: true,
                text:
                    'In today\'s fast-paced work culture, teams need more than just meetings, deadlines, and office routines to stay connected. The most effective teams are built through shared experiences, creativity, and meaningful moments outside the usual work environment.'
            },
            {
                type: 'paragraph',
                html: true,
                text:
                    'That\'s where corporate team building activities come in. At <a href="/experiences/activities">Meraki Art Studio</a> in Dubai, we\'ve seen firsthand how the right activity can help teams bond, relax, collaborate, and reconnect \u2014 while still having fun in a beautiful and inspiring setting.'
            },
            {
                type: 'image',
                src: '/images/activities/corporate.webp',
                alt: 'Corporate team building at Meraki Art Studio Dubai',
                caption: 'Corporate team building sessions at Meraki Art Studio | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: 'Why Team Building Matters More Than Ever' },
            {
                type: 'paragraph',
                text:
                    'A strong team doesn\'t happen by accident. When colleagues get the chance to connect in a more relaxed and creative environment, it can lead to:'
            },
            {
                type: 'list',
                items: [
                    'Better communication',
                    'Stronger collaboration',
                    'Improved morale',
                    'Increased creativity',
                    'Reduced stress',
                    'A healthier workplace culture'
                ]
            },
            {
                type: 'paragraph',
                text:
                    'The best part? Team building doesn\'t have to feel forced or awkward. The most successful activities are the ones people genuinely enjoy.'
            },

            { type: 'heading', level: 2, text: 'What Makes a Team Building Activity Actually Effective?' },
            {
                type: 'paragraph',
                text:
                    'Not every team activity creates real connection. The best corporate experiences are interactive, easy to participate in, relaxing but engaging, inclusive for different personalities, memorable, and well-organized.'
            },
            {
                type: 'paragraph',
                text:
                    'People are much more likely to open up, laugh, connect, and enjoy themselves when the activity feels natural \u2014 not like another work task. That\'s why creative workshops have become one of the most popular choices for corporate events in Dubai.'
            },
            {
                type: 'image',
                src: '/images/activities/activities_hero.webp',
                alt: 'Creative activities at Meraki Art Studio',
                caption: 'A vibrant creative space designed for team experiences | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: 'Best Corporate Team Building Activities in Dubai' },

            { type: 'heading', level: 3, text: '1. Perfume Making Workshops' },
            {
                type: 'paragraph',
                html: true,
                text:
                    '<a href="/experiences/workshops">Perfume making</a> is one of the most unique and elevated team building experiences. It allows team members to explore scent, creativity, and personal expression while creating something they can take home. It\'s interactive, sophisticated, and works especially well for office teams, brand teams, leadership groups, and client engagement events.'
            },
            {
                type: 'paragraph',
                text:
                    'It also feels more premium than traditional team building formats, which makes it ideal for companies looking for a more refined experience.'
            },
            {
                type: 'image',
                src: '/images/activities/beauty-blend.webp',
                alt: 'Perfume and beauty blend workshops at Meraki',
                caption: 'Perfume making \u2014 a premium team building experience | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 3, text: '2. Resin Art Workshops' },
            {
                type: 'paragraph',
                html: true,
                text:
                    '<a href="/experiences/activities">Resin workshops</a> are a great choice for teams that want something fun, hands-on, and visually satisfying. Team members can create coasters, trays, bookmarks, and decorative keepsakes. This works especially well because it\'s easy to participate in even if someone doesn\'t consider themselves "creative."'
            },
            {
                type: 'image',
                src: '/images/activities/resin/activities_resin_art.webp',
                alt: 'Resin art workshop at Meraki Art Studio',
                caption: 'Resin art \u2014 fun, hands-on, and visually satisfying | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 3, text: '3. Jesmonite Workshops' },
            {
                type: 'paragraph',
                html: true,
                text:
                    '<a href="/experiences/activities">Jesmonite</a> is a modern and stylish creative activity that\'s perfect for teams looking for something a little different. It\'s ideal for creating coasters, trays, pots, and decorative home pieces. This type of workshop feels modern, premium, and design-led \u2014 making it a great fit for companies who want a more polished team experience.'
            },
            {
                type: 'image',
                src: '/images/activities/jesmonite/activities_jesmonite.webp',
                alt: 'Jesmonite workshop at Meraki Art Studio',
                caption: 'Jesmonite creations \u2014 modern, premium, and design-led | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 3, text: '4. Texture Art & Canvas Painting' },
            {
                type: 'paragraph',
                text:
                    'For teams that want to slow down, disconnect from screens, and enjoy something expressive, painting workshops are a beautiful option. These are especially effective because they encourage relaxation, creative thinking, self-expression, and light conversation. It\'s a great way for team members to unwind while still sharing an experience together.'
            },
            {
                type: 'image',
                src: '/images/activities/other/activities_other_texture.webp',
                alt: 'Texture art workshop at Meraki',
                caption: 'Texture art \u2014 expressive, calming, and collaborative | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 3, text: '5. Collaborative Creative Challenges' },
            {
                type: 'paragraph',
                text:
                    'If you want something more dynamic, group-based creative challenges can also be a fun and effective format. These can include group canvas art, team art stations, custom brand-themed creative sessions, and collaborative installations. This style of activity works well for larger teams and adds an extra layer of teamwork and interaction.'
            },

            { type: 'heading', level: 2, text: 'Why Creative Team Building Works So Well' },
            {
                type: 'paragraph',
                text:
                    'Creative workshops are different from traditional team building because they naturally encourage people to talk, collaborate, share ideas, help each other, and relax. There\'s no pressure to "perform" or compete. Instead, people connect through the process.'
            },
            {
                type: 'paragraph',
                text:
                    'This is especially valuable in today\'s workplace, where teams are often dealing with stress, busy schedules, and digital overload. Creative team building offers a chance to pause, connect, and enjoy a shared experience in a meaningful way.'
            },
            {
                type: 'image',
                src: '/images/activities/other/activities_other_diy.webp',
                alt: 'Team DIY painting session at Meraki',
                caption: 'Teams connecting through creative expression | Picture Courtesy \u2014 Meraki Art Studio'
            },

            { type: 'heading', level: 2, text: 'How to Choose the Right Team Building Activity' },
            {
                type: 'paragraph',
                text:
                    'The best activity depends on your team and the kind of experience you want to create.'
            },
            {
                type: 'list',
                items: [
                    'Something premium and unique \u2014 Choose Perfume Making',
                    'Something fun and hands-on \u2014 Choose Resin Art or Jesmonite',
                    'Something calming and expressive \u2014 Choose Canvas Painting or Texture Art',
                    'A more interactive group experience \u2014 Choose Collaborative Creative Challenges'
                ]
            },
            {
                type: 'paragraph',
                text:
                    'At Meraki, we can also help curate the right workshop based on your team size, budget, event duration, team preferences, occasion or celebration, and brand style or event theme.'
            },

            { type: 'heading', level: 2, text: 'Why Dubai Companies Are Choosing Creative Team Building' },
            {
                type: 'paragraph',
                text:
                    'Dubai companies are moving away from generic team lunches and repetitive office activities. Instead, they\'re choosing experiences that feel more memorable, more engaging, more meaningful, and more aligned with modern workplace culture.'
            },
            {
                type: 'paragraph',
                text:
                    'Creative workshops offer a fresh alternative that people actually look forward to. And unlike many one-time event formats, your team leaves with something they made themselves \u2014 which makes the experience even more memorable.'
            },

            { type: 'heading', level: 2, text: 'Corporate Team Building at Meraki Art Studio' },
            {
                type: 'paragraph',
                html: true,
                text:
                    'At <a href="/experiences/activities">Meraki Art Studio</a>, we offer thoughtfully curated corporate team building workshops in Dubai for teams, brands, and organizations looking for something creative, elevated, and genuinely enjoyable.'
            },
            {
                type: 'image',
                src: '/images/activities/activities_block2.webp',
                alt: 'Meraki Art Studio creative space',
                caption: 'Our studio \u2014 designed for creative team experiences | Picture Courtesy \u2014 Meraki Art Studio'
            },
            {
                type: 'paragraph',
                text:
                    'We can host small teams, large groups, brand activations, employee engagement sessions, client experiences, and wellness-inspired team events. Our workshops can be tailored based on your team size, budget, event duration, brand style, team preferences, and occasion.'
            },

            { type: 'heading', level: 3, text: 'Hosted at Our Studio or Your Location' },
            {
                type: 'paragraph',
                text:
                    'We can host your corporate workshop at our Meraki Art Studio in Dubai, or we can bring the experience to your office, event venue, showroom, or preferred location for added convenience. This makes it easy for teams to enjoy a creative and engaging activity without needing to travel far or manage complicated logistics.'
            },

            { type: 'heading', level: 3, text: 'Food & Refreshment Options Available' },
            {
                type: 'paragraph',
                text:
                    'To make the experience even more enjoyable, we also offer food and refreshment options that can be added to your team building session. Depending on your event, this can include light bites, coffee and beverages, add-on catering options, and custom celebration setups.'
            },

            { type: 'heading', level: 2, text: 'Let\'s Plan a Team Experience Your Team Will Actually Enjoy' },
            {
                type: 'paragraph',
                html: true,
                text:
                    'If you\'re looking for corporate team building activities in Dubai that feel fresh, creative, and memorable, we\'d love to help. Whether you want a <a href="/experiences/workshops">perfume workshop</a>, <a href="/experiences/activities">resin session</a>, creative art activity, or a fully customized team experience, Meraki can curate something that works beautifully for your team.'
            },
            {
                type: 'paragraph',
                html: true,
                text:
                    'We also offer on-site workshops at your location, studio-hosted sessions, food & refreshment add-ons, and custom setups for teams and brands. To plan your next corporate workshop, <a href="/shop/custom-orders">get in touch with us</a> and our team will be happy to help curate the right experience for your group.'
            },
            {
                type: 'list',
                items: [
                    'Meraki Art Studio, Dubai',
                    'WhatsApp: +971 50 852 3600',
                    'Instagram: @merakistudio_dubai',
                    'Website: www.merakiartstudio.ae'
                ]
            },
            { type: 'spacer', size: 'lg' }
        ]
    }
];

export function getAllBlogs() {
    return blogs;
}
export function getBlogBySlug(slug) {
    return blogs.find((b) => b.slug === slug);
}