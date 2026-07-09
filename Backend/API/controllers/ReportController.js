import User from "../models/auth.schema.js";
import Book from "../models/Book.schema.js";
import Borrowing from "../models/Borrowing.schema.js";

// Library Report
export const getReport = async(req, res) => {
    try {

        const totalStudents = await User.countDocuments({
            role: "student",
        });

        const totalAdmins = await User.countDocuments({
            role: "admin",
        });

        const totalBooks = await Book.countDocuments();

        const borrowedBooks = await Borrowing.countDocuments({
            status: "Borrowed",
        });

        const returnedBooks = await Borrowing.countDocuments({
            status: "Returned",
        });

        const pendingRequests = await Borrowing.countDocuments({
            status: "Pending",
        });

        const totalFine = await Borrowing.aggregate([{
            $group: {
                _id: null,
                totalFine: {
                    $sum: "$fine",
                },
            },
        }, ]);

        res.status(200).json({
            success: true,

            report: {
                totalStudents,
                totalAdmins,
                totalBooks,
                borrowedBooks,
                returnedBooks,
                pendingRequests,
                availableBooks: totalBooks - borrowedBooks,

                totalFine: totalFine.length > 0 ?
                    totalFine[0].totalFine :
                    0,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};