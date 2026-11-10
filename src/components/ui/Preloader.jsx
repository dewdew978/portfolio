import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export default function Preloader({ onComplete }) {
  const [text, setText] = useState('')
  const [phase, setPhase] = useState(0) // 0: typing, 1: done typing, 2: exiting
  const reducedMotion = useReducedMotion()

  const fullText = "Hello welcome — Pawarit Pansing, it's me."

  useEffect(() => {
    if (reducedMotion) {
      onComplete?.()
      return
    }

    let currentIndex = 0
    let timer = null

    // Snappy typing speed: ~45ms per character
    const typeNextChar = () => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex))
        currentIndex++
        
        // Slight natural pause after comma or dash
        const char = fullText[currentIndex - 1]
        let delay = 42
        if (char === ',' || char === '—') delay = 180
        if (char === '.') delay = 250

        timer = setTimeout(typeNextChar, delay)
      } else {
        setPhase(1)
        // Hold for 500ms when finished typing, then exit
        timer = setTimeout(() => {
          setPhase(2)
          setTimeout(() => {
            onComplete?.()
          }, 600) // matches exit animation duration
        }, 500)
      }
    }

    timer = setTimeout(typeNextChar, 250)

    return () => clearTimeout(timer)
  }, [reducedMotion, onComplete])

  // Allow clicking anywhere or pressing Escape/Space to skip intro
  const handleSkip = () => {
    setPhase(2)
    setTimeout(() => {
      onComplete?.()
    }, 300)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          onClick={handleSkip}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fbfaf8] dark:bg-[#0a0908] text-zinc-950 dark:text-[#fbfaf8] select-none cursor-pointer px-6"
          aria-label="Loading introduction. Click or press Escape to skip."
          role="status"
        >
          {/* Subtle noise / ambient grain */}
          <div className="absolute inset-0 bg-noise opacity-40 pointer-events-none" />

          {/* Minimal Terminal Card */}
          <div className="relative z-10 flex flex-col items-center max-w-xl text-center">
            {/* Minimal Prompt Indicator */}
            <div className="mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                pawarit.dev
              </span>
            </div>

            {/* Typewritten Display Text */}
            <div className="min-h-[4rem] sm:min-h-[5rem] flex items-center justify-center">
              <h1 className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                <span>{text}</span>
                <span
                  className="inline-block w-2.5 sm:w-3 h-5 sm:h-6 ml-1 bg-zinc-900 dark:bg-zinc-100 align-middle animate-pulse"
                  aria-hidden="true"
                />
              </h1>
            </div>

            {/* Minimal Skip Hint */}
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600 transition-opacity">
              click or press esc to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
