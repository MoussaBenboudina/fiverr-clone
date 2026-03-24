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

// --- 1. إعدادات CORS (قبل أي route أو middleware آخر) ---
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean) as string[];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// --- 2. الرد على طلبات Preflight (OPTIONS) لجميع المسارات ---
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
}));

// --- 3. Middlewares ---
app.use(express.json());
app.use(cookieParser());

// --- 4. الاتصال بقاعدة البيانات ---
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳 DataBase connection success"))
  .catch((err) => console.log("😔 DataBase connection failed", err));

// --- 5. Routes ---
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// --- 6. Error handling ---
app.use(errorMiddleware);

// --- 7. تشغيل السيرفر ---
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🔥 Server running on port ${port} 🔥`);
});