"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBar from "./LoadingBar";


export default function MaintenanceSection() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleKnowMoreClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/maintenance");
    }, 500);
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="border-l-4 border-blue-600 pl-4 text-black">
                  Annual Maintenance
                </span>{" "}
                <span className="text-blue-600">Contract</span>
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                With a dedicated team of skilled technicians and engineers available to address any concerns and requirements, i-stron aims to provide premium services to our clients covered under warranty and Annual Maintenance Contracts with our emergency breakdown services, available 24/7.
              </p>

              <button
                className="bg-gradient-blue text-white px-6 py-3 rounded shadow-blue hover:shadow-lg transition-all duration-300 font-semibold"
                onClick={handleKnowMoreClick}
              >
                Know More
              </button>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <img
                  src="/assets/products/vertipark-new.jpg"
                  alt="Maintenance Services"
                  className="w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = "none";
                    // Show fallback if image fails
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = "block";
                    }
                  }}
                />
                {/* Fallback if image fails to load */}
                <div
                  className="w-full aspect-square bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg flex items-center justify-center"
                  style={{ display: "none" }}
                >
                  <span className="text-white text-4xl">🔧</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
