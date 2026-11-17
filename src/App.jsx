import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
// Code-split: the projects page and the intro animation load on demand
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const Preloader = lazy(() => import('./components/ui/Preloader'))
import ScrollToTop from './components/ui/ScrollToTop'

const PRELOADER_SEEN_KEY = 'pawarit_has_seen_preloader'

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const explicit = localStorage.getItem('pawarit_theme_explicit')
      if (!explicit) {
        try { localStorage.setItem('theme', 'light') } catch {}
        return 'light'
      }
    }
    return localStorage.getItem('theme') || 'light'
  })
  const [loading, setLoading] = useState(() => {
    if (typeof window === 'undefined') return false
    // Play the intro once per browser session, and never for reduced-motion users
    let seen = false
    try { seen = sessionStorage.getItem(PRELOADER_SEEN_KEY) === '1' } catch {}
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    return !seen && !reducedMotion
  })

  const handlePreloaderComplete = () => {
    try { sessionStorage.setItem(PRELOADER_SEEN_KEY, '1') } catch {}
    setLoading(false)
  }

  useEffect(() => {
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      if (metaTheme) metaTheme.setAttribute('content', '#0a0908')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      if (metaTheme) metaTheme.setAttribute('content', '#fbfaf8')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      {loading && (
        <Suspense fallback={<div aria-hidden="true" className="fixed inset-0 z-[100] bg-[#fbfaf8] dark:bg-[#0a0908]" />}>
          <Preloader onComplete={handlePreloaderComplete} />
        </Suspense>
      )}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
        <Route path="/projects" element={<Suspense fallback={<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950" />}><ProjectsPage theme={theme} setTheme={setTheme} /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
