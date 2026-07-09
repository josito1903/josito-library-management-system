import express from "express";

import {
    getAdminDashboard,
    getAllStudents,
    deleteStudent,
    getAllBorrowings,
    getAllNotifications,
} from "../controllers/AdminController.js";

import verifyToken from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getAdminDashboard);

router.get("/students", verifyToken, getAllStudents);

router.delete("/students/:id", verifyToken, deleteStudent);

router.get("/borrowings", verifyToken, getAllBorrowings);

router.get("/notifications", verifyToken, getAllNotifications);

export default router;