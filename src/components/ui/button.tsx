import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-tb-blue text-white hover:bg-tb-blue-hover border border-transparent",
  secondary:
    "bg-transparent text-tb-text-on-dark border border-tb-navy-border hover:border-tb-text-on-dark-muted hover:bg-tb-navy-elevated",
  ghost:
    "bg-transparent text-tb-text border border-slate-300 hover:border-slate-400 hover:bg-tb-surface-muted",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  dark?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  dark = false,
}: ButtonProps) {
  const ghostOnLight = !dark && variant === "secondary";
  const resolvedVariant = ghostOnLight ? "ghost" : variant;

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${variantClasses[resolvedVariant]} ${className}`}
    >
      {children}
    </Link>
  );
}
