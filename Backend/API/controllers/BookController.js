// import BookSchema from "../models/Book.schema.js";
// export const getBooks = async(req, res) => {
//     try {
//         const books = await Book.find();

//         res.json(books);
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// };

// export const addBook = async(req, res) => {
//     try {
//         const book = await Book.create(req.body);

//         res.status(201).json(book);
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// };

// export const deleteBook = async(req, res) => {
//     try {
//         await Book.findByIdAndDelete(req.params.id);

//         res.json({
//             message: "Book Deleted",
//         });
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// };


import Book from "../models/Book.schema.js";

// ===========================
// GET ALL BOOKS
// ===========================
export const getBooks = async(req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===========================
// GET BOOK BY ID
// ===========================
export const getBook = async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            });
        }

        res.status(200).json({
            success: true,
            book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===========================
// ADD BOOK
// ===========================
export const addBook = async(req, res) => {
    try {
        const { title, author, category, quantity, price } = req.body;

        if (!title || !author || !category || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        const book = await Book.create({
            title,
            author,
            category,
            quantity,
            price,
        });

        res.status(201).json({
            success: true,
            message: "Book added successfully.",
            book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===========================
// UPDATE BOOK
// ===========================
export const updateBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
            }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===========================
// DELETE BOOK
// ===========================
export const deleteBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Book deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ===========================
// SEARCH BOOKS
// ===========================
export const searchBooks = async(req, res) => {
    try {
        const keyword = req.query.keyword || "";

        const books = await Book.find({
            $or: [{
                    title: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    author: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    category: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
            ],
        });

        res.status(200).json({
            success: true,
            books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};