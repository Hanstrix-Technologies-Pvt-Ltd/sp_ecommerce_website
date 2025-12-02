// app/(site)/(pages)/contact/components/ContactGlobalSection.tsx
"use client";

import dynamic from "next/dynamic";
import { Space_Grotesk } from "next/font/google";
type ContactContentType = typeof import("@/data/locale/en/ContactContent").CONTACT_CONTENT;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LeafletLocationsMap = dynamic(() => import("./LeafletLocationsMap"), { ssr: false });

function BlueArrow() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 bg-[#006DDB]"
      style={{
        WebkitMaskImage: "url(/assets/backgrounds/arrow.svg)",
        maskImage: "url(/assets/backgrounds/arrow.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export default function ContactGlobal({ content }: { content: ContactContentType }) {
  const { globalSection } = content;

  return (
    <section
      className={`${spaceGrotesk.className} bg-white pt-12 pb-10 sm:pt-16`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-5 lg:px-12 text-center">
        <div className="flex items-center justify-center gap-2">
          <BlueArrow />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#006DDB] md:text-sm">
            {globalSection.eyebrow}
          </span>
        </div>
        <h2 className="mt-2 text-[32px] md:text-[52px] font-semibold text-[#1F1F1F]">
          {globalSection.title}
        </h2>
        <p className="mt-3 text-[17px] text-[#616161]">
          {globalSection.body}
        </p>
      </div>

      <div className="mx-auto mt-10 px-4 sm:px-5 lg:px-12">
        <LeafletLocationsMap />
      </div>
    </section>
  );
}
