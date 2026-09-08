# Design system

Updated 2026-09-08. This is the current visual contract for the WP portfolio.
It replaces the former MiMo imitation, score ranking, card grid and dark closing section.

## Direction

Warm white paper, dark ink, editorial Chinese typography and restrained lime accent. Public identity is `WP`; the core line is `做有用的软件`. The hero keeps the Mobius visual as a quiet code-native signature and uses compact spacing so the project directory arrives quickly.

## Project directory

All six projects have equal status and appear in one single-column editorial directory. On desktop each row aligns its sequence number, canonical English project name, Chinese positioning and introduction, characteristics, status and links into readable columns. On narrow screens those fields stack in the same order without horizontal scrolling. Project names remain canonical English; Chinese copy supplies context.

The directory contains `tft-trait-atlas`, `comment-vision-claw`, `webArt`, `github-deep-search` (研发中), `swordshield-notes` (早期版本) and `nodestitch` (原型). It has no screenshots, source disclosure expansion or dark TFT panel. TFT keeps a small page-level experience button and a real native dialog.

## Interaction and accessibility

Use semantic headings, lists, links and buttons with visible keyboard focus. External links use real destinations and `rel="noreferrer"` when opened in a new window. Meaning does not depend on lime alone. The page follows normal vertical scrolling, has no autoplay or scroll hijacking, and honors `prefers-reduced-motion` by stopping canvas animation. Project rows are always visible.

Shared colors, typography, gutters and motion values live in `src/styles/tokens.css`; the component presenting a layout owns its responsive rules. The project directory ends the page; no separate footer or contact area is rendered.
