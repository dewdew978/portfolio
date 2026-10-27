# Pixel Orb Mascot Design

## Intent

Create a distinctive floating pixel-art orb mascot for Pawarit's portfolio. It should reinforce the purple–blue visual identity without competing with the portfolio content.

## Experience

- Navbar: a compact Pixel Orb appears beside the `Pawarit` wordmark with a subtle idle float and blink.
- Hero: a larger decorative Pixel Orb floats beside the profile image, blinks, gently tracks the pointer, and emits a few pixel particles.
- Mobile: the hero mascot is smaller and particles are reduced so the layout remains clear.
- Reduced motion: movement, blinking, pointer tracking, and particles stop while the mascot remains visible.
- Light and dark themes: outlines, highlights, and shadows retain sufficient contrast.

## Implementation

Build one reusable React component using semantic SVG shapes and CSS animations. Provide `size`, `interactive`, and `className` props. The SVG is decorative and hidden from assistive technology. No animation dependency or raster asset is added.

## Non-goals

- Do not replace the profile photo.
- Do not add sound, click interactions, navigation, or a character customization system.
- Do not commit or push unless requested separately.

