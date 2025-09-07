"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";
import {
  Bot,
  Zap,
  Target,
  Wrench,
  Shield,
  Building,
  Building2,
  Hotel,
  Plane,
} from "lucide-react";

export default function AutomaticPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const automaticModels = [
    {
      name: "CAR HOIST",
      slug: "car-hoist",
      image: "/assets/cars/imgi_16_Car_Hoist_02.jpg",
      description:
        "Automated car hoisting system for vertical movement and space optimization.",
    },
    {
      name: "ROTARY",
      slug: "rotary",
      image: "/assets/cars/imgi_109_Car_Hoist_02-300x238.jpg",
      description:
        "Rotary parking system for maximum space efficiency with automated rotation.",
    },
    {
      name: "TURN TABLE",
      slug: "turn-table",
      image: "/assets/cars/imgi_15_TT-01_Parking_Lift_02.jpg",
      description:
        "Turn table system for easy vehicle maneuvering and parking assistance.",
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
        <BreadcrumbNav currentPage="Automatic Parking" />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Automatic Parking Systems
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-purple-100">
                Fully Automated Parking Solutions
              </p>
              <p className="text-lg text-purple-200 max-w-3xl mx-auto">
                Automatic Parking Systems provide fully automated parking
                solutions with minimal human intervention. These systems offer
                the highest level of efficiency and convenience for modern
                parking requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Product Models */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Our Automatic Parking Models
              </h2>
              <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
                {automaticModels.map((model, index) => (
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
                        href={`/products/automatic/${model.slug}`}
                        className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300"
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
                  <h2 className="text-2xl font-bold mb-8 text-purple-600 border-b-2 border-purple-600 pb-2">
                    Product Features
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Bot className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Full Automation
                        </h3>
                        <p className="text-gray-600">
                          Complete automated operation with minimal human
                          intervention required.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Zap className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          High Efficiency
                        </h3>
                        <p className="text-gray-600">
                          Maximum parking efficiency with rapid vehicle
                          retrieval times.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Target className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Precision Control
                        </h3>
                        <p className="text-gray-600">
                          Advanced control systems ensuring precise and safe
                          vehicle handling.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Wrench className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          Smart Technology
                        </h3>
                        <p className="text-gray-600">
                          Integration with modern IoT and smart parking
                          management systems.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Shield className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
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

                {/* Applications */}
                <div>
                  <h2 className="text-2xl font-bold mb-8 text-purple-600 border-b-2 border-purple-600 pb-2">
                    Applications
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Premium Residential Complexes
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Building2 className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Corporate Headquarters
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
                      <Hotel className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Luxury Hotels & Resorts
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 py-4">
                      <Plane className="text-purple-600 w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-black">
                          Airports & Transport Hubs
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
        <section className="py-16 bg-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready for Automated Parking?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Contact us today for a fully automated parking solution
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
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
