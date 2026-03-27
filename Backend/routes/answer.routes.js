import express from "express";
import { generateAnswer } from "../controllers/answer.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate", auth, generateAnswer);

export default router;
