import type { RelationOption } from "@/lib/admin/shared/relation-options";
import { adminInputClassName } from "./admin-auth-panel";

type RelationSelectProps = {
  id: string;
  name: string;
  label: string;
  options: RelationOption[];
  defaultValue?: string;
  hint?: string;
  error?: string;
};

export function RelationSelect({
  id,
  name,
  label,
  options,
  defaultValue = "",
  hint,
  error,
}: RelationSelectProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={adminInputClassName(Boolean(error))}
      >
        <option value="">None</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <p className="text-xs text-tb-text-muted">{hint}</p> : null}
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function VisibilityBadges({
  published,
  hidden,
}: {
  published: boolean;
  hidden: boolean;
}) {
  if (hidden) {
    return (
      <span className="inline-flex rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800">
        Hidden
      </span>
    );
  }
  if (published) {
    return (
      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
        Published
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-tb-surface-muted px-2 py-0.5 text-xs font-medium text-tb-text-muted">
      Draft
    </span>
  );
}

export function FeaturedFlags({
  featuredOnHome,
  featuredOnAbout,
}: {
  featuredOnHome?: boolean;
  featuredOnAbout?: boolean;
}) {
  const flags: string[] = [];
  if (featuredOnHome) flags.push("Home");
  if (featuredOnAbout) flags.push("About");
  if (flags.length === 0) return <span className="text-tb-text-muted">—</span>;
  return <span>{flags.join(", ")}</span>;
}

export function UrlStatus({ url }: { url: string | null | undefined }) {
  if (!url) return <span className="text-tb-text-muted">No URL</span>;
  return <span className="text-emerald-700">URL set</span>;
}
