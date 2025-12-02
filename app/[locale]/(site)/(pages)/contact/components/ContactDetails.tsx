// app/(site)/(pages)/contact/components/ContactDetailsSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import type { ContactRegionKey, ContactPerson } from "@/data/locale/en/ContactContent";
type ContactContentType = typeof import("@/data/locale/en/ContactContent").CONTACT_CONTENT;

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// allow "no open accordion" on mobile
type RegionValue = ContactRegionKey | "";

export default function ContactDetails({ content }: { content: ContactContentType }) {
  const [activeRegion, setActiveRegion] = useState<RegionValue>("south");

  const { pageTitle, tabs } = content;
  const activeTab = tabs.find((t) => t.key === activeRegion) ?? tabs[0];

  return (
    <section className="bg-white pb-15 pt-25">
      <div className="mx-auto max-w-8xl px-5 lg:px-12">
        {/* Page title */}
        <h1 className="text-center text-[40px] md:text-[52px] font-medium text-[#1F1F1F]">
          {pageTitle}
        </h1>

        {/* Desktop Tabs */}
        <div className="mt-6 hidden justify-center md:flex">
          <div className="flex gap-5">
            {tabs.map((tab) => {
              const isActive = tab.key === activeRegion;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    setActiveRegion(tab.key as ContactRegionKey)
                  }
                  className={[
                    spaceGrotesk.className,
                    "px-8 py-4 text-[17px] font-medium",
                    "border border-[#d0ddf4]",
                    isActive
                      ? "bg-[#006DDB] text-white"
                      : "bg-[#E7F0FF] text-[#616161]",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Accordion (Custom) */}
        <div className="mt-5 md:hidden">
          <div className="mx-auto w-full max-w-md space-y-3">
            {tabs.map((tab) => {
              const isActive = activeRegion === tab.key;
              return (
                <div key={tab.key} className="border border-[#d0ddf4]">
                  <button
                    type="button"
                    onClick={() => {
                      // Toggle collapse when clicking the label
                      if (activeRegion === tab.key) {
                        setActiveRegion("");
                      } else {
                        setActiveRegion(tab.key as ContactRegionKey);
                      }
                    }}
                    className={[
                      spaceGrotesk.className,
                      "w-full px-8 py-3 text-center text-[17px] font-medium transition-all duration-300",
                      isActive
                        ? "bg-[#006DDB] text-white"
                        : "bg-[#E7F0FF] text-[#616161] hover:bg-[#d0ddf4]",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>

                  {/* Animated Content with max-height */}
                  <div
                    className="overflow-hidden bg-white transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isActive ? "1000px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="flex flex-col items-center gap-12 px-8 py-4">
                      {tab.contacts.map((person) => (
                        <ContactCard key={person.id} person={person} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contacts layout (desktop / large) */}
        <div className="mt-10 hidden flex-wrap justify-center gap-x-20 gap-y-12 md:flex">
          {activeTab.contacts.map((person) => (
            <ContactCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCard({ person }: { person: ContactPerson }) {
  return (
    <div className="space-y-2 text-[17px] leading-relaxed">
      <p className="font-bold text-[#616161]">
        {person.name}
      </p>
      <p className="text-[17px] text-[#616161]">{person.role}</p>

      <div className="mt-2 space-y-1 text-[13px]">
        {/* Phone */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/contact/call.svg"
            alt="Phone icon"
            width={14}
            height={14}
            className="h-[14px] w-[14px]"
          />
          <span className="text-[17px] text-[#616161]">
            {person.phone}
          </span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/contact/mail.svg"
            alt="Mail icon"
            width={14}
            height={14}
            className="h-[16px] w-[16px]"
          />
          <span className="text-[17px] text-[#616161]">
            {person.email}
          </span>
        </div>
      </div>
    </div>
  );
}
