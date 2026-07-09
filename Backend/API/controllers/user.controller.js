import { User } from "../models/UserModel.js";

// ─── Safe User Response ────────────────────────────────────────────
const safeUser = (user) => ({
  id: user._id,
  memberId: user.memberId,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  role: user.role,
  address: user.address,
  membershipType: user.membershipType,
  avatar: user.avatar,
  createdAt: user.createdAt,
});

// ─── Get My Profile ────────────────────────────────────────────────
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Profile ────────────────────────────────────────────────
export const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, address, membershipType } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(fullName && { fullName }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(membershipType && { membershipType }),
      },
      { new: true, runValidators: true },
    ).select("-password");

    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated.",
        user: safeUser(user),
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Profile Photo ──────────────────────────────────────────
export const updateProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }

    const avatarUrl = req.file.path;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true },
    ).select("-password");

  res.status(200).json({
  success: true,
  message: "Photo updated.",
  user: safeUser(user),
});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get All Users (Admin/Librarian) ──────────────────────────────
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update User Role (Admin only) ────────────────────────────────
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["admin", "librarian", "member"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role." });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, message: "Role updated.", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};