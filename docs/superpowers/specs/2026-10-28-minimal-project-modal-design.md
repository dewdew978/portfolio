# Compact Editorial Project Modal Design

## Intent

Make project details feel lighter and easier to scan. The current modal is too large, shows too much copy at once and gives the image and buttons more visual weight than the information needs.

## Selected approach

Use a compact editorial dialog, approximately 760-820px wide. Keep a neutral surface and thin rules, but reduce the title scale, use a shorter landscape cover and constrain the text measure. Show the overview, up to three concise feature points and the project impact; remove the numbered 01-04 treatment and the separate architecture block from the visible modal. Present GitHub and presentation actions as compact text links.

Mobile remains a single column with tighter type scaling and safe viewport scrolling. Desktop uses the same reading order rather than a dense two-column split.

## Alternatives considered

- A large two-column editorial sheet preserves every detail, but remains visually dense.
- A separate project detail page offers more room, but adds navigation and is unnecessary for the current amount of content.
- The selected compact dialog keeps users in context while presenting only decision-useful information.

## Constraints

Keep the close control, localized content, optional GitHub link, presentation link, dark mode, keyboard-accessible dialog semantics and viewport-bounded scrolling. Project data stays intact; the modal only changes what it presents.
