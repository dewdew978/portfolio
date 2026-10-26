import React, { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useVelocity, useTransform } from 'motion/react'
import { useLanguage } from '@/context/LanguageContext'
import { getLocalizedProjects } from '@/utils/projects'
import ProjectShowcaseCard from '@/components/projects/ProjectShowcaseCard'

export default function ProjectsSection({ onSelectProject }) {
  const { t, lang } = useLanguage(); const projects = getLocalizedProjects(t); const loopProjects=[...projects,...projects]; const [paused,setPaused]=useState(false); const [step,setStep]=useState(480); const trackRef=useRef(null); const reduced=useReducedMotion(); const x=useMotionValue(0); const velocity=useVelocity(x); const skew=useTransform(velocity,[-1200,0,1200],[-3,0,3])
  const c=lang==='th'?{tag:'ผลงานเด่น',title:'สร้างผลงานที่เปลี่ยนข้อมูลและไอเดียให้ใช้งานได้จริง',all:'ดูโปรเจกต์ทั้งหมด',carousel:'Featured projects carousel'}:{tag:'Featured Work',title:'Turning data and ideas into systems that work.',all:'View all projects',carousel:'Featured projects carousel'}
  const loopWidth=step*projects.length
  useEffect(()=>{const card=trackRef.current?.firstElementChild;if(!card)return;const measure=()=>setStep(card.getBoundingClientRect().width+20);measure();const observer=new ResizeObserver(measure);observer.observe(card);return()=>observer.disconnect()},[])
  const normalize=value=>{if(!loopWidth)return value;while(value<=-loopWidth)value+=loopWidth;while(value>0)value-=loopWidth;return value}
  useAnimationFrame((_,delta)=>{if(reduced||paused||projects.length<2)return;x.set(normalize(x.get()-delta*.035))})
  const onDragEnd=()=>x.set(normalize(x.get()))
  return <section id="projects" className="fullpage-section overflow-hidden section-space scroll-mt-12"><div className="site-container"><div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12"><div className="max-w-4xl"><p className="text-sm uppercase tracking-[.2em] text-indigo-600 dark:text-indigo-400 font-bold mb-4">{c.tag}</p><h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">{c.title}</h2></div><Link to="/projects" className="group inline-flex min-h-11 items-center gap-2 font-semibold">{c.all}<ArrowUpRight size={18}/></Link></div>
    <div aria-label={c.carousel} role="region" className="overflow-visible" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={()=>setPaused(false)}><motion.div ref={trackRef} style={{x,skewX:reduced?0:skew}} className="flex gap-5 cursor-grab active:cursor-grabbing touch-pan-y" drag="x" dragMomentum={!reduced} onDragStart={()=>setPaused(true)} onDragEnd={()=>{onDragEnd();setPaused(false)}}>{loopProjects.map(([key,p],index)=><ProjectShowcaseCard key={`${key}-${index}`} project={p} reduced={reduced} onSelect={()=>onSelectProject(p)}/>)}</motion.div>
    </div></div></section>
}
