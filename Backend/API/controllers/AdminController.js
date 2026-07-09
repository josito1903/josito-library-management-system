import Auth from "../models/auth.schema.js";
import Book from "../models/Book.schema.js";
import Borrow from "../models/Borrowing.schema.js";
import Notification from "../models/Notification.schema.js";

export const getAdminDashboard = async(req, res) => {
    try {
        const totalStudents = await Auth.countDocuments({
            role: "student",
        });

        const totalAdmins = await Auth.countDocuments({
            role: "admin",
        });

        const totalBooks = await Book.countDocuments();

        const borrowedBooks = await Borrow.countDocuments({
            status: "Borrowed",
        });

        const returnedBooks = await Borrow.countDocuments({
            status: "Returned",
        });

        const notifications = await Notification.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const recentBorrowings = await Borrow.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            totalStudents,
            totalAdmins,
            totalBooks,
            borrowedBooks,
            returnedBooks,
            notifications,
            recentBorrowings,
        });
    } catch (error) {
        res.status(500).json({
            message: "Unable to load admin dashboard.",
            error: error.message,
        });
    }
};

export const getAllStudents = async(req, res) => {
    try {
        const students = await Auth.find({ role: "student" },
            "-password"
        );

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteStudent = async(req, res) => {
    try {
        const student = await Auth.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found",
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllBorrowings = async(req, res) => {
    try {
        const borrowings = await Borrow.find().sort({
            createdAt: -1,
        });

        res.status(200).json(borrowings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find().sort({
            createdAt: -1,
        });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};