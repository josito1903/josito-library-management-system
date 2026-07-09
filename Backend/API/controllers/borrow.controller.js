import { Borrow } from "../models/Borrow.model.js";
import { Book } from "../models/Book.model.js";
import { Notification } from "../models/Notification.js";

const FINE_PER_DAY = 10; // ₹10 per day

// Member: request to borrow a book
export const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found." });
    if (book.availableCopies < 1)
      return res
        .status(400)
        .json({ success: false, message: "No copies available." });

    const existing = await Borrow.findOne({
      user: req.user.id,
      book: bookId,
      status: { $in: ["pending", "approved"] },
    });
    if (existing)
      return res
        .status(400)
        .json({ success: false, message: "You already have this book." });

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    const borrow = await Borrow.create({
      user: req.user.id,
      book: bookId,
      dueDate,
    });

    res
      .status(201)
      .json({ success: true, message: "Borrow request submitted.", borrow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Librarian/Admin: approve borrow
export const approveBorrow = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("book user");
    if (!borrow)
      return res
        .status(404)
        .json({ success: false, message: "Record not found." });
    if (borrow.status !== "pending")
      return res
        .status(400)
        .json({ success: false, message: "Already processed." });

    borrow.status = "approved";
    borrow.approvedBy = req.user.id;
    await borrow.save();

    await Book.findByIdAndUpdate(borrow.book._id, {
      $inc: { availableCopies: -1 },
    });

    await Notification.create({
      user: borrow.user._id,
      title: "Borrow approved",
      message: `Your request for "${borrow.book.title}" has been approved. Due: ${borrow.dueDate.toDateString()}`,
      type: "approved",
    });

    res
      .status(200)
      .json({ success: true, message: "Borrow approved.", borrow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Member/Librarian: return a book
export const returnBook = async (req, res) => {
  try {
    const borrow = await Borrow.findById(req.params.id).populate("book user");
    if (!borrow)
      return res
        .status(404)
        .json({ success: false, message: "Record not found." });
    if (borrow.status === "returned")
      return res
        .status(400)
        .json({ success: false, message: "Already returned." });

    const now = new Date();
    const overdueDays = Math.max(
      0,
      Math.floor((now - borrow.dueDate) / (1000 * 60 * 60 * 24)),
    );
    const fine = overdueDays * FINE_PER_DAY;

    borrow.returnedAt = now;
    borrow.status = "returned";
    borrow.fine = fine;
    await borrow.save();

    await Book.findByIdAndUpdate(borrow.book._id, {
      $inc: { availableCopies: 1 },
    });

    if (fine > 0) {
      await Notification.create({
        user: borrow.user._id,
        title: "Fine applied",
        message: `You returned "${borrow.book.title}" ${overdueDays} day(s) late. Fine: ₹${fine}`,
        type: "overdue",
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Book returned.", fine, borrow });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all borrows (admin/librarian)
export const getAllBorrows = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};

    const total = await Borrow.countDocuments(query);
    const borrows = await Borrow.find(query)
      .populate("user", "fullName memberId email")
      .populate("book", "title author")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ success: true, total, borrows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Member: my borrows
export const myBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ user: req.user.id })
      .populate("book", "title author cover")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, borrows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
