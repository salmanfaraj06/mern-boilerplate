// user.route.js
import express from "express";
import { getHelloWorld } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getHelloWorld);

export default router;