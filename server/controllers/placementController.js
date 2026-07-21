const db = require("../config/db");
const getPlacements = (req, res) => {
    db.query(
        "SELECT * FROM placements",
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(result);
        }
    );
};

const addPlacement = (req, res) => {
    const {
        company,
        role,
        status,
        deadline,
        round_name
    } = req.body;

    db.query(
        "INSERT INTO placements(company, role, status, deadline, round_name) VALUES (?, ?, ?, ?, ?)",
        [
            company,
            role,
            status,
            deadline,
            round_name,
        ],
        (err) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message : "Placement Added",
            });
        }
    );
};

module.exports = {
    getPlacements,
    addPlacement,
};