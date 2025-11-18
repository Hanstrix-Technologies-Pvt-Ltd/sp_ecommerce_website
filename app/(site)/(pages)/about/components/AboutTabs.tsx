"use client";

import * as React from "react";
import {
  ABOUT_CONTENT,
  type TabContent,
  type AboutSection,
  type RichParagraph,
  type RichSegment,
} from "@/data/AboutContent";

/* ------------------------------ render utils ------------------------------ */

function renderParagraph(p: RichParagraph, key: React.Key) {
  return (
    <p key={key} className="text-[17px] leading-7 text-[#616161]">
      {p.map((seg: RichSegment, i) =>
        seg.type === "bold" ? (
          <strong key={i} className="font-semibold text-[#616161]">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </p>
  );
}

function SectionBlock({ section }: { section: AboutSection }) {
  return (
    <>
      {/* conditional heading */}
      {section.heading ? (
        <h3 className="text-[17px] font-semibold text-[#616161]">
          {section.heading}
        </h3>
      ) : null}

      {section.paragraphs?.map((para, idx) => renderParagraph(para, idx))}

      {section.items?.length ? (
        // CHANGED: Added list-disc, pl-5 for bullets, and reduced space-y to 1 for compactness
        <ul className="list-disc pl-10 space-y-1">
          {section.items.map((it, ix) => (
            <li key={ix} className="text-[17px] leading-7 text-[#616161]">
              {it.label ? (
                <strong className="font-semibold text-[#616161]">
                  {it.label}:{" "}
                </strong>
              ) : null}
              <span>{it.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

function TabPanel({ content }: { content: TabContent }) {
  return (
    <div className="space-y-2">
      {content.sections.map((s, i) => (
        <SectionBlock key={i} section={s} />
      ))}
    </div>
  );
}

/* --------------------------------- UI ------------------------------------ */

const TAB_KEYS = ["about", "vision", "mission"] as const;
type TabKey = (typeof TAB_KEYS)[number];

const LABELS: Record<TabKey, string> = {
  about: "About Us",
  vision: "Our Vision",
  mission: "Our Mission",
};

export default function AboutTabs(): React.JSX.Element {
  const [active, setActive] = React.useState<TabKey>("about");
  const tabs: Record<TabKey, TabContent> = ABOUT_CONTENT.tabs;

  return (
    /* bg-white to prevent any inherited dark/black background,
       px-10 on md+ (px-4 on mobile), and NO top margin */
    <section className="bg-white px-4 md:px-20 pb-15">
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="About sections"
        className="relative w-full overflow-hidden bg-[#F5F5F5]"
      >
        <div className="grid grid-cols-3">
          {TAB_KEYS.map((key, idx) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${key}`}
                id={`tab-${key}`}
                onClick={() => setActive(key)}
                className={[
                  "relative flex items-center justify-center py-3 text-center text-[17px] transition-colors font-medium",
                  isActive ? "font-semibold text-[#006DDB]" : "text-[#616161]",
                  // a bit of horizontal breathing room so the short divider looks detached
                  "px-2",
                ].join(" ")}
              >
                {/* active blue top bar */}
                {isActive ? (
                  <span
                    className="absolute inset-x-0 top-0 h-1 bg-[#006DDB]"
                    aria-hidden
                  />
                ) : null}

                {LABELS[key]}

                {/* short vertical separator (not on the last tab) */}
                {idx !== TAB_KEYS.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-7 w-px bg-black/15"
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panels */}
      <div className="mt-8">
        {TAB_KEYS.map((key) => {
          const isActive = active === key;
          return (
            <div
              key={key}
              role="tabpanel"
              id={`panel-${key}`}
              aria-labelledby={`tab-${key}`}
              hidden={!isActive}
              className="space-y-6"
            >
              {isActive ? <TabPanel content={tabs[key]} /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}