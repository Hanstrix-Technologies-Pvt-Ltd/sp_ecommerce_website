import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import { ArrowRight } from "lucide-react";
import { getRequestLocale } from "@/lib/i18n/locale";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";

const logos = [
  "purvankara",
  "vamsiram",
  "bhartiya",
  "sparsh",
  "manipal",
  "confident",
  "suvarna",
  "aragen",
  "brigade",
  "cmr",
  "concorde",
  "divyasree",
  "dmart",
  "durga",
  "esic",
  "gar",
  "ginger",
  "indiqube",
  "kalyani",
  "lohia",
  "maavi",
  "nanik",
  "pavani",
  "phoenix",
  "sattva",
  "sapra",
  "shriram",
  "skav",
  "supreme",
  "swojas",
  "taksh",
  "ushodaya",
  "vaishnavi",
] as const;

const GUTTERS = {
  partnersGrid: "px-6 md:px-12 lg:px-16 xl:px-24",
  testimonials: "px-4 md:px-8 lg:px-12 xl:px-16",
};

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

function DocLogo({ name }: { name: string }) {
  const src = `/assets/clients/${name}.webp`;
  const CUT = 45;

  return (
    <div
      className="relative aspect-square bg-white ring-1 ring-gray-200 shadow-sm transition md:hover:shadow-md"
      style={{
        clipPath: `polygon(
          0 0,
          calc(100% - ${CUT}px) 0,
          100% ${CUT}px,
          100% 100%,
          0 100%
        )`,
        borderRadius: "18px",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6 md:p-7">
        <Image
          src={src}
          alt={`${name} logo`}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 44vw, (max-width: 1024px) 22vw, 12vw"
        />
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.clients.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

export default async function ClientsPage() {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const c = copy.clients;

  return (
    <>
      <PageHeader title={c.header.title} breadcrumbLabel={c.header.breadcrumb} homeLabel={copy.common.homeLabel} />

      <section className="relative bg-cover bg-center py-6 md:py-10" style={{ backgroundImage: "url(/assets/backgrounds/clients.webp)" }}>
        <div className="w-full px-5 text-center">
          <div className="flex items-center justify-center gap-2">
            <BlueArrow />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#006DDB] md:text-sm">
              {c.partners.label}
            </span>
          </div>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 md:mt-3 md:text-[55px]">
            {c.partners.title}
          </h2>

          <p className="mt-3 w-full text-base leading-7 text-neutral-600 hover:text-red-500 md:mt-4 md:text-lg md:leading-8">
            {c.partners.body}
          </p>
        </div>

        <div className={`mx-auto w-full max-w-[1600px] ${GUTTERS.partnersGrid}`}>
          <div className="mx-auto mt-8 grid grid-cols-2 gap-y-0 gap-x-5 sm:grid-cols-3 md:mt-10 md:grid-cols-4 md:gap-x-6 lg:grid-cols-5 xl:grid-cols-6">
            {logos.map((name) => (
              <DocLogo key={name} name={name} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 md:py-12">
        <div className={`mx-auto w-full max-w-[1500px] ${GUTTERS.testimonials}`}>
          <div className="flex items-center gap-2">
            <BlueArrow />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#006DDB] md:text-[15px]">
              {c.testimonials.label}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-6 md:mt-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl">
              {c.testimonials.title}
            </h2>

            <Link
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 self-start rounded-sm bg-[#006DDB] px-9 py-5 font-medium text-white transition hover:bg-[#0a3a85] md:self-auto md:gap-5"
            >
              {c.testimonials.ctaLabel}
              <ArrowRight className="h-6 w-6" strokeWidth={2.25} />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              "https://www.youtube.com/embed/hp3cmrW7xsM",
              "https://www.youtube.com/embed/njkMD_fyX-I",
              "https://www.youtube.com/embed/MO3C_pTyy-g",
            ].map((src, i) => (
              <div key={i} className="aspect-video overflow-hidden rounded-sm ring-1 ring-gray-200 shadow-sm">
                <iframe
                  className="h-full w-full"
                  src={src}
                  title={`Testimonial Video ${i + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
