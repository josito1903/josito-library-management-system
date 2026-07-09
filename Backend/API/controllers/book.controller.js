import { Book } from "../models/Book.model.js";
import cloudinary from "../config/cloudinary.js";

// Get all books (with search + filter)
export const getAllBooks = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { isbn: { $regex: search, $options: "i" } },
      ];
    }
    if (category) query.category = category;

    const total = await Book.countDocuments(query);
    const books = await Book.find(query)
      .populate("addedBy", "fullName")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single book
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("addedBy", "fullName");
    if (!book) return res.status(404).json({ success: false, message: "Book not found." });
    res.status(200).json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add book (admin/librarian)
export const addBook = async (req, res) => {
  try {
    const { title, author, isbn, category, description, totalCopies, publishedYear, publisher } = req.body;

    if (!title || !author) {
      return res.status(400).json({ success: false, message: "Title and author are required." });
    }

    const book = await Book.create({
      title, author, isbn, category, description,
      totalCopies: totalCopies || 1,
      availableCopies: totalCopies || 1,
      publishedYear, publisher,
      cover: req.file?.path || null,
      addedBy: req.user.id,
    });

    res.status(201).json({ success: true, message: "Book added.", book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update book
export const updateBook = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.cover = req.file.path;

    const book = await Book.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true,
    });
    if (!book) return res.status(404).json({ success: false, message: "Book not found." });

    res.status(200).json({ success: true, message: "Book updated.", book });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found." });

    if (book.cover) {
      const publicId = book.cover.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`library/${publicId}`);
    }

    res.status(200).json({ success: true, message: "Book deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};