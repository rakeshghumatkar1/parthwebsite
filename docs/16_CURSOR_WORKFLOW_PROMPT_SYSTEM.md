# 16 — Cursor Workflow Prompt System

## Purpose

Reusable Cursor workflows for the Parth microsite—aligned with `07` prompt types, `08` implementation rules, `09` audit, `10` production stages, and `15` validation/deploy.

---

## Core rule

**Prefer one complete phase when safe:**

```
Preflight → Implementation → Validation → Audit → Final Report
(+ Commit/Push only if explicitly requested)
```

**Before meaningful visual or structural changes**, run **Design Interpretation / Planning** first and **stop for approval** unless the prompt includes implementation in the same scoped phase with pre-approved plan.

**Do not** jump from mock image to code without docs (`10`, `07`).

---

## Workflow index

| # | Workflow | When |
|---|----------|------|
| 1 | Design Interpretation | New page, major redesign, mock attached |
| 2 | Static Page Implementation | Public UI, no CMS/DB |
| 3 | Focused UI Polish | Spacing, type, hero, cards only |
| 4 | Focused Link Wiring | Nav/footer/CTA hrefs after pages Live |
| 5 | Full DB/CMS/Admin Feature | CMS, schema, admin routes |
| 6 | Audit + Self-Correction | QA, pre-deploy, “check against mock” |

---

## 1. DESIGN INTERPRETATION WORKFLOW

### Trigger line example

`USE DESIGN INTERPRETATION + IMPLEMENTATION PLANNING WORKFLOW — [PAGE NAME]`

### Docs to read

`00`–`06` (+ `12` if page blueprint exists)

### Scope

- Interpretation and phased plan **only**  
- **No code** unless prompt explicitly combines phases  

### Steps

1. Preflight: list docs read, task classification  
2. Interpret mock/references per `06`  
3. Map content to sections; static vs CMS  
4. Image role table; empty states  
5. Phased implementation plan  
6. **STOP** — wait for approval  

### Validation

N/A (no code)

### Audit

N/A or plan review against `09` categories (positioning, layout)

### Commit/push

No

### Final report

Interpretation summary, phases, files *likely* touched later, gaps, approval request

---

## 2. STATIC PAGE IMPLEMENTATION WORKFLOW

### Trigger example

`USE THINK BIG MASTER PAGE + CMS PRODUCTION WORKFLOW — [PAGE] PHASE 1–2` or static UI-only classification

### Docs to read

`00`, `01`, `02`, `03`, `04`, `05` (home) or `12` (other pages), `06`, `08`, `09`, `15`

### Scope rules

- Listed routes/files only  
- **No** CMS package, DB, migrations, admin, fake proof cards  
- CMS-ready: hidden when empty  

### Steps

1. **Preflight** — `git status`, inspect routes, report files to touch, migration: no  
2. **Implementation** — additive, reuse components  
3. **Validation** — tsc, lint, build  
4. **Audit** — `09`  
5. **Final report** — per format below  
6. **Commit/push** — only if requested and gates pass  

---

## 3. FOCUSED UI POLISH WORKFLOW

### Docs to read

`02`, `03`, `04`, `09` (+ `05` if home)

### Scope

- Visual/spacing/typography/diagram polish only  
- No new routes, no CMS, no copy rewrites unless listed  

### Steps

Preflight → minimal diff → validation → audit (visual + responsive) → report

### Commit/push

Only if requested and validation passes

---

## 4. FOCUSED LINK WIRING WORKFLOW

### Docs to read

`11`, `12`, `08`, `09`, `14` (canonicals if domain set)

### Scope

- Header, footer, CTAs, cross-links  
- Only **Approved/Live** routes in nav  
- Approved external URLs only  

### Steps

Preflight (list every href) → wire → validation → link audit → report

### Commit/push

Only if requested

---

## 5. FULL DB / CMS / ADMIN FEATURE WORKFLOW

### Trigger example

Explicit CMS phase approval + platform choice

### Docs to read

`00`–`10`, `11`, `12`, `13`, `08`, `09`, `14`, `15`

### Preflight (required)

| Item | Action |
|------|--------|
| Task classification | CMS + DB |
| Migration required? | Report yes/no |
| Production DB safety | Stop if uncertain |
| Package install | Explicit approval |
| Schema | Append-only plan |

### Scope rules

- Content types per `13`  
- Admin UX per `13` — no raw forms  
- Public: hide empty sections; no fake seed on prod  

### Implementation

- Schema/migrations → data layer → public components → admin UI  
- Image roles on media fields  
- Server actions: async exports only if used  

### Validation

- tsc, lint, build  
- Admin create/edit/save error test  
- Public page with 0 records still clean  

### Audit

`09` full + admin usability + proof/CMS  

### Commit/push

Only if requested; never push schema without migration plan confirmed  

---

## 6. AUDIT + SELF-CORRECTION WORKFLOW

### Docs to read

`09`, plus docs from original task (`02`–`06` for visual)

### Scope

- Stated route/feature  
- Fix must-fix items if prompt says “fix and re-audit”  

### Steps

1. Run `09` checklist  
2. Result: Pass / Fail / Pass with follow-up  
3. If fixes in scope: minimal patches → re-validate → re-audit  

### Commit/push

Only if fixes requested and validation passes

---

## Universal validation block

```bash
npx tsc --noEmit
npm run lint -- --max-warnings 0
npm run build
```

Report failures per `15`.

---

## Final report format (all implementation workflows)

1. Task classification  
2. Preflight result  
3. Migration required: yes/no  
4. Production DB safety gate (if applicable)  
5. Files changed  
6. What was implemented  
7. What was intentionally not implemented  
8. CMS/public behavior (if relevant)  
9. Image/diagram behavior (if relevant)  
10. Validation results (commands + pass/fail)  
11. Audit summary (`09` result)  
12. Commit hash (if committed)  
13. Push status (if pushed)  
14. Vercel/deployment check (if pushed)  
15. Remaining risks / next phase  

---

## Prompt inventory (reference)

Detailed prompt structure lives in `07_PROMPT_RULES.md`. This doc defines **workflow order**; copy master prompts from project history or create `docs/prompts/` later.

| Prompt type | See |
|-------------|-----|
| Design Interpretation | `07` §1, this doc §1 |
| Static Page | `07` §2, this doc §2 |
| UI Polish | `07` §3, this doc §3 |
| Link Wiring | `07` §5, this doc §4 |
| CMS/Admin | `07` §4, this doc §5 |
| Audit | `07` §6, this doc §6 |

---

## Anti-patterns

| Do not | Why |
|--------|-----|
| Mock → code in one step | Skips plan and CMS rules |
| “Make it like the image” | No docs scope |
| Fragmented 10 prompts for one page | Use one phase when safe |
| Commit without validation | `15` |
| Expose nav before Approved | `11` |

---

## Gaps / decisions needed

- Checked-in prompt templates in `docs/prompts/`  
- CI workflow file referencing `15` commands  
