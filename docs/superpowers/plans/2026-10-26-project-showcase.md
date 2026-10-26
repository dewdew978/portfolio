# Project Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an original draggable featured-project showcase on the home page and a responsive all-projects page at `/projects`.

**Architecture:** Keep `projectsData.js` as the source of truth, add one localization helper consumed by both views, and reuse the existing project modal. The home section becomes a Motion-powered accessible carousel; the new route renders the complete filterable collection.

**Tech Stack:** React 18, React Router 7, Motion 13, Tailwind CSS 4, Node test runner, Vite

**Spec:** `docs/superpowers/specs/2026-10-26-project-showcase-design.md`

## Global Constraints

- Do not copy or install React Bits Pro source code.
- Preserve Thai/English localization and dark/light themes.
- Support pointer, touch, keyboard, and reduced motion.
- Keep `projectsData.js` as the only project-data source.
- Do not include `.claude/` in commits.

## Review Focus

- Direct `/projects` refresh must render through the SPA fallback.
- One-project and empty-filter states must not break carousel/grid layout.
- Touch users must reach every card without hover.
- Keyboard users must operate previous/next controls and open details.
- Reduced-motion users must receive content without tilt or spring choreography.

---

### Task 1: Shared project localization

**Files:**
- Create: `src/utils/projects.js`
- Modify: `src/components/home/ProjectsSection.jsx`
- Test: `tests/project-showcase.test.mjs`

**Interfaces:**
- Produces: `getLocalizedProjects(translations): Array<[string, Project]>`

- [ ] Write a failing source-level test asserting the shared helper exists and both project views consume it.
- [ ] Run `node --test tests/project-showcase.test.mjs` and verify failure.
- [ ] Implement the helper by moving the existing translation merge logic without changing returned project fields.
- [ ] Run the test and verify it passes.

### Task 2: Home featured carousel

**Files:**
- Create: `src/components/projects/ProjectShowcaseCard.jsx`
- Modify: `src/components/home/ProjectsSection.jsx`
- Modify: `src/locales/translations.js`
- Test: `tests/project-showcase.test.mjs`

**Interfaces:**
- Consumes: `getLocalizedProjects(translations)`
- Produces: `ProjectsSection({ onSelectProject })` with drag, controls, keyboard navigation, and `/projects` link.

- [ ] Add failing assertions for the labelled carousel, previous/next controls, reduced-motion use, and `/projects` CTA.
- [ ] Run the focused test and verify failure.
- [ ] Implement the responsive Motion carousel and original bounded 3D pointer treatment.
- [ ] Add Thai/English labels and accessible control names.
- [ ] Run the focused test and verify it passes.

### Task 3: All-projects route

**Files:**
- Create: `src/pages/ProjectsPage.jsx`
- Create: `src/components/projects/ProjectGrid.jsx`
- Modify: `src/App.jsx`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/ui/footer-section.tsx`
- Modify: `src/locales/translations.js`
- Test: `tests/project-showcase.test.mjs`

**Interfaces:**
- Consumes: `getLocalizedProjects(translations)` and existing `ProjectModal`.
- Produces: `/projects` route with localized hero, category filters, complete grid, detail modal, GitHub/live actions, and home return link.

- [ ] Add failing assertions for route registration, shared data, filters, full collection, modal, and navigation links.
- [ ] Run the focused test and verify failure.
- [ ] Implement the page and grid with responsive layouts and 44px interaction targets.
- [ ] Wire route-aware project navigation without breaking the home `#projects` anchor.
- [ ] Run the focused test and verify it passes.

### Task 4: Local verification

**Files:**
- Modify if defects are found: files owned by Tasks 1–3

- [ ] Run `node --test` and require zero failures.
- [ ] Run `npm run build` and require a successful Vite production build plus generated `dist/404.html`.
- [ ] Start the Vite development server and inspect `/` and `/projects` at desktop, tablet, and mobile widths.
- [ ] Verify drag/touch, keyboard controls, modal, filters, language, themes, direct route load, and reduced motion.
- [ ] Report local URL and findings; do not commit or push without a new user request.
