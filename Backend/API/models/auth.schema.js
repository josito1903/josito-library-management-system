import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    role: {
        type: String,
        enum: ["student", "admin"],
        default: "student",
    },

    studentId: {
        type: String,
        default: "",
        trim: true,
    },

    department: {
        type: String,
        default: "Library Management",
        trim: true,
    },

    course: {
        type: String,
        default: "BCA",
        trim: true,
    },

    semester: {
        type: Number,
        default: 1,
    },

    address: {
        type: String,
        default: "",
        trim: true,
    },

    profileImage: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    status: {
        type: String,
        enum: ["Active", "Inactive", "Blocked"],
        default: "Active",
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    borrowedBooks: {
        type: Number,
        default: 0,
    },

    totalFine: {
        type: Number,
        default: 0,
    },

    lastLogin: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", authSchema);

export default mongoose.model("User", authSchema);