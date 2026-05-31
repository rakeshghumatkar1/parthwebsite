import Link from "next/link";
import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/lib/admin/projects/constants";
import type { ProjectListFilters } from "@/lib/admin/projects/types";
import { adminInputClassName } from "./admin-auth-panel";

type ProjectsFiltersProps = {
  filters: ProjectListFilters;
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

export function ProjectsFilters({ filters }: ProjectsFiltersProps) {
  return (
    <form method="get" className="space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-4">
      <div className="grid gap-4 lg:grid-cols-4">
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-medium">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={filters.q ?? ""}
            placeholder="Title, slug, or short description"
            className={adminInputClassName()}
          />
        </div>

        <div>
          <label htmlFor="projectType" className="mb-1 block text-sm font-medium">
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue={filters.projectType ?? ""}
            className={adminInputClassName()}
          >
            <option value="">Any</option>
            {PROJECT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={filters.status ?? ""}
            className={adminInputClassName()}
          >
            <option value="">Any</option>
            {PROJECT_STATUS_OPTIONS.map((option) => (
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
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
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

        <div>
          <label htmlFor="archived" className="mb-1 block text-sm font-medium">
            Archived
          </label>
          <select
            id="archived"
            name="archived"
            defaultValue={filters.archived ?? ""}
            className={adminInputClassName()}
          >
            {boolFilterOptions()}
          </select>
        </div>

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
            htmlFor="featuredOnAbout"
            className="mb-1 block text-sm font-medium"
          >
            Featured on About
          </label>
          <select
            id="featuredOnAbout"
            name="featuredOnAbout"
            defaultValue={filters.featuredOnAbout ?? ""}
            className={adminInputClassName()}
          >
            {boolFilterOptions()}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
        >
          Apply filters
        </button>
        <Link
          href="/admin/projects"
          className="rounded-md border border-tb-navy-border px-4 py-2 text-sm font-medium hover:bg-tb-surface-muted"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
