# Pawarit Pansing — Data Science & Business Analytics Portfolio

> **Transforming complex data into actionable, high-impact business decisions.**  
> Interactive Web Portfolio & Real-time Athletic Endurance Telemetry Platform.

---

## 🚀 Live Demo & Links
- **Portfolio Website:** [pawarit-portfolio.vercel.app](https://pawarit-portfolio.vercel.app)
- **Athletics & Strava Telemetry:** [pawarit-portfolio.vercel.app/athletics](https://pawarit-portfolio.vercel.app/athletics)
- **GitHub Repository:** [github.com/dewdew978/portfolio](https://github.com/dewdew978/portfolio)
- **LinkedIn Profile:** [linkedin.com/in/pawarit-pansing-5744a435b](https://www.linkedin.com/in/pawarit-pansing-5744a435b/)

---

## 📁 System Architecture & Directory Structure

```text
WEB_PORT/
├── .github/
│   └── workflows/
│       └── strava-sync.yml       # Automated GitHub Actions cron workflow for Strava GPS sync
├── public/                       # Static public assets served directly by Vite
│   ├── assets/                   # Public downloadable documents & interactive reports
│   │   ├── CV.pdf                # Official Resume / Curriculum Vitae
│   │   ├── images/               # Report figures and diagrams
│   │   └── us.html               # US Traffic Accidents Interactive Analytics Report
│   ├── data/
│   │   └── strava-activities.json# Real-time athletic telemetry and activity store
│   ├── ExamHubpage.png           # ExamHub project showcase preview
│   ├── cmcc.png                  # CMCC 2025 presentation cover
│   └── profiledew.jpg            # High-res profile portrait
├── scripts/
│   └── sync-strava.js            # Node.js web scraping engine for Strava GPS telemetry
├── src/                          # Application source code
│   ├── components/               # Modular UI & interactive 3D components
│   │   ├── Lanyard/              # Interactive 3D WebGL physics lanyard card
│   │   ├── MagicBento/           # Interactive dynamic bento grid
│   │   ├── ui/                   # Reusable UI primitives (Footer, Buttons, etc.)
│   │   ├── FadeInSection.jsx     # IntersectionObserver reveal animations
│   │   ├── FullpageNavigator.jsx # Floating section progress indicator
│   │   ├── MarqueeProofBar.jsx   # Editorial marquee ticker
│   │   └── Navbar.jsx            # Floating glass navigation pill
│   ├── data/
│   │   └── projectsData.js       # Decoupled project showcase specifications
│   ├── hooks/
│   │   └── useFullpageScroll.js  # Keyboard & wheel smooth scroll navigator
│   ├── pages/
│   │   └── AthleticsPage.jsx     # Apple.com / Nike Run Club aesthetic telemetry page
│   ├── App.jsx                   # Root application router & portfolio layout
│   ├── index.css                 # Tailwind CSS directives & custom typography
│   └── main.jsx                  # React 18 DOM entry point
├── legacy/                       # Archived legacy static files
├── index.html                    # HTML5 entry template with SEO metadata
├── package.json                  # Dependencies and build scripts
├── tailwind.config.js            # Tailwind theme tokens & color palette
└── vite.config.js                # Vite build bundler configuration
```

---

## 🛠️ Technical Stack & Tools

- **Core Frontend:** React 18, Vite 5, React Router v6, Tailwind CSS
- **3D & Visualizations:** Three.js, React Three Fiber, React Three Rapier (Physics), Recharts, Lucide React
- **Automation Pipeline:** Node.js, GitHub Actions (Cron Telemetry Sync), REST APIs
- **Data & Analytics Stack:** Python, Pandas, MS SQL Server, Google ADK, Altair, Gradio, Quarto

---

## 🏃 Real-time Strava Sync Pipeline

This portfolio features an automated data ingestion pipeline:
1. **GitHub Actions Workflow (`.github/workflows/strava-sync.yml`):** Runs every 2 hours.
2. **Scraper Script (`scripts/sync-strava.js`):** Ingests GPS telemetry, route thumbnails, paces, and elevations directly from Strava.
3. **Data Cache (`public/data/strava-activities.json`):** Commits structured JSON data without requiring third-party OAuth token expirations.
4. **Apple.com Athletic UI (`src/pages/AthleticsPage.jsx`):** Renders high-fidelity GPS maps, metrics, and live stream frame.

---

## 📄 License
Created and maintained by **Pawarit Pansing (Dew)** © 2026. All rights reserved.
