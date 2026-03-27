import express from "express";
import { addMemory, searchMemory } from "../controllers/memory.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addMemory);
router.get("/:sessionId", auth, searchMemory);

export default router;
