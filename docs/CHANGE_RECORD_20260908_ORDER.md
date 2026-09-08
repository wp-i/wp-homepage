# 2026-09-08 — contact removal and ordering

Category: content organization and removal.
User authorization: remove bottom contact area and choose project priority.
Invariants: six equal projects, all project links and TFT dialog, WP identity, static app and existing host.
Acceptance: no contact section/navigation/dead anchors; source order webArt, comment-vision-claw, tft-trait-atlas, github-deep-search, swordshield-notes, nodestitch; relevant checks pass.
Owners: App/Contact removal, site data/order, active-section hook, docs and existing tests. Order prioritizes design production, content utility, live solver, then development and desktop experiments; it is editorial, not a quality ranking.

Verification: lint, typecheck, 4 unit/component tests, production build and 18 browser cases (Chrome desktop/mobile and mobile WebKit) pass. Existing tests now verify the exact project order and absence of contact section/links; TFT interaction, keyboard, responsive bounds and external links remain covered. Desktop screenshot inspected. Removed unused Contact component/styles and contact data/navigation state. No push or deployment; full release matrix and Lighthouse not rerun.
