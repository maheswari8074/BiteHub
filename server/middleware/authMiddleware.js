const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Auth Header Received:", authHeader); // 👈 LOG THIS

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No Bearer token provided");
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token Decoded:", decoded); // 👈 LOG THIS

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log("❌ User not found from token:", decoded.id);
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error.message);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = authenticate;
