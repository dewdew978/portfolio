import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { playWritingStroke, playKeyStroke, resumeAudio } from '../../utils/keyboardAudio'
import scene1Svg from '../../assets/handwriting/scene1.svg?raw'
import scene2Svg from '../../assets/handwriting/scene2.svg?raw'

// Exact stroke begin timestamps & drawing durations (in seconds) synchronized with pen writing sound
const SCENE_1_STROKES = [
  { t: 0, dur: 0.1037, isSpace: false },
  { t: 0.1663, dur: 0.0921, isSpace: false },
  { t: 0.3208, dur: 0.0471, isSpace: false },
  { t: 0.4096, dur: 0.1229, isSpace: false },
  { t: 0.5742, dur: 0.0871, isSpace: false },
  { t: 0.7029, dur: 0.0758, isSpace: false },
  { t: 0.8204, dur: 0.1096, isSpace: false },
  { t: 0.9925, dur: 0.0458, isSpace: true }, // 'welcome' begins
  { t: 1.1008, dur: 0.0842, isSpace: false },
  { t: 1.2475, dur: 0.0292, isSpace: false },
  { t: 1.3183, dur: 0.1292, isSpace: false },
  { t: 1.4892, dur: 0.0871, isSpace: false },
  { t: 1.6179, dur: 0.0971, isSpace: false },
  { t: 1.7567, dur: 0.1154, isSpace: false },
  { t: 1.9138, dur: 0.1579, isSpace: false },
  { t: 2.1342, dur: 0.0067, isDot: true, isSpace: false },
  { t: 2.1825, dur: 0.1317, isSpace: false },
]

const SCENE_1_TEXT_BY_STROKE = [
  'H',
  'H',
  'H',
  'He',
  'Hel',
  'Hell',
  'Hello',
  'Hello ',
  'Hello w',
  'Hello w',
  'Hello we',
  'Hello wel',
  'Hello welc',
  'Hello welco',
  'Hello welcom',
  'Hello welcome',
  'Hello welcome',
]

const SCENE_2_STROKES = [
  { t: 0, dur: 0.0642, isSpace: false },
  { t: 0.1267, dur: 0.1367, isSpace: false },
  { t: 0.305, dur: 0.1442, isSpace: false },
  { t: 0.4908, dur: 0.055, isSpace: false },
  { t: 0.6083, dur: 0.0842, isSpace: false },
  { t: 0.7342, dur: 0.0629, isSpace: false },
  { t: 0.8596, dur: 0.0725, isSpace: false },
  { t: 0.9738, dur: 0.0508, isSpace: true }, // 'Pansing' begins
  { t: 1.0871, dur: 0.0142, isDot: true, isSpace: false },
  { t: 1.1429, dur: 0.005, isDot: true, isSpace: false },
  { t: 1.2104, dur: 0.0296, isSpace: false },
  { t: 1.2817, dur: 0.0833, isSpace: false },
  { t: 1.4275, dur: 0.0392, isSpace: false },
  { t: 1.5292, dur: 0.0642, isSpace: false },
  { t: 1.6558, dur: 0.1367, isSpace: false },
  { t: 1.8342, dur: 0.1442, isPunctuation: true }, // comma
  { t: 2.02, dur: 0.1246, isSpace: true }, // "it's" begins
  { t: 2.1863, dur: 0.0958, isSpace: false },
  { t: 2.3238, dur: 0.0008, isDot: true, isSpace: false },
  { t: 2.3871, dur: 0.0346, isPunctuation: true }, // apostrophe
  { t: 2.4633, dur: 0.1142, isSpace: false },
  { t: 2.6192, dur: 0.1092, isSpace: true }, // "me" begins
  { t: 2.7908, dur: 0.0729, isSpace: false },
  { t: 2.9054, dur: 0.0292, isSpace: false },
  { t: 2.9971, dur: 0.005, isDot: true, isSpace: false },
  { t: 3.0646, dur: 0.0308, isSpace: false },
  { t: 3.1371, dur: 0.0987, isSpace: false },
  { t: 3.2983, dur: 0.0308, isSpace: false },
  { t: 3.3708, dur: 0.0271, isSpace: false },
  { t: 3.4396, dur: 0.1112, isSpace: false },
  { t: 3.6133, dur: 0.2137, isSpace: false },
]

