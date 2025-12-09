"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { NavLink } from "@/data/locale/en/NavContent";
import type { Locale } from "@/lib/i18n/config";
import { translatePath } from "@/lib/i18n/slugMap";
import { useIsLaptopUI } from "@/lib/useIsLaptopUI";

const BLUE_HEX = "#174b92";
const BLUE_BG = "bg-[#174b92]";

/* =======================
   Animation timing knobs
   ======================= */
const ANIM = {
  overlayDuration: 0.5,
  drawerDuration: 0.5,
  drawerDelay: 0.4,
  dropdownDuration: 0.32,
  accordionDuration: 0.26,
} as const;

/** items that are section headers (no page) and must not navigate on click */
const PRODUCTS_PARENT_ONLY = new Set<string>(["/products/stack", "/products/puzzle", "/products/automatic"]);

function isActive(pathname: string, href?: string): boolean {
  if (!href) return false;
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
function hasKids(i: NavLink): i is NavLink & { children: NavLink[] } {
  return Array.isArray(i.children) && i.children.length > 0;
}
function isProductsParentOnly(item: NavLink): boolean {
  return !!item.href && PRODUCTS_PARENT_ONLY.has(item.href);
}

/* ------- Framer Motion variants (symmetric entry & exit) ------- */
const dropVariants: Variants = {
  hidden: { opacity: 0, y: 10, pointerEvents: "none" },
  show: {
    opacity: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: ANIM.dropdownDuration, ease: [0.22, 1, 0.36, 1] },
  },
};
const overlayVariants: Variants = {
  hidden: { width: 0, opacity: 0 },
  show: {
    width: "100vw",
    opacity: 1,
    transition: { duration: ANIM.overlayDuration, ease: "easeOut", delay: 0 },
  },
  exit: {
    width: 0,
    opacity: 0,
    transition: { duration: ANIM.overlayDuration, ease: "easeIn", delay: ANIM.drawerDelay },
  },
};
const drawerVariants: Variants = {
  hidden: { x: "-100%" },
  show: {
    x: 0,
    transition: { duration: ANIM.drawerDuration, ease: [0.22, 1, 0.36, 1], delay: ANIM.drawerDelay },
  },
  exit: {
    x: "-100%",
    transition: { duration: ANIM.drawerDuration, ease: "easeIn", delay: 0 },
  },
};

type NavbarProps = {
  locale: Locale;
  nav: readonly NavLink[];
};

