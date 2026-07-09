import express from "express";

import { getDashboard } from "../controllers/DashboardController.js";

import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/", AuthMiddleware, getDashboard);

export default router;