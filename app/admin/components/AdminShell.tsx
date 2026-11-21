"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import {
  Building2,
  ExternalLink,
  FileText,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type NavItem = { href: string; label: string; title: string; icon: LucideIcon; exact?: boolean };

const NAV: NavItem[] = [
  { href: "/admin", label: "Dashboard", title: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/gallery", label: "Gallery", title: "Gallery Management", icon: Images },
  { href: "/admin/projects", label: "Key Projects", title: "Key Projects", icon: Building2 },
  { href: "/admin/clients", label: "Clients", title: "Client Management", icon: Users },
  { href: "/admin/brochures", label: "Brochures", title: "Brochures & Datasheets", icon: FileText },
];

const ENQUIRY_NAV: NavItem[] = [
  { href: "/admin/leads", label: "Leads", title: "Leads", icon: Inbox },
];

const ALL_NAV = [...NAV, ...ENQUIRY_NAV];

function isActive(item: NavItem, pathname: string) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
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
  const [menuOpen, setMenuOpen] = useState(false);
  const current = ALL_NAV.find((item) => isActive(item, pathname)) ?? NAV[0];

  const navLink = (item: NavItem) => {
    const active = isActive(item, pathname);
    const Icon = item.icon;
    return (
      <li key={item.href}>
        <Link
          href={item.href}
          onClick={() => setMenuOpen(false)}
          aria-current={active ? "page" : undefined}
          className={`group relative flex items-center gap-3 px-3 py-2.5 text-[15px] transition ${
            active
              ? "bg-[#EAF3FD] font-semibold text-[#006DDB]"
              : "font-medium text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#1F1F1F]"
          }`}
        >
          {active ? <span className="absolute inset-y-0 left-0 w-[3px] bg-[#006DDB]" aria-hidden /> : null}
          <Icon size={19} className={active ? "text-[#006DDB]" : "text-[#9CA3AF] group-hover:text-[#616161]"} aria-hidden />
          {item.label}
        </Link>
      </li>
    );
  };

  async function logout() {
    setBusy(true);
    // Go to the login page even if the request fails, so the button never gets stuck.
    await fetch("/api/admin/auth", { method: "DELETE" }).catch(() => undefined);
    router.replace("/admin/login");
    router.refresh();
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      {/* Brand */}
      {/* Same height as the page banner (h-31) so the two bottom edges line up on desktop */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E5E7EB] px-5 laptop:h-31 laptop:justify-center">
        <Link href="/admin" className="flex items-center" onClick={() => setMenuOpen(false)} aria-label="Dashboard">
          <Image
            src="/assets/home/Logo.webp"
            alt="STELZ"
            width={1245}
            height={627}
            priority
            className="h-11 w-auto laptop:h-18"
          />
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          className="inline-flex h-9 w-9 items-center justify-center text-[#616161] hover:bg-[#F3F4F6] laptop:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Main">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
          Content
        </p>
        <ul className="space-y-1">{NAV.map(navLink)}</ul>

        <p className="px-3 pb-2 pt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
          Enquiries
        </p>
        <ul className="space-y-1">{ENQUIRY_NAV.map(navLink)}</ul>

        <p className="px-3 pb-2 pt-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9CA3AF]">
          Website
        </p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-3 py-2.5 text-[15px] font-medium text-[#4B5563] transition hover:bg-[#F3F4F6] hover:text-[#1F1F1F]"
        >
          <ExternalLink size={19} className="text-[#9CA3AF] group-hover:text-[#616161]" aria-hidden />
          View website
        </a>
      </nav>

      {/* Account */}
      <div className="shrink-0 border-t border-[#E5E7EB] p-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#006DDB] text-sm font-semibold uppercase text-white"
            aria-hidden
          >
            {username.slice(0, 1)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#1F1F1F]">{username}</p>
            <p className="text-xs text-[#616161]">Signed in</p>
          </div>
          <button
            type="button"
            onClick={logout}
            disabled={busy}
            aria-label="Log out"
            title="Log out"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-[#E5E7EB] text-[#616161] transition hover:border-[#b42318] hover:text-[#b42318] disabled:opacity-50"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${spaceGrotesk.className} min-h-screen bg-[#F6F7F9] text-[#1F1F1F]`}>
      {/* Sidebar: fixed on laptop and up, slide-in drawer below that */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-[#E5E7EB] bg-white transition-transform duration-200 laptop:translate-x-0 ${
          menuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 laptop:hidden"
        />
      ) : null}

      <div className="laptop:pl-64">
        {/* Phone/tablet bar: menu button + logo (the sidebar is hidden at these sizes) */}
        <div className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-[#E5E7EB] bg-white px-4 laptop:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#E5E7EB] text-[#1F1F1F]"
          >
            <Menu size={20} />
          </button>
          <Image src="/assets/home/Logo.webp" alt="STELZ" width={1245} height={627} className="h-10 w-auto" />
        </div>

        {/* Same banner as the public website pages */}
        <PageHeader
          title={current.title}
          breadcrumbLabel={current.label}
          homeLabel="stelzparking.com"
          homeHref="/"
          imageSrc="/assets/backgrounds/services-subheader.jpg"
          heightClass="h-27 tablet:h-31"
        />

        <main className="mx-auto max-w-[1400px] px-4 py-6 tablet:px-8 tablet:py-8">{children}</main>
      </div>
    </div>
  );
}
