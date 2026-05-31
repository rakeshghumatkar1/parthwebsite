import Link from "next/link";
import { UPDATE_TYPE_OPTIONS } from "@/lib/admin/updates/constants";
import type { UpdateListFilters } from "@/lib/admin/updates/types";
import type { RelationOption } from "@/lib/admin/shared/relation-options";
import { adminBtnPrimaryClass, adminBtnSecondaryClass } from "@/lib/admin/admin-ui";
import { adminInputClassName } from "./admin-auth-panel";
import { AdminFilterPanel } from "./ui/admin-filter-panel";

type UpdateFiltersProps = {
  filters: UpdateListFilters;
  projectOptions: RelationOption[];
};

function boolFilterOptions() {
  return (
    <>
      <option value="">Any</option>
      <option value="true">Yes</option>
      <option value="false">No</option>
    </>
  );
}

export function UpdateFilters({ filters, projectOptions }: UpdateFiltersProps) {
  return (
    <AdminFilterPanel>
      <form method="get" className="space-y-3">
      <div className="grid gap-3 lg:grid-cols-4">
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-medium">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={filters.q ?? ""}
            placeholder="Title, slug, or summary"
            className={adminInputClassName()}
          />
        </div>

        <div>
          <label htmlFor="updateType" className="mb-1 block text-sm font-medium">
            Update type
          </label>
          <select
            id="updateType"
            name="updateType"
            defaultValue={filters.updateType ?? ""}
            className={adminInputClassName()}
          >
            <option value="">Any</option>
            {UPDATE_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="published" className="mb-1 block text-sm font-medium">
            Published
          </label>
          <select
            id="published"
            name="published"
            defaultValue={filters.published ?? ""}
            className={adminInputClassName()}
          >
            {boolFilterOptions()}
          </select>
        </div>

        <div>
          <label htmlFor="hidden" className="mb-1 block text-sm font-medium">
            Hidden
          </label>
          <select
            id="hidden"
            name="hidden"
            defaultValue={filters.hidden ?? ""}
            className={adminInputClassName()}
          >
            {boolFilterOptions()}
          </select>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-4">
        <div>
          <label
            htmlFor="featuredOnHome"
            className="mb-1 block text-sm font-medium"
          >
            Featured on Home
          </label>
          <select
            id="featuredOnHome"
            name="featuredOnHome"
            defaultValue={filters.featuredOnHome ?? ""}
            className={adminInputClassName()}
          >
            {boolFilterOptions()}
          </select>
        </div>

        <div>
          <label
            htmlFor="relatedProjectId"
            className="mb-1 block text-sm font-medium"
          >
            Related project
          </label>
          <select
            id="relatedProjectId"
            name="relatedProjectId"
            defaultValue={filters.relatedProjectId ?? ""}
            className={adminInputClassName()}
          >
            <option value="">Any</option>
            {projectOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className={adminBtnPrimaryClass}>
          Apply filters
        </button>
        <Link href="/admin/updates" className={adminBtnSecondaryClass}>
          Clear
        </Link>
      </div>
      </form>
    </AdminFilterPanel>
  );
}
