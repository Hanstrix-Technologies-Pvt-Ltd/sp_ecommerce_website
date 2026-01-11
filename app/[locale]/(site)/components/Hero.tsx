"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect, type JSX } from "react";
import Image from "next/image";
import { Raleway } from "next/font/google";
import { NetworkAwareWrapper } from "@/components/common/NetworkAwareWrapper";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// right → left “typing” reveal (no cursor)
const typingVariants: Variants = {
  hidden: {
    clipPath: "inset(0 0 0 100%)", // hide from the right
  },
  visible: {
    clipPath: "inset(0 0 0 0%)",
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export type HeroContent = {
  taglines: string[];
  images: string[];
  highlights: string[];
};

export default function Hero({ content }: { content: HeroContent }): JSX.Element | null {
  const images = content?.images ?? [];
  const taglines = content?.taglines ?? [];
  const highlights = content?.highlights ?? [];
  const [isSlowConnection, setIsSlowConnection] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("is-slow-network") === "true";
    } catch {
      return false;
    }
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate backgrounds + taglines on healthy networks only
  useEffect(() => {
    if (isSlowConnection || images.length < 2) return;

    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, [images.length, isSlowConnection]);

  // Duplicate highlights for seamless loop
  const duplicatedHighlights = [...highlights, ...highlights];

  if (!images.length || !taglines.length) {
    return null;
  }

  const fallbackTagline = taglines[0] ?? "Engineering tomorrow's parking";

  /**
   * Navbar is fixed, and layout already has <div className="pt-[88px]" /> under it.
   * This hero fills the remaining viewport: 100vh - 88px.
   */
  return (
    <NetworkAwareWrapper
      className="block"
      slowNetworkFallback={
        <section className="relative h-[calc(100vh-88px)] w-full overflow-hidden bg-gradient-to-br from-[#0C41AA] via-[#0C41AA] to-[#071d55] text-white">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, #ffffff 0, transparent 35%)" }} />
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center">
            <h1 className={`${raleway.className} text-[34px] font-semibold leading-tight laptop:text-[40px]`}>
              {fallbackTagline}
            </h1>
            <p className="max-w-2xl text-sm text-white/85">
              Optimized for slow networks — lighter hero, no autoplaying media.
            </p>
            <div className="grid grid-cols-1 gap-3 text-sm text-white/80 tablet:grid-cols-3">
              {highlights.slice(0, 3).map((item, idx) => (
                <div key={idx} className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      }
      onNetworkChange={(slow) => setIsSlowConnection(slow)}
    >
      <section
        className="relative h-[calc(100vh-88px)] w-full overflow-hidden bg-black"
        data-network={isSlowConnection ? "slow" : "fast"}
      >
        {/* ================== BACKGROUND IMAGES (cover full hero) ================== */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: isSlowConnection ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: isSlowConnection ? 1 : 0 }}
            transition={{ duration: isSlowConnection ? 0 : 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex]}
              alt={`STELZ Parking - ${taglines[currentIndex]}`}
              fill
              priority={!isSlowConnection && currentIndex === 0}
              quality={isSlowConnection ? 60 : 75}
              sizes="100vw"
              loading={isSlowConnection ? "lazy" : undefined}
              className="object-cover"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* ================== FOREGROUND LAYOUT ================== */}
        <div className="relative z-10 flex h-full flex-col">
          {/* -------- Image / tagline region (text centered in this area) -------- */}
          <div className="relative flex flex-1 items-center justify-center px-4">
            {/* Centered tagline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tagline-${currentIndex}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={typingVariants}
                className="inline-block overflow-hidden text-center"
              >
                <h1
                  className={`${raleway.className} text-[38px] font-semibold tracking-wide text-white`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#0C41AA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "white";
                  }}
                >
                  {taglines[currentIndex]}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* -------- Highlights banner at the very bottom -------- */}
          <div className="pointer-events-auto w-full border-y border-gray-200 bg-white/98 py-3">
            <div
              className="flex gap-8 whitespace-nowrap"
              style={isSlowConnection ? undefined : { animation: "scroll 15s linear infinite" }}
            >
              {duplicatedHighlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-[16px] uppercase tracking-wide"
                  style={{ color: "#0C41AA" }}
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full border-2"
                    style={{
                      borderColor: "#9E9E9E",
                      backgroundColor: "transparent",
                    }}
                  />
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </NetworkAwareWrapper>
  );
}
