# Responsive Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every primary portfolio section adapt cleanly across phone, tablet, laptop, and desktop widths.

**Architecture:** Keep the existing component structure and add responsive Tailwind classes plus shared overflow and spacing safeguards. Tests pin the intended mobile-first contracts while browser inspection and the production build cover integration.

**Tech Stack:** React 18, Tailwind CSS 4, Motion, Node test runner, Vite

**Spec:** `docs/superpowers/specs/2026-10-26-responsive-layout-design.md`

## Global Constraints

- Preserve the current visual identity, content, translations, routes, and links.
- Keep mobile as the base layout and desktop full-page behavior at `lg` and above.
- Do not add dependencies.
- Do not stage `.claude/`.

## Review Focus

- 320–390px screens must not create page-level horizontal scrolling.
- Long Thai and English labels must wrap without overlapping adjacent controls.
- Interactive controls must remain at least 44px tall on touch screens.
- Tablet layouts must not switch to dense desktop arrangements too early.
- Motion and project dragging must remain usable with vertical touch scrolling.

---

### Task 1: Responsive foundations and primary sections

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/home/ProjectsSection.jsx`
- Modify: `src/components/projects/ProjectShowcaseCard.jsx`
- Modify: `src/components/home/ExperienceSection.jsx`
- Modify: `src/components/home/CertificatesSection.jsx`
- Modify: `src/components/home/ContactSection.jsx`
- Modify: `src/components/ui/footer-section.tsx`
- Create: `tests/responsive-layout.test.mjs`

**Interfaces:**
- Consumes: existing `site-container`, `section-space`, Tailwind breakpoints, and localized copy.
- Produces: mobile-first layout contracts with safe overflow, full-width narrow-screen actions, and progressive columns.

- [ ] **Step 1: Write the failing responsive contract test**

Assert shared page overflow protection, mobile footer stacking, full-width narrow-screen contact/certificate actions, safe project-card widths, and compact mobile section spacing.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test tests/responsive-layout.test.mjs`
Expected: FAIL because the new responsive contracts are absent.

- [ ] **Step 3: Implement the responsive classes and shared CSS safeguards**

Apply only layout, sizing, wrapping, and touch-target changes; do not alter content or component behavior.

- [ ] **Step 4: Run the focused test and full suite**

Run: `node --test tests/responsive-layout.test.mjs && node --test`
Expected: PASS with zero failures.

### Task 2: Integration verification

**Files:**
- Verify: all changed files from Task 1

**Interfaces:**
- Consumes: responsive contracts from Task 1.
- Produces: verified production bundle and visual evidence at representative widths.

- [ ] **Step 1: Build the production site**

Run: `npm run build`
Expected: Vite build exits 0 and generates `dist/404.html`.

- [ ] **Step 2: Inspect representative phone, tablet, and desktop layouts**

Check navigation, projects, experience, certificates, contact, footer, and any page-level overflow. Record any defect as a failing test before fixing it.

