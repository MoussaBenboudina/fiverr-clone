import express, { Router } from "express";
// تغيير الامتداد من .ts إلى .js (ضروري جداً لبيئة الرفع)
import { login, logout, profile, register } from "../controllers/authController.js";
import upload from "../utils/multer.js";
import protect from "../middleware/protect.js";

// 1) router olusturma
const router: Router = express.Router();

// 2) yollari belirler
router.route("/register").post(upload.single("photo"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
// تأكد أن المسار هنا هو /profile فقط وليس /api/auth/profile
router.route("/profile").get(protect, profile);

// 3) router'i export et
export default router;