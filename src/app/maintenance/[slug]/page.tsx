"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingBar from "../../../components/LoadingBar";
import BreadcrumbNav from "../../../components/BreadcrumbNav";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

interface ProductSpecification {
  name: string;
  value: string;
}

interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

interface ProductData {
  name: string;
  description: string;
  image: string;
  specifications: ProductSpecification[];
  features: ProductFeature[];
  applications?: string[];
  technicalDetails: string[];
}

export default function AutomaticProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductData | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  // Mock data for automatic products
  const automaticProducts = {
    "car-hoist": {
      name: "CAR HOIST",
      description: "Car Hoist Systems are vertical lifting mechanisms designed to transport vehicles between different floor levels, commonly used in multi-level buildings with limited ramp space. These systems provide a safe, space-efficient alternative to traditional ramps, enabling seamless vehicle movement in residential, commercial, and industrial applications. Ideal for basements, rooftops, or mezzanine-level parking, Car Hoists ensure smooth and reliable car transfer in compact footprints.",
      image: "/assets/cars/imgi_109_Car_Hoist_02-300x238.jpg",
      specifications: [
        { name: "Capacity", value: "1 car" },
        { name: "Movement", value: "Vertical" },
        { name: "Control", value: "Automated" },
        { name: "Installation", value: "Above ground" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "Vertical Mobility",
          description: "Efficiently moves vehicles between multiple floor levels",
          icon: "⬆️"
        },
        {
          title: "Space Optimization",
          description: "Eliminates the need for ramps, preserving valuable floor area",
          icon: "💾"
        },
        {
          title: "Heavy-Duty Design",
          description: "Built to handle various vehicle weights with robust lifting mechanisms",
          icon: "🏗️"
        },
        {
          title: "Safety Assured",
          description: "Equipped with advanced safety features including interlocks, sensors, and anti-fall devices",
          icon: "🛡️"
        },
        {
          title: "Customizable Configuration",
          description: "Available in multiple sizes, capacities, and finishes to match specific site needs",
          icon: "⚙️"
        }
      ],
      applications: [
        "Residential Villas & Premium Apartments with Basement Parking",
        "Commercial Buildings & Office Complexes",
        "Automobile Showrooms & Service Centers",
        "Shopping Malls & Mixed-Use Towers",
        "Industrial Warehouses with Vehicle Access Needs",
        "Hotels & High-Rise Developments",
        "Private Garages with Multi-Level Parking Requirements",
        "Real Estate Projects with Rooftop or Subterranean Parking"
      ],
      technicalDetails: [
        "Hydraulic lifting system with precision control",
        "PLC-based control system with touch screen interface",
        "Emergency stop system with manual override capability",
        "Overload protection and safety interlocks",
        "Weather-resistant construction for outdoor installation",
        "Modular design for easy transportation and installation"
      ]
    },
    "rotary": {
      name: "ROTARY",
      description: "The Turntable Car Parking System is a smart, space-saving innovation designed to rotate vehicles effortlessly in tight spaces. It allows cars to be turned 180 or 360 degrees in place, eliminating the need for complicated reversing or multi-point turns. Ideal for luxury residences, commercial driveways, showrooms, and high-density parking zones, this system adds both functionality and sophistication to any property. Whether you're working with narrow access points, confined basements, or limited turning radii, the Turntable System ensures smooth, efficient maneuvering — with style.",
      image: "/assets/cars/imgi_15_TT-01_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "1 car" },
        { name: "Movement", value: "Rotational" },
        { name: "Control", value: "Automated" },
        { name: "Space Efficiency", value: "98%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "360° Vehicle Rotation",
          description: "Rotates the car to any desired angle, enabling easy entry and exit",
          icon: "🔄"
        },
        {
          title: "Space-Saving Design",
          description: "Perfect for small plots, basement garages, and restricted parking areas",
          icon: "💾"
        },
        {
          title: "Elegant Aesthetic",
          description: "Seamlessly blends with modern architecture and high-end property designs",
          icon: "✨"
        },
        {
          title: "User-Friendly Operation",
          description: "Operated by remote control or touch panel with precision safety sensors",
          icon: "🎮"
        },
        {
          title: "Customizable Build",
          description: "Available in various sizes, load capacities, and finishes to match site-specific needs",
          icon: "⚙️"
        },
        {
          title: "Low Maintenance",
          description: "Built with durable, weather-resistant materials ensuring long-term performance",
          icon: "🔧"
        }
      ],
      applications: [
        "Luxury Villas & Private Homes with Tight Driveways",
        "Residential Complexes with Limited Turning Radius",
        "Automobile Showrooms & Dealership Display Areas",
        "Event Venues & Banquet Halls with Controlled Parking Zones",
        "Government or Institutional Buildings with Space Constraints",
        "Commercial Buildings & Corporate Parks"
      ],
      technicalDetails: [
        "Rotational hydraulic system with smooth operation",
        "Advanced PLC control with precision positioning",
        "Comprehensive safety system with multiple fail-safes",
        "Energy-efficient operation with smart controls",
        "Easy maintenance access and service points",
        "Robust construction for long-term reliability"
      ]
    },
    "turn-table": {
      name: "TURN TABLE",
      description: "The Turntable Car Parking System is a smart, space-saving innovation designed to rotate vehicles effortlessly in tight spaces. It allows cars to be turned 180 or 360 degrees in place, eliminating the need for complicated reversing or multi-point turns. Ideal for luxury residences, commercial driveways, showrooms, and high-density parking zones, this system adds both functionality and sophistication to any property. Whether you're working with narrow access points, confined basements, or limited turning radii, the Turntable System ensures smooth, efficient maneuvering — with style.",
      image: "/assets/cars/imgi_15_TT-01_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "1 car" },
        { name: "Movement", value: "Rotational" },
        { name: "Control", value: "Manual/Automated" },
        { name: "Installation", value: "Surface level" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Manual/Automated" }
      ],
      features: [
        {
          title: "360° Vehicle Rotation",
          description: "Rotates the car to any desired angle, enabling easy entry and exit",
          icon: "🔄"
        },
        {
          title: "Space-Saving Design",
          description: "Perfect for small plots, basement garages, and restricted parking areas",
          icon: "💾"
        },
        {
          title: "Elegant Aesthetic",
          description: "Seamlessly blends with modern architecture and high-end property designs",
          icon: "✨"
        },
        {
          title: "User-Friendly Operation",
          description: "Operated by remote control or touch panel with precision safety sensors",
          icon: "🎮"
        },
        {
          title: "Customizable Build",
          description: "Available in various sizes, load capacities, and finishes to match site-specific needs",
          icon: "⚙️"
        },
        {
          title: "Low Maintenance",
          description: "Built with durable, weather-resistant materials ensuring long-term performance",
          icon: "🔧"
        }
      ],
      applications: [
        "Luxury Villas & Private Homes with Tight Driveways",
        "Residential Complexes with Limited Turning Radius",
        "Automobile Showrooms & Dealership Display Areas",
        "Event Venues & Banquet Halls with Controlled Parking Zones",
        "Government or Institutional Buildings with Space Constraints",
        "Commercial Buildings & Corporate Parks"
      ],
      technicalDetails: [
        "Turn table system with smooth rotational movement",
        "Dual-mode operation (manual and automated)",
        "Enhanced safety features for reliable operation",
        "Easy installation and setup process",
        "Low maintenance requirements",
        "Durable construction for long service life"
      ]
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const productData = automaticProducts[slug as keyof typeof automaticProducts];
      if (productData) {
        setProduct(productData);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <LoadingBar isLoading={isLoading} />
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="pt-20">
            <div className="container mx-auto px-4 py-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-96 bg-gray-300 rounded"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
              <p className="text-gray-600">The requested product could not be found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20">
          <BreadcrumbNav currentPage={product.name} />
          
          <div className="container mx-auto px-4 py-8">
            {/* Product Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{product.description}</p>
            </div>

            {/* Product Content */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left Side - Product Image and Features */}
              <div className="space-y-8">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Key Features */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {product.features.map((feature: ProductFeature, index: number) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                          <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Applications and Specifications */}
              <div className="space-y-8">
                {/* Applications */}
                {product.applications && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Applications</h2>
                    <div className="grid grid-cols-1 gap-3">
                      {product.applications.map((application: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{application}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Specifications */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Specifications</h2>
                  <div className="grid grid-cols-1 gap-4">
                    {product.specifications.map((spec: ProductSpecification, index: number) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-700">{spec.name}</span>
                        <span className="text-gray-900">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Technical Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {product.technicalDetails.map((detail: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-blue-600 text-white py-12 px-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8">Contact us today to learn more about {product.name} and how it can benefit your project.</p>
              <div className="space-x-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Request Quote
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
