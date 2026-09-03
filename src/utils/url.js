/**
 * Resolves a public asset path with Vite's base URL
 * @param {string} path - e.g. '/profiledew.jpg' or 'profiledew.jpg'
 * @returns {string} - e.g. '/portfolio/profiledew.jpg'
 */
export function getAssetUrl(path) {
  if (!path) return ''
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#') ||
    path.startsWith('data:')
  ) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base : `${base}/`
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cleanBase}${cleanPath}`
}
