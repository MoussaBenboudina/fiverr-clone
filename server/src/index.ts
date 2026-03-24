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

app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], // رابط الـ frontend
    credentials: true, // مهم جدًا إذا تستخدم الكوكيز أو Authorization header
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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