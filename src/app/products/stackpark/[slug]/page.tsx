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

export default function StackParkingProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductData | null>(null);
  const params = useParams();
  const slug = params.slug as string;

  // Mock data for stack parking products
  const stackParkingProducts = {
    "s-01-two-level-stack": {
      name: "S – 01 TWO LEVEL STACK",
      description: "Smart Car Parking Solutions for Every Space. Stack Parking Systems are vertical car parking solutions designed to optimize limited space in urban and commercial areas. Ideal for apartments, malls, and office complexes, they ensure safe, organized, and efficient vehicle storage.",
      image: "/assets/cars/imgi_10_S-01_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "2 cars" },
        { name: "Lift Type", value: "Hydraulic" },
        { name: "Installation", value: "Above ground" },
        { name: "Space Efficiency", value: "85%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "Space Saving",
          description: "Doubles parking capacity vertically, making the most of compact urban spaces",
          icon: "🏗️"
        },
        {
          title: "Cost Effective",
          description: "Significantly reduces land usage and overall construction expenses",
          icon: "💰"
        },
        {
          title: "Easy Operation",
          description: "Designed with a simple, user-friendly mechanism for hassle-free access",
          icon: "⚡"
        },
        {
          title: "Customizable",
          description: "Flexible design adaptable to a wide range of site layouts and vehicle types",
          icon: "⚙️"
        },
        {
          title: "Low Maintenance",
          description: "Built with durable components requiring minimal upkeep",
          icon: "🔧"
        }
      ],
      applications: [
        "Residential Apartments & Gated Communities",
        "Commercial Complexes & Office Buildings",
        "Shopping Malls & Retail Centers",
        "Hospitals & Educational Institutions",
        "Hotels & Convention Centers",
        "Transport Hubs like Airports & Railway Stations",
        "Public Parking Lots & Municipal Spaces",
        "Automobile Showrooms & Service Stations"
      ],
      technicalDetails: [
        "Hydraulic power unit with pressure monitoring",
        "PLC-based control system with touch screen interface",
        "Emergency stop system with manual override",
        "Overload protection and safety interlocks",
        "Weather-resistant construction for outdoor installation",
        "Modular design for easy transportation and installation"
      ]
    },
    "s-011-three-level": {
      name: "S – 011 THREE LEVEL",
      description: "Smart Car Parking Solutions for Every Space. Stack Parking Systems are vertical car parking solutions designed to optimize limited space in urban and commercial areas. Ideal for apartments, malls, and office complexes, they ensure safe, organized, and efficient vehicle storage.",
      image: "/assets/cars/imgi_28_S-011_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "3 cars" },
        { name: "Lift Type", value: "Hydraulic" },
        { name: "Installation", value: "Above ground" },
        { name: "Space Efficiency", value: "90%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "Space Saving",
          description: "Doubles parking capacity vertically, making the most of compact urban spaces",
          icon: "🏗️"
        },
        {
          title: "Cost Effective",
          description: "Significantly reduces land usage and overall construction expenses",
          icon: "💰"
        },
        {
          title: "Easy Operation",
          description: "Designed with a simple, user-friendly mechanism for hassle-free access",
          icon: "⚡"
        },
        {
          title: "Customizable",
          description: "Flexible design adaptable to a wide range of site layouts and vehicle types",
          icon: "⚙️"
        },
        {
          title: "Low Maintenance",
          description: "Built with durable components requiring minimal upkeep",
          icon: "🔧"
        }
      ],
      applications: [
        "Residential Apartments & Gated Communities",
        "Commercial Complexes & Office Buildings",
        "Shopping Malls & Retail Centers",
        "Hospitals & Educational Institutions",
        "Hotels & Convention Centers",
        "Transport Hubs like Airports & Railway Stations",
        "Public Parking Lots & Municipal Spaces",
        "Automobile Showrooms & Service Stations"
      ],
      technicalDetails: [
        "Multi-level hydraulic system with synchronized operation",
        "Advanced PLC control with real-time monitoring",
        "Comprehensive safety system with multiple fail-safes",
        "Energy-efficient operation with smart power management",
        "Robust construction for heavy-duty applications",
        "Easy access for maintenance and servicing"
      ]
    },
    "ps-1-two-level-pit": {
      name: "PS – 1 TWO LEVEL PIT",
      description: "Unlock Underground Space with Pit Stacker Parking Systems. The Pit Stacker Car Parking System is a smart vertical parking solution designed to maximize parking capacity by utilizing underground space without compromising the surface-level aesthetics. Ideal for premium residential, commercial, and mixed-use developments, this system allows one or more vehicles to be parked in a concealed pit, leaving the ground level free for additional parking or open usage. Engineered for seamless integration into building designs, the Pit Stacker offers a perfect blend of space efficiency, convenience, and modern functionality.",
      image: "/assets/cars/imgi_11_PS-11_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "2 cars" },
        { name: "Lift Type", value: "Hydraulic" },
        { name: "Installation", value: "Underground" },
        { name: "Space Efficiency", value: "88%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "Underground Installation",
          description: "Makes use of below-ground space to double or triple parking capacity",
          icon: "⛏️"
        },
        {
          title: "Discreet & Space-Saving",
          description: "Keeps the parked vehicle hidden, preserving surface area for other purposes",
          icon: "🎨"
        },
        {
          title: "Independent or Dependent Access",
          description: "Available in configurations to suit usage needs and access frequency",
          icon: "🔧"
        },
        {
          title: "Smooth Operation",
          description: "Operated via hydraulic or electro-mechanical systems with safety interlocks",
          icon: "⚡"
        },
        {
          title: "Custom Configurations",
          description: "Tailored depth, lifting height, and platform sizes to suit site requirements",
          icon: "⚙️"
        },
        {
          title: "Durable & Low Maintenance",
          description: "Constructed with corrosion-resistant components for long-term performance",
          icon: "🛡️"
        }
      ],
      applications: [
        "Luxury Residences & Villas with Limited Open Space",
        "Urban Apartment Buildings with Basement Parking Needs",
        "Corporate Offices & Commercial Towers",
        "Retail Complexes & Shopping Centers",
        "Hospitals, Institutions & Educational Campuses",
        "High-Rise Buildings with Subterranean Parking Designs",
        "Private Garages & Showrooms with Elevated Display Requirements"
      ],
      technicalDetails: [
        "Underground hydraulic system with corrosion protection",
        "Waterproof control system for underground operation",
        "Enhanced safety features for confined space operation",
        "Easy access for maintenance and emergency situations",
        "Drainage system for water management",
        "Ventilation system for air circulation"
      ]
    },
    "ps-02-three-level": {
      name: "PS – 02 THREE LEVEL",
      description: "Unlock Underground Space with Pit Stacker Parking Systems. The Pit Stacker Car Parking System is a smart vertical parking solution designed to maximize parking capacity by utilizing underground space without compromising the surface-level aesthetics. Ideal for premium residential, commercial, and mixed-use developments, this system allows one or more vehicles to be parked in a concealed pit, leaving the ground level free for additional parking or open usage. Engineered for seamless integration into building designs, the Pit Stacker offers a perfect blend of space efficiency, convenience, and modern functionality.",
      image: "/assets/cars/imgi_13_PP-02_Parking_Lift_02.jpg",
      specifications: [
        { name: "Capacity", value: "3 cars" },
        { name: "Lift Type", value: "Hydraulic" },
        { name: "Installation", value: "Underground" },
        { name: "Space Efficiency", value: "92%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "Underground Installation",
          description: "Makes use of below-ground space to double or triple parking capacity",
          icon: "⛏️"
        },
        {
          title: "Discreet & Space-Saving",
          description: "Keeps the parked vehicle hidden, preserving surface area for other purposes",
          icon: "🎨"
        },
        {
          title: "Independent or Dependent Access",
          description: "Available in configurations to suit usage needs and access frequency",
          icon: "🔧"
        },
        {
          title: "Smooth Operation",
          description: "Operated via hydraulic or electro-mechanical systems with safety interlocks",
          icon: "⚡"
        },
        {
          title: "Custom Configurations",
          description: "Tailored depth, lifting height, and platform sizes to suit site requirements",
          icon: "⚙️"
        },
        {
          title: "Durable & Low Maintenance",
          description: "Constructed with corrosion-resistant components for long-term performance",
          icon: "🛡️"
        }
      ],
      applications: [
        "Luxury Residences & Villas with Limited Open Space",
        "Urban Apartment Buildings with Basement Parking Needs",
        "Corporate Offices & Commercial Towers",
        "Retail Complexes & Shopping Centers",
        "Hospitals, Institutions & Educational Campuses",
        "High-Rise Buildings with Subterranean Parking Designs",
        "Private Garages & Showrooms with Elevated Display Requirements"
      ],
      technicalDetails: [
        "Multi-level underground hydraulic system",
        "Advanced control system with remote monitoring",
        "Comprehensive safety features for underground operation",
        "Energy-efficient operation with smart controls",
        "Easy maintenance access and service points",
        "Integrated drainage and ventilation systems"
      ]
    },
    "s-cl-01-cantilever": {
      name: "S-CL-01 CANTILEVER",
      description: "Achieve Clean Design with Cantilever Parking Solutions. The Cantilever Parking System is a modern mechanical parking solution designed to offer elevated vehicle storage without the need for columns or support structures beneath. Using a cantilevered platform supported from one end, this system provides a clean, open space below—ideal for areas where ground access must be kept clear. Its minimal footprint, structural efficiency, and aesthetic appeal make it perfect for residential, commercial, and industrial applications. Whether you're dealing with a compact driveway, limited basement space, or a high-traffic commercial site, the Cantilever Parking System maximizes parking capacity without compromising accessibility or design.",
      image: "/assets/cars/imgi_29_cantilever.jpg",
      specifications: [
        { name: "Capacity", value: "2 cars" },
        { name: "Lift Type", value: "Hydraulic" },
        { name: "Installation", value: "Above ground" },
        { name: "Space Efficiency", value: "87%" },
        { name: "Power Requirement", value: "3 Phase, 415V" },
        { name: "Control System", value: "PLC Based" },
        { name: "Safety Features", value: "Emergency Stop, Overload Protection" },
        { name: "Operation Mode", value: "Fully Automatic" }
      ],
      features: [
        {
          title: "Column-Free Design",
          description: "Provides unobstructed space below the parked vehicle for ease of access or dual usage",
          icon: "🏗️"
        },
        {
          title: "Space-Efficient Layout",
          description: "Optimized for narrow or congested sites where traditional supports are impractical",
          icon: "📐"
        },
        {
          title: "Robust Structure",
          description: "Engineered with high-tensile materials for strength, durability, and load-bearing performance",
          icon: "🛡️"
        },
        {
          title: "Smooth Operation",
          description: "Available with hydraulic or mechanical lifting for reliable, easy vehicle movement",
          icon: "⚡"
        },
        {
          title: "Low Maintenance",
          description: "Built with corrosion-resistant components and a simplified mechanism for long-term use",
          icon: "🔧"
        },
        {
          title: "Architecturally Appealing",
          description: "Ideal for properties that require a clean, modern look with smart utility",
          icon: "🎨"
        }
      ],
      applications: [
        "Residential Homes & Villas with Compact Driveways",
        "Industrial Facilities & Warehouse Zones",
        "Showrooms & Service Centers Requiring Elevated Display Parking",
        "Urban Redevelopment Projects Needing Creative Parking Layouts"
      ],
      technicalDetails: [
        "Cantilever hydraulic system with balanced design",
        "Custom control system for specific requirements",
        "Enhanced safety features for cantilever operation",
        "Flexible installation options for various sites",
        "Easy maintenance and service access",
        "Robust construction for long-term reliability"
      ]
    }
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const productData = stackParkingProducts[slug as keyof typeof stackParkingProducts];
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
              <h1 className="text-4xl font-bold text-gray-800 mb-6">Smart Car Parking Solutions for Every Space</h1>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">{product.description}</p>
            </div>

            {/* Product Features Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Product Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {product.features.map((feature: ProductFeature, index: number) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-lg">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 text-lg">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Illustrative Images Section */}
            <div className="mb-16">
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={product.image}
                    alt={`${product.name} - Empty Structure`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded text-sm">
                    Empty Structure
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={product.image}
                    alt={`${product.name} - With Cars`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded text-sm">
                    With Cars
                  </div>
                </div>
              </div>
            </div>

            {/* Applications Section */}
            {product.applications && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Applications</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  {product.applications.map((application: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">{application}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Technical Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {product.specifications.map((spec: ProductSpecification, index: number) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="font-semibold text-gray-700 text-lg">{spec.name}</span>
                    <span className="text-gray-900 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Technical Details</h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {product.technicalDetails.map((detail: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">{detail}</p>
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
