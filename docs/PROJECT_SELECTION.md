# Portfolio Project Selection Standard

Status: Required
Review perspective: Technical interviewer
Current evidence review: 2026-08-10

## Purpose

The portfolio is an edited technical argument, not a chronological project list.
Every displayed repository must show credible problem solving and provide enough
public evidence for an interviewer to examine the work. The same standard applies
to the current four projects and every future candidate.

## Mandatory Eligibility

A candidate must satisfy all of the following before scoring:

1. The repository is public and has a real, stable GitHub destination.
2. Its primary problem, users, constraints, and output can be stated honestly.
3. The repository contains runnable source rather than only a concept, prompt,
   screenshot, generated report, or README.
4. Setup, dependencies, limitations, and license are documented well enough for
   an external reviewer to understand the boundary.
5. No claim shown on the portfolio depends on private evidence or invented data.
6. The project has no unresolved credential, privacy, licensing, or attribution
   issue that would make public promotion misleading.

Failure on any mandatory item blocks publication regardless of score.

## Interview Score — 100 Points

| Dimension | Points | Interviewer question |
| --- | ---: | --- |
| Problem value | 20 | Is the problem real, specific, and worth solving? Does the solution show product judgment? |
| Technical depth | 20 | Does the work contain meaningful architecture, state, integration, data, platform, reliability, or algorithmic difficulty? |
| Delivery completeness | 20 | Can a reviewer run or inspect a coherent end-to-end result? Are install, failure, and release paths addressed? |
| Engineering quality | 20 | Are boundaries, types, tests, CI, error handling, security, and maintainability credible? |
| Evidence quality | 10 | Are claims supported by source, tests, real runs, releases, traces, or documented limitations? |
| Technical communication | 10 | Can a reviewer quickly understand decisions, trade-offs, setup, scope, and remaining risk? |

Scorers must cite repository evidence and record the review date. Stars, topic
fashion, visual polish, and repository size are context only; they are not score
dimensions.

## Publication and Ordering Rules

- Publication threshold: at least 60/100 after all mandatory checks pass.
- Primary order: descending total score.
- First tie-break: engineering quality.
- Second tie-break: delivery completeness.
- Final tie-break: the more recently re-evaluated project.
- The UI number is assigned after sorting; a project does not own a permanent
  visual position.
- A new project triggers re-evaluation of every displayed project, not just the
  candidate.
- A material release, architecture rewrite, new test/release system, or serious
  regression also triggers re-evaluation.

Scores live beside project content in `src/content/site.ts`. The page derives its
order from those scores; visual placement must never be edited independently.

## Current Evaluation

| Rank | Project | Problem | Depth | Delivery | Engineering | Evidence | Communication | Total |
| ---: | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | GitHub Deep Search | 18 | 20 | 18 | 20 | 10 | 10 | **96** |
| 2 | Nodestitch | 16 | 18 | 19 | 20 | 10 | 10 | **93** |
| 3 | SwordShield Notes | 15 | 16 | 18 | 16 | 8 | 9 | **82** |
| 4 | Comment Vision Claw | 17 | 17 | 12 | 7 | 5 | 8 | **66** |

### 1. GitHub Deep Search

Strongest interview signal. The repository shows a coherent parse → discovery →
evidence → analysis → report pipeline; explicit ownership boundaries; evidence
gating; structured failures and traces; CLI, Web, Docker, and MCP projections;
ADRs; real-run evaluation artifacts; CI; and broad automated coverage. Its main
risk is provider-dependent real execution, which the repository documents rather
than hiding. Re-evaluated on 2026-08-10; score unchanged.

### 2. Nodestitch

Strongest desktop engineering signal. Commit `7b0efa0` contains a coherent Tauri
2, React, TypeScript, Rust, and SQLite implementation with separate domain,
application, persistence, desktop, and presentation owners. `TimelineController`
publishes state only after persistence succeeds and serializes mutations against
the last committed document. Rust uses immediate SQLite transactions and tests
migration, invalid data, corrupt payloads, and failed writes preserving the last
commit. Windows CI runs frontend tests/build plus Rust tests and Clippy. On
2026-08-10, the local audit passed 13 frontend tests, 4 Rust tests, and the
production build. The handoff records real Windows 10 scaling, resize, cold-start,
installer, shortcut, upgrade, and uninstall checks. The remaining delivery gap is
the intentionally unclaimed Windows 11/ARM64 and clean-machine coverage.

### 3. SwordShield Notes

Strong shipped-product signal. It crosses React/TypeScript, Rust, SQLite, native
Windows window behavior, drag-and-drop state, installer hooks, and release
packaging. The repository has Windows CI, release automation, a `v0.1.0` tag,
explicit Windows 10/11 compatibility notes, and focused tests. Its scope is
smaller and its automated evidence is thinner than the two projects above, but
the end-to-end desktop delivery remains credible. Re-evaluated on 2026-08-10;
score unchanged.

### 4. Comment Vision Claw

Strong problem and integration idea: browser automation, MediaCrawler, precise
comment screenshots, optional LLM analysis, PDF generation, Web UI, CLI, and MCP.
However, the repository still lacks automated test files, a CI workflow, and a
release tag, and it retains a heavier external/login-dependent run path. These
gaps reduce delivery, engineering, and evidence scores despite meaningful
technical breadth. Re-evaluated on 2026-08-10; score unchanged.

## Adding a Future Project

1. Audit the repository at its current default branch and record the commit/date.
2. Verify every mandatory eligibility item.
3. Score all six dimensions with file-, test-, release-, or run-level evidence.
4. Add the dated evaluation to the typed content source.
5. Re-score existing projects using the same evidence standard.
6. Run unit tests that verify the derived order and publication threshold.
7. Update this document's table and evidence notes in the same change.
