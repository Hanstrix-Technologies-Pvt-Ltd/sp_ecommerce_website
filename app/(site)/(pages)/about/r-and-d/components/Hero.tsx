// app/(site)/(pages)/about/r-and-d/components/RAndDHero.tsx
"use client";

import Image from "next/image";
import { Space_Grotesk } from "next/font/google";
import { motion, type Variants } from "framer-motion";
import { type JSX } from "react";
import { rANDd } from "@/data/R&DContent";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const charVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
      delay: 0.03 * custom, // per-character stagger
      ease: [0.22, 0.61, 0.36, 1],
    },
  }),
};

export default function Hero(): JSX.Element {
  const firstPart = rANDd.title[0]; // e.g. "Future-Ready Solutions Born from"
  const secondPart = rANDd.title[1]; // e.g. "Research & Expertise"

  // global counter so blue part continues from black part
  let charCounter = 0;

  const renderAnimatedSegment = (
    text: string,
    extraClass?: string
  ): JSX.Element[] => {
    // Split into tokens, *keeping* whitespace as separate tokens
    const tokens = text.split(/(\s+)/);

    return tokens.map((token, idx) => {
      // Pure whitespace → render as-is (preserves all spaces)
      if (/^\s+$/.test(token)) {
        return (
          <span key={`space-${idx}`}>{token}</span>
        );
      }

      // Non-space token → treat as a "word" group
      return (
        <span
          key={`${extraClass ?? "default"}-word-${idx}`}
          className={extraClass}
          style={{
            display: "inline-block", // prevents breaking inside this token
          }}
        >
          {Array.from(token).map((char, ci) => {
            const animIndex = charCounter++;
            return (
              <motion.span
                key={`${extraClass ?? "default"}-char-${idx}-${ci}`}
                variants={charVariants}
                custom={animIndex}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      );
    });
  };

  return (
    <section
      aria-labelledby="r-and-d-hero-title"
      className={`${spaceGrotesk.className} relative overflow-hidden bg-[#F5F5F5] pb-14 pt-10 sm:pb-16 sm:pt-12 lg:pb-18 lg:pt-14`}
    >
      {/* ---------------- Background watermarks (gear + microscope) ---------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/assets/r&d/gear.webp"
          alt=""
          width={360}
          height={360}
          className="absolute left-0 md:bottom-0 w-65"
          priority
        />
        <Image
          src="/assets/r&d/microscope.webp"
          alt=""
          width={380}
          height={380}
          className="absolute right-0 bottom-0 w-65"
          priority
        />
      </div>

      {/* ---------------- Foreground content ---------------- */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-5 lg:px-12">
        {/* Top title */}
        <h1 className="text-center text-[26px] md:text-[40px] font-bold text-[#1F1F1F] py-15">
          Research &amp; Development
        </h1>

        {/* Hero row: image + text as separate containers */}
        <div className="mt-[15px] md:pb-10 flex flex-col items-start md:flex-row md:items-center gap-4 lg:gap-6">
          {/* ---------- Image container ---------- */}
          <div className="order-2 w-full md:order-1 md:w-[34%] lg:w-[38%]">
            <div className="overflow-hidden">
              <Image
                src="/assets/r&d/hero.webp"
                alt="Engineers working on advanced parking system prototypes in Stelz R&D facility."
                width={420}
                height={560}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>

          {/* ---------- Text container ---------- */}
          <div className="order-1 w-full md:order-2 md:flex-1">
            {/* R & D label + thin divider line */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[17px] font-medium tracking-[0.26em] text-[#006DDB]">
                R&amp;D
              </span>
              <span
                aria-hidden
                className="h-[0.5px] flex-1 bg-[#616161]"
              />
            </div>

            {/* Character-animated heading */}
            <motion.h2
              id="r-and-d-hero-title"
              className="mt-4 text-[26px] md:text-[40px] font-bold leading-tight text-[#111111] md:text-[52px]"
              initial="hidden"
              animate="visible"
            >
              {renderAnimatedSegment(firstPart)}
              {" "}
              {renderAnimatedSegment(
                secondPart,
                "text-[#006DDB]"
              )}
            </motion.h2>

            <div className="mt-5 text-[#616161] leading-[1.7] text-[17px]">
              {rANDd.content.para.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
