# 09 — Audit Checklist

## Purpose

QA checklist for Parth microsite implementation, correction, and pre-deploy review. Use after each phase and before commit/push when requested.

---

## How to use

1. Run checklist for the **scoped route/feature** only.
2. Mark each item: **Pass** / **Fail** / **N/A**.
3. Record evidence (file paths, screenshots, command output).
4. End with **Final audit result** (see bottom).

---

## 1. Project positioning audit

| Check | Pass criteria |
|-------|----------------|
| AI software systems focus | Page reads as workflow/software systems, not digital marketing |
| Founder positioning | Parth as self-led technical founder with visible proof path |
| Think Big relationship | Delivery/review through Think Big where relevant—not agency SEO pitch |
| Core messages | Software first; AI where it improves workflow; proof before claims |
| Non-goals avoided | Not student portfolio, family profile, generic AI agency, prodigy hype |
| Banned words | No **practical**, genius, prodigy, world-class, revolutionary, AI magic, etc. in visible copy |
| Old content | No “Prodigy of Sorts” article tone or content |

---

## 2. Visual identity audit

| Check | Pass criteria |
|-------|----------------|
| Think Big DNA | Premium B2B, calm, operational |
| Palette | Deep navy dark sections; white/muted light sections; electric blue CTA; restrained cyan accents |
| Avoided styles | No neon AI, robot/brain stock, heavy glassmorphism, cluttered gradients |
| Tone | Software-company credible, not startup hype |

---

## 3. Layout audit

| Check | Pass criteria |
|-------|----------------|
| Section order | Matches `05` for home (or page blueprint when exists) |
| Dark/light rhythm | Hero dark → light body → dark bands where specified |
| Container | ~`max-w-6xl`, consistent horizontal padding |
| Hero | Copy + diagram split desktop; stacks mobile |
| Density | Editorial spacing; not overcrowded |
| CMS sections | Hidden when empty—not broken placeholders |

---

## 4. Design system audit

| Check | Pass criteria |
|-------|----------------|
| Colors | Uses `tb-*` tokens from `04` / `globals.css` |
| Typography | One H1; logical H2/H3; readable body |
| Cards | Consistent borders, radius, padding per `04` |
| Buttons | Primary vs secondary hierarchy clear |
| Icons | Thin-line, consistent—not mixed families |
| Diagrams | Live UI/SVG, readable labels |

---

## 5. Mock / reference image audit

| Check | Pass criteria |
|-------|----------------|
| Mock not in DOM | Full-page mock not embedded, sliced, or used as background |
| Not pixel copy | Layout inspired by mock, not literal reproduction |
| Mock text | Approved pasted content used—not mock project names |
| Think Big screenshots | Continuity only—not marketing copy imported |
| Current site screenshot | Not used to override approved mock + docs |

---

## 6. Content audit

| Check | Pass criteria |
|-------|----------------|
| Live HTML text | No critical copy only inside images |
| Approved copy | Matches blueprint/brief; no invented claims |
| Headings | Clear, scannable |
| CTAs | Labels match `01`/`05` (Discuss a Software Use Case, etc.) |
| No fake proof | No fake projects, metrics, testimonials, clients |

---

## 7. Proof / CMS-readiness audit

| Check | Pass criteria |
|-------|----------------|
| No hard-coded repeatable cards | Projects/proof/updates not faked for demo |
| Empty CMS sections | Hidden on public site (`null` or equivalent) |
| CMS components | Accept props/arrays; ready for Phase 3+ |
| Links | No placeholder `github.com/fake` URLs |
| Featured defaults | When CMS live: 3 featured projects, etc. per brief—not mock six-pack |

---

## 8. Responsive audit

| Check | Pass criteria |
|-------|----------------|
| Mobile width | No horizontal overflow (`375px` check) |
| Hero | Diagram below or simplified; no text overlap |
| Grids | 1 col mobile, 2 tablet, 3 desktop where designed |
| CTAs | Tappable, wrap, readable |
| Diagrams | Wrap or stack; labels remain legible |
| Header | Usable on small screens (nav MVP acceptable) |

---

## 9. Accessibility audit

| Check | Pass criteria |
|-------|----------------|
| Landmarks | `header`, `main`, `footer`, `nav`, `section` |
| Heading order | No skipped levels without reason |
| Diagrams | `aria-label` or visible text for flows |
| Focus | Links/buttons keyboard-focusable (visible focus in polish) |
| Images | `alt` on content images when CMS adds media |
| Contrast | Readable text on dark and light backgrounds |

---

## 10. Technical audit

| Check | Pass criteria |
|-------|----------------|
| TypeScript | `npx tsc --noEmit` passes |
| Lint | `npm run lint` passes |
| Build | `npm run build` passes |
| Imports | No broken paths |
| Hydration | No known hydration mismatches |
| Scope | Only intended files changed |
| Packages | No unintended `package.json` changes |
| Server files | No improper `"use server"` usage |

---

## 11. Link / navigation audit

| Check | Pass criteria |
|-------|----------------|
| Broken links | No 404 routes linked from nav/footer |
| Unfinished pages | Not advertised as complete without page existing |
| External URLs | Only approved real URLs |
| Anchors | `#contact`, section IDs work with sticky header |
| Footer/header | Consistent with sitemap strategy when `11` exists |

---

## 12. Git / deployment audit

*(When commit/push/deploy requested)*

| Check | Pass criteria |
|-------|----------------|
| Git scope | Only relevant files staged |
| Secrets | No `.env` or credentials committed |
| Commit message | Describes why, not only what |
| Push | Only when user requested |
| Vercel | Build succeeds; production URL loads scoped changes |

---

## Quick home page sanity (repeatable)

- [ ] H1: “AI Software Systems Built Around Business Workflows”
- [ ] Six “What We Build” cards present
- [ ] Five process steps present
- [ ] Featured Projects section **absent** when no CMS data
- [ ] Proof Library Preview **absent** when no CMS data
- [ ] Latest Updates **absent** at launch
- [ ] Final CTA + footer present

---

## Final audit result

Record one of:

| Result | When |
|--------|------|
| **Pass** | All applicable checks pass; no must-fix items |
| **Fail** | Must-fix items block release/commit |
| **Pass with follow-up** | Shippable; non-blocking improvements documented |

**Must-fix examples:** fake project cards, mock embedded as UI, positioning reverted to marketing agency, build fails, horizontal overflow on mobile, banned copy.

**Follow-up examples:** mobile nav drawer, focus ring polish, OG image asset, font alignment with Think Big brand kit.

---

## Audit report template

```
Audit scope: [route/feature]
Docs used: [list]
Result: Pass | Fail | Pass with follow-up

Failures:
- ...

Follow-ups:
- ...

Validation:
- tsc: 
- lint: 
- build: 
```

---

## Gaps / decisions needed

- Automated visual regression (not in scope)
- Lighthouse score targets — define in Batch 3 `15` if needed
