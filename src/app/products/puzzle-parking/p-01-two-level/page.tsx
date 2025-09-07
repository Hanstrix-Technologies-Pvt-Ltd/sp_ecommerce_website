"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import {
  Ruler,
  Clock,
  Shield,
  Wrench,
  Building2,
  ShoppingBag,
  Hospital,
  Hotel,
  Train,
  Building,
  Car,
  Zap,
} from "lucide-react";

export default function P01TwoLevelPage() {
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
        <BreadcrumbNav currentPage="P – 01 TWO LEVEL" />

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
                P – 01 TWO LEVEL
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Automated Puzzle Parking Solution
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                Two-level puzzle parking system with automated vertical and
                horizontal movement. This innovative system maximizes parking
                efficiency through intelligent space utilization and automated
                vehicle handling.
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
                    src="/assets/cars/imgi_12_P-01_Parking_Lift_02.jpg"
                    alt="P-01 Two Level puzzle parking system showing grid-like structure with vertical and horizontal movement"
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
                    Puzzle Parking Systems are semi-automated parking solutions
                    designed to maximize vehicle storage capacity in constrained
                    urban spaces. Utilizing a grid-like structure of vertical
                    and horizontal movement, these systems allow multiple
                    vehicles to be parked and retrieved independently, without
                    moving other cars. Perfect for high-density areas such as
                    apartments, offices, and commercial hubs, Puzzle Parking
                    offers a smart, space-efficient alternative to conventional
                    parking.
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
                  <h2 className="text-2xl font-bold mb-8 text-green-600 border-b-2 border-green-600 pb-2">
                    Product Features
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Ruler className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          High Space Efficiency
                        </h3>
                        <p className="text-gray-600">
                          Optimizes parking area by enabling both vertical and
                          horizontal car movement, maximizing storage capacity
                          in constrained urban spaces.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Car className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Independent Parking
                        </h3>
                        <p className="text-gray-600">
                          Each vehicle can be accessed without shifting others,
                          reducing waiting time and providing convenient access
                          to any parked car.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Clock className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Time-Saving Operation
                        </h3>
                        <p className="text-gray-600">
                          Automated or semi-automated controls for faster entry
                          and retrieval, streamlining the parking process for
                          users.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Shield className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Safe & Secure
                        </h3>
                        <p className="text-gray-600">
                          Enhanced safety features with anti-fall devices and
                          controlled access, ensuring secure parking environment
                          for all vehicles.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Wrench className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Custom Configurations
                        </h3>
                        <p className="text-gray-600">
                          Scalable layouts to fit basements, open plots, or
                          multi-floor structures, adaptable to various site
                          requirements.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Zap className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Energy Efficient
                        </h3>
                        <p className="text-gray-600">
                          Low power consumption with smart energy management
                          systems, reducing operational costs and environmental
                          impact.
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
                      <Building2 className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Urban Residential Complexes & Housing Societies
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building2 className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Corporate Offices & Business Parks
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <ShoppingBag className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Shopping Malls & Mixed-Use Developments
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Hospital className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Hospitals & Institutional Buildings
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Hotel className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Hotels, Resorts & Convention Centers
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Public & Private Multi-Level Parking Facilities
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Train className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Railway Stations, Airports & Metro Terminals
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Car className="text-green-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Automotive Dealerships & High-End Garages
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
      </div>
      <Footer />
    </>
  );
}
