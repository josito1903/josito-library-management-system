import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    quantity: Number,
    price: Number,
}, {
    timestamps: true,
});

export default mongoose.model("Book", bookSchema);