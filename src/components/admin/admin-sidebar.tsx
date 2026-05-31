"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AdminUser } from "@/db/schema/admin-auth";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", exact: true }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/proof", label: "Proof Library" },
      { href: "/admin/videos", label: "Videos" },
      { href: "/admin/milestones", label: "Timeline" },
      { href: "/admin/updates", label: "Updates" },
      { href: "/admin/media", label: "Media Library" },
    ],
  },
  {
    label: "Support",
    items: [{ href: "/admin/help", label: "Help" }],
  },
] as const;

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

type AdminSidebarProps = {
  admin: AdminUser;
};

export function AdminSidebar({ admin }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-tb-blue">
          Parth CMS
        </p>
        <p className="mt-0.5 text-sm font-semibold text-tb-text">Content manager</p>
        <p className="mt-1 text-xs text-tb-text-muted">Think Big AI Systems</p>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-tb-text-muted">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(
                  pathname,
                  item.href,
                  "exact" in item ? item.exact : false,
                );
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-md px-2.5 py-2 text-sm font-medium transition ${
                        active
                          ? "bg-tb-blue/10 text-tb-blue"
                          : "text-tb-text hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-100 px-4 py-4">
        <p className="truncate text-xs font-medium text-tb-text">{admin.name}</p>
        <p className="truncate text-xs text-tb-text-muted">{admin.email}</p>
        <Link
          href="/admin/logout"
          className="mt-2 inline-block text-xs font-medium text-tb-blue hover:underline"
        >
          Log out
        </Link>
      </div>
    </aside>
  );
}
