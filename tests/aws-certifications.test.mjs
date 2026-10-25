import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const projectRoot = new URL('../', import.meta.url)
const experienceSource = readFileSync(new URL('src/components/home/ExperienceSection.jsx', projectRoot), 'utf8')
const footerSource = readFileSync(new URL('src/components/ui/footer-section.tsx', projectRoot), 'utf8')
const translationsSource = readFileSync(new URL('src/locales/translations.js', projectRoot), 'utf8')

const credentials = [
  {
    image: 'public/assets/certificates/aws-cloud-foundations.png',
    pdf: 'public/assets/certificates/aws-cloud-foundations.pdf',
    title: 'AWS Academy Graduate - Cloud Foundations',
    credlyUrl: 'https://www.credly.com/go/ZDQCsvZy',
  },
  {
    image: 'public/assets/certificates/aws-cloud-architecting.png',
    pdf: 'public/assets/certificates/aws-cloud-architecting.pdf',
    title: 'AWS Academy Graduate - Cloud Architecting',
    credlyUrl: 'https://www.credly.com/go/BbT284Yr',
  },
]

test('publishes both AWS Academy badge images and certificate PDFs', () => {
  for (const credential of credentials) {
    assert.equal(existsSync(new URL(credential.image, projectRoot)), true, `${credential.image} is missing`)
    assert.equal(existsSync(new URL(credential.pdf, projectRoot)), true, `${credential.pdf} is missing`)
  }
})

test('renders accessible credential links for both AWS Academy certifications', () => {
  assert.match(experienceSource, /awsCertifications/)
  assert.match(experienceSource, /id="aws-certifications"/)
  assert.match(footerSource, /href: '#aws-certifications'/)
  assert.match(experienceSource, /target="_blank"/)
  assert.match(experienceSource, /rel="noopener noreferrer"/)

  for (const credential of credentials) {
    assert.match(experienceSource, new RegExp(credential.credlyUrl.replaceAll('/', '\\/')))
    assert.match(translationsSource, new RegExp(credential.title.replaceAll('-', '\\-')))
  }
})
