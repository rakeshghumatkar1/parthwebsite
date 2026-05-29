# 04 — Basic Design System

## Purpose

Practical UI rules for implementing the Parth microsite—colors, typography, spacing, cards, buttons, sections, icons, media, responsiveness, and accessibility. Aligns with `02_BRAND_AND_VISUAL_IDENTITY.md` and `03_LAYOUT_DIRECTION.md`.

---

## Color system

### CSS variables (source: `src/app/globals.css`)

| Token | Usage |
|-------|--------|
| `tb-navy` | Dark sections, header, footer |
| `tb-navy-elevated` | Nested panels on dark (diagram container) |
| `tb-navy-border` | Borders on dark UI |
| `tb-blue` | Primary buttons, icon accents on light |
| `tb-blue-hover` | Primary button hover |
| `tb-cyan` | Eyebrows on dark, diagram highlight node |
| `tb-surface` | Default light background |
| `tb-surface-muted` | Alternate light section |
| `tb-text` / `tb-text-muted` | Light section text |
| `tb-text-on-dark` / `tb-text-on-dark-muted` | Dark section text |

### Usage rules

- **One primary CTA color** per view (tb-blue)—do not introduce second primaries.
- Muted sections use `tb-surface-muted`, not random grays.
- Borders on light cards: `border-slate-200`; on dark: `border-tb-navy-border`.

---

## Typography system

| Element | Tailwind direction | Rule |
|---------|-------------------|------|
| H1 | `text-3xl`–`text-5xl`, `font-semibold`, `tracking-tight` | **One per page** — hero only |
| H2 | `text-2xl`–`text-4xl`, `font-semibold` | Section titles |
| H3 | `text-lg`–`text-base`, `font-semibold` | Card titles, process steps |
| Eyebrow | `text-xs`, `uppercase`, `tracking-widest` | Section label |
| Body | `text-base`–`text-lg`, `leading-relaxed` | Muted for secondary |
| Small / tags | `text-xs` | Tech stack pills |

**Do not** use decorative fonts or sub-12px body text on mobile.

---

## Spacing system

| Context | Scale |
|---------|--------|
| Section padding | `py-16 sm:py-20 lg:py-24` inside `Section` |
| Container | `max-w-6xl mx-auto px-6 sm:px-8` |
| Section header → content | `mb-10 sm:mb-12` |
| Card grid gap | `gap-6` |
| Button groups | `gap-3`, `flex-wrap` |
| Stack (hero) | `gap-12 lg:gap-16` |

Avoid one-off `mt-32` unless documented for a specific breakpoint need.

---

## Section system

**Component:** `Section` (`tone: dark | light | muted`)

- Wraps content in max-width container with consistent vertical padding.
- Use `id` for in-page anchors; pair with `scroll-mt-24` on targeted sections if fixed header overlaps.

**Component:** `SectionHeader`

- Props: `eyebrow`, `title`, `description`, `align`, `dark`
- Keeps eyebrow + H2 + intro consistent.

---

## Card system

### Feature card (light sections)

- White background, `border-slate-200`, `rounded-xl`, `p-6`, subtle `shadow-sm`
- Optional icon in `bg-blue-50` + `text-tb-blue` square
- Title + description only—no fake links

### Proof signal / checklist row

- Icon check (tb-blue) + text in muted panel or white bordered list

### Project card (dark section, CMS later)

- `bg-tb-navy-elevated`, `border-tb-navy-border`
- Tech tags: pill, small, muted border

### Process step card

- Number eyebrow (01–05), title, short body
- White card on muted section

**Card rules**

- Do not mix heavy shadow + heavy border on same card.
- Keep card text to 2–4 lines for scanability where possible.

---

## Button system

**Component:** `Button` — Next.js `Link` styled as button.

| Variant | Use |
|---------|-----|
| `primary` | Discuss a Software Use Case |
| `secondary` (on dark) | Outlined ghost on navy |
| `ghost` (on light) | Secondary actions on white/muted |

- `rounded-lg`, `px-5 py-2.5`, `text-sm font-medium`
- Primary on dark: `bg-tb-blue` white text
- Do not use more than 3 CTAs in one cluster without hierarchy (1 primary + 1–2 secondary)

---

## Icon system

- Inline SVG in `src/components/ui/icons.tsx` (thin stroke, 1.5–1.75 stroke width)
- Consistent `h-5 w-5` in cards; `aria-hidden` on decorative icons
- Do not add icon npm package without approval

---

## Image / media rules

| Placement | Behavior |
|-----------|----------|
| Hero diagram | SVG/HTML — `WorkflowDiagram` |
| Software-first diagram | `SoftwareFirstDiagram` |
| Project thumbnail (future) | 16:9, `object-cover`, focal point from CMS |
| Video thumb (future) | 16:9, YouTube or upload |
| Proof document (future) | `object-contain` in detail; thumb in card |
| OG image | Separate static asset; not hero reuse |

**Never:** slice mock, bake copy into PNG, use screenshot as UI chrome.

---

## Responsive rules

- Mobile-first Tailwind classes
- Grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (adjust per section)
- Hero: `lg:grid-cols-2`; diagram `min-w-0` to prevent overflow
- Buttons: `flex-wrap` in CTA rows
- Header: full nav `lg:flex`; mobile menu TBD

---

## Accessibility rules

- Semantic landmarks: `header`, `main`, `footer`, `section`, `nav`
- One H1 per page
- Diagram containers: `aria-label` describing flow (not only visual)
- Focus visible on links/buttons (extend Tailwind `focus-visible:ring` in polish pass)
- Meaningful link text (not “click here”)
- Alt text on all content images when CMS adds media

---

## Reusable component map (current codebase)

| Component | Path |
|-----------|------|
| `SiteHeader` | `src/components/layout/site-header.tsx` |
| `SiteFooter` | `src/components/layout/site-footer.tsx` |
| `Section`, `SectionHeader`, `Button`, `FeatureCard` | `src/components/ui/*` |
| Home sections | `src/components/home/*` |
| CMS types | `src/types/cms.ts` |
| Static home data | `src/lib/home-data.ts` |

New pages should reuse these primitives before adding one-offs.

---

## Recommendations (not yet implemented)

- Add `focus-visible:ring-2 ring-tb-blue` to `Button` and nav links
- Document exact `scroll-mt` value after header height audit
- Add `prefers-reduced-motion` respect if motion is introduced later

---

## Gaps / decisions needed

- Official spacing token table if Think Big brand kit specifies exact px
- Dark mode: currently single theme; no `prefers-color-scheme` flip unless requested
