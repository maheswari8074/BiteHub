const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authenticate = require("../middleware/authMiddleware"); // ensure correct path

// ✅ Create a new order
router.post("/", authenticate, async (req, res) => {
  try {
    const { items, amount } = req.body;

    const order = new Order({
      userId: req.user._id,
      items,
      amount,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ You MUST export the router
module.exports = router;
