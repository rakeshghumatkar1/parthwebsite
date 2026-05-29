# 10 — Website Production Workflow

## Purpose

End-to-end workflow for building and updating the **Parth / Think Big AI Software Systems** microsite—from positioning through docs, design interpretation, implementation, validation, audit, and optional deploy.

---

## Workflow overview

```
Positioning & content
    → Visual references collected
    → Mock / direction approved
    → Docs updated (Batch 1+)
    → Design interpretation (Prompt 1) — STOP for approval
    → Implementation (Prompt 2+) — phased
    → Validation
    → Audit (09)
    → Human review
    → Commit / push / deploy (only if requested)
    → Learnings saved back into docs
```

**Do not skip:** project brief alignment, visual identity, design system, asset rules (`06`), validation, audit.

---

## Stage 1 — Project positioning and content direction

**Outputs**

- Confirmed positioning: AI software systems, software-first, proof before claims
- Audience and goals (`01_PROJECT_BRIEF.md`)
- Approved page copy (paste into prompts—not mock text)
- Non-goals and banned tone list

**Rules**

- Not a digital marketing microsite
- Not prodigy/student/family narrative

**Doc touch:** Update `01` when positioning shifts.

---

## Stage 2 — Visual reference collection

**Collect**

- Parth approved homepage mock (direction)
- Think Big main-site screenshots (continuity only)
- Current implementation screenshot (gap analysis only)
- Approved production logo/OG when available

**Label each asset** in chat or `06`: reference vs production.

---

## Stage 3 — Mock image / design direction approval

**Owner approves**

- Section order and dark/light rhythm
- Hero composition (copy left, diagram right)
- Card and CTA style
- What is **not** approved (pixel copy, mock project names, baked text)

**Do not proceed to Cursor implementation** until direction is explicit.

---

## Stage 4 — Docs update before Cursor implementation

**Minimum before build**

| Batch | Docs |
|-------|------|
| Core brain | `00`–`06` |
| Workflow control | `07`–`10` |
| Pages/CMS (when needed) | `11`–`16` (Batch 3) |

Update `05` for home; add page blueprint in `12` when new routes are scoped.

**Rule:** Docs first, Cursor second (`07`).

---

## Stage 5 — Design interpretation / planning

**Prompt type:** Design Interpretation / Planning (`07`)

**Cursor must**

- Read `00`–`06`
- Produce interpretation + phased plan only
- **STOP and wait for approval** before coding

**Do not**

- Jump from mock image directly to implementation
- Ask Cursor to “make it like the image” without docs
- Hard-code mock projects or proof

---

## Stage 6 — Implementation phase

**Prompt type:** Static Page, CMS/Admin, Link Wiring, or UI Polish (`07`)

**Rules**

- Follow `08_IMPLEMENTATION_RULES.md`
- **Phase by phase** for major pages (e.g. home shell → CMS sections → admin)
- Report files touched in preflight
- Classify task: static UI-only vs CMS vs DB

**Home page note**

- Phase 1–2 home **already implemented** on `/`
- Replacing or rebuilding home requires: revised content, mock direction, updated docs, **Prompt 1 approval**, then **Prompt 2**—not ad-hoc “redo hero” requests

**Current codebase baseline (confirmed)**

- Think Big tokens in `globals.css`
- Components under `src/components/`
- Empty CMS arrays; hidden featured/proof/updates sections

---

## Stage 7 — Validation

Run before audit and before commit:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Fix failures before audit sign-off. No DB validation for static-only phases.

---

## Stage 8 — Audit

**Prompt type:** Audit + Self-Correction (`07`)

Apply `09_AUDIT_CHECKLIST.md` for scoped work.

Minimum categories for home/public work:

- Positioning, visual identity, layout, design system
- Mock/reference, content, proof/CMS-readiness
- Responsive, accessibility, technical
- Links/navigation (if touched)

Record **Pass / Fail / Pass with follow-up**.

---

## Stage 9 — Review

**Human review checks**

- Does it feel like AI software systems—not marketing?
- Is proof honest (no fake cards)?
- Are CTAs and next steps clear?
- Mobile check on real device or narrow viewport

Approve, request fixes, or scope follow-up phase.

---

## Stage 10 — Commit / push (only if approved)

**Only when**

- User or prompt explicitly requests commit/push
- Validation passes
- Audit is Pass or Pass with follow-up (no must-fix blockers)

**Steps**

1. `git status` / `git diff`
2. Stage scoped files only
3. Commit with clear message (why, not only what)
4. `git push` if requested
5. Verify Vercel deployment if connected

**Do not** commit docs-only tasks unless asked (e.g. Batch 1/2 doc creation).

---

## Stage 11 — Save learnings back into docs

After significant work, update:

| Learning | Doc |
|----------|-----|
| Positioning change | `01` |
| New tokens/components | `04` |
| Section order change | `03`, `05` |
| New page | `12` (when exists) |
| CMS fields/behavior | `13` (when exists) |
| Deploy/validation notes | `15` (when exists) |
| Precedence conflict | `00` |

Keeps Batch 1 brain accurate for the next Cursor session.

---

## Phase map (recommended)

| Phase | Scope | Docs |
|-------|--------|------|
| **1–2** | Home shell, static sections, CMS-ready hidden sections | `05`, `08` — **done** |
| **3** | CMS public sections (projects, proof, updates) | `13` when written |
| **4** | Admin UI, auth, media | `13` |
| **5** | Additional routes (About, Projects, Proof Library, Contact) | `11`, `12` |
| **6** | SEO/OG, polish, deployment hardening | `14`, `15` |

Audit after **every** phase.

---

## Anti-patterns (do not)

| Anti-pattern | Why |
|--------------|-----|
| Mock → code in one step | Skips interpretation and CMS rules |
| “Make it like the image” | No docs, no scope |
| Rebuild page before content/docs update | Drift and rework |
| Fake projects for “full look” | Violates proof-before-claims |
| Install CMS without approval | Scope and security |
| Commit/push/deploy by default | User controls release |
| Think Big marketing copy on Parth | Wrong positioning |

---

## Confirmed vs assumptions

**Confirmed**

- Next.js 16 + Tailwind v4 + Vercel deploy path
- Batch 1 docs (`00`–`06`) and Phase 1–2 home implementation exist
- CMS sections hidden until real data

**Assumptions**

- Domain/subdomain TBD

**Confirmed (Batch 3)**

- `11`–`16` define sitemap/navigation, page blueprints, CMS strategy, SEO/OG, deployment, and Cursor workflows (CMS platform choice still per `13` gaps)

---

## Gaps / decisions needed

- Formal sign-off template for Stage 9 review
- Whether every phase requires deployed preview URL check
- CMS platform decision before Phase 3 kickoff
