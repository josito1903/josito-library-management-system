import express from "express";

import {
    createNotification,
    getNotifications,
    markAsRead,
    deleteNotification,
} from "../controllers/NotificationController.js";

import AuthMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Create Notification
router.post(
    "/",
    AuthMiddleware,
    createNotification
);

// Get My Notifications
router.get(
    "/",
    AuthMiddleware,
    getNotifications
);

// Mark as Read
router.put(
    "/:id",
    AuthMiddleware,
    markAsRead
);

// Delete Notification
router.delete(
    "/:id",
    AuthMiddleware,
    deleteNotification
);

export default router;