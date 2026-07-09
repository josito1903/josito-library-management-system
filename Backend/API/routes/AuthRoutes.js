import express from "express";

import {
    signup,
    signin,
} from "../controllers/AuthController.js";

import upload from "../middleware/upload.js";

const router = express.Router();

// Signup with profile image
router.post(
    "/signup",
    upload.single("profileImage"),
    signup
);

// Signin
router.post("/signin", signin);

export default router;