import React from 'react'
import { Sparkles, Terminal, TrendingUp, ShieldCheck, Database, Award, Cpu, BarChart3 } from 'lucide-react'

const proofItems = [
  { text: 'AI Agent & Multi-Stage BI Pipelines', icon: Cpu, color: 'text-indigo-400' },
  { text: 'Text-to-SQL & MS SQL Server Architecture', icon: Database, color: 'text-purple-400' },
  { text: 'Capital Market Case Competition 2025 (CMCC)', icon: Award, color: 'text-amber-400' },
  { text: 'Enterprise Data Sanitization & Guardrails', icon: ShieldCheck, color: 'text-emerald-400' },
  { text: 'Prescriptive Analytics & ROI Modeling', icon: TrendingUp, color: 'text-pink-400' },
  { text: 'KMITL • B.Sc. Data Science & Analytics (2027)', icon: Sparkles, color: 'text-indigo-400' },
  { text: 'Interactive Dashboards (Altair • Recharts • Gradio)', icon: BarChart3, color: 'text-purple-400' },
  { text: 'Python Data Wrangling & Risk Modeling', icon: Terminal, color: 'text-emerald-400' },
]

export default function MarqueeProofBar() {
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-900/40 backdrop-blur-md">
      {/* Left and Right Fade Gradients */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-10"></div>

      {/* Ticker Track */}
      <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
        {/* First Loop */}
        <div className="flex items-center gap-8 shrink-0 pr-8">
          {proofItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={`p1-${idx}`}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-xs hover:border-indigo-500/50 transition-colors"
              >
                <Icon size={15} className={`${item.color} shrink-0`} />
                <span>{item.text}</span>
              </div>
            )
          })}
        </div>

        {/* Second Duplicate Loop for Seamless Infinite Scroll */}
        <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
          {proofItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={`p2-${idx}`}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-xs hover:border-indigo-500/50 transition-colors"
              >
                <Icon size={15} className={`${item.color} shrink-0`} />
                <span>{item.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
