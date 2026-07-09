import { Borrow } from "../models/Borrow.model.js";
import { Book } from "../models/Book.model.js";
import { User } from "../models/UserModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [totalBooks, totalUsers, totalBorrows, pendingBorrows, overdueBorrows, totalFines] =
      await Promise.all([
        Book.countDocuments(),
        User.countDocuments(),
        Borrow.countDocuments(),
        Borrow.countDocuments({ status: "pending" }),
        Borrow.countDocuments({ status: "overdue" }),
        Borrow.aggregate([{ $group: { _id: null, total: { $sum: "$fine" } } }]),
      ]);

    res.status(200).json({
      success: true,
      stats: {
        totalBooks,
        totalUsers,
        totalBorrows,
        pendingBorrows,
        overdueBorrows,
        totalFines: totalFines[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBorrowReport = async (req, res) => {
  try {
    const { from, to } = req.query;
    const query = {};
    if (from || to) {
      query.createdAt = {};
      if (from) query.createdAt.$gte = new Date(from);
      if (to) query.createdAt.$lte = new Date(to);
    }

    const borrows = await Borrow.find(query)
      .populate("user", "fullName memberId")
      .populate("book", "title author")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, total: borrows.length, borrows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
