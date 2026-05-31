import Link from "next/link";
import type { FooterLink, FooterLinkGroup } from "@/lib/home-data";

const CONTACT_URL = "https://thinkbigdigital.co/contact";

/** Simplified footer nav — only safe anchors; unbuilt items stay muted text */
const footerNavGroups: FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Build Journey", href: "/about-us/build-journey" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Current Projects", href: "/projects" },
      { label: "Early Work", href: "/projects/early-work" },
      { label: "Updates", href: "/updates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Downloads", href: "/downloads" },
      { label: "GitHub" },
    ],
  },
  {
    title: "Systems",
    links: [
      { label: "AI Systems", href: "/#what-we-build" },
      { label: "Automation", href: "/#what-we-build" },
      { label: "Data Platforms", href: "/#what-we-build" },
      { label: "Internal Tools", href: "/#what-we-build" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Discuss a Software Use Case", href: CONTACT_URL },
    ],
  },
];

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.href) {
    const isExternal = link.href.startsWith("http");

    return (
      <Link
        href={link.href}
        className="text-sm text-tb-text-on-dark transition-colors hover:text-white sm:text-[15px]"
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <span className="text-sm text-tb-text-on-dark-muted/80 sm:text-[15px]">
      {link.label}
    </span>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-tb-navy-border bg-gradient-to-b from-tb-navy via-tb-navy to-tb-navy-deep text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tb-cyan/20 to-transparent"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              Think Big AI Systems
            </p>
            <p className="mt-1.5 text-sm text-tb-cyan/90">
              by Think Big Digital Solutions
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-tb-text-on-dark-muted">
              AI software systems, workflow applications, automation, internal
              tools, and data platforms built around business use cases.
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-8">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              {footerNavGroups.map((group) => (
                <div key={group.title} className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-tb-text-on-dark-muted">
                    {group.title}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <FooterLinkItem link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-tb-navy-border/80 pt-8 text-sm text-tb-text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Think Big Digital Solutions. Parth Ghumatkar.</p>
          <p>AI software systems microsite</p>
        </div>
      </div>
    </footer>
  );
}
