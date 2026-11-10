import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { playKeyStroke, resumeAudio, getAudioContext } from '../src/utils/keyboardAudio.js'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('keyboardAudio module exports expected functions and runs safely without browser window', () => {
  assert.ok(existsSync(new URL('../src/utils/keyboardAudio.js', import.meta.url)))
  assert.equal(typeof playKeyStroke, 'function')
  assert.equal(typeof resumeAudio, 'function')
  assert.equal(typeof getAudioContext, 'function')

  // In Node.js environment, window is undefined; must not throw
  assert.equal(getAudioContext(), null)
  assert.doesNotThrow(() => {
    playKeyStroke()
    playKeyStroke({ isSpace: true })
    playKeyStroke({ isPunctuation: true })
  })
})

test('Preloader component integrates keyboard typewriter sound effect', () => {
  const preloader = read('src/components/ui/Preloader.jsx')

  assert.match(preloader, /import.*playKeyStroke.*resumeAudio.*from.*keyboardAudio/)
  assert.match(preloader, /playKeyStroke\(/)
  assert.match(preloader, /isSpace:\s*char === ' '/)
  assert.match(preloader, /isMuted/)
  assert.match(preloader, /toggleSound/)
  assert.match(preloader, /aria-label=\{isMuted \? 'Unmute typing sound' : 'Mute typing sound'\}/)
})
