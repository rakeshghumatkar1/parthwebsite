# 12 — Page Blueprints

## Purpose

Reusable structure for future Parth microsite pages—purpose, sections, CMS needs, proof/media, CTAs, and anti-patterns. Align with `02`–`06` and `11`.

**Tone:** Mature, proof-led, technical founder—not student portfolio or prodigy narrative.

**Site navigation (Phase 3.2):** `SiteHeader` links to built public routes (`/`, `/projects`, `/proof`, `/videos`, `/about-parth`, `/updates`); CTA → `/#contact`. `SiteFooter` mirrors built routes plus root-aware home anchors for Systems and Contact. No new pages created in this phase.

---

## Blueprint index

| Page | Doc section |
|------|-------------|
| Home | § Home (see also `05`) |
| About Parth | § About Parth |
| Projects listing | § Projects listing |
| Project detail | § Project detail |
| GitHub / Repositories | § GitHub |
| Videos | § Videos |
| Proof Library | § Proof Library |
| Downloads | § Downloads |
| Updates / Build Notes | § Updates |
| Contact | § Contact |

---

## Home page

**Status:** Built (Phase 1–2). Featured projects CMS-backed with static fallback (Phase 2.7). Full detail in `05_HOMEPAGE_BLUEPRINT.md`.

| Item | Direction |
|------|-----------|
| Purpose | Position + proof path + primary CTA |
| Audience | Founders, operators, technical evaluators |
| CMS | Featured projects from CMS when published/featured; static `launchProjects` fallback when empty; proof preview and updates still static/hidden when empty |
| Avoid | Fake project cards, marketing agency framing |

---

## About Parth page

**Status:** Built (Phase 2.8) at `/about-parth`. CMS-backed milestones and featured sections with empty-safe states; no fake biography.

### Purpose

Explain Parth Ghumatkar as **self-led technical founder**: journey, credibility, how he works with Think Big on delivery—not a family profile or prodigy article.

### Audience

Visitors evaluating **who builds the systems** before reviewing projects.

### Suggested sections

1. **Hero** — eyebrow, headline (technical founder / software systems), short intro  
2. **Journey** — electronics → IoT/Python → software/AI systems (factual; age mentioned sparingly)  
3. **Credibility grid** — self-built proof, GitHub/YouTube, presentations, ownership  
4. **Timeline** (CMS) — optional horizontal/vertical milestones  
5. **How Parth works with Think Big** — review, QA, documentation for client-critical builds  
6. **CTA** — Discuss a Software Use Case; link to Projects and Proof Library  

### CMS / data

- Timeline / Milestones (featured on about)  
- Optional featured projects  
- Optional Page Sections for editable intro  

### Proof / media

- Profile photo only when approved (`profile_photo` role)  
- No lifestyle/family gallery as hero focus  

### CTAs

- Primary: Discuss a Software Use Case  
- Secondary: View Projects, Review Proof Library  

### Image behavior

- Profile: square or 4:5, `object-cover`, focal point  
- Timeline: icons or small proof thumbs—not full mock screenshots  

### Avoid

- Prodigy/genius framing, emotional family praise, MIT/Stanford comparisons  
- “Can build anything,” age as headline  

---

## Projects listing page

**Status:** Built (Phase 2.7). Empty state when no CMS records; no static fallback on this route.

### Purpose

Directory of **real software, automation, and AI workflow builds**—filterable, CMS-driven.

### Audience

Technical evaluators and founders browsing proof.

### Suggested sections

1. **Hero** — “Project evidence” / real systems you can explore  
2. **Filters** — project type, status, tech (CMS-driven)  
3. **Project grid** — cards: cover, title, excerpt, tech tags  
4. **CTA** — Discuss a Software Use Case  

### CMS / data

- **Projects** — all published, not hidden/archived  

### Proof / media

- Card thumbnails: 16:9, `card_thumbnail` role  

### Avoid

- Hard-coded mock projects (Noctis, TradePre, etc.)  
- Empty grid with placeholder cards  

---

## Project detail page

**Status:** Built (Phase 2.7). Related proof/videos/updates not connected yet.

### Purpose

Deep proof for one build: problem, solution, role, stack, links.

### Suggested sections

