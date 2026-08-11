# WP Portfolio — Agent Rule Gate

This file defines repository-wide, non-negotiable rules for humans and coding
agents. Read it before architecture work, dependency changes, or code edits.

## Product Contract

- This repository ships the public, single-page personal site for `wp-i`.
- The primary external destinations are the `wp-i` GitHub profile and the
  `github-deep-search`, `nodestitch`, `swordshield-notes`, and `comment-vision-claw`
  repositories. Every destination must remain a real, keyboard-accessible link.
- Xiaomi MiMo (`https://mimo.mi.com/`) is the primary visual-quality and
  interaction benchmark for this project, not a passing mood-board reference.
  Architecture and UI decisions must preserve its core direction: a warm
  off-white canvas, measured editorial typography, generous negative space,
  restrained navigation, quiet neutral surfaces, and scroll-led rhythm with
  purposeful motion.
- Benchmarking MiMo does not authorize imitation. Do not copy its logos, text,
  artwork, source code, exact compositions, or distinctive brand assets.
  Translate the direction into a restrained, original `WP` identity and verify
  that the result cannot be mistaken for a Xiaomi product.
- Keep `WP` usage sparse. Decorative repetitions, letter fields, and slash-based
  alternate marks are not allowed.
- The public interface names the author only as `WP`. The underlying GitHub URL
  may contain the account handle, but visible labels, headings, metadata, and
  footer copy must not print that handle.
- Keep the palette monochrome and warm-neutral. Bright signal colors and
  project-specific color themes are not allowed.
- Project listings are text-led. Do not add decorative project illustrations,
  invented product mockups, or image-like diagrams without explicit approval.
  The hero may use one original, monochrome, code-native interactive visual when
  it materially balances the composition; it must not resemble a branded globe
  or geographic product asset.
- Chinese owns the primary page hierarchy: the hero, navigation, section labels,
  and calls to action are Chinese-first. Project headings are the exception and
  use their canonical English repository names, with Chinese names as secondary
  context, so labels map directly to GitHub destinations.
- The hero's core statement is `做有用的软件`. Preserve that meaning and keep it
  as the page's strongest text; do not replace it with an English-led slogan.
- Navigation must correspond to substantial, distinct content. With the current
  scope, the header contains only the `项目` anchor and the external GitHub link.
  Do not create separate `关于` or `原则` sections by repeating short philosophy
  copy that the hero and project evidence already communicate.
- Keep the current content in one continuous document: hero, ranked projects,
  and compact GitHub close. Normal vertical scrolling is the only page sequence;
  do not add routes, tabs, carousels, or near-empty full-screen chapters.
- Do not precede the current project list with a standalone count, manifesto, or
  oversized section-title chapter. The ranked work is the content and should
  begin directly after the hero transition.
- The supported product is responsive from 360 through 2560 CSS px. Mobile uses
  the same content hierarchy in a deliberate single-column composition; do not
  hide core content or replace real links with touch-only controls.
- The experience must work without a backend, account, analytics, or secrets.
- Visual polish, responsive adaptation, accessibility, performance, and reduced
  motion are release requirements rather than optional cleanup.

## Required Work Sequence

Before the first implementation edit for a feature or fix:

1. Inspect the relevant files and reproduce or describe the current behavior.
2. State the change category: content, visual system, interaction, accessibility,
   performance, build/tooling, or release.
3. Record the user-visible invariant and a compact acceptance checklist.
4. Identify the smallest owning component, style layer, or configuration path.
5. Make one consolidated change at that owner and remove any superseded path.
6. Run the proportional deterministic checks and real-browser checks below.

For the initial build, create and approve `docs/ARCHITECTURE.md` and
`docs/DESIGN_SYSTEM.md` before application code is scaffolded. Architecture
decisions must name the reason, alternatives considered, and reversal cost.

## Root-Cause and Scope Gate

