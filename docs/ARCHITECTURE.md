# Architecture

Updated 2026-09-08 for the current editorial portfolio layout.

- React, TypeScript and Vite remain the static client and GitHub Pages build.
- `src/content/site.ts` is the single source of project facts: sequence, canonical names, Chinese positioning, descriptions, characteristics, states, dated public statements and `sourceUrl`. Existing `hook` values remain in data for continuity, but are not rendered as a second repetitive treatment.
- `Hero` owns the compact introduction and reuses the code-native `HeroKinetic` visual. `SiteHeader` provides navigation links to real page sections.
- `Projects` renders all six equal projects as one semantic directory. Desktop aligns sequence, identity, positioning, description, characteristics, state and links into columns; mobile lets each row stack naturally. There are no featured tiers, screenshots or source-detail expansion states.
- TFT's experience control opens a native `dialog`. Its external document is loaded only after explicit activation and the direct new-window link remains available. Closing the dialog restores native focus; no credentials or backend are involved.
- The page ends with the project directory. Navigation contains only work and the GitHub profile link; no contact section or composer link is rendered.
- Shared design tokens live in `src/styles/tokens.css`. `useActiveSection` owns section navigation state. Project rows are always visible, with no scroll-reveal dependency; reduced motion keeps the kinetic visual still.

The portfolio remains a static client with no credentials, analytics, backend or new dependency. The external TFT document owns its computation and data; the portfolio does not claim to run a solver. Every public statement in the central data includes a date and `sourceUrl` for verification.
