const crypto = require("crypto");

//Generate random key
const secretKey = crypto.randomBytes(32).toString("hex");

module.exports = {
  secretKey: secretKey,
};
