"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import {
  Puzzle,
  Maximize,
  Wrench,
  Zap,
  Lock,
  Building,
  Building2,
  ShoppingBag,
  Hotel,
} from "lucide-react";

export default function PuzzleParkingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const puzzleParkingModels = [
    {
      name: "P – 01 TWO LEVEL",
      slug: "p-01-two-level",
      image: "/assets/cars/imgi_12_P-01_Parking_Lift_02.jpg",
      description:
        "Two-level puzzle parking system with automated vertical and horizontal movement.",
    },
    {
      name: "PP – 01 TWO LEVEL PIT",
      slug: "pp-01-two-level-pit",
      image: "/assets/cars/imgi_115_P-01_Parking_Lift_02-300x238.jpg",
      description:
        "Two-level pit puzzle system for underground parking optimization.",
    },
    {
      name: "PP – 02 THREE LEVEL",
      slug: "pp-02-three-level",
      image: "/assets/cars/imgi_13_PP-02_Parking_Lift_02.jpg",
      description:
        "Three-level pit puzzle system for maximum underground parking capacity.",
    },
    {
      name: "OP –01 OVER GROUND PUZZLE",
      slug: "op-01-over-ground-puzzle",
      image: "/assets/cars/imgi_41_bLOG-700x600.png",
      description:
        "Over ground puzzle system for surface parking space optimization.",
    },
  ];

  if (isLoading) {
    return <LoadingBar isLoading={true} />;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav currentPage="Puzzle Parking" />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Puzzle Parking Systems
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100">
                Automated Puzzle Parking Solutions
              </p>
              <p className="text-lg text-green-200 max-w-3xl mx-auto">
                Puzzle Parking Systems are innovative automated parking
                solutions that use horizontal and vertical movement to maximize
                parking efficiency. Perfect for areas requiring high-density
                parking with minimal space requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Product Models */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Our Puzzle Parking Models
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {puzzleParkingModels.map((model, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="aspect-w-16 aspect-h-12">
                      <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-800">
                        {model.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{model.description}</p>
                      <Link
                        href={`/products/puzzle-parking/${model.slug}`}
                        className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Features & Applications */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Features */}
                <div>
                  <h2 className="text-2xl font-bold mb-8 text-green-600 border-b-2 border-green-600 pb-2">
                    Product Features
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Puzzle className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Automated Movement
                        </h3>
                        <p className="text-gray-600">
                          Advanced puzzle mechanism with automated horizontal
                          and vertical movement.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Maximize className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Space Optimization
                        </h3>
                        <p className="text-gray-600">
                          Maximizes parking density with intelligent space
                          utilization algorithms.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Wrench className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Easy Installation
                        </h3>
                        <p className="text-gray-600">
                          Quick and efficient installation process with minimal
                          site preparation.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Zap className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Energy Efficient
                        </h3>
                        <p className="text-gray-600">
                          Low power consumption with smart energy management
                          systems.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Lock className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Safe & Secure
                        </h3>
                        <p className="text-gray-600">
                          Multiple safety features and secure parking
                          environment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <h2 className="text-2xl font-bold mb-8 text-green-600 border-b-2 border-green-600 pb-2">
                    Applications
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Residential Apartments & Gated Communities
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building2 className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Commercial Complexes & Office Buildings
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <ShoppingBag className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Shopping Malls & Retail Centers
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Hotel className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Hotels & Convention Centers
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Optimize Your Parking?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Contact us today for a customized puzzle parking solution
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Get Quote
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
