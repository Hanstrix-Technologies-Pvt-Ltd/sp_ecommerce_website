"use client";
import React, { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import Header from "@/components/Header";
import LoadingBar from "@/components/LoadingBar";

export default function ClientsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);



  // Array of actual client image filenames
  const clientImages = [
    "imgi_9_1.png",
    "imgi_10_2.png",
    "imgi_11_3-1.png",
    "imgi_12_4-1.png",
    "imgi_13_5-1.png",
    "imgi_14_6-1.png",
    "imgi_15_7-1.png",
    "imgi_16_ARAGEN.png",
    "imgi_17_BRIGADE.png",
    "imgi_18_CMR.png",
    "imgi_19_CONCORDE.png",
    "imgi_20_DIVYA-SREE.png",
    "imgi_21_DMART.png",
    "imgi_22_DURGA.png",
    "imgi_23_ESIC.png",
    "imgi_24_GAR-INFOBAHN.png",
    "imgi_25_GINGER.png",
    "imgi_26_INDIQUBE.png",
    "imgi_27_KALYANI.png",
    "imgi_28_LOHIA-JAIN.png",
    "imgi_29_MAAVI.png",
    "imgi_30_NANIK-GROUP.png",
    "imgi_31_PAVANI-GROUP.png",
    "imgi_32_PHOENIX.png",
    "imgi_33_SALARPURIA-SATTVA.png",
    "imgi_34_SAPRA.png",
    "imgi_35_SHRIRAM.png",
    "imgi_36_SKAV.png",
    "imgi_37_SUPREME.png",
    "imgi_38_SWOJAS.png",
    "imgi_39_TAKSH.png",
    "imgi_40_USHODAYA.png",
    "imgi_41_VAISHNAVI.png"
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      position: "Facility Manager",
      company: "Tata Group",
      content:
        "Stelz's STACKPARK solution has revolutionized our parking management. The system is reliable, efficient, and has significantly improved our space utilization.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      position: "Operations Director",
      company: "Infosys",
      content:
        "The PUZZLEPARK installation at our campus has exceeded our expectations. The automated system has reduced parking time and improved user experience.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      position: "Project Manager",
      company: "L&T Construction",
      content:
        "Working with Stelz was a seamless experience. Their technical expertise and professional approach made our ASSISTPARK project a success.",
      rating: 5,
    },
  ];

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <div className="min-h-screen bg-white">
        <Header />

        {/* Breadcrumbs */}
        <div className="pt-20">
          <BreadcrumbNav currentPage="Clients" />
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-1 h-12 bg-blue-600 mr-4"></div>
              <h1 className="text-4xl font-bold text-black">CLIENTS</h1>
            </div>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Partners Who Trust Stelz
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We take pride in collaborating with industry leaders who trust Stelz Parking for innovative and reliable car parking solutions. Our partnerships reflect a shared commitment to quality, efficiency, and long-term value across every project.
              </p>
            </div>
          </div>

          {/* Client Statistics */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Cities Served</div>
              </div>
              <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">25,000+</div>
                <div className="text-blue-100">Parking Spaces</div>
              </div>
              <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-blue-100">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Client Portfolio */}
          <div className="max-w-7xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
              Our Client Portfolio
            </h2>
                                                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {clientImages.map((filename, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 p-4"
                  >
                    <div className="aspect-square flex items-center justify-center">
                      <img  
                        src={`/assets/clients/${filename}`}
                        alt={`Client ${index + 1}`}
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-full h-full bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Client {index + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
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