1. **Header** — title, type, status, tech stack pills  
2. **Summary** — what it does, problem solved  
3. **Parth’s role** — ownership clarity  
4. **Links** — GitHub, demo, video (only if in CMS)  
5. **Gallery** — screenshots (`gallery_image`, readable)  
6. **Related proof / videos**  
7. **CTA** — Discuss a similar use case  

### CMS / data

- Single **Project** record + relations  

### Image behavior

- Cover: 16:9 card; gallery: `contain` or large readable width  
- Alt text required  

### Avoid

- Invented metrics or client names  
- Fake demo URLs  

---

## GitHub / Repository page

### Purpose

**Repository trail**—curated view of public GitHub work or link-out to profile.

### Options (decision needed)

| Option | Behavior |
|--------|----------|
| A | External link to approved GitHub profile/org |
| B | CMS-curated repo cards (title, description, URL, related project) |
| C | Embedded GitHub API (only if approved—adds complexity) |

### Suggested sections (if on-site page)

1. Intro — repositories as proof of building  
2. Curated repo cards or grouped by theme  
3. Link to full GitHub profile  

### Avoid

- Fake repos or star counts as social proof  
- Implying contribution to repos Parth does not own  

---

## Videos page

**Status:** Built (Phase 2.8). CMS-only listing with empty state; external YouTube links only (no embed).

### Purpose

YouTube and demo library—hardware history through current software demos.

### Suggested sections

1. Hero — demos as proof  
2. Filters — category, year, related project  
3. Video grid — 16:9 thumbnails, title, short description  
4. CTA — Projects / Contact  

### CMS / data

- **Videos** — published only  

### Media

- YouTube thumbnail or upload; 16:9 enforced  

### Avoid

- Embedding broken or private videos without handling  

---

## Proof Library page

**Status:** Built (Phase 2.8). CMS-only listing with empty state; no static fallback.

### Purpose

Central index of **documents, presentations, recognition, screenshots, downloads**—what each item proves.

### Suggested sections

1. Hero — every claim connects to something visible  
2. Filters — proof type (presentation, recognition, screenshot, PDF, etc.)  
3. Proof cards — title, type, year, what this proves, view/download  
4. Related projects/videos where linked  

### CMS / data

- **Proof Library / Downloads** content type  

### Media

- `proof_document` — readable in detail view  
- PDF: download + optional preview image  

### Avoid

- Empty state on public page that looks broken—show calm empty copy only if entire library empty and approved  

---

## Downloads page

### Purpose

If split from Proof Library: quick access to PDFs and files.

**Recommendation:** Implement as Proof Library filter `proofType=download` unless volume requires separate route.

### Sections

- Filtered list, file size/type meta, related project  

### Avoid

- Hosting files without virus-scan / upload validation in admin (future)  

---

## Updates / Build Notes page

**Status:** Built (Phase 2.8). CMS-only listing with empty state; no detail pages in this phase.

### Purpose

Chronological technical updates—new projects, repos, videos, proof, build notes.

### Suggested sections

1. Hero — follow ongoing work  
2. List — date, type, summary, link to detail  
3. Detail — body, related entities  

### CMS / data

- **Updates / Build Notes**  

### Home integration

- `featuredOnHome` drives home strip; section hidden when empty  

---

## Contact page

### Purpose

Start **Discuss a Software Use Case**—problem, workflow, rough idea.

### Suggested sections

1. Hero — bring the problem or workflow  
2. What to include — context, users, current tools, constraints  
3. Think Big delivery note — review/QA for client-critical work  
4. Form or contact method (TBD)  
5. Secondary links — Projects, Proof Library  

### CMS / data

- Mostly static; form submissions may need backend later (out of scope until approved)  

### Avoid

- Generic “Book a marketing call” copy  
- Required fields that block low-friction inquiry without reason  

---

## Shared blueprint rules

| Rule | All pages |
|------|-----------|
| Layout | `02`–`04` tokens, dark/light rhythm where appropriate |
| H1 | One per page, clear purpose |
| CTAs | Primary = Discuss a Software Use Case where relevant |
| SEO | Per `14` before Live |
| Nav | Per `11` — Approved/Live only |
| Audit | `09` before commit |

---

## Gaps / decisions needed

- Contact form provider  
- GitHub page vs external-only  
- Blog vs Updates naming  
- Legal pages timeline  
