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
  assert.match(read('src/components/home/ProjectsSection.jsx'), /display-heading/)
  assert.match(read('src/pages/ProjectsPage.jsx'), /display-heading/)
})
