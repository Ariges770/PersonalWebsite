# AGENTS.md

Personal site (Ari Gestetner). Stack: Nuxt 4 + Vue 3.5 + Nuxt Content v3 + Nuxt UI v3, TypeScript, npm. The repo lives in `/home/coder/PersonalWebsite` — the workspace root `/` is the home directory, not the repo.

## Commands

- `npm run dev` / `npm run build` / `npm run generate` / `npm run preview`
- `npm run lint` / `npm run lint:fix` — eslint via `@nuxt/eslint` (config re-exports generated `.nuxt/eslint.config.mjs`)
- No test or typecheck scripts exist (`@nuxt/test-utils` is registered as a module but unused). Verify with lint + build.
- `postinstall` runs `nuxt prepare`, which regenerates `.nuxt/` and the eslint config — after editing `nuxt.config.ts` or `content.config.ts`, expect these to be regenerated.

## Content architecture (read this before touching content)

- `content.config.ts` defines four collections but only two are active: `mydata` and `myrepo`. The `content` and `docs` collections are commented out.
- `myrepo` is the entire site's markdown source: `source: { repository: 'https://github.com/Ariges770/PersonalWebsiteObsidian' }`. It is cloned at dev/build time, so dev and build need network + git access to GitHub. All page routes (`app/pages/[...slug].vue`, `app/pages/blog/[...slug].vue`) query `queryCollection('myrepo')`; the blog list filters `path LIKE /blog%` and `draft = false` — but **only in production** (`import.meta.prod`), so dev shows drafts too (`app/pages/blog/index.vue`).
- Local `content/blog/*.md` and `content/mycards/*.json` are **not** matched by any active collection — editing them does not change the site.
- `mydata` = `content/mydata/*.json` (e.g. `PersonalContactInfo.json`), used by `app/pages/contact.vue`.

## Rendering architecture (comark, not MDC)

- Markdown is parsed **at build time by a custom transformer**: `transformers/comark.ts` replaces Nuxt Content's built-in MDC markdown transformer (`defineTransformer({ name: 'markdown', extensions: ['.md'] })`). It runs `createMarkdownParser` (cached) with comark plugins — `shiki` (material themes, langs python/r/javascript/bash), `math`, `emoji`, `toc({ depth: 4, searchDepth: 4 })` (covers h2–h5), `headings` — and stores the comark AST in the DB as `body: { type: 'minimark', value: nodes, toc }`, spreading frontmatter top-level so `draft`/`title`/`desc` stay queryable.
- **Changing a transformer is not enough to refresh parsed content.** Nuxt Content caches parsed output per file in `.data/content/contents.sqlite` (dev) with a checksum that does *not* include `content.build.transformers` — after editing `transformers/comark.ts`, delete `.data/content/contents.sqlite` and restart dev/build, otherwise the dev log shows "N cached, 0 parsed" and old output keeps serving. (`content.build.markdown` options do invalidate, transformer changes don't.)
- `transformers/math.ts` is a **fork of `comark/plugins/math`** with Obsidian-compatible inline math: no content-start digit guard (`$270 + 60 = 2187$` is math), a closer `$` followed by a digit is currency (rejected pair burned as text, scanning resumes after it — `$x/$5` text, `$x/$5 and $y$` → `y` math), closer preceded by whitespace or opener followed by whitespace is not math. Display `$$` and block rules unchanged. On comark upgrades, diff against upstream `comark/plugins/math` and re-apply. Known residual edge: comark's `autoClose` appends a closing `$` to a last line with an odd `$` count, so a lone money `$...` on a file's last line becomes math.
- Rendering goes through `app/components/ContentRenderer.global.vue` — a global override of Nuxt Content's `ContentRenderer` that renders `<MarkdownDocument>` from the minimark body with `math: Math` mapped and KaTeX CSS imported. Pages keep using `<ContentRenderer :value="content" />` unchanged.
- When changing rendering, follow **only** the official Nuxt, Nuxt Content, and comark documentation — no guidance from other sources.
- Version discipline: `comark` and `@comark/nuxt` are pinned **exact** (no `^`) in `package.json`. Before upgrading, read comark release notes/migration guides (they make breaking changes in minors, e.g. component renames), then run lint + build and verify math/highlight/custom components/blog list. The transformer + renderer bridge is not maintained by comark's team (they moved their docs off Nuxt Content to `comark-content` in Aug 2026) — upgrading comark may require fixing the bridge.
- Legacy (dead) code, kept commented out: style-hoisting logic in `app/composables/loadStyles.ts` and inline in `app/pages/[...slug].vue` (was needed for MathJax + MDC). `app/utils/compilerOptions/isCustomElement.ts` was deleted (MDC artifact).

## Environment quirks

- `nuxt-mail` reads env vars: `NUXT_MAIL_TARGET`, `NUXT_MAIL_SMPT` (note the misspelling — keep it), `NUXT_MAIL_PORT`, `NUXT_MAIL_USERNAME`, `NUXT_MAIL_PASSWORD`. `.env` is gitignored; no `.env.example` exists.
- Dev runs behind a Coder proxy. `nuxt.config.ts` sets `vite.server.allowedHosts: true`, `Cache-Control: no-store` on the dev server, and `optimizeDeps.include` for `@vercel/analytics/nuxt`, `@vue/devtools-*`, `@tato30/vue-pdf`. `server/middleware/cache-control.ts` also sets `no-store` on every response (including production) — account for it before adding any caching.
- Global styling is hand-maintained CSS imported in `app.vue` from `app/assets/css/` (`main.css`, `gfm-styles.css`, `tm-template.css`) plus Font Awesome vendored under `app/assets/fontawesome/`.
- PDFs live in `public/pdf/` and are rendered client-side with `@tato30/vue-pdf` via `app/components/pdf/*.client.vue`.
- `README.md` is the unmodified Nuxt starter boilerplate with a stale snippet at the end — trust config and code, not the README.

## Scratch pages

- `app/pages/home.vue` just redirects to `/`. `app/pages/template.vue` and `app/pages/blog/temp.vue` are unlinked scratch pages — don't build on them.
