import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const projectRoot = new URL('../', import.meta.url)

const removedFiles = [
  '.github/workflows/strava-sync.yml',
  'scripts/sync-strava.js',
  'public/data/strava-activities.json',
  'src/pages/AthleticsPage.jsx',
]

const runtimeFiles = [
  'src/App.jsx',
  'src/main.jsx',
  'src/components/Navbar.jsx',
  'src/components/home/AboutSection.jsx',
  'src/locales/translations.js',
  'package.json',
  'README.md',
]

test('removes the Strava page, data pipeline, and scheduled GitHub workflow', () => {
  for (const file of removedFiles) {
    assert.equal(existsSync(new URL(file, projectRoot)), false, `${file} should be removed`)
  }
})

test('removes all Strava and athletics links from the active application', () => {
  for (const file of runtimeFiles) {
    const source = readFileSync(new URL(file, projectRoot), 'utf8')
    assert.doesNotMatch(source, /strava|athletics/i, `${file} still references Strava/Athletics`)
  }
})

test('redirects removed legacy routes back to the portfolio home page', () => {
  const appSource = readFileSync(new URL('src/App.jsx', projectRoot), 'utf8')
  assert.match(appSource, /<Route path="\*" element={<Navigate to="\/" replace \/>} \/>/)
})