const SCENE_2_TEXT_BY_STROKE = [
  'P',
  'P',
  'Pa',
  'Paw',
  'Paw',
  'Pawa',
  'Pawar',
  'Pawari',
  'Pawari',
  'Pawarit',
  'Pawarit',
  'Pawarit ',
  'Pawarit P',
  'Pawarit P',
  'Pawarit Pa',
  'Pawarit Pan',
  'Pawarit Pans',
  'Pawarit Pansi',
  'Pawarit Pansi',
  'Pawarit Pansin',
  'Pawarit Pansing',
  'Pawarit Pansing,',
  'Pawarit Pansing, ',
  'Pawarit Pansing, i',
  'Pawarit Pansing, i',
  "Pawarit Pansing, i'",
  "Pawarit Pansing, it'",
  "Pawarit Pansing, it's",
  "Pawarit Pansing, it's ",
  "Pawarit Pansing, it's m",
  "Pawarit Pansing, it's me",
]

export default function Preloader({ onComplete }) {
  // scene: 1 = "Hello welcome", 2 = "Pawarit Pansing, it's me"
  const [scene, setScene] = useState(1)
  const [displayText, setDisplayText] = useState('')
  const [sceneExiting, setSceneExiting] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const isMutedRef = useRef(false)
  const svgContainerRef = useRef(null)

  // Unlock and resume AudioContext on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      resumeAudio()
    }
    resumeAudio()

    window.addEventListener('pointerdown', unlockAudio, { once: true })
    window.addEventListener('keydown', unlockAudio, { once: true })
    return () => {
      window.removeEventListener('pointerdown', unlockAudio)
      window.removeEventListener('keydown', unlockAudio)
    }
  }, [])

  const toggleSound = (e) => {
    e.stopPropagation()
    resumeAudio()
    setIsMuted((prev) => {
      isMutedRef.current = !prev
      return !prev
    })
  }

  // Handle Scene 1 stroke animation & pen writing audio synchronization
  useEffect(() => {
    if (scene !== 1) return

    setDisplayText('')
    setSceneExiting(false)
    const timers = []

    // Ensure SVG animation starts cleanly from t=0
    if (svgContainerRef.current) {
      const svgEl = svgContainerRef.current.querySelector('svg')
      if (svgEl?.setCurrentTime) {
        try {
          svgEl.setCurrentTime(0)
        } catch {}
      }
    }

    // Schedule synchronized pen on paper writing sound and progressive handwriting reveal
    SCENE_1_STROKES.forEach((stroke, idx) => {
      const timer = setTimeout(() => {
        setDisplayText(SCENE_1_TEXT_BY_STROKE[idx] || 'Hello welcome')
        if (!isMutedRef.current) {
          playWritingStroke({
            duration: stroke.dur,
            isDot: stroke.isDot || false,
            isSpace: stroke.isSpace || false,
            isPunctuation: stroke.isPunctuation || false,
          })
        }
      }, Math.round(stroke.t * 1000))
      timers.push(timer)
    })

    // Stroke animation takes ~2.32s; hold for ~750ms to read, then fade smoothly to Scene 2
    const exitTimer = setTimeout(() => {
      setSceneExiting(true)
      const nextTimer = setTimeout(() => {
        setScene(2)
      }, 450)
      timers.push(nextTimer)
    }, 2950)
    timers.push(exitTimer)

    return () => timers.forEach(clearTimeout)
  }, [scene])

  // Handle Scene 2 stroke animation & pen writing audio synchronization
  useEffect(() => {
    if (scene !== 2) return

    setDisplayText('')
    setSceneExiting(false)
    const timers = []

    // Ensure SVG animation starts cleanly from t=0
    if (svgContainerRef.current) {
      const svgEl = svgContainerRef.current.querySelector('svg')
      if (svgEl?.setCurrentTime) {
        try {
          svgEl.setCurrentTime(0)
        } catch {}
      }
    }

    // Schedule synchronized pen on paper writing sound and progressive handwriting reveal
    SCENE_2_STROKES.forEach((stroke, idx) => {
      const timer = setTimeout(() => {
        setDisplayText(SCENE_2_TEXT_BY_STROKE[idx] || "Pawarit Pansing, it's me")
        if (!isMutedRef.current) {
          playWritingStroke({
            duration: stroke.dur,
            isDot: stroke.isDot || false,
            isSpace: stroke.isSpace || false,
            isPunctuation: stroke.isPunctuation || false,
          })
        }
      }, Math.round(stroke.t * 1000))
      timers.push(timer)
    })

    // Stroke animation takes ~3.7s; hold for ~850ms to read, then exit to portfolio
    const finishTimer = setTimeout(() => {
      setIsDone(true)
      const completeTimer = setTimeout(() => {
        onComplete?.()
      }, 850)
      timers.push(completeTimer)
    }, 4550)
    timers.push(finishTimer)

    return () => timers.forEach(clearTimeout)
  }, [scene, onComplete])

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
          className="fixed inset-0 z-[100] h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center bg-[#fbfaf8] dark:bg-[#0a0908] text-zinc-950 dark:text-[#fbfaf8] select-none px-4 sm:px-6 overflow-hidden"
          aria-label="Loading introduction"
          role="status"
        >
          {/* Subtle noise grain texture */}
          <div className="absolute inset-0 bg-noise opacity-35 pointer-events-none" />

          {/* Top Skip Button with safe-area spacing for mobile notch/Dynamic Island */}
          <button
            type="button"
            onClick={handleSkip}
            style={{
              top: 'max(1.25rem, env(safe-area-inset-top, 1.25rem))',
              right: 'max(1.25rem, env(safe-area-inset-right, 1.25rem))',
            }}
            className="absolute z-20 min-h-11 min-w-11 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-300 bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 backdrop-blur-md border border-zinc-300/50 dark:border-zinc-700/50 opacity-80 hover:opacity-100 transition-all cursor-pointer shadow-xs"
            aria-label="Skip intro animation"
          >
            Skip ✕
          </button>

          {/* Center Content: Fluid responsive Caveat handwriting display */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center px-2">
            <div className="min-h-[6.5rem] sm:min-h-[8.5rem] md:min-h-[11rem] flex items-center justify-center w-full">
              <div
                className={`w-full transition-all duration-450 transform ${
                  sceneExiting ? 'opacity-0 -translate-y-3 scale-98' : 'opacity-100 translate-y-0 scale-100'
                }`}
              >
                {/* Accessible text for screen readers */}
                <h1 className="sr-only">
                  {scene === 1 ? 'Hello welcome' : "Pawarit Pansing, it's me"}
                </h1>

                {/* Visible Handwriting Typography */}
                {scene === 1 ? (
                  <h1
                    className="font-caveat font-bold tracking-normal leading-tight text-zinc-900 dark:text-zinc-100 select-none text-center"
                    style={{ fontSize: 'clamp(2.1rem, 7.5vw, 5.25rem)' }}
                  >
                    <span className="font-caveat">{displayText}</span>
                    <span
                      className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.9em] ml-1 bg-zinc-800 dark:bg-zinc-200 align-baseline animate-pulse"
                      aria-hidden="true"
                    />
                  </h1>
                ) : (
                  <h1
                    className="font-caveat font-bold tracking-normal leading-tight text-zinc-900 dark:text-zinc-100 select-none text-center"
                    style={{ fontSize: 'clamp(1.75rem, 5.8vw, 4.25rem)' }}
                  >
                    <span className="font-caveat">
                      {displayText.includes('Pawarit Pansing,') ? (
                        <>
                          <span className="block sm:inline">
                            Pawarit Pansing,
                            {!displayText.slice('Pawarit Pansing,'.length).trim() && (
                              <span
                                className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.9em] ml-1 bg-zinc-800 dark:bg-zinc-200 align-baseline animate-pulse"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          {displayText.slice('Pawarit Pansing,'.length).trim() && (
                            <span className="block sm:inline sm:ml-2.5 text-zinc-600 dark:text-zinc-400">
                              {displayText.slice('Pawarit Pansing,'.length).trimStart()}
                              <span
                                className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.9em] ml-1 bg-zinc-800 dark:bg-zinc-200 align-baseline animate-pulse"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <span>{displayText}</span>
                          <span
                            className="inline-block w-[2.5px] sm:w-[3.5px] h-[0.9em] ml-1 bg-zinc-800 dark:bg-zinc-200 align-baseline animate-pulse"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </span>
                  </h1>
                )}

                {/* Animated Handwriting SVG (integrated for vectorized engine compatibility) */}
                <div
                  ref={svgContainerRef}
                  key={`handwriting-scene-${scene}`}
                  className="sr-only"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{
                    __html: scene === 1 ? scene1Svg : scene2Svg,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sound toggle button with safe-area spacing for mobile home indicator */}
          <button
            type="button"
            onClick={toggleSound}
            style={{
              bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
              right: 'max(1.25rem, env(safe-area-inset-right, 1.25rem))',
            }}
            className="absolute z-20 min-h-11 min-w-11 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-zinc-200 dark:hover:bg-zinc-800 backdrop-blur-md border border-zinc-300/50 dark:border-zinc-700/50 opacity-80 hover:opacity-100 transition-all cursor-pointer shadow-xs"
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
          >
            {isMuted ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
                <span>Muted</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>Sound</span>
              </>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
