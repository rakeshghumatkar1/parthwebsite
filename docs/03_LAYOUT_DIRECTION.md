# 03 — Layout Direction

## Purpose

Define page layout structure, section order, hero composition, grid behavior, spacing flow, CTA placement, and responsive behavior for the Parth microsite—primarily the **home page** (`/`).

---

## Core layout principle

Every section must earn its place: **clarity → credibility → capability → proof → process → action**.

Communicate:

- What Parth builds (software systems for workflows)
- Why trust him (visible proof, self-built track record)
- How engagement works (process + Think Big delivery layer)
- What to do next (Discuss a Software Use Case)

Avoid decorative sections with no narrative or proof function.

---

## Global layout

| Property | Direction |
|----------|-----------|
| Max content width | `~1152–1280px` (`max-w-6xl` / similar) |
| Horizontal padding | `px-6` mobile, `px-8` sm+ |
| Section vertical padding | `py-16`–`py-24` by breakpoint |
| Header | Sticky, dark navy, logo left, nav center (desktop), primary CTA right |
| Footer | Dark navy, multi-column links, copyright |

---

## Home page structure (approved order)

| # | Section | Background rhythm | Content type |
|---|---------|-------------------|--------------|
| 1 | Header | Dark | Static |
| 2 | Hero | Dark | Static + SVG workflow diagram |
| 3 | Proof Before Claims | Light | Static narrative + proof signals list |
| 4 | What We Build | Muted light | Static 6-card grid |
| 5 | Featured Project Evidence | **Dark** | **CMS** — hidden if no featured projects |
| 6 | Technical Founder Layer | Light | Static |
| 7 | How the Work Happens | Muted light | Static 5-step process |
| 8 | Proof Library Preview | Muted/light | **CMS** — hidden if no featured proof |
| 9 | Software First / AI Workflow | Light | Static + flow diagram |
| 10 | Latest Updates / Build Notes | Light | **CMS** — **hidden at launch** |
| 11 | Final CTA | Dark | Static |
| 12 | Footer | Dark | Static |

**Note:** Mock shows optional “Self-Led From The Start” timeline band; approved pasted content folds journey into **Proof Before Claims** + **Technical Founder Layer**. Do not add a duplicate timeline unless content is approved.

---

## Hero direction

**Layout:** Two columns desktop — copy left (~55–60%), diagram right (~40–45%).

**Must include**

- Eyebrow: `AI Software Systems`
- H1: `AI Software Systems Built Around Business Workflows`
- Supporting paragraphs (Think Big vertical, Parth founder line)
- Primary CTA: Discuss a Software Use Case → `#contact`
- Secondary CTA: View Current Projects → `#what-we-build` until Projects route exists

**Visual**

- Live **WorkflowDiagram** component (not mock image)
- Main flow: business problem → workflow → software → AI/data/automation → usable product
- Satellite nodes: AI tools, pipelines, automation, internal systems, dashboards, content engines

**Do not include in hero until approved**

- Fake “Explore GitHub” external URL
- Mock project names or dashboard screenshots

---

## Proof Before Claims direction

- Split layout: narrative left, **key proof signals** checklist right (bordered panel)
- CTA: Review Proof Library → in-page anchor or future `/proof` route
- No fake repository cards in this phase

---

## What We Build direction

- Section intro (H2 + optional subline)
- **6 cards** in grid: 1 col mobile, 2 tablet, 3 desktop
- Icon-led feature cards; equal height preferred
- Categories from approved copy (Internal Tools through Content and Media Automation)

---

## Featured Project Evidence direction

- **Dark band** when CMS has ≥1 featured published project
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Card: title, short description, tech stack tags, links (GitHub/demo/video) from CMS only
- **Public empty state:** entire section **not rendered** (no placeholder cards, no “coming soon”)
- Intro copy may appear only when cards exist (recommended)

---

## Technical Founder Layer direction

- H2 + journey narrative (electronics → software systems)
- “Kept building” emphasis—not prodigy framing
- Credibility points in 2-column checklist grid
- CTA: Read About Parth → future `/about-parth` or in-page anchor until page exists

---

## How the Work Happens direction

- 5 numbered steps (01–05) in horizontal row desktop; stack or 2-col tablet; 1-col mobile
- Step 05 mentions Think Big review/QA/delivery
- CTA: Discuss a Software Use Case

---

## Proof Library Preview direction

- Same empty rule as projects: **hidden** if no featured proof items
- When live: grid of proof cards (type, title, short description, link/file)

---

## Software First section direction

- Two columns: copy left, **SoftwareFirstDiagram** right (or below on mobile)
- Message: AI supports the system; foundation is software structure, data, security, deployment
- Avoid “AI as slogan” framing

---

## Final CTA + footer direction

- Centered or near-centered headline: Have a Software or AI Workflow Idea?
- Supporting copy + Think Big oversight note
- Button group: primary + secondary (no fake external links)
- Footer: Systems / Proof / Company link groups; in-page anchors until routes exist

---

## Responsive behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Single column; hero diagram below copy; full-width CTAs; no horizontal scroll |
| Tablet | 2-col grids where appropriate; process may be 2-col |
| Desktop | Full grids; hero side-by-side; nav visible |

**Rules**

- Diagram text must remain readable; simplify or wrap nodes on small screens
- No image/diagram overlap with text
- Sticky header must not obscure anchored section targets (`scroll-mt` on sections)

---

## Proof / no-fake-data rule

- No hard-coded project names from mock (Noctis, TradePre, etc.)
- No fake GitHub, YouTube, or download URLs
- No fake metrics, testimonials, or client logos
- CMS-driven sections return `null` when data arrays are empty

---

## Current implementation note

Phase 1–2 build implements static sections 1–4, 6–7, 9, 11–12 and **hides** CMS sections 5, 8, 10. See codebase `src/lib/home-data.ts` empty arrays and conditional section components.

---

## Gaps / decisions needed

- Whether to show narrative-only Featured Projects intro without cards (currently: **no**)
- Mobile nav drawer for full mock nav list (Systems, GitHub, Videos, etc.)
- Exact anchor vs route strategy for secondary CTAs
