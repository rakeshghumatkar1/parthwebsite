import Link from "next/link";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminCmsNotice } from "@/components/admin/admin-cms-notice";
import { AdminHelpBox } from "@/components/admin/admin-help-box";
import {
  CMS_CONTENT_CAUTION,
  DASHBOARD_MODULES,
  MODULE_GUIDANCE,
  WORKFLOW_STEPS,
  moduleStatusLabel,
} from "@/lib/admin/cms-guidance";
import { requireAdminSession } from "@/lib/admin/page-guard";

export const metadata = {
  title: "Dashboard | Parth Admin",
};

export default async function AdminDashboardPage() {
  const admin = await requireAdminSession();

  return (
    <AdminShell admin={admin}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-2 max-w-3xl text-sm text-tb-text-muted">
            Welcome, {admin.name}. This CMS manages content for the Parth public
            website. All modules below are available for setup and drafts — but
            the public website is not connected yet.
          </p>
        </div>

        <AdminCmsNotice>{CMS_CONTENT_CAUTION}</AdminCmsNotice>

        <AdminHelpBox title="Recommended workflow when content entry begins">
          <ol className="list-decimal space-y-2 pl-4">
            {WORKFLOW_STEPS.map((step) => (
              <li key={step.step}>
                <span className="font-medium">{step.label}</span>
                <span className="text-tb-text-muted"> — {step.note}</span>
              </li>
            ))}
          </ol>
        </AdminHelpBox>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {DASHBOARD_MODULES.map(({ key, href }) => {
            const area = MODULE_GUIDANCE[key];
            return (
              <Link
                key={key}
                href={href}
                className="block rounded-lg border border-tb-navy-border bg-tb-surface p-5 shadow-sm transition hover:border-tb-blue/40 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h3 className="text-base font-semibold">{area.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-800">
                      {moduleStatusLabel(area.status)}
                    </span>
                    <span className="rounded-full bg-tb-surface-muted px-2 py-0.5 text-xs font-medium text-tb-text-muted">
                      {area.statusNote}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-tb-text-muted">
                  {area.subtitle}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
