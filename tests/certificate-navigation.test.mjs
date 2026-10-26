import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/hooks/useFullpageScroll.js', import.meta.url), 'utf8')

test('fullpage navigation includes certificates before contact', () => {
  const certificate = source.indexOf("id: 'aws-certifications'")
  const contact = source.indexOf("id: 'contact'")
  assert.ok(certificate > -1)
  assert.ok(contact > certificate)
  assert.match(source, /number: '06'.*Certificates.*ใบรับรอง/)
  assert.match(source, /number: '07'.*Contact.*ติดต่อ/)
})

test('nested certificate section uses a document-relative top position', () => {
  assert.match(source, /getSectionTop/)
  assert.match(source, /getBoundingClientRect\(\)\.top \+ window\.scrollY/)
})
