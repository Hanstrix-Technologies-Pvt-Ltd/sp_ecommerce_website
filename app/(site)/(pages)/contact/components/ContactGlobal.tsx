// app/(site)/(pages)/contact/components/ContactGlobalSection.tsx
"use client";

import dynamic from "next/dynamic";
import { Space_Grotesk } from "next/font/google";
import { CONTACT_CONTENT } from "@/data/ContactContent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LeafletLocationsMap = dynamic(
  () => import("./LeafletLocationsMap"),
  { ssr: false }
);

export default function ContactGlobal() {
  const { globalSection } = CONTACT_CONTENT;

  return (
    <section
      className={`${spaceGrotesk.className} bg-white pt-12 pb-10 sm:pt-16`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-5 lg:px-12 text-center">
        <p className="text-[16px] font-medium text-[#006DDB]">
          {globalSection.eyebrow}
        </p>
        <h2 className="mt-3 text-[32px] md:text-[52px] font-semibold text-[#1F1F1F]">
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
