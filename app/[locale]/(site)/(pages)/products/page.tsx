import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import { getRequestLocale } from "@/lib/i18n/locale";
import { translatePath } from "@/lib/i18n/slugMap";
import { SITE_URL } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";
import { getPageCopy } from "@/lib/i18n/pageCopy";

async function loadProductsContent(locale: string) {
  if (locale === "de") {
    return import("@/data/locale/de/ProductsContent").then((m) => m.content);
  }
  return import("@/data/locale/en/ProductsContent").then((m) => m.content);
}

type Item = { id: number | string; image: string; title: string; link: string };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.products.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

export default async function ProductsPage() {
  const locale = await getRequestLocale();
  const [copy, productsContent] = await Promise.all([getPageCopy(locale), loadProductsContent(locale)]);
  const items = (productsContent?.models?.items || []) as Item[];

  return (
    <>
      <PageHeader
        title={copy.products.header.title}
        breadcrumbLabel={copy.products.header.breadcrumb}
        homeLabel={copy.common.homeLabel}
        imageSrc={copy.products.header.background}
      />

      {/* Plain <script> so it is in the server HTML. Product URLs are the real product pages
          (they used to be invented /products/<title> URLs that returned 404). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: copy.products.header.title,
            url: `${SITE_URL}${translatePath("/products", locale)}`,
            inLanguage: locale,
            hasPart: items.map((it) => ({
              "@type": "Product",
              name: it.title,
              url: `${SITE_URL}${translatePath(`/portfolios/${it.link}`, locale)}`,
              image: `${SITE_URL}${it.image}`,
              brand: { "@type": "Brand", name: "STELZ Multiparking" },
            })),
          }),
        }}
      />

      <main className="flex flex-col bg-white">
        <section className="px-3 py-8 tablet:px-1 tablet:py-26 desktop:px-35">
          <div className="mx-auto max-w-[1500px] px-[5px]">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 tablet:grid-cols-3 laptop:grid-cols-2">
              {items.map((item) => {
                // Localised link (e.g. /de/referenzen/stapel/stack-parkieren on German pages).
                const href = translatePath(`/portfolios/${item.link}`, locale);
                return (
                  <article key={item.id} className="group relative overflow-hidden bg-white">
                    <Link href={href} aria-label={`${item.title} image`} className="block">
                      <div className="relative overflow-hidden">
                        <div className="relative w-full tablet:h-80 laptop:h-[440px]" style={{ aspectRatio: "16 / 9" }}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 50vw"
                          />
                        </div>
                      </div>
                    </Link>

                    {/* Product name label: always visible on phones/tablets (no hover on touch
                        screens, so names were never shown there); slides in on hover from laptop up. */}
                    <div
                      className="
                        pointer-events-none absolute left-0 bottom-4
                        translate-x-0 opacity-100
                        laptop:-translate-x-4 laptop:opacity-0
                        transition-all duration-300 ease-out
                        laptop:group-hover:translate-x-0 laptop:group-hover:opacity-100
                        laptop:group-focus-within:translate-x-0 laptop:group-focus-within:opacity-100
                      "
                    >
                      <div
                        className="
                          relative pointer-events-auto inline-flex items-center gap-4 tablet:gap-10
                          bg-white p-3
                          shadow-[0_6px_18px_rgba(0,0,0,0.12)]
                        "
                      >
                        <span className="absolute -top-[3px] left-0 right-0 h-[5px] bg-black" />

                        <Link
                          href={href}
                          className="
                            text-[19px] tablet:text-[24px] font-medium leading-none
                            text-gray-900 hover:text-[#006ddb] focus:text-[#006ddb]
                            focus:outline-none
                          "
                          aria-label={`${item.title} details`}
                        >
                          {item.title}
                        </Link>

                        <Link
                          href={href}
                          aria-label={`Open ${item.title}`}
                          className="
                            grid place-items-center size-9 rounded-full
                            border border-gray-200 bg-white
                            transition-colors duration-200
                            hover:bg-[#006ddb] hover:border-[#006ddb] focus:bg-[#006ddb]
                            outline-none
                          "
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="size-5 text-gray-900 transition-colors duration-200 hover:text-white focus:text-white"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M11 5a1 1 0 0 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5z" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
