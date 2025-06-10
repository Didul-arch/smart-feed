const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import test controller
const testController = require("./src/modules/test/test.controller");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

// Test routes only
app.get("/api/v1/test/database", testController.testDatabase);
app.get("/api/v1/test/storage", testController.testStorage);
app.get("/api/v1/test/all", testController.testAll);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "SmartFeed Test Server is running!" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});
