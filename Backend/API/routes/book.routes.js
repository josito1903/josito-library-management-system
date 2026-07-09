import express from "express";
import {
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";
import { isAuthenticated } from "../MiddleWare/Auth.middleware.js";
import { authorizeRoles } from "../MiddleWare/role.middleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.get("/", getAllBooks);
router.get("/:id", getBook);
router.post(
  "/",
  isAuthenticated,
  authorizeRoles("admin", "librarian"),
  upload.single("cover"),
  addBook,
);
router.put(
  "/:id",
  isAuthenticated,
  authorizeRoles("admin", "librarian"),
  upload.single("cover"),
  updateBook,
);
router.delete("/:id", isAuthenticated, authorizeRoles("admin"), deleteBook);

export default router;
