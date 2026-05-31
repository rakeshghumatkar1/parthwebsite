import Link from "next/link";
import {
  MEDIA_DISPLAY_MODE_OPTIONS,
  MEDIA_ROLE_OPTIONS,
} from "@/lib/admin/media/constants";
import type { MediaListFilters } from "@/lib/admin/media/types";
import type { RelationOption } from "@/lib/admin/shared/relation-options";
import { adminInputClassName } from "./admin-auth-panel";

type MediaFiltersProps = {
  filters: MediaListFilters;
  projectOptions: RelationOption[];
};

export function MediaFilters({ filters, projectOptions }: MediaFiltersProps) {
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
            placeholder="File name, URL, alt text, or caption"
            className={adminInputClassName()}
          />
        </div>

        <div>
          <label htmlFor="fileType" className="mb-1 block text-sm font-medium">
            File type
          </label>
          <input
            id="fileType"
            name="fileType"
            defaultValue={filters.fileType ?? ""}
            placeholder="e.g. image"
            className={adminInputClassName()}
          />
        </div>

        <div>
          <label htmlFor="imageRole" className="mb-1 block text-sm font-medium">
            Image role
          </label>
          <select
            id="imageRole"
            name="imageRole"
            defaultValue={filters.imageRole ?? ""}
            className={adminInputClassName()}
          >
            <option value="">Any</option>
            {MEDIA_ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="imageDisplayMode"
            className="mb-1 block text-sm font-medium"
          >
            Display mode
          </label>
          <select
            id="imageDisplayMode"
            name="imageDisplayMode"
            defaultValue={filters.imageDisplayMode ?? ""}
            className={adminInputClassName()}
          >
            <option value="">Any</option>
            {MEDIA_DISPLAY_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
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

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-md bg-tb-blue px-4 py-2 text-sm font-medium text-white hover:bg-tb-blue-hover"
        >
          Apply filters
        </button>
        <Link
          href="/admin/media"
          className="rounded-md border border-tb-navy-border px-4 py-2 text-sm font-medium hover:bg-tb-surface-muted"
        >
          Clear
        </Link>
      </div>
    </form>
  );
}
