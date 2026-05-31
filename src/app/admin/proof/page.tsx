import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminEmptyState } from "@/components/admin/admin-empty-state";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { ProofFilters } from "@/components/admin/proof-filters";
import { ProofTable } from "@/components/admin/proof-table";
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
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Proof Library
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">
              Manage proof items for future Home and Proof Library pages.
            </p>
          </div>
          <Link
            href="/admin/proof/new"
            className="rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover"
          >
            Create proof item
          </Link>
        </div>

        <AdminHelpBox title="About proof items">
          Proof items can appear later on the Home Proof Library section and
          related project or milestone pages. This phase only manages proof
          records. Public pages are not connected yet. Use approved real URLs
          only — do not invent file or external links.
        </AdminHelpBox>

        <ProofFilters filters={filters} projectOptions={projectOptions} />

        {items.length === 0 ? (
          <AdminEmptyState
            title="No proof items yet"
            description="Add the first proof item from approved launch content later."
            action={
              <Link
                href="/admin/proof/new"
                className="inline-flex rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
              >
                Create proof item
              </Link>
            }
          />
        ) : (
          <ProofTable items={items} projectOptions={projectOptions} />
        )}
      </div>
    </AdminShell>
  );
}
