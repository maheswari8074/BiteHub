import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">🍽️</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">BiteHub</h1>
            <p className="text-xs text-gray-500">Culinary Excellence</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/menu"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Menu
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-orange-600 font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 font-medium transition-colors"
        >
          Login
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
