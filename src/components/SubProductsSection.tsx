"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubProductsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const subProducts = [
    {
      name: "S-01",
      image: "/assets/sub-products/stackparking_sub_product.jpg",
      route: "/products/stack-parking",
    },
    {
      name: "PS-1",
      image: "/assets/sub-products/stackparking_sub_product_02.jpg",
      route: "/products/stackpark",
    },
    {
      name: "PS-02",
      image: "/assets/sub-products/stackparking_sub_product_03.jpg",
      route: "/products/stackpark",
    },
    {
      name: "P-01",
      image: "/assets/sub-products/puzzle_parking_01.jpg",
      route: "/products/puzzle-parking",
    },
    {
      name: "PP-02",
      image: "/assets/sub-products/puzzle_parking_02.jpg",
      route: "/products/puzzlepark",
    },
    {
      name: "CAR HOIST",
      image: "/assets/sub-products/Car_Hoist_01.jpg",
      route: "/products/automatic",
    },
    {
      name: "ROTARY",
      image: "/assets/sub-products/Car_Hoist_02.jpg",
      route: "/products/automatic",
    },
    {
      name: "TURN TABLE",
      image: "/assets/sub-products/Car_Hoist_03.jpg",
      route: "/products/automatic",
    },
  ];

  const handleCardClick = (route: string) => {
    router.push(route);
  };

  const productsPerPage = 8;
  const totalPages = Math.ceil(subProducts.length / productsPerPage);
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = subProducts.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">
          <span className="border-l-4 border-blue-600 pl-4 text-black">
            Sub
          </span>{" "}
          <span className="text-blue-600">Products</span>
        </h2>

        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentProducts.map((product, index) => (
              <div
                key={startIndex + index}
                onClick={() => handleCardClick(product.route)}
                className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                <div
                  className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-600 to-blue-700"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/60 transition-opacity duration-300 group-hover:bg-black/40"></div>
                  {/* Product Name */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <span className="text-2xl font-bold text-white drop-shadow-lg">
                      {product.name}
                    </span>
                  </div>

                  {/* Stelz Logo for some products */}
                  {index % 2 === 0 && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <div className="text-white font-bold text-sm drop-shadow-lg">
                        Stelz
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {/* <button
            onClick={prevPage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-300"
            aria-label="Previous page"
          >
            <span className="text-xl text-gray-800">❮</span>
          </button> */}

          {/* <button
            onClick={nextPage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-300"
            aria-label="Next page"
          >
            <span className="text-xl text-gray-800">❯</span>
          </button> */}

          {/* Page Indicators */}
          {/* <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "bg-blue-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
