import express, { Router } from "express";
import { login, logout, profile, register } from "../controllers/authController.js";
import upload from "../utils/multer.js";
import protect from "../middleware/protect.js";

//1) router olusturma
const router: Router = express.Router();

//2)yollari belirler
router.route("/register").post(upload.single("photo"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/profile").get(protect, profile);

//3)router'i export et
export default router;
