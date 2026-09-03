import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/locales/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_lang')
      if (saved === 'th' || saved === 'en') return saved
    }
    return 'th'
  })

  const setLang = (newLang) => {
    if (newLang === 'th' || newLang === 'en') {
      setLangState(newLang)
      localStorage.setItem('portfolio_lang', newLang)
    }
  }

  const toggleLang = () => {
    setLang(lang === 'th' ? 'en' : 'th')
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = translations[lang] || translations.th

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
