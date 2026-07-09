import express from "express";

import {
  getMyProfile,
  updateProfile,
  updateProfilePhoto,
  getAllUsers,
  updateUserRole, 
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../MiddleWare/Auth.middleware.js";
import { authorizeRoles } from "../MiddleWare/role.middleware.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

router.put("/:id/role", isAuthenticated, authorizeRoles("admin"), updateUserRole);
router.get("/profile", isAuthenticated, getMyProfile);
router.put("/profile", isAuthenticated, updateProfile);
router.put(
  "/profile/photo",
  isAuthenticated,
  upload.single("photo"),
  updateProfilePhoto,
);
router.get(
  "/all",
  isAuthenticated,
  authorizeRoles("admin", "librarian"),
  getAllUsers,
);

export default router;
