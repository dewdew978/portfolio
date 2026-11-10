import React from 'react'

export default function PawaritLogo({ className = 'text-2xl sm:text-3xl', ...props }) {
  return (
    <span
      className={`font-caveat font-bold tracking-wide select-none inline-block leading-none text-zinc-900 dark:text-white ${className}`}
      aria-label="Pawarit"
      role="img"
      {...props}
    >
      <span className="font-caveat">Pawarit</span>
    </span>
  )
}
