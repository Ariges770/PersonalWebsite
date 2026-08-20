import { promises as fs } from 'node:fs'
import { join, resolve } from 'node:path'

// Serves files from the cloned content source (the Obsidian repo under
// `.data/content/`), so frontmatter `img` paths and markdown attachments
// resolve to real URLs at runtime.
export default defineEventHandler(async (event) => {
  const rel = getRouterParam(event, 'path') || ''
  const contentDir = resolve(process.cwd(), '.data', 'content')

  let repoDir = contentDir
  try {
    const entries = await fs.readdir(contentDir)
    const repo = entries.find((e) => e.startsWith('github-'))
    if (repo) repoDir = join(contentDir, repo)
  } catch {
    repoDir = contentDir
  }

  const root = resolve(repoDir) + '/'
  const file = resolve(repoDir, rel)
  if (!file.startsWith(root)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  try {
    const data = await fs.readFile(file)
    const ext = rel.split('.').pop()?.toLowerCase()
    const mime = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      webp: 'image/webp',
      avif: 'image/avif',
      pdf: 'application/pdf',
    }[ext ?? ''] ?? 'application/octet-stream'
    setHeader(event, 'content-type', mime)
    setHeader(event, 'cache-control', 'public, max-age=86400')
    return data
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }
})
