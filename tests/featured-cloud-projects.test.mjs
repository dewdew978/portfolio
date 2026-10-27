import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('both repository projects are shared by Featured and All Projects', () => {
  const projects = read('src/data/projectsData.js')
  const translations = read('src/locales/translations.js')

  for (const key of ['curriculum-system', 'cloud-sql-playground']) {
    assert.match(projects, new RegExp(`['\"]?${key}['\"]?\\s*:`))
    assert.equal([...translations.matchAll(new RegExp(`['\"]?${key}['\"]?\\s*:`, 'g'))].length, 2)
  }

  assert.match(projects, /https:\/\/github\.com\/dewdew978\/isd-2026-luksuitpiti/)
  assert.match(projects, /https:\/\/canva\.link\/tgvf3eo1finloeb/)
  assert.match(projects, /https:\/\/canva\.link\/5mlz3o5a602axht/)
})

test('new project covers are local and new project copy avoids em dashes', () => {
  assert.equal(existsSync(new URL('../public/assets/projects/intelligent-curriculum-system.png', import.meta.url)), true)
  assert.equal(existsSync(new URL('../public/assets/projects/cloud-sql-playground.png', import.meta.url)), true)

  const projects = read('src/data/projectsData.js')
  const translations = read('src/locales/translations.js')
  const start = projects.indexOf("'curriculum-system'")
  assert.notEqual(start, -1)
  assert.doesNotMatch(projects.slice(start), /—/)
  const thaiStart = translations.indexOf("'curriculum-system'")
  const englishStart = translations.lastIndexOf("'curriculum-system'")
  assert.doesNotMatch(translations.slice(thaiStart, translations.indexOf("'us-accidents'", thaiStart)), /—/)
  assert.doesNotMatch(translations.slice(englishStart, translations.indexOf("'us-accidents'", englishStart)), /—/)
})

test('private prototype details are presented safely and covers fill their cards', () => {
  const projects = read('src/data/projectsData.js')
  const modal = read('src/components/home/ProjectModal.jsx')
  const showcase = read('src/components/projects/ProjectShowcaseCard.jsx')
  const grid = read('src/components/projects/ProjectGrid.jsx')

  assert.match(projects, /'cloud-sql-playground':[\s\S]*gitHubUrl: null/)
  assert.match(projects, /'cloud-sql-playground':[\s\S]*ต้นแบบ/)
  assert.doesNotMatch(projects, /'curriculum-system':[\s\S]*?imageFit: 'contain'/)
  assert.doesNotMatch(projects, /'cloud-sql-playground':[\s\S]*?imageFit: 'contain'/)
  assert.match(modal, /project\.gitHubUrl\s*&&/)
  assert.match(modal, /project\.imageFit/)
  assert.match(showcase, /project\.imageFit/)
  assert.match(grid, /p\.imageFit/)
})
