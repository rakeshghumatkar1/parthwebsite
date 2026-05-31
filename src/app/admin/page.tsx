import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminPlaceholderCard } from "@/components/admin/admin-placeholder-card";
import { getCurrentAdmin } from "@/lib/admin/auth";

export const metadata = {
  title: "Dashboard | Parth Admin",
};

const dashboardAreas = [
  {
    title: "Projects",
    description: "Create and manage portfolio projects shown on the public site.",
  },
  {
    title: "Proof Library",
    description: "Organize proof categories and downloadable proof items.",
  },
  {
    title: "Videos",
    description: "Manage demo and walkthrough videos linked from projects.",
  },
  {
    title: "Timeline / Milestones",
    description: "Track build milestones and timeline entries.",
  },
  {
    title: "Updates / Build Notes",
    description: "Publish build notes and progress updates.",
  },
  {
    title: "Media Library",
    description: "Upload and attach images and files for CMS content.",
  },
];

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

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
          {dashboardAreas.map((area) => (
            <AdminPlaceholderCard
              key={area.title}
              title={area.title}
              description={area.description}
              status="Not built yet"
            />
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
