import express from "express";
import { handleLogin, handleSignUp, handleGoogle } from "../controllers/auth.controller.js";

const router = express.Router();


/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     parameters:
 *       - in: query
 *         name: referral
 *         schema:
 *           type: string
 *         description: Referral code
 *         required: true
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *         description: Source of the signup
 *         required: false
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   anyOf:
 *                     - type: object
 *                     - type: string
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 data:
 *                   anyOf:
 *                     - type: object
 *                     - type: string
 */
router.post("/signup", handleSignUp)
router.post("/google", handleGoogle)
router.post("/login", handleLogin)

export default router;