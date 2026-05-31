import Link from "next/link";
import { adminBtnPrimaryClass } from "@/lib/admin/admin-ui";

type AdminCreateLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function AdminCreateLink({ href, children }: AdminCreateLinkProps) {
  return (
    <Link href={href} className={adminBtnPrimaryClass}>
      {children}
    </Link>
  );
}
