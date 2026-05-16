const { storePendingUser } = require("../services/signup");
const { sendEmail } = require("../utils/email");

const otpStore = require("../utils/otpStore"); // move this here or import from a shared file

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    await storePendingUser(userData);

    const otp = generateOTP();
    otpStore[userData.email] = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    };
    await sendEmail(userData.email, otp);

    res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createUser };
