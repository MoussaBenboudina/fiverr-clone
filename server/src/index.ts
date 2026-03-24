import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

dotenv.config();

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://jobify-beta-eight.vercel.app"
];

// تفعيل CORS قبل أي middleware آخر (مهم جداً!)
app.use(
  cors({
    origin: (origin, callback) => {
      // السماح بالطلبات بدون origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS Blocked: ${origin}`);
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // 24 ساعة (تخزين الـ preflight)
  })
);

// معالجة OPTIONS للـ Preflight
app.options("*", cors());

// --- Middlewares ---
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

// --- Health Check ---
app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 Jobify Server is Running!",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// --- Routes ---
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// --- Error Middleware ---
app.use(errorMiddleware);

// --- Database & Server ---
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not defined in .env");
  process.exit(1);
}

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("✅ Database connected successfully");
    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  });

export default app;