import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const projectRoot = new URL('../', import.meta.url)
const certificatesSource = readFileSync(new URL('src/components/home/CertificatesSection.jsx', projectRoot), 'utf8')
const footerSource = readFileSync(new URL('src/components/ui/footer-section.tsx', projectRoot), 'utf8')
const translationsSource = readFileSync(new URL('src/locales/translations.js', projectRoot), 'utf8')

const credentials = [
  {
    id: 'cloud-foundations',
    image: 'public/assets/certificates/aws-cloud-foundations.png',
    pdf: 'public/assets/certificates/aws-cloud-foundations.pdf',
    title: 'AWS Academy Graduate - Cloud Foundations',
    credentialUrl: 'https://www.credly.com/go/ZDQCsvZy',
  },
  {
    id: 'cloud-architecting',
    image: 'public/assets/certificates/aws-cloud-architecting.png',
    pdf: 'public/assets/certificates/aws-cloud-architecting.pdf',
    title: 'AWS Academy Graduate - Cloud Architecting',
    credentialUrl: 'https://www.credly.com/go/BbT284Yr',
  },
  {
    id: 'opswat-cybersecurity-fundamentals-associate',
    image: 'public/assets/certificates/opswat-cybersecurity-fundamentals-associate.png',
    pdf: null,
    title: 'OPSWAT Cybersecurity Fundamentals Associate',
    credentialUrl: 'https://learn.opswatacademy.com/certificate/I6qeVClKjA',
    certificateId: 'I6qeVClKjA',
  },
]

test('publishes all certificate image assets and required PDFs', () => {
  for (const credential of credentials) {
    assert.equal(existsSync(new URL(credential.image, projectRoot)), true, `${credential.image} is missing`)
    if (credential.pdf) {
      assert.equal(existsSync(new URL(credential.pdf, projectRoot)), true, `${credential.pdf} is missing`)
    }
  }
})

test('renders accessible credential links and responsive 3-column layout', () => {
  assert.match(certificatesSource, /id="aws-certifications"/)
  assert.match(footerSource, /homeAnchor\('aws-certifications'\)/)
  assert.match(certificatesSource, /target="_blank"/)
  assert.match(certificatesSource, /rel="noopener noreferrer"/)
  assert.match(certificatesSource, /lg:grid-cols-3/)

  // Local PDF rendering must be conditional on cert.certificate
  assert.match(certificatesSource, /cert\.certificate/)

  for (const credential of credentials) {
    assert.match(certificatesSource, new RegExp(credential.credentialUrl.replaceAll('/', '\\/').replaceAll('.', '\\.')))
    assert.match(translationsSource, new RegExp(credential.title.replaceAll('-', '\\-')))
  }
  assert.match(translationsSource, /I6qeVClKjA/)
})
