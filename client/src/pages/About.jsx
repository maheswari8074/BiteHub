import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#111] to-gray-900 text-white pt-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light tracking-wide mb-4">
            Our <span className="italic text-amber-400">Culinary Story</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-6"></div>
          <p className="text-lg text-white/70 font-light max-w-3xl mx-auto">
            Discover the passion, philosophy, and people behind BiteHub — where
            food isn't just served, it's celebrated.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <h3 className="text-3xl font-light text-amber-300 tracking-wider">
              Founded in 2020
            </h3>
            <p className="text-white/80 text-lg leading-relaxed">
              BiteHub was born from a simple belief: everyone deserves
              restaurant-quality meals, delivered fast. Our team of passionate
              chefs, tech innovators, and foodies work together to make that a
              reality.
            </p>
            <p className="text-white/70">
              Our award-winning chefs blend traditional techniques with modern
              flavors to create unforgettable meals. Whether it’s a quick lunch
              or a fine dinner, we deliver more than just food — we deliver an
              experience.
            </p>
          </div>

          {/* Chef Image / Emoji */}
          <div className="flex justify-center md:justify-end">
            <div className="text-[7rem] md:text-[9rem] drop-shadow-lg animate-pulse">
              👨‍🍳
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-24 text-center">
          <h3 className="text-4xl font-light tracking-wider mb-6">
            <span className="italic text-orange-400">What Drives Us</span>
          </h3>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto mb-10"></div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Flavor First",
                desc: "We never compromise on taste. Every dish is fine-tuned to perfection.",
              },
              {
                title: "Fresh Always",
                desc: "We source only fresh and high-quality ingredients every day.",
              },
              {
                title: "Tech + Tradition",
                desc: "Modern tech meets timeless culinary techniques at BiteHub.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-black border border-white/10 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-xl font-semibold mb-3 text-amber-400">
                  {item.title}
                </h4>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
