# Compact Editorial Project Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the oversized, text-heavy project modal with a compact editorial dialog that is easy to scan.

**Architecture:** Keep the existing `ProjectModal({ project, onClose })` contract and project data unchanged. Render one compact reading column with a short cover, overview, at most three feature points, impact, and quiet action links.

**Tech Stack:** React, Tailwind CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-28-minimal-project-modal-design.md`

## Global Constraints

- Dialog width is approximately 760-820px and remains viewport bounded.
- Preserve localized content, optional GitHub behavior, dark mode and accessible dialog semantics.
- Do not render the numbered 01-04 treatment or separate architecture section.
- Show no more than three feature points.
- Keep project data intact; change presentation only.

## Review Focus

- Long Thai and English titles wrap without colliding with the close button.
- Missing features render without an empty section.
- More than three features are truncated to three in the dialog.
- A null GitHub URL hides only the GitHub action.
- Short mobile viewports scroll internally without hiding the close control.

---

### Task 1: Compact Project Modal

**Files:**
- Modify: `src/components/home/ProjectModal.jsx`
- Modify: `tests/project-modal.test.mjs`

**Interfaces:**
- Consumes: existing `project` object and `onClose` callback.
- Produces: the same dialog and link behavior in a compact single-column presentation.

- [ ] **Step 1: Rewrite the regression test to require compact layout markers**

Assert a bounded `max-w-[820px]`, no desktop grid or sticky sidebar, no numbered sections, no `project.architecture`, `project.features.slice(0, 3)`, optional feature rendering and optional GitHub rendering.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test tests/project-modal.test.mjs`
Expected: FAIL because the current modal is wide, two-column and numbered.

- [ ] **Step 3: Implement the compact single-column modal**

Update `ProjectModal({ project, onClose })` so the cover uses a short landscape ratio, body text has a narrow measure, features are capped at three, impact is retained, and actions are compact links.

- [ ] **Step 4: Run verification**

Run: `node --test tests/project-modal.test.mjs`
Expected: PASS.

Run: `node --test tests/*.test.mjs`
Expected: all tests pass.

Run: `npm run build`
Expected: production build succeeds.

- [ ] **Step 5: Visually inspect local desktop, tablet and mobile layouts**

Expected: the dialog feels visibly smaller and lighter, wraps safely and remains usable at each viewport.
