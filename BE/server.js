const express = require("express");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/adminRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Register Routes
app.use("/admin", adminRoutes);
app.use("/api-key", apiKeyRoutes);
app.use("/user", userRoutes);

// Start Server
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
