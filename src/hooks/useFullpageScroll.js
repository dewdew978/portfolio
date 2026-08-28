import { useEffect, useRef, useState, useCallback } from 'react'

export const FULLPAGE_SECTIONS = [
  { id: 'hero', number: '01', label: 'Intro', thai: 'หน้าแรก' },
  { id: 'about', number: '02', label: 'About', thai: 'เกี่ยวกับ' },
  { id: 'skills', number: '03', label: 'Skills', thai: 'ทักษะ' },
  { id: 'projects', number: '04', label: 'Works', thai: 'ผลงาน' },
  { id: 'experience', number: '05', label: 'Journey', thai: 'ประสบการณ์' },
  { id: 'contact', number: '06', label: 'Contact', thai: 'ติดต่อ' }
]

export function useFullpageScroll(isModalOpen = false) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isTransitioningRef = useRef(false)
  const touchStartYRef = useRef(0)

  const scrollToIdx = useCallback((index) => {
    if (index < 0 || index >= FULLPAGE_SECTIONS.length) return
    const targetSection = FULLPAGE_SECTIONS[index]
    const el = document.getElementById(targetSection.id)
    if (!el) return

    isTransitioningRef.current = true
    setActiveIdx(index)

    const targetTop = el.offsetTop
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    })

    setTimeout(() => {
      isTransitioningRef.current = false
    }, 750)
  }, [])

  const scrollToId = useCallback((id) => {
    const idx = FULLPAGE_SECTIONS.findIndex((s) => s.id === id)
    if (idx !== -1) {
      scrollToIdx(idx)
    }
  }, [scrollToIdx])

  // Sync active section based on scroll position (when clicking links or resizing)
  useEffect(() => {
    const handleScrollSync = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0
      setScrollProgress(progress)

      if (isTransitioningRef.current) return

      const midPoint = currentScroll + window.innerHeight / 2.5
      for (let i = FULLPAGE_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(FULLPAGE_SECTIONS[i].id)
        if (el && midPoint >= el.offsetTop) {
          setActiveIdx(i)
          return
        }
      }
      setActiveIdx(0)
    }

    window.addEventListener('scroll', handleScrollSync, { passive: true })
    handleScrollSync()
    return () => window.removeEventListener('scroll', handleScrollSync)
  }, [])

  // Full-page Scroll Controller (Wheel, Keyboard, Touch)
  useEffect(() => {
    const handleWheel = (e) => {
      if (isModalOpen) return // Allow standard scroll inside modal

      // Don't intercept if wheel delta is very small or if we are actively transitioning
      if (Math.abs(e.deltaY) < 30) return

      if (isTransitioningRef.current) {
        e.preventDefault()
        return
      }

      if (e.deltaY > 0) {
        // Next section
        if (activeIdx < FULLPAGE_SECTIONS.length - 1) {
          e.preventDefault()
          scrollToIdx(activeIdx + 1)
        }
      } else {
        // Prev section
        if (activeIdx > 0) {
          e.preventDefault()
          scrollToIdx(activeIdx - 1)
        }
      }
    }

    const handleKeyDown = (e) => {
      if (isModalOpen) return
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (activeIdx < FULLPAGE_SECTIONS.length - 1) {
          e.preventDefault()
          scrollToIdx(activeIdx + 1)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (activeIdx > 0) {
          e.preventDefault()
          scrollToIdx(activeIdx - 1)
        }
      } else if (e.key === 'Home') {
        e.preventDefault()
        scrollToIdx(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        scrollToIdx(FULLPAGE_SECTIONS.length - 1)
      }
    }

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartYRef.current = e.touches[0].clientY
      }
    }

    const handleTouchEnd = (e) => {
      if (isModalOpen || isTransitioningRef.current) return
      if (!e.changedTouches || !e.changedTouches[0]) return

      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartYRef.current - touchEndY

      if (Math.abs(diff) > 45) {
        if (diff > 0 && activeIdx < FULLPAGE_SECTIONS.length - 1) {
          scrollToIdx(activeIdx + 1)
        } else if (diff < 0 && activeIdx > 0) {
          scrollToIdx(activeIdx - 1)
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeIdx, isModalOpen, scrollToIdx])

  return {
    activeIdx,
    activeSection: FULLPAGE_SECTIONS[activeIdx] || FULLPAGE_SECTIONS[0],
    scrollProgress,
    scrollToIdx,
    scrollToId,
    sections: FULLPAGE_SECTIONS
  }
}
