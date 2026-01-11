// app/(site)/services/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import ServicesGrid from "./components/ServicesGrid";
import ContactSidebar from "./components/ContactSidebar";
import Partners from "./components/Partners";
import { getRequestLocale } from "@/lib/i18n/locale";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.services.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

export default async function ServicesPage() {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const c = copy.services;
  const servicesContent =
    locale === "de"
      ? await import("@/data/locale/de/ServicesContent").then((m) => m.services)
      : await import("@/data/locale/en/ServicesContent").then((m) => m.services);

  return (
    <>
      <PageHeader
        title={c.header.title}
        breadcrumbLabel={c.header.breadcrumb}
        homeLabel={copy.common.homeLabel}
        locale={locale}
      />

      <main className="flex flex-col bg-white">
        <section className="relative my-0 overflow-x-hidden">
          <div className="relative mx-0 desktop:mx-16 wide:mx-24">
            <div className="laptop:-mx-3 desktop:-mx-4">
              <div
                className="relative w-full rounded-none bg-no-repeat tablet:rounded-md"
                style={{
                  backgroundImage: `url(${c.header.background})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  maxWidth: "1440px",
                  marginInline: "auto",
                }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 z-0 -translate-y-1 select-none font-extrabold origin-top-left"
                >
                  <span
                    className="block rotate-180"
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
                    {c.header.watermark}
                  </span>
                </span>

                <div className="relative z-10 px-5 pt-6 pb-8 tablet:px-10 tablet:pt-8 tablet:pb-10 laptop:pt-20 laptop:pb-14 desktop:px-10">
                  <div className="mb-8 tablet:mb-10">
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
                      <span className="text-[17px] font-medium uppercase tracking-wide">{c.header.label}</span>
                    </div>

                    <h2 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#111] tablet:text-[44px]">
                      {c.header.headline}
                    </h2>
                  </div>

                  <div className="flex flex-col gap-6 laptop:flex-row laptop:items-stretch">
                    <div className="flex-1">
                      <ServicesGrid items={servicesContent.content} />
                    </div>
                    <aside className="laptop:w-[420px] desktop:w-[460px] laptop:flex laptop:flex-col laptop:h-auto">
                      <ContactSidebar copy={c.contactSidebar} />
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

