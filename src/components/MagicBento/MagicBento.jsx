import React, { useState, useRef } from 'react'
import {
  Sparkles,
  Bot,
  Code2,
  TrendingUp,
  LayoutDashboard,
  ArrowUpRight
} from 'lucide-react'
import './MagicBento.css'

const defaultBentoItems = [
  {
    id: 'ai-agents',
    title: 'AI Agent & Multi-Stage BI Pipelines',
    subtitle: 'Google ADK & Enterprise SQL Architecture',
    description: 'พัฒนาระบบ Automated BI Pipeline ด้วย Google ADK (SequentialAgent) แปลงภาษาธรรมชาติเป็น SQL Query อัตโนมัติ พร้อม Data Sanitization และ Prescriptive Analytics',
    icon: Bot,
    tags: ['Google ADK', 'SequentialAgent', 'Text-to-SQL', 'MS SQL Server', 'Data Sanitization'],
    accent: '#6366f1',
    glowRgb: '99, 102, 241',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-8',
    rowSpan: 'row-span-1',
    badge: 'Featured Pipeline'
  },
  {
    id: 'programming',
    title: 'Programming & Analytics',
    subtitle: 'Data Wrangling & Statistical Modeling',
    description: 'ประมวลผลและทำความสะอาดชุดข้อมูลขนาดใหญ่ (Data Cleansing), วิเคราะห์สถิติเชิงลึก (EDA) และสร้างโมเดลประเมินความเสี่ยง',
    icon: Code2,
    tags: ['Python', 'SQL Server', 'Pandas', 'NumPy', 'Altair', 'Gradio'],
    accent: '#a855f7',
    glowRgb: '168, 85, 247',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-4',
    rowSpan: 'row-span-1',
    badge: 'Core Tech'
  },
  {
    id: 'strategy',
    title: 'Business Strategy & Capital Market',
    subtitle: 'CMCC 2025 Case Competition • Plan B Media',
    description: 'วิเคราะห์โครงสร้างตลาดสื่อนอกบ้าน (OOH Media), ออกแบบโมเดล Asset Tokenization, Green Billboards และประเมินมูลค่ากิจการ (Valuation / ROI)',
    icon: TrendingUp,
    tags: ['Market Dynamics', 'Asset Tokenization', 'Financial Modeling', 'ESG Financing'],
    accent: '#f43f5e',
    glowRgb: '244, 63, 94',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-4',
    rowSpan: 'row-span-1',
    badge: 'National Case'
  },
  {
    id: 'bi-dashboards',
    title: 'BI Dashboards & Digital Storytelling',
    subtitle: 'Interactive Visualizations & Cloud Workflows',
    description: 'ออกแบบระบบนำเสนอข้อมูลแบบ Interactive ผ่าน Quarto Slides และ Recharts พร้อมจัดการ Deploy บน Cloud Platform',
    icon: LayoutDashboard,
    tags: ['Quarto Slides', 'Recharts', 'Vercel', 'Data Storytelling', 'Git / GitHub'],
    accent: '#06b6d4',
    glowRgb: '6, 182, 212',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-8',
    rowSpan: 'row-span-1',
    badge: 'Data Viz'
  }
]

