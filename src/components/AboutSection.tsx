"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingBar from "./LoadingBar";

export default function AboutSection() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleKnowMoreClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/about");
    }, 500);
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <section className="py-16 bg-white" id="about">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                <span className="border-l-4 border-blue-600 pl-4 text-black">
                  About
                </span>{" "}
                <span className="text-blue-600">Us</span>
              </h2>

              <h3 className="text-xl font-semibold mb-4  text-gray-900">
                We Manufacture
                <br />
                Multilevel Car Parking Systems
              </h3>

              <p className="text-gray-800 mb-4 leading-relaxed text-lg">
                Stelz is India's leading manufacturer of Car Parking Systems. We
                are based in India with export facilities in South East Asia,
                Africa and Europe. Stelz believes in providing environment
                friendly parking solutions that comply with international
                quality standards.
              </p>

              <p className="text-gray-800 mb-4 leading-relaxed text-lg">
                With installations of 15000 platforms in over 500 projects we
                have generated a strong goodwill in the market.
              </p>

              <p className="text-gray-800 mb-6 leading-relaxed text-lg">
                We offer 500 variants in hydraulic and traction based parking
                systems From architectural planning by our In-house Design team,
                manufacturing using modern automated techniques, installation
                and AMC services, we provide end to end services in parking
                systems.
              </p>

              <button
                onClick={handleKnowMoreClick}
                className="bg-gradient-blue text-white px-8 py-4 rounded shadow-blue hover:shadow-lg transition-all duration-300 font-semibold text-lg focus:ring-2 focus:ring-blue-300"
              >
                Know More
              </button>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                <Image
                  src="/assets/about/about-right.png"
                  alt="Stelz Car Parking Systems"
                  width={500}
                  height={500}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
