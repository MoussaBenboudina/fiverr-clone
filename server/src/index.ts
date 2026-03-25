import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";
import gigRouter from "./routes/gig.js";
import reviewRouter from "./routes/review.js";
import errorMiddleware from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// ✅ CORS الصحيح (ضعه في الأعلى)
app.use(cors({
  origin: [
    "https://jobify-beta-eight.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
}));

// ✅ هذا مهم جداً لحل preflight
app.options("*", cors());

// باقي الإعدادات
app.use(express.json());
app.use(cookieParser());

// logs
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => res.send("🚀 Server is running!"));

app.use(errorMiddleware);

// DB
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("✅ Database Connected");
    app.listen(PORT, () => console.log(`🔥 Server on port ${PORT}`));
  })
  .catch(err => console.log("❌ DB Error:", err));