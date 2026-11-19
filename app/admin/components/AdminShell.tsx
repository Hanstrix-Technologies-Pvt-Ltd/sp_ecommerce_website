"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/projects", label: "Key Projects" },
  { href: "/admin/clients", label: "Clients" },
];

function headerForPath(pathname: string) {
  if (pathname.startsWith("/admin/gallery")) {
    return { title: "Gallery Management", breadcrumb: "Gallery" };
  }
  if (pathname.startsWith("/admin/projects")) {
    return { title: "Key Projects", breadcrumb: "Key Projects" };
  }
  if (pathname.startsWith("/admin/clients")) {
    return { title: "Client Management", breadcrumb: "Clients" };
  }
  return { title: "Admin Dashboard", breadcrumb: "Admin" };
}

export default function AdminShell({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const header = useMemo(() => headerForPath(pathname), [pathname]);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className={`${spaceGrotesk.className} min-h-screen bg-white text-[#1F1F1F]`}>
      {/* Same header image banner as public website pages */}
      <PageHeader
        title={header.title}
        breadcrumbLabel={header.breadcrumb}
        homeLabel="stelzparking.com"
        homeHref="/"
        imageSrc="/assets/backgrounds/services-subheader.jpg"
        heightClass="h-27 tablet:h-31"
      />

      {/* Admin section tabs */}
      <div className="border-b border-[#E5E5E5] bg-[#F5F5F5]">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3 px-4 py-3 tablet:px-8">
          <nav className="flex flex-wrap items-center gap-1 tablet:gap-2">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition tablet:text-[15px] ${
                    active
                      ? "border-b-2 border-[#006DDB] text-[#006DDB]"
                      : "border-b-2 border-transparent text-[#616161] hover:text-[#174b92]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-[#616161] tablet:inline">{username}</span>
            <button
              type="button"
              onClick={logout}
              disabled={busy}
              className="inline-flex h-10 items-center justify-center bg-[#006DDB] px-4 text-sm font-medium text-white transition hover:bg-[#0a3a85] disabled:opacity-60"
            >
              {busy ? "Logging out…" : "Log out"}
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1500px] px-4 py-8 tablet:px-8">{children}</main>
    </div>
  );
}
