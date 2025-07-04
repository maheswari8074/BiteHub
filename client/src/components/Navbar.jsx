import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

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

        {/* Nav Links (always visible except login/signup) */}
        <nav className="hidden md:flex items-center space-x-8">
          {["home", "menu", "about", "contact"].map((page) => (
            <Link
              key={page}
              to={`/${page === "home" ? "" : page}`}
              className="relative font-medium text-gray-700 transition-all duration-200 hover:text-orange-600 hover:font-semibold group"
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
              <span className="absolute left-0 bottom-[-2px] w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              {/* Avatar Button */}
              <div
                tabIndex={0}
                className="peer w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer"
              >
                {getInitial(user.name)}
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 opacity-0 peer-hover:opacity-100 hover:opacity-100 transition-opacity duration-200 z-50">
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  🏠 Home
                </Link>
                <Link
                  to="/menu"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  📋 Menu
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  📖 About
                </Link>
                <Link
                  to="/contact"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  📞 Contact
                </Link>

                <hr className="my-2" />

                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  📊 Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  👤 Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 font-medium transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
