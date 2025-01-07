import express from "express";
import saveForm from "../controllers/contactController.js";
const router = express.Router();

router.post("/submit-form", saveForm);

export default router;
