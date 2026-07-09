import express from "express";
import { borrowBook, approveBorrow, returnBook, getAllBorrows, myBorrows } from "../controllers/borrow.controller.js";
import { isAuthenticated } from "../MiddleWare/Auth.middleware.js";
import { authorizeRoles } from "../MiddleWare/role.middleware.js";


const router = express.Router();

router.post("/", isAuthenticated, borrowBook);
router.get("/my", isAuthenticated, myBorrows);
router.get("/all", isAuthenticated, authorizeRoles("admin", "librarian"), getAllBorrows);
router.put("/:id/approve", isAuthenticated, authorizeRoles("admin", "librarian"), approveBorrow);
router.put("/:id/return", isAuthenticated, returnBook);

export default router;




