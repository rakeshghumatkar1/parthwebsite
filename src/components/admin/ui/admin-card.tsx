import Link from "next/link";
import { adminCardClass } from "@/lib/admin/admin-ui";
import { AdminBadge } from "./admin-badge";

type AdminCardProps = {
  title: string;
  description: string;
  href: string;
  statusLabel: string;
  statusNote?: string;
};

export function AdminCard({
  title,
  description,
  href,
  statusLabel,
  statusNote,
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
          <AdminBadge variant="success">{statusLabel}</AdminBadge>
          {statusNote ? <AdminBadge variant="neutral">{statusNote}</AdminBadge> : null}
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
        {description}
      </p>
    </Link>
  );
}
