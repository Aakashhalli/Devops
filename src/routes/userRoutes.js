import express from "express";
import isAuth from "../middlewares/isAuth.js";

import {
  registerUser,
  verifyOtp,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.get("/profile", isAuth, getUserProfile);
router.post("/update-profile", isAuth, updateUserProfile);
router.get("/logout", logoutUser);

export default router;
