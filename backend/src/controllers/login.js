const { login: authLogin } = require("../services/login"); // ✅ destructure
const { sendEmail } = require("../utils/email");
const otpStore = require("../utils/otpStore");

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    await authLogin(email, password); // ✅ use authLogin

    const otp = generateOTP();
    otpStore[email] = { code: otp, expiresAt: Date.now() + 10 * 60 * 1000 };
    await sendEmail(email, otp);

    res.json({ message: "OTP sent" });
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: error.message });
  }
}

module.exports = { login };
