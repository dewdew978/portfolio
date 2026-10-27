import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, X, Download, Sparkles } from 'lucide-react'
import { getAssetUrl } from '@/utils/url'
import { useLanguage } from '@/context/LanguageContext'
import PixelOrb from '@/components/brand/PixelOrb'

export default function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, setLang, toggleLang, t } = useLanguage()

  const navLinks = [
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience },
    { id: 'contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinks.map(l => document.getElementById(l.id))
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i]
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id)
          return
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lang])

  const scrollToSection = (id) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          const navHeight = 90
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          })
        }
      }, 150)
      return
    }

    const element = document.getElementById(id)
    if (element) {
      const navHeight = 90
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <header className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-3 sm:px-4 py-2 rounded-full backdrop-blur-xl border transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-zinc-900/90 border-zinc-300/70 dark:border-zinc-700/80 shadow-2xl shadow-indigo-500/10'
            : 'bg-white/80 dark:bg-zinc-900/75 border-zinc-200/80 dark:border-zinc-800/80 shadow-xl shadow-black/5 dark:shadow-black/40'
        }`}
      >
        {/* Brand Logo */}
        <div
          className="flex min-h-11 min-w-11 shrink-0 items-center gap-2.5 text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white hover:opacity-85 transition-opacity cursor-pointer"
        >
          <PixelOrb
            size="sm"
            interactive
            onActivate={() => {
              if (location.pathname !== '/') navigate('/')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
          <button
            type="button"
            onClick={() => {
              if (location.pathname !== '/') navigate('/')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="hidden min-[360px]:inline cursor-pointer"
          >
            <span>Pawarit</span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-800/60 p-1 rounded-full border border-zinc-200/60 dark:border-zinc-700/50">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`px-3 xl:px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white font-semibold shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Segment */}
          <div className="flex items-center bg-zinc-100 dark:bg-zinc-800/80 rounded-full p-0.5 border border-zinc-200 dark:border-zinc-700/70 text-xs font-semibold">
            <button
              onClick={() => setLang('th')}
              title="ภาษาไทย"
              aria-label="เปลี่ยนเป็นภาษาไทย"
              className={`min-h-11 min-w-11 px-2 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'th'
                  ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              TH
            </button>
            <button
              onClick={() => setLang('en')}
              title="English"
              aria-label="Switch to English"
              className={`min-h-11 min-w-11 px-2 py-1 rounded-full transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Switcher Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? t.nav.toggleThemeLight : t.nav.toggleThemeDark}
            aria-label={theme === 'dark' ? t.nav.toggleThemeLight : t.nav.toggleThemeDark}
            className="min-h-11 min-w-11 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Download Resume Button */}
          <a
            href={getAssetUrl('/assets/Pawarit-Pansing-CV.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Download size={14} />
            <span>{t.nav.resume}</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="เมนูนำทาง"
            className="flex lg:hidden min-h-11 min-w-11 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <div
        className={`absolute top-full mt-2 inset-x-3 sm:inset-x-4 max-h-[calc(100svh-6rem)] overflow-y-auto p-4 rounded-2xl backdrop-blur-2xl border bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-800 shadow-2xl pointer-events-auto transition-all duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-2 scale-95 invisible'
        }`}
      >
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && <Sparkles size={16} className="text-indigo-500" />}
              </button>
            </li>
          ))}
          <li className="mt-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <a
              href={getAssetUrl('/assets/Pawarit-Pansing-CV.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/25"
            >
              <Download size={16} />
              <span>{t.nav.resumeDownload}</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
