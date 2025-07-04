import React, { useState, useEffect } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const foodImages = [
    {
      url: "/src/assets/Burger.jpg",
      title: "Delicious Gourmet Burgers",
      subtitle: "Juicy, tender , and crafted with premium ingredients",
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
    <div className="bg-white">
      <section className="relative min-h-screen overflow-hidden">
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
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full z-30"
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
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full z-30"
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

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full text-center text-white">
            <div className="inline-block bg-orange-600 px-6 py-2 rounded-full text-sm font-medium mb-6">
              🚀 Fast. Fresh. BiteHub.
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
              Taste the <span className="text-orange-500">Revolution</span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-light mb-4">
              {foodImages[currentSlide].title}
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              {foodImages[currentSlide].subtitle}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/menu"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
              >
                Order Now
              </a>

              <a
                href="/about"
                className="bg-white/10 border border-white/20 text-white py-3 px-6 rounded-full hover:bg-white/20 backdrop-blur-md transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {foodImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide
                  ? "bg-orange-400 scale-125"
                  : "bg-white/40 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-white text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Why <span className="text-orange-500">BiteHub</span>?
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          We deliver more than food. We deliver experiences.
        </p>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="p-6 bg-orange-50 rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-2">
            <div className="text-4xl mb-4">👨‍🍳</div>
            <h3 className="font-semibold text-xl mb-2">Top Chefs</h3>
            <p className="text-gray-600">
              World-class chefs crafting unforgettable meals.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-2">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-semibold text-xl mb-2">Speedy Delivery</h3>
            <p className="text-gray-600">
              Hot meals at your doorstep in under 30 minutes.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-2xl shadow hover:shadow-xl transition-transform hover:-translate-y-2">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="font-semibold text-xl mb-2">Fresh Ingredients</h3>
            <p className="text-gray-600">
              Every bite made from the freshest farm-picked produce.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
            Craving Something Delicious?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of happy foodies. Your favorite dish is just a click
            away.
          </p>
          <a
            href="/menu"
            className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            Explore Our Menu 🍽️
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
