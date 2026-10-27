# Featured Cloud Projects Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add both supplied repositories to Featured and All Projects with localized content and supplied covers.

**Architecture:** Extend the shared `projectsData` source so both existing surfaces receive the projects automatically. Add Thai and English overrides in the existing translation structure and store the supplied covers under project assets.

**Tech Stack:** React, Vite, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-28-featured-cloud-projects-design.md`

## Global Constraints

- Both projects must appear in Featured and All Projects.
- Use the supplied cover images.
- Do not use the em dash character in new project copy.
- Preserve the existing responsive carousel and project grid.

## Review Focus

- Shared data must expose exactly two new project keys to both surfaces.
- Thai and English entries must match the same keys.
- Every external URL must use HTTPS.
- Image paths must point to committed local assets.
- Existing projects and filters must remain available.

---

### Task 1: Add project content and covers

**Files:**
- Create: `public/assets/projects/cloud-sql-playground.png`
- Create: `public/assets/projects/intelligent-curriculum-system.png`
- Modify: `src/data/projectsData.js`
- Modify: `src/locales/translations.js`
- Test: `tests/featured-cloud-projects.test.mjs`

**Interfaces:**
- Consumes: `getLocalizedProjects(t)` and existing project card fields.
- Produces: `curriculum-system` and `cloud-sql-playground` project records.

- [ ] Write tests asserting both keys, local images, repository and presentation URLs, bilingual overrides, category assignment, and no em dash in new records.
- [ ] Run the focused test and verify it fails because the records are absent.
- [ ] Copy the supplied covers and add the minimal shared and localized project records.
- [ ] Run the focused test, full test suite, and production build.
