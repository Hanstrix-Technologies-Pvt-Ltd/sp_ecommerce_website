// app/(site)/components/Clients.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState, JSX } from "react";
import AutoPlay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/carousel/carousel-context";

/* ---------- LOGOS ---------- */
const logos = [
  "purvankara", "vamsiram", "bhartiya", "sparsh", "manipal", "confident", "suvarna",
  "aragen", "brigade", "cmr", "concorde", "divyasree", "dmart", "durga", "esic", "gar",
  "ginger", "indiqube", "kalyani", "lohia", "maavi", "nanik", "pavani", "phoenix",
  "sattva", "sapra", "shriram", "skav", "supreme", "swojas", "taksh", "ushodaya", "vaishnavi",
] as const;

/* ---------- Compact cut-corner card (Responsive) ---------- */
function DocLogo({
  name,
  className = "",
}: {
  name: (typeof logos)[number];
  className?: string;
}): JSX.Element {
  const src = `/assets/clients/${name}.webp`;
  const CUT = 36;

  return (
    <div
      className={[
        "relative w-full aspect-square max-w-[180px] mx-auto",
        "bg-white ring-1 ring-gray-200 shadow-sm transition",
        "tablet:hover:shadow-md",
        className,
      ].join(" ")}
      style={{
        clipPath: `polygon(0 0, calc(100% - ${CUT}px) 0, 100% ${CUT}px, 100% 100%, 0 100%)`,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4 tablet:p-5">
        <Image
          src={src}
          alt={`${name} logo`}
          fill
          className="object-contain transition-colors duration-200 p-2"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function Clients(): JSX.Element {
  const [autoplay, setAutoplay] =
    useState<ReturnType<typeof AutoPlay> | null>(null);
  const autoplayRef = useRef<ReturnType<typeof AutoPlay> | null>(null);

  useEffect(() => {
    autoplayRef.current = AutoPlay({
      delay: 1800,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    });
    setAutoplay(autoplayRef.current);
    return () => {
      autoplayRef.current = null;
    };
  }, []);

  return (
    <section
      className="relative py-15"
      style={{
        backgroundImage: "url(/assets/backgrounds/clients.webp)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "cover",
      }}
    >
      <div className="mx-auto max-w-[1500px] px-4 tablet:px-8">
        
        {/* Header & Text Wrapper: Centered to match the image */}
        <div className="w-full mb-12 text-center">
          <h2 className="text-[40px] font-extrabold tracking-tight text-[#1F1F1F]">
            Clients Who Trust Stelz
          </h2>

          {/* Paragraph: Centered, text-lg, constrained width for readability */}
          <p className="mt-5 text-lg leading-8 text-[#616161] hover:text-red-500 mx-auto max-w-8xl">
            We take pride in collaborating with industry leaders who trust Stelz
            Parking for innovative and reliable car parking solutions. Our
            partnerships reflect a shared commitment to quality, efficiency, and
            long-term value across every project.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: false,
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            skipSnaps: false,
          }}
          plugins={autoplay ? [autoplay] : []}
          className="w-full"
        >
          <CarouselContent className="-ml-2 tablet:-ml-3">
            {logos.map((name, i) => (
              <CarouselItem
                key={`${name}-${i}`}
                // Mobile: 2 items (!basis-1/2), MD: 4 items, LG: 6 items
                className="!basis-1/2 tablet:!basis-1/4 laptop:!basis-1/6 pl-2 tablet:pl-3"
              >
                <div className="flex items-center justify-center py-2 group h-full">
                  <DocLogo name={name} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}