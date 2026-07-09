import { Borrow } from "../models/Borrow.js";

export const getMyHistory = async (req, res, next) => {
  try {
    const borrows = await Borrow.find({
      user: req.user._id,
    })
      .populate("book", "title author")
      .sort({ borrowDate: -1 });

    const historyData = borrows.map((borrow) => ({
      id: borrow._id,
      title: borrow.book?.title || "Unknown Book",
      author: borrow.book?.author || "Unknown Author",

      issueDate: borrow.borrowDate
        ? borrow.borrowDate.toLocaleDateString()
        : "-",

      dueDate: borrow.dueDate ? borrow.dueDate.toLocaleDateString() : "-",

      returnDate: borrow.returnDate
        ? borrow.returnDate.toLocaleDateString()
        : null,

      status: borrow.status,
    }));

    res.status(200).json({
      success: true,
      count: historyData.length,
      historyData,
    });
  } catch (error) {
    next(error);
  }
};
