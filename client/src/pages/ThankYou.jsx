import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 py-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-amber-400">🎉 Thank You!</h1>
        <p className="text-lg text-gray-300">
          Your order has been placed successfully.
        </p>
        <Link
          to="/menu"
          className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-3 rounded-full text-white font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-300"
        >
          Order More Deliciousness 🍔
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
