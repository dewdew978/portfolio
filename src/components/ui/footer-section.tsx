'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
  Download as DownloadIcon,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  target?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'เกี่ยวกับ (About)', href: '#about' },
      { title: 'ทักษะ (Skills)', href: '#skills' },
      { title: 'ผลงาน (Projects)', href: '#projects' },
      { title: 'ประสบการณ์ (Experience)', href: '#experience' },
      { title: 'ติดต่อ (Contact)', href: '#contact' },
    ],
  },
  {
    label: 'Featured Projects',
    links: [
      { title: 'ExamHub Platform', href: 'https://exam-hub-seven.vercel.app', target: '_blank' },
      { title: 'CMCC 2025 Case Slides', href: 'https://dewdew978.github.io/cmcc-quarto-slides/#/section', target: '_blank' },
      { title: 'US Accidents Analytics', href: '/assets/us.html', target: '_blank' },
      { title: 'AI BI Pipeline (Google ADK)', href: '#experience' },
    ],
  },
  {
    label: 'Credentials & Resume',
    links: [
      { title: 'ดาวน์โหลดเรซูเม่ (CV.pdf)', href: '/assets/CV.pdf', target: '_blank', icon: DownloadIcon },
      { title: 'KMITL Data Science (2027)', href: '#about' },
      { title: 'CMCC 2025 Competitor', href: '#experience' },
      { title: 'Multi-Stage BI Architecture', href: '#skills' },
    ],
  },
  {
    label: 'Social & Connect',
    links: [
      { title: 'GitHub Profile', href: 'https://github.com/dewdew978', target: '_blank', icon: GithubIcon },
      { title: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/pawarit-pansing-5744a435b/', target: '_blank', icon: LinkedinIcon },
      { title: 'Email Me', href: 'mailto:pawaritpansing@gmail.com', icon: MailIcon },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 px-6 py-12 lg:py-16 mt-12 backdrop-blur-xl">
      <div className="bg-indigo-500/30 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white"
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-sm shadow-indigo-500"></span>
            <span>Pawarit Pansing</span>
          </a>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
            Data Analyst &amp; Business Analyst • เปลี่ยนข้อมูลที่ซับซ้อนให้เป็น Actionable Insights เพื่อขับเคลื่อนการเติบโตของธุรกิจ
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Open for Opportunities • Bangkok, Thailand</span>
          </div>
          <p className="text-zinc-400 dark:text-zinc-500 text-xs pt-4">
            &copy; {new Date().getFullYear()} Pawarit Pansing. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-8 md:mb-0">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        target={link.target}
                        rel={link.target ? 'noopener noreferrer' : undefined}
                        className="hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1.5 transition-all duration-200"
                      >
                        {link.icon && <link.icon className="size-3.5" />}
                        <span>{link.title}</span>
                        {link.target === '_blank' && <ArrowUpRight size={12} className="opacity-50" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
