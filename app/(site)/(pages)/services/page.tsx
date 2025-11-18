// app/(site)/services/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";
import ServicesGrid from "./components/ServicesGrid";
import ContactSidebar from "./components/ContactSidebar";
import Partners from "./components/Partners";

export const metadata: Metadata = {
  title: "Services | STELZ Multiparking | Parking Solutions & Support",
  description:
    "Explore STELZ Multiparking's comprehensive parking services including installation, maintenance, consulting, and 24/7 support for mechanical parking systems.",
  keywords: [
    "parking services",
    "parking solutions",
    "parking installation",
    "parking maintenance",
    "parking consulting",
  ],
  alternates: {
    canonical: "https://stelzparking.com/services",
  },
  openGraph: {
    title: "Services | STELZ Multiparking",
    description:
      "Explore STELZ Multiparking's comprehensive parking services including installation, maintenance, consulting, and 24/7 support.",
    url: "https://stelzparking.com/services",
    type: "website",
    images: [
      {
        url: "https://stelzparking.com/assets/backgrounds/services.jpg",
        width: 1200,
        height: 630,
        alt: "STELZ Parking Services",
      },
    ],
    siteName: "STELZ Multiparking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | STELZ Multiparking",
    description:
      "Explore STELZ Multiparking's comprehensive parking services including installation, maintenance, and support.",
    images: ["https://stelzparking.com/assets/backgrounds/services.jpg"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Services" breadcrumbLabel="Services" />

      <main className="flex flex-col bg-white">
        <section className="relative my-0 md:my-0 lg:my-0 overflow-x-hidden">
          <div className="relative mx-0 xl:mx-16 2xl:mx-24">
            <div className="lg:-mx-3 xl:-mx-4">
              <div
                className="relative w-full rounded-none md:rounded-md bg-no-repeat"
                style={{
                  backgroundImage: "url(/assets/backgrounds/services.jpg)",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  maxWidth: "1440px",
                  marginInline: "auto",
                }}
              >
                {/* ▼ Vertical watermark — TOP-LEFT, end at the top (reads downward) */}
                {/* OUTER: positions + translates (keep your lg:translate-x-50) */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none select-none font-extrabold
                    absolute top-0 left-0 z-0
                    -translate-y-1
                    origin-top-left
                  "
                >
                  {/* INNER: vertical layout + END-at-top + 180° letter flip */}
                  <span
                    className="block rotate-180"               // <- flips letters 180°
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      direction: "rtl",
                      unicodeBidi: "bidi-override",
                      letterSpacing: "8px",
                      lineHeight: 1,
                      color: "rgba(23, 75, 146, 0.07)",
                      fontSize: "100px",
                    }}
                  >
                    SERVICES
                  </span>
                </span>

                {/* CONTENT */}
                <div className="relative z-10 px-5 md:px-10 xl:px-10 pt-6 md:pt-8 lg:pt-20 pb-8 md:pb-10 lg:pb-14">
                  {/* header (arrow + label + title) */}
                  <div className="mb-8 md:mb-10">
                    <div className="flex items-center gap-2 text-[#006DDB]">
                      <span
                        className="inline-block h-4 w-4 bg-[#006DDB]"
                        style={{
                          WebkitMaskImage: "url(/assets/backgrounds/arrow.svg)",
                          maskImage: "url(/assets/backgrounds/arrow.svg)",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                        }}
                        aria-hidden
                      />
                      <span className="text-[17px] font-medium uppercase tracking-wide">
                        Services
                      </span>
                    </div>

                    <h2 className="mt-3 text-4xl md:text-[44px] leading-tight font-extrabold tracking-tight text-[#111]">
                      What We Offer
                    </h2>
                  </div>

                  {/* grid + contact */}
                  <div className="flex flex-col lg:flex-row lg:items-stretch gap-6">
                    <div className="flex-1">
                      <ServicesGrid />
                    </div>
                    <aside className="lg:w-[420px] xl:w-[460px] lg:flex lg:flex-col lg:h-auto">
                      <ContactSidebar />
                    </aside>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Partners />
      </main>
    </>
  );
}
