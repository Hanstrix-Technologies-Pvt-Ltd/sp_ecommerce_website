"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBar from "./LoadingBar";

export default function ProductsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const products = [
    {
      name: "STACK PARKING",
      description:
        "⁠Stack Parking Systems are vertical car parking solutions designed to optimize limited space in urban and commercial areas. Ideal for apartments, malls, and office complexes, they ensure safe, organized, and efficient vehicle storage.",
      // image: "/assets/products/pitpack.jpg",
      image: "/assets/products/puzzle-park.jpg",
      slug: "pitpark",
    },
    {
      name: "PUZZLE PARKING",
      description:
        "Puzzle Parking Systems are semi-automated parking solutions designed to maximize vehicle storage capacity in constrained urban spaces. Utilizing a grid-like structure of vertical and horizontal movement, these systems allow multiple vehicles to be parked and retrieved independently, without moving other cars. Perfect for high-density areas such as apartments, offices, and commercial hubs, Puzzle Parking offers a smart, space-efficient alternative to conventional parking.",
      image: "/assets/products/puzzle_parking.jpg",
      slug: "puzzlepark",
    },
    {
      name: "AUTOMATIC",
      description:
        "Car Hoist Systems are vertical lifting mechanisms designed to transport vehicles between different floor levels, commonly used in multi-level buildings with limited ramp space. These systems provide a safe, space-efficient alternative to traditional ramps, enabling seamless vehicle movement in residential, commercial, and industrial applications. Ideal for basements, rooftops, or mezzanine-level parking, Car Hoists ensure smooth and reliable car transfer in compact footprints.",
      image: "/assets/products/automatic.jpg",
      slug: "stackpark",
    },
  ];

  const handleProductClick = (slug: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/products/${slug}`);
    }, 500);
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <section className="py-16 bg-gray-50" id="products">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            <span className="border-l-4 border-blue-600 pl-4">Our</span>{" "}
            <span className="text-blue-600">Products</span>
          </h2>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <article
                  key={index}
                  className="bg-white rounded-lg shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col cursor-pointer"
                  style={{ height: "450px" }}
                  onClick={() => handleProductClick(product.slug)}
                >
                  {/* Product Image - Top Only */}
                  <div className="relative h-64 overflow-hidden m-0 p-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center bg-gray-100 group-hover:scale-105 transition-transform duration-300 m-0 p-0"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) {
                          target.style.display = "none";
                          fallback.style.display = "flex";
                        }
                      }}
                    />
                    {/* Fallback if image fails to load */}
                    <div
                      className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center m-0 p-0"
                      style={{ display: "none" }}
                    >
                      <span className="text-gray-600 font-semibold text-lg">
                        {product.name}
                      </span>
                    </div>
                  </div>

                  {/* Product Info - Bottom Section */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex-1 flex flex-col justify-between m-0">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-center uppercase">
                        {product.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-blue-50 text-left line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                    <div className="text-center mt-3">
                      <button
                        className="text-white underline hover:text-blue-100 transition-colors font-medium text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product.slug);
                        }}
                      >
                        Know More
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* No navigation needed for 3 products */}
          </div>
        </div>
      </section>
    </>
  );
}
