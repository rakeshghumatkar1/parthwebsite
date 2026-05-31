import type { RelationOption } from "@/lib/admin/shared/relation-options";
import { adminInputClassName } from "./admin-auth-panel";
import { AdminBadge } from "./ui/admin-badge";

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
    return <AdminBadge variant="warning">Hidden</AdminBadge>;
  }
  if (published) {
    return <AdminBadge variant="success">Published</AdminBadge>;
  }
  return <AdminBadge variant="draft">Draft</AdminBadge>;
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
  return <AdminBadge variant="success">URL set</AdminBadge>;
}
