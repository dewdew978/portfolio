import React, { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { FULLPAGE_SECTIONS } from '../hooks/useFullpageScroll'

export default function FullpageNavigator({
  activeIdx = 0,
  scrollToIdx,
  scrollProgress = 0,
  sections = FULLPAGE_SECTIONS
}) {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDotClick = (index, secId) => {
    if (scrollToIdx) {
      scrollToIdx(index)
    } else {
      const el = document.getElementById(secId)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToTop = () => {
    if (scrollToIdx) {
      scrollToIdx(0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-zinc-200/40 dark:bg-zinc-800/40 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out shadow-xs shadow-indigo-500/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Right Pagination Dots */}
      <nav
        aria-label="Page Sections Navigation"
        className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3.5 p-2 rounded-full backdrop-blur-md bg-white/40 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 shadow-lg shadow-black/5 select-none"
      >
        {sections.map((sec, idx) => {
          const isActive = activeIdx === idx
          return (
            <button
              key={sec.id}
              onClick={() => handleDotClick(idx, sec.id)}
              className="group relative flex items-center justify-end focus:outline-none cursor-pointer"
              title={`${sec.number} • ${sec.label}`}
              aria-label={`Scroll to ${sec.label}`}
            >
              {/* Floating Hover / Active Tooltip Label */}
              <span
                className={`absolute right-7 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all duration-200 pointer-events-none backdrop-blur-md shadow-sm border ${
                  isActive
                    ? 'opacity-100 translate-x-0 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-zinc-800 dark:border-zinc-200'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 bg-white/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <span className="text-indigo-400 font-mono mr-1.5">{sec.number}</span>
                <span>{sec.thai}</span>
              </span>

              {/* Indicator Dot / Pill */}
              <div
                className={`transition-all duration-300 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'w-3 h-7 bg-gradient-to-b from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/40 ring-2 ring-indigo-400/30'
                    : 'w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-500 hover:scale-125'
                }`}
              />
            </button>
          )
        })}
      </nav>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-xl hover:shadow-2xl hover:text-indigo-600 dark:hover:text-indigo-400 hover:-translate-y-1 transition-all duration-200 backdrop-blur-md focus:outline-none"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  )
}
