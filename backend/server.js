const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");

// Use routes
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library Management Backend is running",
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "📚 Library Management System API",
    version: "1.0.0",
    endpoints: {
      books: "/api/books",
      issues: "/api/issues",
      health: "/api/health",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   📚 Library Management System 📚      ║
║          Backend Server Running        ║
║   Server: http://localhost:${PORT}      ║
║   MongoDB: Configured                  ║
║   API Ready for Frontend Integration   ║
╚════════════════════════════════════════╝
  `);
});
