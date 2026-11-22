"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Makes page changes feel instant:
 *  1. A thin progress bar appears the moment an internal link is clicked and completes when
 *     the new page is on screen, so a click never looks like "nothing happened".
 *  2. When the pointer rests on a link (or a finger touches it), the target page is
 *     prefetched in full, so it is usually ready by the time the click lands.
 *     Hover-only (not every visible link) keeps server and database usage low.
 * Works for every <a>/<Link> on the site without changing each link. Prefetching only
 * happens in production builds; in `next dev` Next ignores it.
 */

const HOVER_DELAY_MS = 65; // ignore links the pointer just passes over
const prefetched = new Set<string>();

/** Returns the in-app path for an anchor, or null if the link leaves the page/app. */
function internalPath(a: HTMLAnchorElement | null): string | null {
  if (!a || !a.href) return null;
  if (a.target && a.target !== "_self") return null;
  if (a.hasAttribute("download")) return null;
  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (url.pathname.startsWith("/api/") || /\.[a-z0-9]{2,5}$/i.test(url.pathname)) return null; // files, PDFs
  return url.pathname + url.search;
}

export default function NavigationProgress() {
  const router = useRouter();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0); // 0 = hidden
  const [visible, setVisible] = useState(false);
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPath = useRef(pathname);

  const stopTimers = () => {
    if (trickle.current) clearInterval(trickle.current);
    if (safety.current) clearTimeout(safety.current);
    trickle.current = null;
    safety.current = null;
  };

  const finish = () => {
    stopTimers();
    setProgress(100);
    setTimeout(() => setVisible(false), 220);
    setTimeout(() => setProgress(0), 450);
  };

  // New page rendered -> complete the bar.
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      if (visible) finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const start = () => {
      stopTimers();
      setVisible(true);
      setProgress(18);
      // creep towards 90% while waiting; never reaches the end on its own
      trickle.current = setInterval(() => setProgress((p) => (p < 90 ? p + (90 - p) * 0.12 : p)), 180);
      safety.current = setTimeout(finish, 12000); // never leave the bar stuck
    };

    // Note: e.defaultPrevented can't be used to detect cancelled clicks, because Next's <Link>
    // always calls preventDefault() to do its own client-side navigation. Links that open a
    // menu instead of navigating carry data-no-progress (see Navbar).
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (a?.closest("[data-no-progress]")) return;
      const path = internalPath(a);
      if (!path) return;
      const here = window.location.pathname + window.location.search;
      if (path === here || path.split("#")[0] === here) return; // same page / in-page anchor
      start();
    };

    let hoverTimer: ReturnType<typeof setTimeout> | null = null;
    const prefetch = (a: HTMLAnchorElement | null) => {
      const path = internalPath(a);
      if (!path || prefetched.has(path) || path === window.location.pathname) return;
      prefetched.add(path);
      // "full" prefetch: the whole page, not just the shell (dynamic pages need this).
      router.prefetch(path, { kind: "full" } as unknown as Parameters<typeof router.prefetch>[1]);
    };
    const onOver = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null;
      if (!a) return;
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => prefetch(a), HOVER_DELAY_MS);
    };
    const onOut = () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
    const onTouch = (e: TouchEvent) => prefetch((e.target as Element | null)?.closest?.("a") as HTMLAnchorElement | null);

    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      stopTimers();
      if (hoverTimer) clearTimeout(hoverTimer);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("touchstart", onTouch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
    >
      <div
        className="h-full bg-[#4fb0ff] shadow-[0_0_8px_rgba(79,176,255,0.9)]"
        style={{
          width: `${progress}%`,
          transition: progress === 0 ? "none" : "width 200ms ease-out",
        }}
      />
    </div>
  );
}
