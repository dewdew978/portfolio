import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('layout system gives Thai headings safe spacing and responsive display sizes', () => {
  const css = read('src/index.css')
  assert.match(css, /html\[lang="th"\]/)
  assert.match(css, /\.display-heading/)
  assert.match(css, /clamp\(/)
  assert.match(css, /line-height:\s*1\.18/)
})

test('major pages use shared site container and section spacing', () => {
  const files = ['AboutSection.jsx', 'SkillsSection.jsx', 'ExperienceSection.jsx', 'ContactSection.jsx']
  for (const file of files) {
    const source = read(`src/components/home/${file}`)
    assert.match(source, /site-container/)
    assert.match(source, /section-space/)
  }
  assert.match(read('src/components/home/ProjectsSection.jsx'), /text-3xl sm:text-4xl/)
  assert.match(read('src/pages/ProjectsPage.jsx'), /display-heading/)
})

test('hero omits the availability badge and insight tagline block', () => {
  const hero = read('src/components/home/HeroSection.jsx')
  assert.doesNotMatch(hero, /t\.hero\.badge/)
  assert.doesNotMatch(hero, /t\.hero\.taglineLead/)
  assert.doesNotMatch(hero, /t\.hero\.taglineBold/)
  assert.doesNotMatch(hero, /t\.hero\.taglineEnd/)
})

test('light theme is the default when no preference has been saved', () => {
  const app = read('src/App.jsx')
  assert.match(app, /localStorage\.getItem\('theme'\) \|\| 'light'/)
  assert.doesNotMatch(app, /localStorage\.getItem\('theme'\) \|\| 'dark'/)
})

test('experience section keeps education and removes the two selected experience cards', () => {
  const experience = read('src/components/home/ExperienceSection.jsx')

  assert.doesNotMatch(experience, /t\.experience\.cmccTitle/)
  assert.doesNotMatch(experience, /t\.experience\.aiBiTitle/)
  assert.match(experience, /t\.experience\.eduDegree/)
})
