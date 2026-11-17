// Runs after `vite build`.
//
// GitHub Pages serves a file for every URL it knows about and falls back to
// 404.html (with HTTP status 404) for everything else. A single-page app only
// ships index.html, so /projects and /projects/<id> would reach visitors but
// tell search engines "404". This script writes a real HTML file for each route
// with that page's own title, description, canonical URL and social preview,
// regenerates sitemap.xml, and keeps 404.html as the SPA fallback.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const indexPath = path.join(distDir, 'index.html')

const SITE_URL = 'https://pawarit.tech'
const DEFAULT_LANG = 'th'
const NAME = 'Pawarit Pansing (ปวริศ ปัญสิงห์ - ดิว)'

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const truncate = (text, max = 300) => {
  const clean = String(text).replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max - 1).trimEnd()}…` : clean
}

const absoluteUrl = (urlPath) => (/^https?:\/\//.test(urlPath) ? urlPath : `${SITE_URL}/${String(urlPath).replace(/^\//, '')}`)

const setTag = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`postbuild: could not find ${label} in index.html`)
  return html.replace(pattern, replacement)
}

const setMeta = (html, attr, key, value) =>
  setTag(
    html,
    new RegExp(`<meta ${attr}="${key.replace(/[.:]/g, '\\$&')}" content="[^"]*"\\s*/?>`),
    `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`,
    `${attr}="${key}"`
  )

function renderPage(template, { title, description, url, image, imageAlt }) {
  let html = template
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`, '<title>')
  html = setMeta(html, 'name', 'description', description)
  html = setTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`, 'canonical link')
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'name', 'twitter:url', url)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', description)
  if (image) {
    html = setMeta(html, 'property', 'og:image', image)
    html = setMeta(html, 'name', 'twitter:image', image)
    // The project screenshot has its own size; drop the share card's fixed dimensions
    html = html.replace(/\s*<meta property="og:image:(?:width|height)" content="[^"]*"\s*\/?>/g, '')
    if (imageAlt) html = setMeta(html, 'property', 'og:image:alt', imageAlt)
  }
  return html
}

function writeRoute(routePath, html) {
  const dir = path.join(distDir, routePath)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

function buildSitemap(urls, lastmod) {
  const entries = urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

async function loadProjects() {
  // Load the app's own modules through Vite so the '@' alias and import.meta.env work
  const server = await createServer({
    root: rootDir,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false },
  })
  try {
    const { translations } = await server.ssrLoadModule('/src/locales/translations.js')
    const { getLocalizedProjects } = await server.ssrLoadModule('/src/utils/projects.js')
    return getLocalizedProjects(translations[DEFAULT_LANG])
  } finally {
    await server.close()
  }
}

async function main() {
  if (!fs.existsSync(indexPath)) {
    throw new Error('postbuild: dist/index.html not found; run vite build first')
  }
  const template = fs.readFileSync(indexPath, 'utf8')

  // SPA fallback for any other URL
  fs.copyFileSync(indexPath, path.join(distDir, '404.html'))

  const projects = await loadProjects()

  writeRoute(
    'projects',
    renderPage(template, {
      title: `ผลงานและโปรเจกต์ทั้งหมด (Projects) | ${NAME}`,
      description: `รวมผลงานและเคสศึกษาการวิเคราะห์ข้อมูล ${projects.length} โปรเจกต์ของ ดิว - ปวริศ ปัญสิงห์ (Pawarit Pansing / ปวริศ / ปัญสิงห์)`,
      url: `${SITE_URL}/projects/`,
    })
  )

  for (const [key, project] of projects) {
    writeRoute(
      `projects/${key}`,
      renderPage(template, {
        title: `${project.title} | ${NAME}`,
        description: truncate(`${project.title}: ${project.overview}`),
        url: `${SITE_URL}/projects/${key}/`,
        image: project.image ? absoluteUrl(project.image) : undefined,
        imageAlt: project.title,
      })
    )
  }

  const lastmod = new Date().toISOString().slice(0, 10)
  // Trailing slashes match how GitHub Pages serves directory index files (no redirect hop)
  const urls = [`${SITE_URL}/`, `${SITE_URL}/projects/`, ...projects.map(([key]) => `${SITE_URL}/projects/${key}/`)]
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap(urls, lastmod))

  console.log(`✓ postbuild: 404.html, ${projects.length + 1} route pages, sitemap.xml (${urls.length} URLs)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
