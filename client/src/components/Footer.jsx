import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🍽️</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">BiteHub</h3>
              <p className="text-xs text-gray-400">Culinary Excellence</p>
            </div>
          </div>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Where every bite tells a story of passion, quality, and culinary
            mastery. Thank you for choosing BiteHub for your dining experience.
          </p>

          <div className="flex justify-center space-x-8 mb-8 text-gray-400">
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Careers
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Support
            </a>
          </div>

          <div className="border-t border-gray-800 pt-8 text-gray-500 text-sm">
            © 2025 BiteHub. All rights reserved. Made with ❤️ for food lovers
            everywhere.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
