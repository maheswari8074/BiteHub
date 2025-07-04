import React from "react";
import {
  ShoppingBag,
  Clock,
  Heart,
  DollarSign,
  TrendingUp,
  Star,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: <ShoppingBag size={24} className="text-orange-600" />,
      trendIcon: <TrendingUp size={20} className="text-green-500" />,
      border: "border-orange-500",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: <Clock size={24} className="text-yellow-600" />,
      trendIcon: <Clock size={20} className="text-yellow-600" />,
      border: "border-yellow-500",
    },
    {
      title: "Favorites",
      value: stats.favoriteCount,
      icon: <Heart size={24} className="text-red-600" />,
      trendIcon: <Star size={20} className="text-red-500" />,
      border: "border-red-500",
    },
    {
      title: "Total Spent",
      value: formatCurrency(stats.totalSpent),
      icon: <DollarSign size={24} className="text-green-600" />,
      trendIcon: <DollarSign size={20} className="text-green-600" />,
      border: "border-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`bg-white p-6 rounded-3xl shadow-lg border-l-4 ${card.border} hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gray-100 rounded-full">{card.icon}</div>
            {card.trendIcon}
          </div>
          <p className="text-sm text-gray-600 font-medium">{card.title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
