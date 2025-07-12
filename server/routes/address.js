const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const User = require("../models/User");

// Add new address
router.post("/", authenticate, async (req, res) => {
  const { type, address, city, isDefault } = req.body;
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ error: "User not found" });

    if (isDefault) {
      // Unset other default addresses
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push({ type, address, city, isDefault });
    await user.save();

    res.status(201).json({ message: "Address added successfully" });
  } catch (err) {
    console.error("Add address error:", err);
    res.status(500).json({ error: "Failed to add address" });
  }
});

module.exports = router;
