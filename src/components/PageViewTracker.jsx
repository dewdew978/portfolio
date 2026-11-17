import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// GoatCounter counts the first page load on its own; this reports client-side
// route changes (e.g. home -> /projects) that a single-page app would otherwise miss.
export default function PageViewTracker() {
  const { pathname, search } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const goatcounter = window.goatcounter
    if (!goatcounter || typeof goatcounter.count !== 'function') return
    goatcounter.count({ path: window.location.pathname + window.location.search })
  }, [pathname, search])

  return null
}
