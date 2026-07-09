import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoutes from "./API/routes/AuthRoutes.js";
import BookRoutes from "./API/routes/BookRoutes.js";
import BorrowingRoutes from "./API/routes/BorrowingRoutes.js";
import cookieParser from "cookie-parser";
import ProfileRoutes from "./API/routes/ProfileRoutes.js";
import NotificationRoutes from "./API/routes/NotificationRoutes.js";
import ReportRoutes from "./API/routes/ReportRoutes.js";
import StudentRoutes from "./API/routes/StudentRoutes.js";

const app = express();

// Config
dotenv.config();

// Middlewares
// app.use(cors({
//     origin: ["http://localhost:5173"]

// }));
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Library Management System API Running"
    });
});

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/books", BookRoutes);
app.use("/api/borrowings", BorrowingRoutes);
app.use("/api/profile", ProfileRoutes);
app.use(
    "/api/notifications",
    NotificationRoutes
);
app.use("/api/reports", ReportRoutes);
app.use("/api/students", StudentRoutes);


export default app;