import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('preloader plays once per session and is skipped for reduced-motion users', () => {
  const app = read('src/App.jsx')
  assert.match(app, /sessionStorage\.getItem\(PRELOADER_SEEN_KEY\)/)
  assert.match(app, /sessionStorage\.setItem\(PRELOADER_SEEN_KEY/)
  assert.match(app, /prefers-reduced-motion: reduce/)
  assert.doesNotMatch(app, /sessionStorage\.removeItem/)
})

test('fullpage scrolling falls back to native scrolling for reduced-motion users', () => {
  const hook = read('src/hooks/useFullpageScroll.js')
  assert.match(hook, /prefers-reduced-motion: reduce/)
  assert.match(hook, /handleWheel = \(e\) => \{[\s\S]*?if \(prefersReducedMotion\(\)\) return/)
  assert.match(hook, /handleKeyDown = \(e\) => \{[\s\S]*?if \(prefersReducedMotion\(\)\) return/)
  assert.doesNotMatch(hook, /behavior: 'smooth'/)
  assert.match(read('src/index.css'), /@media \(prefers-reduced-motion: reduce\)[\s\S]*?scroll-behavior: auto/)
})

test('social share image is a dedicated 1200x630 card', () => {
  const html = read('index.html')
  assert.ok(existsSync(new URL('../public/og-image.jpg', import.meta.url)))
  assert.match(html, /<meta property="og:image:width" content="1200"/)
  assert.match(html, /<meta property="og:image:height" content="630"/)
})

test('contact section links to GitHub and the resume', () => {
  const contact = read('src/components/home/ContactSection.jsx')
  assert.match(contact, /https:\/\/github\.com\/dewdew978/)
  assert.match(contact, /Pawarit-Pansing-CV\.pdf/)
})
