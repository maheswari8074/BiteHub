import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react"; // You can use HeroIcons or any SVG if you prefer

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#111] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo & Title */}
          <div className="flex items-center justify-center space-x-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🍽️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">BiteHub</h3>
              <p className="text-xs text-gray-400">Culinary Excellence</p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Where every bite tells a story of passion, quality, and culinary
            mastery. Thank you for choosing BiteHub for your dining experience.
          </p>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link
              to="/menu"
              className="hover:text-orange-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="hover:text-orange-500 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/support"
              className="hover:text-orange-500 transition-colors"
            >
              Support
            </Link>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-gray-500 text-xs sm:text-sm">
            © 2025 BiteHub. All rights reserved. Made with ❤️ for food lovers
            everywhere.
          </div>
        </div>
      </div>

      {/* Scroll To Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 animate-bounce z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
