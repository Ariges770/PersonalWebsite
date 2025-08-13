import isCustomElement from "./utils/compilerOptions/isCustomElement"


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  plugins: [],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    ['nuxt-mail', {
      message: {
        to: process.env.NUXT_MAIL_TARGET
      },
      smtp: {
        host: process.env.NUXT_MAIL_SMPT,
        port: process.env.NUXT_MAIL_PORT,
        secure: true,
        auth: {
          user: process.env.NUXT_MAIL_USERNAME,
          pass: process.env.NUXT_MAIL_PASSWORD
        }
      }
    }
    ]
  ],
  content: {
    build: {
      markdown: {
        rehypePlugins: {
          'rehype-mathjax/chtml': {
            options: {
              chtml: {
                fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
              }
            }
          },
        },
        remarkPlugins: {
          'remark-math': {},
          'remark-behead': {
            options: {
              depth: 0
            }
          },
          'remark-gfm': {
            options: {

            }
          }
        },
        highlight: {
          theme: "material-theme-lighter",
          langs: [
            "py", "python", "r", "javascript", "js", "bash"
          ]
        }
      }
    }
  },
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: isCustomElement
  //   }
  // }
})