import express from "express";

import {
    getProfile,
    updateProfile,
} from "../controllers/ProfileController.js";

import AuthMiddleware from "../middleware/AuthMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Get Profile
router.get(
    "/",
    AuthMiddleware,
    getProfile
);

// Update Profile
router.put(
    "/",
    AuthMiddleware,
    upload.single("profileImage"),
    updateProfile
);

export default router;