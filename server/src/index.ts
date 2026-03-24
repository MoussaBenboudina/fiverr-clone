import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ملاحظة: عند استخدام type: module في TS، يفضل إنهاء المسارات بـ .js 
// حتى لو كانت الملفات الأصلية .ts، لأن المحول سيحولها لـ .js
import authRouter from "./routes/auth.js";
import gigRouter from "./routes/gig.js";
import reviewRouter from "./routes/review.js";
import errorMiddleware from "./middleware/errorHandler.js";

// الوصول لمتغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳🥳 DataBase connection success"))
  .catch((err) => console.log("😔 DataBase connection failed", err));

const app = express();

app.use(express.json());
app.use(cookieParser());

// إعدادات CORS المعدلة للإنتاج (Production)
app.use(
  cors({
    // يمكنك وضع ["http://localhost:5173", "رابط-موقعك-على-ريندر"]
    // أو استخدم true للسماح بالرابط الذي يرسل الطلب حالياً (سهل للتجربة)
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true, // ضرورية جداً للـ Cookies
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// المسارات
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// Middlewares
app.use(errorMiddleware);

// تحديد المنفذ (Render يحدد بورت تلقائي عبر process.env.PORT)
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🔥 Server is running on port ${port} 🔥 🥂`);
});