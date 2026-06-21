const db = require("../config/db");

const addSubject = (req, res) =>{
    const { name, progress } = req.body;

    const sql = "INSERT INTO subjects(name, progress) VALUES (?, ?)";

    db.query(
        sql,
        [name, progress],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Subject Added Successfully",
            });
        }
    );
};

const getSubjects = (req, res) => {
    const sql = "SELECT * FROM subjects";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};

module.exports = {
    addSubject,
    getSubjects,
};