import React, { useState, useEffect } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Food background images - replace with your actual images
  const foodImages = [
    {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1920&h=1080&fit=crop",
      title: "Authentic Wood-Fired Pizza",
      subtitle: "Crispy crust, fresh toppings, perfection in every bite",
    },
    {
      url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1920&h=1080&fit=crop",
      title: "Farm Fresh Salads",
      subtitle: "Healthy, vibrant, and bursting with natural flavors",
    },
    {
      url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1920&h=1080&fit=crop",
      title: "Gourmet Burgers",
      subtitle: "Juicy, tender, and crafted with premium ingredients",
    },
    {
      url: "https://images.unsplash.com/photo-1563379091339-03246963d629?w=1920&h=1080&fit=crop",
      title: "Authentic Italian Pasta",
      subtitle: "Traditional recipes with a modern twist",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [foodImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % foodImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + foodImages.length) % foodImages.length
    );
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Background Image Slider */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Images */}
        {foodImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Content Overlay */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              {/* Badge */}
              <div className="inline-block bg-orange-500 bg-opacity-90 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                ⭐ #1 Food Delivery Platform
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Welcome to
                <br />
                <span className="text-orange-400">BiteHub</span>
              </h1>

              {/* Dynamic subtitle based on current image */}
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 transition-all duration-1000">
                  {foodImages[currentSlide].title}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 transition-all duration-1000">
                  {foodImages[currentSlide].subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed">
                Experience culinary excellence delivered to your doorstep. From
                comfort classics to gourmet innovations, every meal is a journey
                of flavors.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a
                  href="/menu"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Order Now 🍽️
                </a>

                <a
                  href="/menu"
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-10 py-4 rounded-full text-lg font-semibold border-2 border-white border-opacity-50 transition-all duration-300 backdrop-blur-sm"
                >
                  View Menu 📋
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-orange-400">
                    5000+
                  </div>
                  <div className="text-sm text-gray-200">Happy Customers</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-orange-400">
                    4.9⭐
                  </div>
                  <div className="text-sm text-gray-200">Average Rating</div>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold text-orange-400">
                    25min
                  </div>
                  <div className="text-sm text-gray-200">Delivery Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {foodImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-orange-500 scale-125"
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-orange-500">BiteHub</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just delivering food - we're delivering experiences,
              quality, and satisfaction with every order.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6">👨‍🍳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expert Chefs
              </h3>
              <p className="text-gray-600">
                Master chefs with years of culinary expertise crafting every
                dish with passion and precision.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6">🚚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Quick and reliable delivery service ensuring your food arrives
                hot, fresh, and on time.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-6">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Only the finest, freshest ingredients make it to your plate.
                Quality you can taste in every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Satisfy Your Cravings? 🤤
          </h2>
          <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Join thousands of food lovers who trust BiteHub for their daily dose
            of deliciousness. Order now and taste the difference!
          </p>
          <a
            href="/menu"
            className="bg-white text-orange-500 px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 inline-block"
          >
            Start Your Food Journey 🚀
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
