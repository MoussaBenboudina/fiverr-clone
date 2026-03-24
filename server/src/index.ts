import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// استيراد الراوترات الخاصة بك
import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

dotenv.config();

const app = express();

// 1. قائمة النطاقات المسموح لها (Frontend)
const allowedOrigins = [
  "https://jobify-beta-eight.vercel.app",
  "http://localhost:5173"
];

// 2. إعداد الـ CORS اليدوي (أقوى من المكتبة العادية في البيئات الصعبة)
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  
  // التحقق من أن الطلب قادم من مصدر مسموح به
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // الحل الجذري لمشكلة Preflight (التي ظهرت في الـ Logs عندك)
  if (req.method === "OPTIONS") {
    console.log(`🛡️ [CORS Bypass] Responding to OPTIONS for: ${req.url}`);
    return res.sendStatus(200); // نرسل 200 فوراً للمتصفح ليسمح بمرور طلب الـ POST
  }
  
  next();
});

// 3. الـ Middlewares الأساسية (تأتي بعد الـ CORS مباشرة)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// 4. تتبع الطلبات في الـ Logs لرؤيتها على Render
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📩 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// 5. المسارات (Routes)
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// مسار فحص الصحة (Health Check)
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Welcome to Jobify API - Server is LIVE!");
});

// 6. معالجة الأخطاء
app.use(errorMiddleware);

// 7. الاتصال بقاعدة البيانات وتشغيل السيرفر
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL as string;

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`🔥 Server is running on port ${PORT}`);
      console.log(`🌍 Allowed Origin: ${allowedOrigins[0]}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

export default app;