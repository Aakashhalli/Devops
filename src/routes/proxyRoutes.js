import express from "express";
import generateCertificate from "../controllers/proxyController.js";
const router = express.Router();

router.get("/certificate", generateCertificate);

export default router;
