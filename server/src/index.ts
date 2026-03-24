import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

// تفعيل متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳🥳 DataBase connection success"))
  .catch((err) => console.log("😔 DataBase is not connected", err));

const app = express();

// --- 1. إعدادات الـ CORS المحدثة للرفع ---
const allowedOrigins = [
  "http://localhost:5173",                // للتطوير المحلي
  "https://jobify-beta-eight.vercel.app" // رابط مشروعك على Vercel
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
    credentials: true, // ضروري جداً لإرسال الـ Cookies والـ JWT
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// استجابة مسبقة لطلبات OPTIONS (تحسن التوافق مع Vercel)
app.options("*", cors());

// Middlewares الأساسية
app.use(express.json());
app.use(cookieParser());

// --- 2. المسارات (Routes) ---
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// مسار تجريبي للتأكد من عمل السيرفر بعد الرفع
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Jobify SERVER!");
});

// معالجة الأخطاء
app.use(errorMiddleware);

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT} 🔥 🥂`);
});