import Notification from "../models/Notification.schema.js";

// Create Notification
export const createNotification = async(req, res) => {
    try {
        const { user, title, message, type } = req.body;

        const notification = await Notification.create({
            user,
            title,
            message,
            type,
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully.",
            notification,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Logged-in User Notifications
export const getNotifications = async(req, res) => {
    try {

        const notifications = await Notification.find({
            user: req.user.id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            total: notifications.length,
            notifications,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Mark Notification as Read
export const markAsRead = async(req, res) => {
    try {

        const notification =
            await Notification.findByIdAndUpdate(
                req.params.id, {
                    isRead: true,
                }, {
                    new: true,
                }
            );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification marked as read.",
            notification,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Notification
export const deleteNotification = async(req, res) => {
    try {

        const notification =
            await Notification.findByIdAndDelete(
                req.params.id
            );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};