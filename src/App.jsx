import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AthleticsPage from './pages/AthleticsPage'

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
      <Route path="/athletics" element={<AthleticsPage theme={theme} setTheme={setTheme} />} />
      <Route path="/strava" element={<AthleticsPage theme={theme} setTheme={setTheme} />} />
    </Routes>
  )
}
