import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { getCurrentAdmin } from "@/lib/admin/auth";

export const metadata = {
  title: "Help | Parth Admin",
};

export default async function AdminHelpPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

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
          <h2 className="text-lg font-semibold">What this admin manages</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
            <li>Projects — portfolio work shown on the public site</li>
            <li>Proof Library — categories and proof items</li>
            <li>Videos — demos and walkthroughs</li>
            <li>Timeline / Milestones — build progress markers</li>
            <li>Updates / Build Notes — short progress posts</li>
            <li>Media Library — images and files for CMS content</li>
          </ul>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">First admin setup</h2>
          <p className="text-sm leading-relaxed text-tb-text-muted">
            The first admin account is created once at{" "}
            <code className="rounded bg-tb-surface-muted px-1 py-0.5 text-xs">
              /admin/setup
            </code>
            . After one active admin exists, setup is locked. There is no public
            signup and no default password. Additional admins are not part of
            this phase.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Sessions and security</h2>
          <p className="text-sm leading-relaxed text-tb-text-muted">
            Sign-in uses database-backed sessions. A random session token is
            stored in an httpOnly cookie; only a hash of that token is saved in
            the database. Sessions expire after seven days. Logout removes the
            session record and clears the cookie. No{" "}
            <code className="rounded bg-tb-surface-muted px-1 py-0.5 text-xs">
              AUTH_SECRET
            </code>{" "}
            or{" "}
            <code className="rounded bg-tb-surface-muted px-1 py-0.5 text-xs">
              ADMIN_EMAIL
            </code>
            /{" "}
            <code className="rounded bg-tb-surface-muted px-1 py-0.5 text-xs">
              ADMIN_PASSWORD
            </code>{" "}
            environment variables are used.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">Blob storage rule</h2>
          <p className="text-sm leading-relaxed text-tb-text-muted">
            All Parth uploads must use the{" "}
            <code className="rounded bg-tb-surface-muted px-1 py-0.5 text-xs">
              parthwebsite/
            </code>{" "}
            prefix inside the shared Think Big blob store. Upload UI is not
            built yet — do not upload from admin until that feature ships.
          </p>
        </section>

        <section className="space-y-3 rounded-lg border border-tb-navy-border bg-tb-surface p-6">
          <h2 className="text-lg font-semibold">What is not connected yet</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-tb-text-muted">
            <li>Home page still uses static launch content — not CMS-driven</li>
            <li>No CRUD screens for projects, proof, videos, or updates yet</li>
            <li>No blob upload or media picker yet</li>
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
