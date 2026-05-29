# 06 — Visual Asset and Design Interpretation Workflow

## Purpose

Define how mockups, screenshots, reference images, hero/section artwork, icons, and production assets are interpreted and implemented for the Parth microsite—so Cursor never confuses **reference** with **production UI**.

---

## Core rule

| Type | Meaning | Action |
|------|---------|--------|
| **Mock / reference image** | Interpretation only | Extract layout, rhythm, hierarchy, tone |
| **Production artwork** | Approved uploaded asset | Use in `public/` or CMS media library |
| **Live UI build** | HTML, CSS, SVG, components | Default for diagrams and text |

**Cursor must never treat a full-page mockup as something to embed, slice, or copy pixel-by-pixel.**

---

## Reference types on this project

### 1. Think Big main-site screenshots

**Role:** Design continuity reference only.

**Use for**

- Premium B2B feel  
- Dark/light section rhythm  
- Typography hierarchy and spacing  
- Card, button, footer patterns  
- Restrained blue/cyan accents  

**Do not use for**

- Parth page copy  
- Service lists (SEO, digital marketing, strategy calls as hero message)  
- Team/recommendations content  
- Digital marketing positioning  

### 2. Parth approved homepage mock (`Parth Website Mock Image Final`)

**Role:** Parth homepage direction reference.

**Use for**

- Section sequencing (hero dark → light proof → capabilities → dark projects → etc.)  
- AI software systems tone  
- Hero: copy left, system diagram right  
- Project/proof card **style** (when CMS exists)  
- Technical-founder credibility structure  
- CTA placement and density  

**Do not use for**

- Literal text (mock text ≠ copy source of truth)  
- Hard-coded project names (Noctis, TradePre, SEO Snapshot, etc.)  
- Pixel-perfect reproduction  
- Background image or sliced sections  

### 3. Current Parth homepage screenshot / live site

**Role:** Current-state reference only.

**Use for**

- What Phase 1–2 already implemented  
- Gap analysis vs mock and docs  

**Do not use when**

- Content or layout conflicts with `05_HOMEPAGE_BLUEPRINT.md`  
- Weak placeholder layout should be preserved “because it exists”  

---

## Full-page mockup rules

Cursor must **not**:

- Place the full mock inside the website  
- Use mock as page background  
- Slice mock into sections  
- Copy mock pixel-by-pixel  
- Bake mock text into PNG/SVG assets  
- Use mock dashboard screenshots as production UI chrome  

Cursor **may**:

- Build real components inspired by mock rhythm  
- Recreate diagrams as SVG/HTML with editable labels  
- Match spacing and color tokens from docs `02` and `04`  

---

## Production asset rules

An asset is **production-ready** only when:

1. Explicitly approved by project owner, and  
2. Identified as production (not “reference”), and  
3. Placed in `public/` or uploaded via CMS media field  

Until then, use programmatic visuals (diagrams, icons) or no image.

---

## Image role matrix (planning → implementation)

| Placement | Role | Phase 1–2 | Future CMS |
|-----------|------|-----------|------------|
| Hero workflow diagram | Decorative / explanatory | `WorkflowDiagram` SVG | N/A |
| Software-first flow | Decorative / explanatory | `SoftwareFirstDiagram` | N/A |
| Project card thumbnail | Content preview | Hidden with section | `coverImage` + focal point |
| Video card thumb | Content | Hidden | YouTube or upload, 16:9 |
| Proof document image | Readable proof | Hidden | `object-contain` in detail |
| Gallery image | Detail readability | N/A | Project detail |
| Founder photo | Profile | Not on home MVP | About page |
| OG / social | Sharing | Metadata only; asset TBD | Static template |
| Atmospheric hero art | Decorative bleed | Not used | Optional approved art + mask |

**Principle:** Cards = preview; modals/detail = readable; hero = composed UI; OG ≠ page artwork.

---

## Responsive artwork behavior

| Placement | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| Hero diagram | Right column | Below copy, full width | Simplified stack, no overflow |
| Flow diagrams | Inline horizontal | Wrap | Vertical wrap |
| Card thumbs | Grid | 2-col | 1-col |

**Rules**

- No text/diagram overlap  
- No horizontal scroll from images  
- `min-w-0` on flex children containing diagrams  
- Optional: hide decorative bleed on small screens if added later  

---

## Text rule

All headings, body copy, CTAs, diagram labels, and proof lists must remain **editable HTML/UI text**.

Do not render critical copy inside:

- PNG heroes  
- SVG `<text>` locked to design-only exports (prefer HTML overlays)  
- Background images  

---

## Workflow for new visual tasks

1. **Classify** asset: reference vs production.  
2. **Read** `02`, `03`, `04`, `05`, and this doc.  
3. **Interpret** mock/reference for rhythm only.  
4. **Plan** image role row (desktop/tablet/mobile, fit, hide-if-empty).  
5. **Implement** with components; no new packages unless approved.  
6. **Audit** — mock not in DOM, no fake proof images, no baked text.  

---

## Design interpretation deliverable (when requested)

For major pages, produce interpretation **before** code:

- Layout structure and section sequence  
- Dark/light rhythm  
- Component patterns (cards, CTAs, diagrams)  
- CMS-driven vs static sections  
- Empty-state behavior  
- Image role table  
- What must not be hard-coded  

Phase 1–2 home page interpretation is **complete**; this doc governs future pages and Phase 3 CMS media.

---

## File storage conventions (recommendations)

| Location | Contents |
|----------|----------|
| `docs/references/` | Universal templates, non-production references |
| `assets/` (Cursor workspace) | Chat-uploaded mocks — **not** for production import without approval |
| `public/` | Approved logos, OG, static illustrations only |
| CMS media | Project covers, proof files, video thumbs (future) |

---

## Gaps / decisions needed

- Approved logo SVG path for `public/`  
- OG image template (1200×630)  
- Whether atmospheric hero art will be commissioned or remain diagram-only  
- Focal point field in CMS schema (Batch 3)  
