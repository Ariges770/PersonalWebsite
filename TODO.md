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


## Refactor
- [ ] Refactor styles to use CSS variables
- [ ] Use template -> script -> styles for vue files
- [ ] Fix ts types for props (TemplateHeader)

## remark-gfm
- [x] Fix checkboxes in gfm rendering (https://github.com/micromark/micromark-extension-gfm-task-list-item#css)
- [ ] Add support for strikethrough (or something similar to nitice checked box)



## Features
- [ ] Design footer to work with site style
- [ ] Add TOC to left of content (possibly configurable)

### Contact form
- [ ] Add email support to contact form
- [ ] Add server api which sends email from server side (client side can leak api keys)
- [ ] Add email validation to contact form (if nodemailer doesn't do it)
- [ ] Add captcha to contact form (https://cloud.google.com/security/products/recaptcha)

### Content
- [ ] Allow for pdf blogs (which will use json for metadata)

