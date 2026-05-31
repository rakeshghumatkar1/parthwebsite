import { AdminShell } from "@/components/admin/admin-shell";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminBadge } from "@/components/admin/ui/admin-badge";
import {
  BLOB_PREFIX_RULE,
  CMS_CONTENT_CAUTION,
  FIELD_HINTS,
  MODULE_GUIDANCE,
  WORKFLOW_STEPS,
} from "@/lib/admin/cms-guidance";
import { adminCardClass, adminPageStackClass } from "@/lib/admin/admin-ui";
import { requireAdminSession } from "@/lib/admin/page-guard";

export const metadata = {
  title: "Help | Parth Admin",
};

function HelpSection({
  title,
  children,
  variant,
}: {
  title: string;
  children: React.ReactNode;
  variant?: "caution";
}) {
  const className =
    variant === "caution"
      ? "rounded-lg border border-amber-200 bg-amber-50/80 p-4"
      : `${adminCardClass} p-4`;

  return (
    <section className={className}>
      <h2 className="text-sm font-semibold text-tb-text">{title}</h2>
      <div className="mt-2 space-y-2 text-sm text-tb-text-muted">{children}</div>
    </section>
  );
}

export default async function AdminHelpPage() {
  const admin = await requireAdminSession();

  return (
    <AdminShell admin={admin}>
      <div className={`mx-auto max-w-3xl ${adminPageStackClass}`}>
        <AdminPageHeader
          title="Help"
          description="Practical guide for managing Parth website content. Written for non-technical admins — you should not need to guess what each field means."
        />

        <HelpSection title="Current CMS status" variant="caution">
          <p className="text-amber-950">{CMS_CONTENT_CAUTION}</p>
        </HelpSection>

        <HelpSection title="What is ready">
          <ul className="list-disc space-y-1 pl-4">
            <li>Admin login and secure sessions</li>
            <li>Projects, Proof, Videos, Milestones, Updates, Media Library CRUD</li>
            <li>List, search, filter, create, edit, publish/hide controls</li>
            <li>Public pages live at /projects, /proof, /videos, /updates, /about-parth</li>
            <li>Media Library: URL records and Blob upload under parthwebsite/</li>
          </ul>
        </HelpSection>

        <HelpSection title="Known limitations">
          <ul className="list-disc space-y-1 pl-4">
            <li>Home proof/updates sections still use static content until featured items are set</li>
            <li>No Blob file browser or delete — only Neon media records are listed</li>
            <li>No automatic seed data — content must be entered manually when approved</li>
          </ul>
        </HelpSection>

        <HelpSection title="Recommended content entry order">
          <ol className="list-decimal space-y-1.5 pl-4">
            {WORKFLOW_STEPS.map((step) => (
              <li key={step.step}>
                <span className="font-medium text-tb-text">{step.label}</span>
                {" — "}
                {step.note}
              </li>
            ))}
          </ol>
        </HelpSection>

        <HelpSection title="Publishing flags">
          <div className="flex flex-wrap gap-2">
            <AdminBadge variant="success">Published</AdminBadge>
            <AdminBadge variant="warning">Hidden</AdminBadge>
            <AdminBadge variant="neutral">Archived</AdminBadge>
            <AdminBadge variant="info">Featured</AdminBadge>
            <AdminBadge variant="draft">Draft</AdminBadge>
          </div>
          <ul className="mt-3 list-disc space-y-1.5 pl-4">
            <li><strong>Published</strong> — {FIELD_HINTS.published}</li>
            <li><strong>Hidden</strong> — {FIELD_HINTS.hidden}</li>
            <li><strong>Archived</strong> (projects) — {FIELD_HINTS.archived}</li>
            <li><strong>Featured on Home</strong> — {FIELD_HINTS.featuredOnHome}</li>
            <li><strong>Featured on About</strong> — {FIELD_HINTS.featuredOnAbout}</li>
            <li><strong>Display order</strong> — {FIELD_HINTS.displayOrder}</li>
          </ul>
        </HelpSection>

        <HelpSection title="Relation fields">
          <ul className="list-disc space-y-1.5 pl-4">
            <li><strong>Related project</strong> — {FIELD_HINTS.relatedProjectId}</li>
            <li><strong>Related proof</strong> — {FIELD_HINTS.relatedProofId}</li>
            <li><strong>Related video</strong> — {FIELD_HINTS.relatedVideoId}</li>
            <li><strong>Related milestone</strong> — {FIELD_HINTS.relatedMilestoneId}</li>
          </ul>
        </HelpSection>

        <HelpSection title="Media and Blob rule">
          <p>
            Media Library supports approved public URLs and admin file upload to
            Vercel Blob. Uploaded files go to the shared thinkbigdigital-blob
            store under parthwebsite/ only.
          </p>
          <AdminHelpBox title="Upload prefix and safety">{BLOB_PREFIX_RULE}</AdminHelpBox>
          <ul className="list-disc space-y-1 pl-4">
            <li>Use image alt text for accessibility.</li>
            <li>PDFs are allowed only for public downloads and proof.</li>
            <li>Do not upload private or sensitive files.</li>
            <li>Other website Blob files must never be touched or listed.</li>
            <li>Blob delete is not implemented — media records can be edited but files remain in Blob.</li>
          </ul>
        </HelpSection>

        <div className="grid gap-3 sm:grid-cols-2">
          {(
            Object.entries(MODULE_GUIDANCE) as Array<
              [keyof typeof MODULE_GUIDANCE, (typeof MODULE_GUIDANCE)[keyof typeof MODULE_GUIDANCE]]
            >
          ).map(([key, mod]) => (
            <section key={key} className={`${adminCardClass} p-4`}>
              <h2 className="text-sm font-semibold text-tb-text">{mod.title}</h2>
              <p className="mt-1 text-xs text-tb-text-muted">{mod.subtitle}</p>
              <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs text-tb-text-muted">
                {mod.listHelpBullets.slice(0, 3).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <HelpSection title="What not to do">
          <ul className="list-disc space-y-1 pl-4">
            <li>Do not invent GitHub, demo, video, or download links</li>
            <li>Do not upload private, sensitive, or non-public files</li>
            <li>Do not add final launch content before it is approved</li>
            <li>Do not add random blog-style updates unrelated to real project progress</li>
          </ul>
        </HelpSection>

        <HelpSection title="Troubleshooting">
          <dl className="space-y-2">
            <div>
              <dt className="font-medium text-tb-text">Cannot see a module</dt>
              <dd className="mt-0.5">Use the left sidebar. All modules are listed there when logged in.</dd>
            </div>
            <div>
              <dt className="font-medium text-tb-text">Validation error on save</dt>
              <dd className="mt-0.5">Read the red messages under each field. Required fields must be filled. URLs must be valid http/https links.</dd>
            </div>
            <div>
              <dt className="font-medium text-tb-text">Duplicate slug error</dt>
              <dd className="mt-0.5">Each slug must be unique. Edit the slug to a different lowercase hyphenated value.</dd>
            </div>
            <div>
              <dt className="font-medium text-tb-text">Logged out unexpectedly</dt>
              <dd className="mt-0.5">Sessions expire after seven days. Sign in again at /admin/login.</dd>
            </div>
          </dl>
        </HelpSection>

        <HelpSection title="Signed in as">
          <p>{admin.email}</p>
        </HelpSection>
      </div>
    </AdminShell>
  );
}
