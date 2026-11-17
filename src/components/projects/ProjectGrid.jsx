import React, { useState } from 'react'
import { ArrowRight, ArrowUpRight, Github, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const CATEGORY_LABEL_KEYS = {
  analytics: 'filterAnalytics',
  business: 'filterBusiness',
  web: 'filterWeb',
}

// Only link to real repositories, not a bare profile URL
const isRepoUrl = (url) => /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(url || '')

export default function ProjectGrid({ projects, t, onSelectProject }) {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState('all')

  const filters = [
    ['all', 'filterAll'],
    ['analytics', 'filterAnalytics'],
    ['business', 'filterBusiness'],
    ['web', 'filterWeb'],
  ]

  const countFor = (id) =>
    id === 'all' ? projects.length : projects.filter(([, p]) => p.category === id).length

  const visible = projects.filter(([, p]) => filter === 'all' || p.category === filter)

  const labels = {
    caseStudy: lang === 'th' ? 'ดูรายละเอียดโปรเจกต์' : 'View case study',
    code: lang === 'th' ? 'ซอร์สโค้ด' : 'Source code',
    highlight: lang === 'th' ? 'ผลลัพธ์เด่น' : 'Highlight',
  }

  return (
    <>
      {/* Category filters (wrap on phones so nothing hides off-screen) */}
      <div
        role="group"
        aria-label={lang === 'th' ? 'กรองตามหมวดหมู่' : 'Filter by category'}
        className="flex flex-wrap gap-2 pb-8 sm:pb-10"
      >
        {filters.map(([id, label]) => {
          const active = filter === id
          return (
            <button
              key={id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 sm:px-5 text-sm font-semibold transition-colors cursor-pointer ${
                active
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <span>{t.projects[label]}</span>
              <span
                className={`text-xs tabular-nums ${
                  active ? 'text-white/60 dark:text-zinc-950/50' : 'text-zinc-400 dark:text-zinc-500'
                }`}
              >
                {countFor(id)}
              </span>
            </button>
          )
        })}
      </div>

      {/* One card per project: visual + the facts a reviewer scans for */}
      <div className="space-y-6 sm:space-y-8">
        {visible.map(([key, p]) => {
          const categoryLabel = t.projects[CATEGORY_LABEL_KEYS[p.category]] || p.category
          const stack = p.stack || p.badges || []
          return (
            <article
              key={key}
              className="group/card grid gap-5 sm:gap-6 md:grid-cols-12 md:gap-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 p-3 sm:p-4 md:p-5 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <button
                type="button"
                onClick={() => onSelectProject(p)}
                aria-label={`${labels.caseStudy}: ${p.title}`}
                className="md:col-span-5 md:self-center block w-full overflow-hidden rounded-2xl bg-zinc-950 aspect-video cursor-pointer"
              >
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className={`h-full w-full ${p.imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition duration-500 group-hover/card:scale-[1.03]`}
                />
              </button>

              <div className="md:col-span-7 flex min-w-0 flex-col px-1 pb-1 sm:px-2 md:px-0 md:py-2 md:pr-3">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono font-semibold uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                  <span>{categoryLabel}</span>
                  {p.year && (
                    <>
                      <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">·</span>
                      <span>{p.year}</span>
                    </>
                  )}
                </div>

                <h2 className="mt-2 text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white break-words">{p.title}</h2>

                <p className="mt-2 line-clamp-3 sm:line-clamp-2 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {p.overview}
                </p>

                {p.impactSuffix && (
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 px-4 py-3">
                    <TrendingUp size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    <p className="text-sm sm:text-[15px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                      <span className="sr-only">{labels.highlight}: </span>
                      {p.impactSuffix}
                    </p>
                  </div>
                )}

                {stack.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {stack.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-2 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 md:mt-auto md:pt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectProject(p)}
                    className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-5 text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span>{labels.caseStudy}</span>
                    <ArrowRight size={16} className="transition-transform group-hover/card:translate-x-0.5" />
                  </button>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-zinc-300 dark:border-zinc-700 px-5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <span>{p.liveLabel || t.projects.demo}</span>
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                  {isRepoUrl(p.gitHubUrl) && (
                    <a
                      href={p.gitHubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      <span>{labels.code}</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
