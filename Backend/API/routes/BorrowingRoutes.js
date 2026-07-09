import express from "express";
import { borrowBook, getBorrowings, returnBook } from "../controllers/BorrowingController.js";



const router = express.Router();

router.get("/", getBorrowings);

router.post("/", borrowBook);

router.put("/:id", returnBook);

export default router;