const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  type: String,
  address: String,
  city: String,
  isDefault: { type: Boolean, default: false }, // ✅ Fixed
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  addresses: [addressSchema],
});

module.exports = mongoose.model("User", userSchema);
