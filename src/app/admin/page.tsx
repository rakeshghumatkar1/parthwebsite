import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import { AdminPageHeader } from "@/components/admin/ui/admin-page-header";
import { AdminCard } from "@/components/admin/ui/admin-card";
import {
  CMS_CONTENT_CAUTION,
  DASHBOARD_ACTIVE_MODULES,
  DASHBOARD_ARCHIVED_MODULES,
  DASHBOARD_ARCHIVED_NOTE,
  MODULE_GUIDANCE,
  WORKFLOW_STEPS,
} from "@/lib/admin/cms-guidance";
import { adminPageStackClass } from "@/lib/admin/admin-ui";
import { requireAdminSession } from "@/lib/admin/page-guard";

export const metadata = {
  title: "Dashboard | Parth Admin",
};

export default async function AdminDashboardPage() {
  const admin = await requireAdminSession();

  return (
    <AdminShell admin={admin}>
      <div className={adminPageStackClass}>
        <AdminPageHeader
          title="Dashboard"
          description={`Welcome, ${admin.name}. Manage Parth website content across all CMS modules. Public pages are live — publish only approved records.`}
        />

        <AdminCmsNotice>{CMS_CONTENT_CAUTION}</AdminCmsNotice>

        <AdminHelpBox title="Recommended content entry order">
          <ol className="list-decimal space-y-1.5 pl-4">
            {WORKFLOW_STEPS.map((step) => (
              <li key={step.step}>
                <span className="font-medium text-tb-text">{step.label}</span>
                <span> — {step.note}</span>
              </li>
            ))}
          </ol>
        </AdminHelpBox>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-tb-text-muted">
            CMS modules
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {DASHBOARD_ACTIVE_MODULES.map(({ key, href, description, badges }) => {
              const area = MODULE_GUIDANCE[key];
              return (
                <AdminCard
                  key={key}
                  href={href}
                  title={area.title}
                  description={description}
                  badges={badges}
                />
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/70 p-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-tb-text-muted">
            Archived modules
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-tb-text-muted">
            {DASHBOARD_ARCHIVED_NOTE}
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {DASHBOARD_ARCHIVED_MODULES.map(({ key, href }) => {
              const area = MODULE_GUIDANCE[key];
              return (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-tb-text-muted transition hover:text-tb-blue hover:underline"
                  >
                    {area.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
