# 2026-09-08 — webArt addition

Category: verified project content, project presentation, repository visibility.
User authorization: make wp-i/webArt public, inspect/clone it, add it to WP portfolio.
Invariants: WP identity, Chinese hierarchy, existing projects and GitHub Pages, static app.
Acceptance: anonymous repository access; accurate capabilities and limitations; genuine local-render screenshot; source/download links; responsive image, accessible links and relevant checks.
Owners: src/content/site.ts for facts/order; Projects.tsx for featured selection; public/images for captured evidence; docs for provenance.

Repository: wp-i/webArt was private; GitHub API confirmed admin permission. Updated only this repository to public and verified anonymous API returned 200/private:false. Browser automation failed before initialization; existing Git authentication was used instead. Cloned to D:\code\webArt at d4f4819b87f3788d6f75633c7b6be8211c6302fc.

Implementation: third featured project with genuine The Weight of Light screenshot (1440×1080 JPEG, 187,511 bytes), two source ZIP links, insight and explicit static-template boundaries. Removed the hidden two-feature cap. Updated hero, metadata, README/attribution, selection policy and tests. No portfolio dependencies added.

Verification: lint, strict typecheck, 5 unit/component tests, production build and all 66 existing E2E cases passed across 11 browser projects (Chrome/Edge/Firefox/WebKit, desktop/mobile). The image loaded successfully in each browser project. Desktop and mobile project captures were inspected. The WebArt root template ran locally with no page errors or broken images. Both source ZIP URLs returned anonymous HTTP 200. No claim is made that the second template was run or that either template has a public live preview.

Limits: this pass did not run Lighthouse, Chrome 390×844 or the 2560px extreme. The existing full release matrix remains a pre-release requirement. WP portfolio changes are local, uncommitted and unpushed; only webArt repository visibility was changed remotely. GitHub Pages hosting configuration was not changed.
