"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import { Ruler, Clock, Shield, Wrench, Building2, ShoppingBag, Hospital, Hotel, Train, Building, Car, Zap } from "lucide-react";

export default function PP02ThreeLevelPage() {
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
        <BreadcrumbNav currentPage="PP – 02 THREE LEVEL" />

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
                PP – 02 THREE LEVEL
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Three-Level Pit Puzzle Parking Solution
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                The PP-02 Three Level Pit system represents the ultimate in underground puzzle parking technology, providing maximum capacity through intelligent three-level vertical and horizontal movement while maintaining complete surface discretion.
              </p>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-16" aria-labelledby="product-details">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="/assets/cars/imgi_13_PP-02_Parking_Lift_02.jpg"
                    alt="PP-02 Three Level pit puzzle parking system showing three-level underground structure"
                    className="w-full rounded-lg shadow-lg"
                    loading="eager"
                  />
                </div>
                <div>
                  <h2
                    id="product-details"
                    className="text-3xl font-bold mb-6 text-gray-800"
                  >
                    Double Efficiency with Space-Saving Pit Puzzle Parking
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Pit Puzzle Parking Systems are innovative semi-automatic underground parking solutions that combine the benefits of vertical stacking and horizontal shifting, utilizing space both above and below ground level. Designed for properties with limited surface area, these systems enable efficient parking without altering the building's visible architecture. Ideal for premium residential buildings, office complexes, and commercial properties, Pit Puzzle Parking ensures secure, space-optimized vehicle management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features */}
        <section className="py-4 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Product Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Ruler size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Underground Space Utilization
                  </h3>
                  <p className="text-gray-600">
                    Uses basement levels to add parking capacity without occupying visible land, maximizing underground space efficiency.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Car size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Independent Access
                  </h3>
                  <p className="text-gray-600">
                    Allows each vehicle to be parked and retrieved independently, without shifting others, ensuring convenient access.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Clock size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Smart Automation
                  </h3>
                  <p className="text-gray-600">
                    Semi-automated operation ensures quick, convenient, and reliable parking with intelligent control systems.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Aesthetic Advantage
                  </h3>
                  <p className="text-gray-600">
                    Maintains surface-level aesthetics by keeping the system hidden underground, preserving architectural integrity.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Wrench size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Customizable Layouts
                  </h3>
                  <p className="text-gray-600">
                    Can be configured for various depth levels and site constraints, adaptable to different property requirements.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Zap size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Energy Efficient
                  </h3>
                  <p className="text-gray-600">
                    Low power consumption with smart energy management systems, reducing operational costs and environmental impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-4 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Applications
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Building2 size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Premium Residential Apartments & High-Rises
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Building2 size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Urban Office Buildings & IT Parks
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Shopping Complexes & Mixed-Use Developments
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Hospital size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Hospitals & Institutional Campuses
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Hotel size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Luxury Hotels & Commercial Towers
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Building size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Basement and Subterranean Public Parking Facilities
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Train size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Space-Constrained Urban Plots
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Car size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Showrooms & Corporate Headquarters
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {/* <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Optimize Your Parking?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today for a customized puzzle parking solution
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Get Quote
              </Link>
              <Link
                href="/products/puzzle-parking"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                View All Puzzle Parking
              </Link>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}
