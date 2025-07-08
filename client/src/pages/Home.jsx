import React, { useState, useEffect } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const foodImages = [
    {
      url: "/src/assets/Burger.jpg",
      title: "Delicious Gourmet Burgers",
      subtitle: "Juicy, tender, and crafted with premium ingredients",
    },
    {
      url: "/src/assets/ChickenBiryani..jpg",
      title: "Hyderabadi Chicken Biryani",
      subtitle: "A royal recipe layered with love, spices, and basmati rice",
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
    <div className="bg-gradient-to-br from-orange-50 via-peach-50 to-orange-100 min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-peach-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-2xl font-bold text-white drop-shadow-lg">
                BiteHub
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#menu"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Menu
              </a>
              <a
                href="#about"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                About
              </a>
              <button className="bg-gradient-to-r from-orange-500 to-peach-500 text-white px-6 py-2 rounded-full font-medium hover:from-orange-600 hover:to-peach-600 transition-all transform hover:scale-105 shadow-lg">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen overflow-hidden">
        {foodImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/70 via-peach-900/60 to-orange-900/70"></div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full z-30 backdrop-blur-sm transition-all hover:scale-110"
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
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full z-30 backdrop-blur-sm transition-all hover:scale-110"
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

        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full text-center text-white">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-peach-500/20 backdrop-blur-sm border border-white/20 px-8 py-3 rounded-full text-sm font-medium mb-8">
              <span className="mr-2">🚀</span>
              <span>Fast. Fresh. BiteHub.</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent drop-shadow-2xl">
              Taste the{" "}
              <span className="bg-gradient-to-r from-orange-300 to-peach-300 bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>

            <h2 className="text-3xl md:text-4xl font-light mb-4 text-orange-100">
              {foodImages[currentSlide].title}
            </h2>
            <p className="text-xl text-orange-100/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              {foodImages[currentSlide].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href="/menu"
                className="bg-gradient-to-r from-orange-500 to-peach-500 hover:from-orange-600 hover:to-peach-600 text-white font-bold py-4 px-10 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Order Now
              </a>
              <a
                href="/about"
                className="bg-white/10 border-2 border-white/30 text-white py-4 px-10 rounded-full hover:bg-white/20 backdrop-blur-md transition-all duration-300 font-medium"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {foodImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-orange-400 scale-125 shadow-lg"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-orange-50 to-peach-50 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-flex items-center bg-orange-100 text-orange-600 px-6 py-2 rounded-full mb-8">
            <span className="text-sm font-semibold">Why Choose BiteHub?</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            We deliver more than food
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            We deliver experiences that make every bite unforgettable
          </p>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="group p-10 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-peach-400 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                👨‍🍳
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">
                Top Chefs
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                World-class chefs crafting unforgettable meals with passion and
                precision
              </p>
            </div>

            <div className="group p-10 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-peach-100">
              <div className="w-20 h-20 bg-gradient-to-r from-peach-400 to-orange-400 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                ⚡
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">
                Speedy Delivery
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Hot meals at your doorstep in under 30 minutes, guaranteed fresh
              </p>
            </div>

            <div className="group p-10 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-peach-400 rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                🌱
              </div>
              <h3 className="font-bold text-2xl mb-4 text-gray-900">
                Fresh Ingredients
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Every bite made from the freshest farm-picked produce and
                quality ingredients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 via-peach-500 to-orange-600 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
            Craving Something Delicious?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of happy foodies. Your favorite dish is just a click
            away.
          </p>
          <a
            href="/menu"
            className="inline-flex items-center bg-white text-orange-600 font-bold py-4 px-10 rounded-full shadow-xl hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 text-lg"
          >
            <span>Explore Our Menu</span>
            <span className="ml-2">🍽️</span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
