# 14 — SEO, Metadata, and OG Workflow

## Purpose

SEO metadata, canonical URLs, Open Graph, robots, sitemap, and social preview workflow for the Parth microsite—without turning the site into an SEO-agency landing page.

---

## SEO positioning note

Metadata should describe **AI software systems, automation, and workflow applications**—not digital marketing, lead generation, or SEO services.

Avoid keyword stuffing, fake claims, and banned tone words in titles/descriptions (`01`, `02`).

---

## Domain and canonical (gap)

**Confirmed:** Production domain is **not yet finalized**.

| Item | Status |
|------|--------|
| Production URL | TBD (e.g. `https://ai.thinkbigdigital.co` or Vercel default) |
| Canonical base | Must be set once domain is confirmed |
| www vs apex | Choose one; redirect the other intentionally |

**Rule:** When domain is confirmed, update:

- `metadataBase` in `src/app/layout.tsx`  
- All canonical URLs  
- `sitemap.xml` host  
- OG absolute URLs  

Until then, Vercel preview/production URL may be used temporarily—document in commit/deploy notes.

---

## Page title rules

| Rule | Example |
|------|---------|
| Unique per page | No duplicate titles |
| Brand suffix | `\| Think Big AI Systems` or similar (consistent) |
| Length | ~50–60 characters ideal; do not truncate mid-word awkwardly |
| Home (confirmed) | `Think Big AI Systems \| AI Software, Automation, and Data Workflow Systems` |
| Inner pages | `{Page purpose} \| Think Big AI Systems` |
| Project detail | `{Project title} \| Projects \| Think Big AI Systems` |

**Avoid:** “Best,” “#1,” “world-class,” prodigy references in titles.

---

## Meta description rules

| Rule | Detail |
|------|--------|
| One per page | Unique, human-readable |
| Length | ~150–160 characters target |
| Content | What the page offers + proof/direction cue |
| Home (confirmed) | AI software systems, automation, internal tools, data platforms, workflow applications… Think Big Digital Solutions |
| No fake proof | Do not claim clients or metrics not documented |

---

## Canonical URL rule

- Each public Live page has exactly one canonical URL.  
- Use absolute URLs with confirmed production domain.  
- Paginated/filter pages: canonical to main listing or self—decide per implementation (document in page PR).  

---

## Open Graph

| Tag | Rule |
|-----|------|
| `og:title` | May match title or slightly shorter headline |
| `og:description` | May match meta description |
| `og:type` | `website` (articles `article` for Updates if needed) |
| `og:url` | Canonical page URL |
| `og:image` | Dedicated OG asset—see below |
| `og:site_name` | Think Big AI Systems |

### OG image rules

| Rule | Detail |
|------|--------|
| Dimensions | **1200 × 630 px** (1.91:1) |
| Storage | `public/social/` or CMS `og_social` role |
| Content | Brand + clear readable title; navy/blue palette |
| **Do not** | Reuse homepage mock, hero diagram screenshot, or project card thumb blindly |
| Text | Minimal text on image; full copy stays in HTML metadata |
| Test | After deploy—see Social preview testing |

---

## Twitter / X card

If used (recommended for link shares):

| Tag | Value |
|-----|-------|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Align with OG title |
| `twitter:description` | Align with OG description |
| `twitter:image` | Same OG image URL |

Add when domain and OG asset are stable.

---

## Robots.txt

**Goals**

- Allow indexing of **public Live** pages  
- Do not block assets needed for rendering  

**When to disallow**

- `/admin`, `/api` draft routes, preview routes  
- Staging/preview deployments—use `noindex` meta or Vercel deployment protection  

**Unfinished pages**

- Routes not Live should **not** appear in sitemap  
- Prefer **not linked** + **noindex** if route must exist for dev preview  

---

## sitemap.xml

**Include**

- `/` and all **Approved/Live** static routes  
- CMS routes: projects, videos, proof slugs (published only)  

**Exclude**

- Admin, API, draft, 404, planned pages  
- Filter query URLs unless SEO strategy says otherwise  

**Generation**

- Next.js `app/sitemap.ts` or build-time script when routes exist  
- Regenerate when CMS publishes new slugs  

---

## Per-page metadata checklist (before Live)

- [ ] Unique `title`  
- [ ] Unique `description`  
- [ ] `metadataBase` / canonical correct  
- [ ] OG title, description, image  
- [ ] One H1 on page matches intent  
- [ ] Page linked from nav only if Approved/Live (`11`)  

---

## Unfinished page rule

| State | SEO behavior |
|-------|----------------|
| Planned / In Progress / Built (not approved) | Not in sitemap; not in nav; noindex if reachable |
| Approved / Live | Indexable unless intentionally noindex (e.g. thank-you page) |

---

## Social preview testing

After deployment to production domain:

1. Share debugger (Facebook/Meta, LinkedIn, Twitter/X if applicable)  
2. Confirm image, title, description  
3. Allow cache delay (re-scrape if needed)  
4. Test home + one inner page + one CMS detail page when available  

**Current:** Home has basic `openGraph` in `layout.tsx`—expand when OG image asset exists.

---

## Structured data (future)

- Optional `Person` or `Organization` JSON-LD for Parth/Think Big—only with approved facts  
- No fake `AggregateRating` or review schema  
- Defer until Batch 3+ implementation approved  

---

## Assumptions

- English-only `lang="en"` on `<html>`  
- Next.js App Router `export const metadata` pattern  

---

## Gaps / decisions needed

- Final production domain  
- OG image design file  
- Indexing policy for `/updates` thin pages  
- hreflang (N/A unless multi-language)  
