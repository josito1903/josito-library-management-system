import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // npm install uuid

const userSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      unique: true,
    },

    fullName: {
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

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "librarian", "member"],
      default: "member",
    },

    address: {
      type: String,
      trim: true,
    },

    membershipType: {
      type: String,
      enum: ["Student", "Faculty", "Public Member"],
      default: "Student",
    },

    avatar: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

//Auto-generate memberId before saving
userSchema.pre("save", async function () {
  if (!this.memberId) {
    this.memberId = "MEM-" + uuidv4().slice(0, 8).toUpperCase();
  }
});

export const User = mongoose.model("User", userSchema);