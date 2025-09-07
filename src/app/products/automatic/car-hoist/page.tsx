"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function CarHoistPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
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
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNav currentPage="CAR HOIST" />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">CAR HOIST</h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Automated Car Hoisting System
              </p>
            </div>
          </div>
        </section>

        {/* Product Image and Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="/assets/cars/imgi_16_Car_Hoist_02.jpg"
                    alt="CAR HOIST"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Product Description
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Automated car hoisting system for vertical movement and
                    space optimization. This advanced system provides efficient
                    vertical transportation of vehicles with minimal human
                    intervention and maximum safety.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-purple-600 font-semibold">
                        Capacity
                      </div>
                      <div className="text-gray-800">1 Car</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-purple-600 font-semibold">
                        Movement
                      </div>
                      <div className="text-gray-800">Vertical</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-purple-600 font-semibold">
                        Control
                      </div>
                      <div className="text-gray-800">Automated</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-purple-600 font-semibold">
                        Installation
                      </div>
                      <div className="text-gray-800">Above Ground</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Product Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="text-purple-600 text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-semibold mb-3">
                    Full Automation
                  </h3>
                  <p className="text-gray-600">
                    Complete automated operation with minimal human intervention
                    required.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-purple-600 text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-semibold mb-3">
                    High Efficiency
                  </h3>
                  <p className="text-gray-600">
                    Maximum parking efficiency with rapid vehicle retrieval
                    times.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-purple-600 text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-3">
                    Precision Control
                  </h3>
                  <p className="text-gray-600">
                    Advanced control systems ensuring precise and safe vehicle
                    handling.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-purple-600 text-4xl mb-4">🔧</div>
                  <h3 className="text-xl font-semibold mb-3">
                    Smart Technology
                  </h3>
                  <p className="text-gray-600">
                    Integration with modern IoT and smart parking management
                    systems.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-purple-600 text-4xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold mb-3">
                    Enhanced Safety
                  </h3>
                  <p className="text-gray-600">
                    Multiple safety protocols and fail-safe mechanisms for
                    vehicle protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Applications
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-purple-600 text-4xl mb-4">🏢</div>
                  <h3 className="text-lg font-semibold mb-2">
                    Premium Residential Complexes
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-purple-600 text-4xl mb-4">🏬</div>
                  <h3 className="text-lg font-semibold mb-2">
                    Corporate Headquarters
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-purple-600 text-4xl mb-4">🏨</div>
                  <h3 className="text-lg font-semibold mb-2">
                    Luxury Hotels & Resorts
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-purple-600 text-4xl mb-4">✈️</div>
                  <h3 className="text-lg font-semibold mb-2">
                    Airports & Transport Hubs
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready for Automated Parking?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Contact us today for a car hoist solution
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Quote
              </Link>
              <Link
                href="/products/automatic"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
              >
                View All Automatic Systems
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
