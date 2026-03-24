import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import gigRouter from "./routes/gig.js"
import reviewRouter from "./routes/review.js";
import errorMiddleware from "./middleware/errorHandler.js";

//env dosyasindaki degiskenlere erisim saglayacak
dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => console.log("🥳🥳DataBase is connection success"))
  .catch((err) => console.log("😔DataBase is not connection", err));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`🔥 Server is running on port ${process.env.PORT} 🔥 🥂`);
});
