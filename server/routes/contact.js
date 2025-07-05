const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
