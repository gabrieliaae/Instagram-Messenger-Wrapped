const bcrypt = require("bcrypt");

const pendingUsers = {}; // temporary store

async function storePendingUser(userData) {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);
  pendingUsers[email] = { name, email, password: hashedPassword };
}

function getPendingUser(email) {
  return pendingUsers[email];
}

function deletePendingUser(email) {
  delete pendingUsers[email];
}

module.exports = { storePendingUser, getPendingUser, deletePendingUser };
