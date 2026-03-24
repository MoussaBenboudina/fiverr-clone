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

// ✅ CORS Configuration - يجب يكون قبل أي حاجة
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://jobify-1-whmc.onrender.com",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

console.log("🔐 Allowed Origins:", allowedOrigins);

// ✅ تطبيق CORS middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    maxAge: 3600,
  })
);

// ✅ معالجة جميع preflight requests
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
}));

// ✅ Middleware إضافي (safety layer)
app.use((req, res, next) => {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With,Accept");
  }
  next();
});

// ------------------- Middlewares -------------------
app.use(express.json());
app.use(cookieParser());

// ------------------- Database Connection -------------------
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳 DataBase connection success"))
  .catch((err) => console.log("😔 DataBase connection failed", err));

// ------------------- Routes -------------------
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

// ------------------- Error Handling -------------------
app.use(errorMiddleware);

// ------------------- Start Server -------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🔥 Server running on port ${port} 🔥`);
});