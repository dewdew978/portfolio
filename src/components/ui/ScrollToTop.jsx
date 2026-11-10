import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    // Instantly scroll window and document to absolute top on any route or parameter change
    const html = document.documentElement
    const prevBehavior = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    // Restore smooth scroll behavior for in-page anchors
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prevBehavior
    })
  }, [pathname, search])

  return null
}
