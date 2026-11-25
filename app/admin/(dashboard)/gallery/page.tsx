"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { adminFetch, Alert, PageTitle } from "../../components/ui";
import { SECTIONS, type Section } from "./GallerySection";

type Item = { id: string; imageUrl: string; published: boolean };

const PAGES: { section: Section; href: string }[] = [
  { section: "installation", href: "/admin/gallery/installations" },
  { section: "concept", href: "/admin/gallery/concepts" },
];

/** Gallery start page: pick which of the two carousels to manage. */
export default function AdminGalleryPage() {
  const [data, setData] = useState<Partial<Record<Section, Item[]>>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    for (const { section } of PAGES) {
      adminFetch<{ items: Item[] }>(`/api/admin/gallery?page=1&pageSize=100&section=${section}`)
        .then((json) => setData((d) => ({ ...d, [section]: json.items })))
        .catch((e: Error) => setError(e.message || "Failed to load"));
    }
  }, []);

  return (
    <div>
      <PageTitle title="Gallery" subtitle="The Gallery page has two carousels. Choose which one to manage." />
      {error ? <div className="mb-4"><Alert tone="error">{error}</Alert></div> : null}
      <div className="grid gap-5 laptop:grid-cols-2">
        {PAGES.map(({ section, href }) => {
          const info = SECTIONS[section];
          const items = data[section];
          const shown = items?.filter((i) => i.published) ?? [];
          return (
            <Link
              key={section}
              href={href}
              className="group flex flex-col border border-[#E5E7EB] bg-white transition hover:border-[#006DDB] hover:shadow-sm"
            >
              {/* Preview strip of the first few images shown on the website */}
              <div className="grid h-36 grid-cols-4 gap-0.5 bg-[#F5F5F5]">
                {(shown.length ? shown : items ?? []).slice(0, 4).map((i) => (
                  <div key={i.id} className="relative">
                    <Image src={i.imageUrl} alt="" fill sizes="160px" className={section === "concept" ? "object-contain p-1" : "object-cover"} />
                  </div>
                ))}
              </div>
              <div className="flex flex-1 items-start justify-between gap-3 p-5">
                <div>
                  <h3 className="text-lg font-semibold text-[#1F1F1F]">{info.heading}</h3>
                  <p className="mt-1 text-sm text-[#616161]">{info.where}</p>
                  <p className="mt-3 text-sm font-medium text-[#1F1F1F]">
                    {items ? `${shown.length} of ${items.length} shown on the website` : "Loading…"}
                  </p>
                </div>
                <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-[#006DDB]">
                  Manage <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
