import React, { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ProjectCaseStudy({ project, onClose, onSelectProject, allProjects = [] }) {
  const { t, lang } = useLanguage()
  const topRef = useRef(null)

  // Scroll to top when opening or switching project
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    topRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [project])

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Calculate next and previous project
  const currentIndex = allProjects.findIndex(([_, p]) => p.title === project.title)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1]?.[1] : null
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1]?.[1] : null

  const getRole = () => {
    if (project.category === 'business') return lang === 'th' ? 'การประเมินมูลค่าและกลยุทธ์ธุรกิจ' : 'Business Strategy & Valuation'
    if (project.category === 'analytics') return lang === 'th' ? 'การวิเคราะห์ข้อมูลและสร้างโมเดล' : 'Data Analytics & Risk Modeling'
    return lang === 'th' ? 'สถาปัตยกรรมระบบคลาวด์และเว็บ' : 'Full-Stack & Cloud Architecture'
  }

  const getClientOrCategory = () => {
    return project.badges?.[0] || (lang === 'th' ? 'โปรเจกต์อิสระ' : 'Independent Project')
  }

  const getTools = () => {
    return project.badges?.slice(1).join(', ') || 'Python, SQL, Analytics'
  }

  return (
    <div ref={topRef} className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT COLUMN: Sticky Project Identity & Specs (Gil Huybrecht Style) */}
        <aside className="w-full lg:w-[40%] xl:w-[35%] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-20">
          <div>
            {/* Back Button */}
            <div className="mb-8 lg:mb-12">
              <button
                type="button"
                onClick={onClose}
                className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <span>{lang === 'th' ? 'กลับสู่ผลงานทั้งหมด' : 'Back to all projects'}</span>
              </button>
            </div>

            {/* Project Title & Live Links */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                  {project.category}
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:opacity-75 underline underline-offset-4"
                  >
                    <span>{lang === 'th' ? 'เปิดดูเว็บจริง' : 'See Live Site'}</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1] mb-4">
                {project.title}
              </h1>

              {project.impactSuffix && (
                <p className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 mb-6">
                  {project.impactSuffix}
                </p>
              )}

              <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400 mb-8 font-normal">
                {project.overview}
              </p>
            </div>

            {/* Gil Huybrecht Numbered Specs Table (1, 2, 3, 4) */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-12 gap-2 py-1.5 border-b border-zinc-100 dark:border-zinc-900/60">
                <span className="col-span-1 text-zinc-400 font-bold">1</span>
                <span className="col-span-4 text-zinc-500 uppercase tracking-wider font-semibold">{lang === 'th' ? 'บทบาท' : 'Role'}</span>
                <span className="col-span-7 font-sans font-medium text-zinc-900 dark:text-zinc-200">{getRole()}</span>
              </div>

              <div className="grid grid-cols-12 gap-2 py-1.5 border-b border-zinc-100 dark:border-zinc-900/60">
                <span className="col-span-1 text-zinc-400 font-bold">2</span>
                <span className="col-span-4 text-zinc-500 uppercase tracking-wider font-semibold">{lang === 'th' ? 'หมวดหมู่' : 'Category'}</span>
                <span className="col-span-7 font-sans font-medium text-zinc-900 dark:text-zinc-200">{getClientOrCategory()}</span>
              </div>

              <div className="grid grid-cols-12 gap-2 py-1.5 border-b border-zinc-100 dark:border-zinc-900/60">
                <span className="col-span-1 text-zinc-400 font-bold">3</span>
                <span className="col-span-4 text-zinc-500 uppercase tracking-wider font-semibold">{lang === 'th' ? 'เครื่องมือ' : 'Tools'}</span>
                <span className="col-span-7 font-sans font-medium text-zinc-900 dark:text-zinc-200">{getTools()}</span>
              </div>

              <div className="grid grid-cols-12 gap-2 py-1.5">
                <span className="col-span-1 text-zinc-400 font-bold">4</span>
                <span className="col-span-4 text-zinc-500 uppercase tracking-wider font-semibold">{lang === 'th' ? 'ปี' : 'Year'}</span>
                <span className="col-span-7 font-sans font-medium text-zinc-900 dark:text-zinc-200">2025 - 2026</span>
              </div>
            </div>
          </div>

          {/* Bottom Action in Left Column */}
          <div className="pt-8 mt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>{lang === 'th' ? 'ย้อนกลับ' : 'Back'}</span>
            </button>

            {project.gitHubUrl && (
              <a
                href={project.gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                <Github size={15} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </aside>

        {/* RIGHT COLUMN: Vertically Scrollable Editorial Case Study */}
        <main className="w-full lg:w-[60%] xl:w-[65%] p-6 sm:p-12 lg:p-16 space-y-16 lg:space-y-24">
          
          {/* Full-bleed Hero Visual */}
          {project.image && (
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-xl">
              <img
                src={project.image}
                alt={project.title}
                className={`w-full max-h-[75vh] ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
              />
            </div>
          )}

          {/* Section 01: Overview & Mission */}
          <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-12">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                01 / {lang === 'th' ? 'ภาพรวม' : 'Overview'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {lang === 'th' ? 'เป้าหมายและภาพรวมของโครงการ' : 'Project Vision & Core Mission'}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-3xl">
              {project.overview}
            </p>
          </section>

          {/* Section 02: Architecture & Methodology */}
          {project.architecture && (
            <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-12">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  02 / {lang === 'th' ? 'สถาปัตยกรรม' : 'Architecture'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {lang === 'th' ? 'สถาปัตยกรรมระบบและระเบียบวิธีวิจัย' : 'System Architecture & Implementation'}
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                <p className="text-base sm:text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 font-sans">
                  {project.architecture}
                </p>
              </div>
            </section>
          )}

          {/* Section 03: Key Features & Capabilities */}
          {project.features?.length > 0 && (
            <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-12">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  03 / {lang === 'th' ? 'ฟีเจอร์เด่น' : 'Key Features'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {lang === 'th' ? 'ขีดความสามารถหลักของระบบ' : 'Core Capabilities & Deliverables'}
              </h2>
              <div className="grid gap-4 sm:gap-5">
                {project.features.map((feature, idx) => {
                  const parts = feature.split(':')
                  const title = parts.length > 1 ? parts[0] : null
                  const body = parts.length > 1 ? parts.slice(1).join(':') : feature
                  return (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs"
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-zinc-400 dark:text-zinc-500 pt-1">
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <div>
                          {title && (
                            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1.5">
                              {title}
                            </h3>
                          )}
                          <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {body}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Section 04: Business Impact */}
          {project.impact && (
            <section className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-8 sm:pt-12">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  04 / {lang === 'th' ? 'ผลลัพธ์เชิงธุรกิจ' : 'Impact'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {lang === 'th' ? 'ผลลัพธ์และคุณค่าทางธุรกิจที่ส่งมอบ' : 'Measurable Business Impact'}
              </h2>
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200/50 dark:from-zinc-900 dark:to-zinc-900/40 border border-zinc-300 dark:border-zinc-700/60">
                <p className="text-lg sm:text-xl font-medium leading-relaxed text-zinc-900 dark:text-white">
                  "{project.impact}"
                </p>
              </div>
            </section>
          )}

          {/* Bottom Footer Navigation to Next/Previous Projects */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pb-12">
            <div>
              {prevProject && (
                <button
                  type="button"
                  onClick={() => onSelectProject(prevProject)}
                  className="group inline-flex items-center gap-2 text-left cursor-pointer"
                >
                  <ChevronLeft size={20} className="text-zinc-400 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      {lang === 'th' ? 'โครงการก่อนหน้า' : 'Previous Project'}
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white group-hover:underline">
                      {prevProject.title}
                    </span>
                  </div>
                </button>
              )}
            </div>

            <div>
              {nextProject && (
                <button
                  type="button"
                  onClick={() => onSelectProject(nextProject)}
                  className="group inline-flex items-center gap-2 text-right cursor-pointer"
                >
                  <div>
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      {lang === 'th' ? 'โครงการถัดไป' : 'Next Project'}
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-white group-hover:underline">
                      {nextProject.title}
                    </span>
                  </div>
                  <ChevronRight size={20} className="text-zinc-400 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
