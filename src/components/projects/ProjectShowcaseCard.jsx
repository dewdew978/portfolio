import React from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

export default function ProjectShowcaseCard({ project, onSelect, onFocus, reduced }) {
  const rawX = useMotionValue(0); const rawY = useMotionValue(0)
  const rotateY = useSpring(rawX, { stiffness: 180, damping: 20 }); const rotateX = useSpring(rawY, { stiffness: 180, damping: 20 })
  const onMouseMove = e => { if (reduced) return; const r=e.currentTarget.getBoundingClientRect(); rawX.set(((e.clientX-r.left)/r.width-.5)*10); rawY.set(-((e.clientY-r.top)/r.height-.5)*8) }
  const reset = () => { rawX.set(0); rawY.set(0) }
  return <motion.button type="button" onClick={onSelect} onFocus={onFocus} onMouseMove={onMouseMove} onMouseLeave={reset} whileHover={reduced?undefined:{y:-12,scale:1.015}} style={{rotateX,rotateY,transformPerspective:1000}} className="group relative shrink-0 w-[min(calc(100vw-2rem),28.75rem)] aspect-[4/3] overflow-hidden rounded-3xl sm:rounded-[2rem] bg-zinc-900 text-left shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-500"><img src={project.image} alt="" className={`absolute inset-0 h-full w-full ${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'} opacity-75 transition duration-700 group-hover:scale-110`}/><div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 text-white"><span className="text-[11px] sm:text-xs uppercase tracking-[.16em] sm:tracking-[.2em] text-white/70">{project.badges?.[0]}</span><h3 className="mt-2 text-xl sm:text-3xl font-bold leading-tight">{project.showcaseTitle || project.title}</h3><p className="mt-2 text-xs sm:text-sm text-white/75">{project.impactSuffix}</p></div></motion.button>
}
