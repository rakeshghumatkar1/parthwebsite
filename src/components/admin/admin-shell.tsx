import { AdminSidebar } from "@/components/admin/admin-sidebar";
import type { AdminUser } from "@/db/schema/admin-auth";

type AdminShellProps = {
  admin: AdminUser;
  children: React.ReactNode;
};

export function AdminShell({ admin, children }: AdminShellProps) {
  return (
    <div className="admin-shell min-h-screen bg-slate-50 text-tb-text">
      <div className="flex min-h-screen">
        <AdminSidebar admin={admin} />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-slate-200 bg-white px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-tb-text-muted">
                Signed in as{" "}
                <span className="font-medium text-tb-text">{admin.email}</span>
              </p>
            </div>
          </header>

          <main className="flex-1 px-5 py-5 lg:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
