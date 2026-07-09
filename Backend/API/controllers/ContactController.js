import Contact from "../models/Contact.schema.js";

// Send Contact Message
export const sendMessage = async(req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const newMessage = await Contact.create({
            name,
            email,
            subject,
            message,
        });

        res.status(201).json({
            success: true,
            message: "Message sent successfully.",
            data: newMessage,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Messages (Admin)
export const getMessages = async(req, res) => {
    try {
        const messages = await Contact.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            total: messages.length,
            data: messages,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Message
export const getMessageById = async(req, res) => {
    try {
        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }

        res.status(200).json({
            success: true,
            data: message,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Message
export const deleteMessage = async(req, res) => {
    try {
        const message = await Contact.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }

        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Message deleted successfully.",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};