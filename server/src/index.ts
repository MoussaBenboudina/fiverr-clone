// index.ts
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

// ------------------- 1️⃣ إعدادات CORS -------------------
const allowedOrigins = [
  "http://localhost:5173",          // التطوير المحلي
  process.env.CLIENT_URL            // رابط الfrontend على Vercel أو Render
].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,          // السماح فقط بالأصول المحددة
    credentials: true,               // للسماح بالكوكيز أو Authorization header
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// الرد على جميع طلبات Preflight (OPTIONS)
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
}));

// ------------------- 2️⃣ Middlewares -------------------
app.use(express.json());
app.use(cookieParser());

// ------------------- 3️⃣ الاتصال بقاعدة البيانات -------------------
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳 DataBase connection success"))
  .catch((err) => console.log("😔 DataBase connection failed", err));

// ------------------- 4️⃣ Routes -------------------
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// ------------------- 5️⃣ Error handling -------------------
app.use(errorMiddleware);

// ------------------- 6️⃣ تشغيل السيرفر -------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🔥 Server running on port ${port} 🔥`);
});