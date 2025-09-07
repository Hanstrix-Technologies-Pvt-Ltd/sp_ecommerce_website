"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const parkingSystems = [
    {
      name: "PITPARK",
      image: "/assets/products/pitpack.jpg",
      description:
        "Two-level underground parking lift system designed for maximum space efficiency. Perfect for residential and commercial applications where underground parking is required.",
      features: [
        "Underground installation",
        "Two-level capacity",
        "Space efficient",
        "Automated operation",
      ],
      slug: "pitpark",
    },
    {
      name: "PUZZLEPARK",
      image: "/assets/products/puzzle-park.jpg",
      description:
        "Multi-level automated parking system that works like a puzzle to maximize parking capacity in minimal space. Ideal for high-density urban areas.",
      features: [
        "Multi-level design",
        "Automated operation",
        "High capacity",
        "Compact footprint",
      ],
      slug: "puzzlepark",
    },
    {
      name: "STACKPARK",
      image: "/assets/products/stackpark.jpg",
      description:
        "Single-level car lift system that doubles your parking capacity vertically. Simple, reliable, and cost-effective solution for parking expansion.",
      features: [
        "Single-level lift",
        "Easy installation",
        "Cost-effective",
        "Reliable operation",
      ],
      slug: "stackpark",
    },
  ];

  const handleProductClick = (slug: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/products/${slug}`);
    }, 500);
  };

  const handleHomeClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const handleProductsClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/#products");
    }, 500);
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Main Content */}
        <main className="pt-20 pb-16">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 py-6">
            <BreadcrumbNav
              currentPage="All Products"
              onHomeClick={handleHomeClick}
              onProductsClick={handleProductsClick}
            />
          </div>

          {/* Hero Section */}
          <div className="container mx-auto px-4 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-1 h-12 bg-blue-600 mr-4"></div>
                <h1 className="text-4xl md:text-5xl font-bold text-black">
                  Our Products
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of innovative parking solutions
                designed to maximize space efficiency and enhance user
                experience.
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {parkingSystems.map((product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  onClick={() => handleProductClick(product.slug)}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-all duration-300"></div>

                    {/* Arrow Icon */}
                    <div className="absolute top-4 right-4">
                      <button className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        →
                      </button>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="text-sm text-gray-600 flex items-center"
                          >
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learn More Button */}
                    <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 group-hover:bg-blue-700">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="container mx-auto px-4 mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
              <p className="text-xl mb-6 opacity-90">
                Our experts can help you find the perfect parking solution for
                your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => router.push("/product-finder"), 500);
                  }}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  Use Product Finder
                </button>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => router.push("/contact"), 500);
                  }}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">
                  <span className="text-blue-600">Stelz</span>{" "}
                  <span className="text-white">CAR PARKING SYSTEMS</span>
                </h3>
              </div>
              <div className="flex flex-wrap justify-center space-x-4">
                <Link
                  href="/products/stackpark"
                  className="text-gray-400 hover:text-blue-600"
                >
                  STACKPARK
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href="/products/pitpark"
                  className="text-gray-400 hover:text-blue-600"
                >
                  PITPARK
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href="/products/assistpark"
                  className="text-gray-400 hover:text-blue-600"
                >
                  ASSISTPARK
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href="/products/puzzlepark"
                  className="text-gray-400 hover:text-blue-600"
                >
                  PUZZLEPARK
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href="/products/hidepark"
                  className="text-gray-400 hover:text-blue-600"
                >
                  HIDEPARK
                </Link>
                <span className="text-gray-600">|</span>
                <Link
                  href="/products/vertipark"
                  className="text-gray-400 hover:text-blue-600"
                >
                  VERTIPARK
                </Link>
              </div>
            </div>
          </div>
        </footer>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
