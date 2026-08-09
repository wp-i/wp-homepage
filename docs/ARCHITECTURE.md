# WP Homepage Architecture

Status: Accepted
Date: 2026-08-10
Repository name: `wp-homepage`

## Context

The product is a public, static, desktop-first personal page for `WP`. It links
to one GitHub profile and four evidence-ranked repositories. Xiaomi MiMo is the
primary visual and interaction quality benchmark; the implementation must remain
original, lightweight, accessible, and straightforward to publish as open source.

## Goals

- Present the single statement `做有用的软件` with a restrained `WP` identity.
- Translate MiMo's negative space, measured editorial scale, quiet surfaces, and
  purposeful scroll rhythm without copying Xiaomi assets or compositions.
- Make the GitHub profile and four project destinations correct and usable by
  pointer and keyboard.
- Deliver one static production bundle with no backend, account, analytics, or
  credentials.
- Support desktop CSS viewports from 1024 through 2560 pixels, with 1280x720 and
  1366x768 treated as critical laptop cases.

## Non-goals

- Mobile layouts, touch-specific interactions, or handset browser QA.
- A CMS, blog, authentication, live GitHub dashboard, or runtime analytics.
- Copying MiMo markup, source code, text, brand assets, or exact compositions.
- A general component library, multi-route application, or runtime GitHub API.

## Decision 1: React + strict TypeScript + Vite

React owns the small number of semantic sections and coordinated viewport state;
strict TypeScript protects the typed project source; Vite emits static assets.

Alternatives considered:

- Plain HTML/CSS/JS would reduce runtime size, but makes shared navigation and
  progressive reveal state easier to duplicate as the portfolio evolves.
- Next.js or Astro adds routing/rendering machinery that this static page does
  not need.

Reversal cost: low. Public content remains typed data and the visual system is
plain CSS.

## Decision 2: Platform-native motion

CSS keyframes and transitions own entrance, hover, focus, and supported
scroll-linked effects. One small `IntersectionObserver` hook marks an entry as
visible and immediately disconnects. No motion framework or scroll hijacking is
used.

Motion is progressive enhancement: below-fold entries begin at 4% opacity only
when `IntersectionObserver` exists, reveal once inside the reading area, and are
fully visible without blur or transform when reduced motion or the observer is
unavailable. The hero never depends on the observer.

Reversal cost: low. A future approved interaction can replace this single hook
without layering a second motion system beside it.

## Decision 3: One typed content source

`src/content/site.ts` owns public identity copy, navigation, external URLs,
project descriptions, proof labels, technical tags, and interviewer scores.
Components never repeat claims or decide ordering.

The visible page uses only `WP`; the account handle exists only in destination
URLs. Repository claims must remain supportable by the linked public repositories.
Project headings use canonical English repository names; Chinese titles remain
secondary labels for local context.

## Decision 4: Layered CSS ownership

1. `styles/tokens.css`: palette, typography, spacing, radii, easing, duration.
2. `styles/reset.css`: box model, semantic defaults, focus, reduced motion.
3. `styles/global.css`: page shell and skip link.
4. Component CSS modules: section-specific layout and interaction.

There is no CSS-in-JS runtime. Project entries share one layout and neutral
surface system; no project-specific colors or decorative previews are allowed.

## Page structure

```text
App
|-- SkipLink
|-- SiteHeader
`-- main
    |-- Hero
    |-- Projects
    |   `-- ProjectEntry x 3
    `-- Contact
        `-- SiteFooter
```

The sections are one continuous document. The project list begins directly after
the hero; there is no separate count or manifesto chapter. The close is a compact
GitHub panel rather than a second full-screen statement.

## State and event flow

- Project content is immutable typed data.
- `useActiveSection` derives the current section from one animation-frame-
  throttled reading line and drives the quiet header surface and nav marker.
- `useScrollReveal` observes each project/contact entry once and disconnects.
- Reduced-motion policy is CSS-owned and is also checked before creating an
  observer.
- No global state library, context store, local storage, or service worker is
  required.

## File layout

```text
src/
|-- app/App.tsx
|-- components/
|   |-- contact/
|   |-- header/
|   |-- hero/ (including the code-native kinetic Möbius ring)
|   `-- projects/
|-- content/site.ts
|-- hooks/
|   |-- useActiveSection.ts
|   `-- useScrollReveal.ts
|-- styles/
|   |-- global.css
|   |-- reset.css
|   `-- tokens.css
|-- test/setup.ts
`-- main.tsx
```

## Performance budget

- Initial JavaScript target: under 150 KiB gzip.
- Initial CSS target: under 40 KiB gzip.
- No raster hero, autoplay video, remote font, or third-party render blocker.
- No content depends on motion initialization or external network data.

## Security and privacy

- No visitor data collection, cookies, forms, or analytics.
- External links use HTTPS and new-tab links include `rel="noreferrer"`.
- No runtime request depends on a GitHub token or other secret.

## Deployment

The Vite build uses relative asset paths so the same `dist/` works under a
repository subpath or a future custom domain. GitHub Actions builds and deploys
the static output; pull requests run checks but never deploy.

## Verification and acceptance

| Area | Required evidence |
| --- | --- |
| Content | Core statement is concise; visible account handle and removed preambles are absent; all five destinations are correct |
| Visual | Hero text is fully painted; one closed, single-half-twist Möbius ring uses a horizontal twin-lobed default view and remains identifiable in a still frame; hero <= 8rem; project titles <= 4rem |
| Interaction | The bounded automatic camera motion uses an approximately six-second primary yaw cycle; pointer tilt follows the projected twin-lobed centerline; camera pose, interaction strength, and surface target use independent damped springs on entry and exit; local deformation, click waves, signal flow, entrance, scroll reveal, nav state, focus, and reduced motion preserve meaning |
| Accessibility | Semantic headings, skip link, keyboard flow, visible focus, AA contrast, and safe external links pass |
| Desktop adaptation | Chrome passes at 1024x768, 1280x720, 1366x768, 1440x900, and 1920x1080 without overflow or overlap |
| Browser compatibility | Edge, Firefox, and WebKit pass at 1366x768 |
| Quality | Lint, strict typecheck, deterministic tests, E2E tests, and production build pass |

## Initial implementation range

Allowed: root build configuration, `src/`, `public/`, tests, open-source metadata,
and GitHub workflow files required by this document.

Denied: backend services, analytics, CMS, runtime GitHub API calls, routing, a
global state library, a motion framework, and copied reference assets.
