import React from 'react'
import FadeInSection from '@/components/FadeInSection'
import { getAssetUrl } from '@/utils/url'
import { useLanguage } from '@/context/LanguageContext'

export default function ExperienceSection() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="fullpage-section site-container section-space scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="mb-8 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 mb-3">
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

      <FadeInSection direction="up" delay={100}>
        <div className="relative flex gap-4 sm:gap-6">
          {/* Perfectly centered timeline column */}
          <div aria-hidden="true" className="relative flex flex-col items-center shrink-0">
            {/* Vertical connector line starting at circle center */}
            <div className="absolute top-2 bottom-0 w-0.5 bg-gradient-to-b from-zinc-300 via-zinc-200 to-transparent dark:from-zinc-700 dark:via-zinc-800" />
            {/* Timeline node circle */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-zinc-700 dark:border-zinc-300 shadow-xs shrink-0 mt-1.5" />
          </div>

          {/* Education Card */}
          <div className="flex-1 min-w-0">
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
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
              <div className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
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
        </div>
      </FadeInSection>
    </section>
  )
}
