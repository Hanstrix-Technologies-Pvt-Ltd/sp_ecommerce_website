"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Images, Inbox, Users, Video } from "lucide-react";
import { adminFetch, Card, PageTitle, Alert } from "../components/ui";
import { ADMIN_FEATURES } from "@/lib/admin/features";

type Stats = {
  gallery: number;
  projects: number;
  clients: number;
  publishedProjects: number;
  activeClients: number;
  leads: number;
  leadsLast30Days: number;
  testimonials: number;
  activeTestimonials: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch<Stats>("/api/admin/stats")
      .then(setStats)
      .catch((e: Error) => setError(e.message || "Failed to load stats"));
  }, []);

  const cards = [
    {
      label: "Gallery items",
      value: stats?.gallery,
      href: "/admin/gallery",
      icon: Images,
      extra: "Installation photos and 3D concepts",
    },
    {
      label: "Key projects",
      value: stats?.projects,
      href: "/admin/projects",
      icon: Building2,
      extra: stats ? `${stats.publishedProjects} shown on website` : "",
    },
    {
      label: "Clients",
      value: stats?.clients,
      href: "/admin/clients",
      icon: Users,
      extra: stats ? `${stats.activeClients} shown on website` : "",
    },
    // Optional sections only while switched on (lib/admin/features.ts).
    ...(ADMIN_FEATURES.testimonials
      ? [
          {
            label: "Testimonials",
            value: stats?.testimonials,
            href: "/admin/testimonials",
            icon: Video,
            extra: stats ? `${stats.activeTestimonials} shown on website` : "",
          },
        ]
      : []),
    // Leads card only while the Leads section is switched on (lib/admin/features.ts).
    ...(ADMIN_FEATURES.leads
      ? [
          {
            label: "Leads",
            value: stats?.leads,
            href: "/admin/leads",
            icon: Inbox,
            extra: stats ? `${stats.leadsLast30Days} in the last 30 days` : "",
          },
        ]
      : []),
  ];

  return (
    <div>
      <PageTitle
        title="Dashboard"
        subtitle={
          ADMIN_FEATURES.leads
            ? "Manage website content and see enquiries from the website's forms."
            : "Manage website content."
        }
      />
      {error ? (
        <div className="mb-4">
          <Alert tone="error">{error}</Alert>
        </div>
      ) : null}
      {/* One row on wide screens however many sections are switched on (class names written out
          in full so Tailwind generates them). */}
      <div
        className={`grid gap-4 tablet:grid-cols-2 ${
          cards.length >= 5
            ? "laptop:grid-cols-3 desktop:grid-cols-5"
            : cards.length === 4
              ? "desktop:grid-cols-4"
              : "desktop:grid-cols-3"
        }`}
      >
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.href} href={c.href} className="group block">
              <Card className="flex h-full items-start justify-between gap-4 transition group-hover:border-[#006DDB] group-hover:shadow-sm">
                <div>
                  <p className="text-sm text-[#616161]">{c.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-[#1F1F1F]">{c.value ?? "—"}</p>
                  <p className="mt-1 text-xs text-[#616161]">{c.extra || " "}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#EAF3FD] text-[#006DDB]">
                  <Icon size={22} aria-hidden />
                </span>
              </Card>
            </Link>
          );
        })}
      </div>
      <Card className="mt-6">
        <h3 className="font-semibold text-[#1F1F1F]">Where this content appears</h3>
        <ul className="mt-3 space-y-2 text-sm text-[#616161]">
          <li>
            <span className="font-medium text-[#1F1F1F]">Gallery</span>: Gallery page, Installations and
            3D Concepts sections
          </li>
          <li>
            <span className="font-medium text-[#1F1F1F]">Key Projects</span>: Home page, STELZ Footprint
            carousel
          </li>
          <li>
            <span className="font-medium text-[#1F1F1F]">Clients</span>: Clients page, plus the partner
            logos on the About and Services pages
          </li>
          {ADMIN_FEATURES.testimonials ? (
            <li>
              <span className="font-medium text-[#1F1F1F]">Testimonials</span>: Clients page, Real Stories. Real
              Satisfaction. videos
            </li>
          ) : null}
          {ADMIN_FEATURES.brochures ? (
            <li>
              <span className="font-medium text-[#1F1F1F]">Brochures</span>: the PDFs behind the Download Brochure
              button and the datasheet buttons on product pages
            </li>
          ) : null}
          {ADMIN_FEATURES.leads ? (
            <li>
              <span className="font-medium text-[#1F1F1F]">Leads</span>: enquiries people send through the
              website&apos;s forms (contact, brochure and datasheet)
            </li>
          ) : null}
        </ul>
      </Card>
    </div>
  );
}
