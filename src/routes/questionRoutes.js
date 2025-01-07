import express from "express";
import getQuestions from "../controllers/questionController.js";
const router = express.Router();

router.get("/:algorithmName", getQuestions);

export default router;
