"use client";

import Link from "next/link";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import { notFound } from "next/navigation";
import { Linkedin, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import { useParams } from "next/navigation";
import { translatePath } from "@/lib/i18n/slugMap";
import { normalizeLocale, type Locale } from "@/lib/i18n/config";
import { getFooterContent } from "@/lib/i18n/content";
import type { ProductCategory, ProductRecord } from "@/data/locale/en/Products";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import ContactFormCard from "./ContactFormCard";
import { useState, useEffect } from "react";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { submitLeadCapture, triggerBrochureDownload } from "@/lib/leadCapture";

type Params = { category: string; slug: string; locale: string };

async function loadProducts(locale: string) {
  if (locale === "de") {
    return import("@/data/locale/de/Products");
  }
  return import("@/data/locale/en/Products");
}

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const isValidCategory = (value: string): value is ProductCategory =>
  ["stack", "puzzle", "automatic"].includes(value);

const RIGHT_BUTTONS = [
  { key: "stack", label: { en: "Stack parking", de: "Stack-Parken" }, href: "/portfolios/stack/stack-parking" },
  { key: "puzzle", label: { en: "Puzzle parking", de: "Puzzle-Parken" }, href: "/portfolios/puzzle/puzzle-parking" },
  { key: "pit-puzzle", label: { en: "Pit Puzzle", de: "Gruben-Puzzle" }, href: "/portfolios/puzzle/pit-puzzle" },
  { key: "car-hoist", label: { en: "Car Hoist", de: "Autoaufzug" }, href: "/portfolios/automatic/car-hoist" },
  { key: "turn-table", label: { en: "Turn Table", de: "Drehteller" }, href: "/portfolios/automatic/turn-table" },
  { key: "cantilever", label: { en: "Cantilever parking", de: "Kragarm-Parken" }, href: "/portfolios/stack/cantilever-parking" },
  { key: "pit-stacker", label: { en: "Pit Stacker", de: "Gruben-Stacker" }, href: "/portfolios/stack/pit-stacker" },
] as const;

const VIDEO_MAP: Record<string, string> = {
  "stack-parking": "https://www.youtube.com/embed/G7oSn3dupYE?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "3-level-stack-parking":
    "https://www.youtube.com/embed/QIK5me0_vWE?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "pit-stacker":
    "https://www.youtube.com/embed/rVev3ghL2Kg?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "puzzle-parking":
    "https://www.youtube.com/embed/9spsJ1HbD0o?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
};

export default function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const urlParams = useParams();
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [localizedProduct, setLocalizedProduct] = useState<ProductRecord | null>(null);
  const [baseProduct, setBaseProduct] = useState<ProductRecord | null>(null);
  const [headerTitle, setHeaderTitle] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [footer, setFooter] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);
  const [localizedButtons, setLocalizedButtons] = useState<any[]>([]);
  const [copy, setCopy] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;
        const currentLocale = normalizeLocale(urlParams.locale as string);
        const [{ category: cat, slug: slugVal }, productsModule, footerModule, pageCopy] = await Promise.all([
          resolvedParams,
          loadProducts(currentLocale),
          getFooterContent(currentLocale),
          getPageCopy(currentLocale),
        ]);

        setLocale(currentLocale);
        setCategory(cat);
        setSlug(slugVal);
        setCopy(pageCopy);

        if (!isValidCategory(cat)) {
          notFound();
          return;
        }

        const enProducts = await import("@/data/locale/en/Products");
        const baseProd = enProducts.getProduct(cat, slugVal);
        const localizedProd =
          currentLocale === "en"
            ? baseProd
            : (productsModule.getProduct?.(cat, slugVal) as ProductRecord | null) ||
              (baseProd
                ? (productsModule.PRODUCTS as ProductRecord[]).find((p) => p.id === baseProd.id) ?? null
                : null);

        setBaseProduct(baseProd);
        setLocalizedProduct(localizedProd);
        setHeaderTitle(localizedProd?.title ?? baseProd?.title ?? "Product");
        setVideoUrl(baseProd?.slug ? VIDEO_MAP[baseProd.slug] || "" : "");
        setFooter(footerModule.content.footer);

        const socialsData = [
          { key: "linkedin", href: footerModule.content.footer.contact.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
          { key: "instagram", href: footerModule.content.footer.contact.socials.instagram, label: "Instagram", Icon: Instagram },
          { key: "youtube", href: footerModule.content.footer.contact.socials.youtube, label: "YouTube", Icon: Youtube },
          { key: "facebook", href: footerModule.content.footer.contact.socials.facebook, label: "Facebook", Icon: Facebook },
        ].filter((s) => !!s.href);
        setSocials(socialsData);

        const buttons = RIGHT_BUTTONS.map((b) => ({
          label: (b.label as any)[currentLocale] ?? b.label.en,
          href: translatePath(b.href, currentLocale),
        }));
        setLocalizedButtons(buttons);
      } catch (error) {
        console.error("Error loading portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params, urlParams.locale]);

  const handleLeadSubmit = async (leadData: any) => {
    setIsSubmitting(true);
    try {
      const result = await submitLeadCapture(leadData);
      if (result.success) {
        setShowLeadModal(false);
        await triggerBrochureDownload(result.leadId!);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Failed to submit lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PageHeader
        title={headerTitle}
        breadcrumbLabel={headerTitle}
        homeLabel={copy.common.homeLabel}
        imageSrc={copy.products.header.background}
      />

      <main className="bg-white">
        <section className="mx-auto max-w-[1450px] px-4 tablet:px-10 py-15 tablet:py-25">
          <div className="grid grid-cols-1 gap-10 tablet:grid-cols-[1fr_420px]">
            <div>{children}</div>

            <aside className="space-y-8">
              <div className="mx-auto w-full py-5 tablet:max-w-[300px]">
                <h3 className="mb-6 text-center text-[25px] font-extrabold leading-none tracking-tight text-[#006DDB]">
                  {copy.products.sidebar?.heading ?? "Our Parking Systems"}
                </h3>

                <ul className="space-y-4">
                  {localizedButtons.map((b) => (
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
                      title={`${headerTitle} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              ) : null}

              <div className={`${spaceGrotesk.className} mx-auto w-full border border-neutral-900 tablet:max-w-[360px]`}>
                <div className="px-6 pt-6">
                  <h3 className="text-[30px] font-medium leading-none tracking-tight text-[#0a1a33]">
                    {copy.contact.form.title ?? "Contact Now"}
                  </h3>
                </div>

                <div className="mt-4" />

                <ContactFormCard copy={copy.contact.form} />
              </div>

              {localizedProduct?.brochureUrl ? (
                <div className={`${spaceGrotesk.className} mx-auto w-full px-0 py-6 tablet:max-w-[260px]`}>
                  <button
                    onClick={() => setShowLeadModal(true)}
                    className="block w-full bg-[#006DDB] p-5 text-center text-[17px] text-white transition hover:bg-[#0a3a85]"
                    aria-label={`${copy.productPage.labels.brochure} - ${localizedProduct?.title ?? baseProduct?.title ?? "Product"}`}
                  >
                    {copy.productPage.labels.downloadBrochure}
                  </button>
                </div>
              ) : null}

              <div className="mx-auto w-full bg-[#EBEBEB] p-[40px] tablet:max-w-[360px]">
                <h3 className="text-[30px] font-extrabold leading-none tracking-tight text-[#0a1a33]">
                  {copy.products.sidebar?.followUs ?? "Follow Us On"}
                </h3>

                <div className="mt-6 flex items-center gap-4">
                  {socials.map((s) => (
                    <Link
                      key={s.key}
                      href={s.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="inline-flex h-12 w-12 items-center justify-center bg-[#E6E6E9] text-[#0a1a33] ring-1 ring-black/5 transition hover:bg-[#006DDB] hover:text-white"
                    >
                      <s.Icon className="h-6 w-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={() => setShowLeadModal(false)}
        onSubmit={handleLeadSubmit}
        isLoading={isSubmitting}
      />
    </>
  );
}
