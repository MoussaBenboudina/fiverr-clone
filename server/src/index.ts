import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

// الوصول إلى متغيرات البيئة من ملف .env
dotenv.config();

// الاتصال بقاعدة البيانات MongoDB
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳🥳 DataBase connection success"))
  .catch((err) => console.log("😔 DataBase connection failed", err));

const app = express();

// --- إعدادات الـ CORS المتقدمة ---
const allowedOrigins = [
  "http://localhost:5173", // رابط التطوير المحلي
  "https://jobify-beta-eight.vercel.app" // رابط مشروعك على Vercel
];

app.use(
  cors({
    origin: function (origin, callback) {
      // السماح بالطلبات التي ليس لها origin (مثل تطبيقات الموبايل أو Postman) 
      // أو إذا كان الـ origin موجوداً في القائمة المسموحة
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true, // مهم جداً لإرسال الكوكيز والـ JWT
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middlewares الأساسية
app.use(express.json());
app.use(cookieParser());

// المسارات (Routes)
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// Middleware لمعالجة الأخطاء (يجب أن يكون في النهاية)
app.use(errorMiddleware);

// تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Server is running on port ${PORT} 🔥 🥂`);
});