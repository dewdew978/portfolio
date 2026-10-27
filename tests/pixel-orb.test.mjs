import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Pixel Orb is a reusable decorative SVG with optional pointer tracking', () => {
  const component = read('src/components/brand/PixelOrb.jsx')

  assert.match(component, /function PixelOrb/)
  assert.match(component, /size = 'md'/)
  assert.match(component, /interactive = false/)
  assert.match(component, /aria-hidden="true"/)
  assert.match(component, /<svg/)
  assert.match(component, /onPointerMove/)
  assert.match(component, /pixel-orb__eye/)
  assert.match(component, /pixel-orb__particle/)
  assert.match(component, /pixel-orb__data-ring/)
  assert.match(component, /pixel-orb__core/)
})

test('Pixel Orb animations respect reduced motion and theme contrast', () => {
  const css = read('src/components/brand/PixelOrb.css')

  assert.match(css, /@keyframes pixel-orb-float/)
  assert.match(css, /@keyframes pixel-orb-blink/)
  assert.match(css, /@keyframes pixel-orb-particle/)
  assert.match(css, /@keyframes pixel-orb-ring/)
  assert.match(css, /#22d3ee/)
  assert.match(css, /prefers-reduced-motion:\s*reduce/)
  assert.match(css, /\[data-theme='dark'\]/)
})

test('Navbar and Hero use compact and interactive Pixel Orbs', () => {
  const navbar = read('src/components/Navbar.jsx')
  const hero = read('src/components/home/HeroSection.jsx')

  assert.match(navbar, /<PixelOrb[\s\S]*size="sm"[\s\S]*interactive/)
  assert.match(navbar, /Pawarit<\/span>/)
  assert.match(hero, /<PixelOrb\s+size="lg"\s+interactive/)
  assert.match(hero, /profiledew\.jpg/)
})

test('interactive Pixel Orb exposes an accessible repeatable excited reaction', () => {
  const component = read('src/components/brand/PixelOrb.jsx')
  const css = read('src/components/brand/PixelOrb.css')

  assert.match(component, /useState\(false\)/)
  assert.match(component, /700/)
  assert.match(component, /clearTimeout/)
  assert.match(component, /aria-label="ทำให้ Pixel Orb ตื่นเต้น"/)
  assert.match(component, /pixel-orb--excited/)
  assert.match(component, /pixel-orb__excited-eye/)
  assert.match(component, /pixel-orb__burst/)
  assert.match(css, /@keyframes pixel-orb-excite/)
  assert.match(css, /@keyframes pixel-orb-burst/)
  assert.match(css, /\.pixel-orb--excited/)
  assert.match(css, /prefers-reduced-motion:[\s\S]*pixel-orb--excited/)
})

test('Navbar orb preserves home navigation and a 44px touch target', () => {
  const component = read('src/components/brand/PixelOrb.jsx')
  const css = read('src/components/brand/PixelOrb.css')
  const navbar = read('src/components/Navbar.jsx')

  assert.match(component, /onActivate/)
  assert.match(component, /onActivate\?\.\(\)/)
  assert.match(navbar, /<PixelOrb[\s\S]*onActivate=/)
  assert.match(navbar, /navigate\('\/'\)/)
  assert.match(css, /pixel-orb--sm\.pixel-orb--interactive[\s\S]*min-width:\s*44px/)
  assert.match(css, /pixel-orb--sm\.pixel-orb--interactive[\s\S]*min-height:\s*44px/)
})
