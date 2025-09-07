"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  // Partner images data
  const partnerImages = [
    { src: "/assets/about/7-1.png", alt: "7-1" },
    { src: "/assets/about/ARAGEN.png", alt: "Aragen" },
    { src: "/assets/about/BRIGADE.png", alt: "Brigade" },
    { src: "/assets/about/bhartiya.png", alt: "Bhartiya City" },
    { src: "/assets/about/CMR.png", alt: "CMR" },
    { src: "/assets/about/CONCORDE.png", alt: "Concorde" },
    { src: "/assets/about/confident.png", alt: "Confident" },
    { src: "/assets/about/DMART.png", alt: "DMart" },
    { src: "/assets/about/DURGA.png", alt: "Durga" },
    { src: "/assets/about/ESIC.png", alt: "ESIC" },
    { src: "/assets/about/GAR-INFOBAHN.png", alt: "Gar Infobahn" },
    { src: "/assets/about/GINGER.png", alt: "Ginger" },
    { src: "/assets/about/KALYANI.png", alt: "Kalyani" },
    { src: "/assets/about/LOHIA-JAIN.png", alt: "Lohia Jain" },
    { src: "/assets/about/MAAVI.png", alt: "Maavi" },
    { src: "/assets/about/manipal.png", alt: "Manipal" },
    { src: "/assets/about/NANIK-GROUP.png", alt: "Nanik Group" },
    { src: "/assets/about/PAVANI-GROUP.png", alt: "Pavani Group" },
    { src: "/assets/about/PHOENIX.png", alt: "Phoenix" },
    { src: "/assets/about/puravankara.png", alt: "Puravankara" },
    { src: "/assets/about/SALARPURIA-SATTVA.png", alt: "Salarpuria Sattva" },
    { src: "/assets/about/SAPRA.png", alt: "Sapra" },
    { src: "/assets/about/SHRIRAM.png", alt: "Shriram" },
    { src: "/assets/about/SKAV.png", alt: "SKAV" },
    { src: "/assets/about/sparsh.png", alt: "Sparsh Hospital" },
    { src: "/assets/about/SUPREME.png", alt: "Supreme" },
    { src: "/assets/about/SWOJAS.png", alt: "Swojas" },
    { src: "/assets/about/TAKSH.png", alt: "Taksh" },
    { src: "/assets/about/VAISHNAVI.png", alt: "Vaishnavi" },
    { src: "/assets/about/vamsiram.png", alt: "Vamsiram" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="About Us" />
        </div>

        {/* Hero Image Section */}
        <div className="w-full h-96 bg-gray-800 relative overflow-hidden">
          {/* Placeholder for industrial workers image */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-lg">Industrial Workers Working on Car Parking System</p>
              <p className="text-sm text-gray-300 mt-2">Mechanical system installation and maintenance</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="container mx-auto px-4 py-16">
          {/* Page Title */}
          <div className="mb-12">
            <div className="flex items-center">
              <div className="w-2 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">ABOUT US</h1>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Stelz Parking Systems</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Stelz Parking Systems, based in Bengaluru, specializes in the design, engineering, and manufacturing of mechanical car parking solutions. Focused on innovation, quality, and space optimization, we deliver customized systems for urban infrastructure needs.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Backed by a skilled team, Stelz provides efficient, safe, and reliable solutions for residential, commercial, and institutional projects—ensuring end-to-end support and trusted performance across every installation.
              </p>
            </div>

          {/* Tabbed Navigation */}
          <div className="max-w-6xl mx-auto">
            <div className="flex space-x-1 mb-12 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("about")}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "about" 
                    ? "bg-white text-blue-600 shadow-sm border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab("vision")}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "vision" 
                    ? "bg-white text-blue-600 shadow-sm border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                Our Vision
              </button>
              <button
                onClick={() => setActiveTab("mission")}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "mission" 
                    ? "bg-white text-blue-600 shadow-sm border-b-2 border-blue-600" 
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                  Our Mission
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "about" && (
              <div className="space-y-16">
                {/* Revolutionizing Urban Parking Solutions */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">Revolutionizing Urban Parking Solutions</h2>
                  <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                    STELZ Parking stands at the forefront of India's mechanical car parking industry, delivering innovative, space-efficient solutions that address the evolving challenges of urban mobility. We have established a robust national presence, transforming the parking landscape across metropolitan cities and emerging urban centers throughout India.
                  </p>
                </div>

                {/* Our Expertise */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Expertise</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    As premier specialists in advanced Mechanical Car Parking Systems, we offer comprehensive end-to-end solutions encompassing:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Design & Engineering:</span>
                        <span className="text-gray-700"> Creating customized parking solutions tailored to unique spatial requirements and architectural constraints</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Manufacturing:</span>
                        <span className="text-gray-700"> Producing high-quality, reliable systems with precision engineering and superior materials</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Installation:</span>
                        <span className="text-gray-700"> Expert deployment with minimal disruption to surrounding environments</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Testing & Commissioning:</span>
                        <span className="text-gray-700"> Rigorous quality assurance to ensure optimal performance</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Maintenance:</span>
                        <span className="text-gray-700"> Proactive service programs that maximize system longevity and operational efficiency</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Our Commitment */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Commitment</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    At STELZ Parking, we are driven by an unwavering commitment to excellence in every aspect of our operations:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Innovation:</span>
                        <span className="text-gray-700"> Continuously developing cutting-edge technologies that set new industry standards</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Quality:</span>
                        <span className="text-gray-700"> Maintaining rigorous quality control processes throughout design, manufacturing, and installation</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Reliability:</span>
                        <span className="text-gray-700"> Building systems that perform consistently with minimal downtime</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Sustainability:</span>
                        <span className="text-gray-700"> Creating parking solutions that reduce environmental impact through efficient space utilization</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Modernization:</span>
                        <span className="text-gray-700"> The concept of modernization defines, enhancement of existing applications or their migration from traditional architecture to the latest one. This change makes technological advance in every aspect of system that means integration of new functionalities. The Implementation of modernization gives big boost in many areas.</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Customer Satisfaction:</span>
                        <span className="text-gray-700"> Delivering personalized service that exceeds expectations</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Our Impact */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Impact</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Our advanced parking systems deliver tangible benefits that extend beyond simple vehicle storage:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Space Optimization:</span>
                        <span className="text-gray-700"> Maximizing parking capacity in limited urban spaces</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Enhanced Property Value:</span>
                        <span className="text-gray-700"> Adding premium amenities to residential and commercial developments</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Urban Beautification:</span>
                        <span className="text-gray-700"> Reducing street congestion and improving cityscapes</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Environmental Benefits:</span>
                        <span className="text-gray-700"> Minimizing emissions through reduced vehicle circulation</span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">Safety & Security:</span>
                        <span className="text-gray-700"> Providing protected environments for vehicle storage</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="space-y-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  At STELZ Parking, we envision a future where urban mobility transcends traditional constraints, driven by intelligent mechanical parking systems that harmonize efficiency, sustainability, and human-centric design. As cities across India grapple with rapid urbanization and space scarcity, our goal is to redefine parking infrastructure by pioneering solutions that set global benchmarks in innovation, reliability, and environmental stewardship. We strive to be the catalyst for smarter cities, where seamless parking experiences reduce congestion, lower carbon emissions, and elevate the quality of urban life.
                </p>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Strategic Growth & Industry Leadership</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our ambition extends beyond technological advancement—we aim to solidify our position as India's most trusted partner for transformative parking solutions. Through strategic collaborations with urban planners, architects, and municipal authorities, we will expand our national footprint, delivering scalable systems tailored to diverse urban landscapes. By investing in R&D and adopting emerging technologies like AI-driven automation and IoT-enabled analytics, we ensure our offerings evolve in lockstep with the dynamic needs of modern cities. Every project we undertake is a step toward our broader mission: enabling cities to grow vertically, sustainably, and inclusively.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Commitment to Excellence & Sustainability</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At the heart of our vision lies an unwavering commitment to excellence. We prioritize precision engineering, using eco-conscious materials and energy-efficient processes to deliver systems that minimize operational costs and environmental impact. By adhering to global quality standards and fostering a culture of continuous improvement, we ensure our solutions remain cost-effective, durable, and adaptable to future urban challenges. Through this ethos, STELZ Parking aspires to empower communities, enhance property value, and contribute to a greener, more livable India—one innovative parking system at a time.
                </p>
              </div>
            )}
            </div>

          {/* Why Stelz Parking Systems Section */}
          <div className="bg-blue-900 text-white py-16 px-8 rounded-lg my-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-6">
                <span className="text-blue-300">Why Stelz</span> Parking Systems
              </h2>
              <p className="text-center text-lg mb-12 max-w-4xl mx-auto">
                At Stelz, we go beyond just building parking systems — we create smart, space-efficient, and future-ready solutions tailored to modern infrastructure needs. Here's why clients across India trust us:
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 01 */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl font-bold text-gray-300">01</div>
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Customized Engineering</h3>
                      <p className="text-sm text-gray-600">Every system is designed to fit your site's unique layout, usage requirements, and space constraints.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 02 */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl font-bold text-gray-300">02</div>
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">End-to-End Solutions</h3>
                      <p className="text-sm text-gray-600">From design and manufacturing to installation and support, we offer complete in-house expertise.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 03 */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl font-bold text-gray-300">03</div>
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">High Volume, High Trust</h3>
                      <p className="text-sm text-gray-600">With over 12,000 systems installed annually, our scale reflects our reliability and customer satisfaction.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 04 */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl font-bold text-gray-300">04</div>
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 10c-3.03 0-5.649-.5-8.196-1.43A2 2 0 012 6V4a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Innovative R&D Focus</h3>
                      <p className="text-sm text-gray-600">Continuous investment in research and development ensures cutting-edge technology and long-term performance.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 05 */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl font-bold text-gray-300">05</div>
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Cost-Effective Efficiency</h3>
                      <p className="text-sm text-gray-600">Our mechanical systems deliver optimal functionality while keeping costs low, offering excellent value.</p>
                    </div>
                  </div>
                </div>

                {/* Feature 06 */}
                <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl font-bold text-gray-300">06</div>
                    <div className="flex-1">
                      <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
                      <p className="text-sm text-gray-600">Trusted by top developers and institutions, our installations span across residential, commercial, and industrial sectors.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="text-center mb-16">
            <div className="text-sm text-gray-500 mb-2">PARTNERS</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Partners Who Trust Stelz</h2>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12">
            We take pride in collaborating with industry leaders who trust Stelz Parking for innovative and reliable car parking solutions. Our partnerships reflect a shared commitment to quality, efficiency, and long-term value across every project.
            </p>
            
            {/* Image Carousel Container - Same as Services Page */}
            <div className="relative overflow-hidden">
              <div className="flex animate-partner-scroll" style={{ width: 'max-content' }}>
                {/* First set of images */}
                <div className="flex items-center space-x-8 flex-shrink-0">
                  {partnerImages.map((image, index) => (
                    <div key={index} className="relative w-80 h-48 rounded-lg overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Duplicate set for seamless scrolling */}
                <div className="flex items-center space-x-8 flex-shrink-0 ml-8">
                  {partnerImages.map((image, index) => (
                    <div key={`duplicate-${index}`} className="relative w-80 h-48 rounded-lg overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
