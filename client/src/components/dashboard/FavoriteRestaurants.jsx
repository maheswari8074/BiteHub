import React from "react";
import { Star } from "lucide-react";

const FavoriteRestaurants = ({ favorites }) => {
  const formatOrders = (count) => `${count} orders`;

  if (!favorites.length) {
    return <p className="text-center text-gray-500">No favorites yet.</p>;
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Favorite Restaurants
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((res, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
                {res.name.charAt(0)}
              </div>
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{res.rating}</span>
              </div>
            </div>
            <h4 className="font-bold text-gray-800 mb-1">{res.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{res.cuisine}</p>
            <p className="text-sm text-orange-600 font-medium">
              {formatOrders(res.orders)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteRestaurants;
