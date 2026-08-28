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
    <div className="min-h-screen bg-[#050608] text-white font-sans selection:bg-[#FC5200] selection:text-white relative overflow-x-hidden antialiased">
      {/* Subtle Apple Fitness Ambient Lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-[#FC5200]/15 via-orange-600/5 to-transparent blur-[140px] rounded-full"></div>
        <div className="absolute top-[45%] -left-48 w-[600px] h-[600px] bg-zinc-900/40 blur-[150px] rounded-full"></div>
      </div>

      {/* Top Floating Minimalist Bar */}
      <header className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3.5 rounded-full backdrop-blur-3xl bg-zinc-950/80 border border-white/10 shadow-2xl shadow-black/80">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Portfolio</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC5200]"></span>
            <span>DEW · ATHLETICS</span>
          </div>

          <a
            href="https://www.strava.com/athletes/195893006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#FC5200] hover:bg-[#E34400] transition-colors"
          >
            <span>Strava</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-24">
        {/* HERO SECTION: NIKE RUN CLUB / APPLE FITNESS+ HERO */}
        <section className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest uppercase text-[#FC5200] bg-[#FC5200]/10 border border-[#FC5200]/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC5200]"></span>
            <span>ATHLETE TELEMETRY &amp; LOGS</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white mb-6 leading-none uppercase">
            Running &amp; <br />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Endurance
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-12 font-normal leading-relaxed">
            บันทึกการฝึกซ้อมจริง สถิติสะสม Pace และการพัฒนาความอดทนของ Pawarit Pansing (Dew) เชื่อมโยงสู่ระเบียบวินัยการทำงาน
          </p>

          {/* 4 Apple Fitness Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/80 border border-white/5 backdrop-blur-2xl">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                AUGUST DISTANCE
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span>{summary.totalDistanceKm}</span>
                <span className="text-xs font-semibold text-[#FC5200]">KM</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/80 border border-white/5 backdrop-blur-2xl">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                ACTIVITIES
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span>{summary.totalActivities}</span>
                <span className="text-xs font-semibold text-zinc-500">RUNS</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/80 border border-white/5 backdrop-blur-2xl">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                LONGEST RUN
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span>{summary.longestRunKm}</span>
                <span className="text-xs font-semibold text-zinc-500">KM</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/80 border border-white/5 backdrop-blur-2xl">
              <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                MOVING TIME
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
                <span>{summary.totalMovingTimeHours}</span>
                <span className="text-xs font-semibold text-zinc-500">HRS</span>
              </div>
            </div>
          </div>
        </section>

        {/* DUAL DECK: STRAVA LIVE SHOWROOM + ATHLETE CARD */}
        <section className="mb-20">
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/60 border border-white/5 backdrop-blur-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left: Official Live Strava Embed Frame (6 cols) */}
              <div className="lg:col-span-6 flex flex-col items-center justify-between p-6 rounded-2xl bg-[#090a0f] border border-white/5">
                <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <span className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase">
                    STRAVA LIVE STREAM
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    ● Real-time Cloud
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
                    className="rounded-xl shadow-2xl"
                  ></iframe>
                </div>

                <div className="text-[11px] font-mono text-zinc-500 text-center mt-3">
                  Auto-synced from Strava GPS
                </div>
              </div>

              {/* Right: Athlete Verified Overview (6 cols) */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#090a0f] border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-extrabold text-white">Dew .</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FC5200]/20 text-[#FC5200]">
                          PRO
                        </span>
                      </div>
                      <p className="text-xs font-mono text-zinc-500 mt-0.5">
                        Athlete #195893006 · Bangkok, Thailand
                      </p>
                    </div>

                    <span className="text-xs font-mono text-emerald-400">
                      Verified
                    </span>
                  </div>

                  {/* 4 Stats Minimalist Grid */}
                  <div className="grid grid-cols-2 gap-3.5 mb-6">
                    <div className="p-4 rounded-xl bg-zinc-950 border border-white/5">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        AUGUST DISTANCE
                      </div>
                      <div className="text-2xl font-black font-mono text-white">
                        26.3 <span className="text-xs text-[#FC5200]">km</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-white/5">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        TOTAL TIME
                      </div>
                      <div className="text-2xl font-black font-mono text-white">
                        4h 28m
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-white/5">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        ELEVATION GAIN
                      </div>
                      <div className="text-2xl font-black font-mono text-white">
                        45 <span className="text-xs text-zinc-500">m</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950 border border-white/5">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        CALORIES BURNED
                      </div>
                      <div className="text-2xl font-black font-mono text-white">
                        1,725 <span className="text-xs text-zinc-500">kcal</span>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://www.strava.com/athletes/195893006"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Open Full Strava Profile</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVITY CARDS STREAM SECTION (NIKE RUN CLUB / APPLE FITNESS+ CARDS) */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#FC5200] mb-1">
                ACTIVITY FEED
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                Recent Runs
              </h2>
            </div>

            {/* Apple Style Segmented Pill Controls */}
            <div className="inline-flex p-1 rounded-full bg-zinc-950 border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'all'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All ({activities.length})
              </button>
              <button
                onClick={() => setActiveFilter('evening')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'evening'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Evening (3)
              </button>
              <button
                onClick={() => setActiveFilter('afternoon')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'afternoon'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Afternoon (1)
              </button>
              <button
                onClick={() => setActiveFilter('morning')}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  activeFilter === 'morning'
                    ? 'bg-white text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Morning (1)
              </button>
            </div>
          </div>

          {/* Apple Fitness Activity Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((act) => {
              return (
                <div
                  key={act.id}
                  className="group rounded-3xl bg-zinc-950/80 border border-white/5 hover:border-white/20 transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#FC5200] transition-colors">
                          {act.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-500 mt-0.5">
                          {act.date}
                        </p>
                      </div>

                      {act.tag && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-zinc-900 border border-white/10 text-zinc-300">
                          {act.tag.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
                        </span>
                      )}
                    </div>

                    {/* GPS Map Image */}
                    {act.mapImageUrl && (
                      <div className="relative rounded-2xl overflow-hidden mb-5 bg-[#090a0f] aspect-[16/9] border border-white/5">
                        <img
                          src={act.mapImageUrl}
                          alt={act.title}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-400 border border-white/10">
                          GPS ROUTE
                        </div>
                      </div>
                    )}

                    {/* Big Distance Display */}
                    <div className="mb-5 pb-4 border-b border-white/5">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                        DISTANCE
                      </div>
                      <div className="text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-1.5">
                        <span>{act.distanceKm.toFixed(1)}</span>
                        <span className="text-sm font-bold text-[#FC5200]">KM</span>
                      </div>
                    </div>

                    {/* 3 Metrics: Time, Pace, Elevation */}
                    <div className="grid grid-cols-3 gap-2 text-left mb-4">
                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">
                          TIME
                        </div>
                        <div className="text-xs sm:text-sm font-mono font-bold text-white">
                          {act.movingTime}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">
                          AVG PACE
                        </div>
                        <div className="text-xs sm:text-sm font-mono font-bold text-orange-400">
                          {act.avgPace}
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">
                          ELEVATION
                        </div>
                        <div className="text-xs sm:text-sm font-mono font-bold text-white">
                          {act.elevationGainM} m
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Link */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500">
                      Strava Verified
                    </span>
                    <a
                      href={act.stravaUrl || "https://www.strava.com/athletes/195893006"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-white hover:text-[#FC5200] transition-colors"
                    >
                      <span>View on Strava</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>

          {/* View All on Strava Button */}
          <div className="flex justify-center mt-12">
            <a
              href="https://www.strava.com/athletes/195893006"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-white/30 transition-all"
            >
              <span>View All Athlete Activities on Strava</span>
              <ArrowUpRight size={14} className="text-[#FC5200]" />
            </a>
          </div>
        </section>

        {/* BOTTOM CTA: RETURN HOME */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-white/5">
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
      </main>

      <Footer />
    </div>
  )
}
