import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = ({ cart = [] }) => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  // Apply/remove dark mode class on <html>
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 dark:bg-gray-900/70 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-wider">
                BiteHub
              </h1>
              <p className="text-xs text-amber-200 uppercase tracking-widest">
                Culinary Excellence
              </p>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center space-x-12">
            {["HOME", "MENU", "ABOUT", "CONTACT"].map((item) => (
              <Link
                key={item}
                to={item === "HOME" ? "/" : `/${item.toLowerCase()}`}
                className="text-white/90 hover:text-amber-400 transition-colors duration-300 text-sm font-medium tracking-widest relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Cart + User + Dark Mode */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            {user && (
              <Link
                to="/cart"
                className="relative text-white hover:text-amber-400 transition"
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-white hover:text-yellow-400 transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User / Login */}
            {user ? (
              <div className="relative group">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
                  {getInitial(user.name)}
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-white hover:bg-amber-600/20"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-white hover:bg-amber-600/20"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-amber-600/20"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2 rounded-full hover:from-amber-700 hover:to-orange-700 font-medium transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
