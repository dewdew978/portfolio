import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Sun, Moon, Menu, X, Download, Sparkles, Activity } from 'lucide-react'
import { getAssetUrl } from '@/utils/url'

const navLinks = [
  { id: 'about', label: 'เกี่ยวกับ' },
  { id: 'skills', label: 'ทักษะ' },
  { id: 'projects', label: 'ผลงาน' },
  { id: 'experience', label: 'ประสบการณ์' },
  { id: 'contact', label: 'ติดต่อ' },
]

export default function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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
  }, [])

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
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto flex items-center justify-between w-full max-w-5xl px-4 py-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-zinc-900/90 border-zinc-300/70 dark:border-zinc-700/80 shadow-2xl shadow-indigo-500/10'
            : 'bg-white/80 dark:bg-zinc-900/75 border-zinc-200/80 dark:border-zinc-800/80 shadow-xl shadow-black/5 dark:shadow-black/40'
        }`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/')
            }
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white hover:opacity-85 transition-opacity cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm shadow-indigo-500 animate-pulse"></span>
          <span>Pawarit.</span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center">
          <ul className="flex items-center gap-1 bg-zinc-100/90 dark:bg-zinc-800/60 p-1 rounded-full border border-zinc-200/60 dark:border-zinc-700/50">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
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
          {/* Athletics / Activities Page Link */}
          <Link
            to="/athletics"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#FC5200] bg-orange-50 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-900/60 hover:bg-orange-100 dark:hover:bg-orange-900/80 hover:-translate-y-0.5 transition-all shadow-xs"
            title="ดูกิจกรรมวิ่ง (activities)"
          >
            <Activity size={13} className="text-[#FC5200]" />
            <span className="capitalize">activities</span>
          </Link>

          {/* Theme Switcher Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
            aria-label="สลับโหมดมืด/สว่าง"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Download Resume Button */}
          <a
            href={getAssetUrl('/assets/CV.pdf')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Download size={14} />
            <span>เรซูเม่</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="เมนูนำทาง"
            className="flex md:hidden w-9 h-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      <div
        className={`absolute top-full mt-2 inset-x-4 p-4 rounded-2xl backdrop-blur-2xl border bg-white/95 dark:bg-zinc-900/95 border-zinc-200 dark:border-zinc-800 shadow-2xl pointer-events-auto transition-all duration-300 md:hidden ${
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
          <li className="pt-1">
            <Link
              to="/athletics"
              onClick={() => setMenuOpen(false)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-medium text-[#FC5200] hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-colors"
            >
              <span>activities</span>
              <Activity size={16} />
            </Link>
          </li>
          <li className="mt-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <a
              href={getAssetUrl('/assets/CV.pdf')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md shadow-indigo-500/25"
            >
              <Download size={16} />
              <span>ดาวน์โหลดเรซูเม่ (CV.pdf)</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
