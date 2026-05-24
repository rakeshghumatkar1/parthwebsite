import Link from "next/link";
import { footerLinkGroups } from "@/lib/home-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-tb-navy-border bg-tb-navy text-tb-text-on-dark">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold text-white">
              Think Big AI Systems
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-tb-text-on-dark-muted">
              AI software systems, automation, internal tools, and data
              workflow applications under Think Big Digital Solutions.
            </p>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-tb-text-on-dark-muted">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-tb-text-on-dark transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-tb-navy-border pt-8 text-xs text-tb-text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Think Big Digital Solutions. Parth Ghumatkar.</p>
          <p>AI software systems microsite</p>
        </div>
      </div>
    </footer>
  );
}
