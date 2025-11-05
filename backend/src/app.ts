import express from "express";
import dotenv from "dotenv";
import cookiesParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/user.route.js";

dotenv.config();
const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookiesParser());

// cors configrations
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(","),
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api/v1", authRouter);
export default app;