import {
  formatDomainsCompact,
  PROJECT_PHASE_OPTIONS,
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from "@/lib/admin/projects/constants";
import { industryLabel } from "@/lib/projects/taxonomy";
import { AdminBadge } from "./ui/admin-badge";

const typeLabels = Object.fromEntries(
  PROJECT_TYPE_OPTIONS.map((o) => [o.value, o.label]),
);
const phaseLabels = Object.fromEntries(
  PROJECT_PHASE_OPTIONS.map((o) => [o.value, o.label]),
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
  let variant: "neutral" | "warning" | "success" | "draft" = "draft";
  let label = "Draft";

  if (archived) {
    variant = "neutral";
    label = "Archived";
  } else if (hidden) {
    variant = "warning";
    label = "Hidden";
  } else if (published) {
    variant = "success";
    label = "Published";
  }

  return <AdminBadge variant={variant}>{label}</AdminBadge>;
}

export function ProjectTypeLabel({ value }: { value: string }) {
  return <>{typeLabels[value] ?? value}</>;
}

export function ProjectPhaseLabel({ value }: { value: string }) {
  return <>{phaseLabels[value] ?? value}</>;
}

export function ProjectStatusLabel({ value }: { value: string }) {
  return <>{statusLabels[value] ?? value}</>;
}

export function ProjectIndustryLabel({ value }: { value: string }) {
  return <>{industryLabel(value)}</>;
}

export function ProjectDomainsCompact({ values }: { values: string[] }) {
  return <>{formatDomainsCompact(values)}</>;
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
