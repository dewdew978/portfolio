import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { playWritingStroke, resumeAudio } from '../../utils/keyboardAudio'
import scene1Svg from '../../assets/handwriting/scene1.svg?raw'
import scene2Svg from '../../assets/handwriting/scene2.svg?raw'

// Exact stroke begin timestamps & drawing durations (in seconds) synchronized with pen writing audio
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

const SCENE_2_STROKES = [
  { t: 0, dur: 0.0642, isSpace: false },
  { t: 0.1267, dur: 0.1367, isSpace: false },
  { t: 0.305, dur: 0.1442, isSpace: false },
  { t: 0.4908, dur: 0.055, isSpace: false },
  { t: 0.6083, dur: 0.0842, isSpace: false },
  { t: 0.7342, dur: 0.0629, isSpace: false },
  { t: 0.8596, dur: 0.0725, isSpace: false },
  { t: 0.9738, dur: 0.0508, isSpace: false },
  { t: 1.0871, dur: 0.0142, isSpace: false },
  { t: 1.1429, dur: 0.005, isDot: true, isSpace: false },
  { t: 1.2104, dur: 0.0296, isSpace: false },
  { t: 1.2817, dur: 0.0833, isSpace: false },
  { t: 1.4275, dur: 0.0392, isSpace: false },
  { t: 1.5292, dur: 0.0642, isSpace: true }, // 'Pansing' begins
  { t: 1.6558, dur: 0.1367, isSpace: false },
  { t: 1.8342, dur: 0.1442, isSpace: false },
  { t: 2.02, dur: 0.1246, isSpace: false },
  { t: 2.1863, dur: 0.0958, isSpace: false },
  { t: 2.3238, dur: 0.0008, isDot: true, isSpace: false },
  { t: 2.3871, dur: 0.0346, isSpace: false },
  { t: 2.4633, dur: 0.1142, isSpace: false },
  { t: 2.6192, dur: 0.1092, isSpace: false },
  { t: 2.7908, dur: 0.0729, isSpace: false },
  { t: 2.9054, dur: 0.0292, isPunctuation: true }, // comma
  { t: 2.9971, dur: 0.005, isDot: true, isSpace: false }, // "it's" dot
  { t: 3.0646, dur: 0.0308, isSpace: true }, // "it's" begins
  { t: 3.1371, dur: 0.0987, isSpace: false },
  { t: 3.2983, dur: 0.0308, isSpace: false },
  { t: 3.3708, dur: 0.0271, isPunctuation: true }, // apostrophe
  { t: 3.4396, dur: 0.1112, isSpace: false },
  { t: 3.6133, dur: 0.2137, isSpace: true }, // "me" begins
  { t: 3.8687, dur: 0.1229, isSpace: false },
]

// Matches SVG SMIL keySplines="0.3333 0.6667 0.6667 1" (quadratic ease-out)
function easeOutQuad(t) {
  const inv = 1 - t
  return 1 - inv * inv
}

/**
 * Strips SMIL <animate>/<set> tags (which stall on mobile WebKit / document timelines),
 * preserves timing metadata as data-* attributes for deterministic rAF playback,
 * optionally filters stroke ranges and crops viewBox, and namespaces mask IDs.
 */
