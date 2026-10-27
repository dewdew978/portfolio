# Minimal Skills List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Skills as a professional responsive minimal list.

**Architecture:** Add a focused presentational component that consumes the existing localized `t.skills.bento` array. Replace `MagicBento` in `SkillsSection` without changing translation content.

**Tech Stack:** React, Tailwind CSS, Node test runner

**Spec:** `docs/superpowers/specs/2026-10-28-minimal-skills-list-design.md`

## Global Constraints

- Preserve all four skill entries and localized copy.
- Remove decorative SVG and interactive bento effects from the rendered Skills section.
- Keep tag pills readable and wrapping on narrow screens.
- Preserve desktop, tablet and mobile responsiveness.

## Review Focus

- Four entries render in translation order.
- Number labels remain two digits.
- Long Thai text and tags wrap without overflow.
- Dark mode retains readable contrast.
- No MagicBento animation remains mounted.

---

### Task 1: Replace bento grid with minimal list

**Files:**
- Create: `src/components/skills/SkillsList.jsx`
- Modify: `src/components/home/SkillsSection.jsx`
- Test: `tests/layout-system.test.mjs`

**Interfaces:**
- Consumes: `t.skills.bento` item array.
- Produces: semantic ordered capability list.

- [ ] Add a failing source-level regression test for the minimal list structure.
- [ ] Implement the list component and replace MagicBento.
- [ ] Run the focused test, full suite and production build.
