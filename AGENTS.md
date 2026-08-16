# AGENTS.md

Personal site (Ari Gestetner). Stack: Nuxt 4 + Vue 3.5 + Nuxt Content v3 + Nuxt UI v3, TypeScript, npm. The repo lives in `/home/coder/PersonalWebsite` — the workspace root `/` is the home directory, not the repo.

## Commands

- `npm run dev` / `npm run build` / `npm run generate` / `npm run preview`
- `npm run lint` / `npm run lint:fix` — eslint via `@nuxt/eslint` (config re-exports generated `.nuxt/eslint.config.mjs`)
- No test or typecheck scripts exist (`@nuxt/test-utils` is registered as a module but unused). Verify with lint + build.
- `postinstall` runs `nuxt prepare`, which regenerates `.nuxt/` and the eslint config — after editing `nuxt.config.ts` or `content.config.ts`, expect these to be regenerated.

## Content architecture (read this before touching content)

- `content.config.ts` defines four collections but only two are active: `mydata` and `myrepo`. The `content` and `docs` collections are commented out.
- `myrepo` is the entire site's markdown source: `source: { repository: 'https://github.com/Ariges770/PersonalWebsiteObsidian' }`. It is cloned at dev/build time, so dev and build need network + git access to GitHub. All page routes (`app/pages/[...slug].vue`, `app/pages/blog/[...slug].vue`) query `queryCollection('myrepo')`; the blog list filters `path LIKE /blog%` and `draft = false`.
- Local `content/blog/*.md` and `content/mycards/*.json` are **not** matched by any active collection — editing them does not change the site.
- `mydata` = `content/mydata/*.json` (e.g. `PersonalContactInfo.json`), used by `app/pages/contact.vue`.

## Rendering quirks

- Markdown is rendered with `ContentRenderer`; MDC syntax is active via `@nuxtjs/mdc`.
- Custom pattern: `<style>` blocks inside markdown are hoisted into `<head>` by `app/composables/loadStyles.ts` (the same logic is duplicated inline in `app/pages/[...slug].vue`). It filters `style` entries out of `body.value` and injects them via `useHead`/`useState('myStyles')`. Keep both copies in sync.
- `app/utils/compilerOptions/isCustomElement.ts` marks tags starting with `mjx` or `test` as custom elements (MathJax output in templates).
- Math: `remark-math` + `rehype-mathjax/chtml` (fonts from the jsdelivr CDN). `rehype-katex` is installed but not wired up — don't assume it's active.
- Other markdown config: `remark-behead` (depth 0), `remark-gfm`, highlight theme `material-theme-lighter` with langs py/python/r/javascript/js/bash, TOC depth/searchDepth 3 — all in the `content.build.markdown` block of `nuxt.config.ts`.

## @nuxtjs/mdc is vendored — planned migration

- `package.json` pins `"@nuxtjs/mdc": "file:nuxtjs-mdc-0.18.4.tgz"` (tarball in repo root). Do not change this to a registry version; `@nuxt/content` itself depends on `^0.18.3` and the tarball pin is deliberate. `nuxtjs-mdc-0.17.2.tgz` is stale — ignore it.
- Goal: replace MDC with comark. When changing anything, follow **only** the official Nuxt, Nuxt Content, and comark documentation — no guidance from other sources.

## Environment quirks

- `nuxt-mail` reads env vars: `NUXT_MAIL_TARGET`, `NUXT_MAIL_SMPT` (note the misspelling — keep it), `NUXT_MAIL_PORT`, `NUXT_MAIL_USERNAME`, `NUXT_MAIL_PASSWORD`. `.env` is gitignored; no `.env.example` exists.
- Dev runs behind a Coder proxy. `nuxt.config.ts` sets `vite.server.allowedHosts: true`, `Cache-Control: no-store` on the dev server, and `optimizeDeps.include` for `@vercel/analytics/nuxt`, `@vue/devtools-*`, `@tato30/vue-pdf`. `server/middleware/cache-control.ts` also sets `no-store` on every response (including production) — account for it before adding any caching.
- Global styling is hand-maintained CSS imported in `app.vue` from `app/assets/css/` (`main.css`, `gfm-styles.css`, `tm-template.css`) plus Font Awesome vendored under `app/assets/fontawesome/`.
- PDFs live in `public/pdf/` and are rendered client-side with `@tato30/vue-pdf` via `app/components/pdf/*.client.vue`.
- `README.md` is the unmodified Nuxt starter boilerplate with a stale snippet at the end — trust config and code, not the README.

## Scratch pages

- `app/pages/home.vue` just redirects to `/`. `app/pages/template.vue` and `app/pages/blog/temp.vue` are unlinked scratch pages — don't build on them.
