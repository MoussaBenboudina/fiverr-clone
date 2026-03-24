import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

dotenv.config();

// 1. تتبع الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

const app = express();

// 2. تتبع كل طلب يصل للسيرفر (Request Logger)
app.use((req, res, next) => {
  console.log(`📩 Incoming Request: ${req.method} ${req.url}`);
  console.log(`🌍 Origin: ${req.headers.origin}`);
  next();
});

app.use(express.json());
app.use(cookieParser());

const allowedOrigin = "https://jobify-beta-eight.vercel.app";

// 3. تحسين الـ CORS يدويًا مع تتبع الـ Preflight
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    console.log("🛡️ CORS Preflight (OPTIONS) handled");
    return res.sendStatus(200);
  }
  next();
});

// 4. تتبع الدخول للمسارات (Routes)
app.use("/api/auth", (req, res, next) => {
  console.log("🔐 Auth Route Accessed");
  next();
}, authRouter);

app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("🚀 Jobify API is running!");
});

// 5. تتبع الأخطاء قبل إرسالها للـ Frontend
app.use((err: any, req: any, res: any, next: any) => {
  console.error("💥 Server Error:", err.stack || err.message);
  next(err);
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server is LIVE on port ${PORT}`);
});