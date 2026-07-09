import express from "express";
import { getMyNotifications, markAsRead, markAllAsRead } from "../controllers/notification.controller.js";
import { isAuthenticated } from "../MiddleWare/Auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticated, getMyNotifications);
router.put("/:id/read", isAuthenticated, markAsRead);
router.put("/read-all", isAuthenticated, markAllAsRead);

export default router;