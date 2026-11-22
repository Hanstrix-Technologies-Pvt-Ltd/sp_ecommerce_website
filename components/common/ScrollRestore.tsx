// components/ScrollRestore.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_OFFSET = 0;

export default function ScrollRestore() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const KEY = `scroll:${pathname}`;

    const save = () => {
      sessionStorage.setItem(KEY, JSON.stringify({ x: scrollX, y: scrollY }));
    };

    const onPageShow = () => {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return;
      const { x = 0, y = 0 } = JSON.parse(raw) as { x: number; y: number };
      // Defer one frame so layout is ready
      requestAnimationFrame(() => {
        window.scrollTo(x, Math.max(0, y - HEADER_OFFSET));
      });
    };

    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("beforeunload", save);
    
    // Save once scrolling pauses. Writing sessionStorage on every frame (as before) is a
    // synchronous write on the main thread and made scrolling stutter on slower devices.
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(save, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("beforeunload", save);
      window.removeEventListener("scroll", onScroll);
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
