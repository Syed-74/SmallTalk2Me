import express from "express";
import { createSession, getSessions, endSession } from "../controllers/session.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createSession);
router.get("/", auth, getSessions);
router.put("/:id/end", auth, endSession);

export default router;
