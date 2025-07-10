import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronUp } from "lucide-react";

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
    <footer className="relative bg-gradient-to-t from-black to-gray-900 text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">🍽️</span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold">BiteHub</h3>
            <p className="text-xs text-gray-400">Culinary Excellence</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base mb-6">
          Where every bite tells a story of passion, quality, and culinary
          mastery. Thank you for choosing{" "}
          <span className="text-orange-500 font-medium">BiteHub</span> for your
          dining experience.
        </p>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-6">
          {["/", "/menu", "/about", "/contact", "/support"].map((path, i) => (
            <Link
              key={path}
              to={path}
              className="hover:text-orange-500 transition-all duration-200"
            >
              {["Home", "Menu", "About", "Contact", "Support"][i]}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="w-1/2 mx-auto h-px bg-gray-800 mb-4" />

        {/* Copyright */}
        <div className="text-gray-500 text-xs sm:text-sm">
          © 2025 BiteHub. All rights reserved. Made with{" "}
          <span className="text-pink-400">❤️</span> for food lovers everywhere.
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
