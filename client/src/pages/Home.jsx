import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [user, setUser] = useState(null);

  const foodImages = [
    {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1920&h=1080&fit=crop",
      title: "Authentic Italian Pasta",
      subtitle: "Traditional recipes crafted with passion since 1990",
      description: "Hand-rolled pasta with our signature marinara sauce",
    },
    {
      url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1920&h=1080&fit=crop",
      title: "Gourmet Burgers",
      subtitle: "Premium beef patties with artisanal ingredients",
      description: "Juicy, tender, and crafted with love",
    },
    {
      url: "https://images.unsplash.com/photo-1563379091339-03246963d629?w=1920&h=1080&fit=crop",
      title: "Wood-Fired Pizza",
      subtitle: "Crispy crust with fresh mozzarella and basil",
      description: "Baked to perfection in our traditional oven",
    },
    {
      url: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=1920&h=1080&fit=crop",
      title: "Hyderabadi Biryani",
      subtitle: "A royal feast of aromatic basmati and tender meat",
      description: "Layered with love and traditional spices",
    },
  ];

  useEffect(() => {
    // Mock user data
    const mockUser = { name: "John Doe" };
    setUser(mockUser);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % foodImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + foodImages.length) % foodImages.length
    );
  };

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen pt-24">
        {/* Background Carousel */}
        {foodImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 z-30"
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
              strokeWidth={1}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 z-30"
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
              strokeWidth={1}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Text Content */}
        <div className="relative z-20 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-7xl md:text-8xl font-light text-white mb-6 tracking-wider leading-tight">
              <span className="block text-5xl md:text-6xl font-thin italic text-amber-200 mb-4">
                {foodImages[currentSlide].title.toLowerCase()}
              </span>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />
            <p className="text-xl md:text-2xl text-white/90 font-light tracking-wider mb-4 uppercase">
              {foodImages[currentSlide].subtitle}
            </p>
            <p className="text-lg text-amber-200/80 font-light italic mb-12">
              {foodImages[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a
                href="/menu"
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 font-medium tracking-wider uppercase text-sm"
              >
                View Menu
              </a>
              <a
                href="/reservation"
                className="border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 font-medium tracking-wider uppercase text-sm"
              >
                Make Reservation
              </a>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {foodImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-amber-400 scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-wider">
              <span className="italic text-amber-200">Why choose</span> BiteHub
            </h3>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8" />
            <p className="text-xl text-white/70 font-light tracking-wide">
              Creating memorable dining experiences since 1990
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: "👨‍🍳",
                title: "Master Chefs",
                description:
                  "Our culinary artists bring years of experience and passion to every dish they create.",
              },
              {
                icon: "🌿",
                title: "Fresh Ingredients",
                description:
                  "We source only the finest, locally-grown ingredients for authentic flavors.",
              },
              {
                icon: "⭐",
                title: "Premium Quality",
                description:
                  "Every meal is crafted with meticulous attention to detail and presentation.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-light text-white mb-4 tracking-wider">
                  {feature.title}
                </h4>
                <p className="text-white/70 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-b from-gray-900 via-gray-950 to-black py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-light text-white mb-4">
            <span className="italic text-orange-400">Ready to indulge?</span>
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Experience the finest culinary journey with{" "}
            <span className="text-orange-300 font-medium">BiteHub</span>.
          </p>
          <a
            href="/menu"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-sm uppercase tracking-wider transition duration-300 shadow-md"
          >
            Order Now →
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