export default function MagicBento({
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 320,
  particleCount = 8,
  glowColor = '132, 0, 255',
  items = defaultBentoItems
}) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePos({ x: -1000, y: -1000 })
      }}
      className="magic-bento-container"
      style={{
        '--glow-color': glowColor,
        '--spotlight-radius': `${spotlightRadius}px`
      }}
    >
      {/* Global Ambient Spotlight */}
      {enableSpotlight && isHovered && (
        <div
          className="magic-bento-spotlight-layer"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor}, 0.1), transparent 80%)`
          }}
        />
      )}

      {/* Grid of Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 w-full relative z-10">
        {items.map((item, index) => (
          <BentoCard
            key={item.id || index}
            item={item}
            enableStars={enableStars}
            enableBorderGlow={enableBorderGlow}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            particleCount={particleCount}
            fallbackGlowColor={glowColor}
          />
        ))}
      </div>
    </div>
  )
}

function BentoCard({
  item,
  enableStars,
  enableBorderGlow,
  enableTilt,
  enableMagnetism,
  clickEffect,
  particleCount,
  fallbackGlowColor
}) {
  const cardRef = useRef(null)
  const [cardTransform, setCardTransform] = useState('')
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 })
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [ripples, setRipples] = useState([])

  const currentGlow = item.glowRgb || fallbackGlowColor

  // Subtle floating star particles
  const particles = useRef(
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 85 + 5,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2
    }))
  ).current

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setLocalMouse({ x, y })

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const deltaX = (x - centerX) / centerX
    const deltaY = (y - centerY) / centerY

    let transform = ''

    if (enableTilt) {
      const tiltX = -deltaY * 4
      const tiltY = deltaX * 4
      transform += `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) `
    }

    if (enableMagnetism) {
      const magX = deltaX * 2.5
      const magY = deltaY * 2.5
      transform += `translate3d(${magX}px, ${magY}px, 0) `
    }

    setCardTransform(transform)
  }

  const handleCardMouseLeave = () => {
    setIsCardHovered(false)
    setCardTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)')
  }

  const handleClick = (e) => {
    if (!clickEffect || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const newRipple = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now()
    }
    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 700)
  }

  const IconComponent = item.icon || Sparkles

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={handleCardMouseLeave}
      className={`magic-bento-card ${item.colSpan || ''} ${item.rowSpan || ''} group`}
      style={{
        transform: cardTransform || undefined,
        transition: isCardHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
      }}
    >
      {/* Dynamic Border Glow following mouse */}
      {enableBorderGlow && isCardHovered && (
        <div
          className="magic-bento-border-glow"
          style={{
            background: `radial-gradient(200px circle at ${localMouse.x}px ${localMouse.y}px, rgba(${currentGlow}, 0.8), transparent 70%)`
          }}
        />
      )}

      {/* Subtle Star Particles */}
      {enableStars && (
        <div className="magic-bento-stars-container">
          {particles.map((p) => (
            <span
              key={p.id}
              className="magic-bento-star"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                backgroundColor: isCardHovered ? `rgb(${currentGlow})` : 'rgba(255, 255, 255, 0.25)'
              }}
            />
          ))}
        </div>
      )}

      {/* Click Ripple Effect */}
      {clickEffect &&
        ripples.map((r) => (
          <span
            key={r.id}
            className="magic-bento-ripple"
            style={{
              left: `${r.x}px`,
              top: `${r.y}px`,
              borderColor: `rgb(${currentGlow})`,
              background: `radial-gradient(circle, rgba(${currentGlow}, 0.3) 0%, transparent 70%)`
            }}
          />
        ))}

      {/* Card Content Interior */}
      <div className="magic-bento-card-inner">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105 shadow-xs"
              style={{
                backgroundColor: `rgba(${currentGlow}, 0.1)`,
                borderColor: `rgba(${currentGlow}, 0.25)`,
                color: `rgb(${currentGlow})`
              }}
            >
              <IconComponent size={20} />
            </div>
            <div>
              {item.badge && (
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-1 border"
                  style={{
                    backgroundColor: `rgba(${currentGlow}, 0.08)`,
                    borderColor: `rgba(${currentGlow}, 0.2)`,
                    color: `rgb(${currentGlow})`
                  }}
                >
                  {item.badge}
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all flex-shrink-0">
            <ArrowUpRight size={15} />
          </div>
        </div>

        {/* Subtitle */}
        {item.subtitle && (
          <div className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            {item.subtitle}
          </div>
        )}

        {/* Description */}
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">
          {item.description}
        </p>

        {/* Tag Pill Group */}
        {item.tags && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-800/70">
            {item.tags.map((tag, tIndex) => (
              <span
                key={tIndex}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
