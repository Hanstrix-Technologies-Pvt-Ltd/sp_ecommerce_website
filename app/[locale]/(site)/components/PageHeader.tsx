"use client";

import Image from "next/image";
import Link from "next/link";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

interface PageHeaderProps {
  title: string;
  breadcrumbLabel: string;
  homeLabel?: string;
  homeHref?: string;
  locale?: Locale;
  imageSrc?: string;
  heightClass?: string; // e.g. "h-40 tablet:h-52"
}

export default function PageHeader({
  title,
  breadcrumbLabel,
  homeLabel = "stelzparking.com",
  homeHref,
  locale,
  imageSrc = "/assets/pageTemplate/template_top.webp",
  heightClass = "h-27 tablet:h-31",
}: PageHeaderProps) {
  const resolvedHomeHref =
    homeHref ??
    ((locale && locale !== DEFAULT_LOCALE ? `/${locale}` : "/") || "/");
  /* =========================
     Single built-in softener
     0–100 (higher = lighter)
     ========================= */
  const SOFTEN = 80; // <— change this number to adjust globally

  const s = Math.max(0, Math.min(100, SOFTEN));
  const brightness = 1 + (0.15 * s) / 100;   // up to +15%
  const contrast   = 1 - (0.15 * s) / 100;   // down to -15%
  const saturate   = 1 - (0.30 * s) / 100;   // down to -30%
  const overlayA   = (0.60 * s) / 100;       // up to 0.6 opacity

  return (
    <header role="banner" className="relative w-full">

      <div className={`relative w-full ${heightClass}`}>
        <Image
          src={imageSrc}
          alt="" // decorative
          fill
          priority
          quality={75}
          className="object-cover"
          style={{
            filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`,
          }}
        />

        {/* soft white wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: `rgba(255,255,255,${overlayA})` }}
        />

        {/* content */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 tablet:px-8 pb-5 tablet:pb-6">
            {/* breadcrumb — size +1 and weight +1; arrow matches text */}
            <nav aria-label="Breadcrumb" className="text-[15px] tablet:text-[16px]">
              <ol className="flex items-center gap-2 text-[#174b92] font-medium">
                <li>
                  <Link href={resolvedHomeHref} className="transition-colors hover:text-[#0C41AA]" aria-label="Go to homepage" prefetch>
                    {homeLabel}
                  </Link>
                </li>
                <li aria-hidden className="text-[#174b92] font-medium">&gt;</li>
                <li className="font-medium">{breadcrumbLabel}</li>
              </ol>
            </nav>

            <h1 className="mt-1 text-[28px] tablet:text-[40px] font-extrabold leading-tight tracking-tight text-[#174b92]">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
