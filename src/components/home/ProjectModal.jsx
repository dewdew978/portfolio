import React from 'react'
import { X, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ProjectModal({ project, onClose }) {
  const { t } = useLanguage()

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[94svh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="p-5 sm:p-6 pr-16 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white relative">
          <button
            onClick={() => onClose()}
            aria-label={t.projects.modal.close}
            className="absolute top-3 right-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
          <span className="text-xs uppercase tracking-widest font-mono text-white/80">{project.category}</span>
          <h3 className="break-words text-xl sm:text-2xl font-bold mt-1 text-white">{project.title}</h3>
        </div>

        <div className="p-5 sm:p-8 space-y-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
          {project.image && (
            <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 max-h-64">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
              {t.projects.modal.overview}
            </h4>
            <p>{project.overview}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1.5">
              {t.projects.modal.architecture}
            </h4>
            <p>{project.architecture}</p>
          </div>

          {project.features && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-2">
                {t.projects.modal.features}
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {project.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
              {t.projects.modal.impact}
            </h4>
            <p>{project.impact}</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
          <button
            onClick={() => onClose()}
            className="min-h-11 w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {t.projects.modal.close}
          </button>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={project.gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
            >
              GitHub
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 transition-colors"
            >
              <span>{project.liveLabel || t.projects.modal.launchDemo}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
