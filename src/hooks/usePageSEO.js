import { useEffect } from 'react'

/**
 * Hook to dynamically update document title and primary SEO meta tags
 * @param {Object} options
 * @param {string} options.title - The page title
 * @param {string} [options.description] - The meta description
 * @param {string} [options.canonicalPath] - Relative path for canonical URL (e.g. '' or 'projects')
 */
export function usePageSEO({ title, description, canonicalPath }) {
  useEffect(() => {
    if (title) {
      document.title = title

      const ogTitleTag = document.querySelector('meta[property="og:title"]')
      if (ogTitleTag) ogTitleTag.setAttribute('content', title)

      const twitterTitleTag = document.querySelector('meta[name="twitter:title"]')
      if (twitterTitleTag) twitterTitleTag.setAttribute('content', title)
    }

    if (description) {
      const descTag = document.querySelector('meta[name="description"]')
      if (descTag) descTag.setAttribute('content', description)

      const ogDescTag = document.querySelector('meta[property="og:description"]')
      if (ogDescTag) ogDescTag.setAttribute('content', description)

      const twitterDescTag = document.querySelector('meta[name="twitter:description"]')
      if (twitterDescTag) twitterDescTag.setAttribute('content', description)
    }

    if (canonicalPath !== undefined) {
      const baseUrl = 'https://pawarit.tech'
      const fullUrl = canonicalPath ? `${baseUrl}/${canonicalPath.replace(/^\//, '')}` : `${baseUrl}/`
      const canonicalTag = document.querySelector('link[rel="canonical"]')
      if (canonicalTag) {
        canonicalTag.setAttribute('href', fullUrl)
      }
      const ogUrlTag = document.querySelector('meta[property="og:url"]')
      if (ogUrlTag) ogUrlTag.setAttribute('content', fullUrl)
      const twitterUrlTag = document.querySelector('meta[name="twitter:url"]')
      if (twitterUrlTag) twitterUrlTag.setAttribute('content', fullUrl)
    }
  }, [title, description, canonicalPath])
}

export default usePageSEO
