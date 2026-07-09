// import express from "express";

// import {
//     getBooks,
//     addBook,
//     deleteBook,
// } from "../controllers/BookController.js";

// const router = express.Router();

// router.get("/", getBooks);

// router.post("/", addBook);

// router.delete("/:id", deleteBook);

// export default router;

import express from "express";

import {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
} from "../controllers/BookController.js";

const router = express.Router();

// ======================
// BOOK ROUTES
// ======================

// Get all books
router.get("/", getBooks);

// Search books
router.get("/search", searchBooks);

// Get single book
router.get("/:id", getBook);

// Add new book
router.post("/", addBook);

// Update book
router.put("/:id", updateBook);

// Delete book
router.delete("/:id", deleteBook);

export default router;