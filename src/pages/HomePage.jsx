import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import FullpageNavigator from '@/components/FullpageNavigator'
import MarqueeProofBar from '@/components/MarqueeProofBar'
import { Footer } from '@/components/ui/footer-section'
import HeroSection from '@/components/home/HeroSection'
import AboutSection from '@/components/home/AboutSection'
import SkillsSection from '@/components/home/SkillsSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import ExperienceSection from '@/components/home/ExperienceSection'
import CertificatesSection from '@/components/home/CertificatesSection'
import ContactSection from '@/components/home/ContactSection'
import ProjectModal from '@/components/home/ProjectModal'
import { useFullpageScroll } from '@/hooks/useFullpageScroll'

export default function HomePage({ theme, setTheme }) {
  const [selectedProject, setSelectedProject] = useState(null)

  // Fullpage scrolling is paused while the project modal is open
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

      <HeroSection />

      {/* EDITORIAL MARQUEE PROOF BAR */}
      <MarqueeProofBar />

      <AboutSection />
      <SkillsSection />
      <ProjectsSection onSelectProject={setSelectedProject} />
      <ExperienceSection />
      <CertificatesSection />
      <ContactSection />

      <Footer />

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  )
}
