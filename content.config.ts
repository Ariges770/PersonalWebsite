import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    mydata: defineCollection({
      type: 'data',
      source: 'mydata/*.json',
      schema: z.object({
        name: z.string(),
        email: z.string().email(),
        address: z.string(),
        phone: z.string().optional(),
        socialMedia: z.object({
          twitter: z.string().url().optional(),
          github: z.string().url().optional(),
          linkedin: z.string().url().optional(),
        }).optional()
      })
    }),
    mycards: defineCollection({
      type: 'data',
      source: 'mycards/*.json',
      schema: z.object({
        title: z.string(),
        desc: z.string(),
        url: z.string().url(),
        src: z.string().url(),
      })
    }),
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        author: z.string(),
        date: z.string(),
        title: z.string(),
        desc: z.string(),
        img: z.string().url(),
        draft: z.boolean().default(true)
        // img: z.string().url().default(`/img/fulls/0${Math.floor(6*Math.random() + 1)}.jpg`),
      })
    }),
    docs: defineCollection({
      // Load every file inside the `content` directory
      source: '**',
      // Specify the type of content in this collection
      type: 'page'
    })
  }
})

