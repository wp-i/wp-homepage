# 2026-09-08 — unified directory design

Category: visual hierarchy and responsive layout.
User intent: more polished and coherent presentation, preserving prior removal of imagery, origin disclosures, TFT dark panel and decorative slogans.
Invariants: WP / 做有用的软件, six equal projects, current facts, source/download links, accessible TFT dialog, static React/Vite, existing hosting.
Acceptance: one readable project directory with consistent title/body/action hierarchy; compact warm-paper hero/contact; no revived removed elements; desktop/mobile visual and keyboard/overflow checks.
Owners: Projects component and CSS; Hero/Contact/Header styles; shared layout tokens; supporting architecture/design docs. No new dependency or invented project claim.

Verification: lint, strict TypeScript build, 4 unit/component tests and production build pass. Initial 66-case matrix passed 63; three screenshot checks exposed that the previous intersection-triggered reveal could leave visible directory rows faded. Removed that unnecessary reveal hook and kept all rows immediately readable. All 22 affected reduced-motion and screenshot cases passed across the 11 browser projects after correction; other interaction/link/layout cases passed in the initial matrix. Additional Chrome 390×844 and 2560×1440 checks confirmed six visible rows, no horizontal overflow and no page errors. Inspected 1280 desktop, 390 mobile and 2560 wide screenshots. Lighthouse was not run. No dependencies or hosting changes; changes remain local and unpushed.
