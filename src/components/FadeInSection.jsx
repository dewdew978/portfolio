import React, { useEffect, useRef, useState } from 'react'

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  duration = 600,
  threshold = 0.05,
  once = true
}) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef(null)

  useEffect(() => {
    const currentEl = domRef.current
    if (!currentEl) return

    // Immediately show if already within viewport
    const rect = currentEl.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true)
      if (once) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else {
          if (!once) setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px 50px 0px'
      }
    )

    observer.observe(currentEl)

    return () => {
      if (currentEl) observer.unobserve(currentEl)
    }
  }, [threshold, once])

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)'
    switch (direction) {
      case 'up':
        return 'translate3d(0, 24px, 0)'
      case 'down':
        return 'translate3d(0, -24px, 0)'
      case 'left':
        return 'translate3d(24px, 0, 0)'
      case 'right':
        return 'translate3d(-24px, 0, 0)'
      case 'none':
      default:
        return 'translate3d(0, 0, 0)'
    }
  }

  return (
    <div
      ref={domRef}
      className={`transition-all ${className}`}
      style={{
        opacity: isVisible ? 1 : 0.01,
        transform: getTransform(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  )
}


