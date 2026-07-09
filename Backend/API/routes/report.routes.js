import express from "express";
import {
  getDashboardStats,
  getBorrowReport,
} from "../controllers/report.controller.js";
import { isAuthenticated } from "../MiddleWare/Auth.middleware.js";
import { authorizeRoles } from "../MiddleWare/role.middleware.js";

const router = express.Router();

router.get(
  "/stats",
  isAuthenticated,
  authorizeRoles("admin", "librarian"),
  getDashboardStats,
);
router.get(
  "/borrows",
  isAuthenticated,
  authorizeRoles("admin", "librarian"),
  getBorrowReport,
);

export default router;
