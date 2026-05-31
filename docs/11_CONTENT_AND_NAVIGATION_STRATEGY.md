# 11 — Content and Navigation Strategy

## Purpose

Define sitemap, page priorities, navigation, footer, content architecture, and **page visibility rules** for the Parth AI Software Systems microsite.

---

## Content architecture principle

**Narrative pages** explain direction (static or Page Sections CMS).  
**Proof pages** show evidence (Projects, Videos, Proof Library, Downloads, GitHub).  
**Conversion pages** route to Discuss a Software Use Case (Contact).

Do not mix digital-marketing agency pages (SEO services, lead gen) into this microsite.

---

## Primary pages

| Page | Route (target) | Purpose | CMS | Status (confirmed) |
|------|----------------|---------|-----|-------------------|
| **Home** | `/` | Positioning, capabilities, founder, process, CMS previews | Partial | **Built** (Phase 1–2); featured projects CMS-backed with static fallback (Phase 2.7) |
| **Projects** | `/projects` | Directory of software builds | Projects | **Built** (Phase 2.7) |
| **Project detail** | `/projects/[slug]` | Single project proof + links | Projects | **Built** (Phase 2.7) |
| **About Parth** | `/about-parth` | Founder story, credibility, timeline | Timeline + CMS featured | **Built** (Phase 2.8) |
| **Contact** | `/contact` | Discuss a software use case | Static / form later | Planned |
| **GitHub** | `/github` or external | Repository trail, curated links | Optional repo records | Planned |
| **Videos** | `/videos` | YouTube / demo library | Videos | **Built** (Phase 2.8) |
| **Proof Library** | `/proof` | Documents, presentations, recognition | Proof / Downloads | **Built** (Phase 2.8) |
| **Updates / Build Notes** | `/updates` | Build notes and technical progress | Updates | **Built** (Phase 2.8) |
| **Downloads** | `/downloads` or merged with Proof | PDFs, files | Proof / Downloads | Planned |

**Recommendation:** Merge **Downloads** into Proof Library with `proofType` filter unless downloads volume justifies a separate route.

---

## Future / optional pages

| Page | Route | Notes |
|------|-------|-------|
| **Updates / Build Notes** | `/updates` | CMS Updates; may power home “Latest Updates” strip |
| **Blog** | `/blog` or `/updates` | Only if long-form editorial is needed—prefer Updates for technical notes |
| **Systems / Services** | `/systems` | Optional landing for six capability categories; may stay on home only |
| **Timeline / Milestones** | `/timeline` or section on About | CMS Timeline |
| **Privacy Policy** | `/privacy` | Legal — when required |
| **Terms** | `/terms` | Legal — when required |
| **Sitemap** | `/sitemap` or `sitemap.xml` only | Human HTML optional |
| **404** | `not-found` | Branded, links to Home + Contact |

---

## Page status logic

Use this status for every route before exposing it in nav:

| Status | Meaning | Public nav? |
|--------|---------|-------------|
| **Planned** | In sitemap/docs only | No |
| **In Progress** | Dev branch / preview | No (unless preview URL approved) |
| **Built** | Route renders; content may need review | No |
| **Approved** | Content + design reviewed against docs | Eligible for nav |
| **Live** | Approved + deployed to production | Yes |

**Rule:** Only **Approved** or **Live** pages appear in top navigation or footer as normal working links.

---

## Top navigation (target direction)

**Approved mock-aligned nav** (when each route is Approved/Live):

1. Home  
2. Systems → `#what-we-build` on home **or** `/systems` when built  
3. Projects  
4. GitHub  
5. Videos  
6. Downloads  
7. About Parth  
8. Contact  

**Current MVP nav** (implemented): shortened in-page anchors — Proof, Systems, Process, Founder, Contact — per `05` until full routes exist.

**Navigation rule**

- Do not add a top-nav item that 404s or shows “coming soon” unless placeholder behavior is **explicitly approved** in the prompt.
- External GitHub may link to approved org/profile URL when available—not a fake repo.

---

## Footer strategy

Footer **may** include more links than top nav (Systems, Proof, Company groups).

**Footer rules**

- Same Approved/Live rule—no broken routes.
- In-page anchors (`#proof-before-claims`, `#contact`) acceptable on home until pages exist.
- Think Big Digital Solutions attribution allowed; link to main site only when URL approved.
- Legal links (Privacy, Terms) only when pages are Live.

**Current footer** (Phase 1–2): Systems / Proof / Company groups with in-page anchors — acceptable for MVP.

---

## Content types by page

| Content type | Where it appears |
|--------------|------------------|
| Static copy | Home narrative sections, Contact intro |
| Projects CMS | Home featured grid, `/projects`, detail |
| Videos CMS | Home optional strip, `/videos`, project detail |
| Proof CMS | Home preview, `/proof`, About cross-links |
| Timeline CMS | About Parth, optional home |
| Updates CMS | `/updates`, home Latest Updates (hidden when empty) |
| Page Sections CMS | Optional editable eyebrows/headlines without deploy |

---

## Link wiring workflow

When a new page reaches **Approved**:

1. Build route per `12_PAGE_BLUEPRINTS.md`  
2. Run `09` audit + `14` metadata  
3. Add to nav/footer in `SiteHeader` / `SiteFooter`  
4. Update this doc status table  
5. Add to `sitemap.xml` when Live  

See `10` Stage 11 — save learnings in docs.

---

## Cross-linking priorities

| From | To |
|------|-----|
| Home | Projects, Proof Library, About, Contact |
| Project detail | GitHub, demo, video, related proof |
| About | Timeline, proof, GitHub, Videos |
| Proof item | Related project, source file/URL |

---

## Assumptions

- Single-language (English) MVP  
- Microsite may live on subdomain of Think Big (TBD)  
- GitHub may remain external link if `/github` page is deferred  

---

## Gaps / decisions needed

- Final domain and whether GitHub is external-only or curated `/github` page  
- Contact: form vs mailto vs Calendly  
- Whether Systems is a dedicated page or home anchor only  
- Downloads: separate route vs Proof Library filter  
