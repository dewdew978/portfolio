import React, { useEffect, useRef, useState } from 'react'
import './PixelOrb.css'

const SIZE_CLASSES = {
  sm: 'pixel-orb--sm',
  md: 'pixel-orb--md',
  lg: 'pixel-orb--lg',
}

export default function PixelOrb({ size = 'md', interactive = false, className = '', onActivate }) {
  const orbRef = useRef(null)
  const reactionTimerRef = useRef(null)
  const [isExcited, setIsExcited] = useState(false)
  const [reactionKey, setReactionKey] = useState(0)

  useEffect(() => {
    if (!interactive || !orbRef.current) return undefined

    const orb = orbRef.current
    const onPointerMove = event => {
      const rect = orb.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.max(rect.width * 2.5, 1)
      const lookX = Math.max(-1, Math.min(1, (event.clientX - centerX) / distance))
      const lookY = Math.max(-1, Math.min(1, (event.clientY - centerY) / distance))
      orb.style.setProperty('--orb-look-x', `${lookX * 5}px`)
      orb.style.setProperty('--orb-look-y', `${lookY * 4}px`)
    }

    const resetLook = () => {
      orb.style.setProperty('--orb-look-x', '0px')
      orb.style.setProperty('--orb-look-y', '0px')
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', resetLook)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', resetLook)
    }
  }, [interactive])

  useEffect(() => () => clearTimeout(reactionTimerRef.current), [])

  const triggerExcitement = () => {
    clearTimeout(reactionTimerRef.current)
    setReactionKey(key => key + 1)
    setIsExcited(true)
    reactionTimerRef.current = setTimeout(() => setIsExcited(false), 700)
    onActivate?.()
  }

  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md
  const OrbTag = interactive ? 'button' : 'span'

  return (
    <OrbTag
      ref={orbRef}
      type={interactive ? 'button' : undefined}
      onClick={interactive ? triggerExcitement : undefined}
      aria-label="ทำให้ Pixel Orb ตื่นเต้น"
      aria-hidden={interactive ? undefined : true}
      className={`pixel-orb ${sizeClass} ${interactive ? 'pixel-orb--interactive' : ''} ${isExcited ? 'pixel-orb--excited' : ''} ${className}`.trim()}
    >
      <svg key={reactionKey} viewBox="0 0 128 128" role="presentation" focusable="false" aria-hidden="true">
        <g className="pixel-orb__burst">
          <rect x="60" y="1" width="8" height="10" />
          <rect x="112" y="17" width="7" height="7" />
          <rect x="117" y="69" width="9" height="7" />
          <rect x="104" y="110" width="7" height="9" />
          <rect x="17" y="108" width="7" height="9" />
          <rect x="2" y="66" width="9" height="7" />
          <rect x="10" y="17" width="7" height="7" />
        </g>
        <g className="pixel-orb__particles">
          <rect className="pixel-orb__particle pixel-orb__particle--one" x="13" y="28" width="5" height="5" />
          <rect className="pixel-orb__particle pixel-orb__particle--two" x="109" y="38" width="4" height="4" />
          <rect className="pixel-orb__particle pixel-orb__particle--three" x="101" y="103" width="5" height="5" />
        </g>

        <g className="pixel-orb__data-ring">
          <path className="pixel-orb__ring-track" d="M28 24H44V20H84V24H100V28H108V36H112V48H116V80H112V92H108V100H100V104H84V108H44V104H28V100H20V92H16V80H12V48H16V36H20V28H28Z" />
          <rect className="pixel-orb__ring-signal pixel-orb__ring-signal--one" x="22" y="23" width="18" height="4" />
          <rect className="pixel-orb__ring-signal pixel-orb__ring-signal--two" x="109" y="49" width="4" height="18" />
          <rect className="pixel-orb__ring-signal pixel-orb__ring-signal--three" x="76" y="101" width="20" height="4" />
        </g>

        <g className="pixel-orb__body">
          <ellipse className="pixel-orb__shadow" cx="64" cy="113" rx="32" ry="5" />
          <path className="pixel-orb__outline" d="M44 14H84V18H96V22H104V30H110V42H114V86H110V98H104V106H96V112H84V116H44V112H32V106H24V98H18V86H14V42H18V30H24V22H32V18H44Z" />
          <path className="pixel-orb__core" d="M44 20H84V24H96V30H102V40H108V88H102V98H94V104H82V110H46V106H34V100H26V90H20V40H26V30H34V24H44Z" />
          <path className="pixel-orb__shade" d="M20 64H26V90H34V100H46V106H82V110H46V106H34V100H26V90H20Z" />
          <path className="pixel-orb__glow" d="M44 24H78V28H42V32H34V40H28V58H24V40H30V32H38V28H44Z" />
          <rect className="pixel-orb__scanline" x="27" y="82" width="74" height="3" />

          <g className="pixel-orb__face">
            <g className="pixel-orb__normal-eyes">
              <rect className="pixel-orb__eye" x="38" y="57" width="20" height="7" />
              <rect className="pixel-orb__eye" x="70" y="57" width="20" height="7" />
              <rect className="pixel-orb__eye-core" x="50" y="58" width="6" height="5" />
              <rect className="pixel-orb__eye-core" x="72" y="58" width="6" height="5" />
            </g>
            <g className="pixel-orb__excited-eyes">
              <rect className="pixel-orb__excited-eye" x="37" y="49" width="22" height="22" />
              <rect className="pixel-orb__excited-eye" x="69" y="49" width="22" height="22" />
              <rect className="pixel-orb__excited-eye-core" x="48" y="53" width="7" height="7" />
              <rect className="pixel-orb__excited-eye-core" x="80" y="53" width="7" height="7" />
            </g>
            <rect className="pixel-orb__status" x="60" y="74" width="8" height="3" />
          </g>
        </g>
      </svg>
    </OrbTag>
  )
}
