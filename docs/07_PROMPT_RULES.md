# 07 — Prompt Rules

## Purpose

Define how Cursor should be prompted for the **Parth / Think Big AI Software Systems** microsite so work stays aligned with project docs—not loose chat memory or mock images alone.

---

## Core principle: docs first, Cursor second

1. **Project docs** (`docs/00`–`10`, later `11`–`16`) are the source of truth for Parth website work.
2. **Chat instructions** apply only when they do not conflict with docs—or the prompt must explicitly resolve the conflict.
3. Cursor must **read relevant docs before meaningful implementation**, not only skim the latest message.
4. Cursor must **not rely only on loose chat instructions** for positioning, layout, proof rules, or CMS behavior.

---

## Required doc reading by task type

| Task type | Read first |
|-----------|------------|
| **Any major work** | `00`, `01` |
| **Design interpretation / planning** | `00`–`06` (full Batch 1) |
| **Home page implementation or polish** | `02`, `03`, `04`, `05`, `06` (+ `01` for positioning) |
| **Visual correction / “doesn’t match mock”** | `02`, `03`, `04`, `05`, `06`, `09` |
| **Implementation (any page)** | `08`, plus page blueprint when it exists (`12` in Batch 3) |
| **CMS / admin feature** | `08`, `13`; explicit scope + preflight |
| **Audit / self-correction** | `09`, plus docs used for the original task |
| **Production workflow / phase planning** | `10`, `00` |

Cursor must **report which docs were read** at the start of implementation or audit tasks.

---

## Conflict handling

If **docs and prompt conflict**:

1. **Stop** before coding.
2. **Report** the conflict (doc name vs instruction).
3. Proceed only if the **current prompt explicitly resolves** it.
4. Recommend updating the relevant doc after the task.

---

## Visual and reference rules (every prompt)

| Rule | Detail |
|------|--------|
| Full-page mock images | **Reference only** — layout, rhythm, hierarchy, card patterns |
| Think Big screenshots | **Design continuity only** — not Parth copy or marketing positioning |
| Current live homepage | **Current-state only** — not source of truth if it conflicts with mock + docs |
| Production assets | **Approved uploads** in `public/` or CMS — different from mocks |
| Screenshots | **Never** use as production UI |
| Text in images | **Never** bake headings, CTAs, or proof into PNG/SVG assets |
| Fake proof | **Never** add fake projects, videos, GitHub links, downloads, metrics, testimonials |

---

## Scope and safety rules (every implementation prompt)

- **Scoped changes only** — list files/routes in scope.
- **Report files likely touched** before major edits.
- **Do not redesign unrelated pages** or global architecture without approval.
- **Do not install packages** unless the prompt explicitly approves and `08` package rules are met.
- **Do not commit/push/deploy** unless the prompt explicitly requests it.
- **Classify the task** (e.g. static UI-only vs CMS vs DB) and state whether migration is required.

---

## Standard prompt structure

Every **implementation** prompt should include, where applicable:

1. **Workflow trigger** (e.g. “USE THINK BIG MASTER PAGE + CMS PRODUCTION WORKFLOW” or “Static public page / UI-only”)
2. **Objective** — what done looks like
3. **Current state** — what exists in repo
4. **Scope** — routes, files allowed
5. **Do not** — explicit exclusions
6. **Preflight** — git status, inspect routes, dependencies
7. **Docs to read** — list from table above
8. **Implementation rules** — pointer to `08`
9. **Validation** — `tsc`, `lint`, `build`
10. **Audit** — pointer to `09`
11. **Commit/push rule** — only if approved
12. **Final report** — structured summary

**Do not ask Cursor to** “make it modern,” “make it pop,” or “make it like the image” without docs, scope, and asset rules.

---

## Prompt types

### 1. Design Interpretation / Planning Prompt

**When:** New page, major redesign, or mock/reference attached.

**Must:**

- Require reading `00`–`06`
- **Stop after plan** — no code until approval (unless prompt says otherwise)
- Classify sections: static vs CMS, image roles, empty states
- Use pasted **content as copy source of truth**, not mock text
- Output: interpretation, component plan, phased implementation plan

**Must not:**

- Jump straight to coding
- Hard-code mock project names
- Treat mock as production UI

---

### 2. Static Page Implementation Prompt

**When:** Public UI only (e.g. Phase 1–2 home shell).

**Must:**

- Read `02`–`06`, `05` for home, `08`
- State **no CMS, no DB, no migrations** if applicable
- CMS-ready components with **hidden** empty sections
- Live HTML/UI text only
- Validation + audit before commit (if commit requested)

**Example scope:** `/` home sections per `05_HOMEPAGE_BLUEPRINT.md`

---

### 3. Focused UI Polish Prompt

**When:** Spacing, typography, hero, cards, diagrams—no new features.

**Must:**

- Read `02`, `03`, `04`, `09`
- Minimal diff; no copy rewrites unless listed
- No package installs for polish alone
- Before/after audit against design system

---

### 4. CMS / Admin Feature Prompt

**When:** Projects, proof, videos, updates, admin UI (future phases).

**Must:**

- Explicit approval to install CMS package and touch DB
- Preflight: schema, migration safety, production DB gate
- Read `08` CMS rules + `13` when available
- Admin UX: grouped fields, save error preservation, no raw developer forms
- Public empty sections hidden; no fake seed data on production

**Must not:**

- Install Payload/Sanity without approval
- Hard-code repeatable cards long-term

---

### 5. Link / Navigation Wiring Prompt

**When:** Header, footer, CTAs point to real routes.

**Must:**

- Read `11` when available; until then `05` + `01`
- **No broken links** — use in-page anchors or hide nav items until pages exist
- No fake `github.com/...` URLs
- Report every href changed

---

### 6. Audit + Self-Correction Prompt

**When:** QA pass, “check against mock,” pre-deploy review.

**Must:**

- Read `09` and apply every relevant category
- Compare to `02`–`06`, not Think Big marketing pages
- Output: **Pass / Fail / Pass with follow-up** per `09`
- List fixes; separate must-fix vs follow-up

---

## Parth-specific prompt content

**Always preserve:**

- AI software systems / workflow positioning (`01`)
- Software first. AI where it improves the workflow. Proof before claims.
- Think Big visual DNA (`02`–`04`)
- Primary CTA: **Discuss a Software Use Case**

**Never prompt for:**

- Digital marketing / SEO agency homepage
- Fake project grid (Noctis, TradePre, etc. from mock)
- Prodigy article tone or banned words (see `01`, `02`)
- “Explore GitHub” without approved URL

---

## Assumptions

- Prompts may be written by project owner or generated from ChatGPT using universal template + Batch 1 docs.
- Batch 3 docs (`11`–`16`) cover navigation, page blueprints, CMS/admin, SEO/OG, deployment, and Cursor workflows.

---

## Gaps / decisions needed

- Standard prompt filenames or templates in repo (optional `docs/prompts/` folder — not created yet)
- Whether Design Interpretation always requires explicit “STOP and wait for approval” line (recommended: yes)
