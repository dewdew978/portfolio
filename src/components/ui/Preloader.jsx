import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

export default function Preloader({ onComplete }) {
  // scene: 1 = "Hello welcome", 2 = "Pawarit Pansing, it's me", 3 = done
  const [scene, setScene] = useState(1)
  const [displayText, setDisplayText] = useState('')
  const [sceneExiting, setSceneExiting] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const reducedMotion = useReducedMotion()

  const scene1Text = 'Hello welcome'
  const scene2Text = "Pawarit Pansing, it's me"

  useEffect(() => {
    if (reducedMotion) {
      onComplete?.()
      return
    }

    let currentIndex = 0
    let timer = null

    if (scene === 1) {
      setDisplayText('')
      setSceneExiting(false)

      const typeScene1 = () => {
        if (currentIndex <= scene1Text.length) {
          setDisplayText(scene1Text.slice(0, currentIndex))
          currentIndex++
          timer = setTimeout(typeScene1, 45)
        } else {
          // Pause when "Hello welcome" is fully typed
          timer = setTimeout(() => {
            setSceneExiting(true)
            // Fade out, then move to scene 2
            timer = setTimeout(() => {
              setScene(2)
            }, 350)
          }, 450)
        }
      }

      timer = setTimeout(typeScene1, 200)
    } else if (scene === 2) {
      setDisplayText('')
      setSceneExiting(false)

      const typeScene2 = () => {
        if (currentIndex <= scene2Text.length) {
          setDisplayText(scene2Text.slice(0, currentIndex))
          currentIndex++
          const char = scene2Text[currentIndex - 1]
          const delay = char === ',' ? 180 : 38
          timer = setTimeout(typeScene2, delay)
        } else {
          // Pause when "Pawarit Pansing, it's me" is fully typed
          timer = setTimeout(() => {
            setIsDone(true)
            timer = setTimeout(() => {
              onComplete?.()
            }, 600)
          }, 600)
        }
      }

      timer = setTimeout(typeScene2, 150)
    }

    return () => clearTimeout(timer)
  }, [scene, reducedMotion, onComplete])

  const handleSkip = () => {
    setIsDone(true)
    setTimeout(() => {
      onComplete?.()
    }, 250)
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
          exit={{ opacity: 0, y: -24, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          onClick={handleSkip}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#fbfaf8] dark:bg-[#0a0908] text-zinc-950 dark:text-[#fbfaf8] select-none cursor-pointer px-6 overflow-hidden"
          aria-label="Loading introduction. Click or press Escape to skip."
          role="status"
        >
          {/* Subtle grain texture */}
          <div className="absolute inset-0 bg-noise opacity-35 pointer-events-none" />

          {/* Center Display Container */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center">
            {/* Top Minimal Branding */}
            <div className="mb-6 sm:mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 animate-pulse" />
              <span
                style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                className="text-xs uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 font-medium"
              >
                pawarit.dev
              </span>
            </div>

            {/* Large Animated SF Pro Text */}
            <div className="min-h-[5rem] sm:min-h-[7rem] md:min-h-[8.5rem] flex items-center justify-center w-full px-2">
              <div
                className={`transition-all duration-300 transform ${
                  sceneExiting ? 'opacity-0 -translate-y-4 scale-98' : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                <h1
                  style={{
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.035em'
                  }}
                  className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight"
                >
                  <span>{displayText}</span>
                  <span
                    className="inline-block w-3 sm:w-4 md:w-5 h-7 sm:h-10 md:h-12 ml-1.5 bg-zinc-900 dark:bg-zinc-100 align-baseline animate-pulse"
                    aria-hidden="true"
                  />
                </h1>
              </div>
            </div>

            {/* Skip Cue */}
            <p
              style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif' }}
              className="mt-8 sm:mt-12 text-[11px] sm:text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600"
            >
              click or press esc to skip
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
