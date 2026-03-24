
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

// تفعيل env
dotenv.config();

// الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳 Database connected successfully"))
  .catch((err) => console.log("😔 Database connection failed", err));

const app = express();

// ----------------------
// ✅ إعداد CORS (المهم جداً)
// ----------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://jobify-beta-eight.vercel.app",
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // يسمح لطلبات Postman أو نفس السيرفر
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ مهم: نفس الإعدادات في الاثنين
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// ----------------------
// Middlewares
// ----------------------
app.use(express.json());
app.use(cookieParser());

// ----------------------
// Routes
// ----------------------
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// test route
app.get("/", (req, res) => {
  res.send("🚀 Jobify API is running!");
});

// ----------------------
// Error handler
// ----------------------
app.use(errorMiddleware);

// ----------------------
// تشغيل السيرفر
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
```
