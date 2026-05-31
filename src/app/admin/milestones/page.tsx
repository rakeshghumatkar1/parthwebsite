import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { MilestoneFilters } from "@/components/admin/milestone-filters";
import { MilestoneTable } from "@/components/admin/milestone-table";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { listMilestones } from "@/lib/admin/milestones/queries";
import type { MilestoneListFilters } from "@/lib/admin/milestones/types";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "Milestones | Parth Admin",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readFilter(
  params: Record<string, string | string[] | undefined>,
  key: keyof MilestoneListFilters,
): string | undefined {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

export default async function AdminMilestonesPage({ searchParams }: PageProps) {
  const admin = await requireAdminSession();
  const params = await searchParams;

  const filters: MilestoneListFilters = {
    q: readFilter(params, "q"),
    category: readFilter(params, "category"),
    published: readFilter(params, "published"),
    hidden: readFilter(params, "hidden"),
    featuredOnHome: readFilter(params, "featuredOnHome"),
    featuredOnAbout: readFilter(params, "featuredOnAbout"),
    relatedProjectId: readFilter(params, "relatedProjectId"),
  };

  const [milestones, projectOptions] = await Promise.all([
    listMilestones(filters),
    getProjectOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Milestones</h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">
              Manage timeline milestone records for future About and Home pages.
            </p>
          </div>
          <Link
            href="/admin/milestones/new"
            className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover"
          >
            Create milestone
          </Link>
        </div>

        <AdminHelpBox title="About milestones">
          Milestones can appear later on the About Parth timeline, Home page, and
          project detail pages. Public pages are not connected yet.
        </AdminHelpBox>

        <MilestoneFilters filters={filters} projectOptions={projectOptions} />

        {milestones.length === 0 ? (
          <AdminEmptyState
            title="No milestones yet"
            description="Add the first milestone to build the timeline."
            action={
              <Link
                href="/admin/milestones/new"
                className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
              >
                Create milestone
              </Link>
            }
          />
        ) : (
          <MilestoneTable
            milestones={milestones}
            projectOptions={projectOptions}
          />
        )}
      </div>
    </AdminShell>
  );
}
