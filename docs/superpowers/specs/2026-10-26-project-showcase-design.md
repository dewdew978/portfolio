# Custom Project Showcase Design

## Intent

Redesign the project presentation so the portfolio feels more distinctive and interactive, using the referenced React Bits Showcase 2 as visual inspiration. The implementation must be original and must not copy React Bits Pro source code.

Visual reference: <https://pro.reactbits.dev/docs/blocks/showcase/showcase-2?variantSort=latest>. The defining traits to adapt are its oversized editorial introduction, low-profile monochrome controls, horizontally draggable image sequence, overlapping/off-axis card composition, and restrained 3D pointer hover. The portfolio version will use Pawarit's real project imagery and existing indigo/pink theme tokens rather than duplicating the reference artwork or exact styling.

## Goals

- Replace the current project grid on the home page with a featured-work showcase.
- Add a dedicated `/projects` page containing every project.
- Reuse `projectsData.js` as the single project-data source.
- Preserve Thai/English localization, dark/light themes, accessibility, and responsive behavior.
- Keep GitHub and live-demo links easy to reach.

## Non-goals

- Do not redesign unrelated home-page sections in this change.
- Do not create individual project-detail routes yet.
- Do not add a CMS or remote database.
- Do not copy or install React Bits Pro code.

## Anti-goals

- No interaction that works only with a mouse.
- No continuous heavy animation on mobile.
- No horizontal page overflow or inaccessible drag-only navigation.
- No duplicated hard-coded project lists across pages.

## Chosen Approach

### Custom Showcase

Build an original draggable carousel using the existing `motion` dependency. It will capture the reference's large editorial heading, layered project imagery, drag interaction, and restrained 3D hover while remaining consistent with this portfolio.

Alternatives considered:

- React Bits Pro component: closest match, but requires licensed source and would couple the site to external Pro code.
- Static showcase: fastest and lightest, but loses the drag interaction that defines the requested reference.

## Home-page Featured Showcase

- Retain the `projects` anchor so existing navigation continues to work.
- Introduce the section with a small “Featured Work” label, a large localized headline, and a short supporting sentence.
- Show all currently available projects in a horizontally draggable carousel; the data model may later add an explicit `featured` flag without changing the component interface.
- Each card uses the real project image, title, primary category, and a short result/impact line.
- Desktop pointer hover adds bounded perspective tilt and image depth. Touch devices receive drag and tap behavior without hover assumptions.
- Provide previous/next controls, position indicator, keyboard navigation, and visible focus states in addition to drag.
- Selecting a card continues to open the existing accessible project modal.
- A prominent localized “View All Projects” link routes to `/projects`.

## All Projects Page

- Add a routed `ProjectsPage` at `/projects`.
- Reuse the global navigation and footer, with a compact page hero rather than full-page scrolling.
- Render all entries from `projectsData.js` in a responsive grid.
- Preserve category filtering for All, Data/Analytics, Business, and Web.
- Project cards expose details, GitHub, and live-demo actions. Selecting details uses the existing project modal.
- Include a clear link back to the home page and support direct page refresh through the existing GitHub Pages SPA fallback.

## Responsive Behavior

- Desktop: approximately 2.5 visible showcase cards with drag and 3D hover.
- Tablet: approximately 1.5–2 visible cards, reduced tilt, touch-friendly controls.
- Mobile: one dominant card with a preview of the next card; snap-like drag; no pointer-only effects.
- All controls have at least a 44px interactive target and layouts avoid fixed viewport widths.

## Motion and Accessibility

- Respect `prefers-reduced-motion`; remove tilt and spring choreography while retaining navigation and content.
- Images have meaningful alt text and reserved aspect ratios to reduce layout shift.
- Carousel semantics expose a labelled region and announce the active project without excessive live updates.
- Buttons and links remain reachable and understandable by keyboard and screen reader.
- Dark and light palettes maintain readable contrast.

## Data and Component Structure

- Add a shared project-localization helper so the home showcase and projects page do not repeat merge logic.
- Replace the internal layout of `ProjectsSection` with the showcase while keeping its public modal-selection callback.
- Add reusable project card/action components only where they meaningfully reduce duplication.
- Add new localization strings for the showcase headline, carousel controls, result count, page title, page subtitle, back link, and view-all link.
- Update navigation/footer project links where necessary so page-local anchors and `/projects` links behave predictably.

## Verification

- Automated checks cover the `/projects` route, shared data usage, view-all navigation, and accessible carousel controls.
- Production build must succeed.
- Manually verify desktop, tablet, and mobile widths; drag/touch; keyboard controls; dark/light themes; Thai/English; direct `/projects` refresh; modal actions; and reduced-motion behavior.

## Builder Decisions

The builder may choose exact spacing, easing curves, perspective values, and file boundaries as long as they follow this design and the existing project conventions.
