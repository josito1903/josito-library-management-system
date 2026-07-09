import User from "../models/auth.schema.js";

// Get Logged-in User Profile
export const getProfile = async(req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Profile
export const updateProfile = async(req, res) => {
    try {

        const {
            fullname,
            phoneNumber,
            department,
            course,
            semester,
            address,
        } = req.body;

        const updateData = {
            fullname,
            phoneNumber,
            department,
            course,
            semester,
            address,
        };

        if (req.file) {
            updateData.profileImage = req.file.filename;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData, {
                new: true,
            }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};