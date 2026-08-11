# WP Design System

Status: Accepted
Core reference: [Xiaomi MiMo](https://mimo.mi.com/)
Identity: `WP`

## Direction

MiMo is the core quality and visual-grammar benchmark. The portfolio translates
that direction into an original personal site through:

- a warm off-white canvas;
- substantial negative space;
- editorial serif display type with restrained sans-serif body copy;
- clear alignment with hairlines used only where structure truly needs them;
- quiet navigation and deliberate scroll rhythm;
- monochrome interaction states;
- text-led project presentation.

This is not a Xiaomi imitation. Do not copy MiMo logos, copy, proprietary fonts,
artwork, source code, or exact compositions.

## Identity

Display mark: `WP`
Public name: `WP`
Headline: `做有用的软件`
Supporting statement: none. The headline stands on its own.

Use `WP` only where authorship or navigation needs it. The header and footer are
the intended locations. Do not create letter fields, repeated monograms, or a
slash-based alternate mark.

The visible interface never prints the GitHub account handle. Repository and
profile links may contain it in `href`, but their labels use `WP`, `GitHub`, or a
project name.

Chinese owns the primary page hierarchy. The hero, navigation, section labels,
and actions are Chinese-first. Project headings use canonical English repository
names so they map directly to their GitHub URLs; the Chinese project name is a
secondary label.

## Principles

1. **Space before decoration.** Hierarchy comes from type, space, alignment, and
   quiet surface changes.
2. **One dominant statement.** Each viewport has one clear focal point.
3. **Monochrome by default.** No bright signal colors or project color themes.
4. **Text before illustration.** Project value is explained with concise copy,
   not invented mockups or decorative diagrams. The hero alone may contain one
   approved, original code-native interaction that balances the composition.
5. **Motion has a job.** Movement may clarify hierarchy or link state; otherwise
   remove it.
6. **Lines are scarce.** Do not use repeated underlines or full-width separators
   as the default way to organize content.

## Tokens

```css
:root {
  --color-paper: #f7f6f2;
  --color-paper-soft: #efede7;
  --color-ink: #11110f;
  --color-muted: #6f6d66;
  --color-line: rgb(17 17 15 / 12%);
  --color-inverse: #f7f6f2;
}
```

Do not introduce an accent token without explicit approval. Focus, active, and
hover states use ink, inverse, neutral surfaces, spacing, and weight.

## Typography

- Display: serif, regular weight, restrained tracking, short line length. The
  hero is capped at `8rem`; project titles are capped at `4rem`.
- Body: neutral sans-serif with comfortable Chinese line height.
- Metadata: compact sans-serif or monospace used only for indices and short
  English signals.
- Do not use faux outline, excessive uppercase, or several competing display
  treatments in one viewport.

## Page Rhythm

1. **Hero:** one calm viewport, sparse navigation, one Chinese serif statement,
   compact actions, and generous empty space.
2. **Projects:** the four ranked, pure-text entries begin directly. There is no
   standalone count, manifesto, or oversized project-section preamble.
3. **GitHub close:** one compact destination and minimal footer on the paper
   canvas; never a second giant black chapter.

These parts form one continuous document with normal vertical scrolling. Do not
insert separate philosophy chapters unless future content is substantial enough
to justify a distinct user destination.

## Component Behavior

### Header

- `WP` is the home anchor.
- Navigation contains only `项目` and the external GitHub destination.
- The project anchor uses a restrained dot or weight change for active state,
  not a text underline.
- The fixed surface transitions from transparent to a quiet paper veil as the
  hero leaves the reading line.

### Hero

- No decorative character field, pointer glow, gradient, raster artwork, copied
  globe, geographic map, or Xiaomi-specific visual language.
- The Chinese headline owns the largest type and stands without supporting prose.
- The title size and authored line break remain stable from 1024 through 2560 CSS
  px and at the critical 720/768 px laptop heights.
- Below the two-column content-fit threshold, the title, actions, and kinetic
  visual stack in that order. The headline remains on one line at 360 px and the
  two actions share the available row without forcing horizontal overflow.
- Actions are compact monochrome controls, never oversized display elements.
- The right side contains one original monochrome kinetic Möbius ring built with
  Canvas. Its closed surface completes exactly one half-twist: crossing the seam
  reverses the strip width, so the two apparent faces are one continuous side.
  The authored default view is a low, horizontal twin-lobed silhouette with a
  rising left-to-right center crossing, so it reads as a Möbius ring before any
  interaction. Automatic camera motion uses a roughly six-second primary yaw
  cycle and must preserve the twin-lobed reading throughout.
  Opaque depth-sorted cells make the overlap and twist legible in a still frame;
  the fine mesh remains secondary. Moving signals travel the full double circuit,
  while a traveling ink scan, pointer-driven tilt and local deformation, and
  click-propagated waves retain the responsive character. It becomes fully static
  under reduced motion.
- The ring uses the available right-column area assertively while preserving a
  clear gap from the headline at 1024 px. Its visual container may overhang the
  right grid column toward the center by 12%, but it must retain internal canvas
  clearance at rotation extremes. The authored camera pitch and its automatic
  oscillation are reduced by 20% from the initial low-angle view, producing a
  more downward-looking default without flattening the center crossing.
  Pointer entry and exit use damped spring
  motion rather than direct interpolation: camera pose, deformation strength, and
  the projected surface target settle independently. Entry builds for roughly one
  second; exit retains visible inertia and fades over roughly 1.2 seconds.

### Project Entry

- The complete entry is a real external link.
- The canonical English repository name is the heading; the Chinese name is
  secondary. Content also includes index, summary, compact proof, tags, and the
  destination.
- No decorative image, diagram, mockup, or project-specific color.
- Hover and focus may use a neutral surface shift, a small lift, and arrow
  movement. They must not add a full-width underline.

## Motion and Accessibility

- Hero content is visible independently of scroll APIs. Below-fold entries may
  start at low opacity only when `IntersectionObserver` is available, reveal once
  inside the reading area, and become fully visible when reduced motion or the
  observer is unavailable. Reveals use opacity, restrained blur, and no more than
  `3rem` of translation.
- Hero entrance motion lasts under one second and uses a restrained stagger.
- Avoid decorative infinite motion and scroll hijacking.
- Reduced-motion mode exposes all content without transforms.
- Focus uses a 2 px current-color outline with a 4 px offset.
- Text and controls meet WCAG 2.2 AA contrast.
- The supported surface is responsive from 360 through 2560 CSS px. Mobile keeps
  the full content and direct links, uses a single-column reading order, and
  respects safe-area insets without requiring touch-only behavior.
- Verify 360x800, 390x844, 430x932, 1024x768, 1280x720, 1366x768, 1440x900, and
  1920x1080 in Chrome where applicable, plus mobile WebKit at 390x844 and Edge,
  Firefox, and WebKit at 1366x768.

## Visual QA

- Does each viewport contain one calm, deliberate focal point?
- Does the hero title stay below 8rem and every project title below 4rem?
- Is `WP` used only where it helps orientation or authorship?
- Is the GitHub account handle absent from visible copy?
- Are project entries direct, text-only, and free of a redundant preamble?
- Are repeated lines and underlines absent?
- Do hover, keyboard focus, scrolling, and reduced motion preserve meaning?
- Are all required mobile and desktop sizes intentional and free of clipping or
  overflow?
