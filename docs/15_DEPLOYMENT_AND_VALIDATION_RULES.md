# 15 — Deployment and Validation Rules

## Purpose

Validation, commit, push, deployment verification, and failure handling for the Parth microsite (Next.js 16 on Vercel).

---

## Validation commands

Run **before audit sign-off** and **before commit** when commit is requested:

```bash
npx tsc --noEmit
npm run lint -- --max-warnings 0
npm run build
```

| Command | Purpose |
|---------|---------|
| `tsc --noEmit` | Type errors |
| `npm run lint` | ESLint (project uses `eslint` script) |
| `npm run build` | Production build + static generation |

**If scripts differ:** Report exact `package.json` scripts and run the nearest equivalent. Do not skip validation.

### DB / CMS validation (when applicable)

Additional checks when schema/CMS is in scope:

- Migration applies cleanly locally  
- Admin login works (when admin exists)  
- Public routes still build without CMS data  
- No secret keys in repo  

**DB foundation scripts (Phase 2.1+):**

```bash
npm run db:generate    # generate migration from schema changes
npm run db:migrate     # apply migrations (dev/preview only until approved for prod)
npm run db:preflight   # verify DATABASE_URL and connectivity
npm run db:studio      # Drizzle Studio (optional)
```

**Local env:** DB scripts load `.env.local` automatically via `node --env-file=.env.local` (Node 20+). Vercel/production uses project env vars directly — no `.env.local` file required.

**Production DB safety:** Do not run `db:migrate` against production without explicit approval. Use `DATABASE_URL_UNPOOLED` for migrations when Neon provides a direct endpoint.

**Blob upload validation (Phase 2.9+):**

- `/admin/media/new` offers URL and Upload modes  
- Unauthenticated upload returns 401  
- Upload path starts with `parthwebsite/`  
- Unsupported types and oversized files rejected  
- Successful upload creates Neon media record  
- Media list shows Uploaded vs External URL; no Blob store browser  
- BLOB_READ_WRITE_TOKEN stays server-only  
- No Blob delete; no public page changes  

**Remaining CMS public pages validation (Phase 2.8+):**

- `/proof`, `/videos`, `/updates`, `/about-parth` load with clean empty states when no published records  
- Public queries enforce `published && !hidden` (projects also `!archived`)  
- No seed/fake content added unless explicitly scoped  
- No Blob upload code  
- Home page unchanged except shared layout/nav  

**Projects public validation (Phase 2.7+):**

- Home featured section uses CMS when featured published projects exist; otherwise static `launchProjects` fallback  
- `/projects` loads with empty state when no published projects  
- `/projects/[slug]` returns not found for draft/hidden/archived/missing slugs  
- Public queries enforce `published && !hidden && !archived`  
- No seed/fake project data added unless explicitly scoped  
- No Blob upload code  

**Admin UX validation (Phase 2.6+):**

- Dashboard explains CMS workflow and content-entry caution  
- Each module list/create/edit has help text and field hints  
- Help page documents modules, flags, relations, Blob rule, troubleshooting  
- No seed data; no public page changes  

**Remaining CMS modules validation (Phase 2.5+):**

- `/admin/proof`, `/admin/videos`, `/admin/milestones`, `/admin/updates`, `/admin/media` routes work when logged in  
- Unauthenticated access redirects to login  
- Media is URL-only — no Blob upload code  
- No public page changes; no seed data added unless explicitly scoped  

**Projects CMS validation (Phase 2.4+):**

- `/admin/projects` list, create, and edit routes work when logged in  
- Unauthenticated access redirects to login  
- No public Home or `/projects` route changes  
- No seed/fake project data added unless explicitly scoped  

**Admin auth validation (Phase 2.3B+):**

- `admin_users` and `admin_sessions` tables exist after migration  
- First admin setup works once at `/admin/setup`  
- Login creates session; logout clears session and cookie  
- `/admin` and `/admin/help` require login  
- No `AUTH_SECRET` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` in env  

```bash
npm run db:preflight   # includes admin table check when migrated
```

**Static-only / schema-only commits:** DB validation not required if no public route imports `getDb()`.

---

## Preflight (before implementation)

| Check | Action |
|-------|--------|
| `git status` | Know dirty files |
| Task classification | static UI vs CMS vs DB (`08`) |
| Docs read | Report per `07` |
| Scope | List allowed paths |

---

## Audit (before commit when requested)

Apply `09_AUDIT_CHECKLIST.md` for scoped work.

**Minimum for public UI:** positioning, visual, layout, proof/CMS-readiness, responsive, technical.

**Result:** Pass / Fail / Pass with follow-up.

---

## Commit rule

Commit **only if all apply**:

| Criterion | Required |
|-----------|----------|
| Validation | tsc, lint, build pass |
| Audit | Pass or Pass with follow-up (no must-fix blockers) |
| Scope | Only intended files changed |
| Links | No new broken nav/footer links; home anchors use root-aware `/#…` URLs from header/footer |
| Exposure | No unfinished pages added to nav |
| Public filters | Listing filters hidden when empty/low content; shown at ≥ 6 records or with active query params |
| Proof integrity | No fake projects, proof, metrics, or URLs |
| Surprises | No unexpected package/DB/auth file changes |

### Commit message

- Complete sentences; explain **why**  
- Do not commit `.env`, credentials, or local-only artifacts  

### Git safety (user rules)

- No force push to `main` without explicit request  
- No `--no-verify` unless requested  
- No amend unless user rules allow  

**Docs-only tasks:** Commit only when user requests (e.g. Batch doc creation).

---

## Push rule

- Push **only when explicitly instructed** by user or prompt  
- Use `git push -u origin <branch>` when new branch  
- Verify remote after push  

---

## Deployment rule

**Confirmed path:** GitHub `rakeshghumatkar1/parthwebsite` → Vercel (auto-deploy on `main` push).

After push (when deployment expected):

| Check | Action |
|-------|--------|
| Vercel build | Dashboard or GitHub deployment status — success |
| Live URL | Load production URL (e.g. `https://parthwebsite.vercel.app` until custom domain) |
| Mobile | Narrow viewport smoke test |
| Key interactions | CTAs, anchors, header |
| Metadata | Title/description visible; OG when configured |
| CMS sections | Still hidden if no data (no empty cards) |

Custom domain: re-verify canonical and OG after DNS cutover (`14`).

---

## Failure rule

If **any validation command fails**:

1. **Do not commit**  
2. **Do not push**  
3. **Do not deploy** (fix first)  
4. Report **exact error output** (command + message)  
5. Explain **likely cause** in plain language  
6. Suggest **safest fix** (minimal diff)  

If **audit fails** (must-fix items):

- Fix or report blocker; do not commit until resolved or user accepts Pass with follow-up scope  

If **commit hook fails**:

- Do not amend unless user rules allow; fix and **new commit**  

---

## Environment and secrets

- Never commit `.env`, `.env.local`, API keys  
- Vercel env vars for CMS/auth when added—document in deploy notes, not in repo  

---

## Rollback

- Revert commit on `main` or redeploy prior Vercel deployment if production broken  
- Report incident in final summary  

---

## Current project baseline

| Item | State |
|------|--------|
| Branch | `main` |
| Deploy | Vercel connected |
| Validation | Required for app changes |
| CMS/DB | Not in production yet |

---

## Gaps / decisions needed

- Staging branch / preview URL policy  
- CI gate (GitHub Actions) — optional future  
- `lint --max-warnings 0` if eslint config warns on legacy issues  
