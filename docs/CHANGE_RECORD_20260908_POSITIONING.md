# 2026-09-08 — small-scope work, equal presentation

Category: positioning, content hierarchy and project layout.
User correction: webArt explores industrialized high-quality web design presentation. All current projects are small, specific solutions; none is designated a flagship or featured work.
Invariants: WP / 做有用的软件, six projects and real destinations, dated evidence and boundaries, TFT dialog, screenshot provenance, static app and existing Pages hosting.
Acceptance: one work collection without featured/more tiers; consistent project prominence; webArt describes a repeatable quality-oriented production process without claiming proven scale; accessible responsive layout and relevant checks.
Owners: content/site.ts removes featured ranking and owns positioning; Projects.tsx and its CSS replace the two-tier paths with a single project component; docs/tests follow the new contract.

Verification: lint, strict typecheck, 5 unit/component tests and production build passed. The 66-case browser run passed 55 cases; the keyboard test selected the now-earlier hidden dialog link after the DOM restructure. Updated it to target the visible solver link by accessible name. All 22 affected keyboard/layout and screenshot cases then passed across 11 browser projects. Desktop overview and mobile webArt capture were visually inspected; image loading, reduced motion, dialog lifecycle and external-link safety remain covered. Removed obsolete featured/compact component paths and CSS. No dependencies added. Lighthouse and additional release-only viewport checks remain unrun. Changes remain local and unpushed.
