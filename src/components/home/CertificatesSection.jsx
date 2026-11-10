import React from 'react'
import { ExternalLink, FileText } from 'lucide-react'
import FadeInSection from '@/components/FadeInSection'
import { getAssetUrl } from '@/utils/url'
import { useLanguage } from '@/context/LanguageContext'

const CERTIFICATIONS = [
  {
    id: 'cloud-foundations',
    image: '/assets/certificates/aws-cloud-foundations.png',
    certificate: '/assets/certificates/aws-cloud-foundations.pdf',
    credentialUrl: 'https://www.credly.com/go/ZDQCsvZy',
  },
  {
    id: 'cloud-architecting',
    image: '/assets/certificates/aws-cloud-architecting.png',
    certificate: '/assets/certificates/aws-cloud-architecting.pdf',
    credentialUrl: 'https://www.credly.com/go/BbT284Yr',
  },
  {
    id: 'opswat-cybersecurity-fundamentals-associate',
    image: '/assets/certificates/opswat-cybersecurity-fundamentals-associate.png',
    credentialUrl: 'https://learn.opswatacademy.com/certificate/I6qeVClKjA',
  },
]

export default function CertificatesSection() {
  const { t } = useLanguage()
  const copy = t.experience.awsCertifications

  return (
    <section
      id="aws-certifications"
      className="fullpage-section site-container section-space scroll-mt-12 justify-center"
    >
      <FadeInSection direction="up" delay={50}>
        <div className="mb-7 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
              {copy.title}
            </h2>
            <p className="mt-2 text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {copy.subtitle}
            </p>
          </div>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {CERTIFICATIONS.map((cert, index) => {
          const content = copy.items[index]
          if (!content) return null

          return (
            <FadeInSection key={cert.id} direction="up" delay={100 + index * 100}>
              <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                <div className="relative flex min-h-44 sm:min-h-52 items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-zinc-100 p-5 sm:p-6 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-850 overflow-hidden">
                  {cert.badgeImage ? (
                    <>
                      {/* Certificate paper view */}
                      <img
                        src={getAssetUrl(cert.image)}
                        alt={content.imageAlt}
                        width="320"
                        height="200"
                        loading="lazy"
                        className="h-32 sm:h-40 max-w-full object-contain drop-shadow-lg transition-all duration-300 group-hover:opacity-0 group-hover:scale-95"
                      />
                      {/* Hover Badge view */}
                      <img
                        src={getAssetUrl(cert.badgeImage)}
                        alt={`${content.title} Badge`}
                        width="320"
                        height="200"
                        loading="lazy"
                        className="absolute inset-0 m-auto h-28 sm:h-36 max-w-full object-contain drop-shadow-xl opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 pointer-events-none"
                      />
                    </>
                  ) : (
                    <img
                      src={getAssetUrl(cert.image)}
                      alt={content.imageAlt}
                      width="320"
                      height="200"
                      loading="lazy"
                      className="h-32 sm:h-40 max-w-full object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-zinc-700 dark:text-zinc-300 ring-1 ring-zinc-200 dark:ring-zinc-700">
                      {content.duration}
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      {content.issued}
                    </span>
                  </div>

                  <h3 className="break-words text-lg sm:text-xl font-bold leading-snug">
                    {content.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {content.description}
                  </p>

                  {cert.certificate ? (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={getAssetUrl(cert.certificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-center text-sm font-semibold text-white dark:bg-white dark:text-zinc-900"
                      >
                        <FileText className="h-4 w-4 shrink-0" />
                        {copy.viewCertificate}
                      </a>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-2.5 text-center text-sm font-semibold dark:border-zinc-700"
                      >
                        {copy.verifyCredential}
                        <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </div>
                  ) : (
                    <div className="mt-6">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-2.5 text-center text-sm font-semibold dark:border-zinc-700"
                      >
                        {copy.verifyCredential}
                        <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            </FadeInSection>
          )
        })}
      </div>
    </section>
  )
}
