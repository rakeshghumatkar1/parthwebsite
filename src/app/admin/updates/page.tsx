import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { UpdateFilters } from "@/components/admin/update-filters";
import { UpdateTable } from "@/components/admin/update-table";
import { AdminCreateLink } from "@/components/admin/ui/admin-create-link";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { adminPageStackClass } from "@/lib/admin/admin-ui";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";
import { listUpdates } from "@/lib/admin/updates/queries";
import type { UpdateListFilters } from "@/lib/admin/updates/types";

export const metadata = { title: "Updates / Build Notes | Parth Admin" };

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function readFilter(params: Record<string, string | string[] | undefined>, key: keyof UpdateListFilters) {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

const guidance = MODULE_GUIDANCE.updates;

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
  const [items, projectOptions] = await Promise.all([listUpdates(filters), getProjectOptions()]);

  return (
    <AdminShell admin={admin}>
      <div className={adminPageStackClass}>
        <AdminPageHeader
          title={guidance.title}
          description={guidance.subtitle}
          action={<AdminCreateLink href="/admin/updates/new">Create update</AdminCreateLink>}
        />
        <AdminCmsNotice variant="info" />
        <AdminModuleGuide module="updates" />
        <UpdateFilters filters={filters} projectOptions={projectOptions} />
        {items.length === 0 ? (
          <AdminEmptyState
            title={guidance.emptyTitle}
            description={guidance.emptyDescription}
            waitNote={guidance.emptyWaitNote}
            action={<AdminCreateLink href="/admin/updates/new">Create update</AdminCreateLink>}
          />
        ) : (
          <UpdateTable updates={items} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
