"use client";
import React from "react";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import LoadingBar from "./LoadingBar";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMenuToggle = () => {
    if (!isMenuOpen) {
      setIsLoading(true);
      setTimeout(() => {
        setIsMenuOpen(true);
        setIsLoading(false);
      }, 300);
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <LoadingBar isLoading={isLoading} />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              {/* <Link
                href="/"
                className="text-2xl font-bold"
                aria-label="Stelz Home"
              >
                <span className="text-blue-600">STELZ</span>
                <div className="text-sm text-gray-800 uppercase tracking-wide font-medium">
                  CAR PARKING SYSTEMS
                </div>
              </Link> */}
              <a href="/" onClick={() => setIsLoading(true)}>
                <img
                  src="/assets/Stelz-logo.jpg"
                  alt="Maintenance Services"
                  width={120}
                  height={260}
                  className="cursor-pointer"
                />
              </a>

            </div>

            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-800">
                <span aria-hidden="true"><Phone size={16} /></span>
                <a
                  href="tel:+917045563737"
                  className="font-medium hover:text-blue-600 transition-colors"
                >
                  +91 7045563737
                </a>
              </div>

              {/* Social Media Icons */}
              <nav aria-label="Social media links">
                <ul className="flex items-center space-x-2">
                  <li>
                    <button
                      className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-gradient-blue transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      aria-label="Facebook"
                    >
                      <Facebook size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-gradient-blue transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      aria-label="Instagram"
                    >
                      <Instagram size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-gradient-blue transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-gradient-blue transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      aria-label="Email"
                    >
                      <Mail size={16} />
                    </button>
                  </li>
                </ul>
              </nav>

              {/* Menu Button */}
              <button
                onClick={handleMenuToggle}
                className="flex flex-col space-y-1 p-2 focus:ring-2 focus:ring-blue-500 rounded relative z-10"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                type="button"
              >
                <span className="w-6 h-0.5 bg-gray-800 transition-all duration-300"></span>
                <span className="w-6 h-0.5 bg-gray-800 transition-all duration-300"></span>
                <span className="w-6 h-0.5 bg-gray-800 transition-all duration-300"></span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden flex flex-col space-y-1 p-2 focus:ring-2 focus:ring-blue-500 rounded relative z-10"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              type="button"
            >
              <span className="w-6 h-0.5 bg-gray-800 transition-all duration-300"></span>
              <span className="w-6 h-0.5 bg-gray-800 transition-all duration-300"></span>
              <span className="w-6 h-0.5 bg-gray-800 transition-all duration-300"></span>
            </button>
          </div>
        </div>

        {/* Menu Overlay Component */}
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        {/* WhatsApp Floating Button */}
        {/* <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/917045563737"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 flex items-center space-x-2 focus:ring-2 focus:ring-green-300"
          aria-label="Contact us on WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true" className="text-xl">
            💬
          </span>
          <span className="hidden sm:block text-sm font-medium">
            +91-7045563737
          </span>
        </a>
      </div> */}
      </header>
    </>
  );
}
