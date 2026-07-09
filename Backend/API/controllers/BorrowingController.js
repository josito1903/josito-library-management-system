import Borrow from "../models/Borrowing.schema.js"
export const borrowBook = async(req, res) => {
    try {
        const borrow = await Borrow.create(req.body);

        res.status(201).json(borrow);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getBorrowings = async(req, res) => {
    try {
        const records = await Borrow.find();

        res.json(records);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const returnBook = async(req, res) => {
    try {
        const borrow = await Borrow.findByIdAndUpdate(
            req.params.id, {
                status: "Returned",
                returnDate: new Date(),
            }, {
                new: true,
            }
        );

        res.json(borrow);
    } catch (error) {
        res.status(500).json(error.message);
    }
};