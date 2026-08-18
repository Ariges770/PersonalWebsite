// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // coder: vite preview (dev v2) — allow the Coder proxy host, never cache dev
  // modules (the Coder proxy adds a long max-age to uncached responses, which
  // poisons browsers with stale module graphs), pre-optimize lazy deps so
  // Vite does not re-optimize mid-session, and disable lazy dep discovery
  // entirely (the general fix — no package ever triggers a mid-session
  // re-bundle, regardless of what the repo imports).
  vite: {
    server: {
      allowedHosts: true,
      headers: {
        'Cache-Control': 'no-store',
      },
    },
    optimizeDeps: {
      include: ["@vercel/analytics/nuxt","@vue/devtools-core","@vue/devtools-kit","@tato30/vue-pdf","@comark/vue","@comark/nuxt/plugins/math"],
      noDiscovery: true,
    },
  },


  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  plugins: [],
  css: ['katex/dist/katex.min.css'],
  fonts: {
    families: [
      // Self-hosted/unknown font in app/assets/css/main/base.css — do not
      // resolve it via any @nuxt/fonts provider (dev-time fetch of the bunny
      // provider fails on flaky networks and breaks app boot).
      { name: 'Source Sans Pro', provider: 'none' },
    ],
  },
  modules: [
    '@nuxt/content',
    '@comark/nuxt',
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
      transformers: ['~~/transformers/comark']
    }
  }
})
