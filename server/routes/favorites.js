const express = require("express");
const router = express.Router();
const Favorite = require("../models/Favorite");
const authenticate = require("../middleware/authMiddleware");

router.post("/", authenticate, async (req, res) => {
  const { name, price, image, rating } = req.body;
  try {
    const exists = await Favorite.findOne({
      user: req.user._id,
      name,
    });
    if (exists) {
      return res.status(200).json({ message: "Already favorited" });
    }

    const fav = new Favorite({
      user: req.user._id,
      name,
      price,
      image,
      rating,
    });

    await fav.save();
    res.status(201).json({ message: "Added to favorites" });
  } catch (err) {
    console.error("Favorite save error:", err);
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

module.exports = router;
