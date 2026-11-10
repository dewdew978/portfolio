import React from 'react'
import { Download, ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import FadeInSection from '@/components/FadeInSection'
import { getAssetUrl } from '@/utils/url'
import { useLanguage } from '@/context/LanguageContext'
import PixelOrb from '@/components/brand/PixelOrb'

export default function HeroSection() {
  const { lang, t } = useLanguage()

  return (
    <section id="hero" className="fullpage-section relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 min-[400px]:pt-32 sm:pt-36 lg:pt-28 pb-12 sm:pb-16 justify-center">
      <FadeInSection direction="up" duration={800}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* Left Column: Intro */}
          <div className="md:col-span-7 flex flex-col items-start">
            <h1 className="text-4xl sm:text-5xl md:text-[2.75rem] lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
              {lang === 'th' ? 'สวัสดีครับ, ผม' : "Hello, I'm"} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 dark:from-[#fbfaf8] dark:via-[#eae6df] dark:to-[#d6d0c7] bg-clip-text text-transparent">
                {t.hero.name}
              </span>
              {t.hero.nickname && (
                <span className="font-caveat font-bold text-3xl sm:text-4xl md:text-5xl text-zinc-500 dark:text-zinc-400 ml-2.5 sm:ml-3 inline-block align-baseline tracking-normal">
                  {t.hero.nickname}
                </span>
              )}
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-zinc-600 dark:text-zinc-400 mb-6">
              {t.hero.role}
            </p>

            <div className="flex w-full flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
              <a
                href={getAssetUrl('/assets/Pawarit-Pansing-CV.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-[#fbfaf8] dark:text-[#0a0908] dark:hover:bg-white shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download size={18} />
                <span>{t.hero.downloadResume}</span>
              </a>
              <a
                href="#projects"
                className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 shadow-xs hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>{t.hero.viewProjects}</span>
                <ChevronDown size={18} />
              </a>
            </div>

            {/* Social Icons */}
            <ul className="flex items-center gap-3">
              <li>
                <a
                  href="https://github.com/dewdew978"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 shadow-sm transition-all"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/pawarit-pansing-5744a435b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm transition-all"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </li>
              <li>
                <a
                  href="mailto:pawaritpansing@gmail.com"
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 hover:-translate-y-0.5 shadow-sm transition-all"
                  title="Email"
                >
                  <Mail size={20} />
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Profile Image */}
          <div className="md:col-span-5 flex justify-center order-first md:order-none mt-2 sm:mt-0">
            <div className="relative flex justify-center items-center">
              <PixelOrb
                size="lg"
                interactive
                className="absolute -right-2 -top-4 sm:-right-14 sm:-top-12 z-20"
              />

              {/* Ambient Glow */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-500/5 blur-3xl"></div>

              {/* Avatar Frame */}
              <div className="relative z-10 p-2.5 rounded-3xl bg-gradient-to-tr from-white/40 to-white/10 dark:from-zinc-800/80 dark:to-zinc-900/80 border border-zinc-200/90 dark:border-zinc-750/90 shadow-2xl backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5 hover:-translate-y-1 transition-all duration-300">
                <img
                  src={getAssetUrl('/profiledew.jpg')}
                  alt="Pawarit Pansing (ปวริศ ปัญสิงห์) – Data & Business Analyst"
                  className="w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-cover rounded-2xl bg-zinc-100 dark:bg-zinc-800 shadow-inner"
                />
              </div>

              
            </div>
          </div>
        </div>
      </FadeInSection>

      {/* Scroll Down Indicator */}
      <div className="hidden sm:flex justify-center mt-12 mb-2">
        <a
          href="#about"
          aria-label="Scroll down to About section"
          className="inline-flex flex-col items-center gap-1 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors group"
        >
          <span>{t.hero.scrollDown}</span>
          <ChevronDown size={16} className="animate-bounce text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-950 dark:group-hover:text-zinc-100 transition-colors" />
        </a>
      </div>
    </section>
  )
}
