// app/(site)/services/components/ServicesGrid.tsx
"use client";

import { Space_Grotesk } from "next/font/google";
import type { services as ServicesContent } from "@/data/locale/en/ServicesContent";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["700"] });

function StepBadge({ n }: { n: number }) {
  return (
    <div
      className={`inline-flex h-12 w-10 items-center justify-center rounded-full bg-[#1760d6] text-white text-[15px] font-semibold ${spaceGrotesk.className}`}
    >
      {String(n).padStart(2, "0")}
    </div>
  );
}

export default function ServicesGrid({ items }: { items: typeof ServicesContent.content }) {

  return (
    <div className="relative p-0 overflow-visible">
      <div className="grid grid-cols-1 tablet:grid-cols-2 tablet:gap-x-6">
        {items.map((item, idx) => {
          const isRightCol = idx % 2 === 1;
          const isSecondRow = idx >= 2;

          return (
            <div
              key={item.title}
              className={[
                // compact vertical spacing, no global horizontal padding
                // First row needs more top padding to prevent cutting
                idx < 2 ? "pt-6 pb-4 tablet:pt-4 tablet:pb-2 laptop:pt-8 laptop:pb-6" : "py-4 tablet:py-2 laptop:py-6",
                // row divider
                isSecondRow ? "border-t border-slate-200" : "",
                // vertical grid line only before right column
                isRightCol ? "tablet:border-l tablet:border-slate-200" : "",
                // 👇 padding from the vertical grid line
                isRightCol ? "tablet:pl-6" : "tablet:pr-6",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex items-center gap-3">
                <StepBadge n={idx + 1} />
                <span className="text-[36px] tracking-wide text-slate-300/60 leading-none">
                  STEP
                </span>
              </div>

              <h3 className="mt-4 text-[24px] leading-snug font-extrabold text-[#111]">
                {item.title}
              </h3>

              <p className="mt-3 text-[17px] leading-7 text-slate-600">
                {item.ps}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
