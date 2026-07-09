import express from "express";

import {
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    searchStudents,
} from "../controllers/StudentController.js";

import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Get All Students
router.get("/", AuthMiddleware, getStudents);

// Search Students
router.get("/search", AuthMiddleware, searchStudents);

// Get Student By ID
router.get("/:id", AuthMiddleware, getStudentById);

// Update Student
router.put("/:id", AuthMiddleware, updateStudent);

// Delete Student
router.delete("/:id", AuthMiddleware, deleteStudent);

export default router;