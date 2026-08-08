import type { ReactNode } from "react";
import { AdminShell } from "@/features/admin/components/AdminShell";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
