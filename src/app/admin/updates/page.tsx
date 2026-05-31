import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { UpdateFilters } from "@/components/admin/update-filters";
import { UpdateTable } from "@/components/admin/update-table";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";
import { listUpdates } from "@/lib/admin/updates/queries";
import type { UpdateListFilters } from "@/lib/admin/updates/types";

export const metadata = {
  title: "Updates | Parth Admin",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readFilter(
  params: Record<string, string | string[] | undefined>,
  key: keyof UpdateListFilters,
): string | undefined {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

export default async function AdminUpdatesPage({ searchParams }: PageProps) {
  const admin = await requireAdminSession();
  const params = await searchParams;

  const filters: UpdateListFilters = {
    q: readFilter(params, "q"),
    updateType: readFilter(params, "updateType"),
    published: readFilter(params, "published"),
    hidden: readFilter(params, "hidden"),
    featuredOnHome: readFilter(params, "featuredOnHome"),
    relatedProjectId: readFilter(params, "relatedProjectId"),
  };

  const [updates, projectOptions] = await Promise.all([
    listUpdates(filters),
    getProjectOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Updates</h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">
              Manage timeline and activity records for future public pages.
            </p>
          </div>
          <Link
            href="/admin/updates/new"
            className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover"
          >
            Create update
          </Link>
        </div>

        <AdminHelpBox title="About updates">
          Updates can appear later on the Home timeline and a public Updates page.
          Link related projects, videos, or proof items when relevant. Public pages
          are not connected yet.
        </AdminHelpBox>

        <UpdateFilters filters={filters} projectOptions={projectOptions} />

        {updates.length === 0 ? (
          <AdminEmptyState
            title="No updates yet"
            description="Add the first timeline entry when you have approved content to share."
            action={
              <Link
                href="/admin/updates/new"
                className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
              >
                Create update
              </Link>
            }
          />
        ) : (
          <UpdateTable updates={updates} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
