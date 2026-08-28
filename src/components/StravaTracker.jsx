import React, { useState, useEffect } from 'react'
import { Flame, Compass, Timer, Heart, Activity, ArrowUpRight, Trophy, Zap, Calendar, RefreshCw } from 'lucide-react'

export default function StravaTracker() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('weekly') // 'weekly' | 'monthly'

  useEffect(() => {
    fetch('/data/strava-activities.json')
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error loading Strava data:', err)
        setLoading(false)
      })
  }, [])

  if (loading || !data) {
    return (
      <div className="p-8 rounded-3xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 animate-pulse flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-zinc-500 font-mono text-sm">
          <RefreshCw size={18} className="animate-spin text-[#FC5200]" />
          <span>Syncing Strava Live Data...</span>
        </div>
      </div>
    )
  }

  const { athlete, summary, recentActivity, weeklyMileage, monthlyProgression } = data

  const maxWeeklyKm = Math.max(...weeklyMileage.map((d) => d.km), 15)
  const maxMonthlyKm = Math.max(...monthlyProgression.map((m) => m.km), 120)

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white to-zinc-50/70 dark:from-zinc-900/90 dark:to-zinc-950/90 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xl backdrop-blur-xl transition-all">
      {/* Strava Top Accent Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FC5200] via-amber-500 to-rose-500"></div>

      {/* Card Header */}
      <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          {/* Strava Icon Badge */}
          <div className="w-11 h-11 rounded-2xl bg-[#FC5200]/10 dark:bg-[#FC5200]/20 border border-[#FC5200]/30 flex items-center justify-center shadow-inner">
            <Activity size={22} className="text-[#FC5200]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Live Athletic Performance
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Sync</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Endurance &amp; Running Analytics via Strava Auto-Pipeline
            </p>
          </div>
        </div>

        {/* Strava Profile CTA */}
        <a
          href={athlete.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#FC5200] hover:bg-[#E34400] shadow-md shadow-[#FC5200]/25 hover:shadow-[#FC5200]/40 hover:-translate-y-0.5 transition-all"
        >
          <span>Follow on Strava</span>
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Main Content Grid */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Summary Metrics (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 4-Stat Box Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Total Distance */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                <Compass size={14} className="text-[#FC5200]" />
                <span>Total Distance ({summary.year})</span>
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {summary.totalDistanceKm} <span className="text-xs font-semibold text-zinc-500">km</span>
              </div>
            </div>

            {/* Avg Pace */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                <Timer size={14} className="text-purple-500" />
                <span>Average Pace</span>
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {summary.avgPace}
              </div>
            </div>

            {/* Longest Run */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                <Trophy size={14} className="text-amber-500" />
                <span>Longest Run (PB)</span>
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {summary.longestRunKm} <span className="text-xs font-semibold text-zinc-500">km</span>
              </div>
            </div>

            {/* Total Moving Time */}
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                <Zap size={14} className="text-emerald-500" />
                <span>Moving Time</span>
              </div>
              <div className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {summary.totalMovingTimeHours} <span className="text-xs font-semibold text-zinc-500">hrs</span>
              </div>
            </div>
          </div>

          {/* Latest Activity Spotlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20">
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
              <span className="font-semibold text-[#FC5200] uppercase tracking-wider flex items-center gap-1">
                <Flame size={13} />
                <span>Latest Workout</span>
              </span>
              <span>{recentActivity.date}</span>
            </div>
            <div className="font-bold text-base text-zinc-900 dark:text-white mb-2 line-clamp-1">
              {recentActivity.title}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <span className="px-2 py-0.5 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-bold text-[#FC5200]">
                {recentActivity.distanceKm} km
              </span>
              <span>⏱️ {recentActivity.movingTime}</span>
              <span>⚡ {recentActivity.avgPace}</span>
              <span>❤️ {recentActivity.avgHeartRateBpm} bpm</span>
              <span>🔥 {recentActivity.calories} kcal</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Charts (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4">
          {/* Chart Header & Segmented Tabs */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              {activeTab === 'weekly' ? 'Weekly Mileage (Current Week)' : 'Monthly Progression (2026)'}
            </div>
            <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-1 text-xs">
              <button
                onClick={() => setActiveTab('weekly')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  activeTab === 'weekly'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  activeTab === 'monthly'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Dynamic Mileage Bar Chart */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800/80 min-h-[190px] flex items-end justify-between gap-3">
            {activeTab === 'weekly'
              ? weeklyMileage.map((item, idx) => {
                  const heightPercent = item.km > 0 ? (item.km / maxWeeklyKm) * 100 : 8
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      {/* Tooltip on hover */}
                      <span className="text-[10px] font-mono text-zinc-500 group-hover:text-[#FC5200] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.km}k
                      </span>
                      {/* Bar */}
                      <div className="w-full h-28 bg-zinc-200/70 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-end">
                        <div
                          className={`w-full rounded-lg transition-all duration-500 ${
                            item.km > 0
                              ? 'bg-gradient-to-t from-[#FC5200] to-amber-400 group-hover:brightness-110 shadow-xs'
                              : 'bg-transparent'
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        {item.day}
                      </span>
                    </div>
                  )
                })
              : monthlyProgression.map((item, idx) => {
                  const heightPercent = (item.km / maxMonthlyKm) * 100
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-mono text-zinc-500 group-hover:text-purple-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.km}k
                      </span>
                      <div className="w-full h-28 bg-zinc-200/70 dark:bg-zinc-800 rounded-lg overflow-hidden flex items-end">
                        <div
                          className="w-full rounded-lg bg-gradient-to-t from-purple-600 to-pink-500 group-hover:brightness-110 shadow-xs transition-all duration-500"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                        {item.month}
                      </span>
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </div>
  )
}
