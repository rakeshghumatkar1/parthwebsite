import Link from "next/link";
import { adminInputClassName } from "@/components/admin/admin-auth-panel";
import { VIDEO_CATEGORY_OPTIONS } from "@/lib/admin/videos/constants";
import type { VideoListFilters } from "@/lib/admin/videos/types";
import type { RelationOption } from "@/lib/admin/shared/relation-options";

type VideoFiltersProps = {
  filters: VideoListFilters;
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

export function VideoFilters({ filters, projectOptions }: VideoFiltersProps) {
  return (
    <form
      method="get"
      className="space-y-4 rounded-lg border border-tb-navy-border bg-tb-surface p-4"
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-medium">
            Search
          </label>
          <input
            id="q"
            name="q"
            defaultValue={filters.q ?? ""}
            placeholder="Title, slug, description, or URL"
            className={adminInputClassName()}
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue={filters.category ?? ""}
            className={adminInputClassName()}
          >
            <option value="">Any</option>
            {VIDEO_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
          href="/admin/videos"
          className="rounded-md border border-tb-navy-border px-4 py-2 text-sm font-medium hover:bg-tb-surface-muted"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
