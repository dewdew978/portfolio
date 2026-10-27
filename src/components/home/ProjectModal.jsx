import React, { useEffect, useRef } from 'react'
import { X, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

function TextSection({ title, children }) {
  return (
    <section className="border-t border-zinc-200 py-5 first:border-t-0 first:pt-0 sm:py-6 dark:border-zinc-800">
      <h4 className="text-base font-bold leading-snug text-zinc-950 sm:text-lg dark:text-white">{title}</h4>
      <div className="mt-2.5 text-sm leading-6 text-zinc-700 sm:text-[0.95rem] sm:leading-7 dark:text-zinc-300">{children}</div>
    </section>
  )
}

export default function ProjectModal({ project, onClose }) {
  const { t } = useLanguage()
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    const previousActiveElement = document.activeElement
    closeButtonRef.current?.focus()

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = [...dialogRef.current.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )]
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousActiveElement?.focus?.()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div
        role="dialog"
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative max-h-[94svh] w-full max-w-[760px] overflow-hidden rounded-t-3xl border border-zinc-200 bg-white shadow-2xl sm:max-h-[82vh] sm:rounded-3xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label={t.projects.modal.close}
          className="absolute right-4 top-4 z-20 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 backdrop-blur transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <X size={18} />
        </button>

        <div className="max-h-[94svh] overflow-y-auto sm:max-h-[82vh]">
        <header className="px-5 pb-5 pt-6 pr-20 sm:px-8 sm:pb-6 sm:pt-8 sm:pr-20">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">{project.category}</p>
          <h3 id="project-modal-title" className="mt-2 max-w-2xl break-words text-2xl font-extrabold leading-tight tracking-tight text-zinc-950 sm:text-3xl dark:text-white">{project.title}</h3>
          {project.impactSuffix && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500 dark:text-zinc-400">{project.impactSuffix}</p>
          )}
        </header>

        {project.image && (
          <div className="mx-5 overflow-hidden rounded-2xl bg-zinc-100 sm:mx-8 dark:bg-zinc-900">
            <img
              src={project.image}
              alt={project.title}
              className={`aspect-[16/6] w-full ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          </div>
        )}

        <div className="mx-auto max-w-2xl px-5 pb-1 pt-6 sm:px-8 sm:pt-7">
          <TextSection title={t.projects.modal.overview}>
            <p>{project.overview}</p>
          </TextSection>

          {project.features?.length > 0 && (
            <TextSection title={t.projects.modal.features}>
              <ul className="space-y-2.5">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TextSection>
          )}

          <TextSection title={t.projects.modal.impact}>
            <p>{project.impact}</p>
          </TextSection>
        </div>

        <footer className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-zinc-200 px-5 py-4 sm:px-8 dark:border-zinc-800">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950 dark:text-white dark:decoration-zinc-700 dark:hover:decoration-white"
          >
            {project.liveLabel || t.projects.modal.launchDemo}
            <ExternalLink size={14} />
          </a>
          {project.gitHubUrl && (
            <a
              href={project.gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-950 hover:decoration-zinc-950 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-white dark:hover:decoration-white"
            >
              GitHub
            </a>
          )}
        </footer>
        </div>
      </div>
    </div>
  )
}
