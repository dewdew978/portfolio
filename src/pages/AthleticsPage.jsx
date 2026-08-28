import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Footer } from '@/components/ui/footer-section'

export default function AthleticsPage() {
  const [activitiesData, setActivitiesData] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    fetch('/data/strava-activities.json')
      .then((res) => res.json())
      .then((data) => setActivitiesData(data))
      .catch((err) => console.error('Error loading strava data:', err))
  }, [])

  const activities = activitiesData?.activities || []
  const summary = activitiesData?.summary || {
    totalDistanceKm: 26.3,
    totalActivities: 5,
    longestRunKm: 6.1,
    avgPace: "9'30\" /km",
    totalMovingTimeHours: 4.5
  }

  const filteredActivities = activities.filter((act) => {
    if (activeFilter === 'all') return true
    return act.timeOfDay === activeFilter
  })

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#FC5200] selection:text-white relative overflow-x-hidden antialiased">
      {/* Apple Ambient Soft Background Glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#FC5200]/12 via-orange-600/5 to-transparent blur-[160px] rounded-full"></div>
        <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-900/30 blur-[180px] rounded-full"></div>
      </div>

      {/* Apple.com Sticky Glass Sub-Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-black/75 border-b border-white/10 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs">
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} />
              <span>Portfolio</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="font-semibold text-white tracking-tight">Athletics</span>
          </div>

          {/* Subnav Right Links */}
          <div className="flex items-center gap-4">
            <a
              href="#overview"
              className="hidden sm:inline-block text-zinc-400 hover:text-white transition-colors"
            >
              Overview
            </a>
            <a
              href="#live-stream"
              className="hidden sm:inline-block text-zinc-400 hover:text-white transition-colors"
            >
              Live Telemetry
            </a>
            <a
              href="#activities"
              className="hidden sm:inline-block text-zinc-400 hover:text-white transition-colors"
            >
              Recent Runs
            </a>
            <a
              href="https://www.strava.com/athletes/195893006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#FC5200] hover:bg-[#E34400] transition-colors"
            >
              <span>Strava Profile</span>
              <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-28">
        {/* APPLE KEYNOTE HERO SECTION */}
        <section id="overview" className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <div className="text-xs sm:text-sm font-semibold tracking-widest text-[#FC5200] uppercase mb-4">
            DEW · ENDURANCE PIPELINE
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
            Every kilometer. <br />
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
              Measured.
            </span>
          </h1>

          <p className="text-lg sm:text-2xl text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto mb-14">
            บันทึกการฝึกซ้อมและสถิติวิ่งจริงของ Pawarit Pansing (Dew) เชื่อมโยงความอดทนและระเบียบวินัยสู่การคิดวิเคราะห์ข้อมูล
          </p>

          {/* Apple Watch Ultra Metric Highlights (4 Cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-6 sm:p-7 rounded-[28px] bg-zinc-900/40 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-colors">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                August Distance
              </div>
              <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1.5">
                <span>{summary.totalDistanceKm}</span>
                <span className="text-sm font-semibold text-[#FC5200]">km</span>
              </div>
              <div className="text-xs text-zinc-500 mt-2 font-mono">Monthly cumulative</div>
            </div>

            <div className="p-6 sm:p-7 rounded-[28px] bg-zinc-900/40 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-colors">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Total Runs
              </div>
              <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1.5">
                <span>{summary.totalActivities}</span>
                <span className="text-sm font-semibold text-zinc-400">runs</span>
              </div>
              <div className="text-xs text-zinc-500 mt-2 font-mono">Recorded sessions</div>
            </div>

            <div className="p-6 sm:p-7 rounded-[28px] bg-zinc-900/40 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-colors">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Longest Run
              </div>
              <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1.5">
                <span>{summary.longestRunKm}</span>
                <span className="text-sm font-semibold text-zinc-400">km</span>
              </div>
              <div className="text-xs text-zinc-500 mt-2 font-mono">Peak endurance distance</div>
            </div>

            <div className="p-6 sm:p-7 rounded-[28px] bg-zinc-900/40 border border-white/10 backdrop-blur-xl hover:border-white/20 transition-colors">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                Moving Time
              </div>
              <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1.5">
                <span>{summary.totalMovingTimeHours}</span>
                <span className="text-sm font-semibold text-zinc-400">hrs</span>
              </div>
              <div className="text-xs text-zinc-500 mt-2 font-mono">Time in motion</div>
            </div>
          </div>
        </section>

        {/* APPLE PRODUCT SHOWCASE: STRAVA LIVE SHOWROOM + ATHLETE CARD */}
        <section id="live-stream" className="mb-24 sm:mb-32">
          <div className="p-8 sm:p-12 rounded-[36px] bg-zinc-900/30 border border-white/10 backdrop-blur-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Left: Apple Style Showcase Frame (6 cols) */}
              <div className="lg:col-span-6 flex flex-col items-center justify-between p-6 sm:p-8 rounded-[28px] bg-black/60 border border-white/10 shadow-2xl">
                <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FC5200] animate-pulse"></span>
                    <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                      STRAVA LIVE TELEMETRY
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">
                    Real-time Cloud Sync
                  </span>
                </div>

                <div className="w-full flex justify-center py-2 overflow-x-auto">
                  <iframe
                    height="454"
                    width="300"
                    frameBorder="0"
                    allowTransparency="true"
                    scrolling="no"
                    src="https://www.strava.com/athletes/195893006/latest-rides/056e78b3002b2eb8d6a7c45bc7aa4eacb7d11c82"
                    title="Dew's Strava Live Stream"
                    className="rounded-2xl shadow-2xl"
                  ></iframe>
                </div>

                <div className="text-xs font-mono text-zinc-500 text-center mt-4">
                  Direct live stream from Strava athlete feed
                </div>
              </div>

              {/* Right: Apple Wallet / ID Verified Athlete Card (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-[28px] bg-black/60 border border-white/10 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FC5200] to-amber-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/20">
                        D
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-white tracking-tight">Dew .</h3>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FC5200]/20 text-[#FC5200] border border-[#FC5200]/30">
                            PRO
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">
                          Athlete #195893006 · Bangkok, TH
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-emerald-400 font-medium">
                      ● Verified
                    </span>
                  </div>

                  {/* 4 Apple Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        August Distance
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        26.3 <span className="text-xs font-semibold text-[#FC5200]">km</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Total Time
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        4h 28m
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Elevation Gain
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        45 <span className="text-xs text-zinc-400">m</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Calories Burned
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                        1,725 <span className="text-xs text-zinc-400">kcal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.strava.com/athletes/195893006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-black text-sm font-semibold tracking-tight transition-all duration-200 shadow-xl"
                >
                  <span>Open Full Strava Profile</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* APPLE CARDS: RECENT RUNS ACTIVITY STREAM */}
        <section id="activities" className="mb-24 sm:mb-32">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#FC5200] mb-2">
                ACTIVITY STREAM
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                Recent Runs.
              </h2>
            </div>

            {/* Apple Style Segmented Pill Controls */}
            <div className="inline-flex p-1 rounded-full bg-zinc-900/80 border border-white/10 self-start sm:self-auto backdrop-blur-xl">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'all'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All ({activities.length})
              </button>
              <button
                onClick={() => setActiveFilter('evening')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'evening'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Evening (3)
              </button>
              <button
                onClick={() => setActiveFilter('afternoon')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'afternoon'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Afternoon (1)
              </button>
              <button
                onClick={() => setActiveFilter('morning')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'morning'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Morning (1)
              </button>
            </div>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => {
              return (
                <div
                  key={act.id}
                  className="group rounded-[30px] bg-zinc-900/30 border border-white/10 hover:border-white/25 hover:bg-zinc-900/50 transition-all duration-500 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl shadow-xl hover:-translate-y-1"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-[#FC5200] transition-colors tracking-tight">
                          {act.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">
                          {act.date}
                        </p>
                      </div>

                      {act.tag && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase bg-zinc-800/80 border border-white/10 text-zinc-300">
                          {act.tag.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
                        </span>
                      )}
                    </div>

                    {/* GPS Map Route Image */}
                    {act.mapImageUrl && (
                      <div className="relative rounded-2xl overflow-hidden mb-6 bg-black aspect-[16/9] border border-white/10">
                        <img
                          src={act.mapImageUrl}
                          alt={act.title}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10">
                          GPS ROUTE
                        </div>
                      </div>
                    )}

                    {/* Big Distance Display */}
                    <div className="mb-6 pb-4 border-b border-white/10">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        Distance
                      </div>
                      <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight text-white flex items-baseline gap-1.5">
                        <span>{act.distanceKm.toFixed(1)}</span>
                        <span className="text-base font-bold text-[#FC5200]">km</span>
                      </div>
                    </div>

                    {/* 3 Metrics: Time, Pace, Elevation */}
                    <div className="grid grid-cols-3 gap-2 text-left mb-4">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase mb-0.5">
                          Time
                        </div>
                        <div className="text-sm font-mono font-bold text-white">
                          {act.movingTime}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase mb-0.5">
                          Avg Pace
                        </div>
                        <div className="text-sm font-mono font-bold text-orange-400">
                          {act.avgPace}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-zinc-400 uppercase mb-0.5">
                          Elevation
                        </div>
                        <div className="text-sm font-mono font-bold text-white">
                          {act.elevationGainM} m
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      Strava GPS Verified
                    </span>
                    <a
                      href={act.stravaUrl || "https://www.strava.com/athletes/195893006"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#FC5200] transition-colors"
                    >
                      <span>View on Strava</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Apple View All Activities Pill */}
          <div className="flex justify-center mt-14">
            <a
              href="https://www.strava.com/athletes/195893006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/30 transition-all"
            >
              <span>View All Athlete Activities on Strava</span>
              <ArrowUpRight size={14} className="text-[#FC5200]" />
            </a>
          </div>
        </section>

        {/* APPLE STYLE FOOTNOTE & BOTTOM ACTIONS */}
        <section className="pt-10 border-t border-white/10">
          <div className="text-xs font-mono text-zinc-500 leading-relaxed mb-8 max-w-3xl">
            1. All activities are recorded via Strava GPS telemetry and automatically synchronized into the pipeline.
            <br />
            2. Performance metrics reflect actual workouts completed by Pawarit Pansing (Dew).
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 transition-all"
            >
              <ArrowLeft size={14} />
              <span>Return to Portfolio</span>
            </Link>

            <a
              href="https://www.strava.com/athletes/195893006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-[#FC5200] hover:bg-[#E34400] transition-all"
            >
              <span>Follow Dew on Strava</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
