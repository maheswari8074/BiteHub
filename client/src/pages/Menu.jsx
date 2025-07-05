// pages/Menu.jsx
import React from "react";

const Menu = () => {
  const southIndianDishes = [
    {
      name: "Hyderabadi Biryani",
      price: "$12",
      description:
        "Aromatic basmati rice cooked with marinated chicken and spices.",
      emoji: "🍛",
    },
    {
      name: "Masala Dosa",
      price: "$8",
      description: "Crispy rice crepe filled with spiced potato masala.",
      emoji: "🥞",
    },
    {
      name: "Sambar Vada",
      price: "$7",
      description: "Lentil donuts soaked in tangy sambar.",
      emoji: "🍲",
    },
    {
      name: "Gongura Mutton",
      price: "$14",
      description: "Traditional Andhra mutton curry with tangy gongura leaves.",
      emoji: "🥘",
    },
  ];

  const northIndianDishes = [
    {
      name: "Butter Chicken",
      price: "$13",
      description: "Tender chicken cooked in creamy tomato gravy.",
      emoji: "🍗",
    },
    {
      name: "Paneer Tikka",
      price: "$10",
      description: "Marinated paneer grilled to perfection.",
      emoji: "🧀",
    },
    {
      name: "Pasta Alfredo",
      price: "$11",
      description: "Creamy white sauce pasta with herbs.",
      emoji: "🍝",
    },
    {
      name: "Classic Burger",
      price: "$9",
      description: "Grilled patty with cheese, lettuce, and tomato.",
      emoji: "🍔",
    },
  ];

  return (
    <section className="py-20 bg-orange-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600">
            A delicious fusion of South Indian classics and North Indian
            favorites
          </p>
        </div>

        {/* South Indian Dishes */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-orange-600">
            South Indian Specials
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {southIndianDishes.map((dish, index) => (
              <div
                key={index}
                className="bg-orange-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{dish.emoji}</div>
                <h4 className="text-xl font-semibold mb-2">{dish.name}</h4>
                <p className="text-gray-600 mb-2">{dish.description}</p>
                <div className="text-orange-600 font-bold">{dish.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* North Indian & Fusion */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-orange-600">
            North Indian & Fusion
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {northIndianDishes.map((dish, index) => (
              <div
                key={index}
                className="bg-orange-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-2">{dish.emoji}</div>
                <h4 className="text-xl font-semibold mb-2">{dish.name}</h4>
                <p className="text-gray-600 mb-2">{dish.description}</p>
                <div className="text-orange-600 font-bold">{dish.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
