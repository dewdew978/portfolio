import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('certificates render as a standalone fullpage section between experience and contact', () => {
  const certificates = read('src/components/home/CertificatesSection.jsx')
  const experience = read('src/components/home/ExperienceSection.jsx')
  const home = read('src/pages/HomePage.jsx')
  assert.match(certificates, /id="aws-certifications"/)
  assert.match(certificates, /fullpage-section site-container section-space/)
  assert.doesNotMatch(experience, /aws-certifications|AWS_CERTIFICATIONS/)
  const experiencePosition = home.indexOf('<ExperienceSection />')
  const certificatePosition = home.indexOf('<CertificatesSection />')
  const contactPosition = home.indexOf('<ContactSection />')
  assert.ok(experiencePosition < certificatePosition && certificatePosition < contactPosition)
  assert.match(read('src/locales/translations.js'), /title: 'Certificate'/)
})
