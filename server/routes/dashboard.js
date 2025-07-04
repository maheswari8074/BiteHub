const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const User = require("../models/User");
const Order = require("../models/Order");

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const orders = await Order.find({ userId }).sort({ date: -1 });

    // Stats
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);
    const favoriteDishes = [...new Set(orders.map((o) => o.item))];

    // Order trends by date
    const orderTrends = {};
    orders.forEach((o) => {
      const day = o.date.toISOString().split("T")[0];
      orderTrends[day] = (orderTrends[day] || 0) + 1;
    });
    const orderTrendsFormatted = Object.entries(orderTrends).map(
      ([date, count]) => ({ date, orders: count })
    );

    // Orders by status
    const ordersByStatus = ["Delivered", "In Progress", "Cancelled"].map(
      (status) => ({
        status,
        count: orders.filter((o) => o.status === status).length,
      })
    );

    // Recent orders (limit to 5)
    const recentOrders = orders.slice(0, 5).map((o) => ({
      item: o.item,
      amount: o.amount,
      status: o.status,
      date: o.date,
    }));

    // Dummy spending by cuisine (if your Order has `cuisine` field)
    const spendingByCuisine = {};
    orders.forEach((o) => {
      const cuisine = o.cuisine || "Other";
      spendingByCuisine[cuisine] = (spendingByCuisine[cuisine] || 0) + o.amount;
    });
    const spending = Object.entries(spendingByCuisine).map(
      ([cuisine, amount]) => ({ cuisine, amount })
    );

    // Dummy favorite restaurants (optional)
    const favoriteRestaurants = [
      { name: "Spicy Treat", orders: 44 },
      { name: "Urban Bites", orders: 33 },
    ];

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
      },
      stats: [
        {
          title: "Total Orders",
          value: totalOrders,
          icon: "Package",
          color: "bg-orange-100 text-orange-600",
        },
        {
          title: "Total Spent",
          value: totalSpent,
          icon: "DollarSign",
          color: "bg-green-100 text-green-600",
        },
        {
          title: "Favorite Dishes",
          value: favoriteDishes.length,
          icon: "Star",
          color: "bg-yellow-100 text-yellow-600",
        },
      ],
      orderTrends: orderTrendsFormatted,
      ordersByStatus,
      recentOrders,
      favoriteRestaurants,
      spending,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
