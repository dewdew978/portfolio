import React, { useState } from 'react'
import { ArrowUpRight, Eye, LayoutGrid, Columns3 } from 'lucide-react'

export default function ProjectGrid({ projects, t, onSelectProject }) {
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('gallery') // 'gallery' (Gil Huybrecht) or 'grid'

  const filters = [
    ['all', 'filterAll'],
    ['analytics', 'filterAnalytics'],
    ['business', 'filterBusiness'],
    ['web', 'filterWeb'],
  ]

  const visible = projects.filter(([, p]) => filter === 'all' || p.category === filter)

  return (
    <>
      {/* Category Filter Tabs & View Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8">
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {filters.map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition-all cursor-pointer ${
                filter === id
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 shadow-xs'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {t.projects[label]}
            </button>
          ))}
        </div>

        {/* Desktop View Switcher */}
        <div className="hidden sm:inline-flex items-center gap-1 p-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/60 border border-zinc-300/40 dark:border-zinc-700/40 text-xs font-mono">
          <button
            type="button"
            onClick={() => setViewMode('gallery')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Columns3 size={13} />
            <span>Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid size={13} />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* GALLERY MODE: Gil Huybrecht Editorial Row Showcase */}
      {viewMode === 'gallery' && (
        <div className="space-y-12 sm:space-y-16">
          {visible.map(([key, p]) => (
            <div
              key={key}
              className="border-t border-zinc-200 dark:border-zinc-800 pt-6 sm:pt-8"
            >
              {/* Row Header: Project Title & Slide Numbers */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {p.title}
                  </h2>
                  {p.badges?.[0] && (
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      • {p.badges[0]}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(p)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>{t.projects.details || 'View Case Study'}</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>

              {/* Numbered Slides Grid (1, 2, 3...) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Slide 1: Main Visual */}
                <div
                  onClick={() => onSelectProject(p)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400 dark:text-zinc-500 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60 mb-2">
                    <span className="font-bold">1</span>
                    <span className="text-[11px] uppercase tracking-wider">Overview</span>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-200 dark:border-zinc-800 aspect-[16/10]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className={`w-full h-full ${p.imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition duration-500 group-hover:scale-105`}
                    />
                  </div>
                </div>

                {/* Slide 2: Architecture / Technical Solution */}
                <div
                  onClick={() => onSelectProject(p)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400 dark:text-zinc-500 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60 mb-2">
                    <span className="font-bold">2</span>
                    <span className="text-[11px] uppercase tracking-wider">Architecture</span>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 aspect-[16/10] flex flex-col justify-between transition group-hover:border-zinc-400 dark:group-hover:border-zinc-600 shadow-xs">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 mb-2">
                        Engineering
                      </span>
                      <p className="line-clamp-4 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 font-sans">
                        {p.architecture || p.overview}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 font-mono text-[11px] text-zinc-400">
                      <span>Specs & Pipeline</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                </div>

                {/* Slide 3: Impact & Features */}
                <div
                  onClick={() => onSelectProject(p)}
                  className="group cursor-pointer flex flex-col sm:col-span-2 lg:col-span-1"
                >
                  <div className="flex items-center justify-between font-mono text-xs text-zinc-400 dark:text-zinc-500 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/60 mb-2">
                    <span className="font-bold">3</span>
                    <span className="text-[11px] uppercase tracking-wider">Impact</span>
                  </div>
                  <div className="overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-6 aspect-[16/10] flex flex-col justify-between transition group-hover:border-zinc-400 dark:group-hover:border-zinc-600 shadow-xs">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 mb-2">
                        {p.impactSuffix || 'Delivered Value'}
                      </span>
                      <p className="line-clamp-4 text-xs sm:text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium">
                        "{p.impact || p.overview}"
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectProject(p)
                        }}
                        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-3 text-xs font-semibold"
                      >
                        <Eye size={13} />
                        <span>{t.projects.details}</span>
                      </button>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 text-xs font-semibold text-zinc-900 dark:text-white"
                        >
                          <span>{t.projects.demo}</span>
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* GRID MODE: Standard Editorial Card Grid */}
      {viewMode === 'grid' && (
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map(([key, p]) => (
            <article
              key={key}
              className="min-w-0 overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => onSelectProject(p)}
                className="block min-h-11 w-full overflow-hidden bg-zinc-950 text-left cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className={`aspect-[16/10] w-full ${p.imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition duration-500 hover:scale-105`}
                />
              </button>
              <div className="p-4 sm:p-6">
                <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
                  {p.badges?.[0]}
                </p>
                <h2 className="mt-2 break-words text-xl font-bold">{p.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {p.overview}
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => onSelectProject(p)}
                    className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 px-4 font-semibold cursor-pointer"
                  >
                    <Eye size={16} />
                    {t.projects.details}
                  </button>
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-white px-4 text-center font-semibold"
                  >
                    {t.projects.demo}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Floating Bottom Left View Toggle (like in the video) */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-1 p-1 rounded-full bg-zinc-900/90 dark:bg-white/95 text-white dark:text-zinc-950 shadow-2xl backdrop-blur-md border border-zinc-700/50 dark:border-zinc-300/50 text-xs font-mono">
        <button
          type="button"
          onClick={() => setViewMode('gallery')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            viewMode === 'gallery'
              ? 'bg-white text-zinc-950 dark:bg-zinc-900 dark:text-white shadow-xs'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          Gallery
        </button>
        <button
          type="button"
          onClick={() => setViewMode('grid')}
          className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
            viewMode === 'grid'
              ? 'bg-white text-zinc-950 dark:bg-zinc-900 dark:text-white shadow-xs'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          Grid
        </button>
      </div>
    </>
  )
}
