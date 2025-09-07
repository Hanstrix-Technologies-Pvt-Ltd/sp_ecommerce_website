"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import { Ruler, Clock, Shield, Wrench, Building2, ShoppingBag, Hospital, Hotel, Train, Building, Car, Zap } from "lucide-react";

export default function PP01TwoLevelPitPage() {
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
        <BreadcrumbNav currentPage="PP – 01 TWO LEVEL PIT" />

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
                PP – 01 TWO LEVEL PIT
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Underground Puzzle Parking Solution
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                The PP-01 Two Level Pit combines the efficiency of puzzle
                parking with underground installation, providing automated
                parking while maintaining surface aesthetics.
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
                    src="/assets/cars/imgi_115_P-01_Parking_Lift_02-300x238.jpg"
                    alt="PP-01 Two Level Pit underground puzzle parking system"
                    className="w-full rounded-lg shadow-lg"
                    loading="eager"
                  />
                </div>
                <div>
                  <h2
                    id="product-details"
                    className="text-3xl font-bold mb-6 text-gray-800"
                  >
                    Enhance Parking Capacity with Puzzle Parking Systems
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Puzzle Parking Systems are semi-automated parking solutions designed to maximize vehicle storage capacity in constrained urban spaces. Utilizing a grid-like structure of vertical and horizontal movement, these systems allow multiple vehicles to be parked and retrieved independently, without moving other cars. Perfect for high-density areas such as apartments, offices, and commercial hubs, Puzzle Parking offers a smart, space-efficient alternative to conventional parking.
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
                    High Space Efficiency
                  </h3>
                  <p className="text-gray-600">
                    Optimizes parking area by enabling both vertical and horizontal car movement, maximizing storage capacity in constrained urban spaces.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Car size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Independent Parking
                  </h3>
                  <p className="text-gray-600">
                    Each vehicle can be accessed without shifting others, reducing waiting time and providing convenient access to any parked car.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Clock size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Time-Saving Operation
                  </h3>
                  <p className="text-gray-600">
                    Automated or semi-automated controls for faster entry and retrieval, streamlining the parking process for users.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Safe & Secure
                  </h3>
                  <p className="text-gray-600">
                    Enhanced safety features with anti-fall devices and controlled access, ensuring secure parking environment for all vehicles.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Wrench size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Custom Configurations
                  </h3>
                  <p className="text-gray-600">
                    Scalable layouts to fit basements, open plots, or multi-floor structures, adaptable to various site requirements.
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
                    Urban Residential Complexes & Housing Societies
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Building2 size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Corporate Offices & Business Parks
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Shopping Malls & Mixed-Use Developments
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Hospital size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Hospitals & Institutional Buildings
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Hotel size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Hotels, Resorts & Convention Centers
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Building size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Public & Private Multi-Level Parking Facilities
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Train size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Railway Stations, Airports & Metro Terminals
                  </h3>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
                    <Car size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Automotive Dealerships & High-End Garages
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
