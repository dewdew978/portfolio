import React from 'react'
import FadeInSection from '@/components/FadeInSection'
import SkillsList from '@/components/skills/SkillsList'
import { useLanguage } from '@/context/LanguageContext'

export default function SkillsSection() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="fullpage-section site-container section-space scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="mb-8 sm:mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 mb-3">
            {t.skills.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {t.skills.title}
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {t.skills.subtitle}
          </p>
        </div>
      </FadeInSection>

      <FadeInSection direction="up" delay={150}>
        <SkillsList items={t.skills.bento} />
      </FadeInSection>
    </section>
  )
}
