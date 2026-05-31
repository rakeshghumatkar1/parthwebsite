import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { UpdateFilters } from "@/components/admin/update-filters";
import { UpdateTable } from "@/components/admin/update-table";
import { MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
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
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{guidance.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">{guidance.subtitle}</p>
          </div>
          <Link href="/admin/updates/new" className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white hover:bg-tb-blue-hover">Create update</Link>
        </div>
        <AdminCmsNotice />
        <AdminModuleGuide module="updates" />
        <UpdateFilters filters={filters} projectOptions={projectOptions} />
        {items.length === 0 ? (
          <AdminEmptyState title={guidance.emptyTitle} description={guidance.emptyDescription} waitNote={guidance.emptyWaitNote} action={<Link href="/admin/updates/new" className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover">Create update</Link>} />
        ) : (
          <UpdateTable updates={items} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