- Do not patch the first visible symptom. Trace layout, state, events, styles,
  assets, and build output to the earliest incorrect stage.
- Do not stack a fallback, duplicate event handler, CSS override, timeout, or
  browser-specific branch over an unresolved implementation.
- Keep one owner for each behavior. Project content belongs in typed project data;
  motion policy belongs in the motion layer; design values belong in tokens.
- If evidence changes the owning stage, stop editing, update the acceptance
  checklist, and freeze a new smallest permitted range before continuing.
- Avoid unrelated cleanup. Preserve user changes and call out overlap before
  modifying it.

## Architecture Boundaries

- Keep the production site static and deployable from generated assets.
- Use strict TypeScript. Do not introduce `any`, unchecked casts, or silent
  error swallowing in application code.
- Components render content and emit intent; they do not duplicate project data,
  breakpoint definitions, motion preferences, or design tokens.
- Store repeated project metadata in one typed source. Do not hardcode the same
  URL, label, or description in multiple components.
- Keep sections independently understandable, but do not build a generic UI
  framework for this small project list and one page.
- Add a production dependency only when platform APIs and existing dependencies
  cannot meet an explicit acceptance criterion. Record the reason in the change
  note and keep the dependency browser-only and tree-shakeable where possible.
- No runtime calls to GitHub or other providers are required for core rendering.
  Public metrics may be build-time data only and must degrade honestly when stale.
- Never commit credentials, local environment files, browser profiles, telemetry
  identifiers, or generated dependency directories.

## Visual and Interaction Rules

- Define color, type, spacing, radii, borders, easing, duration, and layout widths
  as shared tokens. Arbitrary one-off values require a documented visual reason.
- When a visual choice conflicts with the confirmed MiMo direction, prefer the
  MiMo-aligned system unless accessibility, performance, original identity, or
  an explicit user instruction requires a documented deviation.
- Prefer typography, whitespace, grid, contrast, and purposeful transitions over
  decorative gradients, excessive glass, pill-shaped containers, or ornamental
  card stacks.
- Every supported viewport has one dominant focal point. Do not allow the end of
  one oversized chapter and the start of another to compete in the same capture.
- Viewport-relative display type must have a tested upper bound. The hero may not
  exceed 8rem and project titles may not exceed 4rem without explicit visual
  approval at 1280x720, 1366x768, 1440x900, and 1920x1080.
- Hairlines are structural exceptions, not a default decoration. Do not place
  borders above and below every link, metadata block, project row, or footer.
- Use semantic HTML first. Interactive `div`/`span` elements are forbidden when
  a native link, button, heading, list, or landmark expresses the behavior.
- All interactions must work by keyboard and have visible focus states.
- External links must expose their destination and open safely with
  `rel="noreferrer"` when using a new tab.
- Motion must explain hierarchy or state. Support `prefers-reduced-motion` with a
  complete, usable low-motion path; never hide essential content behind animation.
- Use motion as progressive enhancement. The hero is always legible; below-fold
  entries may begin visually hidden only when an observer is available, must
  reveal once, and must become immediately visible when reduced motion or the
  required observer is unavailable. Scroll transitions use opacity, restrained
  blur, and translation, then settle completely.
- Do not use scroll hijacking, cursor replacement, autoplay audio, or interactions
  that require precise pointer movement.
- Avoid pointer-only instructions when the action also supports keyboard use.

## Responsive and Accessibility Release Gate

- Support 360 through 2560 CSS px without horizontal overflow, clipped focus
  rings, overlapping text, or unreadable line lengths.
- Treat 1280×720 and 1366×768 as the critical laptop cases; important content and
  navigation must remain usable at those constrained heights.
- Keep one responsive layout system. Use the two-column hero and project grid
  where space permits, then stack them without changing content order on narrow
  screens. Account for mobile safe-area insets and browser chrome backgrounds.
