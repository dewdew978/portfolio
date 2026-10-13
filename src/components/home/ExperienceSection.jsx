import React from 'react'
import FadeInSection from '@/components/FadeInSection'
import { getAssetUrl } from '@/utils/url'
import { useLanguage } from '@/context/LanguageContext'

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
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
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
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
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
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
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
    </section>
  )
}
