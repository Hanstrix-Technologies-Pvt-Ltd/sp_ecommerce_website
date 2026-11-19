import { redirect } from "next/navigation";
import { getAdminSessionFromCookies } from "@/lib/admin/auth";
import { getRequestLocale } from "@/lib/i18n/locale";
import { getNavContent } from "@/lib/i18n/content";
import type { NavLink } from "@/data/locale/en/NavContent";
import Navbar from "@/components/layout/Navbar";
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

  const locale = await getRequestLocale();
  const navModule = await getNavContent(locale);
  const navItems = navModule.NAV as NavLink[];

  return (
    <div className="min-h-screen bg-white">
      {/* Exact same website header / navbar */}
      <Navbar locale={locale} nav={navItems} />
      <AdminShell username={session.sub}>{children}</AdminShell>
    </div>
  );
}
