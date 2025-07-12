const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const User = require("../models/User");

// 🔁 Edit Profile (name, phone)
router.put("/edit", authenticate, async (req, res) => {
  const { name, phone } = req.body;
  try {
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone },
      { new: true }
    ).select("-password");
    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// 🔁 Change Password
router.put("/change-password", authenticate, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Password change failed" });
  }
});

// 🚪 Sign Out – handled on frontend by clearing localStorage

module.exports = router;
