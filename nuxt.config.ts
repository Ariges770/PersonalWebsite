// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

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
  ]
})