function prepareHandwritingSvg(
  rawSvg,
  { idPrefix, viewBox, minMaskIdx, maxMaskIdx, svgClass }
) {
  let svg = rawSvg

  if (minMaskIdx !== undefined || maxMaskIdx !== undefined) {
    const min = minMaskIdx ?? 0
    const max = maxMaskIdx ?? Infinity
    svg = svg.replace(/<mask id="s2-tk-m(\d+)"[\s\S]*?<\/mask>\s*/g, (match, idx) => {
      const n = Number(idx)
      return n >= min && n <= max ? match : ''
    })
    svg = svg.replace(
      /<g mask="url\(#s2-tk-m(\d+)\)"[\s\S]*?<\/g>\s*/g,
      (match, idx) => {
        const n = Number(idx)
        return n >= min && n <= max ? match : ''
      }
    )
  }

  // Convert SMIL <animate> on stroke masks into data attributes
  svg = svg.replace(
    /<path\b([^>]*)><animate\b([^>]*?)\/?><\/path>/g,
    (_, pathAttrs, animAttrs) => {
      const vals = animAttrs.match(/values="([^;]+);([^"]+)"/)
      const dur = animAttrs.match(/dur="([^"]+)s"/)
      const begin = animAttrs.match(/begin="([^"]+)s"/)
      if (!vals || !dur || !begin) return `<path${pathAttrs}></path>`
      return `<path${pathAttrs} data-from="${vals[1]}" data-to="${vals[2]}" data-begin="${begin[1]}" data-dur="${dur[1]}"></path>`
    }
  )

  // Convert SMIL <set> on ink endcaps into data-reveal attribute
  svg = svg.replace(
    /<ellipse\b([^>]*)><set\b([^>]*?)\/?><\/ellipse>/g,
    (_, ellAttrs, setAttrs) => {
      const begin = setAttrs.match(/begin="([^"]+)s"/)
      if (!begin) return `<ellipse${ellAttrs}></ellipse>`
      return `<ellipse${ellAttrs} data-reveal="${begin[1]}"></ellipse>`
    }
  )

  // Scope mask IDs so multiple mounted SVGs never share or collide on mask URLs
  svg = svg.replace(/(<mask\b[^>]*\bid=")([^"]+)(")/g, `$1${idPrefix}-$2$3`)
  svg = svg.replace(/url\(#([^)]+)\)/g, `url(#${idPrefix}-$1)`)

  if (viewBox) {
    svg = svg.replace(/viewBox="[^"]+"/, `viewBox="${viewBox}"`)
  }
  if (svgClass) {
    svg = svg.replace(/class="[^"]+"/, `class="${svgClass}"`)
  }

  return svg
}

export default function Preloader({ onComplete }) {
  // scene: 1 = "Hello welcome", 2 = "Pawarit Pansing, it's me"
  const [scene, setScene] = useState(1)
  const [sceneExiting, setSceneExiting] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)').matches : false
  )

  const isMutedRef = useRef(false)
  const svgContainerRef = useRef(null)
  const sceneStartRef = useRef(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const preparedMarkups = useMemo(() => {
    const baseClass = 'w-full h-auto block text-zinc-900 dark:text-zinc-100 select-none'
    return {
      scene1: prepareHandwritingSvg(scene1Svg, {
        idPrefix: 's1',
        svgClass: baseClass,
      }),
      scene2Desktop: prepareHandwritingSvg(scene2Svg, {
        idPrefix: 's2d',
        svgClass: baseClass,
      }),
      scene2MobileLine1: prepareHandwritingSvg(scene2Svg, {
        idPrefix: 's2m1',
        viewBox: '19.13 47.29 580.37 103.88',
        minMaskIdx: 0,
        maxMaskIdx: 23,
        svgClass: baseClass,
      }),
      scene2MobileLine2: prepareHandwritingSvg(scene2Svg, {
        idPrefix: 's2m2',
        viewBox: '617 47.29 230.57 103.88',
        minMaskIdx: 24,
        maxMaskIdx: 31,
        svgClass: baseClass,
      }),
    }
  }, [])

  // Track responsive layout cleanly so only active SVG DOM nodes are mounted
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

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

  // Schedule scene timeline and synchronized pen-on-paper sound
  useEffect(() => {
    setSceneExiting(false)
    sceneStartRef.current = performance.now()
    const timers = []
    const strokes = scene === 1 ? SCENE_1_STROKES : SCENE_2_STROKES

    strokes.forEach((stroke) => {
      const timer = setTimeout(() => {
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

    if (scene === 1) {
      // Stroke animation finishes at ~2.32s; hold to read, then transition to Scene 2
      const exitTimer = setTimeout(() => {
        setSceneExiting(true)
        const nextTimer = setTimeout(() => {
          setScene(2)
        }, 450)
        timers.push(nextTimer)
      }, 3000)
      timers.push(exitTimer)
    } else {
      // Final stroke in scene2.svg ends at ~3.99s; hold ~860ms to read, then exit to portfolio
      const finishTimer = setTimeout(() => {
        setIsDone(true)
        const completeTimer = setTimeout(() => {
          onCompleteRef.current?.()
        }, 850)
        timers.push(completeTimer)
      }, 4850)
      timers.push(finishTimer)
    }

    return () => timers.forEach(clearTimeout)
  }, [scene])

  // Drive stroke-by-stroke vector masks smoothly via requestAnimationFrame (cross-browser & mobile safe)
  useEffect(() => {
    const container = svgContainerRef.current
    if (!container) return

    const strokeTargets = Array.from(container.querySelectorAll('path[data-from]')).map((el) => {
      const from = parseFloat(el.getAttribute('data-from'))
      const to = parseFloat(el.getAttribute('data-to'))
      const begin = parseFloat(el.getAttribute('data-begin'))
      const dur = parseFloat(el.getAttribute('data-dur'))
      el.setAttribute('stroke-dashoffset', String(from))
      el.style.strokeDashoffset = String(from)
      return { el, from, to, begin, dur, done: false }
    })

    const dotTargets = Array.from(container.querySelectorAll('ellipse[data-reveal]')).map((el) => {
      const revealAt = parseFloat(el.getAttribute('data-reveal'))
      el.setAttribute('opacity', '0')
      el.style.opacity = '0'
      return { el, revealAt, done: false }
    })

    let rafId = 0

    const tick = (now) => {
      const elapsed = Math.max(0, (now - sceneStartRef.current) / 1000)
      let allDone = true

      for (const item of strokeTargets) {
        if (item.done) continue
        if (elapsed < item.begin) {
          allDone = false
          continue
        }
        if (item.dur <= 0 || elapsed >= item.begin + item.dur) {
          const finalOffset = String(item.to)
          item.el.setAttribute('stroke-dashoffset', finalOffset)
          item.el.style.strokeDashoffset = finalOffset
          item.done = true
          continue
        }
        allDone = false
        const progress = Math.max(0, Math.min(1, (elapsed - item.begin) / item.dur))
        const eased = easeOutQuad(progress)
        const offset = (item.from + (item.to - item.from) * eased).toFixed(2)
        item.el.setAttribute('stroke-dashoffset', offset)
        item.el.style.strokeDashoffset = offset
      }

      for (const dot of dotTargets) {
        if (dot.done) continue
        if (elapsed >= dot.revealAt) {
          dot.el.setAttribute('opacity', '1')
          dot.el.style.opacity = '1'
          dot.done = true
        } else {
          allDone = false
        }
      }

      if (!allDone) {
        rafId = requestAnimationFrame(tick)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [scene, isMobile])

  const handleSkip = () => {
    setIsDone(true)
    setTimeout(() => {
      onCompleteRef.current?.()
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
          className="fixed inset-0 z-[100] h-[100dvh] min-h-[100dvh] flex flex-col items-center justify-center bg-[#fbfaf8] dark:bg-[#0a0908] text-zinc-950 dark:text-[#fbfaf8] select-none px-3 sm:px-6 overflow-hidden"
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

          {/* Center Content: Responsive stroke-by-stroke SVG handwriting */}
          <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center px-1 sm:px-2">
            <div className="min-h-[7rem] sm:min-h-[8.5rem] md:min-h-[11rem] flex items-center justify-center w-full">
              <div
                ref={svgContainerRef}
                key={`handwriting-scene-${scene}-${isMobile ? 'mobile' : 'desktop'}`}
                className={`w-full transition-opacity duration-450 ${
                  sceneExiting ? 'opacity-0' : 'opacity-100'
                }`}
              >
                {/* Accessible text for screen readers */}
                <h1 className="sr-only">
                  {scene === 1 ? 'Hello welcome' : "Pawarit Pansing, it's me"}
                </h1>

                {scene === 1 ? (
                  <div
                    className="w-full max-w-[380px] sm:max-w-2xl mx-auto"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: preparedMarkups.scene1 }}
                  />
                ) : isMobile ? (
                  <div
                    className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-[390px] mx-auto"
                    aria-hidden="true"
                  >
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: preparedMarkups.scene2MobileLine1 }}
                    />
                    <div
                      className="mx-auto"
                      style={{ width: '43%', minWidth: '145px', maxWidth: '180px' }}
                      dangerouslySetInnerHTML={{ __html: preparedMarkups.scene2MobileLine2 }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full max-w-4xl mx-auto"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: preparedMarkups.scene2Desktop }}
                  />
                )}
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
