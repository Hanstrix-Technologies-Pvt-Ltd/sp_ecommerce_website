"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function VendorsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const vendorCategories = [
    {
      name: "Steel & Metal",
      description: "High-quality steel components and metal fabrication",
      requirements: [
        "ISO 9001:2015 certified",
        "Minimum 5 years experience",
        "Quality control systems",
        "On-time delivery capability",
      ],
    },
    {
      name: "Hydraulic Systems",
      description: "Hydraulic cylinders, pumps, and control systems",
      requirements: [
        "CE certified products",
        "Technical support capability",
        "Warranty coverage",
        "Spare parts availability",
      ],
    },
    {
      name: "Electrical Components",
      description: "Motors, controllers, and electrical systems",
      requirements: [
        "IEC standards compliance",
        "Energy efficiency ratings",
        "Safety certifications",
        "24/7 support availability",
      ],
    },
    {
      name: "Software & Controls",
      description: "Parking management software and control systems",
      requirements: [
        "Custom development capability",
        "Integration expertise",
        "Cybersecurity compliance",
        "Regular updates and maintenance",
      ],
    },
  ];

  const benefits = [
    {
      title: "Long-term Partnerships",
      description: "Build sustainable business relationships with Stelz",
      icon: "🤝",
    },
    {
      title: "Technical Support",
      description: "Access to our engineering expertise and technical guidance",
      icon: "🔧",
    },
    {
      title: "Quality Standards",
      description: "Maintain high quality standards with our guidance",
      icon: "⭐",
    },
    {
      title: "Market Access",
      description: "Expand your market reach through our network",
      icon: "🌐",
    },
  ];

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Vendors" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">VENDORS</h1>
            </div>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Vendor Partnership Program
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Stelz is committed to building strong partnerships with reliable
                vendors and suppliers who share our commitment to quality,
                innovation, and customer satisfaction. Our vendor partnership
                program offers opportunities for businesses to collaborate with
                India's leading parking system manufacturer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We seek vendors who can provide high-quality components,
                materials, and services that meet our stringent quality
                standards and help us deliver exceptional parking solutions to
                our clients.
              </p>
            </div>
          </div>

          {/* Vendor Categories */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Vendor Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {vendorCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                >
                  <div className="bg-blue-600 text-white p-6">
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-blue-100">{category.description}</p>
                  </div>
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      Requirements:
                    </h4>
                    <ul className="space-y-2">
                      {category.requirements.map((requirement, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-blue-600 mr-3 mt-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm">
                            {requirement}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                      Apply as Vendor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Partnership Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-3xl mr-4">{benefit.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Vendor Application Process
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Application
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Submit your vendor application with required documents
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Evaluation
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Our team evaluates your capabilities and quality standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Approval</h3>
                  <p className="text-gray-600 text-sm">
                    Successful vendors receive partnership approval
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    4
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Onboarding
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Complete onboarding process and start collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Get in Touch
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Vendor Relations Team
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-gray-700">vendors@Stelz.com</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-gray-700">+91 22 1234 5678</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-gray-700">
                        Mumbai, Maharashtra, India
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Required Documents
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Company registration certificate</li>
                    <li>• ISO certification (if applicable)</li>
                    <li>• Quality management system documents</li>
                    <li>• Financial statements (last 3 years)</li>
                    <li>• Technical capabilities portfolio</li>
                    <li>• References from existing clients</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 border-t mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">
                  <span className="text-blue-600">Stelz</span>{" "}
                  <span className="text-black">CAR PARKING SYSTEMS</span>
                </h3>
              </div>
              <div className="text-sm text-gray-500 text-center">
                Copyrights 2020 | Privacy Policy | All Rights Reserved.
                <br />
                ISO-9001:2008 Certified. Site Credits
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
