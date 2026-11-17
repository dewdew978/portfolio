import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('project list is one card per project without a floating view toggle', () => {
  const grid = read('src/components/projects/ProjectGrid.jsx')
  assert.doesNotMatch(grid, /fixed bottom-6/)
  assert.doesNotMatch(grid, /viewMode/)
  assert.match(grid, /aria-pressed=\{active\}/)
  assert.match(grid, /flex flex-wrap gap-2/)
  assert.match(grid, /p\.impactSuffix/)
  assert.match(grid, /aria-label="Tech stack"/)
  assert.doesNotMatch(grid, /"\{p\.impact/)
})

test('every project lists a real tech stack and year', () => {
  const data = read('src/data/projectsData.js')
  const count = (re) => [...data.matchAll(re)].length
  const projects = count(/^\s{2}['a-z-]+: \{$/gm)
  assert.ok(projects >= 5)
  assert.equal(count(/^\s{4}stack: \[/gm), projects)
  assert.equal(count(/^\s{4}year: '/gm), projects)
})

test('case study keeps navigation, avoids duplicate copy, and wraps prev/next', () => {
  const cs = read('src/components/projects/ProjectCaseStudy.jsx')
  assert.match(cs, /<Navbar theme=\{theme\} setTheme=\{setTheme\} \/>/)
  assert.equal([...cs.matchAll(/\{project\.overview\}/g)].length, 1)
  assert.match(cs, /% total/)
  assert.match(cs, /project\.stack/)
  assert.doesNotMatch(cs, /'Back'/)
  assert.doesNotMatch(cs, /"\{project\.impact\}"/)
})
