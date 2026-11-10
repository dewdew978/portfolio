import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function Preloader({ onComplete }) {
  // scene: 1 = "Hello welcome", 2 = "Pawarit Pansing, it's me"
  const [scene, setScene] = useState(1)
  const [displayText, setDisplayText] = useState('')
  const [sceneExiting, setSceneExiting] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [fontReady, setFontReady] = useState(false)

  const scene1Text = 'Hello welcome'
  const scene2Text = "Pawarit Pansing, it's me"

  // Ensure Caveat font is loaded before typewriter starts
  useEffect(() => {
    let active = true
    const fallbackTimer = setTimeout(() => {
      if (active) setFontReady(true)
    }, 250)

    if (typeof document !== 'undefined' && document.fonts?.load) {
      document.fonts.load('64px "Caveat"').then(() => {
        if (active) setFontReady(true)
      }).catch(() => {
        if (active) setFontReady(true)
      })
    } else {
      setFontReady(true)
    }

    return () => {
      active = false
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    if (!fontReady) return

    let currentIndex = 0
    let timer = null

    if (scene === 1) {
      setDisplayText('')
      setSceneExiting(false)

      const typeScene1 = () => {
        if (currentIndex <= scene1Text.length) {
          setDisplayText(scene1Text.slice(0, currentIndex))
          currentIndex++
          const char = scene1Text[currentIndex - 1]
          const delay = char === ' ' ? 140 : 88
          timer = setTimeout(typeScene1, delay)
        } else {
          // Pause when "Hello welcome" is fully written
          timer = setTimeout(() => {
            setSceneExiting(true)
            // Fade out smoothly, then proceed to Scene 2
            timer = setTimeout(() => {
              setScene(2)
            }, 450)
          }, 750)
        }
      }

      timer = setTimeout(typeScene1, 220)
    } else if (scene === 2) {
      setDisplayText('')
      setSceneExiting(false)

      const typeScene2 = () => {
        if (currentIndex <= scene2Text.length) {
          setDisplayText(scene2Text.slice(0, currentIndex))
          currentIndex++
          const char = scene2Text[currentIndex - 1]
          let delay = 84
          if (char === ',') delay = 280
          else if (char === ' ') delay = 130
          timer = setTimeout(typeScene2, delay)
        } else {
          // Pause when "Pawarit Pansing, it's me" is fully written
          timer = setTimeout(() => {
            setIsDone(true)
            timer = setTimeout(() => {
              onComplete?.()
            }, 850)
          }, 900)
        }
      }

      timer = setTimeout(typeScene2, 220)
    }

    return () => clearTimeout(timer)
  }, [scene, fontReady])

  const handleSkip = () => {
    setIsDone(true)
    setTimeout(() => {
      onComplete?.()
    }, 400)
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
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.01,
            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fbfaf8] dark:bg-[#0a0908] text-zinc-950 dark:text-[#fbfaf8] select-none cursor-pointer px-6 overflow-hidden"
          aria-label="Loading introduction. Click or press Escape to skip."
          role="status"
        >
          {/* Subtle noise grain texture */}
          <div className="absolute inset-0 bg-noise opacity-35 pointer-events-none" />

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center">
            {/* Minimal Brand Label */}
            <div className="mb-6 sm:mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 font-medium">
                pawarit.dev
              </span>
            </div>

            {/* Large Caveat Handwriting Display */}
            <div className="min-h-[6.5rem] sm:min-h-[8.5rem] md:min-h-[11rem] flex items-center justify-center w-full px-2">
              <div
                className={`transition-all duration-450 transform ${
                  sceneExiting ? 'opacity-0 -translate-y-3 scale-98' : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                <h1 className="font-caveat text-5xl min-[480px]:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold text-zinc-900 dark:text-zinc-100 leading-tight tracking-wide">
                  <span className="font-caveat">{displayText}</span>
                  <span
                    className="inline-block w-1 sm:w-1.5 h-10 sm:h-14 md:h-20 ml-2 bg-zinc-900 dark:bg-zinc-100 align-middle animate-pulse"
                    aria-hidden="true"
                  />
                </h1>
              </div>
            </div>

            {/* Minimal Skip Cue */}
            <p className="mt-8 sm:mt-12 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
              click or press esc to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
