# 2026-09-08 — presentation cleanup

Category: presentation and copy removal. User requests removing project-origin disclosures, webArt screenshot, TFT dark panel and decorative guidance copy.
Invariants: six equal projects, real links, project facts retained in centralized data, WP identity, static app and existing hosting. TFT remains accessible through a plain inline experience button.
Acceptance: no project disclosures/images/workflow panels; no requested ornamental copy; consistent paper background; functional dialog and responsive keyboard-accessible links.
Owners: Projects/Hero/Contact presentation and CSS; content image/flow fields and unused screenshot removed; evidence stays in content data and docs.

Verification: lint, strict typecheck, 4 remaining unit/component tests and production build passed. All 24 browser cases passed in desktop Chrome, mobile Chrome 360×800, desktop WebKit and mobile WebKit 390×844; checks include equal project presence, absence of disclosures/images, keyboard focus, bounded layout, external-link safety, reduced motion, console errors and TFT dialog lifecycle. Desktop overview and mobile card screenshots were inspected. No dependency added; unused screenshot removed. This is local only, with no push/deployment; the full release matrix and Lighthouse were not rerun.
