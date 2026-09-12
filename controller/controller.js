const db = require("../config/db");

const getProjects = (req, res) => {
    const sql = "SELECT * FROM projects";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching projects:", err);

            return res.status(500).json({
                error: "Failed to fetch projects"
            });
        }

        res.json(results);
    });
};

const createProject = (req, res) => {
    const { title, description, technologies } = req.body;

    const sql = `
        INSERT INTO projects (title, description, technologies)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [title, description, technologies],
        (err, result) => {
            if (err) {
                console.error("Error creating project:", err);

                return res.status(500).json({
                    error: "Failed to create project"
                });
            }

            res.status(201).json({
                message: "Project created successfully",
                projectId: result.insertId
            });
        }
    );
};

const updateProject = (req, res) => {
    const { id } = req.params;
    const { title, description, technologies } = req.body;

    const sql = `
        UPDATE projects
        SET title = ?, description = ?, technologies = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [title, description, technologies, id],
        (err, result) => {
            if (err) {
                console.error("Error updating project:", err);

                return res.status(500).json({
                    error: "Failed to update project"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Project not found"
                });
            }

            res.json({
                message: "Project updated successfully"
            });
        }
    );
};
const deleteProject = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM projects WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting project:", err);

            return res.status(500).json({
                error: "Failed to delete project"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Project not found"
            });
        }

        res.json({
            message: "Project deleted successfully"
        });
    });
};

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject
};