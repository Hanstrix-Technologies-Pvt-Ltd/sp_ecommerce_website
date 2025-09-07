"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function AnnualMaintenanceContractPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Annual Maintenance Contract" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">
                ANNUAL MAINTENANCE{" "}
                <span className="text-blue-600">CONTRACT</span>
              </h1>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Content */}
            <div className="space-y-6">
              <div className="bg-white">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  i-stron's maintenance department assures services to the users
                  with parking systems under warranty or comprehensive and non-
                  comprehensive AMC. With the use of our maintenance vans we aim
                  to provide expedited onsite maintenance.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  With a dedicated team of skilled technicians and engineers
                  available to address any concerns and requirements, our
                  service standards and quality remain unmatched in the
                  industry.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We provide preventive maintenance services every quarter, to
                  all parking systems under warranty & AMC.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  The quarterly services include inspection of the system by our
                  trained and skilled technicians, checking and ensuring the
                  smooth operation of the product, oiling and greasing of
                  parking systems and submission of a detailed report to the
                  Maintenance department which decides the next course of
                  action, if required.
                </p>
              </div>

              {/* Benefits Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  AMC Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">
                      Regular preventive maintenance to avoid breakdowns
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">
                      Priority response for emergency situations
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">
                      Cost-effective maintenance solutions
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">
                      Detailed quarterly inspection reports
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                    <span className="text-gray-700">
                      Skilled technicians and engineers support
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative">
              {/* Background Image with Blue Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage:
                    "url('/assets/maintainance/maintenance-bg.jpg')",
                }}
              >
                <div className="absolute inset-0 bg-blue-600 bg-opacity-90 rounded-lg"></div>
              </div>

              {/* Form Content */}
              <div className="relative z-10 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-white text-sm font-medium mb-2 uppercase tracking-wide"
                    >
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Name"
                      required
                      className="w-full px-4 py-3 bg-white bg-opacity-90 border border-white border-opacity-30 rounded-sm text-black placeholder-gray-500 focus:outline-none focus:border-white focus:bg-opacity-95 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white text-sm font-medium mb-2 uppercase tracking-wide"
                    >
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      required
                      className="w-full px-4 py-3 bg-white bg-opacity-90 border border-white border-opacity-30 rounded-sm text-black placeholder-gray-500 focus:outline-none focus:border-white focus:bg-opacity-95 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-white text-sm font-medium mb-2 uppercase tracking-wide"
                    >
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Contact Number"
                      required
                      className="w-full px-4 py-3 bg-white bg-opacity-90 border border-white border-opacity-30 rounded-sm text-black placeholder-gray-500 focus:outline-none focus:border-white focus:bg-opacity-95 transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-white text-sm font-medium mb-2 uppercase tracking-wide"
                    >
                      Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white bg-opacity-90 border border-white border-opacity-30 rounded-sm text-black placeholder-gray-500 focus:outline-none focus:border-white focus:bg-opacity-95 transition-all duration-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-blue-600 py-3 px-6 rounded-sm font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mt-16">
            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
                Our Maintenance Services Include
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
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
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Quarterly Inspections
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Regular system inspections by our trained technicians
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Preventive Maintenance
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Oiling, greasing, and system optimization
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Detailed Reports
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive maintenance reports and recommendations
                  </p>
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
