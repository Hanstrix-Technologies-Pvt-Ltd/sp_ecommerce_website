"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import {
  Car,
  DollarSign,
  Zap,
  Wrench,
  Shield,
  Building,
  Building2,
  ShoppingBag,
  Hospital,
} from "lucide-react";

export default function StackParkingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stackParkingModels = [
    {
      name: "S – 01 TWO LEVEL STACK",
      slug: "s-01-two-level-stack",
      image: "/assets/cars/imgi_10_S-01_Parking_Lift_02.jpg",
      description:
        "Two-level stacking system for efficient space utilization with hydraulic lifting mechanism.",
    },
    {
      name: "S – 011 THREE LEVEL",
      slug: "s-011-three-level",
      image: "/assets/cars/imgi_28_S-011_Parking_Lift_02.jpg",
      description:
        "Three-level stacking system for maximum capacity with advanced hydraulic controls.",
    },
    {
      name: "PS – 1 TWO LEVEL PIT",
      slug: "ps-1-two-level-pit",
      image: "/assets/cars/imgi_11_PS-11_Parking_Lift_02.jpg",
      description:
        "Two-level pit system for underground parking with space-saving design.",
    },
    {
      name: "PS – 02 THREE LEVEL",
      slug: "ps-02-three-level",
      image: "/assets/cars/imgi_13_PP-02_Parking_Lift_02.jpg",
      description:
        "Three-level pit system for maximum underground capacity and efficiency.",
    },
    {
      name: "S-CL-01 CANTILEVER",
      slug: "s-cl-01-cantilever",
      image: "/assets/cars/imgi_29_cantilever.jpg",
      description:
        "Cantilever stacking system for flexible parking solutions with unique design.",
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
        <BreadcrumbNav currentPage="Stack Parking" />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Stack Parking Systems
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Smart Car Parking Solutions for Every Space
              </p>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                Stack Parking Systems are vertical car parking solutions
                designed to optimize limited space in urban and commercial
                areas. Ideal for apartments, malls, and office complexes, they
                ensure safe, organized, and efficient vehicle storage.
              </p>
            </div>
          </div>
        </section>

        {/* Product Models */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Our Stack Parking Models
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stackParkingModels.map((model, index) => (
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
                        href={`/products/stack-parking/${model.slug}`}
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
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
                  <h2 className="text-2xl font-bold mb-8 text-blue-600 border-b-2 border-blue-600 pb-2">
                    Product Features
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Car className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
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
                      <Building className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
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
                    <div className="flex items-start gap-4 py-4">
                      <Hospital className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Hospitals & Educational Institutions
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
              Contact us today for a customized stack parking solution
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
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
