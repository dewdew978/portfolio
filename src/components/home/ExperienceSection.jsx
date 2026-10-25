import React from 'react'
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import FadeInSection from '@/components/FadeInSection'
import { getAssetUrl } from '@/utils/url'
import { useLanguage } from '@/context/LanguageContext'

const AWS_CERTIFICATIONS = [
  {
    id: 'cloud-foundations',
    image: '/assets/certificates/aws-cloud-foundations.png',
    certificate: '/assets/certificates/aws-cloud-foundations.pdf',
    credlyUrl: 'https://www.credly.com/go/ZDQCsvZy',
  },
  {
    id: 'cloud-architecting',
    image: '/assets/certificates/aws-cloud-architecting.png',
    certificate: '/assets/certificates/aws-cloud-architecting.pdf',
    credlyUrl: 'https://www.credly.com/go/BbT284Yr',
  },
]

export default function ExperienceSection() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mb-3">
            {t.experience.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {t.experience.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.experience.subtitle}
          </p>
        </div>
      </FadeInSection>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-10">
        <FadeInSection direction="up" delay={100}>
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-indigo-600 shadow-md shadow-indigo-500/30"></div>
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {t.experience.cmccTitle}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                  {t.experience.cmccPeriod}
                </span>
              </div>
              <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{t.experience.cmccCase}</div>
              <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                {t.experience.cmccPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection direction="up" delay={200}>
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-purple-600 shadow-md shadow-purple-500/30"></div>
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {t.experience.aiBiTitle}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  {t.experience.aiBiPeriod}
                </span>
              </div>
              <div className="text-base font-semibold text-purple-600 dark:text-purple-400 mb-3">{t.experience.aiBiOrg}</div>
              <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                {t.experience.aiBiPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection direction="up" delay={300}>
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-emerald-600 shadow-md shadow-emerald-500/30"></div>
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
              <div className="mb-4">
                <div className="inline-flex items-center px-3 py-2 rounded-xl bg-white border border-zinc-200 dark:border-zinc-700 shadow-sm">
                  <img
                    src={getAssetUrl('/nav-eng.svg')}
                    alt="KMITL School of Information Technology"
                    className="h-8 sm:h-9 w-auto max-w-full object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {t.experience.eduDegree}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  {t.experience.eduPeriod}
                </span>
              </div>
              <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                {t.experience.eduUniversity}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                {t.experience.eduFaculty}
              </div>
              <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                {t.experience.eduPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeInSection>
      </div>

      <FadeInSection direction="up" delay={150}>
        <div id="aws-certifications" className="mt-14 sm:mt-16 scroll-mt-28">
          <div className="flex items-start gap-3 mb-7">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 ring-1 ring-sky-200 dark:bg-sky-950/60 dark:text-sky-400 dark:ring-sky-800/70">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {t.experience.awsCertifications.title}
              </h3>
              <p className="mt-1 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.experience.awsCertifications.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {AWS_CERTIFICATIONS.map((certification, index) => {
              const content = t.experience.awsCertifications.items[index]

              return (
                <article
                  key={certification.id}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-sky-800"
                >
                  <div className="flex min-h-56 items-center justify-center bg-gradient-to-br from-slate-50 via-white to-sky-50 p-7 sm:p-8 dark:from-zinc-900 dark:via-zinc-900 dark:to-sky-950/40">
                    <img
                      src={getAssetUrl(certification.image)}
                      alt={content.imageAlt}
                      width="200"
                      height="200"
                      loading="lazy"
                      className="h-40 w-40 sm:h-44 sm:w-44 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-800">
                        {content.duration}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {content.issued}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold leading-snug text-zinc-900 dark:text-white">
                      {content.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {content.description}
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={getAssetUrl(certification.certificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900"
                      >
                        <FileText className="h-4 w-4" aria-hidden="true" />
                        {t.experience.awsCertifications.viewCertificate}
                      </a>
                      <a
                        href={certification.credlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-sky-700 dark:hover:bg-sky-950/50 dark:hover:text-sky-300 dark:focus-visible:ring-offset-zinc-900"
                      >
                        {t.experience.awsCertifications.verifyCredential}
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
