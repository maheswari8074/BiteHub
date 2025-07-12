const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    restaurant: { type: String },
    price: { type: Number },
    image: { type: String },
    rating: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
