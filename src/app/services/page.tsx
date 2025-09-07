"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingBar from "@/components/LoadingBar";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  // Service images data
  const serviceImages = [
    { src: "/assets/services/service_image_01.png", alt: "Service 1" },
    { src: "/assets/services/service_image_02.png", alt: "Service 2" },
    { src: "/assets/services/service_image_03.png", alt: "Service 3" },
    { src: "/assets/services/service_image_04.png", alt: "Service 4" },
    { src: "/assets/services/service_image_05.png", alt: "Service 5" },
    { src: "/assets/services/service_image_06.png", alt: "Service 6" },
    { src: "/assets/services/service_image_07.png", alt: "Service 7" },
  ];

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
    <div className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-white shadow-sm">
          <BreadcrumbNav currentPage="Services" />
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive parking solutions designed to meet your unique
              requirements with innovative technology and expert support.
            </p>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-blue-600 mr-4"></div>
                <h1 className="text-4xl font-bold text-black uppercase">
                  Our <span className="text-blue-600">Expertise</span>
                </h1>
              </div>

              <p className="text-lg text-gray-600 max-w-3xl">
                From design to maintenance, we provide end-to-end solutions for
                all your parking needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Step 01 */}
              <div className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -top-3 -left-3 text-7xl font-bold text-blue-50 opacity-50 select-none">
                      01
                    </div>
                    <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">01</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      End-to-End Parking System Design & Installation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We deliver tailor-made systems that fit your space,
                      structure, and usage perfectly with innovative engineering
                      solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -top-3 -left-3 text-7xl font-bold text-blue-50 opacity-50 select-none">
                      02
                    </div>
                    <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">02</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      Customized Parking Solutions
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Every project is unique—and so is our approach. We deliver
                      tailor-made systems that fit your space, structure, and
                      usage perfectly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -top-3 -left-3 text-7xl font-bold text-blue-50 opacity-50 select-none">
                      03
                    </div>
                    <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">03</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      Professional Maintenance & Support
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our comprehensive maintenance programs ensure your parking
                      systems operate at peak performance with minimal downtime.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 04 */}
              <div className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="flex items-start space-x-6">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -top-3 -left-3 text-7xl font-bold text-blue-50 opacity-50 select-none">
                      04
                    </div>
                    <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">04</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      Expert Consultation & Training
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We provide comprehensive training and ongoing consultation
                      to ensure your team can efficiently operate and maintain
                      the systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Images Carousel Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-blue-600 mr-4"></div>
                <h1 className="text-4xl font-bold text-black uppercase">
                  <span className="text-blue-600">Partners</span>
                </h1>
              </div>

              <p className="text-lg text-gray-600 max-w-4xl leading-relaxed">
                We take pride in collaborating with industry leaders who trust
                Stelz Parking for innovative and reliable car parking solutions.
                Our partnerships reflect a shared commitment to quality,
                efficiency, and long-term value across every project.
              </p>
            </div>

            {/* Image Carousel Container */}
            <div className="relative overflow-hidden rounded-xl bg-gray-50 py-8">
              <div className="flex animate-image-scroll justify-center">
                {/* First set of images */}
                <div className="flex items-center space-x-8 flex-shrink-0">
                  {serviceImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-80 h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* Duplicate set for seamless scrolling */}
                <div className="flex items-center space-x-8 flex-shrink-0 ml-8">
                  {serviceImages.map((image, index) => (
                    <div
                      key={`duplicate-${index}`}
                      className="relative w-80 h-48 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center mb-4">
                <div className="w-1 h-8 bg-blue-600 mr-4"></div>
                <h1 className="text-4xl font-bold text-black uppercase">
                  Why Choose <span className="text-blue-600">Us</span>
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quality Assurance
                </h3>
                <p className="text-gray-600">
                  Premium materials and rigorous testing ensure long-lasting,
                  reliable performance.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Fast Implementation
                </h3>
                <p className="text-gray-600">
                  Efficient project management and expert installation teams
                  deliver on schedule.
                </p>
              </div>

              <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Round-the-clock technical support and maintenance services for
                  peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
