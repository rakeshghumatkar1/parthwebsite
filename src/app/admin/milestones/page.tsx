import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { MilestoneFilters } from "@/components/admin/milestone-filters";
import { MilestoneTable } from "@/components/admin/milestone-table";
import { AdminCreateLink } from "@/components/admin/ui/admin-create-link";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { adminPageStackClass } from "@/lib/admin/admin-ui";
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
      <div className={adminPageStackClass}>
        <AdminPageHeader
          title={guidance.title}
          description={guidance.subtitle}
          action={<AdminCreateLink href="/admin/milestones/new">Create milestone</AdminCreateLink>}
        />
        <AdminCmsNotice variant="info" />
        <AdminModuleGuide module="milestones" />
        <MilestoneFilters filters={filters} projectOptions={projectOptions} />
        {items.length === 0 ? (
          <AdminEmptyState
            title={guidance.emptyTitle}
            description={guidance.emptyDescription}
            waitNote={guidance.emptyWaitNote}
            action={<AdminCreateLink href="/admin/milestones/new">Create milestone</AdminCreateLink>}
          />
        ) : (
          <MilestoneTable milestones={items} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
