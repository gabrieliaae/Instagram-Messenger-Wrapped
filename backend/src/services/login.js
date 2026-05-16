const bcrypt = require("bcrypt");
const User = require("../models/user");

async function login(email, password) {
  const existingUser = await User.findOne({ email });
  if (!existingUser) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) throw new Error("Incorrect password");

  return existingUser;
}

module.exports = { login }; // ✅ was missing
