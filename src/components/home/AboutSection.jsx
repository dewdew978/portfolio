import React from 'react'
import FadeInSection from '@/components/FadeInSection'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="fullpage-section site-container section-space scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="mb-8 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 mb-3">
            {t.about.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {t.about.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
            {t.about.bioP1} <strong className="font-semibold text-zinc-900 dark:text-white">{t.about.bioP1Bold}</strong> {t.about.bioP2} <strong className="font-semibold text-zinc-900 dark:text-white">{t.about.bioP2Bold}</strong> {t.about.bioP3}
          </p>
        </div>
      </FadeInSection>

      {/* Highlights 3-Card Grid */}
      <FadeInSection direction="up" delay={150}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card1Title}</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.about.card1Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card2Title}</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.about.card2Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card3Title}</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.about.card3Desc}
            </p>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
