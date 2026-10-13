# Pawarit Pansing — Data Science & Business Analytics Portfolio

> **Transforming complex data into actionable, high-impact business decisions.**
> Bilingual (TH/EN) web portfolio with an auto-synced Strava athletics page.

---

## 🚀 Live Demo & Links
- **Portfolio Website:** [dewdew978.github.io/portfolio](https://dewdew978.github.io/portfolio/)
- **Athletics & Strava Page:** [dewdew978.github.io/portfolio/athletics](https://dewdew978.github.io/portfolio/athletics)
- **GitHub Repository:** [github.com/dewdew978/portfolio](https://github.com/dewdew978/portfolio)
- **LinkedIn Profile:** [linkedin.com/in/pawarit-pansing-5744a435b](https://www.linkedin.com/in/pawarit-pansing-5744a435b/)

---

## 🧑‍💻 Getting Started

```bash
npm install
npm run dev          # local dev server at http://localhost:5173/
npm run build        # production build → dist/ (base path /portfolio/)
npm run preview      # serve the production build locally
npm run sync:strava  # refresh public/data/strava-activities.json manually
```

---

## 📁 Directory Structure

```text
WEB_PORT/
├── .github/workflows/
│   ├── deploy.yml                # Build & deploy to GitHub Pages on every push to main
│   └── strava-sync.yml           # Cron (every 2h) Strava sync → commits JSON back to the repo
├── public/                       # Static assets served as-is (resolve with getAssetUrl)
│   ├── assets/                   # CV.pdf, report figures, us.html (US Accidents report)
│   └── data/strava-activities.json
├── scripts/
│   ├── postbuild.js              # Copies dist/index.html → 404.html for SPA routing on Pages
│   └── sync-strava.js            # Scrapes the public Strava widget into strava-activities.json
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
│   │   ├── HomePage.jsx          # Composes the home sections
│   │   └── AthleticsPage.jsx     # Strava activity page
│   ├── utils/url.js              # getAssetUrl(): prefixes public paths with the Vite base
│   ├── App.jsx                   # Routes (/, /athletics, /strava) + dark/light theme
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
- `scripts/postbuild.js` copies `index.html` to `404.html` so deep links like `/portfolio/athletics` work.

---

## 🏃 Strava Sync Pipeline

1. **`strava-sync.yml`** runs every 2 hours, and also on `workflow_dispatch` or a `strava_new_activity` repository dispatch.
2. **`scripts/sync-strava.js`** scrapes the athlete's public Strava "latest rides" widget. No OAuth or secrets are needed.
3. The result is written to **`public/data/strava-activities.json`** and committed with `[skip ci]`.
4. **`AthleticsPage.jsx`** fetches that JSON at runtime.

> Because it scrapes widget HTML, the sync can break if Strava changes the widget markup.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite 5, React Router 7, Tailwind CSS 4, Motion, Lucide React
- **Automation:** Node.js, GitHub Actions (Pages deploy + cron data sync)
- **Data & Analytics (projects):** Python, Pandas, MS SQL Server, Google ADK, Altair, Gradio, Quarto

---

## 📄 License
Created and maintained by **Pawarit Pansing (Dew)** © 2026. All rights reserved.
