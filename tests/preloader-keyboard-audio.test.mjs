import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { playWritingStroke, playKeyStroke, resumeAudio, getAudioContext } from '../src/utils/keyboardAudio.js'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('keyboardAudio module exports expected functions and runs safely without browser window', () => {
  assert.ok(existsSync(new URL('../src/utils/keyboardAudio.js', import.meta.url)))
  assert.equal(typeof playWritingStroke, 'function')
  assert.equal(typeof playKeyStroke, 'function')
  assert.equal(typeof resumeAudio, 'function')
  assert.equal(typeof getAudioContext, 'function')

  // In Node.js environment, window is undefined; must not throw
  assert.equal(getAudioContext(), null)
  assert.doesNotThrow(() => {
    playWritingStroke()
    playWritingStroke({ duration: 0.12 })
    playWritingStroke({ isDot: true })
    playWritingStroke({ isSpace: true })
    playWritingStroke({ isPunctuation: true })
    playKeyStroke()
    playKeyStroke({ isSpace: true })
    playKeyStroke({ isPunctuation: true })
  })
})

test('Preloader component integrates handwriting animation with stroke writing sound effect', () => {
  const preloader = read('src/components/ui/Preloader.jsx')

  assert.match(preloader, /import.*playWritingStroke.*from.*keyboardAudio/)
  assert.match(preloader, /playWritingStroke\(/)
  assert.match(preloader, /scene1Svg/)
  assert.match(preloader, /scene2Svg/)
  assert.match(preloader, /duration:\s*stroke\.dur/)
  assert.match(preloader, /isMuted/)
  assert.match(preloader, /toggleSound/)
  assert.match(preloader, /aria-label=\{isMuted \? 'Unmute sound' : 'Mute sound'\}/)

  // Verify handwriting SVG assets exist
  assert.ok(existsSync(new URL('../src/assets/handwriting/scene1.svg', import.meta.url)))
  assert.ok(existsSync(new URL('../src/assets/handwriting/scene2.svg', import.meta.url)))
})
