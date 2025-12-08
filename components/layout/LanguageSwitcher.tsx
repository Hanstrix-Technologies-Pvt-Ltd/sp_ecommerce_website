"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DEFAULT_LOCALE, LOCALE_META, type Locale } from "@/lib/i18n/config";
import { stripLocaleFromPath, translatePath } from "@/lib/i18n/slugMap";
import { setLocaleCookie } from "@/lib/i18n/setLocaleCookie";

type Option = {
  value: Locale;
  country: string;
  label: string;
};

const OPTIONS: Option[] = [
  { value: "en", country: LOCALE_META.en.country, label: LOCALE_META.en.label },
  { value: "de", country: LOCALE_META.de.country, label: LOCALE_META.de.label },
];

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  const { locale: currentLocale } = useMemo(() => stripLocaleFromPath(pathname), [pathname]);

  const onSelect = useCallback(
    (locale: Locale) => {
      setLocaleCookie(locale);
      const nextPath = translatePath(pathname, locale);
      setOpen(false);
      startTransition(() => {
        router.push(nextPath);
        router.refresh();
      });
    },
    [pathname, router]
  );

  useEffect(() => {
    const onClickAway = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onClickAway);
    return () => document.removeEventListener("pointerdown", onClickAway);
  }, []);

  const currentLabel = currentLocale === "de" ? "DE" : "EN";

  return (
    <div ref={containerRef} className="relative select-none">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold uppercase tracking-wide shadow-sm transition hover:border-neutral-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174b92]"
        disabled={isPending}
      >
        <Image src="/assets/home/globe.svg" width={18} height={18} alt="" />
        <span aria-hidden className="h-4 w-px bg-neutral-200" />
        <span className="text-neutral-900 group-hover:text-[#174b92]">{currentLabel}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-neutral-200 bg-white py-2 shadow-lg shadow-black/10 ring-1 ring-black/5 focus:outline-none"
          >
            {OPTIONS.map((option) => {
              const isActive = option.value === currentLocale;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    onClick={() => onSelect(option.value)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-sm transition hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#174b92] ${
                      isActive ? "text-[#174b92] font-semibold" : "text-neutral-800"
                    }`}
                  >
                    <span className="flex flex-col items-start leading-tight">
                      <span className="text-xs uppercase tracking-wide text-neutral-500">{option.country}</span>
                      <span>{option.label}</span>
                    </span>
                    {isActive && <span className="text-xs font-semibold text-[#174b92]">●</span>}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LocaleChip({ locale }: { locale: Locale | null | undefined }) {
  const resolved = locale ?? DEFAULT_LOCALE;
  return (
    <span className="rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-700">
      {resolved}
    </span>
  );
}
