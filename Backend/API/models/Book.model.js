import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, unique: true, trim: true },
    category: { type: String, trim: true },
    description: { type: String, trim: true },
    cover: { type: String, default: null },
    totalCopies: { type: Number, default: 1 },
    availableCopies: { type: Number, default: 1 },
    publishedYear: { type: Number },
    publisher: { type: String, trim: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Book = mongoose.model("Book", bookSchema);