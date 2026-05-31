# 13 — CMS and Admin Strategy

## Purpose

Define **future** CMS and admin requirements for the Parth microsite—content types, fields, media roles, public behavior, and admin UX. **Do not build CMS in this doc task**; implementation requires explicit approval per `08`.

---

## When to use CMS / admin

| Trigger | Action |
|---------|--------|
| Repeatable project/proof/video cards | CMS required |
| Non-developer content updates | Admin UI required |
| File uploads (PDF, images) | Media library + validation |
| Publishing workflow (draft/publish) | CMS states |
| User roles | Auth + roles (defer until needed) |

**Confirmed (Phase 2.1):** Neon Postgres + Drizzle ORM + custom Next.js admin (admin UI in later prompts). Public Home still uses static launch data until CMS connection phase.

---

## CMS platform (settled)

| Choice | Status |
|--------|--------|
| **Neon Postgres** | Structured CMS data (Vercel / Neon integration) |
| **Drizzle ORM** | Schema, migrations, type-safe queries |
| **@neondatabase/serverless** | Serverless driver for Next.js on Vercel |
| **Custom admin** | Built in later prompts under `/admin` |
| **Vercel Blob** | Deferred — URL-only media metadata in Phase 2.1 |

Schema lives in `src/db/schema/`. Migrations in `drizzle/migrations/`. Do not connect public pages until explicitly scoped.

---

## Content types overview

| Type | Public use |
|------|------------|
| **Projects** | Home featured, `/projects`, detail |
| **Videos** | `/videos`, home optional, project relation |
| **Proof Library / Downloads** | `/proof`, home preview, downloads |
| **Timeline / Milestones** | About, optional home |
| **Updates / Build Notes** | `/updates`, home strip |
| **Page Sections** | Editable static section copy |
| **Media / Images** | Shared upload metadata |
| **GitHub repos** (optional) | Curated `/github` if not external-only |

---

## Projects

### Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | text | ✓ | |
| slug | slug | ✓ | Unique, URL-safe |
| shortDescription | text | ✓ | Card excerpt |
| fullDescription | rich text | ✓ | Detail page |
| projectType | enum/select | ✓ | Filter (e.g. automation, internal tool) |
| status | enum | ✓ | e.g. active, archived, experiment |
| featuredOnHome | boolean | | Max 3–6 displayed |
| featuredOnAbout | boolean | | |
| displayOrder | number | | Lower = first |
| techStack | string[] | ✓ | Tag pills |
| problemSolved | text | ✓ | |
| whatItDoes | text | ✓ | |
| parthsRole | text | ✓ | Ownership |
| githubUrl | URL | | Validate format |
| demoUrl | URL | | |
| videoUrl | URL | | Or relation to Videos |
| pdfDownloadUrl | URL/file | | |
| coverImage | media | | + focal point |
| galleryImages | media[] | | |
| published | boolean | ✓ | |
| hidden | boolean | | Excludes from public even if published |
| archived | boolean | | |

### Public query example

`published && !hidden && !archived && featuredOnHome` order by `displayOrder` limit 3.

---

## Videos

| Field | Type | Required |
|-------|------|----------|
| title | text | ✓ |
| slug | slug | ✓ |
| youtubeUrl | URL | ✓ |
| thumbnail | media | | Fallback: YouTube oEmbed thumb |
| category | enum | |
| year / date | date | |
| relatedProject | relation → Projects | |
| shortDescription | text | ✓ |
| featuredOnHome | boolean | |
| featuredOnAbout | boolean | |
| published | boolean | ✓ |

---

## Proof Library / Downloads

| Field | Type | Required |
|-------|------|----------|
| title | text | ✓ |
| slug | slug | ✓ |
| proofType | enum | ✓ | presentation, recognition, screenshot, pdf, technical-note, build-doc, etc. |
| fileUpload | file | | Or externalUrl |
| externalUrl | URL | | One of file or URL required |
| year / date | date | |
| relatedProject | relation | |
| relatedMilestone | relation → Timeline | |
| whatThisProves | text | ✓ |
| featuredOnHome | boolean | |
| featuredOnAbout | boolean | |
| published | boolean | ✓ |

