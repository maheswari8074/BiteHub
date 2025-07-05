// pages/About.jsx
import React from "react";

const About = () => {
  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Our Culinary Story
          </h2>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Founded in 2020 by a team of passionate food enthusiasts, BiteHub
            was born from a simple belief: everyone deserves restaurant-quality
            meals, delivered fast.
          </p>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Our award-winning chefs blend traditional techniques with modern
            innovation to deliver dishes that taste incredible and look
            stunning.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">500+</div>
              <div className="text-gray-600">Signature Dishes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">15+</div>
              <div className="text-gray-600">Expert Chefs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">24/7</div>
              <div className="text-gray-600">Service</div>
            </div>
          </div>

          <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors font-medium">
            Learn More About Us
          </button>
        </div>

        <div className="rounded-3xl shadow-xl h-96 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <p className="text-lg font-medium">Chef in Action</p>
            <p className="text-sm">Add your custom image here</p>
            <p className="text-sm">(Recommended: 800x600px)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
