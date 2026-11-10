import React, { useState, useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import Preloader from './components/ui/Preloader'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })
  const [loading, setLoading] = useState(true)

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
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
        <Route path="/projects" element={<ProjectsPage theme={theme} setTheme={setTheme} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
