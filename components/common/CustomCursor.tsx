"use client";

import { useEffect, useRef, useState } from "react";
import { hasSaveDataEnabled, isSlowNetwork, shouldReduceMotion } from "@/lib/network-aware";

/**
 * Ring + dot that follow the mouse with a slight delay (desktop only).
 *
 * Performance: the old version called setState on every animation frame, forever, so React
 * re-rendered ~60 times a second even with the mouse still, and it moved the cursor with
 * left/top (forcing layout). That competed with page changes and made navigation feel
 * janky. This version writes `transform` straight to the DOM (GPU-friendly, no React
 * renders) and stops the animation loop once the ring has caught up with the mouse.
 */
export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const decide = () =>
      setEnabled(
        window.innerWidth >= 768 &&
          window.matchMedia("(pointer: fine)").matches &&
          !(shouldReduceMotion() || isSlowNetwork() || hasSaveDataEnabled())
      );
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let shown = false;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      // keep animating only while the ring is still catching up
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!shown) {
        // first move: jump to the pointer instead of flying in from the corner
        pos.x = target.x;
        pos.y = target.y;
        el.style.opacity = "1";
        shown = true;
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      el.style.opacity = "0";
      shown = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 transition-opacity duration-150"
      style={{ opacity: 0, zIndex: 9998, willChange: "transform" }}
    >
      {/* Outer circle - light gray thin ring */}
      <div
        className="absolute"
        style={{
          width: "43px",
          height: "43px",
          border: "1px solid #d1d5db",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: 0,
          top: 0,
        }}
      />
      {/* Inner dot */}
      <div
        className="absolute"
        style={{
          width: "4px",
          height: "4px",
          backgroundColor: "#1E88E5",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
}
