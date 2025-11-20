// components/about/Rich.tsx
import * as React from "react";
import type { RichParagraph } from "@/data/AboutContent";

export function RichParagraphs({ paragraphs }: { paragraphs: RichParagraph[] }) {
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className="text-[15px] md:text-[16px] leading-7 md:leading-8 text-neutral-700">
          {para.map((seg, j) =>
            seg.type === "bold" ? (
              <strong key={j} className="font-semibold">
                {seg.text}
              </strong>
            ) : (
              <span key={j}>{seg.text}</span>
            )
          )}
        </p>
      ))}
    </>
  );
}
