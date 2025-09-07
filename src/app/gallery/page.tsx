"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide1, setCurrentSlide1] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Top carousel - Only 7 car images
  const topCarouselImages = [
    "/assets/gallery/imgi_9_CAR-SIX.png",
    "/assets/gallery/imgi_10_CAR-THREE.png",
    "/assets/gallery/imgi_11_CAR-TWO.png",
    "/assets/gallery/imgi_12_CAR-FIVE.png",
    "/assets/gallery/imgi_13_CAR-FOUR.png",
    "/assets/gallery/imgi_14_CAR-ONE.png",
    "/assets/gallery/imgi_15_CAR-SEVEN.png"
  ];

  // Bottom carousel - All remaining images (23 images)
  const bottomCarouselImages = [
    "/assets/gallery/imgi_16_20-scaled.png",
    "/assets/gallery/imgi_17_21-scaled.png",
    "/assets/gallery/imgi_18_22-scaled.png",
    "/assets/gallery/imgi_19_1-1-scaled.png",
    "/assets/gallery/imgi_20_2-1-scaled.png",
    "/assets/gallery/imgi_21_3-scaled.png",
    "/assets/gallery/imgi_22_4-scaled.png",
    "/assets/gallery/imgi_23_5-scaled.png",
    "/assets/gallery/imgi_24_6-scaled.png",
    "/assets/gallery/imgi_25_7-scaled.png",
    "/assets/gallery/imgi_26_8-scaled.png",
    "/assets/gallery/imgi_50_pexels-eva-bronzini-7598536-s.png",
    "/assets/gallery/imgi_63_9-scaled.png",
    "/assets/gallery/imgi_64_10-scaled.png",
    "/assets/gallery/imgi_65_11-scaled.png",
    "/assets/gallery/imgi_66_12-scaled.png",
    "/assets/gallery/imgi_67_13-scaled.png",
    "/assets/gallery/imgi_68_14-scaled.png",
    "/assets/gallery/imgi_69_15-scaled.png",
    "/assets/gallery/imgi_70_16-scaled.png",
    "/assets/gallery/imgi_71_17-scaled.png",
    "/assets/gallery/imgi_72_18-scaled.png",
    "/assets/gallery/imgi_73_19-scaled.png"
  ];

  const nextSlide1 = () => {
    setCurrentSlide1((prev) => (prev + 1) % topCarouselImages.length);
  };

  const prevSlide1 = () => {
    setCurrentSlide1((prev) => 
      prev === 0 ? topCarouselImages.length - 1 : prev - 1
    );
  };

  const nextSlide2 = () => {
    setCurrentSlide2((prev) => (prev + 1) % bottomCarouselImages.length);
  };

  const prevSlide2 = () => {
    setCurrentSlide2((prev) => 
      prev === 0 ? bottomCarouselImages.length - 1 : prev - 1
    );
  };

  const goToSlide1 = (index: number) => {
    setCurrentSlide1(index);
  };

  const goToSlide2 = (index: number) => {
    setCurrentSlide2(index);
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Gallery" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">GALLERY</h1>
            </div>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Our Project Gallery
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Explore our comprehensive collection of completed parking system installations, 
                showcasing innovative solutions across various industries and project types.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From residential complexes to commercial hubs, discover how Stelz Parking 
                Systems transform spaces and enhance parking efficiency.
              </p>
            </div>
          </div>

          {/* Top Carousel - 7 Car Images */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Gallery of Smart Parking Success
            </h2>
            
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-100">
                <div className="flex transition-transform duration-500 ease-in-out">
                  {topCarouselImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 flex items-center justify-center"
                      style={{ transform: `translateX(-${currentSlide1 * 100}%)` }}
                    >
                      <img
                        src={image}
                        alt={`Car Image ${index + 1}`}
                        className="w-full h-auto max-h-[500px] object-contain p-4"
                        onError={(e) => {
                          console.error(`Failed to load image: ${image}`);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide1}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide1}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {topCarouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide1(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide1
                        ? "bg-blue-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Carousel - All Remaining Images */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              3D Parking Concepts Brought to Life
            </h2>
            
            <div className="relative">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-lg shadow-xl bg-gray-100">
                <div className="flex transition-transform duration-500 ease-in-out">
                  {bottomCarouselImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0 flex items-center justify-center"
                      style={{ transform: `translateX(-${currentSlide2 * 100}%)` }}
                    >
                      <img
                        src={image}
                        alt={`Concept Image ${index + 1}`}
                        className="w-full h-auto max-h-[500px] object-contain p-4"
                        onError={(e) => {
                          console.error(`Failed to load image: ${image}`);
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide2}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide2}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {bottomCarouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide2(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide2
                        ? "bg-blue-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Features */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Gallery Features
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Car Installations
                  </h3>
                  <p className="text-gray-600">
                    View actual car parking installations
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Concept Designs
                  </h3>
                  <p className="text-gray-600">
                    Explore innovative parking system designs
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Interactive Viewing
                  </h3>
                  <p className="text-gray-600">
                    Navigate through images with smooth controls
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
