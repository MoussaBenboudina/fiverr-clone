import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

// 1. تحميل إعدادات البيئة
dotenv.config();

const app = express();

// 2. قائمة الروابط المسموح لها بالاتصال (Frontend)
const allowedOrigins = [
  "https://jobify-beta-eight.vercel.app",
  "http://localhost:5173"
];

// 3. إعداد CORS (المرحلة الأولى)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS policy"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// 4. حل مشكلة الـ Preflight يدوياً (المرحلة الثانية - حرجة جداً)
// هذا الجزء يضمن الرد على المتصفح بـ 200 OK فوراً عند استطلاع الأمان
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept");

  if (req.method === "OPTIONS") {
    console.log(`🛡️ Preflight bypass for: ${req.method} ${req.url}`);
    return res.sendStatus(200);
  }
  next();
});

// 5. Middlewares الأساسية (يجب أن تأتي بعد الـ CORS)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// 6. تتبع الطلبات في الـ Logs (للتأكد من وصول الطلب لـ Render)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📩 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 7. المسارات (Routes)
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// مسار فحص الحالة
app.get("/", (req: Request, res: Response) => {
  res.json({ 
    status: "success", 
    message: "🚀 Jobify API is live and healthy!",
    timestamp: new Date().toISOString()
  });
});

// 8. معالجة الأخطاء
app.use(errorMiddleware);

// 9. الاتصال بقاعدة البيانات وتشغيل السيرفر
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  console.error("❌ ERROR: DATABASE_URL is missing in .env file!");
  process.exit(1);
}

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
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

export default app;