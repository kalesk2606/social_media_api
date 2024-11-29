import express from "express";
import path from "path";

import authRoutes from "./routes/auth";

console.log(authRoutes); // Should log a function, not an object


const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files (Frontend)
app.use(express.static(path.join(__dirname, "../public")));

// Fallback to serve index.html for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Add your API routes here
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
