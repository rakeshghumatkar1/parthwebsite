"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { AdminUser } from "@/db/schema/admin-auth";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
};

const overviewItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", exact: true },
];

const contentItems: NavItem[] = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/updates", label: "Updates" },
  { href: "/admin/media", label: "Media Library" },
];

const archivedItems: NavItem[] = [
  { href: "/admin/proof", label: "Proof Library" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/milestones", label: "Timeline" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isArchivedRouteActive(pathname: string) {
  return archivedItems.some((item) => isActive(pathname, item.href));
}

function NavLinkList({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const active = isActive(pathname, item.href, item.exact);
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
  );
}

function NavGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-tb-text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

type AdminSidebarProps = {
  admin: AdminUser;
};

export function AdminSidebar({ admin }: AdminSidebarProps) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [archivedOpen, setArchivedOpen] = useState(() =>
    isArchivedRouteActive(pathname),
  );

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setArchivedOpen(isArchivedRouteActive(pathname));
  }

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
        <NavGroup label="Overview">
          <NavLinkList items={overviewItems} pathname={pathname} />
        </NavGroup>

        <NavGroup label="Content">
          <NavLinkList items={contentItems} pathname={pathname} />
        </NavGroup>

        <div>
          <button
            type="button"
            aria-expanded={archivedOpen}
            aria-controls="admin-archived-nav"
            onClick={() => setArchivedOpen((open) => !open)}
            className="mb-1.5 flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-[11px] font-semibold uppercase tracking-wide text-tb-text-muted transition hover:bg-slate-50 hover:text-tb-text"
          >
            <span>Archived</span>
            <span
              aria-hidden
              className={`text-xs transition-transform ${archivedOpen ? "rotate-90" : ""}`}
            >
              ▸
            </span>
          </button>
          {archivedOpen ? (
            <div id="admin-archived-nav">
              <NavLinkList items={archivedItems} pathname={pathname} />
            </div>
          ) : null}
        </div>
      </nav>

      <div className="border-t border-slate-100 px-4 py-4">
        <p className="truncate text-xs font-medium text-tb-text">{admin.name}</p>
        <p className="truncate text-xs text-tb-text-muted">{admin.email}</p>
        <form action="/admin/logout" method="POST" className="mt-2">
          <button
            type="submit"
            className="text-xs font-medium text-tb-blue hover:underline"
          >
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
