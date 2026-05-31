import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { MilestoneFilters } from "@/components/admin/milestone-filters";
import { MilestoneTable } from "@/components/admin/milestone-table";
import { MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { listMilestones } from "@/lib/admin/milestones/queries";
import type { MilestoneListFilters } from "@/lib/admin/milestones/types";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";

export const metadata = { title: "Timeline / Milestones | Parth Admin" };

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function readFilter(params: Record<string, string | string[] | undefined>, key: keyof MilestoneListFilters) {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

const guidance = MODULE_GUIDANCE.milestones;

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
  const [items, projectOptions] = await Promise.all([listMilestones(filters), getProjectOptions()]);

  return (
    <AdminShell admin={admin}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{guidance.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">{guidance.subtitle}</p>
          </div>
          <Link href="/admin/milestones/new" className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-tb-blue-hover">Create milestone</Link>
        </div>
        <AdminCmsNotice />
        <AdminModuleGuide module="milestones" />
        <MilestoneFilters filters={filters} projectOptions={projectOptions} />
        {items.length === 0 ? (
          <AdminEmptyState title={guidance.emptyTitle} description={guidance.emptyDescription} waitNote={guidance.emptyWaitNote} action={<Link href="/admin/milestones/new" className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover">Create milestone</Link>} />
        ) : (
          <MilestoneTable milestones={items} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
