import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

// ----------------------
// تفعيل متغيرات البيئة
// ----------------------
dotenv.config();

// ----------------------
// الاتصال بقاعدة البيانات
// ----------------------
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳 Database connected successfully"))
  .catch((err) => console.log("😔 Database connection failed", err));

const app = express();

// ----------------------
// Middlewares أساسية
// ----------------------
app.use(express.json());
app.use(cookieParser());

// ----------------------
// CORS كامل مع حل preflight
// ----------------------
const allowedOrigin = "https://jobify-beta-eight.vercel.app";

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));

// 👇 هيدر يدوي لجميع الطلبات + preflight
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// ----------------------
// Routes
// ----------------------
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// route test
app.get("/", (req, res) => {
  res.send("🚀 Jobify API is running!");
});

// ----------------------
// Error handler
// ----------------------
app.use(errorMiddleware);

// ----------------------
// تشغيل السيرفر
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});