import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Review", href: "#work-you-can-review" },
  { label: "Systems", href: "#what-we-build" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "#how-the-work-happens" },
  { label: "Founder", href: "#technical-founder" },
  { label: "Contact", href: "#contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-tb-navy-border/80 bg-tb-navy/97 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-8 lg:h-[4.5rem]">
        <Link href="/" className="min-w-0 shrink-0">
          <p className="text-base font-semibold tracking-tight text-white lg:text-lg">
            Think Big AI Systems
          </p>
          <p className="text-xs text-tb-text-on-dark-muted sm:text-sm">
            by Think Big Digital Solutions
          </p>
        </Link>

        <nav
          className="hidden items-center gap-7 xl:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] text-tb-text-on-dark-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          href="#contact"
          variant="primary"
          dark
          className="shrink-0 !px-4 !py-2.5 text-sm sm:!px-5 sm:!text-base"
        >
          Discuss a Software Use Case
        </Button>
      </div>
    </header>
  );
}
