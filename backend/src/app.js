require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const express = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();
const createAdminAccount = require("./scripts/admin");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

createAdminAccount();

app.use("/user", userRoute);
app.use("/register", signupRoute);
app.use("/auth", loginRoute);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
