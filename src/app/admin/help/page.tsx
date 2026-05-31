import { AdminShell } from "@/components/admin/admin-shell";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import {
  BLOB_PREFIX_RULE,
  CMS_CONTENT_CAUTION,
  FIELD_HINTS,
  MODULE_GUIDANCE,
  WORKFLOW_STEPS,
} from "@/lib/admin/cms-guidance";
import { requireAdminSession } from "@/lib/admin/page-guard";

export const metadata = {
  title: "Help | Parth Admin",
};

export default async function AdminHelpPage() {
  const admin = await requireAdminSession();

  return (
    <AdminShell admin={admin}>
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            How to use this CMS
          </h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Practical guide for managing Parth website content. Written for
            non-technical admins — you should not need to guess what each field
            means.
          </p>
        </div>

        <section className="space-y-3 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-lg font-semibold text-amber-950">Current CMS status</h2>
          <p className="text-sm text-amber-900">{CMS_CONTENT_CAUTION}</p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">What is already built</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
            <li>Admin login and secure sessions</li>
            <li>Projects, Proof Library, Videos, Milestones, Updates, Media Library CRUD</li>
            <li>List, search, filter, create, edit, publish/hide controls</li>
            <li>Media Library is URL-only (paste links — no upload button)</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">What is not connected yet</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
            <li>Home page still uses static content — not CMS-driven</li>
            <li>No public Projects, Proof, Videos, or Updates pages</li>
            <li>No Blob file upload or file browser</li>
            <li>No automatic seed data — content must be entered manually when approved</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Recommended content entry order</h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-tb-text-muted">
            {WORKFLOW_STEPS.map((step) => (
              <li key={step.step}>
                <strong>{step.label}</strong> — {step.note}
              </li>
            ))}
          </ol>
        </section>

        {(
          Object.entries(MODULE_GUIDANCE) as Array<
            [keyof typeof MODULE_GUIDANCE, (typeof MODULE_GUIDANCE)[keyof typeof MODULE_GUIDANCE]]
          >
        ).map(([key, mod]) => (
          <section
            key={key}
            className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6"
          >
            <h2 className="text-lg font-semibold">{mod.title}</h2>
            <p className="text-sm text-tb-text-muted">{mod.subtitle}</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
              {mod.listHelpBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="text-sm font-medium">Where it appears later:</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
              {mod.whereAppears.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </section>
        ))}

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Publishing flags explained</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-tb-text-muted">
            <li><strong>Published</strong> — {FIELD_HINTS.published}</li>
            <li><strong>Hidden</strong> — {FIELD_HINTS.hidden}</li>
            <li><strong>Archived</strong> (projects) — {FIELD_HINTS.archived}</li>
            <li><strong>Featured on Home</strong> — {FIELD_HINTS.featuredOnHome}</li>
            <li><strong>Featured on About</strong> — {FIELD_HINTS.featuredOnAbout}</li>
            <li><strong>Display order</strong> — {FIELD_HINTS.displayOrder}</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Relation fields explained</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-tb-text-muted">
            <li><strong>Related project</strong> — {FIELD_HINTS.relatedProjectId}</li>
            <li><strong>Related proof</strong> — {FIELD_HINTS.relatedProofId}</li>
            <li><strong>Related video</strong> — {FIELD_HINTS.relatedVideoId}</li>
            <li><strong>Related milestone</strong> — {FIELD_HINTS.relatedMilestoneId}</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Media and Blob rule</h2>
          <p className="text-sm text-tb-text-muted">
            Media Library is URL-only today. Paste approved public URLs for
            images, PDFs, and documents. Upload will be added later.
          </p>
          <AdminHelpBox title="Future upload prefix">{BLOB_PREFIX_RULE}</AdminHelpBox>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">What not to do</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
            <li>Do not invent GitHub, demo, video, or download links</li>
            <li>Do not upload files — there is no upload UI yet</li>
            <li>Do not add final launch content before public pages are connected</li>
            <li>Do not add random blog-style updates unrelated to real project progress</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Troubleshooting</h2>
          <dl className="space-y-3 text-sm text-tb-text-muted">
            <div>
              <dt className="font-medium text-tb-text">Cannot see a module</dt>
              <dd className="mt-1">Use the left sidebar. All modules are listed there when logged in.</dd>
            </div>
            <div>
              <dt className="font-medium text-tb-text">Validation error on save</dt>
              <dd className="mt-1">Read the red messages under each field. Required fields must be filled. URLs must be valid http/https links.</dd>
            </div>
            <div>
              <dt className="font-medium text-tb-text">Duplicate slug error</dt>
              <dd className="mt-1">Each slug must be unique. Edit the slug to a different lowercase hyphenated value.</dd>
            </div>
            <div>
              <dt className="font-medium text-tb-text">Logged out unexpectedly</dt>
              <dd className="mt-1">Sessions expire after seven days. Sign in again at /admin/login.</dd>
            </div>
          </dl>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Signed in as</h2>
          <p className="text-sm text-tb-text-muted">{admin.email}</p>
        </section>
      </div>
    </AdminShell>
  );
}
