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

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳🥳 DataBase connection success"))
  .catch((err) => console.log("😔 DataBase connection failed", err));

const app = express();

// --- 1. إعدادات الـ CORS (يجب أن تكون في البداية تماماً) ---
app.use(
  cors({
    // تأكد من وضع رابط الـ Frontend الحقيقي هنا بجانب localhost
    origin: ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean) as string[], 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// --- 2. الرد على طلبات الـ Preflight لجميع المسارات ---
app.options("*", cors()); 

// --- 3. بقية الـ Middlewares ---
app.use(express.json());
app.use(cookieParser());

// --- 4. المسارات (Routes) ---
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// --- 5. معالجة الأخطاء ---
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🔥 Server is running on port ${port} 🔥 🥂`);
});