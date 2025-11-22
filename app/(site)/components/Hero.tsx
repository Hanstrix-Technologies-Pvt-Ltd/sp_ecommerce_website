"use client";

import { content } from "@/data/HomeFooterContent";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect, type JSX } from "react";
import Image from "next/image";
import { Raleway } from "next/font/google";

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

export default function Hero(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [_isLoading, setIsLoading] = useState(true);

  // Auto-rotate backgrounds + taglines
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % content.hero.images.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  // Duplicate highlights for seamless loop
  const duplicatedHighlights = [
    ...content.hero.highlights,
    ...content.hero.highlights,
  ];

  /**
   * Navbar is fixed, and layout already has <div className="pt-[88px]" /> under it.
   * This hero fills the remaining viewport: 100vh - 88px.
   */
  return (
    <section className="relative h-[calc(100vh-88px)] w-full overflow-hidden bg-black">
      {/* ================== BACKGROUND IMAGES (cover full hero) ================== */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={content.hero.images[currentIndex]}
            alt={`STELZ Parking - ${content.hero.taglines[currentIndex]}`}
            fill
            priority={currentIndex === 0}
            quality={75}
            sizes="100vw"
            className="object-cover"
            onLoad={() => setIsLoading(false)}
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
                {content.hero.taglines[currentIndex]}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* -------- Highlights banner at the very bottom -------- */}
        <div className="pointer-events-auto w-full border-y border-gray-200 bg-white/98 py-3">
          <div
            className="flex gap-8 whitespace-nowrap"
            style={{ animation: "scroll 15s linear infinite" }}
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
  );
}
