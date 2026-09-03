import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import MagicBento from './components/MagicBento/MagicBento'
import FullpageNavigator from './components/FullpageNavigator'
import FadeInSection from './components/FadeInSection'
import MarqueeProofBar from './components/MarqueeProofBar'
import AthleticsPage from './pages/AthleticsPage'
import { useFullpageScroll } from './hooks/useFullpageScroll'
import { Footer } from '@/components/ui/footer-section'
import {
  Download, ChevronDown, Github, Linkedin, Mail,
  Copy, Check, Play, Eye, ExternalLink, Sparkles, Terminal, X,
  GraduationCap, Briefcase, Award, ArrowUpRight, Activity
} from 'lucide-react'

import { projectsData } from './data/projectsData'
import { getAssetUrl } from '@/utils/url'
import { useLanguage } from '@/context/LanguageContext'

function PortfolioHome({ theme, setTheme }) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const { lang, t } = useLanguage()

  // Filter Tabs & Modal
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pawaritpansing@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const localizedProjects = Object.entries(projectsData).map(([key, proj]) => {
    const loc = (t.projects?.items && t.projects.items[key]) || {}
    return [
      key,
      {
        ...proj,
        title: loc.title || proj.title,
        impactSuffix: loc.impactSuffix !== undefined ? loc.impactSuffix : proj.impactSuffix,
        overview: loc.overview || proj.overview,
        architecture: loc.architecture || proj.architecture,
        features: loc.features || proj.features,
        impact: loc.impact || proj.impact,
        liveLabel: loc.liveLabel || proj.liveLabel,
      }
    ]
  })

  const filteredProjects = localizedProjects.filter(([_, proj]) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'data' || activeFilter === 'analytics') return proj.category === 'analytics' || (proj.badges && proj.badges.includes('Data Analytics'))
    if (activeFilter === 'business') return proj.category === 'business' || (proj.badges && proj.badges.includes('Business Strategy'))
    if (activeFilter === 'web') return proj.category === 'web'
    return proj.category === activeFilter
  })

  const { activeIdx, scrollToIdx, scrollProgress, sections } = useFullpageScroll(Boolean(selectedProject))

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
      {/* PURE TAILWIND FLOATING PILL NAVBAR */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* FULL-PAGE FLOATING NAVIGATOR & PROGRESS BAR */}
      <FullpageNavigator
        activeIdx={activeIdx}
        scrollToIdx={scrollToIdx}
        scrollProgress={scrollProgress}
        sections={sections}
      />

      {/* HERO SECTION */}
      <section id="hero" className="fullpage-section relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 justify-center">
        <FadeInSection direction="up" duration={800}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Intro */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4"></span>
                <span>{t.hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
                {lang === 'th' ? 'สวัสดีครับ, ผม' : "Hello, I'm"} <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {t.hero.name}
                </span>
                {t.hero.nickname && (
                  <span className="text-2xl sm:text-3xl font-semibold text-zinc-500 dark:text-zinc-400 ml-3">
                    {t.hero.nickname}
                  </span>
                )}
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-zinc-600 dark:text-zinc-400 mb-6">
                {t.hero.role}
              </p>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-indigo-600 text-zinc-800 dark:text-zinc-200 text-base max-w-xl mb-8 shadow-sm">
                <Sparkles size={20} className="text-indigo-500 shrink-0" />
                <span>
                  {t.hero.taglineLead} <strong className="font-semibold text-zinc-950 dark:text-white">{t.hero.taglineBold}</strong> {t.hero.taglineEnd}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href={getAssetUrl('/assets/CV.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Download size={18} />
                  <span>{t.hero.downloadResume}</span>
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>{t.hero.viewProjects}</span>
                  <ChevronDown size={18} />
                </a>
              </div>

              {/* Social Icons */}
              <ul className="flex items-center gap-3">
                <li>
                  <a
                    href="https://github.com/dewdew978"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 shadow-sm transition-all"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/pawarit-pansing-5744a435b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 shadow-sm transition-all"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:pawaritpansing@gmail.com"
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 shadow-sm transition-all"
                    title="Email"
                  >
                    <Mail size={20} />
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: Profile Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative flex justify-center items-center">
                {/* Ambient Glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-500/25 to-purple-500/25 blur-3xl animate-pulse-glow"></div>

                {/* Avatar Frame */}
                <div className="relative z-10 p-2.5 rounded-3xl bg-gradient-to-tr from-white/40 to-white/10 dark:from-zinc-800/80 dark:to-zinc-900/80 border border-zinc-200/80 dark:border-zinc-700/80 shadow-2xl backdrop-blur-xl hover:-translate-y-1 transition-all duration-300">
                  <img
                    src={getAssetUrl('/profiledew.jpg')}
                    alt="Pawarit Pansing"
                    className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-2xl bg-zinc-100 dark:bg-zinc-800 shadow-inner"
                  />
                </div>

                {/* Bottom Status Chip */}
                <div className="absolute -bottom-3.5 z-20 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/95 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-lg backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>KMITL • Data Science (2027)</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Scroll Down Indicator */}
        <div className="hidden sm:flex justify-center mt-12 mb-2">
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="inline-flex flex-col items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
          >
            <span>{t.hero.scrollDown}</span>
            <ChevronDown size={16} className="animate-bounce text-indigo-500" />
          </a>
        </div>
      </section>

      {/* EDITORIAL MARQUEE PROOF BAR */}
      <MarqueeProofBar />

      {/* ABOUT SECTION */}
      <section id="about" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
        <FadeInSection direction="up" delay={50}>
          <div className="mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3">
              {t.about.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
              {t.about.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
              {t.about.bioP1} <strong className="font-semibold text-zinc-900 dark:text-white">{t.about.bioP1Bold}</strong> {t.about.bioP2} <strong className="font-semibold text-zinc-900 dark:text-white">{t.about.bioP2Bold}</strong> {t.about.bioP3}
            </p>
          </div>
        </FadeInSection>

        {/* Highlights 3-Card Grid */}
        <FadeInSection direction="up" delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card1Title}</h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.about.card1Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card2Title}</h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.about.card2Desc}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-pink-500/50 dark:hover:border-pink-500/50 hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t.about.card3Title}</h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.about.card3Desc}
              </p>
            </div>
          </div>
        </FadeInSection>

        {/* Strava Standalone Page Direct Callout */}
        <FadeInSection direction="up" delay={300}>
          <Link
            to="/athletics"
            className="group flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 hover:border-orange-500/40 hover:bg-orange-500/15 transition-all shadow-sm max-w-4xl mx-auto mt-8 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#FC5200] text-white flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Activity size={22} />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>{t.about.stravaTitle}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{t.about.stravaBadge}</span>
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  {t.about.stravaDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#FC5200] group-hover:translate-x-1 transition-transform">
              <span>{t.about.stravaAction}</span>
              <ArrowUpRight size={16} />
            </div>
          </Link>
        </FadeInSection>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
        <FadeInSection direction="up" delay={50}>
          <div className="mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 mb-3">
              {t.skills.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
              {t.skills.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.skills.subtitle}
            </p>
          </div>
        </FadeInSection>

        {/* REACT BITS MAGIC BENTO COMPONENT */}
        <FadeInSection direction="up" delay={150}>
          <MagicBento 
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            glowColor="147, 51, 234"
            spotlightRadius={300}
            particleCount={12}
            className="w-full"
          />
        </FadeInSection>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
        <FadeInSection direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800/60 mb-3">
                {t.projects.badge}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">
                {t.projects.title}
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {t.projects.subtitle}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t.projects.filterAll}
              </button>
              <button
                onClick={() => setActiveFilter('data')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'data'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t.projects.filterAnalytics}
              </button>
              <button
                onClick={() => setActiveFilter('business')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'business'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t.projects.filterBusiness}
              </button>
              <button
                onClick={() => setActiveFilter('web')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'web'
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {t.projects.filterWeb}
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(([key, proj], idx) => (
            <FadeInSection key={key} direction="up" delay={idx * 100}>
              <article className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-300">
                {/* Card Image */}
                <div
                  className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer group"
                  onClick={() => setSelectedProject(proj)}
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900/80 text-white backdrop-blur-md shadow-sm">
                    {(proj.badges && proj.badges[0]) || 'Project'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {(proj.badges || []).map((badge, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                    {proj.title}
                    {proj.impactSuffix && (
                      <span className="block text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                        {proj.impactSuffix}
                      </span>
                    )}
                  </h3>
                  <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {proj.overview}
                  </p>

                  {/* Footer / Actions */}
                  <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      <Eye size={15} />
                      <span>{t.projects.details}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={proj.gitHubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        {t.projects.github}
                      </a>
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-500/25 transition-colors"
                      >
                        <span>{t.projects.demo}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="fullpage-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
        <FadeInSection direction="up" delay={50}>
          <div className="mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mb-3">
              {t.experience.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
              {t.experience.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.experience.subtitle}
            </p>
          </div>
        </FadeInSection>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-10">
          <FadeInSection direction="up" delay={100}>
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-indigo-600 shadow-md shadow-indigo-500/30"></div>
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {t.experience.cmccTitle}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                    {t.experience.cmccPeriod}
                  </span>
                </div>
                <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{t.experience.cmccCase}</div>
                <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                  {t.experience.cmccPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={200}>
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-purple-600 shadow-md shadow-purple-500/30"></div>
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {t.experience.aiBiTitle}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {t.experience.aiBiPeriod}
                  </span>
                </div>
                <div className="text-base font-semibold text-purple-600 dark:text-purple-400 mb-3">{t.experience.aiBiOrg}</div>
                <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                  {t.experience.aiBiPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={300}>
            <div className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-emerald-600 shadow-md shadow-emerald-500/30"></div>
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
                <div className="mb-4">
                  <div className="inline-flex items-center px-3 py-2 rounded-xl bg-white border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <img
                      src={getAssetUrl('/nav-eng.svg')}
                      alt="KMITL School of Information Technology"
                      className="h-8 sm:h-9 w-auto max-w-full object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {t.experience.eduDegree}
                  </h3>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                    {t.experience.eduPeriod}
                  </span>
                </div>
                <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                  {t.experience.eduUniversity}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                  {t.experience.eduFaculty}
                </div>
                <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                  {t.experience.eduPoints.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="fullpage-section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-12 justify-center">
        <FadeInSection direction="up" delay={50}>
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

            <div className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-4">
              {t.contact.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:pawaritpansing@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Mail size={18} />
                <span>{t.footer.emailMe}</span>
              </a>
              <a
                href="https://www.linkedin.com/in/pawarit-pansing-5744a435b/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 shadow-sm hover:-translate-y-0.5 transition-all"
              >
                <Linkedin size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span>LinkedIn</span>
              </a>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                <span>{copiedEmail ? t.contact.copiedEmail : t.contact.copyEmail}</span>
              </button>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="p-6 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white relative">
              <button
                onClick={() => setSelectedProject(null)}
                aria-label={t.projects.modal.close}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
              <span className="text-xs uppercase tracking-widest font-mono text-white/80">{selectedProject.category}</span>
              <h3 className="text-2xl font-bold mt-1 text-white">{selectedProject.title}</h3>
            </div>

            <div className="p-6 sm:p-8 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
              {selectedProject.image && (
                <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 max-h-64">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
                  {t.projects.modal.overview}
                </h4>
                <p>{selectedProject.overview}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1.5">
                  {t.projects.modal.architecture}
                </h4>
                <p>{selectedProject.architecture}</p>
              </div>

              {selectedProject.features && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-2">
                    {t.projects.modal.features}
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside">
                    {selectedProject.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                  {t.projects.modal.impact}
                </h4>
                <p>{selectedProject.impact}</p>
              </div>
            </div>

            <div className="p-4 sm:p-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {t.projects.modal.close}
              </button>
              <div className="flex items-center gap-3">
                <a
                  href={selectedProject.gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-500/25 transition-colors"
                >
                  <span>{selectedProject.liveLabel || t.projects.modal.launchDemo}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <Routes>
      <Route path="/" element={<PortfolioHome theme={theme} setTheme={setTheme} />} />
      <Route path="/athletics" element={<AthleticsPage theme={theme} setTheme={setTheme} />} />
      <Route path="/strava" element={<AthleticsPage theme={theme} setTheme={setTheme} />} />
    </Routes>
  )
}
