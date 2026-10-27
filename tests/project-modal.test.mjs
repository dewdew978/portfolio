import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/components/home/ProjectModal.jsx', import.meta.url), 'utf8')
const translations = readFileSync(new URL('../src/locales/translations.js', import.meta.url), 'utf8')

test('project modal uses a compact editorial layout', () => {
  assert.match(source, /role="dialog"/)
  assert.match(source, /max-w-\[760px\]/)
  assert.match(source, /sm:max-h-\[82vh\]/)
  assert.match(source, /aspect-\[16\/6\]/)
  assert.match(source, /project\.features\.slice\(0, 3\)/)
  assert.match(source, /project\.gitHubUrl\s*&&/)
  assert.match(source, /max-h-\[94svh\]/)
  assert.match(source, /overflow-hidden/)
  assert.match(source, /overflow-y-auto/)
  assert.match(source, /closeButtonRef/)
  assert.match(source, /event\.key === 'Escape'/)
  assert.match(source, /event\.key !== 'Tab'/)
  assert.match(source, /text-base[^"\n]*sm:text-lg/)
  assert.doesNotMatch(source, /lg:grid-cols-/)
  assert.doesNotMatch(source, /lg:sticky/)
  assert.doesNotMatch(source, /project\.architecture/)
  assert.doesNotMatch(source, /number="0[1-4]"/)
  assert.doesNotMatch(source, /from-indigo-600|to-purple-600|bg-gradient-to-tr/)
})

test('Thai modal section labels are concise and do not use parenthetical English', () => {
  assert.match(translations, /overview: 'ภาพรวมโครงการ'/)
  assert.match(translations, /features: 'ฟีเจอร์เด่น'/)
  assert.match(translations, /impact: 'ผลลัพธ์และคุณค่าทางธุรกิจ'/)
  assert.doesNotMatch(translations, /ภาพรวมโครงการ \(Overview\)|ฟีเจอร์เด่น \(Key Features\)|ผลลัพธ์และคุณค่าทางธุรกิจ \(Business Impact\)/)
})
