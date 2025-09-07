"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import {
  Ruler,
  DollarSign,
  Zap,
  Wrench,
  Shield,
  Building2,
  ShoppingBag,
  Hospital,
  Hotel,
  Train,
  Building,
} from "lucide-react";

export default function S011ThreeLevelPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingBar isLoading={true} />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <BreadcrumbNav currentPage="S – 011 THREE LEVEL" />

        {/* Hero Section */}
        <section
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16"
          aria-labelledby="hero-heading"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                S – 011 THREE LEVEL
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Advanced Three-Level Stacking Solution
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                The S-011 Three Level Stack maximizes parking capacity by
                providing three parking positions in a single bay. Ideal for
                high-density parking requirements in commercial and residential
                spaces.
              </p>
            </div>
          </div>
        </section>

        {/* Product Image and Details */}
        <section className="py-16" aria-labelledby="product-details">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="/assets/cars/imgi_10_S-01_Parking_Lift_02.jpg"
                    alt="S-01 Two Level Stack parking system showing hydraulic platform with two car capacity"
                    className="w-full rounded-lg shadow-lg"
                    loading="eager"
                  />
                </div>
                <div>
                  <h2
                    id="product-details"
                    className="text-3xl font-bold mb-6 text-gray-800"
                  >
                    Smart Car Parking Solutions for Every Space
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    ⁠Stack Parking Systems are vertical car parking solutions
                    designed to optimize limited space in urban and commercial
                    areas. Ideal for apartments, malls, and office complexes,
                    they ensure safe, organized, and efficient vehicle storage.
                  </p>
                </div>
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
                  <h2 className="text-2xl font-bold mb-8 text-blue-600 border-b-2 border-blue-600 pb-2">
                    Product Features
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Ruler className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Space Saving
                        </h3>
                        <p className="text-gray-600">
                          Doubles parking capacity vertically, making the most
                          of compact urban spaces.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <DollarSign className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Cost Effective
                        </h3>
                        <p className="text-gray-600">
                          Significantly reduces land usage and overall
                          construction expenses.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Zap className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Easy Operation
                        </h3>
                        <p className="text-gray-600">
                          Designed with a simple, user-friendly mechanism for
                          hassle-free access.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Wrench className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Customizable
                        </h3>
                        <p className="text-gray-600">
                          Flexible design adaptable to a wide range of site
                          layouts and vehicle types.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Shield className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Low Maintenance
                        </h3>
                        <p className="text-gray-600">
                          Built with durable components requiring minimal
                          upkeep.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <h2 className="text-2xl font-bold mb-8 text-blue-600 border-b-2 border-blue-600 pb-2">
                    Applications
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building2 className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Residential Apartments & Gated Communities
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building2 className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Commercial Complexes & Office Buildings
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <ShoppingBag className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Shopping Malls & Retail Centers
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Hospital className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Hospitals & Educational Institutions
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Hotel className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Hotels & Convention Centers
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Train className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Transport Hubs like Airports & Railway Stations
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Public Parking Lots & Municipal Spaces
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Wrench className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Automobile Showrooms & Service Stations
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
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Parking?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today for a customized parking solution
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Quote
              </Link>
              <Link
                href="/products/stack-parking"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                View All Stack Parking
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
