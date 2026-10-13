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

  // Snap to the next/previous section only once the current one has been fully
  // scrolled through, so sections taller than the viewport stay readable.
  // Returns true when the snap was handled (caller should preventDefault).
  const snapInDirection = useCallback((direction) => {
    const els = FULLPAGE_SECTIONS.map((s) => document.getElementById(s.id))
    const y = window.scrollY
    const vh = window.innerHeight

    let idx = 0
    els.forEach((el, i) => {
      if (el && el.offsetTop <= y + 2) idx = i
    })
    const current = els[idx]
    if (!current) return false

    if (direction > 0) {
      const bottom = current.offsetTop + current.offsetHeight
      if (y + vh < bottom - 2) return false // still content below in this section
      if (idx >= els.length - 1) return false
      scrollToIdx(idx + 1)
      return true
    }

    if (y > current.offsetTop + 2) return false // still content above in this section
    if (idx <= 0) return false
    const prev = els[idx - 1]
    // Land on the bottom of a tall previous section instead of jumping past it
    const target = Math.max(prev.offsetTop, prev.offsetTop + prev.offsetHeight - vh)
    isTransitioningRef.current = true
    setActiveIdx(idx - 1)
    window.scrollTo({ top: target, behavior: 'smooth' })
    setTimeout(() => {
      isTransitioningRef.current = false
    }, 750)
    return true
  }, [scrollToIdx])

  // Full-page Scroll Controller (Wheel, Keyboard). Touch devices keep native scrolling.
  useEffect(() => {
    const handleWheel = (e) => {
      if (isModalOpen) return // Allow standard scroll inside modal

      // Don't intercept if wheel delta is very small or if we are actively transitioning
      if (Math.abs(e.deltaY) < 30) return

      if (isTransitioningRef.current) {
        e.preventDefault()
        return
      }

      if (snapInDirection(e.deltaY > 0 ? 1 : -1)) e.preventDefault()
    }

    const handleKeyDown = (e) => {
      if (isModalOpen) return
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (snapInDirection(1)) e.preventDefault()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (snapInDirection(-1)) e.preventDefault()
      } else if (e.key === 'Home') {
        e.preventDefault()
        scrollToIdx(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        scrollToIdx(FULLPAGE_SECTIONS.length - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen, scrollToIdx, snapInDirection])

  return {
    activeIdx,
    activeSection: FULLPAGE_SECTIONS[activeIdx] || FULLPAGE_SECTIONS[0],
    scrollProgress,
    scrollToIdx,
    scrollToId,
    sections: FULLPAGE_SECTIONS
  }
}
