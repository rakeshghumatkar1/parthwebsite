# 08 — Implementation Rules

## Purpose

Technical and process rules for implementing the Parth microsite in Cursor—scoped changes, proof integrity, CMS safety, and alignment with Batch 1 design docs.

---

## General rules

| Rule | Detail |
|------|--------|
| Scoped changes only | Edit files required for the task; list them in preflight |
| Inspect before editing | Read existing route, layout, components, `globals.css`, `package.json` |
| No broad rewrites | Prefer additive, localized diffs |
| No unrelated cleanup | Do not reformat or refactor untouched modules |
| Reuse components | `Section`, `SectionHeader`, `Button`, `FeatureCard`, layout, home sections |
| Live text | All visible copy in HTML/React—not baked into images |
| Align with docs | `02`–`06` for visual/layout; `05` for home structure |

---

## Positioning and content rules

**Do not introduce:**

- Digital marketing / SEO / lead-gen as primary message
- Old “Parth Ghumatkar – A Prodigy of Sorts” content
- Fake testimonials, client logos, ratings, or metrics
- Fake GitHub, YouTube, or download URLs
- Hard-coded mock project names (Noctis, Nonprofit Platform, TradePre, etc.)
- Banned visible copy: **practical**, genius, prodigy, world-class, top 1%, industry-leading, revolutionary, game-changing, can build anything, AI magic
- MIT/Stanford comparisons or emotional family praise

**Do introduce new claims only when:**

- Provided in approved page content or CMS records, and
- Scoped in the prompt

---

## Visual / asset implementation rules

- **No mock-image shortcuts** — do not embed, slice, or background full-page mocks
- **No screenshots as production UI** — build real components
- **Diagrams** — SVG/HTML (`WorkflowDiagram`, `SoftwareFirstDiagram` pattern)
- **Image roles** — follow `06`; do not use one `object-fit` for all placements
- **Think Big references** — palette and rhythm only, not main-site service copy

---

## Navigation and routes

- **Do not expose unfinished pages** in header/footer as if live (no `/projects` in nav until page exists unless using `#` anchors clearly)
- **In-page anchors** acceptable for MVP (`#contact`, `#what-we-build`)
- **External links** only when URL is approved in prompt, env, or CMS
- Adding a route requires matching blueprint (Batch 3 `12`) when available

---

## Stack conventions (confirmed)

| Area | Current choice |
|------|----------------|
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Fonts | Geist Sans / Geist Mono (swap only with approval) |
| Deploy | Vercel + GitHub (`parthwebsite` repo) |

Match existing patterns in `src/app/`, `src/components/`, `src/lib/`.

---

## Package rules

- **No random installs** — especially CMS (Payload, Sanity), icon packs, animation libraries
- Add a package only if:
  - Prompt explicitly approves, and
  - Existing tools cannot solve the task, and
  - Compatible with Vercel/Next runtime, and
  - Reason reported in final summary
- If `package.json` changes, report **why** and **what** in the task report

---

## Database / CMS / admin (future phases)

**Default for public UI tasks:** No DB, no CMS package, no migrations, no admin routes, no auth.

**When CMS/admin is explicitly scoped:**

| Requirement | Rule |
|-------------|------|
| Preflight | `git status`, schema files, env, production DB safety |
| Migrations | Append-only; no dropping core tables; stop if prod DB uncertain |
| Repeatable content | Projects, videos, proof, updates via CMS—not hard-coded long-term |
| Public empty state | Hide section or render nothing—no fake cards, no “coming soon” clutter |
| Admin forms | Preserve field values on validation/server errors; clear errors |
| Media | Role-specific: 16:9 video thumb, readable proof docs, project cover focal point |
| Seed data | No fake production records |

---

## Server and API safety

- Avoid `"use server"` unless required; files with `"use server"` must export **only async functions**
- No server actions in static UI-only phases unless prompt requires
- Image domains: update `next.config.ts` only when needed; report change

---

## Git / commit / deploy

- **Do not commit or push** unless the user or prompt explicitly requests
- Before commit: `npx tsc --noEmit`, `npm run lint`, `npm run build` (or project-equivalent)
- Commit only scoped files; no secrets (`.env`, keys)
- **Do not deploy** unless explicitly requested
- Follow user git safety rules (no force push to main, no amend unless conditions met)

---

## Home page implementation (Phase 1–2 baseline)

**Confirmed implemented pattern:**

- CMS types in `src/types/cms.ts`
- Empty arrays in `src/lib/home-data.ts`
- `FeaturedProjectsSection`, `ProofLibrarySection`, `LatestUpdatesSection` return `null` when empty
- Static sections per `05_HOMEPAGE_BLUEPRINT.md`

**Future home changes must:**

- Keep hidden-empty behavior until CMS wired
- Not add fake project cards for visual fullness

---

## File touch discipline

Before major work, report likely paths:

- `src/app/page.tsx`, `layout.tsx`, `globals.css`
- `src/components/**`
- `src/lib/**`, `src/types/**`
- `next.config.ts` (only if needed)
- **Do not touch** without scope: unrelated routes, DB, admin, deployment config

---

## Validation (required before commit when commit requested)

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Report exact command output if any step fails. Do not skip.

---

## Recommendations

- Add `focus-visible` styles in a dedicated polish pass (`04` gap)
- Introduce `docs/prompts/` copies of master prompts when workflow stabilizes

---

## Gaps / decisions needed

- CMS platform (Payload vs Sanity) — implementation rules extend in `13`
- Admin auth mechanism
- Environment variables for approved external URLs
