const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      category: String,
      image: String,
    },
  ],
  amount: Number,
  status: { type: String, default: "Delivered" },
  cuisine: String, // Optional, or remove if unused
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
