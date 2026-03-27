import express from "express";
import { addQuestion, getQuestionsBySession } from "../controllers/question.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addQuestion);
router.get("/:sessionId", auth, getQuestionsBySession);

export default router;
