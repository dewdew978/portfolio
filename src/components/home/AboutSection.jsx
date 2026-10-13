import React from 'react'
import { Link } from 'react-router-dom'
import { Activity, ArrowUpRight } from 'lucide-react'
import FadeInSection from '@/components/FadeInSection'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card1Title}</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.about.card1Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card2Title}</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.about.card2Desc}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-pink-500/50 dark:hover:border-pink-500/50 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card3Title}</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.about.card3Desc}
            </p>
          </div>
        </div>
      </FadeInSection>

      {/* Strava Standalone Page Direct Callout */}
      <FadeInSection direction="up" delay={300}>
        <Link
          to="/athletics"
          className="group flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/15 transition-all shadow-sm max-w-4xl mx-auto mt-8 cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#FC5200] text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Activity size={22} />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>{t.about.stravaTitle}</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{t.about.stravaBadge}</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {t.about.stravaDesc}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FC5200] group-hover:translate-x-1 transition-transform">
            <span>{t.about.stravaAction}</span>
            <ArrowUpRight size={16} />
          </div>
        </Link>
      </FadeInSection>
    </section>
  )
}
