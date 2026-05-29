import Link from "next/link";
import { launchFooterGroups } from "@/lib/home-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-tb-navy-border bg-tb-navy text-tb-text-on-dark">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <p className="text-sm font-semibold text-white">
              Think Big AI Systems
            </p>
            <p className="mt-1 text-xs text-tb-text-on-dark-muted">
              by Think Big Digital Solutions
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-tb-text-on-dark-muted">
              AI software systems, workflow applications, automation, internal
              tools, and data platforms built around business use cases.
            </p>
          </div>

          {launchFooterGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-tb-text-on-dark-muted">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-sm text-tb-text-on-dark transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-tb-text-on-dark-muted">
                        {link.label}
                      </span>
                    )}
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
