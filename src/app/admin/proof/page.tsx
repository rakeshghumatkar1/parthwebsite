import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminModuleGuide } from "@/components/admin/admin-module-guide";
import { ProofFilters } from "@/components/admin/proof-filters";
import { ProofTable } from "@/components/admin/proof-table";
import { AdminCreateLink } from "@/components/admin/ui/admin-create-link";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { MODULE_GUIDANCE } from "@/lib/admin/cms-guidance";
import { adminPageStackClass } from "@/lib/admin/admin-ui";
import { requireAdminSession } from "@/lib/admin/page-guard";
import { listProofItems } from "@/lib/admin/proof/queries";
import type { ProofListFilters } from "@/lib/admin/proof/types";
import { getProjectOptions } from "@/lib/admin/shared/relation-options";

export const metadata = {
  title: "Proof Library | Parth Admin",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readFilter(
  params: Record<string, string | string[] | undefined>,
  key: keyof ProofListFilters,
): string | undefined {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}

const guidance = MODULE_GUIDANCE.proof;

export default async function AdminProofPage({ searchParams }: PageProps) {
  const admin = await requireAdminSession();
  const params = await searchParams;

  const filters: ProofListFilters = {
    q: readFilter(params, "q"),
    proofType: readFilter(params, "proofType"),
    published: readFilter(params, "published"),
    hidden: readFilter(params, "hidden"),
    featuredOnHome: readFilter(params, "featuredOnHome"),
    featuredOnAbout: readFilter(params, "featuredOnAbout"),
    relatedProjectId: readFilter(params, "relatedProjectId"),
  };

  const [items, projectOptions] = await Promise.all([
    listProofItems(filters),
    getProjectOptions(),
  ]);

  return (
    <AdminShell admin={admin}>
      <div className={adminPageStackClass}>
        <AdminPageHeader
          title={guidance.title}
          description={guidance.subtitle}
          action={<AdminCreateLink href="/admin/proof/new">Create proof item</AdminCreateLink>}
        />

        <AdminCmsNotice variant="info" />
        <AdminModuleGuide module="proof" />
        <ProofFilters filters={filters} projectOptions={projectOptions} />

        {items.length === 0 ? (
          <AdminEmptyState
            title={guidance.emptyTitle}
            description={guidance.emptyDescription}
            waitNote={guidance.emptyWaitNote}
            action={
              <AdminCreateLink href="/admin/proof/new">Create proof item</AdminCreateLink>
            }
          />
        ) : (
          <ProofTable items={items} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
