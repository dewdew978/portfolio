import React from 'react'

export default function SkillsList({ items = [] }) {
  return (
    <ol className="border-t border-zinc-200 dark:border-zinc-800">
      {items.map((item, index) => (
        <li
          key={item.id || item.title}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-zinc-200 py-7 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6 sm:py-9 dark:border-zinc-800"
        >
          <span className="pt-1 font-mono text-xs font-semibold tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
            {String(index + 1).padStart(2, '0')}
          </span>

          <article className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
              {item.badge}
            </p>
            <div className="mt-3 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,1.1fr)] lg:gap-10">
              <div className="min-w-0">
                <h3 className="break-words text-xl font-bold leading-tight text-zinc-900 sm:text-2xl dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
                  {item.subtitle}
                </p>
              </div>

              <div className="min-w-0">
                <p className="text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-300">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  )
}