---

## Timeline / Milestones

| Field | Type | Required |
|-------|------|----------|
| year / date | date | ✓ |
| title | text | ✓ |
| shortDescription | text | ✓ |
| category | enum | | e.g. hardware, software, recognition |
| relatedProof | relation | |
| relatedVideo | relation | |
| relatedProject | relation | |
| displayOrder | number | |
| published | boolean | ✓ |
| hidden | boolean | |

---

## Updates / Build Notes

| Field | Type | Required |
|-------|------|----------|
| title | text | ✓ |
| slug | slug | ✓ |
| updateType | enum | ✓ | new-project, repo, video, proof, feature, article |
| shortSummary | text | ✓ |
| body | rich text | | |
| relatedProject | relation | |
| relatedVideo | relation | |
| relatedProof | relation | |
| date | date | ✓ |
| featuredOnHome | boolean | |
| published | boolean | ✓ |

---

## Page Sections

For editable eyebrows/headlines without full page redeploy.

| Field | Type | Required |
|-------|------|----------|
| pageKey | text | ✓ | e.g. `home` |
| sectionKey | text | ✓ | e.g. `hero` |
| eyebrow | text | | |
| heading | text | | |
| body | rich text | | |
| ctaLabel | text | | |
| ctaUrl | text | | |
| image | media | | |
| displayOrder | number | |
| published | boolean | ✓ |

---

## Media / image strategy

### Shared media fields (attach to uploads or relations)

| Field | Purpose |
|-------|---------|
| image_url | CDN or `/public` path |
| image_alt | Accessibility |
| image_role | See roles below |
| image_focal_point | e.g. `50% 30%` for `object-position` |
| image_display_mode | cover / contain / native |
| image_caption | Optional visible caption |
| mobile_image_url_optional | Alternate crop for small screens |
| og_image_url_optional | Only for OG—not auto hero |

### Image roles

| Role | Use | Fit / behavior |
|------|-----|----------------|
| hero_atmospheric | Decorative hero bleed | Masked, may hide on mobile |
| section_artwork | Section decorative | Absolute layer, fade |
| card_thumbnail | Project/video/proof cards | 16:9 cover, focal point |
| video_thumbnail | Video cards | 16:9 |
| proof_document | Proof preview | contain in card; readable in modal |
| gallery_image | Project detail | Readable width |
| detail_image | Full-width detail | contain or max-height scroll |
| profile_photo | About | Square/4:5 |
| lifestyle_photo | Rare; not MVP | Optional About only if approved |
| og_social | Social share only | 1200×630; never reuse blindly as hero |

**Rule:** Do not use one `object-fit` for all roles (`06`, `08`).

---

## Admin auth (Phase 2.3B — implemented)

| Decision | Choice |
|----------|--------|
| **First admin** | One-time setup at `/admin/setup` when zero active admin users exist |
| **After setup** | `/admin/setup` locked — shows “Setup already completed” |
| **Login** | `/admin/login` for existing admins |
| **Sessions** | Database-backed opaque tokens (`admin_sessions`); raw token in httpOnly cookie only |
| **Password storage** | scrypt with per-user salt in `admin_users.password_hash` |
| **Env vars** | No `AUTH_SECRET`, no `ADMIN_EMAIL`, no `ADMIN_PASSWORD` |
| **Public signup** | Not available |

Tables: `admin_users`, `admin_sessions` (append-only migration). Protected routes: `/admin`, `/admin/help`. Logout: `/admin/logout`.

**Blob prefix rule (unchanged):** all Parth uploads must use `parthwebsite/` in the shared Think Big blob store. Upload UI not built in this phase.

---

## Projects CMS (Phase 2.4 — implemented)

