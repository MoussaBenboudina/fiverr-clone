import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.ts";
import gigRouter from "./routes/gig.ts";
import reviewRouter from "./routes/review.ts";
import errorMiddleware from "./middleware/errorHandler.ts";

//env dosyasindaki degiskenlere erisim saglayacak
dotenv.config();

//Connect to DB
mongoose
  .connect(process.env.DATABASE_URL)
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
