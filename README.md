# Pawarit Pansing — Data Science & Business Analytics Portfolio

> **Transforming complex data into actionable, high-impact business decisions.**
> Bilingual (TH/EN) portfolio featuring data, analytics, business strategy, and verified AWS Academy credentials.

---

## 🚀 Live Demo & Links
- **Portfolio Website:** [dewdew978.github.io/portfolio](https://dewdew978.github.io/portfolio/)
- **GitHub Repository:** [github.com/dewdew978/portfolio](https://github.com/dewdew978/portfolio)
- **LinkedIn Profile:** [linkedin.com/in/pawarit-pansing-5744a435b](https://www.linkedin.com/in/pawarit-pansing-5744a435b/)

---

## 🧑‍💻 Getting Started

```bash
npm install
npm run dev          # local dev server at http://localhost:5173/
npm run build        # production build → dist/ (base path /portfolio/)
npm run preview      # serve the production build locally
```

---

## 📁 Directory Structure

```text
WEB_PORT/
├── .github/workflows/
│   └── deploy.yml                # Build & deploy to GitHub Pages on every push to main
├── public/                       # Static assets served as-is (resolve with getAssetUrl)
│   └── assets/                   # CV, AWS certificates, report figures, and US Accidents slides
├── scripts/
│   └── postbuild.js              # Copies dist/index.html → 404.html for SPA routing on Pages
├── src/
│   ├── components/
│   │   ├── home/                 # Home page sections: Hero, About, Skills, Projects,
│   │   │                         #   Experience, Contact + ProjectModal
│   │   ├── MagicBento/           # Interactive skills bento grid
│   │   ├── ui/footer-section.*   # Footer (TSX, re-exported via .jsx shim)
│   │   ├── FadeInSection.jsx     # IntersectionObserver reveal animations
│   │   ├── FullpageNavigator.jsx # Floating section progress indicator
│   │   ├── MarqueeProofBar.jsx   # Marquee ticker
│   │   └── Navbar.jsx            # Floating navbar (theme + language toggles)
│   ├── context/LanguageContext.jsx  # TH/EN state, persisted in localStorage
│   ├── data/projectsData.js      # Project base data (non-text fields + fallbacks)
│   ├── hooks/useFullpageScroll.js   # Wheel/keyboard section-by-section scrolling
│   ├── locales/translations.js   # All UI copy in TH and EN
│   ├── pages/
│   │   └── HomePage.jsx          # Composes the home sections
│   ├── utils/url.js              # getAssetUrl(): prefixes public paths with the Vite base
│   ├── App.jsx                   # Home route + dark/light theme
│   └── main.jsx                  # Entry: ErrorBoundary → Router → LanguageProvider
├── legacy/                       # Archived pre-React static site
├── index.html
└── vite.config.js                # base = /portfolio/ in production, @ → src alias
```

---

## 🌐 Internationalization (TH/EN)

- Default language is **Thai**; the choice is saved under `localStorage.portfolio_lang`.
- Read strings with `const { t, lang } = useLanguage()`.
- Project text lives in `translations[lang].projects.items[key]` and overrides the fields in `projectsData.js`.
- When adding copy, add the same key to **both** `th` and `en` in `src/locales/translations.js`.

---

## 🚢 Deployment

The site is deployed to **GitHub Pages** at `/portfolio/` by `.github/workflows/deploy.yml` on every push to `main`.

- `vite.config.js` sets `base: '/portfolio/'` for production builds, and the router uses `import.meta.env.BASE_URL` as its basename.
- Always reference files in `public/` through `getAssetUrl('/path')` so they resolve under the base path.
- `scripts/postbuild.js` copies `index.html` to `404.html` for GitHub Pages SPA fallback support.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 5, React Router 7, Tailwind CSS 4, Motion, Lucide React
- **Automation:** Node.js and GitHub Actions for GitHub Pages deployment
- **Data & Analytics (projects):** Python, Pandas, MS SQL Server, Google ADK, Altair, Gradio, Quarto

---

## 📄 License
Created and maintained by **Pawarit Pansing (Dew)** © 2026. All rights reserved.
