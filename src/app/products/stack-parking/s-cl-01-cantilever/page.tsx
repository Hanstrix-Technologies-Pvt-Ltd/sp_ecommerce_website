"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import {
  ArrowLeftRight,
  Maximize,
  Ruler,
  Target,
  Wrench,
  Palette,
  Home,
  Building2,
  Store,
  Factory
} from "lucide-react";

export default function SCL01CantileverPage() {
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
        <BreadcrumbNav currentPage="S-CL-01 CANTILEVER" />

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
                S-CL-01 CANTILEVER
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Innovative Cantilever Parking Design
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                The S-CL-01 Cantilever system offers a unique parking solution
                with side-loading capability, perfect for narrow spaces and
                special architectural requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-4" aria-labelledby="product-details">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="/assets/cars/imgi_29_cantilever.jpg"
                    alt="S-CL-01 Cantilever parking system with side-loading design"
                    className="w-full rounded-lg shadow-lg"
                    loading="eager"
                  />
                </div>
                <div>
                  <h2
                    id="product-details"
                    className="text-3xl font-bold mb-6 text-gray-800"
                  >
                    Achieve Clean Design with Cantilever Parking Solutions
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    The Cantilever Parking System is a modern mechanical parking solution designed to offer elevated vehicle storage without the need for columns or support structures beneath. Using a cantilevered platform supported from one end, this system provides a clean, open space below—ideal for areas where ground access must be kept clear. Its minimal footprint, structural efficiency, and aesthetic appeal make it perfect for residential, commercial, and industrial applications. Whether you're dealing with a compact driveway, limited basement space, or a high-traffic commercial site, the Cantilever Parking System maximizes parking capacity without compromising accessibility or design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-4 bg-white" aria-labelledby="features-heading">
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
                  <div className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true">
                    <ArrowLeftRight size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Column-Free Design
                  </h3>
                  <p className="text-gray-600">
                    Provides unobstructed space below the parked vehicle for ease of access or dual usage.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true">
                    <Maximize size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Space-Efficient Layout
                  </h3>
                  <p className="text-gray-600">
                    Optimized for narrow or congested sites where traditional supports are impractical.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true">
                    <Ruler size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Robust Structure
                  </h3>
                  <p className="text-gray-600">
                    Engineered with high-tensile materials for strength, durability, and load-bearing performance.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true">
                    <Target size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Smooth Operation
                  </h3>
                  <p className="text-gray-600">
                    Available with hydraulic or mechanical lifting for reliable, easy vehicle movement.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true">
                    <Wrench size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Low Maintenance
                  </h3>
                  <p className="text-gray-600">
                    Built with corrosion-resistant components and a simplified mechanism for long-term use.
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true">
                    <Palette size={32} />
                  </div>
                  <h3 className="text-xl text-gray-800 font-semibold mb-3">
                    Architecturally Appealing
                  </h3>
                  <p className="text-gray-600">
                    Ideal for properties that require a clean, modern look with smart utility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section
          className="py-4 bg-gray-100"
          aria-labelledby="applications-heading"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2
                id="applications-heading"
                className="text-3xl font-bold text-center mb-4 text-gray-800"
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
                    Residential Homes & Villas with Compact Driveways
                  </h3>
                </div>
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Factory size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">Industrial Facilities & Warehouse Zones</h3>
                </div>
                <div className="text-center p-6 rounded-lg">
                  <div
                    className="text-blue-600 mb-4 flex justify-center"
                    aria-hidden="true"
                  >
                    <Store size={32} />
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold mb-2">
                    Showrooms & Service Centers Requiring Elevated Display Parking
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
                    Urban Redevelopment Projects Needing Creative Parking Layouts
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
              Ready for Innovative Parking?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contact us today for a customized S-CL-01 Cantilever solution
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Get a quote for S-CL-01 Cantilever"
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
