"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import { Home, CloudRain, Lock, Wrench, Ruler, DollarSign, Building2, Landmark, Hotel, Building, Car } from "lucide-react";

export default function PS02ThreeLevelPage() {
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
        <BreadcrumbNav currentPage="PS – 02 THREE LEVEL" />

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
                PS – 02 THREE LEVEL
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Maximum Underground Parking Capacity
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                The PS-02 Three Level system provides the ultimate underground
                parking solution, tripling parking capacity while maintaining
                ground-level aesthetics.
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
                    src="/assets/cars/imgi_11_PS-11_Parking_Lift_02.jpg"
                    alt="PS-1 Two Level Pit parking system with underground installation"
                    className="w-full rounded-lg shadow-lg"
                    loading="eager"
                  />
                </div>
                <div>
                  <h2
                    id="product-details"
                    className="text-3xl font-bold mb-6 text-gray-800"
                  >
                    Unlock Underground Space with Pit Stacker Parking Systems
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    The Pit Stacker Car Parking System is a smart vertical parking solution designed to maximize parking capacity by utilizing underground space without compromising the surface-level aesthetics. Ideal for premium residential, commercial, and mixed-use developments, this system allows one or more vehicles to be parked in a concealed pit, leaving the ground level free for additional parking or open usage. Engineered for seamless integration into building designs, the Pit Stacker offers a perfect blend of space efficiency, convenience, and modern functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white" aria-labelledby="features-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
                id="features-heading"
                className="text-3xl font-bold text-center mb-12 text-gray-800"
              >
                Product Features
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Home size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Underground Installation
                  </h3>
                  <p className="text-gray-600">
                    Makes use of below-ground space to double or triple parking capacity.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <CloudRain size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Discreet & Space-Saving
                  </h3>
                  <p className="text-gray-600">
                    Keeps the parked vehicle hidden, preserving surface area for other purposes.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Lock size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Independent or Dependent Access
                  </h3>
                  <p className="text-gray-600">
                    Available in configurations to suit usage needs and access frequency.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Wrench size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Smooth Operation
                  </h3>
                  <p className="text-gray-600">
                    Operated via hydraulic or electro-mechanical systems with safety interlocks.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Ruler size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Custom Configurations
                  </h3>
                  <p className="text-gray-600">
                    Tailored depth, lifting height, and platform sizes to suit site requirements.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <DollarSign size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">Durable & Low Maintenance</h3>
                  <p className="text-gray-600">
                    Constructed with corrosion-resistant components for long-term performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section
          className="py-16 bg-gray-100"
          aria-labelledby="applications-heading"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
                id="applications-heading"
                className="text-3xl font-bold text-center mb-12 text-gray-800"
              >
                Applications
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Home size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Luxury Residences & Villas with Limited Open Space
                  </h3>
                </div>
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Landmark size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Urban Apartment Buildings with Basement Parking Needs
                  </h3>
                </div>
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Building2 size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Corporate Offices & Commercial Towers
                  </h3>
                </div>
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Hotel size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Hospitals, Institutions & Educational Campuses
                  </h3>
                </div>
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Building size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    High-Rise Buildings with Subterranean Parking Designs
                  </h3>
                </div>
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Car size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Private Garages & Showrooms with Elevated Display Requirements
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {/* <section
          className="py-16 bg-blue-600 text-white"
          aria-labelledby="contact-heading"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 id="contact-heading" className="text-3xl font-bold mb-6">
              Ready for Ultimate Underground Parking?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today for a customized PS-02 Three Level solution
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Get a quote for PS-02 Three Level"
              >
                Get Quote
              </Link>
              <Link
                href="/products/stack-parking"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="View all stack parking solutions"
              >
                View All Stack Parking
              </Link>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}
