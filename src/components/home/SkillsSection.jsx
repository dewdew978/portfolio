import React from 'react'
import FadeInSection from '@/components/FadeInSection'
import MagicBento from '@/components/MagicBento/MagicBento'
import { useLanguage } from '@/context/LanguageContext'

export default function SkillsSection() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 mb-3">
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

      {/* REACT BITS MAGIC BENTO COMPONENT */}
      <FadeInSection direction="up" delay={150}>
        <MagicBento 
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          glowColor="147, 51, 234"
          spotlightRadius={300}
          particleCount={12}
          className="w-full"
        />
      </FadeInSection>
    </section>
  )
}
