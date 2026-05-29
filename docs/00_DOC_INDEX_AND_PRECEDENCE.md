# 00 — Doc Index and Precedence

## Purpose

This file defines the document hierarchy for the **Parth / Think Big AI Software Systems** microsite. When instructions conflict, Cursor and contributors must follow this order instead of guessing.

---

## Source of truth order

1. **User's latest explicit instruction** (current chat or task prompt)
2. **`docs/00_DOC_INDEX_AND_PRECEDENCE.md`** (this file)
3. **`docs/01_PROJECT_BRIEF.md`**
4. **`docs/02_BRAND_AND_VISUAL_IDENTITY.md`**
5. **`docs/03_LAYOUT_DIRECTION.md`**
6. **`docs/04_BASIC_DESIGN_SYSTEM.md`**
7. **`docs/05_HOMEPAGE_BLUEPRINT.md`**
8. **`docs/06_VISUAL_ASSET_AND_DESIGN_INTERPRETATION_WORKFLOW.md`**
9. **`docs/07_PROMPT_RULES.md`**
10. **`docs/08_IMPLEMENTATION_RULES.md`**
11. **`docs/09_AUDIT_CHECKLIST.md`**
12. **`docs/10_WEBSITE_PRODUCTION_WORKFLOW.md`**
13. **`docs/11_CONTENT_AND_NAVIGATION_STRATEGY.md`**
14. **`docs/12_PAGE_BLUEPRINTS.md`**
15. **`docs/13_CMS_AND_ADMIN_STRATEGY.md`**
16. **`docs/14_SEO_METADATA_AND_OG_WORKFLOW.md`**
17. **`docs/15_DEPLOYMENT_AND_VALIDATION_RULES.md`**
18. **`docs/16_CURSOR_WORKFLOW_PROMPT_SYSTEM.md`**

---

## Reference material rules (not final content)

| Reference | Role | Must not be treated as |
|-----------|------|-------------------------|
| **Parth project docs** (`docs/01`–`16`) | **Source of truth** for Parth website work | Optional suggestions |
| **Think Big main-site screenshots** | Design continuity only (palette, rhythm, cards, CTAs, spacing) | Parth page copy, services list, or digital-marketing positioning |
| **Parth approved homepage mock image** | Homepage direction only (section order, rhythm, software-systems feel) | Production UI, pixel-perfect spec, or final copy |
| **Current Parth homepage screenshot / live build** | Current-state reference only | Design source of truth if it conflicts with approved mock + docs |
| **`docs/references/UNIVERSAL_CURSOR_DOCS_TEMPLATE_REFERENCE.md`** | Structure/template for generating docs | Final project content or implementation prompts |

---

## Positioning precedence

- **Parth docs override** Think Big main-site wording where positioning differs.
- This microsite is **AI software systems / workflow applications**, not a digital marketing agency homepage.
- Do not import SEO, lead generation, or “Growth Operating System” language from Think Big main site unless explicitly re-scoped for Parth.

---

## Conflict rule

If two documents conflict, or docs conflict with chat instructions:

1. **Stop** before implementation.
2. **Report** the conflict clearly.
3. Proceed only if the **current prompt** explicitly resolves it.

If chat resolves a conflict, note which doc should be updated in a follow-up docs pass.

---

## Cursor rule

Before any major implementation task, Cursor must:

1. Inspect relevant docs from this index.
2. Report which docs were read and applied.
3. Classify the task (e.g. static UI-only vs CMS vs DB) per project rules.

---

## Batch status

| Batch | Docs | Status |
|-------|------|--------|
| **Batch 1** | `00`–`06` (core project brain) | **Created** |
| **Batch 2** | `07`–`10` (workflow control) | **Created** |
| **Batch 3** | `11`–`16` (content/navigation, page blueprints, CMS/admin, SEO/OG, deployment, Cursor workflows) | **Created** |

---

## Gaps / decisions needed

- Final production domain (e.g. `ai.thinkbigdigital.co`) — confirm and update `14` + `metadataBase`.
- CMS platform choice (Payload vs Sanity vs other) — see `13`; requires separate implementation approval.
- Approved production logo files and OG image — confirm when available.
