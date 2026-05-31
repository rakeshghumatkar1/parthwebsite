import { AdminShell } from "@/components/admin/admin-shell";
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
          <h1 className="text-2xl font-semibold tracking-tight">Admin help</h1>
          <p className="mt-2 text-sm text-tb-text-muted">
            Guidance for managing Parth site content from this admin area.
          </p>
        </div>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Active CMS modules</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-tb-text-muted">
            <li><strong>Projects</strong> — portfolio records for Home, Projects page, About, and detail pages</li>
            <li><strong>Proof Library</strong> — repositories, screenshots, PDFs, recognitions, and approved external links</li>
            <li><strong>Videos</strong> — YouTube/demo URLs for Videos page, project details, and featured sections</li>
            <li><strong>Timeline / Milestones</strong> — About story, recognitions, and build moments</li>
            <li><strong>Updates / Build Notes</strong> — progress posts and technical notes</li>
            <li><strong>Media Library</strong> — URL-only metadata for images, documents, and thumbnails (no upload yet)</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Recommended content entry order</h2>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-tb-text-muted">
            <li>Add projects first</li>
            <li>Add proof items, media URLs, and videos</li>
            <li>Add milestones for timeline/story context</li>
            <li>Add updates/build notes as progress is recorded</li>
          </ol>
          <p className="text-sm text-tb-text-muted">
            Use only approved real URLs. Do not invent GitHub, demo, video, or download links.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Publishing flags</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
            <li><strong>Published</strong> — ready for future public display</li>
            <li><strong>Hidden</strong> — excluded from public views even when published</li>
            <li><strong>Featured on Home / About</strong> — prepares content for future featured sections</li>
            <li><strong>Display order</strong> — lower numbers appear first in lists</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">First admin setup</h2>
          <p className="text-sm leading-relaxed text-tb-text-muted">
            The first admin account is created once at{" "}
            <code className="rounded bg-tb-surface-muted px-1 py-0.5 text-xs">/admin/setup</code>.
            After one active admin exists, setup is locked. No public signup.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Sessions and security</h2>
          <p className="text-sm leading-relaxed text-tb-text-muted">
            Database-backed sessions with httpOnly cookies. No AUTH_SECRET or
            ADMIN_EMAIL/ADMIN_PASSWORD env variables.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Blob storage rule</h2>
          <p className="text-sm leading-relaxed text-tb-text-muted">
            All future Parth uploads must use the{" "}
            <code className="rounded bg-tb-surface-muted px-1 py-0.5 text-xs">parthwebsite/</code>{" "}
            prefix in the shared Think Big blob store. Upload UI is not built yet.
            Media Library is URL-only for now.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">What is not connected yet</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
            <li>Home page still uses static launch content — not CMS-driven</li>
            <li>No public Projects, Proof, Videos, or Updates pages</li>
            <li>No Blob upload or file browser</li>
            <li>No seed data — content must be entered manually</li>
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
