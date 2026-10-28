import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('index.html contains comprehensive SEO tags for personal branding', () => {
  const html = read('index.html')

  // Title includes both English and Thai names + Role
  assert.match(html, /Pawarit Pansing/)
  assert.match(html, /ปวริศ ปัญสิงห์/)
  assert.match(html, /Data/)

  // Google Search Console verification
  assert.match(html, /<meta name="google-site-verification" content="y2G3DkCRNnwlofSIuaDwhAGATrReT9b4MJpwYIIUCVY"\s*\/?>/)

  // Canonical tag
  assert.match(html, /<link rel="canonical" href="https:\/\/dewdew978\.github\.io\/portfolio\/"\s*\/?>/)

  // Meta author & robots
  assert.match(html, /<meta name="author" content="Pawarit Pansing"\s*\/?>/)
  assert.match(html, /<meta name="robots" content="index,\s*follow"\s*\/?>/)

  // Meta keywords
  assert.match(html, /<meta name="keywords"/)
  assert.match(html, /Pawarit Pansing/)
  assert.match(html, /ปวริศ ปัญสิงห์/)

  // Open Graph
  assert.match(html, /<meta property="og:title"/)
  assert.match(html, /<meta property="og:description"/)
  assert.match(html, /<meta property="og:url" content="https:\/\/dewdew978\.github\.io\/portfolio\/"\s*\/?>/)
  assert.match(html, /<meta property="og:image" content="https:\/\/dewdew978\.github\.io\/portfolio\/profiledew.jpg"\s*\/?>/)
  assert.match(html, /<meta property="og:site_name" content="Pawarit Pansing Portfolio"\s*\/?>/)

  // Twitter cards
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"\s*\/?>/)
  assert.match(html, /<meta name="twitter:title"/)
  assert.match(html, /<meta name="twitter:description"/)
  assert.match(html, /<meta name="twitter:image" content="https:\/\/dewdew978\.github\.io\/portfolio\/profiledew.jpg"\s*\/?>/)

  // JSON-LD Structured Data
  assert.match(html, /<script type="application\/ld\+json">/)
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  assert.ok(jsonLdMatch, 'JSON-LD script block must exist')
  const jsonLd = JSON.parse(jsonLdMatch[1])
  assert.equal(jsonLd['@context'], 'https://schema.org')
  assert.ok(jsonLd['@graph'] || jsonLd['@type'], 'Must define graph or type')

  const graph = jsonLd['@graph'] || [jsonLd]
  const profilePage = graph.find(n => n['@type'] === 'ProfilePage')
  assert.ok(profilePage, 'Must define ProfilePage')
  assert.ok(profilePage.mainEntity, 'Google requires mainEntity on ProfilePage')

  const personNode = profilePage.mainEntity
  assert.equal(personNode['@type'], 'Person')
  assert.equal(personNode.name, 'Pawarit Pansing')
  assert.equal(personNode.alternateName, 'ปวริศ ปัญสิงห์')
  assert.ok(personNode.sameAs?.includes('https://www.linkedin.com/in/pawarit-pansing-5744a435b/'))
  assert.ok(personNode.sameAs?.includes('https://github.com/dewdew978'))
})

test('public/robots.txt exists and allows indexing with sitemap reference', () => {
  assert.ok(existsSync(new URL('../public/robots.txt', import.meta.url)))
  const robots = read('public/robots.txt')
  assert.match(robots, /User-agent:\s*\*/)
  assert.match(robots, /Allow:\s*\//)
  assert.match(robots, /Sitemap:\s*https:\/\/dewdew978\.github\.io\/portfolio\/sitemap\.xml/)
})

test('public/sitemap.xml exists and defines routes', () => {
  assert.ok(existsSync(new URL('../public/sitemap.xml', import.meta.url)))
  const sitemap = read('public/sitemap.xml')
  assert.match(sitemap, /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/)
  assert.match(sitemap, /<loc>https:\/\/dewdew978\.github\.io\/portfolio\/<\/loc>/)
  assert.match(sitemap, /<loc>https:\/\/dewdew978\.github\.io\/portfolio\/projects<\/loc>/)
})

test('pages use usePageSEO hook for dynamic titles and meta descriptions', () => {
  assert.ok(existsSync(new URL('../src/hooks/usePageSEO.js', import.meta.url)))
  const homePage = read('src/pages/HomePage.jsx')
  const projectsPage = read('src/pages/ProjectsPage.jsx')
  assert.match(homePage, /usePageSEO/)
  assert.match(projectsPage, /usePageSEO/)
})
