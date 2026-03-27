import express from "express";
import { uploadResume, getMyResume } from "../controllers/resume.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, uploadResume);
router.get("/", auth, getMyResume);

export default router;
