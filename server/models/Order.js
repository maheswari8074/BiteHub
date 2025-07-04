const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: String,
  amount: Number,
  status: { type: String, default: "Delivered" },
  cuisine: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
