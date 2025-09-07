"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function MaintenancePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Annual Maintenance Contract" />
        </div>

        {/* Banner Image - Full Width */}
        <div className="w-full pt-2">
          <img
            src="/assets/maintainance/annual-maintanance-banner.jpg"
            alt="Maintenance Services"
            className="w-full h-[260px] object-cover rounded-lg shadow-lg"
            style={{ maxWidth: '100%' }}
          />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">
                ANNUAL MAINTENANCE CONTRACT
              </h1>
            </div>
          </div>

          {/* Introduction - Two Column Layout */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden">
              {/* Left: Description */}
              <div className="bg-white p-8 flex flex-col justify-center">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  i-stron's maintenance department assures services to the users with parking systems under warranty or comprehensive and non-comprehensive AMC. With the use of our maintenance vans we aim to provide expedited onsite maintenance.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  With a dedicated team of skilled technicians and engineers available to address any concerns and requirements, our service standards and quality remain unmatched in the industry.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  We provide preventive maintenance services every quarter, to all parking systems under warranty & AMC.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  The quarterly services include inspection of the system by our trained and skilled technicians, checking and ensuring the smooth operation of the product, oiling and greasing of parking systems and submission of a detailed report to the Maintenance department which decides the next course of action, if required.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  i-stron offers emergency breakdown services, available 24/7 at no extra cost. In case of any such emergency, our representatives would reach the site within three hours of the complaint being logged with us.
                </p>
              </div>
              {/* Right: Background Image with Form or Thank You */}
              <div
                className="hidden md:flex relative items-center justify-center"
                style={{
                  backgroundImage: "url('/assets/maintainance/annual-maintanance-form-bg.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '320px',
                  height: '100%',
                }}
              >
                {showThankYou ? (
                  <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto flex flex-col items-center justify-center" style={{ zIndex: 2 }}>
                    <h2 className="text-3xl font-bold text-center mb-4 text-black">Thank You</h2>
                    <p className="text-lg text-center text-black">
                      Thank You for submitting the details. Our executive will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
                    style={{ zIndex: 2 }}
                    onSubmit={e => {
                      e.preventDefault();
                      setShowThankYou(true);
                    }}
                  >
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-black" htmlFor="name">FULL NAME*</label>
                      <input className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" id="name" name="name" placeholder="Name" required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-black" htmlFor="email">EMAIL ADDRESS*</label>
                      <input className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="email" id="email" name="email" placeholder="Email" required />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-bold mb-2 text-black" htmlFor="phone">PHONE NUMBER*</label>
                      <input className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="tel" id="phone" name="phone" placeholder="Contact Number" required />
                    </div>
                    <div className="mb-6">
                      <label className="block text-sm font-bold mb-2 text-black" htmlFor="message">MESSAGE*</label>
                      <textarea className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" id="message" name="message" rows={4} placeholder="Message" required></textarea>
                    </div>
                    <button type="submit" className="w-2/4 bg-red-500 text-white font-bold py-2 rounded hover:bg-red-700 transition">SEND MESSAGE</button>
                  </form>
                )}
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