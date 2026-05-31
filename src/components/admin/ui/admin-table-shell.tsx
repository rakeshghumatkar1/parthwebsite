import { adminTableShellClass } from "@/lib/admin/admin-ui";

type AdminTableShellProps = {
  children: React.ReactNode;
};

export function AdminTableShell({ children }: AdminTableShellProps) {
  return <div className={adminTableShellClass}>{children}</div>;
}
