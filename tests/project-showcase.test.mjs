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
