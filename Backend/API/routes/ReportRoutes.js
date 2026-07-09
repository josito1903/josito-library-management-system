import express from "express";

import { getReport } from "../controllers/ReportController.js";

import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Library Report
router.get(
    "/",
    AuthMiddleware,
    getReport
);

export default router;