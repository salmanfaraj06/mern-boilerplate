//authentication routes

// Path: server/routes/auth.route.js
import express from "express";
import { register, login, googleLogin } from "../controllers/auth.controller.js";
import { signupValidation, loginValidation } from "../utils/error.js";

const router = express.Router();

router.post('/register', signupValidation, register);
router.post('/login', loginValidation, login);
router.post('/google', googleLogin);

export default router;