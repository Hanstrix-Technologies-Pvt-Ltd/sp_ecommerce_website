"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function ProductFinderPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    typeOfParking: [] as string[],
    typeOfInstallation: [] as string[],
    provisionForPit: [] as string[],
    heightPermissible: [] as string[],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const products = [
    {
      name: "StackPark 2DS",
      image: "/assets/products/stackpark.jpg",
      description: "Two-level dependent stacking system",
      slug: "stackpark-2ds",
    },
    {
      name: "StackPark 3DS",
      image: "/assets/products/stackpark-3ds.jpg",
      description: "Three-level dependent stacking system",
      slug: "stackpark-3ds",
      featured: true,
    },
    {
      name: "StackPark Incline",
      image: "/assets/products/stackpark-incline.jpg",
      description: "Inclined stacking parking system",
      slug: "stackpark-incline",
    },
    {
      name: "StackPark Cantilever",
      image: "/assets/products/cantilever.jpg",
      description: "Cantilever parking system",
      slug: "stackpark-cantilever",
    },
    {
      name: "PitPark 2IP",
      image: "/assets/products/pitpack.jpg",
      description: "Two-level independent pit system",
      slug: "pitpark-2ip",
    },
    {
      name: "PitPark 2DP",
      image: "/assets/products/pitpark-2dp.jpg",
      description: "Two-level dependent pit system",
      slug: "pitpark-2dp",
    },
    {
      name: "PitPark 3IP",
      image: "/assets/products/pitpark-3ip.jpg",
      description: "Three-level independent pit system",
      slug: "pitpark-3ip",
    },
    {
      name: "PitPark 3DP",
      image: "/assets/products/pitpark-3dp.jpg",
      description: "Three-level dependent pit system",
      slug: "pitpark-3dp",
    },
    {
      name: "VertiPark",
      image: "/assets/products/vertipark-new.jpg",
      description: "Multi-story tower parking system",
      slug: "vertipark",
    },
  ];

  const filterOptions = {
    typeOfParking: [
      { id: "dependent-allowed", label: "Dependent allowed" },
      { id: "dependent-not-allowed", label: "Dependent not allowed" },
    ],
    typeOfInstallation: [
      { id: "indoor", label: "Indoor" },
      { id: "outdoor", label: "Outdoor" },
      { id: "driveway", label: "Driveway" },
    ],
    provisionForPit: [
      { id: "pit-possible", label: "Pit possible" },
      { id: "pit-not-possible", label: "Pit not possible" },
    ],
    heightPermissible: [
      { id: "less-than-2", label: "Less than 2 cars" },
      { id: "2-cars", label: "2 cars" },
      { id: "3-cars", label: "3 cars" },
      { id: "more-than-3", label: "More than 3 cars" },
    ],
  };

  const handleFilterChange = (
    category: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item: string) => item !== value)
        : [...prev[category], value],
    }));
  };

  const resetFilters = () => {
    setFilters({
      typeOfParking: [],
      typeOfInstallation: [],
      provisionForPit: [],
      heightPermissible: [],
    });
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Product Finder" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">
                <span className="text-blue-600">Product Finder</span>
              </h1>
            </div>
          </div>

          {/* Main Layout */}
          <div className="flex gap-8">
            {/* Left Sidebar - Filters */}
            <div className="w-1/4 bg-white border border-gray-200 rounded-lg p-6 h-fit">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Filters</h3>

              {/* Type of Parking */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Type of Parking
                </h4>
                <div className="space-y-2">
                  {filterOptions.typeOfParking.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.typeOfParking.includes(option.id)}
                        onChange={() =>
                          handleFilterChange("typeOfParking", option.id)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 text-sm">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type of Installation */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Type of Installation
                </h4>
                <div className="space-y-2">
                  {filterOptions.typeOfInstallation.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.typeOfInstallation.includes(option.id)}
                        onChange={() =>
                          handleFilterChange("typeOfInstallation", option.id)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 text-sm">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Provision for Pit */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Provision for Pit
                </h4>
                <div className="space-y-2">
                  {filterOptions.provisionForPit.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.provisionForPit.includes(option.id)}
                        onChange={() =>
                          handleFilterChange("provisionForPit", option.id)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 text-sm">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Height Permissible */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">
                  Height Permissible
                </h4>
                <div className="space-y-2">
                  {filterOptions.heightPermissible.map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.heightPermissible.includes(option.id)}
                        onChange={() =>
                          handleFilterChange("heightPermissible", option.id)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 text-sm">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Reset Product Filter
              </button>
            </div>

            {/* Right Side - Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl relative ${
                      product.featured
                        ? "border-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      {product.featured && (
                        <div className="absolute top-0 left-0 right-0 bg-blue-600 text-white text-center py-1">
                          <span className="text-sm font-medium">Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3
                        className={`text-lg font-bold mb-2 ${
                          product.featured ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description}
                      </p>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
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
