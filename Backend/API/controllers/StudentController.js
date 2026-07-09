import User from "../models/auth.schema.js";

// Get All Students
export const getStudents = async(req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");

        res.status(200).json({
            success: true,
            total: students.length,
            students,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Student By ID
export const getStudentById = async(req, res) => {
    try {
        const student = await User.findById(req.params.id).select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });
        }

        res.status(200).json({
            success: true,
            student,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Student
export const updateStudent = async(req, res) => {
    try {

        const {
            fullname,
            phoneNumber,
            email,
            department,
            course,
            semester,
            address,
            status,
        } = req.body;

        const updateData = {
            fullname,
            phoneNumber,
            email,
            department,
            course,
            semester,
            address,
            status,
        };

        const student = await User.findByIdAndUpdate(
            req.params.id,
            updateData, {
                new: true,
            }
        ).select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully.",
            student,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Student
export const deleteStudent = async(req, res) => {
    try {

        const student = await User.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Student deleted successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Search Students
export const searchStudents = async(req, res) => {
    try {

        const keyword = req.query.keyword || "";

        const students = await User.find({
            role: "student",
            fullname: {
                $regex: keyword,
                $options: "i",
            },
        }).select("-password");

        res.status(200).json({
            success: true,
            total: students.length,
            students,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};