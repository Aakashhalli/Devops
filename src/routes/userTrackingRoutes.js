import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getUserTrackingData,
  saveQuizScore,
  updateSimulationCompletionStatus,
  updateTheoryCompletionStatus,
} from "../controllers/userTrackingController.js";

const router = express.Router();

router.patch("/simulation", isAuth, updateSimulationCompletionStatus);
router.patch("/theory", isAuth, updateTheoryCompletionStatus);
router.post("/quiz-score", saveQuizScore);
router.get("/:userId", getUserTrackingData);

export default router;
