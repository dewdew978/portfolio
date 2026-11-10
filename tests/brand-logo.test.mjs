import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('brand logo asset exists as standalone SVG with vector paths', () => {
  assert.ok(existsSync(new URL('../public/assets/pawarit-logo.svg', import.meta.url)))
  const svg = read('public/assets/pawarit-logo.svg')

  assert.match(svg, /<svg[^>]*viewBox=/)
  assert.match(svg, /fill="currentColor"/)
  assert.match(svg, /<path[^>]*d=/)
  assert.match(svg, /aria-label="Pawarit Logo"/)
})

test('PawaritLogo React component is reusable with theme adaptive currentColor', () => {
  assert.ok(existsSync(new URL('../src/components/brand/PawaritLogo.jsx', import.meta.url)))
  const component = read('src/components/brand/PawaritLogo.jsx')

  assert.match(component, /export default function PawaritLogo/)
  assert.match(component, /viewBox="79\.0 314\.0 655\.2 154\.0"/)
  assert.match(component, /fill="currentColor"/)
  assert.match(component, /className=\{className\}/)
  assert.match(component, /role="img"/)
  assert.match(component, /aria-label="Pawarit"/)
})

test('Navbar and Footer integrate PawaritLogo with accessible fallback text', () => {
  const navbar = read('src/components/Navbar.jsx')
  const footer = read('src/components/ui/footer-section.tsx')

  // Navbar brand
  assert.match(navbar, /import PawaritLogo from '@\/components\/brand\/PawaritLogo'/)
  assert.match(navbar, /<PawaritLogo[\s\S]*\/>/)
  assert.match(navbar, /<span className="sr-only">Pawarit<\/span>/)

  // Footer brand
  assert.match(footer, /import PawaritLogo from '@\/components\/brand\/PawaritLogo'/)
  assert.match(footer, /<PawaritLogo[\s\S]*\/>/)
})
