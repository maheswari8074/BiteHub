const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { getDashboard } = require("../controllers/dashboardController");

// Just call the controller directly
router.get("/", verifyToken, getDashboard);

module.exports = router;
