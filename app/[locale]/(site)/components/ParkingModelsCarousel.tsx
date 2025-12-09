"use client";

import { useEffect, useRef, useState, useCallback, JSX } from "react";
import Image from "next/image";
import AutoPlay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/carousel/carousel-context";

export type ModelItem = { id: string | number; title: string; image: string };

export default function ParkingModelsCarousel({
  items,
  title = "Parking Models",
}: {
  items: ModelItem[];
  title?: string;
}): JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  const autoplayRef = useRef(
    AutoPlay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const updateFromApi = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    updateFromApi();
    api.on("select", updateFromApi);
    api.on("reInit", updateFromApi);
    return () => {
      api.off("select", updateFromApi);
      api.off("reInit", updateFromApi);
    };
  }, [api, updateFromApi]);

  const handleDotClick = (index: number): void => api?.scrollTo(index);

  return (
    <section className="bg-white py-8 tablet:py-12 px-3 tablet:px-1 laptop:px-5 overscroll-contain">
      <div className="mx-auto max-w-[1500px] px-[5px]">
        {/* Title */}
        <div className="mb-8 tablet:mb-12 text-center">
          <h2 className="mb-3 text-[30px] text-[#1F1F1F] font-medium">{title}</h2>
          <div className="mt-3 flex items-center justify-center gap-1.5">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#1976D2" }} />
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#1976D2" }} />
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: "#1976D2" }} />
            <div className="h-1 rounded-full" style={{ width: "200px", backgroundColor: "#2575FC" }} />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            opts={{ align: "start", loop: true, slidesToScroll: 1 }}
            plugins={[autoplayRef.current]}
            setApi={setApi}
            className="w-full [touch-action:pan-y] select-none"
            style={{ touchAction: "pan-y" }}
          >
            {/* Match Footprint track spacing */}
            <CarouselContent className="gap-1 tablet:gap-0">
              {items.map((item: ModelItem) => (
                <CarouselItem
                  key={item.id}
                  /* 1 / 2 / 3 / 3 / 4 across at base/sm/tablet/laptop+desktop/wide */
                  className="basis-full sm:basis-1/2 tablet:basis-1/3 laptop:basis-1/3 desktop:basis-1/3 wide:basis-1/4 px-2 tablet:px-0"
                >
                  {/* Card */}
                  <div className="group relative overflow-hidden rounded-[20px] bg-linear-to-br from-gray-800 to-gray-900 shadow-lg transition hover:shadow-2xl">
                    {/* Image wrapper:
                        - below tablet: height follows width (aspect ratio)
                        - tablet and up: fixed height */}
                    <div className="relative overflow-hidden">
                      <div
                        className="relative w-full tablet:h-80"
                        style={{ aspectRatio: "4 / 3" }} /* applies below tablet */
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw,
                                 (max-width: 1024px) 50vw,
                                 (max-width: 1536px) 33vw,
                                 25vw"
                          priority={false}
                        />
                      </div>

                      {/* TOP SWEEP OVERLAY */}
                      <div className="pointer-events-none absolute inset-0 will-change-transform" aria-hidden>
                        <div className="absolute inset-x-0 top-0 h-full -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-black/50" />
                      </div>

                      {/* Title */}
                      <div className="absolute left-5 top-12 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <h3 className="mx-6 text-lg tablet:text-2xl font-bold text-white drop-shadow-md">
                          {item.title}
                        </h3>
                      </div>

                      {/* Watermark */}
                      <div className="absolute bottom-3 right-3 text-xs text-white/70">
                        This image is only for Representation
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows aligned like Footprint */}
            <CarouselPrevious className="left-1 tablet:left-0" />
            <CarouselNext className="right-1 tablet:right-0" />
          </Carousel>
        </div>

        {/* Dots (same look) */}
        <div className="mt-6 tablet:mt-8 flex items-center justify-center gap-2">
          {items.map((_: ModelItem, idx: number) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                current === idx ? "w-8" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              style={{ backgroundColor: current === idx ? "#0C41AA" : undefined }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
