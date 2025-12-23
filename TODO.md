# Things TODO

## Mathjax
- [ ] Change to chtml from svg
```ts
'rehype-mathjax/chtml': {
  options: {
    chtml: {
      fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
    }
  }
},
```

- [ ] Add docs and tests for MDC changes
- [ ] Push changes to MDC repo 

## Bugs  
- [ ] Fix issue with dark mode and code blocks (code blocks not changing in dark mode)
- [x] FA icons not rendering

## Refactor
- [x] Refactor styles to use CSS variables
- [ ] Use template -> script -> styles for vue files
- [x] Fix ts types for props (TemplateHeader)

## remark-gfm
- [x] Fix checkboxes in gfm rendering (https://github.com/micromark/micromark-extension-gfm-task-list-item#css)
- [ ] Add support for strikethrough (or something similar to nitice checked box)



## Features
- [ ] Design footer to work with site style
- [ ] Add TOC to left of content (possibly configurable), https://mokkapps.de/blog/create-a-table-of-contents-with-active-states-in-nuxt-3

### Contact form
- [ ] Add email support to contact form
- [ ] Add server api which sends email from server side (client side can leak api keys)
- [ ] Add email validation to contact form (if nodemailer doesn't do it)
- [ ] Add captcha to contact form (https://cloud.google.com/security/products/recaptcha)

### Content
- [ ] Allow for pdf blogs (which will use json for metadata)
- [ ] Add --- support for blogs to add preview text (inject automatically if not included to first paragraph)
- [ ] Add support for custom components in markdown (like alerts, callouts, theorems and proofs etc)
- [ ] Add nicer looking code blocks
- [ ] Create template for blog pages
- [ ] Add support for tags and categories for blogs
- [ ] Add support for blog series (multiple blogs in a series)
- [ ] Add support for related blogs at end of blog posts
- [ ] Add support for blog authors (multiple authors per blog)
- [ ] Create template tags and categories for blogs. (date-published, draft, backlinks, author, tags)
- [ ] Default image, https://damieng.com/blog/2025/02/14/improved-content-articles-in-nuxt3/

## Quarto
- [ ] Create lua plugin for mdc components
- [ ] Create markdown quarto template

## Resume
- [ ] Create quarto template
- [ ] Create latex, markdown and docx resume outputs