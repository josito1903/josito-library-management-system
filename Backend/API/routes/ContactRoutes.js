import express from "express";

import {
    sendMessage,
    getMessages,
    getMessageById,
    deleteMessage,
} from "../controllers/ContactController.js";

import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Public Route
// Send a contact message
router.post("/", sendMessage);

// Admin Routes
// Get all contact messages
router.get("/", AuthMiddleware, getMessages);

// Get a single contact message
router.get("/:id", AuthMiddleware, getMessageById);

// Delete a contact message
router.delete("/:id", AuthMiddleware, deleteMessage);

export default router;