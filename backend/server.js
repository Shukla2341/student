import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*", // you can restrict later to your Vercel URL
}));
app.use(express.json());

// ✅ Root route (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ MongoDB connection with error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB Error:", err.message);
    process.exit(1); // stop server if DB fails
  });

// ✅ API routes
app.use("/api", routes);

// ✅ PORT FIX (important for Render)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});