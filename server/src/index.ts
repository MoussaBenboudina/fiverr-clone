import express, { Request, Response, NextFunction } from "express";
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


const allowedOrigins = [
  "https://jobify-beta-eight.vercel.app",
  "http://localhost:5173"
];


app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // رد مباشر على طلب OPTIONS الفاشل في الـ Logs عندك
  if (req.method === "OPTIONS") {
    console.log(`🛡️ CORS Preflight Bypass: ${req.method} ${req.url}`);
    return res.sendStatus(200); 
  }
  
  next();
});

// --- 3. بقية الإعدادات ---
app.use(express.json());
app.use(cookieParser());

// سجل تتبع لمعرفة وصول الطلبات الحقيقية
app.use((req, res, next) => {
  console.log(`📩 Request Received: ${req.method} ${req.url}`);
  next();
});

// --- 4. المسارات ---
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

app.get("/", (req, res) => res.send("🚀 Server is running!"));

app.use(errorMiddleware);

// --- 5. الاتصال بقاعدة البيانات ---
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("✅ Database Connected");
    app.listen(PORT, () => console.log(`🔥 Server on port ${PORT}`));
  })
  .catch(err => console.log("❌ DB Error:", err));