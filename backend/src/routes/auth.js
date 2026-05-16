const express = require("express");
const router = express.Router();
const User = require("../models/user");
const otpStore = require("../utils/otpStore");
const { getPendingUser, deletePendingUser } = require("../services/signup");
const jwt = require("jsonwebtoken");

router.post("/verify-otp", async (req, res) => {
  const { email, code } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ error: "No OTP found" });
  if (Date.now() > record.expiresAt)
    return res.status(400).json({ error: "OTP expired" });
  if (record.code !== code)
    return res.status(400).json({ error: "Invalid OTP" });

  delete otpStore[email];

  const pending = getPendingUser(email);
  if (pending) {
    const user = new User({ ...pending, role: "customer" });
    await user.save();
    deletePendingUser(email);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.json({ token, message: "Email verified!" });
  }

  // login flow
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, message: "Login verified!" });
});

module.exports = router;
