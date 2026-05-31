import Link from "next/link";
import type { AdminUser } from "@/db/schema/admin-auth";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/help", label: "Help" },
];

type AdminShellProps = {
  admin: AdminUser;
  children: React.ReactNode;
};

export function AdminShell({ admin, children }: AdminShellProps) {
  return (
    <div className="admin-shell min-h-screen bg-tb-surface-muted text-tb-text">
      <div className="flex min-h-screen">
        <aside className="admin-sidebar flex w-56 shrink-0 flex-col border-r border-tb-navy-border bg-tb-surface px-4 py-6">
          <div className="mb-8">
            <p className="text-xs font-medium uppercase tracking-wide text-tb-text-muted">
              Parth Admin
            </p>
            <p className="mt-1 text-sm font-semibold">Content manager</p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-tb-text transition hover:bg-tb-surface-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <p className="truncate text-xs text-tb-text-muted">{admin.name}</p>
            <p className="truncate text-xs text-tb-text-muted">{admin.email}</p>
            <Link
              href="/admin/logout"
              className="mt-3 inline-block text-sm font-medium text-tb-blue hover:underline"
            >
              Log out
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-tb-navy-border bg-tb-surface px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-tb-text-muted">Signed in as</p>
                <p className="font-medium">{admin.email}</p>
              </div>
              <Link
                href="/admin/logout"
                className="rounded-md border border-tb-navy-border px-3 py-1.5 text-sm font-medium transition hover:bg-tb-surface-muted"
              >
                Log out
              </Link>
            </div>
          </header>

          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
