// components/about/Section.tsx
import * as React from "react";
import type { AboutSection } from "@/data/locale/en/AboutContent";
import { RichParagraphs } from "./Rich";

export function AboutSectionBlock({ section }: { section: AboutSection }) {
  const { heading, paragraphs, items } = section;

  return (
    <section className="space-y-4 tablet:space-y-5">
      {/* Only render heading if present */}
      {heading ? (
        <h3 className="text-[18px] tablet:text-[20px] font-semibold text-[#0a1a33]">{heading}</h3>
      ) : null}

      {paragraphs ? <RichParagraphs paragraphs={paragraphs} /> : null}

      {items?.length ? (
        <ul className="mt-2 space-y-2">
          {items.map((it, idx) => (
            <li key={idx} className="text-[15px] tablet:text-[16px] leading-7 text-neutral-700">
              {it.label ? <strong className="font-semibold">{it.label}: </strong> : null}
              <span>{it.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default AboutSectionBlock;