export default function Navbar({ locale, nav }: NavbarProps): JSX.Element {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [elevated, setElevated] = useState<boolean>(false);
  const isLaptopUI = useIsLaptopUI();

  useEffect(() => {
    const onScroll = (): void => setElevated(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isLaptopUI && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isLaptopUI, mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 bg-white"
        animate={{
          boxShadow: elevated ? "0 8px 20px rgba(0,0,0,0.06)" : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top rail */}
        <div className={`${BLUE_BG} h-1.5`} />

        {/* NAV BAR */}
        <nav className="flex items-center justify-between gap-4 px-4 tablet:px-7">
          {/* LEFT: Logo */}
          <div className="flex min-w-[170px] laptop:min-w-[190px] desktop:min-w-[200px] items-center gap-3">
            <Image
              src="/assets/home/Logo.webp"
              alt="STELZ"
              width={800}
              height={200}
              priority
              className="h-18 w-auto"
            />
          </div>

          {/* CENTER: Desktop menu */}
          <div className="hidden flex-1 items-center justify-center min-[1160px]:laptop-ui:flex">
            <ul className="flex items-center gap-4 laptop:gap-5 desktop:gap-6">
              {nav.map((item: NavLink) => (
                <DesktopTopItem
                  key={item.label}
                  item={item}
                  active={isActive(pathname, item.href ? translatePath(item.href, locale) : undefined)}
                  locale={locale}
                  isLaptopUI={isLaptopUI}
                />
              ))}
            </ul>
          </div>

          {/* RIGHT: Switcher + mobile toggle */}
          <div className="flex items-center justify-end gap-3">
            <LanguageSwitcher key={locale} />
            <button
              aria-label="Open menu"
              className="inline-flex size-12 items-center justify-center rounded-lg hover:bg-neutral-100 min-[1160px]:laptop-ui:hidden"
              onClick={(): void => setMobileOpen(true)}
            >
              <Menu color={BLUE_HEX} size={36} />
            </button>
          </div>
        </nav>

        {/* Bottom rail */}
        <div className={`${BLUE_BG} h-1.5`} />

        {/* Subtle fade edge under navbar (fades in when elevated) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -bottom-3 h-3 bg-linear-to-b from-black/10 to-transparent"
        />
      </motion.header>

      {/* space under fixed header */}
      <div className="pt-[84px]" />

      {/* MOBILE/TABLET: overlay + drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-40 bg-black/30"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={overlayVariants}
              onClick={(): void => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              className="fixed left-0 top-0 z-50 h-dvh w-[85%] max-w-96 bg-white shadow-2xl"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={drawerVariants}
            >
              <div className="flex items-center justify-between border-b px-4 py-3">
                <Image
                  src="/assets/home/Logo.webp"
                  alt="STELZ"
                  width={800}
                  height={200}
                  priority
                  className="h-16 w-auto"
                />
                <button
                  aria-label="Close menu"
                  className="inline-flex size-12 items-center justify-center rounded-lg hover:bg-neutral-100"
                  onClick={(): void => setMobileOpen(false)}
                >
                  <X color={BLUE_HEX} size={34} />
                </button>
              </div>

              <div className="px-4 py-3">
                <LanguageSwitcher key={`mobile-${locale}`} />
              </div>

              <nav className="px-2 py-3">
                <MobileMenu onNavigate={(): void => setMobileOpen(false)} nav={nav} locale={locale} />
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Desktop ---------------- */

function DesktopTopItem({
  item,
  active,
  locale,
  isLaptopUI,
}: {
  item: NavLink;
  active: boolean;
  locale: Locale;
  isLaptopUI: boolean;
}): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const href = item.href ? translatePath(item.href, locale) : "#";
  const enableHover = isLaptopUI;

  const handleMouseEnter = (): void => {
    if (!enableHover) return;
    setOpen(true);
  };

  const handleMouseLeave = (): void => {
    if (!enableHover) return;
    setOpen(false);
  };

  useEffect(() => {
    if (!isLaptopUI && open) {
      setOpen(false);
    }
  }, [isLaptopUI, open]);

  return (
    <li
      className="relative"
      onMouseEnter={enableHover ? handleMouseEnter : undefined}
      onMouseLeave={enableHover ? handleMouseLeave : undefined}
    >
      <TopLink item={item} active={active} href={href} />
      <AnimatePresence>
        {isLaptopUI && hasKids(item) && open && (
          <motion.div
            key={`${item.label}-dd`}
            className="absolute left-0 top-[calc(100%+12px)] z-50"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={dropVariants}
          >
            {/* hover bridge */}
            <div className="absolute -top-3 left-0 h-3 w-full" />
            <MenuList items={item.children as NavLink[]} depth={0} locale={locale} />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function TopLink({
  item,
  active,
  href,
}: {
  item: NavLink;
  active: boolean;
  href: string;
}): JSX.Element {
  const base =
    "inline-flex items-center gap-0 text-[15px] laptop:text-[16px] font-medium uppercase tracking-[0.04em] select-none";

  return (
    <Link
      href={href}
      className={`${base} ${
        active ? "text-[#174b92]" : "text-neutral-900 laptop-ui:hover:text-[#174b92]"
      }`}
    >
      <span className="inline-flex items-center">
        {item.label}
        {item.expandable && (
          /* plus inherits current link color (hover + active) */
          <span className="ml-0.5 text-[18px] font-medium leading-none text-current">+</span>
        )}
      </span>
    </Link>
  );
}

/* ---------------- Shared dropdown list ---------------- */

type MenuListProps = { items: NavLink[]; depth?: number; locale: Locale };

function MenuList({ items, depth = 0, locale }: MenuListProps): JSX.Element {
  const pathname = usePathname(); // NEW: needed to style active dropdown items

  const onParentOnlyClick = (i: NavLink) => (e: ReactMouseEvent<HTMLAnchorElement>): void => {
    if (isProductsParentOnly(i) && hasKids(i)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const gapClass = depth === 0 ? "gap-1 laptop:gap-0" : "gap-2 laptop:gap-1";
  const widthClass = depth === 0 ? "min-w-56" : "min-w-64";

  return (
    <ul className={`${widthClass} rounded-xs border border-neutral-200 bg-white py-2.5 shadow-xl`}>
      {items.map((i: NavLink) => {
        const kids = hasKids(i);
        const href = i.href ? translatePath(i.href, locale) : "#";
        const selfActive = isActive(pathname, href);

        return (
          <li key={i.label} className="relative group/sub">
            <Link
              href={href}
              onClick={onParentOnlyClick(i)}
              className={`
                block px-3 py-3 text-[14px] font-medium uppercase tracking-wide
                transition-colors duration-300
                ${selfActive ? "bg-[#174b92] text-white" : "text-neutral-800"}
                laptop-ui:hover:bg-[#174b92] laptop-ui:hover:text-white
                focus:bg-[#174b92] focus:text-white active:bg-[#174b92] active:text-white
              `}
            >
              <span className={`inline-flex w-full items-center ${gapClass}`}>
                {i.label}
                {kids && (
                  /* plus inherits the item's text color -> white when active/hover/focus */
                  <span className="ml-auto text-[16px] font-medium text-current">+</span>
                )}
              </span>
            </Link>

            {kids && (
              <div
                className="
                  absolute left-full -ml-px top-0
                  invisible opacity-0
                  laptop-ui:group-hover/sub:visible laptop-ui:group-hover/sub:opacity-100
                  transition-[opacity,visibility] duration-300
                  z-60
                "
              >
                <div className="absolute -left-px top-0 h-full w-px" />
                <MenuList items={i.children as NavLink[]} depth={depth + 1} locale={locale} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}


/* ---------------- Mobile / Tablet ---------------- */

function MobileMenu({
  onNavigate,
  nav,
  locale,
}: {
  onNavigate: () => void;
  nav: readonly NavLink[];
  locale: Locale;
}): JSX.Element {
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({});
  const toggle = (k: string): void => setOpenKeys((s) => ({ ...s, [k]: !s[k] }));
  const [highlightKeys, setHighlightKeys] = useState<Record<string, boolean>>({});
  const toggleHighlight = (k: string): void =>
    setHighlightKeys((s) => ({ ...s, [k]: !s[k] }));

  const ItemRow = ({ item, level = 0 }: { item: NavLink; level?: number }): JSX.Element => {
    const kids = hasKids(item);
    const href = item.href ? translatePath(item.href, locale) : "#";
    const selfActive = isActive(pathname, href);
    const isChild = level > 0;

    const parentOnlyTop = !isChild && kids && isProductsParentOnly(item);
    const isChildHeader = isChild && kids;
    const isExpanded = !!openKeys[item.label];
    const isHighlighted = !!highlightKeys[item.label];
    const headerActive = isChildHeader && isHighlighted;

    const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isChildHeader) {
        e.preventDefault();
        e.stopPropagation();
        toggleHighlight(item.label);
        return;
      }
      if (parentOnlyTop) {
        e.preventDefault();
        e.stopPropagation();
        toggle(item.label);
        return;
      }
      onNavigate();
    };

    const onToggleBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      toggle(item.label);
    };

    return (
      <div className="w-full">
        {/* header row - paddings unchanged */}
        <div className="flex items-center px-4">
          <Link
            href={href}
            onClick={onLinkClick}
            className={[
              "flex-1 py-2.5 text-[15px] font-medium uppercase tracking-wide transition-colors pl-1.5",
              !isChild && (selfActive ? "text-[#174b92]" : "text-neutral-900 hover:text-[#174b92]"),
              isChild &&
                (selfActive || headerActive
                  ? "bg-[#174b92] text-white"
                  : "text-neutral-900 hover:text-[#174b92]"),
              "focus:bg-[#174b92] focus:text-white active:bg-[#174b92] active:text-white",
            ].join(" ")}
            aria-current={selfActive ? "page" : undefined}
          >
            {item.label}
          </Link>

          {kids && (
            <button
              aria-label="Expand section"
              className="ml-2 inline-flex items-center justify-center rounded-md hover:bg-neutral-100 pr-1.5"
              onClick={onToggleBtn}
            >
              <motion.span
                className={`text-[20px] font-medium ${
                  headerActive ? "text-[#174b92]" : selfActive ? "text-[#174b92]" : "text-black"
                }`}
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </button>
          )}
        </div>

        {/* submenu opens only via '+' */}
        <AnimatePresence initial={false}>
          {kids && openKeys[item.label] && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: ANIM.accordionDuration, ease: [0.22, 1, 0.36, 1] }}
              className="-mt-px overflow-hidden"
            >
              {(item.children as NavLink[]).map((c: NavLink) => (
                <ItemRow key={`${item.label}-${c.label}`} item={c} level={level + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      {nav.map((item: NavLink) => (
        <ItemRow key={item.label} item={item} />
      ))}
    </div>
  );
}

