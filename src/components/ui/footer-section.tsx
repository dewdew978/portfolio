'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
  Download as DownloadIcon,
  ArrowUpRight
} from 'lucide-react';
import { getAssetUrl } from '@/utils/url';
import { useLanguage } from '@/context/LanguageContext';
import PawaritLogo from '@/components/brand/PawaritLogo';

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

export function Footer() {
  const { t, lang } = useLanguage();
  const homeAnchor = (id: string) => getAssetUrl(`/#${id}`);

  const footerLinks: FooterSection[] = [
    {
      label: t.footer.navTitle,
      links: [
        { title: t.nav.about, href: homeAnchor('about') },
        { title: t.nav.skills, href: homeAnchor('skills') },
        { title: t.nav.projects, href: homeAnchor('projects') },
        { title: t.nav.experience, href: homeAnchor('experience') },
        { title: t.nav.contact, href: homeAnchor('contact') },
      ],
    },
    {
      label: t.footer.projectsTitle,
      links: [
        { title: 'ExamHub Platform', href: 'https://exam-hub-seven.vercel.app', target: '_blank' },
        { title: 'CMCC 2025 Case Slides', href: 'https://dewdew978.github.io/cmcc-quarto-slides/#/section', target: '_blank' },
        { title: 'US Accidents Analytics', href: getAssetUrl('/assets/us.html'), target: '_blank' },
        { title: 'AI BI Pipeline (Google ADK)', href: homeAnchor('experience') },
      ],
    },
    {
      label: t.footer.credentialsTitle,
      links: [
        { title: t.footer.downloadResume, href: getAssetUrl('/assets/Pawarit-Pansing-CV.pdf'), target: '_blank', icon: DownloadIcon },
        { title: t.footer.awsCertifications, href: homeAnchor('aws-certifications') },
        { title: 'KMITL Data Science (2027)', href: homeAnchor('about') },
        { title: 'CMCC 2025 Competitor', href: homeAnchor('experience') },
        { title: 'Multi-Stage BI Architecture', href: homeAnchor('skills') },
      ],
    },
    {
      label: t.footer.connectTitle,
      links: [
        { title: 'GitHub Profile', href: 'https://github.com/dewdew978', target: '_blank', icon: GithubIcon },
        { title: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/pawarit-pansing-5744a435b/', target: '_blank', icon: LinkedinIcon },
        { title: t.footer.emailMe, href: 'mailto:pawaritpansing@gmail.com', icon: MailIcon },
      ],
    },
  ];

  return (
    <footer className="relative w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 lg:pt-16 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] mt-16 backdrop-blur-xl">
      <div className="bg-zinc-400/30 dark:bg-zinc-600/30 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xs" />

      <div className="max-w-7xl mx-auto">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-12">
          {/* Brand Info */}
          <AnimatedContainer className="space-y-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white hover:opacity-85 transition-opacity"
              aria-label="Pawarit - Back to top"
            >
              <PawaritLogo className="h-7 sm:h-8 w-auto text-zinc-900 dark:text-white" />
              <span className="sr-only">{t.hero.name}</span>
            </a>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              {lang === 'th'
                ? 'Data Analyst & Business Analyst • เปลี่ยนข้อมูลที่ซับซ้อนให้เป็น Actionable Insights เพื่อขับเคลื่อนการเติบโตของธุรกิจ'
                : 'Data Analyst & Business Analyst • Transforming complex data into actionable insights to drive strategic business growth'}
            </p>
          </AnimatedContainer>

          {/* Links Grid: 2 columns on phones, 2 on tablet, 4 on desktop */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:col-span-2">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    {section.label}
                  </h3>
                  <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          target={link.target}
                          rel={link.target ? 'noopener noreferrer' : undefined}
                          className="hover:text-zinc-950 dark:hover:text-zinc-100 inline-flex min-h-11 max-w-full items-center gap-1.5 py-1 transition-all duration-200"
                        >
                          {link.icon && <link.icon className="size-3.5 shrink-0" />}
                          <span className="break-words">{link.title}</span>
                          {link.target === '_blank' && <ArrowUpRight size={12} className="opacity-50 shrink-0" />}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Bottom Sub-footer / Copyright Bar with safe-area spacing */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 dark:text-zinc-500">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} {t.footer.copyright} • {t.footer.builtWith}
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <span>{lang === 'th' ? 'กลับขึ้นด้านบน' : 'Back to top'}</span>
            <span aria-hidden="true">&uarr;</span>
          </a>
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
