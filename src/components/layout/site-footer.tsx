import Link from "next/link";
import type { FooterLink, FooterLinkGroup } from "@/lib/home-data";

const GITHUB_URL = "https://github.com/ParthGhumatkar";

const footerNavGroups: FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About Parth", href: "/about-parth" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Projects",
    links: [
      { label: "All Projects", href: "/projects" },
      { label: "Early Work", href: "/projects/early-work" },
      { label: "Build Journey", href: "/about-us/build-journey" },
    ],
  },
  {
    title: "Resources",
    links: [{ label: "GitHub", href: GITHUB_URL }],
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
    links: [{ label: "Discuss a Software Use Case", href: "/#contact" }],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Disclaimer", href: "/disclaimer" },
] as const;

function FooterLinkItem({ link }: { link: FooterLink }) {
  if (link.href) {
    const isExternal = link.href.startsWith("http");

    return (
      <Link
        href={link.href}
        className="inline-block text-sm text-tb-text-on-dark transition-colors hover:text-white sm:text-[15px]"
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
  return (
    <footer className="relative border-t border-tb-navy-border bg-gradient-to-b from-tb-navy via-tb-navy to-tb-navy-deep text-tb-text-on-dark">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tb-cyan/20 to-transparent"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-10">
          <div className="lg:col-span-4 xl:col-span-5">
            <p className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              Think Big AI Systems
            </p>
            <p className="mt-1.5 text-sm text-tb-cyan/90">
              by Think Big Digital Solutions
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-tb-text-on-dark-muted">
              AI software systems, workflow applications, automation, internal
              tools, and data platforms built around business use cases.
            </p>
          </div>

          <div className="lg:col-span-8 xl:col-span-7">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
              {footerNavGroups.map((group) => (
                <div
                  key={group.title}
                  className={
                    group.title === "Connect" ? "min-w-[9.5rem]" : "min-w-0"
                  }
                >
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

        <div className="mt-12 border-t border-tb-navy-border/80 pt-8">
          <div className="flex flex-col gap-4 text-sm text-tb-text-on-dark-muted lg:flex-row lg:items-center lg:justify-between">
            <p>© 2026 Think Big Digital Solutions. All rights reserved.</p>
            <nav aria-label="Legal">
              <ul className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {legalLinks.map((link, index) => (
                  <li key={link.href} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span aria-hidden className="text-tb-text-on-dark-muted/60">
                        ·
                      </span>
                    ) : null}
                    <Link
                      href={link.href}
                      className="text-tb-text-on-dark transition-colors hover:text-white hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
