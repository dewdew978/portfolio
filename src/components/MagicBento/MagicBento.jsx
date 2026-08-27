import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Bot, Code2, TrendingUp, LayoutDashboard, Database, ArrowUpRight } from 'lucide-react'
import './MagicBento.css'

const defaultBentoItems = [
  {
    id: 'ai-agents',
    title: 'AI Agent & Multi-Stage BI Pipelines',
    subtitle: 'Google ADK & Enterprise SQL Architecture',
    description: 'พัฒนาระบบ 5-Stage Automated Business Intelligence Pipeline ด้วย Google ADK (SequentialAgent) แปลงภาษาธรรมชาติเป็น T-SQL Query อัตโนมัติ พร้อมระบบ Data Sanitization และ Prescriptive Analytics',
    icon: Bot,
    tags: ['Google ADK', 'SequentialAgent', 'Text-to-SQL', 'MS SQL Server', 'Data Sanitization'],
    accent: '#6366f1',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-8',
    rowSpan: 'row-span-1',
    badge: 'Featured Pipeline'
  },
  {
    id: 'programming',
    title: 'Programming & Analytics',
    subtitle: 'Data Wrangling & Statistical Modeling',
    description: 'ประมวลผลชุดข้อมูลขนาดใหญ่ ทำความสะอาดข้อมูล (Data Cleansing), Exploratory Data Analysis และสร้างโมเดลความเสี่ยง',
    icon: Code2,
    tags: ['Python', 'SQL Server', 'Pandas', 'NumPy', 'Altair', 'Gradio'],
    accent: '#8b5cf6',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-4',
    rowSpan: 'row-span-1',
    badge: 'Core Tech'
  },
  {
    id: 'strategy',
    title: 'Business Strategy & Capital Market',
    subtitle: 'CMCC 2025 Case Competition • Plan B Media',
    description: 'วิเคราะห์โครงสร้างตลาดสื่อนอกบ้าน (OOH Media), ออกแบบโมเดล Asset Tokenization, Green Billboards และประเมินมูลค่ากิจการ (Enterprise Valuation / ROI)',
    icon: TrendingUp,
    tags: ['Market Dynamics', 'Asset Tokenization', 'Financial Modeling', 'ESG Financing'],
    accent: '#ec4899',
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-4',
    rowSpan: 'row-span-1',
    badge: 'National Case'
  },
  {
    id: 'bi-dashboards',
    title: 'BI Dashboards & Digital Storytelling',
    subtitle: 'Interactive Visualizations & Cloud Workflows',
    description: 'ออกแบบระบบนำเสนอข้อมูลเชิงโต้ตอบ (Interactive Slides via Quarto, Recharts, Altair) และจัดการ Deploy บน Cloud Platform',
    icon: LayoutDashboard,
    tags: ['Quarto Slides', 'Recharts', 'Vercel', 'Data Storytelling', 'Git / GitHub'],
    accent: '#06b6d4',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-8',
    rowSpan: 'row-span-1',
    badge: 'Data Viz'
  }
]

export default function MagicBento({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = '132, 0, 255',
  items = defaultBentoItems
}) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const [isHovered, setIsHovered] = useState(false)

  // Global mouse position tracking across the Bento grid container
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
      {/* Global Spotlight Layer */}
      {enableSpotlight && isHovered && (
        <div
          className="magic-bento-spotlight-layer"
          style={{
            background: `radial-gradient(${spotlightRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${glowColor}, 0.14), transparent 80%)`
          }}
        />
      )}

      {/* Grid of Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 w-full relative z-10">
        {items.map((item, index) => (
          <BentoCard
            key={item.id || index}
            item={item}
            containerPos={mousePos}
            textAutoHide={textAutoHide}
            enableStars={enableStars}
            enableBorderGlow={enableBorderGlow}
            enableTilt={enableTilt}
            enableMagnetism={enableMagnetism}
            clickEffect={clickEffect}
            particleCount={particleCount}
            glowColor={glowColor}
          />
        ))}
      </div>
    </div>
  )
}

function BentoCard({
  item,
  containerPos,
  textAutoHide,
  enableStars,
  enableBorderGlow,
  enableTilt,
  enableMagnetism,
  clickEffect,
  particleCount,
  glowColor
}) {
  const cardRef = useRef(null)
  const [cardTransform, setCardTransform] = useState('')
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 })
  const [isCardHovered, setIsCardHovered] = useState(false)
  const [ripples, setRipples] = useState([])

  // Random particles for stars
  const particles = useRef(
    Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 85 + 5,
      size: Math.random() * 2.5 + 1.2,
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
      const tiltX = -deltaY * 6
      const tiltY = deltaX * 6
      transform += `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) `
    }

    if (enableMagnetism) {
      const magX = deltaX * 4
      const magY = deltaY * 4
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
            background: `radial-gradient(180px circle at ${localMouse.x}px ${localMouse.y}px, rgba(${glowColor}, 0.8), transparent 70%)`
          }}
        />
      )}

      {/* Star Particles Canvas / Floating Dots */}
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
                backgroundColor: isCardHovered ? `rgb(${glowColor})` : 'rgba(255, 255, 255, 0.4)'
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
              borderColor: `rgb(${glowColor})`,
              background: `radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, transparent 70%)`
            }}
          />
        ))}

      {/* Card Content Interior */}
      <div className="magic-bento-card-inner">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-sm"
              style={{
                backgroundColor: `rgba(${glowColor}, 0.12)`,
                borderColor: `rgba(${glowColor}, 0.3)`,
                color: `rgb(${glowColor})`
              }}
            >
              <IconComponent size={22} />
            </div>
            <div>
              {item.badge && (
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1 border"
                  style={{
                    backgroundColor: `rgba(${glowColor}, 0.1)`,
                    borderColor: `rgba(${glowColor}, 0.25)`,
                    color: `rgb(${glowColor})`
                  }}
                >
                  {item.badge}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-all">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Subtitle */}
        {item.subtitle && (
          <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            {item.subtitle}
          </div>
        )}

        {/* Description (with textAutoHide support) */}
        <p
          className={`text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 transition-all duration-300 ${
            textAutoHide ? 'opacity-90 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          {item.description}
        </p>

        {/* Tag Pill Group */}
        {item.tags && (
          <div className="mt-auto flex flex-wrap gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
            {item.tags.map((tag, tIndex) => (
              <span
                key={tIndex}
                className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/80 transition-colors group-hover:border-indigo-500/40"
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
