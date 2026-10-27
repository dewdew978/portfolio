import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('home project showcase is draggable, accessible, and links to all projects', () => {
  const source = read('src/components/home/ProjectsSection.jsx')
  assert.match(source, /motion/)
  assert.match(source, /aria-label=.*carousel/i)
  assert.doesNotMatch(source, /previousProject|nextProject|ArrowLeft|ArrowRight/)
  assert.doesNotMatch(source, /padStart/)
  assert.match(source, /to="\/projects"/)
  assert.match(source, /useMotionValue/)
  assert.match(source, /onDragEnd/)
  assert.match(source, /useAnimationFrame/)
  assert.match(source, /loopProjects/)
  assert.match(source, /onMouseEnter/)
  assert.match(source, /onDragStart/)
  assert.match(read('src/components/projects/ProjectShowcaseCard.jsx'), /onMouseMove/)
})

test('projects page route uses shared localized project data and existing modal', () => {
  const app = read('src/App.jsx')
  const page = read('src/pages/ProjectsPage.jsx')
  const grid = read('src/components/projects/ProjectGrid.jsx')
  const helper = read('src/utils/projects.js')
  assert.match(app, /path="\/projects"/)
  assert.match(page, /getLocalizedProjects/)
  assert.match(page, /ProjectModal/)
  assert.match(grid, /filterAll/)
  assert.match(helper, /projectsData/)
  assert.match(read('src/components/ui/footer-section.tsx'), /homeAnchor/)
})

test('showcase uses concise localized titles without replacing full project titles', () => {
  const translations = read('src/locales/translations.js')
  const showcase = read('src/components/projects/ProjectShowcaseCard.jsx')
  const grid = read('src/components/projects/ProjectGrid.jsx')
  const modal = read('src/components/home/ProjectModal.jsx')

  for (const title of ['ExamHub', 'CMCC 2025', 'US Accident Analytics']) {
    assert.equal([...translations.matchAll(new RegExp(`showcaseTitle: '${title}'`, 'g'))].length, 2)
  }

  assert.match(showcase, /project\.showcaseTitle\s*\|\|\s*project\.title/)
  assert.match(grid, /<h2[^>]*>\{p\.title\}<\/h2>/)
  assert.match(modal, /<h3[^>]*>\{project\.title\}<\/h3>/)
})

test('project impact subtitles do not start with a decorative dash', () => {
  const translations = read('src/locales/translations.js')
  const projects = read('src/data/projectsData.js')

  assert.doesNotMatch(translations, /impactSuffix:\s*['\"]—/)
  assert.doesNotMatch(projects, /impactSuffix:\s*['\"]—/)
})
