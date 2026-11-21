"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, PageTitle, Alert } from "../components/ui";

type Stats = {
  gallery: number;
  projects: number;
  clients: number;
  publishedProjects: number;
  activeClients: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (r) => {
        const j = await r.json();
        if (!r.ok || !j.success) throw new Error(j.message || "Failed to load stats");
        setStats(j);
      })
      .catch((e) => setError(e.message));
  }, []);

  const cards = [
    { label: "Gallery items", value: stats?.gallery, href: "/admin/gallery" },
    {
      label: "Key projects",
      value: stats?.projects,
      href: "/admin/projects",
      extra: stats ? `${stats.publishedProjects} published` : "",
    },
    {
      label: "Clients",
      value: stats?.clients,
      href: "/admin/clients",
      extra: stats ? `${stats.activeClients} active` : "",
    },
  ];

  return (
    <div>
      <PageTitle
        title="Dashboard"
        subtitle="Manage gallery, key projects, and clients shown on the public website."
      />
      {error ? <Alert tone="error">{error}</Alert> : null}
      <div className="grid gap-4 tablet:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.href} href={c.href}>
            <Card className="bg-white transition hover:border-[#006DDB]">
              <p className="text-sm text-[#616161]">{c.label}</p>
              <p className="mt-2 text-3xl font-semibold text-[#1F1F1F]">{c.value ?? "—"}</p>
              {c.extra ? <p className="mt-1 text-xs text-[#616161]">{c.extra}</p> : null}
            </Card>
          </Link>
        ))}
      </div>
      <Card className="mt-6 bg-white">
        <h3 className="font-semibold text-[#1F1F1F]">Public impact</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#616161]">
          <li>Gallery → `/gallery` installations &amp; concepts</li>
          <li>Key Projects → Home STELZ Footprint carousel</li>
          <li>Clients → `/clients`, About &amp; Services partners</li>
        </ul>
      </Card>
    </div>
  );
}
