"use client";

import { useState } from "react";
import LoadingBar from "./LoadingBar";

export default function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("office");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      alert("Message sent successfully!");
    }, 2000);
  };

  const addresses = {
    office: {
      title: "OFFICE ADDRESS",
      address: [
        "No. 1595, 2nd Floor, 5th Stage,",
        "BEML Layout, Manipal Hospital Road,",
        "Rajarajeshwari Nagara,",
        "Bangalore 560098",
      ],
      phone: "+91 7045563737",
      email: "info@Stelz.com",
    },
    factory: {
      title: "FACTORY ADDRESS",
      address: [
        "Sy. No. 56/2, Mrs Rama and Sri.M.Ramakrishnappa Layout,",
        "Kere Road, Dasanapura Hobli,",
        "Machohalli Village,",
        "Bengaluru 560091",
      ],
      phone: "+91 7045563737",
      email: "info@Stelz.com",
    },
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <section className="py-16 bg-gray-50" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Address Section */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                <span className="border-l-4 border-blue-600 pl-4">Address</span>
              </h2>

              {/* Location Tabs */}
              <nav aria-label="Office locations">
                <div className="flex flex-wrap gap-2 mb-8" role="tablist">
                  <button
                    className={`px-4 py-2 rounded transition-colors focus:ring-2 focus:ring-blue-300 ${
                      activeTab === "office"
                        ? "bg-gradient-blue text-white shadow-blue"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    role="tab"
                    aria-selected={activeTab === "office"}
                    aria-controls="address-info"
                    onClick={() => setActiveTab("office")}
                  >
                    OFFICE ADDRESS
                  </button>
                  <button
                    className={`px-4 py-2 rounded transition-colors focus:ring-2 focus:ring-blue-300 ${
                      activeTab === "factory"
                        ? "bg-gradient-blue text-white shadow-blue"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    role="tab"
                    aria-selected={activeTab === "factory"}
                    aria-controls="address-info"
                    onClick={() => setActiveTab("factory")}
                  >
                    FACTORY ADDRESS
                  </button>
                </div>
              </nav>

              {/* Address Details */}
              <div
                className="space-y-4 text-gray-800"
                id="address-info"
                role="tabpanel"
              >
                <h3 className="font-bold text-blue-600 text-lg">
                  {addresses[activeTab as keyof typeof addresses].title}
                </h3>
                <address className="not-italic text-base leading-relaxed">
                  {addresses[activeTab as keyof typeof addresses].address.map(
                    (line, index) => (
                      <p key={index}>{line}</p>
                    )
                  )}
                </address>

                <div className="pt-4 space-y-2">
                  <p className="text-base">
                    <span className="font-semibold">Phone:</span>
                    <a
                      href={`tel:${addresses[
                        activeTab as keyof typeof addresses
                      ].phone.replace(/\s/g, "")}`}
                      className="text-blue-600 hover:underline ml-1"
                    >
                      {addresses[activeTab as keyof typeof addresses].phone}
                    </a>
                  </p>
                  <p className="text-base">
                    <span className="font-semibold">Email:</span>
                    <a
                      href={`mailto:${
                        addresses[activeTab as keyof typeof addresses].email
                      }`}
                      className="text-blue-600 hover:underline ml-1"
                    >
                      {addresses[activeTab as keyof typeof addresses].email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                <span className="border-l-4 border-blue-600 pl-4">Write</span>{" "}
                <span className="text-blue-600">To Us</span>
              </h2>

              <form className="space-y-6" noValidate onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-base font-semibold text-gray-800 mb-2"
                  >
                    FULL NAME *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-base font-semibold text-gray-800 mb-2"
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-base font-semibold text-gray-800 mb-2"
                  >
                    PHONE NUMBER *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-base font-semibold text-gray-800 mb-2"
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message here..."
                    rows={4}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 text-base resize-vertical"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-blue text-white px-8 py-4 rounded shadow-blue hover:shadow-lg transition-all duration-300 font-semibold text-lg focus:ring-2 focus:ring-blue-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
