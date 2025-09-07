"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingBar from "../../../../components/LoadingBar";
import BreadcrumbNav from "../../../../components/BreadcrumbNav";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";

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

export default function PuzzleParkingProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductData | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  // Mock data for puzzle parking products
  const puzzleParkingProducts = {
    "p-01-two-level": {
      name: "P – 01 TWO LEVEL",
      description: "Enhance Parking Capacity with Puzzle Parking Systems. Puzzle Parking Systems are semi-automated parking solutions designed to maximize vehicle storage capacity in constrained urban spaces. Utilizing a grid-like structure of vertical and horizontal movement, these systems allow multiple vehicles to be parked and retrieved independently, without moving other cars. Perfect for high-density areas such as apartments, offices, and commercial hubs, Puzzle Parking offers a smart, space-efficient alternative to conventional parking.",
      image: "/assets/cars/imgi_12_P-01_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "2 cars" },
        { name: "Movement", value: "Vertical & Horizontal" },
        { name: "Control", value: "Automated" },
        { name: "Space Efficiency", value: "95%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "High Space Efficiency",
          description: "Optimizes parking area by enabling both vertical and horizontal car movement",
          icon: "🏗️"
        },
        {
          title: "Independent Parking",
          description: "Each vehicle can be accessed without shifting others, reducing waiting time",
          icon: "🚗"
        },
        {
          title: "Time-Saving Operation",
          description: "Automated or semi-automated controls for faster entry and retrieval",
          icon: "⚡"
        },
        {
          title: "Safe & Secure",
          description: "Enhanced safety features with anti-fall devices and controlled access",
          icon: "🛡️"
        },
        {
          title: "Custom Configurations",
          description: "Scalable layouts to fit basements, open plots, or multi-floor structures",
          icon: "⚙️"
        }
      ],
      applications: [
        "Urban Residential Complexes & Housing Societies",
        "Corporate Offices & Business Parks",
        "Shopping Malls & Mixed-Use Developments",
        "Hospitals & Institutional Buildings",
        "Hotels, Resorts & Convention Centers",
        "Public & Private Multi-Level Parking Facilities",
        "Railway Stations, Airports & Metro Terminals",
        "Automotive Dealerships & High-End Garages"
      ],
      technicalDetails: [
        "Automated puzzle movement system with precision control",
        "PLC-based control system with touch screen interface",
        "Emergency stop system with manual override capability",
        "Overload protection and safety interlocks",
        "Weather-resistant construction for outdoor installation",
        "Modular design for easy transportation and installation"
      ]
    },
    "pp-01-two-level-pit": {
      name: "PP – 01 TWO LEVEL PIT",
      description: "Enhance Parking Capacity with Puzzle Parking Systems. Puzzle Parking Systems are semi-automated parking solutions designed to maximize vehicle storage capacity in constrained urban spaces. Utilizing a grid-like structure of vertical and horizontal movement, these systems allow multiple vehicles to be parked and retrieved independently, without moving other cars. Perfect for high-density areas such as apartments, offices, and commercial hubs, Puzzle Parking offers a smart, space-efficient alternative to conventional parking.",
      image: "/assets/cars/imgi_13_PP-02_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "2 cars" },
        { name: "Movement", value: "Vertical & Horizontal" },
        { name: "Installation", value: "Underground" },
        { name: "Space Efficiency", value: "92%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "High Space Efficiency",
          description: "Optimizes parking area by enabling both vertical and horizontal car movement",
          icon: "🏗️"
        },
        {
          title: "Independent Parking",
          description: "Each vehicle can be accessed without shifting others, reducing waiting time",
          icon: "🚗"
        },
        {
          title: "Time-Saving Operation",
          description: "Automated or semi-automated controls for faster entry and retrieval",
          icon: "⚡"
        },
        {
          title: "Safe & Secure",
          description: "Enhanced safety features with anti-fall devices and controlled access",
          icon: "🛡️"
        },
        {
          title: "Custom Configurations",
          description: "Scalable layouts to fit basements, open plots, or multi-floor structures",
          icon: "⚙️"
        }
      ],
      applications: [
        "Urban Residential Complexes & Housing Societies",
        "Corporate Offices & Business Parks",
        "Shopping Malls & Mixed-Use Developments",
        "Hospitals & Institutional Buildings",
        "Hotels, Resorts & Convention Centers",
        "Public & Private Multi-Level Parking Facilities",
        "Railway Stations, Airports & Metro Terminals",
        "Automotive Dealerships & High-End Garages"
      ],
      technicalDetails: [
        "Underground puzzle movement system with corrosion protection",
        "Waterproof control system for underground operation",
        "Enhanced safety features for confined space operation",
        "Easy access for maintenance and emergency situations",
        "Drainage system for water management",
        "Ventilation system for air circulation"
      ]
    },
    "pp-02-three-level": {
      name: "PP – 02 THREE LEVEL",
      description: "Double Efficiency with Space-Saving Pit Puzzle Parking. Pit Puzzle Parking Systems are innovative semi-automatic underground parking solutions that combine the benefits of vertical stacking and horizontal shifting, utilizing space both above and below ground level. Designed for properties with limited surface area, these systems enable efficient parking without altering the building's visible architecture. Ideal for premium residential buildings, office complexes, and commercial properties, Pit Puzzle Parking ensures secure, space-optimized vehicle management.",
      image: "/assets/cars/imgi_103_PP-02_Parking_Lift_02-768x608.jpg",
      specifications: [
        { name: "Capacity", value: "3 cars" },
        { name: "Movement", value: "Vertical & Horizontal" },
        { name: "Installation", value: "Underground" },
        { name: "Space Efficiency", value: "96%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "Underground Space Utilization",
          description: "Uses basement levels to add parking capacity without occupying visible land",
          icon: "⛏️"
        },
        {
          title: "Independent Access",
          description: "Allows each vehicle to be parked and retrieved independently, without shifting others",
          icon: "🚗"
        },
        {
          title: "Smart Automation",
          description: "Semi-automated operation ensures quick, convenient, and reliable parking",
          icon: "🤖"
        },
        {
          title: "Aesthetic Advantage",
          description: "Maintains surface-level aesthetics by keeping the system hidden underground",
          icon: "🎨"
        },
        {
          title: "Customizable Layouts",
          description: "Can be configured for various depth levels and site constraints",
          icon: "⚙️"
        }
      ],
      applications: [
        "Premium Residential Apartments & High-Rises",
        "Urban Office Buildings & IT Parks",
        "Shopping Complexes & Mixed-Use Developments",
        "Hospitals & Institutional Campuses",
        "Luxury Hotels & Commercial Towers",
        "Basement and Subterranean Public Parking Facilities",
        "Space-Constrained Urban Plots",
        "Showrooms & Corporate Headquarters"
      ],
      technicalDetails: [
        "Multi-level underground puzzle movement system",
        "Advanced control system with remote monitoring",
        "Comprehensive safety features for underground operation",
        "Energy-efficient operation with smart controls",
        "Easy maintenance access and service points",
        "Integrated drainage and ventilation systems"
      ]
    },
    "op-01-over-ground-puzzle": {
      name: "OP – 01 OVER GROUND PUZZLE",
      description: "Enhance Parking Capacity with Puzzle Parking Systems. Puzzle Parking Systems are semi-automated parking solutions designed to maximize vehicle storage capacity in constrained urban spaces. Utilizing a grid-like structure of vertical and horizontal movement, these systems allow multiple vehicles to be parked and retrieved independently, without moving other cars. Perfect for high-density areas such as apartments, offices, and commercial hubs, Puzzle Parking offers a smart, space-efficient alternative to conventional parking.",
      image: "/assets/cars/imgi_14_Catilever_Parking_Lift_02-scaled.jpg",
      specifications: [
        { name: "Capacity", value: "2 cars" },
        { name: "Movement", value: "Vertical & Horizontal" },
        { name: "Installation", value: "Above ground" },
        { name: "Space Efficiency", value: "94%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "High Space Efficiency",
          description: "Optimizes parking area by enabling both vertical and horizontal car movement",
          icon: "🏗️"
        },
        {
          title: "Independent Parking",
          description: "Each vehicle can be accessed without shifting others, reducing waiting time",
          icon: "🚗"
        },
        {
          title: "Time-Saving Operation",
          description: "Automated or semi-automated controls for faster entry and retrieval",
          icon: "⚡"
        },
        {
          title: "Safe & Secure",
          description: "Enhanced safety features with anti-fall devices and controlled access",
          icon: "🛡️"
        },
        {
          title: "Custom Configurations",
          description: "Scalable layouts to fit basements, open plots, or multi-floor structures",
          icon: "⚙️"
        }
      ],
      applications: [
        "Urban Residential Complexes & Housing Societies",
        "Corporate Offices & Business Parks",
        "Shopping Malls & Mixed-Use Developments",
        "Hospitals & Institutional Buildings",
        "Hotels, Resorts & Convention Centers",
        "Public & Private Multi-Level Parking Facilities",
        "Railway Stations, Airports & Metro Terminals",
        "Automotive Dealerships & High-End Garages"
      ],
      technicalDetails: [
        "Over-ground puzzle movement system with precision control",
        "Surface-mounted control system with easy access",
        "Enhanced safety features for surface operation",
        "Weather-resistant construction for outdoor use",
        "Easy maintenance and service access",
        "Modular design for flexible installation"
      ]
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const productData = puzzleParkingProducts[slug as keyof typeof puzzleParkingProducts];
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
