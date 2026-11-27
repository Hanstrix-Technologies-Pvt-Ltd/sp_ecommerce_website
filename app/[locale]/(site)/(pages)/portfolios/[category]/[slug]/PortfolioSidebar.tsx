"use client";

// Interactive part of the product page sidebar (datasheet lead form + modal).
// All data is prepared on the server in layout.tsx and passed in as plain props, so the
// sidebar renders with the page instead of after a client-side "Loading..." step.

import Link from "next/link";
import { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { Linkedin, Facebook, Instagram, Youtube, ArrowRight, type LucideIcon } from "lucide-react";
import ContactFormCard from "./ContactFormCard";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { submitLeadCapture, triggerDatasheetDownload } from "@/lib/leadCapture";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

export type PortfolioSidebarProps = {
  heading: string;
  buttons: { label: string; href: string }[];
  videoUrl: string;
  productTitle: string;
  contactTitle: string;
  contactCopy: React.ComponentProps<typeof ContactFormCard>["copy"];
  datasheetUrl?: string;
  datasheetLabel: string;
  followUsLabel: string;
  socials: { key: string; href: string; label: string }[];
};

export default function PortfolioSidebar({
  heading,
  buttons,
  videoUrl,
  productTitle,
  contactTitle,
  contactCopy,
  datasheetUrl,
  datasheetLabel,
  followUsLabel,
  socials,
}: PortfolioSidebarProps) {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLeadSubmit = async (
    leadData: Parameters<React.ComponentProps<typeof LeadCaptureModal>["onSubmit"]>[0]
  ) => {
    setIsSubmitting(true);
    try {
      const result = await submitLeadCapture({
        ...leadData,
        source: "datasheet_download",
        product: productTitle,
      } as Parameters<typeof submitLeadCapture>[0]);
      if (result.success) {
        setShowLeadModal(false);
        await triggerDatasheetDownload(result.leadId!, datasheetUrl || "");
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert(error instanceof Error && error.message ? error.message : "Failed to submit lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <aside className="space-y-8">
        <div className="mx-auto w-full py-5 tablet:max-w-[300px]">
          <h3 className="mb-6 text-center text-[25px] font-extrabold leading-none tracking-tight text-[#006DDB]">
            {heading}
          </h3>

          <ul className="space-y-4">
            {buttons.map((b) => (
              <li key={b.href}>
                <Link
                  href={b.href}
                  aria-label={b.label}
                  className="group relative block w-full overflow-hidden bg-[#006DDB] py-4 px-6 text-[18px] font-semibold text-white"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-[#2458A4] transition-transform duration-500 ease-out group-hover:translate-x-0"
                  />
                  <span className="relative z-[1] flex items-center justify-center gap-3">
                    <span>{b.label}</span>
                    <span className="relative inline-block h-5 w-8 overflow-hidden">
                      <ArrowRight
                        className="absolute inset-0 transition-all duration-500 ease-out group-hover:translate-x-[14px] group-hover:opacity-0"
                        strokeWidth={2.4}
                      />
                      <ArrowRight
                        className="absolute inset-0 -translate-x-[14px] opacity-0 transition-all duration-500 ease-out delay-100 group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={2.4}
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {videoUrl ? (
          <div className="mx-auto w-full overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 tablet:max-w-[360px]">
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={videoUrl}
                title={`${productTitle} video`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        ) : null}

        <div className={`${spaceGrotesk.className} mx-auto w-full border border-neutral-900 tablet:max-w-[360px]`}>
          <div className="px-6 pt-6">
            <h3 className="text-[30px] font-medium leading-none tracking-tight text-[#0a1a33]">{contactTitle}</h3>
          </div>

          <div className="mt-4" />

          <ContactFormCard copy={contactCopy} />
        </div>

        {datasheetUrl ? (
          <div className={`${spaceGrotesk.className} mx-auto w-full px-0 py-6 tablet:max-w-[260px]`}>
            <button
              onClick={() => setShowLeadModal(true)}
              className="block w-full bg-[#006DDB] p-5 text-center text-[17px] text-white transition hover:bg-[#0a3a85]"
              aria-label={`${datasheetLabel} - ${productTitle}`}
            >
              {datasheetLabel}
            </button>
          </div>
        ) : null}

        <div className="mx-auto w-full bg-[#EBEBEB] p-[40px] tablet:max-w-[360px]">
          <h3 className="text-[30px] font-extrabold leading-none tracking-tight text-[#0a1a33]">{followUsLabel}</h3>

          <div className="mt-6 flex items-center gap-4">
            {socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.key];
              return (
                <Link
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-12 w-12 items-center justify-center bg-[#E6E6E9] text-[#0a1a33] ring-1 ring-black/5 transition hover:bg-[#006DDB] hover:text-white"
                >
                  {Icon ? <Icon className="h-6 w-6" /> : null}
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={handleLeadSubmit}
        isLoading={isSubmitting}
      />
    </>
  );
}
