import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('GoatCounter loads on every page and SPA route changes are counted', () => {
  assert.match(read('index.html'), /<script data-goatcounter="https:\/\/pawarit\.goatcounter\.com\/count" async src="https:\/\/gc\.zgo\.at\/count\.js"><\/script>/)
  const app = read('src/App.jsx')
  assert.match(app, /<PageViewTracker \/>/)
  const tracker = read('src/components/PageViewTracker.jsx')
  assert.match(tracker, /goatcounter\.count\(/)
})
