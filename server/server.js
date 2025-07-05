const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboard");
const contactRoutes = require("./routes/contact");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error", err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
