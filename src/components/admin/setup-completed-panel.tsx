import Link from "next/link";
import { AdminAuthPanel } from "@/components/admin/admin-auth-panel";

export function SetupCompletedPanel() {
  return (
    <AdminAuthPanel
      title="Setup already completed"
      subtitle="The first admin account has already been created. Use the login page to sign in."
    >
      <Link
        href="/admin/login"
        className="inline-flex w-full items-center justify-center rounded-md bg-tb-blue px-4 py-2.5 text-sm font-medium text-white transition hover:bg-tb-blue-hover"
      >
        Go to admin login
      </Link>
    </AdminAuthPanel>
  );
}
