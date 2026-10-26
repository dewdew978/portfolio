# Responsive Layout Design

## Intent

Make the portfolio comfortable and stable across phones, tablets, laptops, and desktop screens without changing its current visual identity or content hierarchy.

## Goals

- Prevent horizontal page overflow and crowded controls at narrow widths.
- Use one-column mobile layouts, selective two-column tablet layouts, and the existing desktop full-page presentation.
- Keep touch targets at least 44px tall and allow action labels to wrap safely.
- Make project cards, experience entries, certificate cards, contact actions, navigation, modals, and the footer adapt consistently.
- Preserve reduced-motion behavior and all current routes, links, translations, and content.

## Non-goals

- No new visual theme, content rewrite, dependency, or navigation model.
- No change to the project showcase's automatic movement beyond sizing and overflow safety.
- No commit or push as part of this pass unless requested separately.

## Approach

Use the existing Tailwind breakpoints and shared CSS primitives. Mobile is the base layout, `sm`/`md` progressively add columns and inline actions, and `lg` retains full-height sections. Add a small source-level regression test for the responsive contracts and verify the production build plus manual browser inspection.

