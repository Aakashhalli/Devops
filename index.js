/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import path from "path";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToMongoDB from "./db.js";

import userRoutes from "./src/routes/userRoutes.js";
import questionRoutes from "./src/routes/questionRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import userTrackingRoutes from "./src/routes/userTrackingRoutes.js";
import proxyRoutes from "./src/routes/proxyRoutes.js";

const app = express();
app.use(express.json());
const _dirname = path.dirname("");
const distPath = path.join(_dirname, "../dist");
app.use(express.static(distPath));
app.use(
  cors({
    origin: "*",
  })
);

dotenv.config();
const PORT = process.env.VITE_PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public", { extensions: ["js"] }));
app.use(cookieParser());
app.use(cors());
app.set("trust proxy", true);
app.use((req, res, next) => {
  const clientIp = requestIp.getClientIp(req);
  req.headers["x-forwarded-for"] = clientIp;
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/user-tracking", userTrackingRoutes);
app.use("/api/proxy", proxyRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

connectToMongoDB(process.env.VITE_MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server started running on http://localhost:${PORT}`);
});
