import React, { useState } from 'react'
import { Mail, Linkedin, Copy, Check } from 'lucide-react'
import FadeInSection from '@/components/FadeInSection'
import { useLanguage } from '@/context/LanguageContext'

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const { t } = useLanguage()

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pawaritpansing@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <section id="contact" className="fullpage-section site-container section-space max-w-4xl scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="relative p-5 sm:p-12 rounded-3xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-4">
            {t.contact.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t.contact.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="mailto:pawaritpansing@gmail.com"
              className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Mail size={18} />
              <span>{t.footer.emailMe}</span>
            </a>
            <a
              href="https://www.linkedin.com/in/pawarit-pansing-5744a435b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-sm hover:-translate-y-0.5 transition-all"
            >
              <Linkedin size={18} className="text-indigo-600 dark:text-indigo-400" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex w-full sm:w-auto min-h-11 items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full text-base font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
              <span>{copiedEmail ? t.contact.copiedEmail : t.contact.copyEmail}</span>
            </button>
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}
