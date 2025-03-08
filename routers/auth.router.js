import express from "express";
import { handleLogin, handleSignUp } from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/login", handleLogin)
router.post("/signup", handleSignUp)

export default router;