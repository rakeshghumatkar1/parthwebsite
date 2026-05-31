import Link from "next/link";
import { adminCardClass } from "@/lib/admin/admin-ui";
import { AdminBadge } from "./admin-badge";

type AdminCardBadge = {
  label: string;
  variant?: "success" | "warning" | "neutral" | "info" | "draft";
};

type AdminCardProps = {
  title: string;
  description: string;
  href: string;
  badges: AdminCardBadge[];
};

export function AdminCard({
  title,
  description,
  href,
  badges,
}: AdminCardProps) {
  return (
    <Link
      href={href}
      className={`group block p-4 transition hover:border-tb-blue/30 hover:shadow-md ${adminCardClass}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-tb-text group-hover:text-tb-blue">
          {title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {badges.map((badge) => (
            <AdminBadge key={badge.label} variant={badge.variant ?? "neutral"}>
              {badge.label}
            </AdminBadge>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
        {description}
      </p>
    </Link>
  );
}
