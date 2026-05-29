import Link from "next/link";
import { launchFooterGroups } from "@/lib/home-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-tb-navy-border bg-gradient-to-b from-tb-navy via-tb-navy to-tb-navy-deep text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tb-cyan/20 to-transparent"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-10 lg:gap-y-14">
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Think Big AI Systems
            </p>
            <p className="mt-2 text-sm text-tb-cyan/90 sm:text-base">
              by Think Big Digital Solutions
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-tb-text-on-dark-muted sm:text-base sm:leading-7">
              AI software systems, workflow applications, automation, internal
              tools, and data platforms built around business use cases.
            </p>
          </div>

          {launchFooterGroups.map((group) => (
            <div key={group.title} className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-tb-text-on-dark-muted">
                {group.title}
              </p>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="inline-block text-[15px] leading-snug text-tb-text-on-dark transition-colors hover:text-white sm:text-base"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="inline-block text-[15px] leading-snug text-tb-text-on-dark-muted sm:text-base">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-tb-navy-border/80 pt-10 text-sm text-tb-text-on-dark-muted sm:flex-row sm:items-center sm:justify-between sm:text-[15px]">
          <p>© {year} Think Big Digital Solutions. Parth Ghumatkar.</p>
          <p>AI software systems microsite</p>
        </div>
      </div>
    </footer>
  );
}
