const Order = require("../models/Order");
const Favorite = require("../models/Favorite");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    const orders = await Order.find({ userId: user._id }).sort({ date: -1 });
    const favorites = await Favorite.find({ user: user._id });

    const totalSpent = orders.reduce((acc, order) => acc + order.amount, 0);
    const loyaltyPoints = Math.floor(totalSpent / 10);

    res.json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        totalOrders: orders.length,
        totalSpent,
        loyaltyPoints,
      },
      orders,
      favorites,
      addresses: user.addresses || [],
    });
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
    res.status(500).json({ error: "Dashboard data fetch failed" });
  }
};

module.exports = { getDashboard };