- Preserve a logical heading outline and landmark structure.
- Meet WCAG 2.2 AA contrast for text, controls, focus indicators, and meaningful
  graphics. Do not encode meaning by color alone.
- Decorative media must be ignored by assistive technology; informative media
  requires concise alternative text.
- Browser zoom is supported while the effective CSS viewport remains inside the
  360–2560 px range; the responsive resolution matrix is the verification surface.

## Project Selection and Ranking Gate

- `docs/PROJECT_SELECTION.md` is the normative portfolio admission and ordering
  policy. Every displayed project, including future additions, must have a dated,
  evidence-backed evaluation in the typed content source.
- Evaluate from an interviewer perspective: problem value, technical depth,
  delivery completeness, engineering quality, evidence quality, and technical
  communication. Popularity, stars, visual novelty, or personal preference must
  not override repository evidence.
- A project must score at least 60/100 and pass all mandatory eligibility checks
  before it can appear. Display order is descending total score, then engineering
  quality, then delivery completeness.
- Re-evaluate all displayed projects when a new project is proposed, when a
  displayed repository reaches a material release, or when evidence invalidates
  an existing score. Do not hand-edit visual position independently of scores.

## Performance and Asset Rules

- Prefer CSS and small vector/code-native effects over large raster/video assets.
- Optimize and license every shipped asset. Do not hotlink third-party project
  screenshots or proprietary reference-site assets.
- Avoid layout shifts: declare intrinsic media dimensions and reserve dynamic
  space.
- Defer non-critical work, respect data-saver constraints where practical, and
  never block the main content on animation initialization.
- Treat a Lighthouse regression below 90 in Performance or below 95 in
  Accessibility, Best Practices, or SEO as a release blocker unless the exact
  environment limitation is recorded with equivalent manual evidence.

## Required Project Scripts

Once the frontend is scaffolded, keep these scripts stable in `package.json`:

- `dev`: local development server.
- `build`: type-safe production build.
- `lint`: static quality and accessibility-oriented linting.
- `typecheck`: strict TypeScript validation without emitting files.
- `test`: deterministic unit and component/interaction tests.
- `test:e2e`: browser-level critical-path tests.

Do not redefine a script to skip checks while preserving its old name.

## Verification Matrix

After an implementation change, run the smallest relevant subset, and run the
full matrix before release:

1. Formatting/lint, strict typecheck, deterministic tests, and production build.
2. Chrome checks at 360×800, 390×844, 430×932, 1024×768, 1280×720,
   1366×768, 1440×900, and 1920×1080.
3. Engine compatibility checks in mobile WebKit at 390×844 and at 1366×768 in
   Edge, Firefox, and WebKit.
4. Keyboard-only navigation, visible focus order, and external-link destinations.
5. Reduced-motion mode on the responsive matrix.
6. Browser console and network review: no application errors, broken local assets,
   mixed content, or unexpected provider requests.
7. Lighthouse or equivalent audited checks for performance, accessibility, best
   practices, and SEO.

A passing command is not sufficient evidence when the rendered page is wrong.
Retain screenshots or concise browser observations for visual changes.

## Open-Source Hygiene

- Use an OSI-approved license chosen by the repository owner before the first
  public release; keep third-party attributions in `THIRD_PARTY_NOTICES.md` when
  required.
- Keep `README.md` accurate for setup, scripts, deployment, browser support, and
  the relationship to the referenced GitHub projects.
- Do not imply affiliation with Xiaomi or any referenced project dependency.
- Public copy must be supported by the linked repositories. Do not invent stars,
  release status, capabilities, employers, biography, or contact details.
- Generated files, screenshots, and reports must be clearly separated from source
  and excluded from Git unless they are intentional release artifacts.

## Completion Record

Before declaring a task complete, report:

- the user-visible result;
- the owning files changed;
- the checks actually run and their outcomes;
- any unverified browser, content, licensing, or deployment assumption.

Do not claim completion while an in-scope acceptance row is unresolved.
