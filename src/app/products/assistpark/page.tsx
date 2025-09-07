"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function AssistParkPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const assistParkModels = [
    {
      name: "VPC-1",
      image: "/assets/cars/imgi_114_cantilever-600x475.jpg",
      description:
        "VPC-1 (Vehicle Positioning Carousel) provides single vehicle positioning assistance with precise control and safety features.",
    },
    {
      name: "VPC-2",
      image: "/assets/cars/imgi_117_P-01_Parking_Lift_02-600x475.jpg",
      description:
        "VPC-2 (Vehicle Positioning Carousel) offers dual vehicle positioning with enhanced efficiency and reduced waiting times.",
    },
    {
      name: "Turntable",
      image: "/assets/cars/imgi_99_TT-01_Parking_Lift_02-600x475.jpg",
      description:
        "Turntable system provides 360-degree vehicle rotation for easy maneuvering in tight parking spaces.",
    },
  ];

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="AssistPark" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Product Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">ASSISTPARK</h1>
            </div>

            {/* Product Description */}
            <div className="max-w-4xl">
              <p className="text-lg text-gray-700 leading-relaxed">
                AssistPark is a vehicle maneuvering assistance system that helps
                drivers position their vehicles precisely in parking spaces. The
                system includes turntables and positioning carousels that can
                rotate vehicles 360 degrees, making parking in tight spaces
                effortless. AssistPark systems are essential for narrow parking
                areas, multi-level garages, and locations where precise vehicle
                positioning is critical.
              </p>
            </div>
          </div>

          {/* Product Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assistParkModels.map((model, index) => (
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
                      →
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
                  className="text-blue-600 font-medium"
                >
                  ASSISTPARK
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/products/puzzlepark"
                  className="text-gray-600 hover:text-blue-600"
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