| Item | Status |
|------|--------|
| **Admin routes** | `/admin/projects`, `/admin/projects/new`, `/admin/projects/[id]` |
| **CRUD** | Create, edit, list, search/filter, publish/hide/archive toggles |
| **Public connection** | Not connected — Home and `/projects` unchanged |
| **Seed data** | Not seeded in this phase |
| **Blob upload** | Not built — URL fields only; cover uses `cover_media_id` when media library exists |

---

## Remaining CMS admin modules (Phase 2.5 — implemented)

| Module | Admin routes | Notes |
|--------|--------------|-------|
| **Proof Library** | `/admin/proof`, `/admin/proof/new`, `/admin/proof/[id]` | proof_items CRUD; URL fields only |
| **Videos** | `/admin/videos`, `/admin/videos/new`, `/admin/videos/[id]` | YouTube URL required |
| **Timeline / Milestones** | `/admin/milestones`, `/admin/milestones/new`, `/admin/milestones/[id]` | No slug field |
| **Updates / Build Notes** | `/admin/updates`, `/admin/updates/new`, `/admin/updates/[id]` | update_type required |
| **Media Library** | `/admin/media`, `/admin/media/new`, `/admin/media/[id]` | URL-only metadata; no upload |

All modules: protected by admin session, list/search/filter, create/edit, publish/hide toggles where schema supports it. **No public page connection yet. No seed data. No Blob upload.**

Recommended data entry order: projects → proof/media/videos → milestones → updates.

---

## Admin UX guidance (Phase 2.6 — implemented)

Non-technical admin support added: dashboard workflow, per-module help boxes, field-level hints, empty-state guidance, practical Help page. Content entry should wait until Home/public pages are connected. Media remains URL-only; future Blob prefix remains `parthwebsite/`.

---

## Admin UX rules

### Layout

- **Left navigation** for admin areas: Dashboard, Projects, Videos, Proof, Timeline, Updates, Page Sections, Media  
- **List pages:** search, filters (published, featured, type), sort by updated/date  
- **Create/edit:** main column + **right rail** for publish status, featured flags, display order  

### Field grouping (example: Project edit)

1. Basics — title, slug, type, status  
2. Card — short description, cover, tech stack, display order  
3. Detail — full description, problem, what it does, Parth’s role  
4. Links — GitHub, demo, video, PDF  
5. Gallery  
6. Publishing — published, hidden, archived, featured flags  

### Behavior

| Rule | Detail |
|------|--------|
| Publish / unpublish | Clear toggle; public site respects flags immediately after deploy |
| Featured flags | Separate from published |
| Display order | Numeric or drag-sort on list |
| Media uploads | Type/size validation; progress indicator |
| Validation | Field-level errors; top summary on save fail |
| **No data loss** | Preserve all field values on validation/server error |
| Preview | Open public draft/preview URL when platform supports |
| UI quality | Product-like—not raw database labels, not giant empty editors |

### Save / error

- Manual save default; autosave only if safe in chosen CMS  
- Unsaved changes warning on navigate away  
- Failed upload must not clear unrelated form fields  

---

## Public CMS behavior

| Rule | Detail |
|------|--------|
| No fake cards | Never seed production with demo projects |
| Empty sections | **Hide** on public (home featured, proof preview, updates) |
| No broken grids | No empty card shells |
| Admin preview | May show placeholders; public must not |
| Draft content | Never on public routes |

Aligns with `src/components/home/*-section.tsx` pattern (return `null` when array empty).

---

## DB safety (when implemented)

- Preflight: `git status`, schema location, env, production DB access  
- **Append-only** migrations; no drop core tables without approval  
- Stop if production DB status unknown  
- No schema-dependent push without migration applied  

---

## Optional: GitHub repository records

If `/github` is curated on-site:

| Field | Notes |
|-------|-------|
| title, description, repoUrl, language, relatedProject, displayOrder, published | |

Otherwise link to approved GitHub profile only.

---

## Gaps / decisions needed

- Rich text sanitizer (server-safe on Vercel)  
- Additional admin users / SSO (deferred)  
- Image CDN (Vercel Blob for uploads — metadata table exists)  
- Draft preview URL strategy  
- Production Neon migrate approval workflow  
