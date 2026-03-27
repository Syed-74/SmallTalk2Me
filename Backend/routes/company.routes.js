import express from "express";
import { addCompany, getCompanies } from "../controllers/company.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, addCompany);
router.get("/", auth, getCompanies);

export default router;
