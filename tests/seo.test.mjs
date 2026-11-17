import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('index.html contains comprehensive SEO tags for personal branding', () => {
  const html = read('index.html')

  // Title includes both English and Thai names + Role
  assert.match(html, /Pawarit Pansing/)
  assert.match(html, /ปวริศ ปัญสิงห์/)
  assert.match(html, /ดิว/)
  assert.match(html, /Data/)

  // Google Search Console verification
  assert.match(html, /<meta name="google-site-verification" content="y2G3DkCRNnwlofSIuaDwhAGATrReT9b4MJpwYIIUCVY"\s*\/?>/)

  // Canonical tag
  assert.match(html, /<link rel="canonical" href="https:\/\/pawarit\.tech\/"\s*\/?>/)

  // Meta author & robots
  assert.match(html, /<meta name="author" content="Pawarit Pansing[^"]*"\s*\/?>/)
  assert.match(html, /<meta name="robots" content="index,\s*follow"\s*\/?>/)

  // Meta keywords covers all variations: pawarit pansing, pawarit, ปวริศ, ปวริศ ปัญสิงห์, ปัญสิงห์, ดิว
  assert.match(html, /<meta name="keywords"/)
  assert.match(html, /pawarit pansing/i)
  assert.match(html, /pawarit/i)
  assert.match(html, /ปวริศ ปัญสิงห์/)
  assert.match(html, /ปวริศ/)
  assert.match(html, /ปัญสิงห์/)
  assert.match(html, /ดิว/)

  // Open Graph
  assert.match(html, /<meta property="og:title"/)
  assert.match(html, /<meta property="og:description"/)
  assert.match(html, /<meta property="og:url" content="https:\/\/pawarit\.tech\/"\s*\/?>/)
  assert.match(html, /<meta property="og:image" content="https:\/\/pawarit\.tech\/og-image\.jpg"\s*\/?>/)
  assert.match(html, /<meta property="og:site_name" content="Pawarit Pansing[^"]*Portfolio"\s*\/?>/)

  // Twitter cards
  assert.match(html, /<meta name="twitter:card" content="summary_large_image"\s*\/?>/)
  assert.match(html, /<meta name="twitter:title"/)
  assert.match(html, /<meta name="twitter:description"/)
  assert.match(html, /<meta name="twitter:image" content="https:\/\/pawarit\.tech\/og-image\.jpg"\s*\/?>/)

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

  // Alternate names covers all Thai & English search variations
  const altNames = Array.isArray(personNode.alternateName) ? personNode.alternateName : [personNode.alternateName]
  assert.ok(altNames.includes('ปวริศ ปัญสิงห์'))
  assert.ok(altNames.includes('ปวริศ'))
  assert.ok(altNames.includes('ปัญสิงห์'))
  assert.ok(altNames.includes('ดิว'))
  assert.ok(altNames.includes('pawarit'))
  assert.ok(personNode.sameAs?.includes('https://www.linkedin.com/in/pawarit-pansing-5744a435b/'))
  assert.ok(personNode.sameAs?.includes('https://github.com/dewdew978'))
})

test('public/robots.txt exists and allows indexing with sitemap reference', () => {
  assert.ok(existsSync(new URL('../public/robots.txt', import.meta.url)))
  const robots = read('public/robots.txt')
  assert.match(robots, /User-agent:\s*\*/)
  assert.match(robots, /Allow:\s*\//)
  assert.match(robots, /Sitemap:\s*https:\/\/pawarit\.tech\/sitemap\.xml/)
})

test('sitemap.xml is generated at build time with every route', () => {
  const postbuild = read('scripts/postbuild.js')
  assert.match(postbuild, /http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9/)
  assert.match(postbuild, /\$\{SITE_URL\}\/projects\/\$\{key\}\//)
  assert.match(postbuild, /lastmod/)
  assert.ok(!existsSync(new URL('../public/sitemap.xml', import.meta.url)), 'static sitemap would go stale')
})

test('build writes a real HTML file for each route so crawlers get HTTP 200', () => {
  const postbuild = read('scripts/postbuild.js')
  assert.match(postbuild, /writeRoute\(\s*'projects'/)
  assert.match(postbuild, /writeRoute\(\s*`projects\/\$\{key\}`/)
  assert.match(postbuild, /404\.html/)
  for (const tag of ['canonical', 'og:url', 'og:title', 'og:description', 'twitter:title', 'twitter:description']) {
    assert.ok(postbuild.includes(tag), tag)
  }
})

test('case studies use clean /projects/<id> URLs and old ?id links redirect', () => {
  const app = read('src/App.jsx')
  const page = read('src/pages/ProjectsPage.jsx')
  assert.match(app, /path="\/projects\/:projectId"/)
  assert.match(page, /navigate\(`\/projects\/\$\{entry\[0\]\}\/`\)/)
  assert.match(page, /<Navigate to=\{`\/projects\/\$\{legacyProjectId\}\/`\} replace \/>/)
  assert.match(page, /canonicalPath: selectedProject \? `projects\/\$\{/)
  assert.doesNotMatch(page, /setSearchParams|`projects\?id=/)
})

test('pages use usePageSEO hook for dynamic titles and meta descriptions', () => {
  assert.ok(existsSync(new URL('../src/hooks/usePageSEO.js', import.meta.url)))
  const homePage = read('src/pages/HomePage.jsx')
  const projectsPage = read('src/pages/ProjectsPage.jsx')
  assert.match(homePage, /usePageSEO/)
  assert.match(projectsPage, /usePageSEO/)
})

test('site is built for the root of the pawarit.tech custom domain', () => {
  assert.match(read('vite.config.js'), /base: '\/'/)
  assert.equal(read('public/CNAME').trim(), 'pawarit.tech')
  assert.match(read('public/robots.txt'), /Sitemap: https:\/\/pawarit\.tech\/sitemap\.xml/)
  for (const file of ['index.html', 'public/robots.txt', 'src/hooks/usePageSEO.js', 'scripts/postbuild.js']) {
    assert.doesNotMatch(read(file), /dewdew978\.github\.io\/portfolio/, file)
  }
})
