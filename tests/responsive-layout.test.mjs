import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('the page and showcase remain inside narrow viewports', () => {
  const css = read('src/index.css')
  const showcase = read('src/components/projects/ProjectShowcaseCard.jsx')

  assert.match(css, /html,\s*body,\s*#root\s*\{[^}]*overflow-x:\s*clip/s)
  assert.match(showcase, /w-\[min\(calc\(100vw-2rem\),28\.75rem\)\]/)
})

test('primary actions adapt safely across phone widths', () => {
  const certificate = read('src/components/home/CertificatesSection.jsx')
  const contact = read('src/components/home/ContactSection.jsx')
  const modal = read('src/components/home/ProjectModal.jsx')
  const grid = read('src/components/projects/ProjectGrid.jsx')

  assert.match(certificate, /grid grid-cols-1 sm:grid-cols-2/)
  assert.match(certificate, /w-full sm:w-auto/)
  assert.match(contact, /flex flex-col sm:flex-row/)
  assert.match(contact, /w-full sm:w-auto/)
  assert.match(modal, /flex flex-wrap items-center/)
  assert.match(grid, /flex flex-col sm:flex-row/)
})

test('navigation and footer use touch-safe mobile layouts', () => {
  const navbar = read('src/components/Navbar.jsx')
  const footer = read('src/components/ui/footer-section.tsx')

  assert.match(navbar, /min-h-11 min-w-11/)
  assert.match(navbar, /max-h-\[calc\(100svh-6rem\)\] overflow-y-auto/)
  assert.match(footer, /grid-cols-1[^"\n]*sm:grid-cols-2[^"\n]*lg:grid-cols-4/)
  assert.match(footer, /min-h-11/)
})

test('dense content uses compact mobile spacing without changing desktop rhythm', () => {
  const css = read('src/index.css')
  const experience = read('src/components/home/ExperienceSection.jsx')
  const page = read('src/pages/ProjectsPage.jsx')

  assert.match(css, /padding-block:\s*clamp\(3\.75rem,\s*8vw,\s*7\.5rem\)/)
  assert.match(experience, /p-4 sm:p-6/)
  assert.match(page, /pt-28 sm:pt-36/)
})

test('the featured projects heading matches the other section headings', () => {
  const projects = read('src/components/home/ProjectsSection.jsx')

  assert.match(projects, /text-3xl sm:text-4xl/)
  assert.doesNotMatch(projects, /projects-heading/)
})
