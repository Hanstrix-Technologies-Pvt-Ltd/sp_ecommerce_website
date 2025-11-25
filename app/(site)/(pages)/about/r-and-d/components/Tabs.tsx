// app/(site)/(pages)/about/r-and-d/components/RAndDTabs.tsx
"use client";

import * as React from "react";
import { Space_Grotesk } from "next/font/google";
import { ChevronRight } from "lucide-react";
import { rANDd } from "@/data/R&DContent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type RAndDSection = (typeof rANDd.sections)[number];

function TabPanel({ section }: { section: RAndDSection }) {
  return (
    <div className="space-y-3">
      <p className="text-[18px] leading-[1.7] text-[#616161]">
        {section.ps}
      </p>
    </div>
  );
}

export default function Tabs(): React.JSX.Element {
  const sections = rANDd.sections;
  const TAB_INDEXES = sections.map((_, idx) => idx);

  // desktop: controlled tabs; mobile/tablet: accordions
  const [active, setActive] = React.useState<number | null>(0); // first tab open by default

  const setDesktopActive = (idx: number) => setActive(idx);
  const toggleMobile = (idx: number) =>
    setActive((prev) => (prev === idx ? null : idx));

  return (
    <section className="relative bg-white pb-16 pt-4 sm:pt-6">
      {/* desktop & mobile share the same horizontal padding; lg uses px-10 */}
      <div className="relative mx-auto max-w-8xl px-4 lg:px-6">
        {/* ---------- DESKTOP TABS (lg+) ---------- */}
        <div className="hidden lg:block">
          <div
            role="tablist"
            aria-label="R&D focus areas"
            className="relative w-full overflow-hidden bg-[#F5F5F5]"
          >
            <div className="grid grid-cols-7">
              {TAB_INDEXES.map((idx, i) => {
                const section = sections[idx];
                const isActive = active === idx;

                return (
                  <button
                    key={section.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-rnd-${idx}`}
                    id={`tab-rnd-${idx}`}
                    onClick={() => setDesktopActive(idx)}
                    className={[
                      spaceGrotesk.className, // titles only
                      "group relative isolate flex items-center justify-center gap-2",
                      "text-[18px] font-medium transition-colors",
                      "py-3 min-h-[44px] px-2",
                      isActive ? "text-[#006DDB]" : "text-[#616161]",
                    ].join(" ")}
                  >
                    {/* active blue rail */}
                    {isActive ? (
                      <span
                        aria-hidden
                        className="absolute left-0 right-0 top-0 h-[2.5px] bg-[#006DDB]"
                      />
                    ) : null}

                    <span className="relative inline-flex items-center">
                      <span>{section.title}</span>
                    </span>

                    {/* vertical divider (except last) */}
                    {i < TAB_INDEXES.length - 1 ? (
                      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-7 w-px bg-black/15" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Desktop panel */}
          <div className="mt-8 px-1.5">
            {TAB_INDEXES.map((idx) => {
              const section = sections[idx];
              const show = active === idx;

              return (
                <div
                  key={section.title}
                  role="tabpanel"
                  id={`panel-rnd-${idx}`}
                  aria-labelledby={`tab-rnd-${idx}`}
                  hidden={!show}
                >
                  {show ? <TabPanel section={section} /> : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------- MOBILE/TABLET ACCORDION (<= lg) ---------- */}
        <div className="mt-6 lg:hidden">
          <ul className="mx-auto w-[95%] divide-y divide-black/10 rounded-none bg-white ring-1 ring-black/10">
            {TAB_INDEXES.map((idx) => {
              const section = sections[idx];
              const open = active === idx;

              return (
                <li key={section.title}>
                  <button
                    type="button"
                    onClick={() => toggleMobile(idx)}
                    className="flex w-full items-center justify-between px-5 py-3.5 min-h-[44px]"
                    aria-expanded={open}
                    aria-controls={`rnd-panel-${idx}`}
                    id={`rnd-acc-${idx}`}
                  >
                    {/* Chevron + title (Space Grotesk) */}
                    <span
                      className={[
                        spaceGrotesk.className,
                        "flex items-center gap-3 text-[18px] font-semibold",
                        open ? "text-[#006DDB]" : "text-[#616161]",
                      ].join(" ")}
                    >
                      <ChevronRight
                        className={[
                          "h-5 w-5 transition-transform duration-300",
                          open ? "rotate-90 text-[#006DDB]" : "text-[#616161]",
                        ].join(" ")}
                        strokeWidth={2.4}
                        aria-hidden
                      />
                      <span className="leading-none">{section.title}</span>
                    </span>
                  </button>

                  <div
                    id={`rnd-panel-${idx}`}
                    role="region"
                    aria-labelledby={`rnd-acc-${idx}`}
                    className={[
                      "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out px-5",
                      open
                        ? "grid-rows-[1fr] opacity-100 py-3"
                        : "grid-rows-[0fr] opacity-0 py-0",
                    ].join(" ")}
                  >
                    <div className="min-h-0">
                      <TabPanel section={section} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
