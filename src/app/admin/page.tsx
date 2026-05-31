import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderCard } from "@/components/admin/admin-placeholder-card";
import { requireAdminSession } from "@/lib/admin/page-guard";

export const metadata = {
  title: "Dashboard | Parth Admin",
};

const dashboardAreas = [
  {
    title: "Projects",
    description: "Create and manage portfolio projects shown on the public site.",
    href: "/admin/projects",
    status: "Available",
    active: true,
  },
  {
    title: "Proof Library",
    description: "Organize proof categories and downloadable proof items.",
    status: "Not built yet",
    active: false,
  },
  {
    title: "Videos",
    description: "Manage demo and walkthrough videos linked from projects.",
    status: "Not built yet",
    active: false,
  },
  {
    title: "Timeline / Milestones",
    description: "Track build milestones and timeline entries.",
    status: "Not built yet",
    active: false,
  },
  {
    title: "Updates / Build Notes",
    description: "Publish build notes and progress updates.",
    status: "Not built yet",
    active: false,
  },
  {
    title: "Media Library",
    description: "Upload and attach images and files for CMS content.",
    status: "Not built yet",
    active: false,
  },
];

export default async function AdminDashboardPage() {
  const admin = await requireAdminSession();

  return (
    <AdminShell admin={admin}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-tb-text-muted">
            Welcome, {admin.name}. Content tools are being added step by step.
            Start by adding projects, then proof, videos, milestones, and
            updates.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {dashboardAreas.map((area) =>
            area.active && area.href ? (
              <Link
                key={area.title}
                href={area.href}
                className="block rounded-lg border border-tb-navy-border bg-tb-surface p-5 shadow-sm transition hover:border-tb-blue/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold">{area.title}</h3>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                    {area.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
                  {area.description}
                </p>
              </Link>
            ) : (
              <AdminPlaceholderCard
                key={area.title}
                title={area.title}
                description={area.description}
                status={area.status}
              />
            ),
          )}
        </div>
      </div>
    </AdminShell>
  );
}
