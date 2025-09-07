"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import { ArrowRight } from "lucide-react";

export default function PuzzleParkPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const puzzleParkModels = [
    {
      name: "2DS",
      image: "/assets/cars/imgi_114_cantilever-600x475.jpg",
      description:
        "2DS uses 2 platforms that move independently in both horizontal and vertical directions, providing maximum flexibility in parking operations.",
    },
    {
      name: "3DS",
      image: "/assets/cars/imgi_117_P-01_Parking_Lift_02-600x475.jpg",
      description:
        "3DS uses 3 platforms with independent movement capabilities, allowing for complex parking arrangements and efficient space utilization.",
    },
    {
      name: "CIS",
      image: "/assets/cars/imgi_99_TT-01_Parking_Lift_02-600x475.jpg",
      description:
        "CIS (Carousel Integrated System) provides circular movement patterns for optimal parking density and retrieval efficiency.",
    },
    {
      name: "VPC",
      image: "/assets/cars/imgi_105_PP-02_Parking_Lift_02-600x475.jpg",
      description:
        "VPC (Vertical Puzzle Carousel) combines vertical stacking with horizontal movement for maximum parking capacity in limited spaces.",
    },
    {
      name: "VPP",
      image: "/assets/cars/imgi_108_S-011_Parking_Lift_02-600x475.jpg",
      description:
        "VPP (Vertical Puzzle Platform) uses trolley-based movement for smooth and reliable parking operations with enhanced safety features.",
    },
  ];

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Puzzle Parking" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Product Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">PUZZLE PARKING</h1>
            </div>

            {/* Product Description */}
            <div className="max-w-4xl">
              <p className="text-lg text-gray-700 leading-relaxed">
                Puzzle Parking Systems are semi-automated parking solutions
                designed to maximize vehicle storage capacity in constrained
                urban spaces. Utilizing a grid-like structure of vertical and
                horizontal movement, these systems allow multiple vehicles to be
                parked and retrieved independently, without moving other cars.
                Perfect for high-density areas such as apartments, offices, and
                commercial hubs, Puzzle Parking offers a smart, space-efficient
                alternative to conventional parking.
              </p>
            </div>
          </div>

          {/* Product Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {puzzleParkModels.map((model, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Model Image */}
                <div className="relative h-64 bg-gray-100">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Model Label */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white px-3 py-1 rounded text-lg font-bold text-black">
                      {model.name}
                    </span>
                  </div>
                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4">
                    <button className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Model Description */}
                <div className="p-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">
                  <span className="text-blue-600">Stelz</span>{" "}
                  <span className="text-black">CAR PARKING SYSTEMS</span>
                </h3>
              </div>

              <div className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
                <Link
                  href="/products/stackpark"
                  className="text-gray-600 hover:text-blue-600"
                >
                  STACKPARK
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/products/pitpark"
                  className="text-gray-600 hover:text-blue-600"
                >
                  PITPARK
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/products/assistpark"
                  className="text-gray-600 hover:text-blue-600"
                >
                  ASSISTPARK
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/products/puzzlepark"
                  className="text-blue-600 font-medium"
                >
                  PUZZLEPARK
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/products/hidepark"
                  className="text-gray-600 hover:text-blue-600"
                >
                  HIDEPARK
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/products/vertipark"
                  className="text-gray-600 hover:text-blue-600"
                >
                  VERTIPARK
                </Link>
              </div>

              <div className="text-sm text-gray-500 text-center">
                Copyrights 2020 | Privacy Policy | All Rights Reserved.
                <br />
                ISO-9001:2008 Certified. Site Credits
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
