import mongoose from "mongoose";

const borrowingSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },

    borrowDate: {
        type: Date,
        default: Date.now,
    },

    returnDate: {
        type: Date,
        default: null,
    },

    fine: {
        type: Number,
        default: 0,
    },

    status: {
        type: String,
        enum: ["Pending", "Borrowed", "Returned"],
        default: "Pending",
    },
}, {
    timestamps: true,
});

const Borrowing = mongoose.model("Borrowing", borrowingSchema);

export default Borrowing;