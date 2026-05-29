# 02 — Brand and Visual Identity

## Purpose

Define brand feel, visual direction, color approach, typography mood, icon style, and design personality for the **Parth AI Software Systems** microsite—adapted from Think Big visual DNA, not copied from Think Big digital marketing positioning.

---

## Brand feel

### The site should feel

- **Premium B2B** — calm, structured, credible
- **Operational / software-company** — systems, workflows, evidence
- **Technical but readable** — clear hierarchy, no jargon walls
- **Proof-led** — trust through visible work, not claims
- **Editorial** — generous spacing, intentional section rhythm
- **Think Big–connected** — same family as main brand, different vertical focus

### The site should not feel

- Cheap, cluttered, or “template SaaS”
- Digital marketing agency (SEO, lead gen, campaigns as hero)
- Student portfolio or hobby coder site
- Family biography or emotional praise page
- Generic AI startup (neon gradients, robots, brains, “magic”)
- Hype-driven (revolutionary, game-changing, world-class)

---

## Think Big visual DNA — adapted for Parth

**Preserve from Think Big references**

| Element | Application on Parth microsite |
|---------|-------------------------------|
| Deep navy + white alternation | Hero, featured projects band, final CTA, footer |
| Electric blue primary CTA | Discuss a Software Use Case |
| Restrained cyan accents | Eyebrows, diagram highlights, subtle icons |
| Clean card system | What We Build, proof signals, process steps |
| Calm editorial spacing | Section padding ~80–120px desktop |
| Thin-line icons | Capability cards, checklists, diagrams |
| Structured grids | 3-col projects (later), 2–3 col capabilities |

**Change from Think Big main site**

| Think Big main | Parth microsite |
|----------------|-----------------|
| Digital marketing, SEO, growth systems | Software systems, workflows, AI/data layer |
| Team / recommendations / case studies agency framing | Technical founder + project/GitHub/YouTube proof |
| “Book a Strategy Call” as default hero CTA | “Discuss a Software Use Case” |
| Growth Operating System diagrams | Business problem → software → AI/automation → product |

---

## Color direction

**Confirmed tokens (implemented in `globals.css` — adjust only via docs + approval)**

| Token | Role | Approximate value |
|-------|------|-------------------|
| `--tb-navy` | Dark section background | `#0a1128` |
| `--tb-navy-elevated` | Cards on dark, diagram panels | `#111b33` |
| `--tb-navy-border` | Borders on dark | `#1e2a45` |
| `--tb-blue` | Primary CTA, links | `#2563eb` |
| `--tb-cyan` | Eyebrows, diagram accent | `#38bdf8` |
| `--tb-surface` | Light section background | `#ffffff` |
| `--tb-surface-muted` | Alternate light band | `#f4f6f9` |
| `--tb-text` | Body on light | `#0f172a` |
| `--tb-text-muted` | Secondary on light | `#475569` |
| `--tb-text-on-dark` | Body on dark | `#e2e8f0` |

**Avoid**

- Neon purple/pink AI gradients
- Heavy glassmorphism or excessive glow
- Rainbow tag clouds or startup illustration packs

---

## Typography direction

**Current implementation:** Geist Sans (Next.js default from scaffold).

**Direction**

- Headings: **semibold**, tight tracking, clear H1 → H2 → H3 ladder
- Body: **comfortable line height** (relaxed), muted secondary color on light sections
- Eyebrows: **uppercase**, wide letter-spacing, cyan on dark / blue on light
- Avoid decorative or overly futuristic display fonts unless brand team approves Inter/brand font swap

**Recommendation:** Evaluate Inter or Think Big main-site font match in a later polish pass—document decision in `04` when confirmed.

---

## Icon / illustration style

**Use**

- Thin-line SVG icons (inline or small component set)
- **Built UI diagrams** for hero and “software first” flow (nodes, arrows, live labels)
- Optional approved atmospheric artwork only when explicitly marked production asset

**Avoid**

- Mixed icon families (outline + filled + emoji)
- Stock “AI brain” or robot illustrations
- Baked text inside diagram images
- Screenshots of mockups used as production UI

---

## Motion style

**Allowed**

- Subtle hover on buttons and cards
- Smooth scroll for in-page anchors

**Avoid**

- Parallax, constant animation, distracting reveals
- Auto-playing video backgrounds

---

## Image / reference rule

| Asset type | Rule |
|------------|------|
| Think Big screenshots | Mood, spacing, card/button rhythm only |
| Parth homepage mock | Section order, density, software-systems tone—not pixel copy |
| Current live homepage | Gap analysis only; superseded by mock + docs when they conflict |
| Production photos / OG | Use only when approved and uploaded to `public/` or CMS |

Do not copy Think Big proprietary copy, client names, or service lists into Parth UI.

---

## Tone of voice (visible copy)

**Use:** self-built credibility, technical founder, software systems, workflow, proof, ownership, Think Big review for delivery.

**Avoid:** genius, prodigy, world-class, top 1%, industry-leading, revolutionary, AI magic, overusing age, “practical,” MIT/Stanford comparisons.

---

## Gaps / decisions needed

- Official logo SVG/wordmark for header/footer
- Final font family alignment with Think Big brand kit
- Approved OG/social image template
