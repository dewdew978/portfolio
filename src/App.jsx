import React, { useState, useEffect } from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} setTheme={setTheme} />} />
      <Route path="/projects" element={<ProjectsPage theme={theme} setTheme={setTheme} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
