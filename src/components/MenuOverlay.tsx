"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingBar from "./LoadingBar";
import ProductsDropdown from "./ProductsDropdown";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [imageStatus, setImageStatus] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState(false);
  const router = useRouter();

  const parkingSystems = [
    {
      name: "STACK PARKING",
      image: "/assets/cars/imgi_10_S-01_Parking_Lift_02.jpg",
      description: "Multi-level stacking parking system",
      slug: "stackpark",
    },
    {
      name: "PUZZLE PARKING",
      image: "/assets/cars/imgi_12_P-01_Parking_Lift_02.jpg",
      description: "Automated puzzle parking system",
      slug: "puzzlepark",
    },
    {
      name: "AUTOMATIC",
      image: "/assets/cars/imgi_109_Car_Hoist_02-300x238.jpg",
      description: "Automatic parking solutions",
      slug: "pitpark",
    },
  ];

  const menuItems: MenuItem[] = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products", hasDropdown: true },
    {
      name: "Annual Maintenance Contract",
      href: "/annual-maintenance-contract",
    },
    { name: "Gallery", href: "/gallery" },
    { name: "Clients", href: "/clients" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    { name: "About Us", href: "/about" },
  ];

  const handleImageLoad = (name: string) => {
    console.log(`✅ Image loaded: ${name}`);
    setImageStatus((prev) => ({ ...prev, [name]: "loaded" }));
  };

  const handleImageError = (name: string) => {
    console.log(`❌ Image failed: ${name}`);
    setImageStatus((prev) => ({ ...prev, [name]: "error" }));
  };

  const handleProductClick = (slug: string) => {
    setIsLoading(true);
    handleClose();
    setTimeout(() => {
      // Navigate to main category page
      router.push(`/products/${slug}`);
    }, 500);
  };

  const handleMenuClick = (href: string) => {
    setIsLoading(true);
    handleClose();
    setTimeout(() => {
      router.push(href);
    }, 500);
  };

  const handleProductsToggle = () => {
    setExpandedProducts(!expandedProducts);
  };

  const handleClose = () => {
    setIsClosing(true);
    setExpandedProducts(false); // Reset dropdown state
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 700); // Match animation duration
  };

  // Test image loading
  useEffect(() => {
    if (isOpen) {
      parkingSystems.forEach((system) => {
        const img = new Image();
        img.onload = () => handleImageLoad(system.name);
        img.onerror = () => handleImageError(system.name);
        img.src = system.image;
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking on other menu items
  useEffect(() => {
    if (!isOpen) {
      setExpandedProducts(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="fixed inset-0 z-[9999] bg-black bg-opacity-50">
        <div className="flex h-full">
          {/* Left Section - Parking Systems (60%) - Slides from top to bottom */}
          <div
            className="w-3/5 bg-black overflow-hidden transform transition-all duration-700 ease-out"
            style={{
              animation: isClosing
                ? "slideOutToTop 0.7s ease-out"
                : isOpen
                ? "slideInFromTop 0.7s ease-out"
                : "none",
            }}
          >
            <div className="grid grid-cols-2 h-full gap-4 p-4">
              {/* First Row - 2 cards */}
              <div
                className="relative cursor-pointer group overflow-hidden border-4 border-transparent hover:border-blue-500 transition-all duration-300"
                style={{
                  animation: isOpen
                    ? `fadeInUp 0.5s ease-out 0.1s both`
                    : "none",
                }}
                onClick={() => handleProductClick(parkingSystems[0].slug)}
              >
                {/* Image container */}
                <div className="w-full h-full relative">
                  <img
                    src={parkingSystems[0].image}
                    alt={parkingSystems[0].name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onLoad={() => handleImageLoad(parkingSystems[0].name)}
                    onError={() => handleImageError(parkingSystems[0].name)}
                  />

                  {/* Blue overlay - only on hover */}
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  {/* Subtle dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>

                {/* Title only - no black background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold drop-shadow-lg transition-all duration-300 group-hover:text-blue-200 group-hover:scale-110 text-center px-4">
                    {parkingSystems[0].name}
                  </h3>
                </div>
              </div>

              <div
                className="relative cursor-pointer group overflow-hidden border-4 border-transparent hover:border-blue-500 transition-all duration-300"
                style={{
                  animation: isOpen
                    ? `fadeInUp 0.5s ease-out 0.2s both`
                    : "none",
                }}
                onClick={() => handleProductClick(parkingSystems[1].slug)}
              >
                {/* Image container */}
                <div className="w-full h-full relative">
                  <img
                    src={parkingSystems[1].image}
                    alt={parkingSystems[1].name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onLoad={() => handleImageLoad(parkingSystems[1].name)}
                    onError={() => handleImageError(parkingSystems[1].name)}
                  />

                  {/* Blue overlay - only on hover */}
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  {/* Subtle dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>

                {/* Title only - no black background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold drop-shadow-lg transition-all duration-300 group-hover:text-blue-200 group-hover:scale-110 text-center px-4">
                    {parkingSystems[1].name}
                  </h3>
                </div>
              </div>

              {/* Second Row - 1 card spanning both columns */}
              <div
                className="col-span-2 relative cursor-pointer group overflow-hidden border-4 border-transparent hover:border-blue-500 transition-all duration-300"
                style={{
                  animation: isOpen
                    ? `fadeInUp 0.5s ease-out 0.3s both`
                    : "none",
                }}
                onClick={() => handleProductClick(parkingSystems[2].slug)}
              >
                {/* Image container */}
                <div className="w-full h-full relative">
                  <img
                    src={parkingSystems[2].image}
                    alt={parkingSystems[2].name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onLoad={() => handleImageLoad(parkingSystems[2].name)}
                    onError={() => handleImageError(parkingSystems[2].name)}
                  />

                  {/* Blue overlay - only on hover */}
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  {/* Subtle dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>

                {/* Title only - no black background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-bold drop-shadow-lg transition-all duration-300 group-hover:text-blue-200 group-hover:scale-110 text-center px-4">
                    {parkingSystems[2].name}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Navigation Menu (40%) - Slides from right to left */}
          <div
            className="w-2/5 bg-gray-100 p-8 relative transform transition-all duration-700 ease-out"
            style={{
              animation: isClosing
                ? "slideOutToRight 0.7s ease-out"
                : isOpen
                ? "slideInFromRight 0.7s ease-out"
                : "none",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-2xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-300 transform hover:rotate-180"
            >
              ×
            </button>

            {/* Logo */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                <span className="text-blue-600">Stelz</span>{" "}
                <span className="text-black">CAR PARKING SYSTEMS</span>
              </h2>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    animation: isOpen
                      ? `fadeInLeft 0.5s ease-out ${index * 0.1 + 0.3}s both`
                      : "none",
                  }}
                >
                  {item.hasDropdown ? (
                    <ProductsDropdown
                      isExpanded={expandedProducts}
                      onToggle={handleProductsToggle}
                      onClose={handleClose}
                    />
                  ) : (
                    <button
                      onClick={() => handleMenuClick(item.href)}
                      className="block text-black text-lg font-medium hover:text-blue-600 py-2 border-b border-gray-200 w-full text-left"
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes slideInFromTop {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes fadeInLeft {
            from {
              transform: translateX(30px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideOutToTop {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(-100%);
              opacity: 0;
            }
          }

          @keyframes slideOutToRight {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(100%);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
}
