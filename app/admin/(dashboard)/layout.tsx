import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/lib/admin/auth";
import AdminShell from "../components/AdminShell";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let session = null;
  try {
    session = await getAdminSessionFromCookies();
  } catch {
    redirect("/admin/login");
  }
  if (!session) redirect("/admin/login");

  // Admin has its own sidebar layout (no public site header/banner).
  return <AdminShell username={session.sub}>{children}</AdminShell>;
}
