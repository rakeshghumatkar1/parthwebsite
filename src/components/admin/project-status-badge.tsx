import {
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/lib/admin/projects/constants";

const typeLabels = Object.fromEntries(
  PROJECT_TYPE_OPTIONS.map((o) => [o.value, o.label]),
);
const statusLabels = Object.fromEntries(
  PROJECT_STATUS_OPTIONS.map((o) => [o.value, o.label]),
);

type ProjectStatusBadgeProps = {
  published: boolean;
  hidden: boolean;
  archived: boolean;
};

export function ProjectStatusBadge({
  published,
  hidden,
  archived,
}: ProjectStatusBadgeProps) {
  const badges: Array<{ label: string; className: string }> = [];

  if (archived) {
    badges.push({
      label: "Archived",
      className: "bg-slate-100 text-slate-700",
    });
  } else if (hidden) {
    badges.push({
      label: "Hidden",
      className: "bg-amber-50 text-amber-800",
    });
  } else if (published) {
    badges.push({
      label: "Published",
      className: "bg-emerald-50 text-emerald-800",
    });
  } else {
    badges.push({
      label: "Draft",
      className: "bg-tb-surface-muted text-tb-text-muted",
    });
  }

  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}

export function ProjectTypeLabel({ value }: { value: string }) {
  return <>{typeLabels[value] ?? value}</>;
}

export function ProjectStatusLabel({ value }: { value: string }) {
  return <>{statusLabels[value] ?? value}</>;
}

export function ProjectFeaturedFlags({
  featuredOnHome,
  featuredOnAbout,
}: {
  featuredOnHome: boolean;
  featuredOnAbout: boolean;
}) {
  const flags: string[] = [];
  if (featuredOnHome) flags.push("Home");
  if (featuredOnAbout) flags.push("About");
  if (flags.length === 0) return <span className="text-tb-text-muted">—</span>;
  return <span>{flags.join(", ")}</span>;
}
