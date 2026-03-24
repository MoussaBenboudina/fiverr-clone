import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

// تحميل متغيرات البيئة
dotenv.config();

const app = express();

// --- 1. إعدادات الـ CORS المحدثة ---
const allowedOrigins = [
  "http://localhost:5173",                 // بيئة التطوير
  "https://jobify-beta-eight.vercel.app"  // رابط الـ Frontend على Vercel
];

app.use(
  cors({
    origin: (origin, callback) => {
      // السماح بالطلبات بدون origin (مثل Postman) أو الموجودة في القائمة
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true, // ضروري لإرسال الـ Cookies والـ JWT
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// استجابة مسبقة لطلبات OPTIONS (تحسن التوافق مع Vercel)
app.options("*", cors());

// --- 2. Middlewares الأساسية ---
app.use(express.json());
app.use(cookieParser());

// --- 3. المسارات (Routes) ---
// ملاحظة: تأكد أن الروابط في الـ Frontend تتبع هذا النمط تماماً
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// مسار تجريبي للتأكد من أن السيرفر "حي" (Health Check)
app.get("/", (req, res) => {
  res.send("🚀 Jobify Server is Running Successfully!");
});

// --- 4. Middleware الأخطاء ---
app.use(errorMiddleware);

// --- 5. الاتصال بقاعدة البيانات وتشغيل السيرفر ---
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    console.log("🥳🥳 Database connection success");
    app.listen(PORT, () => {
      console.log(`🔥 Server is running on port ${PORT} 🔥`);
    });
  })
  .catch((err) => {
    console.log("😔 Database connection failed", err);
    process.exit(1); // إغلاق العملية في حال فشل الاتصال بالقاعدة
  });