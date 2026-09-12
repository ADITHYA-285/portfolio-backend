const db = require("../config/db");

const getSkills = (req, res) => {
    const sql = "SELECT * FROM skills";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching skills:", err);

            return res.status(500).json({
                error: "Failed to fetch skills"
            });
        }

        res.json(results);
    });
};

module.exports = {
    getSkills
};