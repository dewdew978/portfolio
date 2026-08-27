import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MagicBento from './components/MagicBento/MagicBento'
import { Footer } from '@/components/ui/footer-section'
import {
  Download, ChevronDown, Github, Linkedin, Mail,
  Copy, Check, Play, Eye, ExternalLink, Sparkles, Terminal, X,
  GraduationCap, Briefcase, Award, ArrowUpRight
} from 'lucide-react'

const profileCode = `@dataclass
class PawaritPansing:
    role: str = "Data Analyst & Business Analyst"
    education: str = "KMITL • B.Sc. in Data Science & Business Analytics (2027)"
    specialties: list = [
        "AI Agent & Multi-Stage BI Pipelines (Google ADK)",
        "Business Strategy & Market Analysis (CMCC 2025)",
        "Text-to-SQL & Automated Data Sanitization",
        "Prescriptive Analytics & Interactive Dashboards"
    ]
    technical_stack: list = [
        "Python", "SQL Server", "Google ADK", "Pandas", "Altair", "Gradio", "Recharts"
    ]
    core_mission: str = "Transforming complex data into actionable, high-impact business decisions."

# Initialize Agent
agent = PawaritPansing()
print(f"Ready to drive growth: {agent.core_mission}")`

const projectsData = {
  examhub: {
    title: 'ExamHub — Online Examination Platform',
    category: 'web',
    badges: ['Web Platform', 'EdTech', 'Analytics', 'Vercel'],
    image: '/ExamHubpage.png',
    overview: 'แพลตฟอร์มคลังข้อสอบและจัดการการสอบออนไลน์ ออกแบบมาเพื่อสนับสนุนการเรียนรู้ในระดับอุดมศึกษา รองรับมากกว่า 20+ สาขาวิชาในหมวด Computer Science และ Data Science พร้อมระบบตรวจคำตอบและการวิเคราะห์คะแนนแบบเรียลไทม์',
    architecture: 'สถาปัตยกรรม Full-Stack Web Application บน Vercel Cloud Platform พัฒนาด้วย JavaScript ที่เน้นความเร็วและ Accessibility เชื่อมต่อระบบ Admin CMS จัดการข้อมูลข้อสอบแบบ JSON Pipelines และสร้างระบบวิเคราะห์ข้อมูลคะแนนด้วย Recharts Data Visualizer',
    features: [
      'Interactive Examination Engine: ระบบทำข้อสอบแบบจับเวลาและตรวจผลคะแนนอัตโนมัติทันทีที่ส่ง',
      'Admin CMS Question Management: ระบบจัดการคลังข้อสอบ คัดกรอง ตรวจสอบ และนำเข้าข้อมูลข้อสอบรูปแบบ JSON แบบ Batch',
      'Score Analytics & Mastery Dashboard: แสดงกราฟสถิติการกระจายตัวของคะแนน (Score Distribution) และประเมินจุดแข็ง-จุดอ่อนของผู้เรียน',
      'Quality Feedback Workflow: เวิร์กโฟลว์สำหรับรายงานและตรวจสอบความถูกต้องของโจทย์ข้อสอบ'
    ],
    impact: 'ช่วยลดระยะเวลาในการจัดชุดข้อสอบและประเมินผลการเรียนรู้ลงกว่า 70% พร้อมยกระดับคุณภาพของคลังข้อสอบด้วยการตรวจสอบความถูกต้องอย่างเป็นระบบ',
    liveUrl: 'https://exam-hub-seven.vercel.app',
    liveLabel: 'เปิดดู Live App',
    gitHubUrl: 'https://github.com/dewdew978/ExamHub'
  },
  cmcc: {
    title: 'CMCC 2025 — Strategy & Digital Innovation (Plan B Media)',
    category: 'business',
    badges: ['Business Strategy', 'Financial Valuation', 'Capital Market', 'Quarto'],
    image: '/cmcc.png',
    overview: 'โครงการแข่งขันวิเคราะห์เคสตลาดทุนระดับประเทศ Capital Market Case Competition 2025 สำหรับ Plan B Media เพื่อค้นหาโอกาสทางธุรกิจใหม่และวางแผนกลยุทธ์เชิงรุกสำหรับสื่อนอกบ้าน (Out-of-Home Media) ในยุคดิจิทัล',
    architecture: 'การวิเคราะห์เชิงยุทธศาสตร์ผสมผสานการสร้างแบบจำลองทางการเงิน (Financial Modeling) และการประเมินมูลค่ากิจการ (Enterprise Valuation) พร้อมนำเสนอด้วย Interactive Presentation Deck ที่พัฒนาผ่าน Quarto Framework',
    features: [
      'OOH Market Dynamics: วิเคราะห์สภาพตลาดสื่อโฆษณานอกบ้าน พฤติกรรมผู้บริโภค และความพร้อมสู่ Digital Convergence',
      'Asset Tokenization Model: แนวคิดการแปลงพื้นที่ป้ายโฆษณาเป็น Digital Asset Token เพื่อเพิ่มสภาพคล่องทางการเงินและเปิดรับนักลงทุนรายย่อย',
      'Sustainability Financing (Green Billboards): โมเดลนวัตกรรมป้ายประหยัดพลังงานเพื่อสอดรับกับเกณฑ์ ESG',
      'Sportainment Platform: แพลตฟอร์มบูรณาการสื่อกีฬาและกิจกรรมบันเทิงเพื่อสร้างการมีส่วนร่วมของแฟนคลับ (Fan Engagement)'
    ],
    impact: 'นำเสนอโมเดลรายได้ใหม่และการประเมินผลตอบแทนจากการลงทุน (ROI Projection) ที่ชัดเจน ช่วยเพิ่มมูลค่าเชิงกลยุทธ์และการแข่งขันระยะยาวขององค์กร',
    liveUrl: 'https://dewdew978.github.io/cmcc-quarto-slides/#/section',
    liveLabel: 'เปิดดู Interactive Slides',
    gitHubUrl: 'https://github.com/dewdew978/cmcc-quarto-slides'
  },
  'us-accidents': {
    title: 'US Accidents Analytics & Risk Modeling Report',
    category: 'analytics',
    badges: ['Data Analytics', 'Python', 'Pandas', 'EDA', 'Data Viz'],
    image: '/assets/images/1.png',
    overview: 'โครงการวิเคราะห์ชุดข้อมูลอุบัติเหตุจราจรในสหรัฐอเมริกาขนาดใหญ่ (US Accidents Dataset หลายล้านเรคคอร์ด) เพื่อค้นหาความสัมพันธ์ ปัจจัยเสี่ยง และสร้างโมเดลความรุนแรงของอุบัติเหตุในแต่ละพื้นที่',
    architecture: 'Data Pipeline พัฒนาด้วย Python (Pandas, NumPy) สำหรับการทำ Data Cleansing, Outlier Detection, Feature Engineering และสร้างรายงานข้อมูลเชิงลึกแบบ Interactive Web Report',
    features: [
      'Temporal Risk Analysis: วิเคราะห์ช่วงเวลาเกิดอุบัติเหตุสูงสุด (Peak Traffic Hours) และความผันผวนตามวันในสัปดาห์',
      'Environmental Impact Modeling: ศึกษาผลกระทบของสภาพอากาศ (Weather, Visibility, Precipitation) และสภาพพื้นผิวถนนต่อระดับความรุนแรง (Severity Levels 1-4)',
      'Spatial Clustering & Hotspots: จัดกลุ่มพื้นที่และรัฐที่มีความหนาแน่นของอุบัติเหตุสูง เพื่อระบุจุดเสี่ยงอันตราย',
      'Interactive Data Report: นำเสนอผลลัพธ์ผ่านเว็บอินเทอร์แอคทีฟที่สามารถดูภาพรวมและตัวเลขสถิติได้อย่างสะดวก'
    ],
    impact: 'ผลการวิเคราะห์ให้ข้อเสนอแนะเชิงประจักษ์ในการวางแผนจัดสรรหน่วยกู้ภัยเชิงรุก และการจัดทำนโยบายลดอุบัติเหตุในพื้นที่เสี่ยงสูงได้อย่างตรงจุด',
    liveUrl: '/assets/us.html',
    liveLabel: 'เปิดดู Interactive Report',
    gitHubUrl: 'https://github.com/dewdew978'
  }
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // CodeBlock Typewriter Streaming
  const [streamedText, setStreamedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(true)

  // Filter Tabs & Modal
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const startStream = () => {
    setStreamedText('')
    setIsGenerating(true)
    let index = 0
    const interval = setInterval(() => {
      index += 3
      if (index <= profileCode.length) {
        setStreamedText(profileCode.slice(0, index))
      } else {
        setStreamedText(profileCode)
        setIsGenerating(false)
        clearInterval(interval)
      }
    }, 20)
  }

  useEffect(() => {
    startStream()
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('pawaritpansing@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(profileCode)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const filteredProjects = Object.entries(projectsData).filter(([_, proj]) => {
    if (activeFilter === 'all') return true
    return proj.category === activeFilter
  })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans">
      {/* PURE TAILWIND FLOATING PILL NAVBAR */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* HERO SECTION */}
      <section id="hero" className="pt-32 pb-16 md:pt-44 md:pb-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Intro */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4"></span>
              <span>Available for Data &amp; Business Analyst Roles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-4">
              Hello, I'm <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Pawarit Pansing
              </span>
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-zinc-600 dark:text-zinc-400 mb-6">
              Data Analyst • Business Analyst • Data Storyteller
            </p>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 border-l-4 border-l-indigo-600 text-zinc-800 dark:text-zinc-200 text-base max-w-xl mb-8 shadow-sm">
              <Sparkles size={20} className="text-indigo-500 shrink-0" />
              <span>เปลี่ยนข้อมูลที่ซับซ้อนให้เป็น <strong className="font-semibold text-zinc-950 dark:text-white">Actionable Insights</strong> เพื่อขับเคลื่อนการเติบโตของธุรกิจ</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="/assets/CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Download size={18} />
                <span>ดาวน์โหลดเรซูเม่</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>ดูผลงานวิเคราะห์</span>
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
                  src="/cat.png"
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
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 mb-3">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            เกี่ยวกับฉัน
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
            นักศึกษา <strong className="font-semibold text-zinc-900 dark:text-white">Data Science and Business Analytics</strong> สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (KMITL)
            ที่มีความสนใจลึกซึ้งในด้านการวิเคราะห์ข้อมูล (Data Analysis), ปัญญาประดิษฐ์ (Artificial Intelligence), และการสร้างระบบ Business Intelligence อัตโนมัติ (AI Agent Pipelines)
            มุ่งมั่นประยุกต์ใช้ทักษะการคิดเชิงวิเคราะห์และการแก้ปัญหาจริงเพื่อสร้าง <strong className="font-semibold text-zinc-900 dark:text-white">Actionable Insights</strong> ขับเคลื่อนการตัดสินใจทางธุรกิจ
          </p>
        </div>

        {/* Highlights 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">AI Agent &amp; BI Pipelines</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              พัฒนา 5-stage Automated BI Pipeline ด้วย Google ADK (SequentialAgent) แปลงภาษาธรรมชาติเป็น SQL Query และสร้าง Prescriptive Analytics บน MS SQL Server
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-purple-500/50 dark:hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Business Strategy &amp; Innovation</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              ประสบการณ์แข่งขันเคสธุรกิจระดับชาติ CMCC 2025 (Plan B Media) วิเคราะห์กลยุทธ์ OOH Media, ออกแบบ Asset Tokenization และประเมินผลกระทบทางการเงิน
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-pink-500/50 dark:hover:border-pink-500/50 hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Data Analytics &amp; Visualizations</h3>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              พัฒนาแพลตฟอร์ม ExamHub รองรับ 20+ สาขาวิชา พร้อมระบบ Score Analytics และ Interactive Dashboard ด้วย Altair, Gradio, และ Recharts
            </p>
          </div>
        </div>

        {/* ReUI Interactive CodeBlock */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d1117] shadow-2xl max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              <span className="text-xs font-mono text-zinc-400 ml-2">analyst_agent.py</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-300">Python 3.11</span>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${isGenerating ? 'bg-amber-500/20 text-amber-300 animate-pulse' : 'bg-emerald-500/20 text-emerald-300'}`}>
                {isGenerating ? 'Generating...' : 'Complete'}
              </span>
              <button
                onClick={startStream}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                title="พิมพ์ใหม่"
              >
                <Play size={12} />
                <span>Replay</span>
              </button>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                title="คัดลอกโค้ด"
              >
                {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copiedCode ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
          {/* Code Body */}
          <div className="p-5 font-mono text-sm sm:text-base leading-relaxed text-zinc-200 overflow-x-auto">
            <pre className="whitespace-pre">
              <code>
                {streamedText}
                {isGenerating && <span className="inline-block w-2 h-4 ml-1 bg-indigo-500 animate-pulse"></span>}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60 mb-3">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            ทักษะและความเชี่ยวชาญ
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            เครื่องมือ เทคโนโลยี และองค์ความรู้ด้าน Data Analytics, AI Agents &amp; Business Strategy
          </p>
        </div>

        {/* REACT BITS MAGIC BENTO COMPONENT */}
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </section>

      {/* PROJECTS SECTION WITH FILTER TABS */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-800/60 mb-3">
            Featured Works
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            ผลงานและโครงงานเด่น
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            รวมโปรเจกต์การวิเคราะห์ข้อมูล รายงานสถิติเชิงลึก และเคสการแข่งขันทางธุรกิจ
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-x-auto max-w-full">
            {[
              { key: 'all', label: 'ทั้งหมด', count: 3 },
              { key: 'analytics', label: 'Data Analytics', count: 1 },
              { key: 'business', label: 'Business & Finance', count: 1 },
              { key: 'web', label: 'Web & Systems', count: 1 }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === tab.key
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold shadow-sm'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeFilter === tab.key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map(([key, proj]) => (
            <article
              key={key}
              className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:-translate-y-1.5 transition-all duration-300"
            >
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
                  {proj.badges[0]}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2">
                  {proj.title}
                </h3>
                <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {proj.overview}
                </p>

                {/* Footer / Actions */}
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    <Eye size={15} />
                    <span>Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={proj.gitHubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-500/25 transition-colors"
                    >
                      <span>Demo</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* EXPERIENCE / TIMELINE */}
      <section id="experience" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="mb-12">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 mb-3">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            ประสบการณ์และประวัติการศึกษา
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            เส้นทางการทำงาน การพัฒนาทักษะ และผลงานที่ผ่านมา
          </p>
        </div>

        {/* Timeline Line */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-10">
          {/* Timeline 1 */}
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-indigo-600 shadow-md shadow-indigo-500/30"></div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Competitor • Capital Market Case Competition 2025 (CMCC)
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  2025
                </span>
              </div>
              <div className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Plan B Media Case Study</div>
              <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                <li>วิเคราะห์โอกาสและการเติบโตของอุตสาหกรรมสื่อนอกบ้าน (Out-of-Home Media) และการผสานสื่อนวัตกรรมดิจิทัล</li>
                <li>ออกแบบและจำลองแนวคิด <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Asset Tokenization</strong> เพื่อแปลงพื้นที่โฆษณาเป็น Digital Asset เพิ่มสภาพคล่อง</li>
                <li>นำเสนอโมเดล <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Sustainability Financing (Green Billboards)</strong> และแพลตฟอร์ม Sportainment Fan Engagement</li>
                <li>สร้างแบบจำลองทางการเงิน ประเมินมูลค่ากิจการ (Enterprise Valuation) และคาดการณ์ผลตอบแทน (ROI)</li>
              </ul>
            </div>
          </div>

          {/* Timeline 2 */}
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-purple-600 shadow-md shadow-purple-500/30"></div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  AI Agent &amp; Data Pipeline Developer
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  2024 - 2025
                </span>
              </div>
              <div className="text-base font-semibold text-purple-600 dark:text-purple-400 mb-3">Google ADK &amp; MS SQL Server Project</div>
              <ul className="space-y-2 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside leading-relaxed">
                <li>ประยุกต์ใช้ <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Google ADK (SequentialAgent)</strong> ในการประสานงาน Multi-Agent</li>
                <li>สร้างระบบ Text-to-SQL แปลงคำถามทางธุรกิจเป็น T-SQL Query บน Microsoft SQL Server โดยอัตโนมัติ</li>
                <li>พัฒนาระบบตรวจสอบความปลอดภัย Sanitization Agent และ Execution Agent ป้องกันคำสั่งที่เป็นอันตราย</li>
                <li>สร้างระบบสังเคราะห์ Prescriptive Analytics และแสดงผลแดชบอร์ดข้อมูลเชิงลึกอัตโนมัติ</li>
              </ul>
            </div>
          </div>

          {/* Timeline 3 */}
          <div className="relative">
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-4 border-emerald-600 shadow-md shadow-emerald-500/30"></div>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  B.Sc. in Data Science and Business Analytics
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  Class of 2027
                </span>
              </div>
              <div className="text-base font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                King Mongkut's Institute of Technology Ladkrabang (KMITL)
              </div>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                ศึกษาด้านวิทยาการข้อมูล การวิเคราะห์เชิงสถิติ ปัญญาประดิษฐ์ และการวางกลยุทธ์ธุรกิจ มุ่งเน้นการสร้างคุณค่าจากข้อมูล
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
            พร้อมร่วมงานและขับเคลื่อนธุรกิจด้วยข้อมูล
          </h2>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            หากคุณกำลังมองหา Data Analyst หรือ Business Analyst เพื่อร่วมทีม หรือต้องการปรึกษาการวิเคราะห์ข้อมูล สามารถติดต่อได้ทันทีครับ
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:pawaritpansing@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all"
            >
              <Mail size={18} />
              <span>ส่งอีเมลหาฉัน</span>
            </a>
            <a
              href="https://www.linkedin.com/in/pawarit-pansing-5744a435b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:-translate-y-0.5 shadow-sm transition-all"
            >
              <Linkedin size={18} />
              <span>LinkedIn Profile</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-base font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:-translate-y-0.5 transition-all"
            >
              {copiedEmail ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
              <span>{copiedEmail ? 'คัดลอกอีเมลแล้ว!' : 'คัดลอกอีเมล'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* SHADCN FOOTER SECTION */}
      <Footer />

      {/* TAILWIND PROJECT DETAIL MODAL DIALOG */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-start justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selectedProject.badges.map((b, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                      {b}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
              <div className="rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 max-h-64">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
                  Overview &amp; Problem Statement
                </h4>
                <p>{selectedProject.overview}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1.5">
                  Architecture &amp; Tech Stack
                </h4>
                <p>{selectedProject.architecture}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-2">
                  Key Findings &amp; Core Highlights
                </h4>
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedProject.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1.5">
                  Business &amp; Strategic Impact
                </h4>
                <p>{selectedProject.impact}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4 bg-zinc-50/50 dark:bg-zinc-900/50">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                ปิด
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
                  <span>{selectedProject.liveLabel}</span>
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
