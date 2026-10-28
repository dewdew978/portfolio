import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ProjectGrid from '@/components/projects/ProjectGrid'
import ProjectModal from '@/components/home/ProjectModal'
import { Footer } from '@/components/ui/footer-section'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedProjects } from '@/utils/projects'
import { usePageSEO } from '@/hooks/usePageSEO'

export default function ProjectsPage({ theme, setTheme }) {
  const { t, lang } = useLanguage()
  const [selectedProject, setSelectedProject] = useState(null)
  const projects = getLocalizedProjects(t)

  usePageSEO({
    title: lang === 'th'
      ? 'ผลงานและโปรเจกต์ทั้งหมด (Projects) | Pawarit Pansing (ปวริศ ปัญสิงห์)'
      : 'All Projects & Case Studies | Pawarit Pansing (ปวริศ ปัญสิงห์)',
    description: lang === 'th'
      ? `รวมผลงานและเคสศึกษาการวิเคราะห์ข้อมูล ${projects.length} โปรเจกต์ของ ปวริศ ปัญสิงห์ (Pawarit Pansing)`
      : `Explore ${projects.length} data analytics and business strategy projects by Pawarit Pansing (ปวริศ ปัญสิงห์).`,
    canonicalPath: 'projects',
  })

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="site-container pt-28 sm:pt-36 pb-16 sm:pb-24">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
          <ArrowLeft size={17} />
          {lang === 'th' ? 'กลับหน้าหลัก' : 'Back home'}
        </Link>
        <p className="mt-8 sm:mt-12 text-sm font-bold uppercase tracking-[.2em] text-indigo-600 dark:text-indigo-400">
          {lang === 'th' ? 'โปรเจกต์ทั้งหมด' : 'All projects'}
        </p>
        <h1 className="display-heading mt-4 font-semibold">
          {lang === 'th'
            ? 'ผลงานที่สร้างจากความคิด การทดลอง และการลงมือทำ'
            : 'Work shaped by ideas, experiments, and execution.'}
        </h1>
        <p className="mt-5 sm:mt-6 mb-8 sm:mb-12 max-w-2xl text-base sm:text-lg leading-7 text-zinc-600 dark:text-zinc-400">
          {lang === 'th'
            ? `รวม ${projects.length} โปรเจกต์ด้านเว็บ ข้อมูล และกลยุทธ์ธุรกิจ`
            : `${projects.length} projects across web, data, and business strategy.`}
        </p>
        <ProjectGrid projects={projects} t={t} onSelectProject={setSelectedProject} />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}
