import React, { useState } from 'react'
import { Eye, ArrowUpRight } from 'lucide-react'
import FadeInSection from '@/components/FadeInSection'
import { projectsData } from '@/data/projectsData'
import { useLanguage } from '@/context/LanguageContext'

const FILTERS = [
  { id: 'all', labelKey: 'filterAll' },
  { id: 'data', labelKey: 'filterAnalytics' },
  { id: 'business', labelKey: 'filterBusiness' },
  { id: 'web', labelKey: 'filterWeb' },
]

export default function ProjectsSection({ onSelectProject }) {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState('all')

  const localizedProjects = Object.entries(projectsData).map(([key, proj]) => {
    const loc = (t.projects?.items && t.projects.items[key]) || {}
    return [
      key,
      {
        ...proj,
        title: loc.title || proj.title,
        impactSuffix: loc.impactSuffix !== undefined ? loc.impactSuffix : proj.impactSuffix,
        overview: loc.overview || proj.overview,
        architecture: loc.architecture || proj.architecture,
        features: loc.features || proj.features,
        impact: loc.impact || proj.impact,
        liveLabel: loc.liveLabel || proj.liveLabel,
      }
    ]
  })

  const filteredProjects = localizedProjects.filter(([_, proj]) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'data' || activeFilter === 'analytics') return proj.category === 'analytics' || (proj.badges && proj.badges.includes('Data Analytics'))
    if (activeFilter === 'business') return proj.category === 'business' || (proj.badges && proj.badges.includes('Business Strategy'))
    if (activeFilter === 'web') return proj.category === 'web'
    return proj.category === activeFilter
  })

  return (
    <section id="projects" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
      <FadeInSection direction="up" delay={50}>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800/60 mb-3">
              {t.projects.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
              {t.projects.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 w-full sm:w-auto sm:self-start lg:self-auto overflow-x-auto [scrollbar-width:none] rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80">
            {FILTERS.map(({ id, labelKey }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === id
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t.projects[labelKey]}
              </button>
            ))}
          </div>
        </div>
      </FadeInSection>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(([key, proj], idx) => (
          <FadeInSection key={key} direction="up" delay={idx * 100}>
            <article className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-300">
              {/* Card Image */}
              <div
                className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer group"
                onClick={() => onSelectProject(proj)}
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900/80 text-white backdrop-blur-md shadow-sm">
                  {(proj.badges && proj.badges[0]) || 'Project'}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {(proj.badges || []).map((badge, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                  {proj.title}
                  {proj.impactSuffix && (
                    <span className="block text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                      {proj.impactSuffix}
                    </span>
                  )}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {proj.overview}
                </p>

                {/* Footer / Actions */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    <Eye size={15} />
                    <span>{t.projects.details}</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={proj.gitHubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {t.projects.github}
                    </a>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-500/25 transition-colors"
                    >
                      <span>{t.projects.demo}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </FadeInSection>
        ))}
      </div>
    </section>
  )
}
