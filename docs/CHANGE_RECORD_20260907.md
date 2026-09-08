# 2026-09-07 portfolio redesign

Category: content, visual system, interaction, accessibility.

The owner explicitly superseded the old text-only, MiMo-bound and score-ranked
rules. Goal: show distinctive small tools and invite further conversation.

Observed: equal text cards hide different use cases; all links lead to source;
August ratings are stale; public TFT is missing; webArt returns 404 in the
available signed-out browser and cannot be described or linked as verified.

Invariants: WP, Chinese hierarchy, honest claims, real keyboard-accessible links,
static React/Vite and existing GitHub Pages delivery.

Acceptance: TFT is playable through its real link; curated work exposes insight,
scope and evidence date; native details reveal depth; archived work stays
reachable; no invented screenshots, contacts, metrics or webArt capabilities;
responsive, keyboard, reduced-motion and relevant checks pass.

Owners: content/site.ts owns all facts and order; hero, projects and contact own
their presentation; tokens own theme values. Dependencies are unchanged.

## Verification completed 2026-09-08

- Lint, strict typecheck, 5 unit/component tests and production build pass.
- The full 66-case browser matrix initially passed 64 cases. Two WebKit focus
  restoration cases exposed that pointer activation had not focused the opener.
  Focusing the initiating button before native showModal fixed the cause across
  engines. The 22 affected dialog/screenshot cases then passed; unchanged cases
  retain their successful full-matrix result.
- Chrome laptop/desktop and mobile sizes, Edge, Firefox and desktop/mobile WebKit
  cover content, external links, disclosures, skip link, bounded layout, reduced
  motion, canvas stillness, dialog lifecycle and console errors.
- Desktop and mobile screenshots were inspected. Screenshot capture now waits
  for reveal completion. Review images stay ignored under `artifacts/`.
- The iframe test uses a controlled response to verify this site's lifecycle,
  not remote solver correctness. The direct external TFT link remains available.
- Lighthouse, the 2560px extreme and live external solver correctness have not
  been audited in this pass. webArt remains inaccessible in the available
  signed-out browser and has not been invented or added.

No dependencies were added. This change is local and has not been committed,
pushed, publicly deployed or migrated away from GitHub Pages.
