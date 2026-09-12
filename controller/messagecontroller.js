const db = require("../config/db");

const createMessage = (req, res) => {

    const { name, email, message } = req.body;

    // Name validation
    if (!name || name.trim() === "") {
        return res.status(400).json({
            error: "Name is required."
        });
    }

    if (name.trim().length < 2) {
        return res.status(400).json({
            error: "Name must be at least 2 characters."
        });
    }

    if (name.trim().length > 50) {
        return res.status(400).json({
            error: "Name must not exceed 50 characters."
        });
    }

    if (!/^[A-Za-z ]+$/.test(name.trim())) {
        return res.status(400).json({
            error: "Name can contain only letters and spaces."
        });
    }


    // Email validation
    if (!email || email.trim() === "") {
        return res.status(400).json({
            error: "Email is required."
        });
    }

    if (email.trim().length > 150) {
        return res.status(400).json({
            error: "Email must not exceed 150 characters."
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return res.status(400).json({
            error: "Please enter a valid email address."
        });
    }


    // Message validation
    if (!message || message.trim() === "") {
        return res.status(400).json({
            error: "Message is required."
        });
    }

    if (message.trim().length < 10) {
        return res.status(400).json({
            error: "Message must be at least 10 characters."
        });
    }

    if (message.trim().length > 500) {
        return res.status(400).json({
            error: "Message must not exceed 500 characters."
        });
    }


    // SQL
    const sql = `
        INSERT INTO messages (name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [name.trim(), email.trim(), message.trim()],
        (err, result) => {

            if (err) {
                console.error("Error creating message:", err);

                return res.status(500).json({
                    error: "Failed to send message"
                });
            }

            res.status(201).json({
                message: "Message sent successfully",
                messageId: result.insertId
            });
        }
    );
};

const getMessages = (req, res) => {
    const sql = "SELECT * FROM messages";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching messages:", err);

            return res.status(500).json({
                error: "Failed to fetch messages"
            });
        }

        res.json(results);
    });
};

module.exports = {
    createMessage,
    getMessages
};