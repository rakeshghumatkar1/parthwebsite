import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Review", href: "#work-you-can-review" },
  { label: "Systems", href: "#what-we-build" },
  { label: "Projects", href: "#selected-project-builds" },
  { label: "Process", href: "#how-the-work-happens" },
  { label: "Founder", href: "#technical-founder" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-tb-navy-border bg-tb-navy/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        <Link href="/" className="min-w-0 shrink-0">
          <p className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Think Big AI Systems
          </p>
          <p className="text-xs text-tb-text-on-dark-muted">
            by Think Big Digital Solutions
          </p>
        </Link>

        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-tb-text-on-dark-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href="#contact" variant="primary" dark className="shrink-0 text-sm">
          Discuss a Software Use Case
        </Button>
      </div>
    </header>
  );
}
